
class Api {

    static dataPostsPag = []
    static Token = localStorage.getItem('UserToken')
    static UserID = localStorage.getItem('UserID')
    static UserInfos = localStorage.getItem('UserInfos')

    static async cadastro(data) {

        const URL = "https://api-blog-m2.herokuapp.com/user/register"

        const response = await fetch(URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(data), 
            })
            .then((res) => res.json())
            .then((res) => res)
            .catch((error) => error);

        return response;
    }

    static async login(data) {

        await localStorage.removeItem('UserToken')
        await localStorage.removeItem('UserID')

        const URL = "https://api-blog-m2.herokuapp.com/user/login"

        const tok = await fetch(URL,
            {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((res) => res.json())
            .then(async (res) => {
                console.log(res.status);
                if(res.status == 'error'){
                    
                    window.location.href = ("../../index.html")
                }else{

                    let {token,userId} = res
                await localStorage.setItem('UserToken', token)
                await localStorage.setItem('UserID', userId)                
                }

            })
            .catch((error) => { error; console.log(error)});
        
        return tok;      
    }

    static async requirirUser(){

        const URL = `https://api-blog-m2.herokuapp.com/user/${Api.UserID}`
    
        const objUser = await fetch(URL,
            {   
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Api.Token}` 
                },
                
            }).then((resp) => {
                return resp.json()
            }).then(async(resp) => {
                const newResp = JSON.stringify(resp)
                await localStorage.setItem("UserInfos",newResp) 
            }).catch((err) => err) 

        return objUser
    }

    static async requirirPosts(pagNumber){

        const URL = `https://api-blog-m2.herokuapp.com/post?page=${pagNumber}`
    
        const objUser = await fetch(URL,
            {   
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Api.Token}` 
                },
                
            }).then((resp) => {
                return resp.json()
            }).then((resp) => {
                Api.dataPostsPag = resp.data
            }).catch((err) => err) 

        return this.dataPostsPag
    }

    static async postar(data) {

        const URL = "https://api-blog-m2.herokuapp.com/post"

        const response = await fetch(URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Api.Token}`  
                },
                body: JSON.stringify(data), 
            })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch((error) => error);

        return response;
    }

    static async editar(data,id) {

        const URL = `https://api-blog-m2.herokuapp.com/post/${id}`

        const response = await fetch(URL,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Api.Token}`  
                },
                body: JSON.stringify(data), 
            })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch((error) => error);

        return response;
    }

    static async deletar(id) {

        const URL = `https://api-blog-m2.herokuapp.com/post/${id}`

        const response = await fetch(URL,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${Api.Token}`  
                }
            })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch((error) => error);

        return response;
    }
}