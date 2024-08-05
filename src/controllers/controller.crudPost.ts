// guardian
/* (function (){
    const userEmail = localStorage.getItem('email')
    if(userEmail === null){
        window.location.href = "/"
    }
})() */
import {PostController} from "./controller.posts.ts";
import {BadGrammarController} from "./controller.grammar.ts";
import {CardTemplateController} from "./controller.cardTemplate.ts";
import {successAlert, deleteAlert, modalAlert, errorAlert} from "../components/alerts.ts";
import {colorQuality} from "./controller.color.ts";
import loader from "../components/loader.ts";
import Logout from "../components/btnLogout.ts";

const URL_BAD_GRAMMAR:string = "https://api.languagetool.org";
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
const form = document.querySelector("form") as HTMLFormElement;
const title = document.getElementById("title") as HTMLInputElement;
const body = document.getElementById("body") as HTMLInputElement;
const creationDate = document.getElementById("creation-date") as HTMLInputElement;
const image = document.getElementById("multimedia-url") as HTMLInputElement;
const estimatedPublicationDate = document.getElementById("estimated-publication-date") as HTMLInputElement;
const status = document.getElementById("status") as HTMLInputElement;
const platform = document.getElementById("platform") as HTMLInputElement;
const postUrl = document.getElementById("post-url") as HTMLInputElement;
const creator = document.getElementById("creator") as HTMLInputElement;
let approvalPercentage: number;
let corrections: string;

let idCatche: undefined | string;

const cardTemplate = new CardTemplateController(containerPost);

form.addEventListener("submit", async (e:Event)=>{
    e.preventDefault();
    const crudPost = new PostController(URL_POST);
    

    if(idCatche === undefined){
        const crudBadGrammar = new BadGrammarController(URL_BAD_GRAMMAR);
        const responseBadGrammar = await crudBadGrammar.grammarPost(body.value);
        console.log(responseBadGrammar)
        corrections = responseBadGrammar.matches[0].message;
        console.log(corrections)
        const badWords = ["malparido", "perra", "gonorrea"];
            let mySentence = ((body.value).split(" "));
            let allBadWordsInMySentence = []
            const badWordExist = mySentence.forEach((word)=>{
                for (let i = 0; i < badWords.length; i++) {
                    if(word.toLowerCase() === badWords[i]){
                        allBadWordsInMySentence.push(word);
                    }     
                }
            });

        approvalPercentage = (allBadWordsInMySentence.length * 100) / (mySentence.length) 
        console.log(approvalPercentage)
        await crudPost.addPost(title, body, creationDate, creator, estimatedPublicationDate, status, approvalPercentage, corrections, platform, postUrl, image)
        successAlert("Successfully created post");
    }else{
        await crudPost.updatePost(idCatche, title, body, creationDate, estimatedPublicationDate, status, approvalPercentage, corrections, platform, postUrl, image)
        idCatche = undefined;
        successAlert("Successfully updated post");
    }
    form.reset();
    await allPosts();
});

containerPost.addEventListener("click", async (e:Event)=>{
    if(e.target instanceof HTMLButtonElement){
        const crudPost = new PostController(URL_POST);

        if(e.target.classList.contains("btn-warning")){
            idCatche= e.target.dataset.id;

            if(idCatche){
                const postData = await crudPost.getByCreatorId(idCatche)
                title.value = postData.title,
                body.value = postData.body,
                creationDate.value = postData.creationDate,
                estimatedPublicationDate.value = postData.estimatedPublicationDate,
                status.value = postData.status,
                platform.value = postData.platform,
                postUrl.value = postData.postUrl,
                image.value = postData.multimediaUrl;
            }
        }else if(e.target.classList.contains("btn-danger")){
            let postId = e.target.dataset.id;

            if(postId){
                deleteAlert("You won't be able to revert this!").then(async (result)=>{
                    //console.log(result)
                    //console.log(result.isConfirmed)
                    if(result.isConfirmed){
                        await crudPost.deletePost(postId)
                        idCatche = undefined;
                        successAlert("Successfully delete post");
                        await allPosts();
                    }else{
                        errorAlert("An error occurred while deleting the post")
                    }
                })                
            }
        } else if (e.target.classList.contains("btn-primary")){
            idCatche=e.target.dataset.id;
            if(idCatche){
                const postDetails= await crudPost.getByCreatorId(idCatche)
                modalAlert(postDetails.corrections)
            } 
            idCatche = undefined;
        }
    }
})

async function allPosts(){
    const crudPost = new PostController(URL_POST)
    
    const imgLoader = loader();
    try {
        containerPost.innerHTML = "";
   
        containerPost.appendChild(imgLoader);

        const posts = await crudPost.getAllPost()

        console.log(posts)
        localStorage.setItem("posts", JSON.stringify(posts));
        // Limpia el contenedor antes de agregar las nuevas tarjetas
        containerPost.innerHTML = "";
        for (const post of posts){
            let color = colorQuality(post.approvalPercentage);
            cardTemplate.render(post.id, post.title,post.body, post.creationDate, post.estimatedPublicationDate, post.status, post.approvalPercentage, post.corrections, post.platform, post.postUrl, post.multimediaUrl, color)

        }
       
    } catch (error:any) {
        errorAlert(error)
    }
}

allPosts()
};