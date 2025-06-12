
$(document).ready(function () {
    // Tu código JavaScript original aquí
    $("#items-resumen").empty();

    const dataUser = JSON.parse(localStorage.getItem("data-user"));
    if (dataUser && dataUser.id) {
        fetchDirecciones(dataUser.id);
    } else {
        console.warn("Usuario no autenticado");
    }

    console.log("Datos del usuario", dataUser);

    const items = JSON.parse(localStorage.getItem("items-preorden")) || [];
    let total = 0;
    let cantidad = 0;

    const agrupados = {};

    items.forEach(item => {
        if (!agrupados[item.productId]) {
            agrupados[item.productId] = { ...item };
        } else {
            agrupados[item.productId].quantity += item.quantity;
        }
    });

    Object.values(agrupados).forEach(item => {
        const subtotal = item.productPrice * item.quantity;
        total += subtotal;
        cantidad += item.quantity;

        $("#items-resumen").append(`
                <div class="order-item">
                    <span>${item.productName} × ${item.quantity}</span>
                    <span>$${subtotal.toLocaleString()}</span>
                </div>
            `);
    });

    $("#order-total").text(`Total (${cantidad} ${cantidad !== 1 ? 'items' : 'item'}): $${total.toLocaleString()}`);

    let direcciones = [];

    function fetchDirecciones(userId) {
        fetch(`https://irrigexback.onrender.com/addresses/user/${userId}`)
            .then(res => res.json())
            .then(res => {
                if (res.status !== 200) throw new Error("Error cargando direcciones");
                direcciones = res.data;
                mostrarDireccionPrincipal();
            })
            .catch(err => console.error("Error:", err));
    }

    function mostrarDireccionPrincipal() {
        const dir = direcciones[0];
        if (dir) {
            $("#direccion-seleccionada").text(`${dir.addressLine}, ${dir.city}, ${dir.zipCode}, Colombia`);
            localStorage.setItem("direccion-seleccionada", JSON.stringify(dir));
        }
    }

    function mostrarListaDirecciones() {
        $("#direcciones").empty();
        direcciones.forEach((dir, index) => {
            $("#direcciones").append(`
                    <div class="address-card mb-2">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="direccion" id="dir-${index}" value="${index}" ${index === 0 ? "checked" : ""}>
                            <label class="form-check-label" for="dir-${index}">
                                <strong>${dir.addressLine}</strong><br>
                                ${dir.city}, ${dir.zipCode}, Colombia
                            </label>
                        </div>
                    </div>
                `);
        });
        $("#address-panel").hide();
        $("#direccion-lista").show();
    }

    function seleccionarDireccion() {
        const index = $("input[name='direccion']:checked").val();
        const seleccionada = direcciones[index];
        $("#direccion-seleccionada").text(`${seleccionada.addressLine}, ${seleccionada.city}, ${seleccionada.zipCode}, Colombia`);
        localStorage.setItem("direccion-seleccionada", JSON.stringify(seleccionada));
        $("#direccion-lista").hide();
        $("#address-panel").show();
    }

    $("#cambiar-direccion").on("click", function (e) {
        e.preventDefault();
        mostrarListaDirecciones();
    });

    $("#confirmar-direccion").on("click", seleccionarDireccion);

    // Mejora en la selección de métodos de pago
    $(".payment-method").on("click", function () {
        $(".payment-method").removeClass("selected");
        $(this).addClass("selected");
        $(this).find("input[type='radio']").prop("checked", true);
    });

    // Resto de tu código JavaScript...
    // (Mantén todas las funciones de pago y modales que ya tenías)

    $("#btn-finalizar-pago").on("click", async function () {
        const metodoPago = $("input[name='pago']:checked").val();
        const direccion = JSON.parse(localStorage.getItem("direccion-seleccionada"));
        const items = JSON.parse(localStorage.getItem("items-preorden")) || [];

        localStorage.setItem("data-user", JSON.stringify(dataUser));
        localStorage.setItem("direccion-seleccionada", JSON.stringify(direccion));
        localStorage.setItem("items-preorden", JSON.stringify(items));

        if (!direccion) {
            alert("Por favor selecciona una dirección de envío.");
            return;
        }

        if (items.length === 0) {
            alert("No hay productos en el carrito.");
            return;
        }

        if (metodoPago === "casa") {
            const modal = new bootstrap.Modal(document.getElementById('modalPagoCasa'));
            modal.show();
        } else {
            let total = 0;

            items.forEach(item => {
                let precio = item.productPrice;

                if (typeof precio === "string") {
                    precio = parseFloat(precio.replace(/\./g, "").replace(",", ".").replace("$", ""));
                }

                total += precio * item.quantity;
            });

            const valorCentavos = Math.round(total * 100);
            const referencia = "pedido_" + Math.floor(Math.random() * 1000000000);
            const encodedRedirectURL = encodeURIComponent("https://irrigexback.onrender.com/template/admin/pages/pago-exitoso.html");
            const publicKey = "pub_test_U0cv8Y3HoE8OGb5iLSmoPo3pon27d1e5";
            const currency = "COP";
            const integritySecret = "test_integrity_ZZk4FdVEjZssNCbT6YWmeyFgqmbPZKqi"
            const expirationTime = "2026-06-09T20:28:50.000Z"

            const firma = await generarFirmaSHA256(referencia, valorCentavos, currency, integritySecret);

            const url = `https://checkout.wompi.co/p/?public-key=${publicKey}` +
                `&currency=${currency}` +
                `&amount-in-cents=${valorCentavos}` +
                `&reference=${referencia}` +
                `&signature%3Aintegrity=${firma}` +
                `&redirect-url=${encodedRedirectURL}`;

            console.log("✅ URL generada para Wompi:", url);
            window.location.href = url;
        }
    });

    $("#confirmarPagoCasa").on("click", function () {
        const userId = dataUser?.id;
        const addressId = direccion?.id;

        if (!userId || !addressId) {
            alert("Faltan datos del usuario o la dirección.");
            return;
        }

        fetch(`https://irrigexback.onrender.com/orders/create?userId=${userId}&addressId=${addressId}&paymentMethod=casa`, {
            method: "POST"
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 201) {
                    alert("Orden creada exitosamente. Te redirigiremos a órdenes para que la puedas ver creada, nos contactaremos contigo tan pronto como sea posible");
                    location.reload();
                } else {
                    alert("Hubo un problema al crear la orden: " + res.message);
                }
            })
            .catch(err => {
                console.error("Error en creación de orden:", err);
                alert("No se pudo completar la orden.");
            });
    });

    async function generarFirmaSHA256(reference, amountInCents, currency, integritySecret) {
        let cadena = reference + amountInCents + currency;
        cadena += integritySecret;

        const encoder = new TextEncoder();
        const encoded = encoder.encode(cadena);
        const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
});