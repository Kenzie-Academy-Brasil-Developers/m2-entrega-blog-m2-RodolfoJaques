
const form = document.getElementById("form-login");

async function logarUsuario(event){

    event.preventDefault()

    let data = {}

    const elementos = form.elements

    for (let i = 0; i < elementos.length; i++) {

        let item = elementos[i];
        
        if (item.name !== "botaoLogin") {
  
          data[item.name] = item.value;
        }    
    }

    const {email,password} = data

    const newData = {

        email,
        password
    }

    await Api.login(newData)
console.log(newData);

    return newData
}

form.addEventListener("submit",logarUsuario)