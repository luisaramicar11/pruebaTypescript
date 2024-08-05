export class CardTemplateController{
    public containerPost: HTMLDivElement;

    constructor(containerPost: HTMLDivElement){
        this.containerPost = containerPost;
    }

    render(id: number, title: string, body: string, creationDate: string, estimatedPublicationDate: string, status: string, approvalPercentage: number, corrections: string, platform: string, postUrl: string, multimediaUrl: string, color: string): void{
        const figure= document.createElement("figure");
        figure.classList.add("card");
        figure.style.width = "18rem";

        const img = document.createElement("img");
        img.src=multimediaUrl;
        img.classList.add("card-img-top", "object-fit-cover");
        img.alt=title;
        img.style.height = "10rem";
        figure.appendChild(img);

        const figcaption = document.createElement("figcation");
        figcaption.classList.add("card-body", "my-0");
        figure.appendChild(figcaption);

        const addTitle = document.createElement("p");
        addTitle.classList.add("card-title");
        addTitle.textContent = title;
        figcaption.appendChild(addTitle);

        const addBody = document.createElement("p");
        addBody.classList.add("card-title");
        addBody.textContent = body;
        figcaption.appendChild(addBody);

        const addCreationDate = document.createElement("p");
        addCreationDate.classList.add("card-title");
        addCreationDate.textContent = creationDate;
        figcaption.appendChild(addCreationDate);

        const addEstimatedPublicationDate = document.createElement("p");
        addEstimatedPublicationDate.classList.add("card-title");
        addEstimatedPublicationDate.textContent = estimatedPublicationDate;
        figcaption.appendChild(addEstimatedPublicationDate);

        const addStatus = document.createElement("p");
        addStatus.classList.add("card-title");
        addStatus.textContent = status;
        figcaption.appendChild(addStatus);

        const addCorrections = document.createElement("p");
        addCorrections.classList.add("card-title");
        addCorrections.textContent = corrections;
        figcaption.appendChild(addCorrections);

        const addPlatform = document.createElement("p");
        addPlatform.classList.add("card-title");
        addPlatform.textContent = platform;
        figcaption.appendChild(addPlatform);

        const addPostUrl = document.createElement("p");
        addPostUrl.classList.add("card-title");
        addPostUrl.textContent = postUrl;
        figcaption.appendChild(addPostUrl);

        const divPercentage = document.createElement("div");
        divPercentage.classList.add("d-flex", "justify-content-between", "align-items-center");
        figcaption.appendChild(divPercentage)

        const addApprovalPercentage = document.createElement("p");
        addApprovalPercentage.classList.add("card-title");
        addApprovalPercentage.textContent = approvalPercentage.toString();
        divPercentage.appendChild(addApprovalPercentage);

        const divColor = document.createElement("div");
        divColor.style.width = "1rem";
        divColor.style.height = "1rem";
        divColor.style.backgroundColor = color;
        divColor.style.borderRadius = "50%";
        divPercentage.appendChild(divColor);

        const div = document.createElement("div");
        div.classList.add("d-flex", "justify-content-between");

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn", "btn-warning");
        btnEdit.textContent = "Edit";
        btnEdit.type = "button";
        btnEdit.dataset.id = id.toString();

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("btn", "btn-danger");
        btnDelete.textContent = "Delete";
        btnDelete.type = "button";
        btnDelete.dataset.id = id.toString();

        const btnDetails = document.createElement("button");
        btnDetails.classList.add("btn", "btn-primary");
        btnDetails.textContent = "Detalles";
        btnDetails.type = "button";
        btnDetails.setAttribute("data-bs-toggle","modal");
        btnDetails.setAttribute("data-bs-target","#exampleModal");
        btnDetails.dataset.id = id.toString();
         
        div.appendChild(btnEdit);
        div.appendChild(btnDelete);
        div.appendChild(btnDetails);
        figcaption.appendChild(div);

        this.containerPost.appendChild(figure)
    }
}