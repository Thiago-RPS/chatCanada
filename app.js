const chat = [{
    "idChat": 0,
    "owner": "Alana",
    "name": " Thiago ",
    "dtLastMsg": "2021-11-24T09:08:15",
    "lastMsg": {
        "from": "Alana",
        "msg": "Salve Thiago Tamo junto na parada",
        "date": "2021-11-24T09:08:15",
        "icon": ""
    },
    "msgs": [
        {
            "from": "Thiago",
            "msg": "Eai Alana blz vou para a aula",
            "date": "2021-11-24T09:08:12",
            "icon": ""
        },
        {
            "from": "Alana",
            "msg": "Salve Thiago Tamo junto na parada",
            "date": "2021-11-24T09:08:15",
            "icon": ""
        }
    ]
},
{
    "idChat": 0,
    "name": "Alana",
    "owner": "Thiago",
    "dtLastMsg": "2021-11-24T09:08:15",
    "lastMsg": {
        "from": "Alana",
        "msg": "Salve Thiagão Tamo junto na parada",
        "date": "2021-11-24T09:08:15",
        "icon": ""
    },
    "msgs": [
        {
            "from": "Thiago",
            "msg": "Eai Alana blz vou para a aula",
            "date": "2021-11-24T09:08:12",
            "icon": ""
        },
        {
            "from": "Alana",
            "msg": "Salve Thiago Tamo junto na parada",
            "date": "2021-11-24T09:08:15",
            "icon": ""
        }
    ]
}
]

var id = 1
const express = require("express")
const app = express()
const server = require("http").createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const port = 3000
const fs = require("fs")
const userBd = require('./BD/users').Bd()

const cookieparser = require("cookie-parser")

app.use(cookieparser())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    console.log(req.query)
    res.sendFile("public/home.html", { root: __dirname })
})
app.get("/newUser", (req, res) => {
    res.sendFile("public/signin.html", { root: __dirname })
})
app.get("/passwordRecovery", (req, res) => {
    res.sendFile("public/recuperarsenha.html", { root: __dirname })
})
app.get("/findUsers", (req, res) => {
    res.send(userBd.get())
})
app.post("/novasenha", (req, res) => {
    var User = users.map((user) => {
        var login = req.body.login
        var senha = req.body.senha // array 2 valores
        if (senha[0] != senha[1]) {
            res.status = 200
            res.sendFile("public/recuperarsenha.html", { root: __dirname })
        }

        if (user.login === login) {
            user.senha = senha[0]
            res.send("Senha Alterada com sucesso")
        }
    })
})
app.get("/newmessage", (req, res) => {
    res.status = 200
    res.sendFile("public/paginanovamsg.html", { root: __dirname })
})
app.post("/login", (req, res) => {
    var login = req.body.login
    var senha = req.body.senha

    var User = userBd.get().filter((user) => {
        return (user.login === login && user.senha === senha)
    })

    if (User.length > 0) {
        res.cookie("userName", User[0].name)
        res.cookie("login", login)
        res.status = 200
        res.sendFile("public/conversas.html", { root: __dirname })
    }
    res.status = 400
    res.sendFile("public/home.html", { root: __dirname })
})
app.get("/newmsg", (req, res) => {
    var userName = req.query.name
    id += 1
    var msgs = chat.filter(conversa => {
        var { name, owner } = conversa
        return name == userName && owner == req.cookies.userName
    })

    if (msgs.length > 0) {
        res.cookie("conversaAtiva", msgs[0].idChat)
        res.status = 200
        res.sendFile("public/conversas.html", { root: __dirname })
    }


    chat.push({
        "idChat": id,
        "name": userName,
        "owner": req.cookies.userName,
        "dtLastMsg": (new Date()).toISOString(),
        "lastMsg": {},
        "msgs": []
    })
    chat.push({
        "idChat": id,
        "name": req.cookies.userName,
        "owner": userName,
        "dtLastMsg": (new Date()).toISOString(),
        "lastMsg": {},
        "msgs": []
    })
    res.cookie("conversaAtiva", id)
    res.status = 200
    res.sendFile("public/conversas.html", { root: __dirname })
})

app.post("/signin", (req, res) => {
    var login = req.body.login
    var senha = req.body.senha
    var name = req.body.usuario
    var telefone = req.body.telefone
    var confirmarsenha = req.body.confirmarsenha
    users.push({
        login, senha, name, telefone
    })
    res.sendFile("public/home.html", { root: __dirname })
})


app.get("/findUser", (req, res) => {
    var text = req.query.text
    res.send(userBd.find(text))
})

app.get("/conversas", (req, res) => {
    var myChat = chat.filter(item => {
        return item.owner == req.cookies.userName
    })
    res.status = 200
    res.send(myChat)
})
//---- Socket Io
const userSocket = {}
io.on('connection', (socket) => {

    socket.on("login", user => {
        userSocket[user.name] = socket
        socket.broadcast.emit("conectados", user.name)
    })

    socket.on("sendMsg", ({ msg, id, userName }) => {
        if (msg.length == 0)
            return
        console.log(msg)
        var date = (new Date()).toISOString()
        chat.map(conversa => {
            var { idChat } = conversa
            console.log(idChat+"--"+id)
            if (idChat != id)
                return
            conversa.msgs.push({
                "from": userName,
                "msg": msg,
                "date": date
            })
            conversa.lastMsg = {
                "from": userName,
                "msg": msg,
                "date": date
            }
            conversa.dtLastMsg = date
            console.log(conversa)
            if (userSocket[conversa.owner])
               userSocket[conversa.owner].emit("send",conversa)
        })

    })

})

server.listen(port, () => {
    console.log("servidor rodando na porta " + port)
})

