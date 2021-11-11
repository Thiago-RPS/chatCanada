var ModuleUser = (json) =>{
    //icon, name, email, cellNumber, bio
    var userinfo = document.createElement("div")
    userinfo.className("boxUser")
    if (json.icon.length == 0) {
       var IconUser = document.createElement("i")
       IconUser.className = "fas fa-users avatar"
   } else {
       var IconUser = document.createElement("img")
       IconUser.src = json.icon
       IconUser.className = "userIcon"
}
    var nameuser = document.createElement("div")
    nameuser.className= "name"
    nameuser.src=json.name;

    var emailuser = document.createElement("div")
    emailuser.className = "email"
    emailuser.src = json.emailuser;

    var cellNumUser = document.createElement("div")
    cellNumUser.className = "cellNumber"
    cellNumUser.src = json.cellNumber;

    var bioUser = document.createElement('div')
    bioUser.className = "bio"
    bioUser.src = json.bio
}

window.onload = function(){
   var x = XMLHttpRequest();
   var json = []
   x.onreadystatechange = function () {
       if(this.readyState == 4 && this.status == 200){
           json = (JSON.parse(x.responseText))
       }
   }

   x.open("GET", "JSON/novamsg.json", true);
   x.send();

   document.getElementsByClassName("searchUsers").onkeyup = function(){
      var str = this.value
      callBack(json, str)
   }

   var callBack = function(str, users){
     var str 
   var IU = users.filter(obj => {
       if (str.length == "")
       return true
   var regExp = new RegExp(str, "gi")
   if (regExp.test(obj.name)==true){
       return true
   }
   if (regExp.test(obj.email)==true){
       return true
   }
   if (regExp.test(obj.cellNumber)==true){
       return true
   }
   return false
   }) 
   console.log(IU)
   document.getElementsByClassName("users").item(0).innerHTML=""

   IU.forEach(obj=>{
       var el = ModuleUser(obj)
       document.getElementsByClassName("users").item(0).appendChild(el)
   })
 }
}