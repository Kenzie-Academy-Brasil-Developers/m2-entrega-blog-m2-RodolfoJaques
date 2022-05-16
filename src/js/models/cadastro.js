
const form = document.getElementById("form-cadastro");

async function cadastrarUsuario(event){

    event.preventDefault()

    let data = {}

    const elementos = form.elements

    for (let i = 0; i < elementos.length; i++) {

        let item = elementos[i];
        
        if (item.name !== "botaoInscricao") {
  
          data[item.name] = item.value;
        }    
    }
    
    const {username,email,avatarUrl,password} = data

    const newData = {

        username,
        email,
        avatarUrl,
        password
    }

    await Api.cadastro(newData)

    window.location.href = ("./src/pages/login.html")

    return newData
}

form.addEventListener("submit",cadastrarUsuario)

