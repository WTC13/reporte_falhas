const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'src')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const conexao = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'vwtech',
    database: 'reporte_falhas'
})

app.get('../../views/', (req, res) => {
  res.render('forms');
});


app.post('/salvar', (req, res) => {
  const{
    protocolo,
    name,
    email,
    senha,
    cnpj,
    data,
    modulo,
    outro_modulo,
    descricao
  } = req.body;

  if (modulo === 'Outros' && !outro_modulo) {
    return res.send('Erro: campo "outro_modulo" é obrigatório quando "Outros" é selecionado.');
  }

  const modulo_final = modulo === 'Outros' ? outro_modulo : modulo;

  const sql_insert = `
    INSERT INTO reportes
    (protocolo, nome, email, senha, cnpj, data, modulo, descricao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const valores = [protocolo, name, email, senha, cnpj, data, modulo_final, descricao];

    conexao.query(sql_insert, valores, (err) => {
      if (err){
        console.error('Erro ao salvar no banco de dados:', err);
        return res.status(500).send('Erro ao salvar dados.');
      }
      res.send('Erro reportado com sucesso!');
    });
});

// app.get('/', (req, res) => {
//   conexao.query('SELECT * FROM reportes', (err, resultados) => {
//     if (err) {
//         console.error(err);
//       return res.send('Erro na consulta ao banco de dados.');
//     }
//     res.render('reportes', { reportes: resultados });
//   });
// });

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});