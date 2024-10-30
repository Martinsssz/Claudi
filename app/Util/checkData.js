export function checkDataCadastro(nome, email, senha, confirmarSenha){
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if(senha === "" || nome === "" || email === ""){
    return {message: "Preencha todos os campos", validate:false}

  }else if(nome.trim().length === 0 || email.trim().length === 0 || senha.trim().length === 0){
    return {message: "Preencha os campos corretamente", validate:false}

  }else if(!regexEmail.test(email) ) {
    return {message: "Digite um email válido", validate:false}
  
  }else if(senha !== confirmarSenha){
    return {message: "As senhas não são iguais", validate:false}

  }else if(senha.length < 8 ){
    return {message: "A senha deve possuir ao menos 8 dígitos", validate:false}
  }

  return {message: "ok", validate:true}
}

export function checkDataLogin(email, senha){
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if(senha === "" || email === ""){
    return {message: "Preencha todos os campos", validate:false}

  }else if( email.trim().length === 0 || senha.trim().length === 0){
    return {message: "Preencha os campos corretamente", validate:false}

  }else if(!regexEmail.test(email) ) {
    return {message: "Digite um email válido", validate:false}

  }

  return {message: "ok", validate:true}
}

export function checkName(nome){
  if( nome === ""){
    return {message: "Preencha todos os campos de nome", validate:false}
  }else if( nome.trim().length === 0){
    return {message: "Preencha os campos de nome corretamente", validate:false}
  }

  return {message: "ok", validate:true}
}

export function checkEmail(email){
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if( email === ""){
    return {message: "Preencha todos os campos", validate:false}

  }else if( email.trim().length === 0){
    return {message: "Preencha os campos corretamente", validate:false}

  }else if(!regexEmail.test(email) ) {
    return {message: "Digite um email válido", validate:false}
  }

  return {message: "ok", validate:true}
}

export function checkPassword(password, confirmPassword){
  if(password === "" ){
    return {message: "Preencha todos os campos", validate:false}
  }else if( password.trim().length === 0 ){
    return {message: "Preencha os campos corretamente", validate:false}
  
  }else if(password !== confirmPassword){
    return {message: "As senhas não são iguais", validate:false}

  }else if(password.length < 8 ){
    return {message: "A senha deve possuir ao menos 8 dígitos", validate:false}
  }

  return {message: "ok", validate:true}
}
