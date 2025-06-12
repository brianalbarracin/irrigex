var currentPage = null;
var defaultPage = "principal";
var rootPath = "admin/";

$(function(){

    
    const dataUser = localStorage.getItem("data-user");
    if (!dataUser) {
        console.warn("NO hay data-user en localStorage. Redirigiendo...");
        window.location.replace("index.html");
        return;
    }
  
    //para que detecte la pagina de redireccionamiento

    const page = new URLSearchParams(window.location.search).get("page");
    if (page === "pago-exitoso") {
        getPage('../admin/pages/pago-exitoso');
    }

    const user = JSON.parse(dataUser);
    console.log("Usuario cargado en admin:", user);

    loadHeader(rootPath);
    loadFooter(rootPath);
    getPage("principal", rootPath)

});