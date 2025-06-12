

$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const dataUser = JSON.parse(localStorage.getItem("data-user"));
    if (!dataUser || !dataUser.id) {
        console.warn("Usuario no autenticado");
        return;
    }

    if (!productId) return;

    $.ajax({
        url: `https://irrigexback.onrender.com/products/${productId}`,
        method: "GET",
        success: function (response) {
            const p = response.data;

            $("#product-title").text(p.name);
            $("#product-price").text(`$${p.price}`);
            $("#product-typical").text(`$${p.typicalPrice || "74.95"}`);
            $("#product-description").text(p.description);
            $("#product-image").attr("src", p.imageUrls[0]);

            // Miniaturas
            if (p.imageUrls.length > 1) {
                const thumbsHtml = p.imageUrls.map((url, i) => `
                    <img src="${url}" class="img-thumbnail thumb-img" style="width: 60px; cursor: pointer;" data-index="${i}">
                `).join("");
                $("#image-thumbs").html(thumbsHtml);

                // Cambio de imagen principal al hacer clic
                $(".thumb-img").on("click", function () {
                    const index = $(this).data("index");
                    $("#product-image").attr("src", p.imageUrls[index]);
                });
            }

            
            $("#add-to-cart").off("click").on("click", function () {

                console.log("Botón 'Añadir al carrito' registrado");
                fetch(`http://localhost:8787/cart/${dataUser.id}/add?productId=${p.id}&quantity=1`, {
                    method: "POST",
                                        // Si tu endpoint requiere un body JSON, lo agregas aquí. Si no, puedes omitir 'body'
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Error al añadir el producto al carrito");
                        }
                        return response.json(); // o response.text() según lo que devuelva
                    })
                    .then(data => {
                        alert("Producto añadido al carrito");
                        console.log(data);
                    })
                    .catch(error => {
                        console.error("Error:", error);
                        alert("Hubo un error al añadir el producto al carrito.");
                    });
            });

            // Simula fecha de entrega
            const delivery = new Date();
            delivery.setDate(delivery.getDate() + 3);
            const options = { weekday: "long", month: "long", day: "numeric" };
            $("#delivery-date").text(delivery.toLocaleDateString("en-US", options));
        },
        error: function () {
            $("#main-content").html(`<div class="alert alert-danger">Producto no encontrado</div>`);
        }
    });
});