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

app.get("/",(req, res)=>{
   
     res.sendFile("public/home.html",{root:__dirname})
})

app.post("/login",(req, res)=>{
    var login = req.params.login
    var senha =  req.params.senha
    for (var i in req)
    console.log(req[i])
    var user = users.filter((u)=>{
        
        return (u.login===login && u.senha === senha)
    })

    if (user.length == 0){
        res.status=200
        res.sendFile("public/conversas.html",{root:__dirname})    
    }
    res.status=400
    res.sendFile("public/home.html",{root:__dirname})

})

app.listen(port,()=>{
    console.log("servidor rodando na porta "+ port)
})