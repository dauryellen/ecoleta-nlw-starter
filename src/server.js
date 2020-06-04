const express = require("express");
const server = express();

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
server.get("/create-point", (req, res) => res.render("create-point.html"));

/* página do resultado da busca */
server.get("/search", (req, res) => res.render("search-results.html"));

//ligar o servidor
server.listen(3000);
