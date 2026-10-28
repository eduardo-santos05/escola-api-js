import express from 'express'

const router = express()
const port = 3000

router.use(express.json())

router.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})