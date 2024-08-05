export default function Logout(){
    localStorage.removeItem("token");
    window.location.href = "index.html";
}