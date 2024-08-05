export default function Loader(){
    console.log("entre al loader")
    const loader = document.createElement("img") as HTMLImageElement;
    loader.src = "../../public/oval.svg";
    loader.alt = "Cargando...";
    loader.classList.add("d-block", "mx-auto", "p-2");
    return loader;
}