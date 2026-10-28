import express from 'express'

const router = express()
const port = 3000

router.use(express.json())

let turmas = [
    { id: 1, nome: 'JavaScript Manhã', sala: 'Lab 1' },
    { id: 2, nome: 'JavaScript Noite', sala: 'Lab 2' }
]

let alunos = [
    { id: 1, nome: 'Ana', idade: 17 },
    { id: 2, nome: 'Bruno', idade: 19 }
]

function registrarLog(req, res, next) {
    console.log(`${req.method} - ${req.url}`)
    next()
}

router.use(registrarLog)

function validarTurma(req, res, next) {
    if (!req.body.nome || !req.body.sala) {
        return res.status(400).send({ erro: "Informe nome e sala" })
    }
    next()
}

function verificarSala(req, res, next) {
    for (let i = 0; i < turmas.length; i++) {
        if (turmas[i].sala === req.body.sala) {
            return res.status(409).send({ erro: "Essa sala já está em uso" })
        }
    }
    next()
}

function validarAluno(req, res, next) {
    if (!req.body.nome || !req.body.idade) {
        return res.status(400).send({ erro: "Informe nome e idade" })
    }
    next()
}

router.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})