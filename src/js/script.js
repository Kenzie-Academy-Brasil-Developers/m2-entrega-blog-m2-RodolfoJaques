
class Api {

    static Token = localStorage.getItem('UserToken')
    static UserID = localStorage.getItem('UserID')

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
                

                window.location.href = ("./principal.html")

            })
            .catch((error) => { error; console.log(error)});


        return tok;      
    }

    static async requirirUser(){

        const URL = `https://api-blog-m2.herokuapp.com/user/${Api.UserID}`

        const data = {}
    
        const objUser = await fetch(URL,
            {   
                method:"GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Api.Token}` 
                },
                
            }).then((resp) => {
                return resp.json()
            }).then((resp) => console.log(resp))
    }
}