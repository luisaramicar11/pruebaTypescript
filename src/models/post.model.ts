export interface BodyRequestCreatePost {
    title: string,
    body: string,
    creationDate: string,
    creator: string,
    estimatedPublicationDate: string,
    status: string,
    approvalPercentage: number,
    corrections: string,
    platform: string,
    postUrl: string,
    multimediaUrl: string
}

export interface BodyResponseCreatePost {
    postByUser:               number;
    title:                    string;
    body:                     string;
    creationDate:             string;
    estimatedPublicationDate: string;
    status:                   string;
    approvalPercentage:       number;
    corrections:              string;
    platform:                 string;
    postUrl:                  string;
    multimediaUrl:            string;
    creator:                  Creator;
    id:                       number;
    deletedAt:                null;
}

export interface Creator {
    id:       number;
    email:    string;
    password: string;
}


export interface BodyResponseGetPostByIDCreator {
    id:                       number;
    postByUser:               number;
    title:                    string;
    body:                     string;
    creationDate:             string;
    estimatedPublicationDate: string;
    status:                   string;
    approvalPercentage:       number;
    corrections:              string;
    platform:                 string;
    postUrl:                  string;
    multimediaUrl:            string;
    deletedAt:                null;
}

export interface BodyResponseGetAllPost {
    id:                       number;
    postByUser:               number;
    title:                    string;
    body:                     string;
    creationDate:             string;
    estimatedPublicationDate: string;
    status:                   string;
    approvalPercentage:       number;
    corrections:              string;
    platform:                 string;
    postUrl:                  string;
    multimediaUrl:            string;
    deletedAt:                null;
}

export interface BodyRequestUpdatePost {
    title:                    string;
    body:                     string;
    creationDate:             string;
    estimatedPublicationDate: string;
    status:                   string;
    approvalPercentage:       number;
    corrections:              string;
    platform:                 string;
    postUrl:                  string;
    multimediaUrl:            string;
}

export interface BodyResponseUpdatePost {
    id:                       number;
    postByUser:               number;
    title:                    string;
    body:                     string;
    creationDate:             string;
    estimatedPublicationDate: string;
    status:                   string;
    approvalPercentage:       number;
    corrections:              string;
    platform:                 string;
    postUrl:                  string;
    multimediaUrl:            string;
    deletedAt:                null;
}

export interface BodyResponseDeletePost {
    message: string;
    post:    Post;
}

export interface Post {
    id:                       number;
    postByUser:               number;
    title:                    string;
    body:                     string;
    creationDate:             string;
    estimatedPublicationDate: string;
    status:                   string;
    approvalPercentage:       number;
    corrections:              string;
    platform:                 string;
    postUrl:                  string;
    multimediaUrl:            string;
    deletedAt:                Date;
}