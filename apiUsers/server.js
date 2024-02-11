const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const porta = 3000;

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DevSocials'
})

app.use(bodyParser.json());

app.use(cors());

app.get('/users/:id?', (req, res)=>{
    const {id} = req.params;
    if(id){
        conexao.query('SELECT * FROM Usuarios WHERE id = ?', [id], (err, results)=>{
            if(err){
                console.error('Erro ao consultar o banco de dados:', err);
                res.status(500).json({erro: 'Erro ao consultar o banco de dados'});
            }else if(results.length > 0){
                res.json(results[0]);
            }else{
                res.status(404).json({erro: 'Item não encontrado'});
            }
        });
    }else{
        conexao.query('SELECT * FROM Usuarios', (err, results)=>{
            if(err){
                console.error('Erro ao consultar o banco de dados:', err);
                res.status(500).json({erro: 'Erro ao consultar o banco de dados'});
            }else{
                res.json(results);
            }
        });
    }
});

app.post('/users', (req, res) => {
    const {email, nome, userName, userImg, senha} = req.body;

    if (nome) {
        // Inserção MySQL para adicionar um novo item
        conexao.query(`INSERT INTO Usuarios (email, nome, userName, userImg, senha) VALUES (?, ?, ?, ?, ?)`, [email, nome, userName, userImg, senha], (err, results) => {
            if (err) {
                console.error('Erro ao inserir no banco de dados:', err);
                res.status(500).json({ erro: 'Erro ao inserir no banco de dados' });
            } else {
                const novoItem = { id: results.insertId, nome };
                res.json({ mensagem: 'Item adicionado com sucesso', novoItem });
            }
        });
        
    } else {
        res.status(400).json({ erro: 'Nome do item não fornecido' });
    }
});

app.put('/itens/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    if (id && nome) {
        // Atualização MySQL para atualizar um item existente
        conexao.query('UPDATE Usuarios SET nome = ? WHERE id = ?', [nome, id], (err, results) => {
            if (err) {
                console.error('Erro ao atualizar no banco de dados:', err);
                res.status(500).json({ erro: 'Erro ao atualizar no banco de dados' });
            } else if (results.affectedRows > 0) {
                res.json({ mensagem: 'Item atualizado com sucesso' });
            } else {
                res.status(404).json({ erro: 'Item não encontrado' });
            }
        });
    } else {
        res.status(400).json({ erro: 'ID ou nome do item não fornecidos' });
    }
});

app.delete('/itens/:id', (req, res) => {
    const { id } = req.params;

    if (id) {
        // Exclusão MySQL para remover um item
        conexao.query('DELETE FROM seus_itens WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Erro ao excluir no banco de dados:', err);
                res.status(500).json({ erro: 'Erro ao excluir no banco de dados' });
            } else if (results.affectedRows > 0) {
                res.json({ mensagem: 'Item removido com sucesso' });
            } else {
                res.status(404).json({ erro: 'Item não encontrado' });
            }
        });
    } else {
        res.status(400).json({ erro: 'ID do item não fornecido' });
    }
});

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});