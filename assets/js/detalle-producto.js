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
                $("#product-description").text(p.description);

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
                        <img src="${url}" class="thumb-img ${i === 0 ? 'active' : ''}" 
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
            },
            error: function () {
                $("#main-content").html(`<div class="alert alert-danger">Producto no encontrado</div>`);
            }
        });

        // Función de zoom (solo para desktop)
        function initImageZoom() {
            // Solo activar zoom en pantallas grandes
            if ($(window).width() < 1200) return;

            const img = document.getElementById('product-image');
            const zoomPreview = document.getElementById('zoom-preview');

            if (!img || !img.complete || !img.naturalWidth) return;

            // Configurar el background del zoom-preview
            zoomPreview.style.backgroundImage = `url('${img.src}')`;
            zoomPreview.style.backgroundSize = `${img.naturalWidth}px ${img.naturalHeight}px`;

            // Elimina cualquier evento previo (para evitar duplicados)
            $(img).off('mousemove mouseout mouseenter');

            $(img).on('mousemove', function (e) {
                zoomPreview.style.display = 'block';

                const bounds = img.getBoundingClientRect();
                const x = e.clientX - bounds.left;
                const y = e.clientY - bounds.top;

                const percentX = x / bounds.width;
                const percentY = y / bounds.height;

                const bgX = -(percentX * (img.naturalWidth - zoomPreview.offsetWidth));
                const bgY = -(percentY * (img.naturalHeight - zoomPreview.offsetHeight));

                zoomPreview.style.backgroundPosition = `${bgX}px ${bgY}px`;
            });

            $(img).on('mouseenter', function() {
                zoomPreview.style.display = 'block';
            });

            $(img).on('mouseout', function() {
                zoomPreview.style.display = 'none';
            });
        }

        // Manejar redimensionamiento de la ventana
        $(window).on('resize', function() {
            initImageZoom();
        });
    });