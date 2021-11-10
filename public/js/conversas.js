var moduleTalk = (json) => {
    //{name:"userName", icon:"userPhoto", msgLast:"oi", date:objct Date,readed:true, countMsg:12}
    var elTalkBox = document.createElement("div")
    elTalkBox.className = "talkBox"
    var elUserIcon = document.createElement("div")
    elUserIcon.className = "iconUser"
    if (json.icon.length == 0) {
        var elIU = document.createElement("i")
        elIU.className = "fas fa-users avatar"
        elUserIcon.appendChild(elIU)
    } else {
        var elIU = document.createElement("img")
        elIU.src = json.icon
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
    elUserName.innerText = json.name;
    // -- add elUsername in elMsgBox
    elMsgBox.appendChild(elUserName)

    var
        elMessage = document.createElement("span")
    elMessage.className = 'message'
    elMessage.innerText = json.msgLast;
    // -- add elMessage in elMsgBox
    elMsgBox.appendChild(elMessage)
    // -- add elMessageBox in Talks
    elTalks.appendChild(elMsgBox)

    var
        elInfo = document.createElement("div")
    elInfo.className = "infoMessage"
    var elDate = document.createElement("span")
    elDate.className = "dateTime"
    elDate.innerText = json.date
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
            json = (JSON.parse(x.responseText))
        }
    }
    x.open("GET", "JSON/conversas.json?user=Alunos", true);
    x.send();

    document.getElementById("findTalk").onkeyup=function(){
        var str = this.value
        callBack(json, str)
    }

    var callBack = function (jTalks, str) {
        var str

        var j = jTalks.filter(obj => {
            if (str.length == "")
               return true
            var regEx = new RegExp(str,"gi")
            if (regEx.test(obj.msgLast)==true){
                return true    
            }
            if (regEx.test(obj.name)==true){
                return true    
            }    
            return false
        })
        console.log(j)
        document.getElementsByClassName("containerTalk").item(0).innerHTML=""
        
        j.forEach(obj=>{
            var el = moduleTalk(obj)
            document.getElementsByClassName("containerTalk").item(0).appendChild(el)
        })
    }
}