// const express = require('express')

// const app = express()

// app.get('', (req, res) => {
//     res.send('<h1>Hello minha app</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send('help page')
// })

// app.get('/about', (req, res) => {
//     res.send('about page')
// })

// app.get('/cotacoes', (req, res) => {
//     const cotacao = {
//         symbol : 'PETR4.SA',
//         price_open : 10,
//         price : 12,
//         day_high : 13,
//         day_low : 9
//     }

//     const cotacoes = new Array()
//     cotacoes.push(cotacao)
//     cotacoes.push(cotacao)
    
//     res.send(cotacoes)
// })

// app.listen(3000, () => {
//     console.log("server is up on port 3000")    
// })

//--------------------------------------------
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs') //tem que ser exatamente dessa forma para o hbs ser utilizado
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        tittle: 'Cotações',
        author: 'George'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        tittle: 'Sobre',
        author: 'George Douglas'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        tittle: 'Ajuda',
        author: 'George Douglas'
    })
})

// app.get('/cotacoes', (req, res) => {
//     const cotacao = {
//         symbol : 'PETR4.SA',
//         price_open : 10,
//         price : 12,
//         day_high : 13,
//         day_low : 9
//     }

//     const cotacoes = new Array()
//     cotacoes.push(cotacao)
//     cotacoes.push(cotacao)
    
//     res.send(cotacoes)
// })

app.get('/cotacoes', (req, res) => {

    if(!req.query.ativo){
        return res.status(400).json({
            error: {
                message : 'O ativo deve ser informado como query parameter',
                code: 400
            }
            
        })
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacoes(symbol, (err, body) => {
        if(err){
            const { message } = err
            const error = {
                
            }
            
            return res.status(err.code).json({ error: {
                message : err.message,
                code: err.code
            } })
        }
        res.status(200).json(body)
    })

    
})

app.get('/help/*', (req, res) => {

    res.render('404', {
        tittle : '404',
        author: 'George Douglas',
        errorMessage : 'Não existe página depois de /help'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        tittle : '404',
        author: 'George Douglas',
        errorMessage : 'Página não encontrada'
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is up on port ${port}`)    
})