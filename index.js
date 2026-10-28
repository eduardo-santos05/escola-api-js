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

router.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})