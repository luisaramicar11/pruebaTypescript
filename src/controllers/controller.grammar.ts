import {BodyResponseBadGrammar} from "../models/badGrammar.model";

export class BadGrammarController {
    public domain: string;

    constructor(domain:string){
        this.domain = domain;
    }

    async grammarPost(body:string, language: string): Promise<BodyResponseBadGrammar>{
       
        const reqOptions: RequestInit = {
            method: 'POST',

        }
        const response = await fetch(`${this.domain}/v2/check?language=${language}&text=${body}`, reqOptions);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseBodyClimate: BodyResponseBadGrammar = await response.json();
        return responseBodyClimate;
    }
}