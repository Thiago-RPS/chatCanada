const users = [
    {
        name: "Turco",
        login: "11931527193",
        senha: 'turco123'
    },
    {
        name: "Brandão",
        login: "11968904133",
        senha: '123456'
    },
    {
        name: "Jps",
        login: "11971669819",
        senha: '123456'
    },
    {
        name: "Thiago",
        login: "11992993917",
        senha: 'thi007'
    },
    {
        name: "Alana",
        login: "11973444759",
        senha: 'alana123'
    },
    {
        name: "Freitas",
        login: "11954254480",
        senha: 'freitas123'
    },
    {
        name: "Lima",
        login: "11977755445",
        senha: 'lima777'
    },
    {
        name: "Isa",
        login: "11991274282",
        senha: 'seve123'
    },
    {
        name: "Sophi",
        login: "11995273959",
        senha: 'sophi59'
    },
    {
        name: "Fernando",
        login: "11975577252",
        senha: 'fe123'
    },
    {
        name: "Kauan",
        login: "11963038462",
        senha: 'kauan123'
    }
]

exports.Bd = ()=>{
    return {
        set:json=>{
            // -- se login for celular
            if (/^\d{11}$/.test(json.login) !== true){
                if (/\w+@\w+([.]\w{3})(\ .\w{2})?/.test(json.login) !== true){
                    console.log("user login invalido")
                    return false
                }
            }
            if (json.name.length == 0){
                console.log("informe o nome do usuario")
                    return false
            }
            if (json.senha.length == 0){
                console.log("informe a senha do usuario")
                    return false
            }
            users.push(json)
        },
        find: text=>{
            console.log(text)
            if (text.length == 0)
               return []
            
            var ret = users.filter(obj=>{
                var regEx = new RegExp(text,"gi")
                return (regEx.test(obj.name)||regEx.test(obj.login))
            })
            //console.log(ret)
            return ret
        },
        get:()=>{
            return users
        }
    }

}


