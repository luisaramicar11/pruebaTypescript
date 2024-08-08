// guardian
/* (function (){
    const userEmail = localStorage.getItem('email')
    if(userEmail === null){
        window.location.href = "/"
    }
})() */
    import {PostController} from "./controller.posts.ts";
    import {CardTemplateController} from "./controller.cardTemplate.ts";
    import {colorQuality} from "./controller.color.ts";
    import { errorAlert } from "../components/alerts.ts";
    import loader from "../components/loader.ts";
    import Logout from "../components/btnLogout.ts";
   
    const URL_POST:string = "https://api-posts.codificando.xyz";
    const emailUser = localStorage.getItem("email");
    const btnLogout = document.querySelector(".btn-logout") as HTMLButtonElement;
    
    btnLogout.addEventListener("click", ()=>{
        Logout();
    })
    
    if(!emailUser){
        alert("Authentication token is missing. Please log in.");
        window.location.href = "index.html";
    }else{
        const containerPost = document.querySelector(".container-posts") as HTMLDivElement;
        let idByCreator = localStorage.getItem("id") as string;
        const cardTemplate = new CardTemplateController(containerPost);

    async function allPosts(){
        const crudPost = new PostController(URL_POST)
        
        const imgLoader = loader();
        try {   
                let userId = idByCreator || "";
                console.log(userId)
                containerPost.innerHTML = "";
        
                containerPost.appendChild(imgLoader);
                
                const posts = await crudPost.getAllPost();
        
                console.log(posts)
                localStorage.setItem("posts", JSON.stringify(posts));
                // Limpia el contenedor antes de agregar las nuevas tarjetas
                containerPost.innerHTML = "";
                for (const post of posts){
                    let color = colorQuality(post.approvalPercentage);
                    cardTemplate.render(post.id, post.title,post.body, post.creationDate, post.estimatedPublicationDate, post.status, post.approvalPercentage, post.corrections, post.platform, post.postUrl, post.multimediaUrl, color);
            }
            }catch (error:any) {
            errorAlert(error)
        }
    }
    
    allPosts()
    };