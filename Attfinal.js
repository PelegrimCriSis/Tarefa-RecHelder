import express from 'express';

const app = express();

const porta = 3000;

app.use(express.json());

const tarefas = [];

function autenticacao(req, res, next) {
    console.log('Autenticação realizada,');

    next();
}

function validacao(req, res, next) {

    if (req.body.titulo === '') {
        return res.status(400).json({
            erro: 'O título é obrigatorio por favor insira um título valido'
        });
    }

    next();
}

function log(req, res, next) {
    console.log('Nova tarefa está sendo criada');

    next();
}

app.post('/tarefas',[autenticacao, validacao, log],(req, res) => {

        const novaTarefa = {
            id: tarefas.length + 1,
            titulo: req.body.titulo,
            concluida: false
        };

        tarefas.push(novaTarefa);

        res.status(201).json(novaTarefa);
    }
);

app.listen(3000, () => {
    console.log(`Servidor rodando na Porta ${porta}`);
});