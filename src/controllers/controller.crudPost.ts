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
import {successAlert, deleteAlert, errorAlert} from "../components/alerts.ts";
import {colorQuality} from "./controller.color.ts";
import loader from "../components/loader.ts";
import Logout from "../components/btnLogout.ts";
import { showModal } from "../components/modal.ts";

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
let idByCreator = localStorage.getItem("id") as string;

let idCatche: undefined | string;
const badWords = ["malparido", "perra", "gonorrea"];
const cardTemplate = new CardTemplateController(containerPost);
let allBadWordsInMySentence: string[] = [];
form.addEventListener("submit", async (e:Event)=>{
    e.preventDefault();
    const crudPost = new PostController(URL_POST);
    

    if(idCatche === undefined){
        const crudBadGrammar = new BadGrammarController(URL_BAD_GRAMMAR);
        const responseBadGrammar = await crudBadGrammar.grammarPost(body.value, "es");
        console.log(responseBadGrammar)
        corrections = responseBadGrammar.matches[0].message;
        console.log(corrections)
        
            let mySentence = ((body.value).split(" "));
           
            mySentence.forEach((word)=>{
                for (let i = 0; i < badWords.length; i++) {
                    if(word.toLowerCase() === badWords[i]){
                        allBadWordsInMySentence.push(word);
                    }     
                }
            });
        console.log("my sentence", mySentence.length)
        console.log("allBad", allBadWordsInMySentence.length)
        approvalPercentage = ((mySentence.length - allBadWordsInMySentence.length) * 100) / (mySentence.length) 
        console.log("soy el approvalPercentage", approvalPercentage)
        await crudPost.addPost(title, body, creationDate, creator, estimatedPublicationDate, status, approvalPercentage, corrections, platform, postUrl, image, emailUser)
        successAlert("Successfully created post");
    }else{
        const crudBadGrammar = new BadGrammarController(URL_BAD_GRAMMAR);
        let language: string = "es"
        const responseBadGrammar = await crudBadGrammar.grammarPost(body.value, language);
        console.log(responseBadGrammar)
        corrections = responseBadGrammar.matches[0].message;
        console.log(corrections)
            let mySentence = ((body.value).split(" "));
            mySentence.forEach((word)=>{
                for (let i = 0; i < badWords.length; i++) {
                    if(word.toLowerCase() === badWords[i]){
                        allBadWordsInMySentence.push(word);
                    }     
                }
            });

        approvalPercentage = (allBadWordsInMySentence.length * 100) / (mySentence.length) 
        console.log(approvalPercentage)
        console.log(idCatche)
        await crudPost.updatePost(idCatche, title, body, creationDate, estimatedPublicationDate, status, approvalPercentage, corrections, platform, postUrl, image, emailUser)
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
            idCatche= (e.target.dataset.id);
            console.log(idCatche);
            const array = localStorage.getItem("posts");
            const array2 = JSON.parse(array!);
            interface Post {
                id: number
                title: string,
                body: string,
                creationDate: string,
                estimatedPublicationDate: string,
                status: string,
                platform: string,
                postUrl: string,
                image: string
            }
            const postData = array2?.filter((post: Post)=>(post.id).toString() === idCatche);

                title.value = postData[0].title,
                body.value = postData[0].body,
                creationDate.value = postData[0].creationDate,
                estimatedPublicationDate.value = postData[0].estimatedPublicationDate,
                status.value = postData[0].status,
                platform.value = postData[0].platform,
                postUrl.value = postData[0].postUrl,
                image.value = postData[0].multimediaUrl;
            
        }else if(e.target.classList.contains("btn-danger")){
            let postId = e.target.dataset.id;

            if(postId){
                deleteAlert("You won't be able to revert this!").then(async (result)=>{
                    //console.log(result)
                    //console.log(result.isConfirmed)
                    if(result.isConfirmed){
                        await crudPost.deletePost(postId, emailUser)
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
                idCatche= (e.target.dataset.id);
            console.log(idCatche);
            const array = localStorage.getItem("posts");
            const array2 = JSON.parse(array!);
            interface Post {
                id: number
                title: string,
                body: string,
                creationDate: string,
                estimatedPublicationDate: string,
                status: string,
                platform: string,
                postUrl: string,
                image: string
            }
            let postData = array2?.filter((post: Post)=>(post.id).toString() === idCatche);
            console.log("soy postdaa", postData);
            const crudBadGrammar = new BadGrammarController(URL_BAD_GRAMMAR);
            const responseBadGrammar = await crudBadGrammar.grammarPost(postData[0].body, "es");
            console.log(responseBadGrammar)
            showModal(allBadWordsInMySentence.toString(),postData[0].corrections, postData[0].body, responseBadGrammar.matches[0].message)
            } 
            idCatche = undefined;
        }
    }
})

async function allPosts(){
    const crudPost = new PostController(URL_POST)
    
    const imgLoader = loader();
    try {
     
            let userId = idByCreator || "";
            console.log(userId)
            containerPost.innerHTML = "";
    
            containerPost.appendChild(imgLoader);
            
            const posts = await crudPost.getByCreatorId(userId, emailUser as string);
    
            console.log(posts)
            localStorage.setItem("posts", JSON.stringify(posts));
            // Limpia el contenedor antes de agregar las nuevas tarjetas
            containerPost.innerHTML = "";
            for (const post of posts){
                let color = colorQuality(post.approvalPercentage);
                cardTemplate.render(post.id, post.title,post.body, post.creationDate, post.estimatedPublicationDate, post.status, post.approvalPercentage, post.corrections, post.platform, post.postUrl, post.multimediaUrl, color)
            
           
        }
        

        }catch (error:any) {
        errorAlert(error)
    }
}

allPosts()
};