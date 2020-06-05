//importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose();

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

//utilizar o objeto de banco de dados para nossas operações
db.serialize(() => {
  //Com comandos SQL eu vou:

  /* 1 - Criar uma tabela */
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `);

  /* 2 - inserir dados na tabela */
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
    "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    "Colectoria",
    "Guilherme Gemballa, Jardim América",
    "Número 260",
    "Santa Catarina",
    "Rio do Sul",
    "Resíduos Eletrônicos, Lâmpadas",
  ];

  function afterInsertData(err) {
    if (err) return console.log(err);

    console.log("Cadastrado com sucesso.");
    console.log(this);
  }

  //db.run(queryInsert, values, afterInsertData);

  /* 3 - consultar dados da tabela */
  const queryList = `SELECT * FROM places`;

  /*db.all(queryList, function (err, rows) {
    if (err) return console.log(err);

    console.log("Aqui estãos seus registros.");
    console.log(rows);
  });*/

  /* 4 - deletar dado na tabela */
  const queryDelete = `DELETE FROM places WHERE id = ?`;
  const idDel = [1];

  /*db.run(queryDelete, idDel, function (err) {
    if (err) return console.log(err);

    console.log("Registro deletado com sucesso.");
  });*/

  /* 5 - editar dado na tabela */
  const queryUpdate = `
  UPDATE places SET 
    image = ?, 
    name = ?, 
    address = ?, 
    address2 = ?, 
    state = ?, 
    city = ?, 
    items = ? WHERE id = ?;
  `;

  const idUpdate = 2;

  const valuesUpdate = [
    "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    "Papersider",
    "Guilherme Gemballa, Jardim América",
    "Número 260",
    "Ceará",
    "Fortaleza",
    "Resíduos Eletrônicos, Lâmpadas",
    idUpdate,
  ];

  /*db.run(queryUpdate, valuesUpdate, function (err) {
    if (err) return console.log(err);

    console.log("Registro editado com sucesso.");
    console.log(this);
  });*/
});
