const express = require("express");
const server = express();

// pegar o banco de dados
const db = require("./database/db");

//configurar pasta pública
server.use(express.static("public"));

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }));

//template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//rotas da aplicação

/* página inicial */
server.get("/", (req, res) => res.render("index.html"));

/*página do formulário */
server.get("/create-point", (req, res) => {
  //req.query: Query Strings da nossa url

  return res.render("create-point.html");
});

/* rota para cadastro de pontos */
server.post("/savepoint", (req, res) => {
  //req.body: o corpo do nosso formulário
  const queryInsert = `
    INSERT INTO places (
      image, 
      name, 
      address, 
      address2, 
      state, 
      city, 
      items
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      return res.send("Erro no cadastro.");
    }

    console.log("Cadastrado com sucesso.");
    console.log(this);

    return res.render("create-point.html", { saved: true });
  }

  db.run(queryInsert, values, afterInsertData);
});

/* página do resultado da busca */
server.get("/search", (req, res) => {
  const search = req.query.search;
  let queryList = "";

  //se a pesquisa for vazia
  //if (search == "") return res.render("search-results.html", { total: 0 });
  if (search == "") {
    queryList = `SELECT * FROM places`;
  } else {
    queryList = `SELECT * FROM places WHERE city LIKE '%${search}%'`;
  }

  //pegar os dados do banco de dados
  //const queryList = `SELECT * FROM places WHERE city LIKE '%${search}%'`;

  db.all(queryList, function (err, rows) {
    if (err) return console.log(err);

    const total = rows.length;

    //mostrar a página html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total: total });
  });
});

//ligar o servidor
server.listen(3000);
