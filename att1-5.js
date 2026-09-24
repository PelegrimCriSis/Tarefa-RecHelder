const express = require('express');

const app = express();

const porta = 3000;

app.use(express.json());

const tarefas = [
    {
        id: 1,
        titulo: 'Fazer a lista do Helder',
        concluida: false
    },
    {
        id: 2,
        titulo: 'Concluir o TCC',
        concluida: true
    },
    {
        id: 3,
        titulo: 'Estudar PtaS',
        concluida: false
    }
];

app.get('/', (req, res) => {
    res.send('API de Tarefas no ar');
});

app.get('/tarefas', (req, res) => {

    const concluida = req.query.concluida;

    if (concluida == undefined) {

        res.json(tarefas);

    } else {

        const resultado = [];

        for (let i = 0; i < tarefas.length; i++) {

            if (String(tarefas[i].concluida) === concluida) {
                resultado.push(tarefas[i]);
            }

        }

        res.json(resultado);
    }
});

app.get('/tarefas/:id', (req, res) => {

    const id = Number(req.params.id);

    const tarefa = tarefas.find(
        tarefa => tarefa.id === id
    );

    if (tarefa == undefined) {
        return res.status(404).json({
            error: 'Tarefa não encontrada'
        });
    }

    res.json(tarefa);
});

function autenticacao(req, res, next) {
    console.log('Autenticação realizada');
    next();
}

function validacao(req, res, next) {

    if (!req.body.titulo) {
        return res.status(400).json({
            erro: 'Título é obrigatório, Coloque um titulo valido por favor'
        });
    }

    next();
}

function log(req, res, next) {
    console.log('POST /tarefas realizado');
    next();
}

app.post(
    '/tarefas',
    [autenticacao, validacao, log],
    (req, res) => {

        const novaTarefa = {
            id: tarefas.length + 1,
            titulo: req.body.titulo,
            concluida: false
        };

        tarefas.push(novaTarefa);

        res.status(201).json(novaTarefa);
    }
);

app.listen(porta, () => {
    console.log(`Servidor rodando na url: http://localhost:${porta}/`);
});
// Observação Professor Helder, usei a inteligencia artificial para aprender novas coisas para conseguir facilitar minha vida e consecutivamente meu entendi para aplicar nas coisas como por exemplo o undefined que usei para ver se o codigo estava filtrando o True e o False, ja o true e o false não entendi muito bem o conceito mas achei que era algo como um if e um else que acabava não precisando fazer aquele codigo todo mas sim so definindo se algo era falso ou não, e a mesma coisa se aplica ao ! é algo simples que aprendi agora mas que vai me ajudar muito ja que ele fala pergunta diretamente se algo é diferente ou não.
// Essa observação se aplica as duas tarefas


/*
EXERCÍCIO 6 - TESTES

1. GET /
URL: http://localhost:3000/
Resposta: "API de Tarefas no ar"

2. GET /tarefas
URL: http://localhost:3000/tarefas
Resposta: [{"id":1,"titulo":"Fazer a lista do Helder","concluida":false},{"id":2,"titulo":"Concluir o TCC","concluida":true},{"id":3,"titulo":"Estudar PtaS","concluida":false}]

3. GET /tarefas/:id
URL: http://localhost:3000/tarefas/1
Resposta: {"id":1,"titulo":"Fazer a lista do Helder","concluida":false}

4. GET /tarefas?concluida=true
URL: http://localhost:3000/tarefas?concluida=true
Resposta: [{"id":2,"titulo":"Concluir o TCC","concluida":true}]

5. POST /tarefas
URL: http://localhost:3000/tarefas

Body:
[{"id":1,"titulo":"Fazer a lista do Helder","concluida":false},{"id":2,"titulo":"Concluir o TCC","concluida":true},{"id":3,"titulo":"Estudar PtaS","concluida":false}]
*/