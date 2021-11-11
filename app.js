const express = require("express")
const app = express()
const port = 3000
const fs = require("fs")

const users =[
    {
        name:"ISA",
        login:"turma1@colegiocanada.g12.br", 
        senha:"12345"
    }
]


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

app.get("/novamsg", (req,res)=>{
    res.sendFile("public/páginanovamsg.html", {root:__dirname})
})

app.post("/login",(req, res)=>{
    var login = req.body.login
    var senha = req.body.senha
    console.log(req.body)
    var User = users.filter((user)=>{
        return (user.login===login && user.senha === senha)
    })
    
    if (User.length > 0){
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

app.listen(port,()=>{
    console.log("servidor rodando na porta "+ port)
})

