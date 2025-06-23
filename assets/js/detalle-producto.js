$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) return;

    $.ajax({
        url: `https://irrigexback.onrender.com/products/${productId}`,
        method: "GET",
        success: function (response) {
            const p = response.data;

            $("#product-title").text(p.name);
            $("#product-price").text(`$${p.price}`);
            $("#product-typical").text(`$${p.typicalPrice || "74.95"}`);
            $("#product-description").html(p.description.replace(/\n/g, "<br>"));

            setTimeout(setupDescriptionToggle, 100);

            // Imagen principal
            const mainImageUrl = p.imageUrls[0];
            $("#product-image").attr("src", mainImageUrl);

            // Cargar imagen antes de iniciar el zoom
            const preloadMain = new Image();
            preloadMain.src = mainImageUrl;
            preloadMain.onload = function () {
                $("#zoom-preview").css("background-image", `url('${mainImageUrl}')`);
                initImageZoom();
            };

            // Miniaturas
            if (p.imageUrls.length > 0) {
                const thumbsHtml = p.imageUrls.map((url, i) => `
                        <img src="${url}" class="img-thumbnail thumb-img ${i === 0 ? 'active' : ''}" 
                             data-index="${i}" data-url="${url}" alt="Miniatura ${i + 1}">
                    `).join("");
                $("#image-thumbs").html(thumbsHtml);

                $(".thumb-img").on("click", function () {
                    const url = $(this).data("url");
                    $("#product-image").attr("src", url);
                    $(".thumb-img").removeClass("active");
                    $(this).addClass("active");

                    const newImg = new Image();
                    newImg.src = url;
                    newImg.onload = function () {
                        $("#zoom-preview").css("background-image", `url('${url}')`);
                        initImageZoom(); // Reiniciar el zoom con nueva imagen
                    };
                });
            }

            // Añadir al carrito (simulado)
            $("#add-to-cart").on("click", function () {
                alert(`Producto "${p.name}" no añadido (simulación)`);
            });

            // Fecha de entrega simulada
            const delivery = new Date();
            delivery.setDate(delivery.getDate() + 3);
            const options = { weekday: "long", month: "long", day: "numeric" };
            $("#delivery-date").text(delivery.toLocaleDateString("es-ES", options));

            // Controlador para la descripción colapsable - CORREGIDO
            /*$("#description-toggle").on("click", function () {
                const container = $("#description-container");
                const toggleText = $(this).find(".toggle-text");
                const icon = $(this).find("i");

                if (container.hasClass("expanded")) {
                    container.removeClass("expanded");
                    toggleText.text("Mostrar más");
                    icon.css("transform", "rotate(0deg)");
                } else {
                    container.addClass("expanded");
                    toggleText.text("Mostrar menos");
                    icon.css("transform", "rotate(180deg)");
                }
            });*/

            // Ocultar el toggle si la descripción es corta
            const descriptionHeight = $("#product-description").height();
            if (descriptionHeight < 100) {
                $("#description-toggle").hide();
                $("#description-container").addClass("expanded");
            }
        },
        error: function () {
            $("#main-content").html(`<div class="alert alert-danger">Producto no encontrado</div>`);
        }
    });

    // Función de zoom (solo para desktop)
    function initImageZoom() {
        // Solo activar el zoom en pantallas grandes
        if ($(window).width() < 768) {
            return;
        }

        const img = document.getElementById('product-image');
        const zoomPreview = document.getElementById('zoom-preview');

        if (!img || !img.complete || !img.naturalWidth) return;

        // Configurar el background del zoom-preview
        zoomPreview.style.backgroundImage = `url('${img.src}')`;
        zoomPreview.style.backgroundSize = `${img.naturalWidth}px ${img.naturalHeight}px`;

        // Elimina cualquier evento previo (para evitar duplicados)
        img.onmousemove = null;
        img.onmouseout = null;
        img.onmouseenter = null;

        img.onmousemove = function (e) {
            zoomPreview.style.display = 'block';

            const bounds = img.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            const percentX = x / bounds.width;
            const percentY = y / bounds.height;

            const bgX = -(percentX * (img.naturalWidth - zoomPreview.offsetWidth));
            const bgY = -(percentY * (img.naturalHeight - zoomPreview.offsetHeight));

            zoomPreview.style.backgroundPosition = `${bgX}px ${bgY}px`;
        };

        img.onmouseenter = function () {
            zoomPreview.style.display = 'block';
        };

        img.onmouseout = function () {
            zoomPreview.style.display = 'none';
        };
    }

    // Manejar el redimensionamiento de la ventana
    $(window).on("resize", function () {
        if ($(window).width() >= 768) {
            initImageZoom();
        }
    });


    function setupDescriptionToggle() {
        const container = $("#description-container");
        const toggle = $("#description-toggle");
        const description = $("#product-description");

        // Mostrar el botón solo si el contenido sobrepasa el contenedor
        if (description[0].scrollHeight > container[0].clientHeight + 10) {
            toggle.show();

            toggle.off("click").on("click", function () {
                const expanded = container.hasClass("expanded");

                container.toggleClass("expanded");
                toggle.toggleClass("expanded");

                toggle.find("span").text(expanded ? "Mostrar más" : "Mostrar menos");
            });
        } else {
            toggle.hide();
            container.addClass("expanded");
        }
    }


});