function digiteEMAIL(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if ( re.test(String(email.value) )){
   	return true
    }
    else{
    alert ("Utilize um E-mail Valido")
    return false 
    }
}

function checarSenha(senha, recSenha) {
	if (senha.value == recSenha.value)
		return true
	else{
			alert ("Senhas nao compativeis")
		return false
  }
}