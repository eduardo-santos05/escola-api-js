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

router.get("/turmas", (req, res) => {
    res.send(turmas)
})

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

router.post("/turmas", validarTurma, verificarSala, (req, res) => {
    let id = 1
    if (turmas.length > 0) {
        id = turmas[turmas.length - 1].id + 1
    }
    let nome = req.body.nome
    let sala = req.body.sala
    
    let turma = { id: id, nome: nome, sala: sala }
    turmas.push(turma)
    res.status(201).send(turma)
})

function validarAluno(req, res, next) {
    if (!req.body.nome || !req.body.idade) {
        return res.status(400).send({ erro: "Informe nome e idade" })
    }
    next()
}

function validarIdade(req, res, next) {
    let idade = Number(req.body.idade)
    if (idade < 14) {
        return res.status(400).send({ erro: "Idade mínima: 14 anos" })
    }
    next()
}

function verificarSenha(req, res, next) {
    if (req.headers.senha !== "coordenacao"){
        return res.status(401).send({ erro: "Acesso não autorizado" })
    }
    next()
}

router.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})