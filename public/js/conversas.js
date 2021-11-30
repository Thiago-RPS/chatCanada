function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// Abrindo o  chat
/*
Recebe como parametro a json da sala de conversa
*/
var openChat = function (sala) {
    var elContent = document.getElementsByClassName("containerMsg").item(0)
    var elMsgUseBar = document.createElement("div")
    elMsgUseBar.className = ("msgUseBar")
    var contentHtml = ""
    if (!sala.icon) {
        contentHtml = `
        <div class="iconUser">
        <i class="fas fa-users avatar"></i>
        </div>`
    }
    contentHtml += `
    <div class="messageBox">
    <span class="userName">${sala.name}</span>
    <span class="message">ultima mensagem as ${new Date(sala.dtLastMsg)}</span>
    </div>`
    elMsgUseBar.innerHTML = contentHtml
    elContent.appendChild(elMsgUseBar)
    // -- agora carregando as msgs
    var
        moduleMsg = (Msg,dayMsg) => {
            const { from, msg, date } = Msg
            var dtMsg = new Date(date)
            var days = "Domingo,Segunda,Terça,Quarta,Quinta,Sexta,Sábado".split(",")
            
            var contentMsg =""
             if (dayMsg !== dtMsg.getDay())
                contentMsg = `<div class="lineInfo">
                                <div class="date">
                                    ${days[dtMsg.getDay()]} ${dtMsg.getMonth() + 1}/${dtMsg.getFullYear()}
                                </div>
                              </div>
                              `
            contentMsg += `
        <div class="${from === getCookie("userName") ? "lineMe" : "lineTo"}">
            <div class="msgBox ${from === getCookie("userName") ? "me" : "to"}">
                <div class="msg"> ${msg}</div>
                <div class="infoMsg">
                    <span>${dtMsg.getDate()}/${dtMsg.getMonth()+1}/${dtMsg.getFullYear()}
                    - ${dtMsg.getHours()}:${dtMsg.getMinutes()}:${dtMsg.getSeconds()}
                    </span>
                    <i class="fas fa-check-double"></i>
                </div>
            </div>
        </div>`
        
           
            
            return contentMsg
        },
        elMsgContent = document.createElement("div")
    elMsgContent.className = "msgContent"
    var day = null
    sala.msgs.map(Msg => {
        var elMsg = moduleMsg(Msg,day)
        day = (new Date(Msg.date)).getDay()
        elMsgContent.innerHTML = elMsgContent.innerHTML+(elMsg)
    })
    elContent.appendChild(elMsgContent)
    var sendMsg = `
    
        <div class="textSend">
            <div class="textBox" contentEditable=true></div>
        </div>
        <i class="fas fa-paper-plane send" id="send"></i>
    `
    var elSendMsg = document.createElement("div")
    elSendMsg.className = "msgSendBox"
    elSendMsg.innerHTML = sendMsg


    elSendMsg.getElementsByClassName("send").item(0).onclick = function () {
        if (document.getElementById("textBox").innerText.length == 0)
            return

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                var Msg = (JSON.parse(xmlhttp.responseText))
                var elMsg = moduleMsg(Msg)
                elMsgContent.appendChild(elMsg)
            }
        }
        x.open("POST", "SendMsg", true);
        x.send();

    }
    elContent.appendChild(elSendMsg)
}

var moduleTalk = (json) => {
    //{name:"userName", icon:"userPhoto", msgLast:"oi", date:objct Date,readed:true, countMsg:12}
    var elTalkBox = document.createElement("div")
    elTalkBox.className = "talkBox"
    var elUserIcon = document.createElement("div")
    elUserIcon.className = "iconUser"

    var { lastMsg } = json

    if (!lastMsg.icon.length == 0) {
        var elIU = document.createElement("i")
        elIU.className = "fas fa-users avatar"
        elUserIcon.appendChild(elIU)
    } else {
        var elIU = document.createElement("img")
        elIU.src = lastMsg.icon
        elIU.className = "avatar"
        elUserIcon.appendChild(elIU)
    }
    // --  add elUserIcon in elTalkBox
    elTalkBox.appendChild(elUserIcon)
    var elTalks = document.createElement("div")
    elTalks.className = "talks"
    var
        elMsgBox = document.createElement("div")
    elMsgBox.className = "messageBox"

    var
        elUserName = document.createElement("span")
    elUserName.className = 'userName'
    elUserName.innerText = lastMsg.from;
    // -- add elUsername in elMsgBox
    elMsgBox.appendChild(elUserName)

    var
        elMessage = document.createElement("span")
    elMessage.className = 'message'
    elMessage.innerText = lastMsg.msg;
    // -- add elMessage in elMsgBox
    elMsgBox.appendChild(elMessage)
    // -- add elMessageBox in Talks
    elTalks.appendChild(elMsgBox)

    var
        elInfo = document.createElement("div")
    elInfo.className = "infoMessage"
    var elDate = document.createElement("span")
    elDate.className = "dateTime"
    elDate.innerText = new Date(lastMsg.date)
    // -- add elDate in elInfo
    elInfo.appendChild(elDate)
    // -- add elInfo in elTalks
    elTalks.appendChild(elInfo)

    // -- add elTalk in TalkBox
    elTalkBox.appendChild(elTalks)

    return elTalkBox
}

window.onload = function () {
    var x = new XMLHttpRequest();

    var json = []
    x.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            var msgs = (JSON.parse(x.responseText))

            // -- filtrando as mensagens pelo usuário logado
            json = msgs.filter(msg => {
                return msg.owner === getCookie("userName")
            })

            // -- ordernando as menssagens pela a data
            json.sort((a, b) => {
                return !((new Date(a.dtLastMsg)) - (new Date(b.dtLastMsg)))
            })
            mostrarConversas(json, "")
        }
    }
    x.open("GET", "JSON/conversas.json?user=Alunos", true);
    x.send();

    document.getElementById("findTalk").onkeyup = function () {
        var str = this.value
        mostrarConversas(json, str)
    }




    var mostrarConversas = function (jTalks, str) {
        var str
        var j
        if (str.length !== 0) {
            j = jTalks.filter(obj => {


                var regEx = new RegExp(str, "gi")
                if (regEx.test(obj.msgLast) == true) {
                    return true
                }
                if (regEx.test(obj.name) == true) {
                    return true
                }
                return false
            })
        }
        else { j = jTalks }
        document.getElementsByClassName("containerTalk").item(0).innerHTML = ""

        j.forEach(obj => {
            var el = moduleTalk(obj)
            el.onclick = function () {
                openChat(obj)
            }
            document.getElementsByClassName("containerTalk").item(0).appendChild(el)
        })
    }
}