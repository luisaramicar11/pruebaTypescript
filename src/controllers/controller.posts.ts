import {BodyRequestCreatePost, BodyResponseCreatePost, BodyResponseGetPostByIDCreator, BodyResponseGetAllPost, BodyRequestUpdatePost, BodyResponseUpdatePost, BodyResponseDeletePost} from "../models/post.model";

export class PostController {
    public domain: string;

    constructor(domain: string){
        this.domain = domain;
    }

    async addPost(title: HTMLInputElement, body: HTMLInputElement, creationDate: HTMLInputElement, creator: HTMLInputElement, estimatedPublicationDate: HTMLInputElement, status: HTMLInputElement, approvalPercentage: number, corrections: string, platform: HTMLInputElement, postUrl: HTMLInputElement, multimediaUrl: HTMLInputElement): Promise<BodyResponseCreatePost>{
        const addPost: BodyRequestCreatePost = {
            title: title.value,
            body: body.value,
            creationDate: creationDate.value,
            creator: creator.value,
            estimatedPublicationDate:estimatedPublicationDate.value,
            status: status.value,
            approvalPercentage: approvalPercentage,
            corrections: corrections,
            platform: platform.value,
            postUrl: postUrl.value,
            multimediaUrl: multimediaUrl.value
        };

        const headers = {
            'Content-Type': 'application/json'
        }
        const reqOptions: RequestInit = {
            method: 'POST',
            headers,
            body: JSON.stringify(addPost)
        }
        const response = await fetch(`${this.domain}/posts`, reqOptions);

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseBodyCreatePost: BodyResponseCreatePost = await response.json()
        return responseBodyCreatePost;  
    };

    async getByCreatorId(id:string): Promise<BodyResponseGetPostByIDCreator>{
    
        const reqOptions: RequestInit = {
            method: 'GET',
        };
        const response: Response = await fetch(`${this.domain}/posts/by-creator/${id}`, reqOptions);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseBodyGetByCreatorId: BodyResponseGetPostByIDCreator = await response.json();
        return responseBodyGetByCreatorId;
    };

    async getAllPost(): Promise<BodyResponseGetAllPost[]>{
    
        const reqOptions: RequestInit = {
            method: 'GET',
        }
        const response = await fetch(`${this.domain}/posts`, reqOptions);
    
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseBodyAllPost: BodyResponseGetAllPost[] = await response.json()
        return responseBodyAllPost;  
    };

    async updatePost(idCatche: string, title: HTMLInputElement, body: HTMLInputElement, creationDate: HTMLInputElement, estimatedPublicationDate: HTMLInputElement, status: HTMLInputElement, approvalPercentage: number, corrections: string, platform: HTMLInputElement, postUrl: HTMLInputElement, multimediaUrl: HTMLInputElement): Promise<BodyResponseUpdatePost>{
        const postUpdateData: BodyRequestUpdatePost = {
            title: title.value,
            body: body.value,
            creationDate: creationDate.value,
            estimatedPublicationDate:estimatedPublicationDate.value,
            status: status.value,
            approvalPercentage: approvalPercentage,
            corrections: corrections,
            platform: platform.value,
            postUrl: postUrl.value,
            multimediaUrl: multimediaUrl.value
        };
        
        const reqOptions: RequestInit = {
            method: 'PUT',
            body: JSON.stringify(postUpdateData)
        }
        const response = await fetch(`${this.domain}/posts/${idCatche}`, reqOptions);
    
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseBodyUpdatePost: BodyResponseUpdatePost = await response.json()
        return responseBodyUpdatePost;
    };
    
    async deletePost(id: string): Promise<BodyResponseDeletePost>{

        const reqOptions: RequestInit = {
            method: 'DELETE',
        }
        const response = await fetch(`${this.domain}/posts/${id}`, reqOptions);
    
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseBodyDeletePost: BodyResponseDeletePost = await response.json()
        return responseBodyDeletePost;
    }
}