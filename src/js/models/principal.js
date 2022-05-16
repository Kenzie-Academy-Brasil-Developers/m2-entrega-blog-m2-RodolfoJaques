
Api.requirirUser()
const dataPosts = Api.dataPostsPag

/**
 * header
 */
//////////////////////////
async function iniciarRend(){

    await Api.requirirUser()
    const dadosDoUsuario = localStorage.getItem("UserInfos")
    const dadosDoUsuarioObj = JSON.parse(dadosDoUsuario)
    
    const imgUsuario = document.querySelector('.user-identificacao img')
    imgUsuario.src = dadosDoUsuarioObj.avatarUrl
    
    const userName = document.querySelector('.user-name')
    userName.textContent = dadosDoUsuarioObj.username 
}
iniciarRend()

/*area de postagens*/
////////////////////////////

const sectionPosts = document.getElementById('posts')
const botoesDiv = document.getElementById('botoes')
const listaPosts = document.querySelector('.lista-posts')

async function listarPostagens(data){

    await data.forEach((element) => {

        const {createdAt,post,owner} = element
        const {avatarUrl,id,username} = owner
  
        if(id == Api.UserID){

            listaPosts.innerHTML += `

            <li class= "item-lista-post" id= "${element.id}">
                <div class= "box-post foto">
                    <img src= "${avatarUrl}">
                </div>
                <div class= "box-post texto">
                    <h4>${username}</h4>
                    <p>${post}</p>
                </div>
                <div class= "box-post botoes">
                    <span class= "editar-post post-botoes">Editar</span>
                    <span class= "deletar-post post-botoes">Remover</span>
                    <span class= "data-post">${createdAt}</span>
                </div>
            </li>
            `
        }else{

            listaPosts.innerHTML += `

            <li class= "item-lista-post"  id= "${element.id}">
                <div class= "box-post foto">
                    <img src= "${avatarUrl}">
                </div>
                <div class= "box-post texto">
                    <h4>${username}</h4>
                    <p>${post}</p>
                </div>
                <div class= "box-post botoes">
                    <span class= "data-post">${createdAt}</span>
                </div>
            </li>
            `            
        }
    });
}


/**
 * botoes para trocar de pag.
 */
////////////////////////////
let pag = 1

async function paginas(e){
    
    listaPosts.innerHTML = ''

    if(e.target.id == 'seguinte'){

        pag++
        await Api.requirirPosts(pag)
        await listarPostagens(Api.dataPostsPag)

    }else if(e.target.id == 'anterior' && pag > 1){

        await pag--
        await Api.requirirPosts(pag)
        await listarPostagens(Api.dataPostsPag)            
    }else{
  
        await Api.requirirPosts(1)
        await listarPostagens(Api.dataPostsPag)    
    }
}

/**
 * chama funções que renderizão a pag. completa
 */
///////////////////////////////////
async function iniciarPag(){

    await Api.requirirPosts(1)
    await listarPostagens(Api.dataPostsPag)
    const botoesPag = document.getElementById('botoes-pag')
    botoesPag.addEventListener('click',paginas)
}
iniciarPag()

/**
 * função para fazer postagem
 */
/////////////////////////////////
const postagem = document.querySelector('.postagem textarea')
const botaoPostagem = document.querySelector('.postar')

async function novoPost(){
    
    const dataPostagem = await {
        content: postagem.value
    };
    await Api.postar(dataPostagem)
    window.location.href = ('../pages/principal.html')
}

botaoPostagem.addEventListener('click',novoPost)

/**
 * Editar
 */
///////////////////////////////////////
const editando = document.querySelector('.lista-posts')
const main = document.getElementById('main-principal')
let textoSalvo = {}

editando.addEventListener('click',(e) => {

    const idPost = e.target.parentNode.parentNode.id;

    if(e.target.textContent === 'Editar'){
        
        main.innerHTML = `
        <div class="edicao">
            <textarea placeholder="Edite teu post aqui..."></textarea>
            <div class="faixa-botao-editar">
                <button class="salvar-edicao">salvar</button>
            </div>            
        </div>    
        `
    }
    const textoAEDitar = document.querySelector('.edicao textarea')
    textoAEDitar.textContent = e.target.parentNode.parentNode.children[1].children[1].textContent

    const salvarEdicao = document.querySelector('.salvar-edicao')
    salvarEdicao.addEventListener('click',async(e) => {

        textoSalvo = {
            newContent: textoAEDitar.value
        }

        await Api.editar(textoSalvo,idPost)
        window.location.href = ('../pages/principal.html')
    })    
})

/**
 * trexo DELETE
 */
/////////////////////////////////
const deletarPost = editando
deletarPost.addEventListener('click',async(e) => {

    const idPost = e.target.parentNode.parentNode.id;

    if(e.target.textContent === 'Remover'){

    await Api.deletar(idPost)
    window.location.href = ('../pages/principal.html')        
    }
})

/**
 * LOGOUT
 */
///////////////////////////
const LOGOUT = document.querySelector('.botao-logout a')
LOGOUT.addEventListener('click',() => {

    localStorage.removeItem('UserToken')
    localStorage.removeItem('UserID')
    localStorage.removeItem('UserInfos')
})