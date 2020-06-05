const express = require("express");
const server = express();

// pegar o banco de dados
const db = require("./database/db");

//configurar pasta pública
server.use(express.static("public"));

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

/* página do resultado da busca */
server.get("/search", (req, res) => {
  //pegar os dados do banco de dados
  const queryList = `SELECT * FROM places`;

  db.all(queryList, function (err, rows) {
    if (err) return console.log(err);

    const total = rows.length;

    //mostrar a página html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total: total });
  });
});

//ligar o servidor
server.listen(3000);
