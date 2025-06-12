$(document).ready(function () {
   
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get("id");

    const dataUser = JSON.parse(localStorage.getItem("data-user"));
    const direccion = JSON.parse(localStorage.getItem("direccion-seleccionada"));
    const items = JSON.parse(localStorage.getItem("items-preorden")) || [];

    const userId = dataUser?.id;
    const addressId = direccion?.id;

    console.log("transactionId:", transactionId);
    console.log("data-user:", dataUser);
    console.log("direccion:", direccion);
    console.log("items:", items);




    if (!transactionId || !userId || !addressId || items.length === 0) {
        alert("Faltan datos para procesar la orden.");
        return;
    }

    fetch(`https://irrigexback.onrender.com/orders/check-wompi-status?transactionId=${transactionId}&userId=${userId}&addressId=${addressId}`)
        .then(res => res.json())
        .then(res => {
            if (res.status === 201) {
                alert("Orden creada con éxito.");
                localStorage.removeItem("items-preorden");
                localStorage.removeItem("direccion-seleccionada");
                window.location.href = "https://irrigexback.onrender.com/admin.html";
            } else {
                alert("No se pudo crear la orden: " + res.message);
                window.location.href = "/carrito.html";
            }
        })
        .catch(err => {
            console.error(err);
            alert("Error al contactar al servidor.");
            window.location.href = "/carrito.html";
        });




});