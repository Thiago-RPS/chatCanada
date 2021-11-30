const express = require("express")
const app = express()
const port = 3000
const fs = require("fs")
const userBd = require('./BD/users').Bd()
console.log(userBd)
const cookieparser = require("cookie-parser")

app.use(cookieparser())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.get("/",(req, res)=>{
     console.log(req.query)

     res.sendFile("public/home.html",{root:__dirname})
})
app.get("/newUser",(req,res)=>{
    res.sendFile("public/signin.html",{root:__dirname})
})
app.get("/passwordRecovery",(req,res)=>{
    res.sendFile("public/recuperarsenha.html",{root:__dirname})
})

app.post("/novasenha",(req,res)=>{
    var User = users.map((user)=>{
        var login = req.body.login
        var senha = req.body.senha // array 2 valores
        if (senha[0] != senha[1]){
            res.status = 200
            res.sendFile("public/recuperarsenha.html",{root:__dirname})
        }
        
        if (user.login===login){
            user.senha = senha[0]
            res.send("Senha Alterada com sucesso")
        }
    })
})

app.post("/login",(req, res)=>{
    var login = req.body.login
    var senha = req.body.senha
    
    var User = userBd.get().filter((user)=>{
        return (user.login===login && user.senha === senha)
    })
    
    if (User.length > 0){
        res.cookie("userName",User[0].name)
        res.status=200
        res.sendFile("public/conversas.html",{root:__dirname})    
    }
    res.status=400
    res.sendFile("public/home.html",{root:__dirname})
})


app.post("/signin",(req, res)=>{
    var login = req.body.login
    var senha = req.body.senha
    var name = req.body.usuario
    var telefone = req.body.telefone
    var confirmarsenha = req.body.confirmarsenha
    users.push({
        login,senha,name,telefone
    })
    res.sendFile("public/home.html",{root:__dirname})
})


app.get("/findUser",(req,res)=>{
    var text = req.query.text
    res.send(userBd.find(text))    
})

app.listen(port,()=>{
    console.log("servidor rodando na porta "+ port)
})

