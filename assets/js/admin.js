var currentPage = null;
var defaultPage = "principal";
var rootPath = "admin/";

$(function () {


    const dataUser = localStorage.getItem("data-user");
    if (!dataUser) {
        console.warn("NO hay data-user en localStorage. Redirigiendo...");
        window.location.replace("index.html");
        return;
    }


   /* updateCartCount(user.id);*/


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

/*function updateCartCount(userId) {
    fetch(`https://irrigexback.onrender.com/cart/${userId}`)
        .then(res => res.json())
        .then(res => {
            if (res.status !== 200) throw new Error("Error en la carga del carrito");

            const totalQuantity = res.data.reduce((sum, item) => sum + item.quantity, 0);
            $("#cart-count").text(totalQuantity);
        })
        .catch(err => {
            console.error("❌ No se pudo actualizar el contador del carrito", err);
        });
}*/