var ModuleUser = (json) => {
    //icon, name, email, cellNumber, bio
    var userinfo = document.createElement("div")
    userinfo.className = ("boxUser")
    if (!json.icon) {
        var IconUser = document.createElement("i")
        IconUser.className = "fas fa-users avatar"
        userinfo.appendChild(IconUser)
    } else {
        var IconUser = document.createElement("img")
        IconUser.src = json.icon
        IconUser.className = "userIcon"
        userinfo.appendChild(IconUser)
    }
    var nameuser = document.createElement("div")
    nameuser.className = "name"
    nameuser.innerHTML = json.name;
    userinfo.appendChild(nameuser)

    var emailuser = document.createElement("div")
    emailuser.className = "email"
    emailuser.innerHTML = json.login;
    userinfo.appendChild(emailuser)

    var cellNumUser = document.createElement("div")
    cellNumUser.className = "cellNumber"
    cellNumUser.innerHTML = json.senha;
    userinfo.appendChild(cellNumUser)

    /*var bioUser = document.createElement('div')
    bioUser.className = "bio"
    bioUser.innerHTML = json.bio
    */
   userinfo.onclick=function(){
        window.location = "newmsg?name="+json.name
   }
   return(userinfo)
}

window.onload = function () {
    var x = new XMLHttpRequest();
    var json = []
    x.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            json = (JSON.parse(x.responseText))
        }
    }

    x.open("GET", "findUsers", true);
    x.send();

    document.getElementsByClassName("searchUser").item(0).onkeyup = function () {
        var str = this.value
        buscarUsuarios(str,json)
    }

    var buscarUsuarios = function (str, users) {
        if (str.length == "")
            return []
        var filterUsers = users.filter(obj => {
            var regExp = new RegExp(str, "gi")
            if (regExp.test(obj.name) == true) {
                return true
            }
            if (regExp.test(obj.email) == true) {
                return true
            }
            if (regExp.test(obj.cellNumber) == true) {
                return true
            }
            return false
        })
        var el = document.getElementsByClassName("users").item(0)
        el.innerHTML = ""

        filterUsers.forEach(obj => {
            var elUser = ModuleUser(obj)
            el.appendChild(elUser)
        })
    }
}