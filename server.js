const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const app = express()
const session = require('express-session')
const {v4:uuidv4}= require("uuid")

const user = require('./router.js')

const port = process.env.PORT||7000
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.set('view engine','ejs')
//Load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:600000}
}))
app.use('/',user)




app.listen(port,()=>{console.log('Listening to the server on http://localhost:7000');})