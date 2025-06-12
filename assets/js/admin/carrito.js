
$(document).ready(function () {
    console.log("✅ carrito.js cargado");

    let cartItems = [];

    function getUserId() {
        const dataUser = JSON.parse(localStorage.getItem("data-user"));
        return dataUser?.id || null;
    }

    function fetchCartItems(userId) {
        fetch(`http://localhost:8787/cart/${userId}`)
            .then(res => res.json())
            .then(res => {
                if (res.status !== 200) throw new Error(res.message || "Error al obtener el carrito");
                cartItems = res.data.map(item => ({ ...item, selected: true }));
                renderCart();
            })
            .catch(err => {
                console.error("Error:", err);
                showEmptyCartMessage("No se pudo cargar el carrito.");
            });
    }

    function renderCart() {
        const container = $("#cart-items");
        container.empty();

        if (cartItems.length === 0) {
            showEmptyCartMessage();
            updateSummary(0, 0);
            return;
        }

        let total = 0;
        let totalItems = 0;

        cartItems.forEach(item => {
            const fullImgUrl = item.imageUrl.replace(/\\/g, '/');
            const subtotal = item.productPrice * item.quantity;

            if (item.selected) {
                total += subtotal;
                totalItems += item.quantity;
            }

            const html = `
                <div class="cart-item d-flex align-items-start" data-id="${item.id}">
                    <div class="me-3 pt-1">
                        <input type="checkbox" class="form-check-input select-item" ${item.selected ? "checked" : ""} />
                    </div>
                    <div class="flex-shrink-0 me-3">
                        <img src="/tuunidad-web/${fullImgUrl}" alt="${item.productName}" class="product-img" />
                    </div>
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between">
                            <h6 class="mb-1">${item.productName}</h6>
                            <div class="fw-bold">$${subtotal.toLocaleString()}</div>
                        </div>
                        <div class="stock-badge mb-2">En Stock</div>
                        <div class="text-muted small mb-2">Precio unitario: $${item.productPrice.toLocaleString()}</div>
                        
                        <div class="d-flex align-items-center">
                            <div class="quantity-control me-3">
                                <button class="quantity-btn btn btn-outline-secondary btn-sm btn-minus">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="quantity-display">${item.quantity}</span>
                                <button class="quantity-btn btn btn-outline-secondary btn-sm btn-plus">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <button class="btn btn-link text-danger p-0 btn-delete">
                                <i class="fas fa-trash me-1"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                `;

            container.append(html);
        });

        updateSummary(total, totalItems);
    }

    function updateSummary(total, itemCount) {
        const formattedTotal = total.toLocaleString('es-ES', { minimumFractionDigits: 2 });

        if (itemCount > 0) {
            $("#subtotal-text").text(`$${formattedTotal}`);
            $("#total-text").text(`$${formattedTotal}`);
            $(".summary-card").show();
        } else {
            $(".summary-card").hide();
        }
    }

    function showEmptyCartMessage(message = null) {
        const emptyCart = $("#empty-cart-message");
        const cartItems = $("#cart-items");

        if (message) {
            emptyCart.find("h4").text("Error al cargar el carrito");
            emptyCart.find("p").text(message);
        }

        emptyCart.show();
        cartItems.hide();
        $(".summary-card").hide();
    }

    function toggleSelection(id) {
        const item = cartItems.find(i => i.id === id);
        if (item) {
            item.selected = !item.selected;
            renderCart();
        }
    }

    // Delegación de eventos
    $("#cart-items").on("change", ".select-item", function () {
        const id = parseInt($(this).closest(".cart-item").data("id"));
        toggleSelection(id);
    });

    $("#cart-items").on("click", ".btn-minus", function () {
        const id = parseInt($(this).closest(".cart-item").data("id"));
        updateQuantity(id, -1);
    });

    $("#cart-items").on("click", ".btn-plus", function () {
        const id = parseInt($(this).closest(".cart-item").data("id"));
        updateQuantity(id, 1);
    });

    $("#cart-items").on("click", ".btn-delete", function () {
        const id = parseInt($(this).closest(".cart-item").data("id"));
        removeItem(id);
    });

    function updateQuantity(cartItemId, delta) {
        const item = cartItems.find(i => i.id === cartItemId);
        if (!item) return;

        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) return removeItem(cartItemId);

        const userId = getUserId();

        fetch(`http://localhost:8787/cart/${userId}/update?productId=${item.productId}&quantity=${newQuantity}`, {
            method: "PUT"
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al actualizar");
                item.quantity = newQuantity;
                renderCart();
            })
            .catch(err => console.error("Error:", err));
    }

    function removeItem(cartItemId) {
        const item = cartItems.find(i => i.id === cartItemId);
        if (!item) return;

        const userId = getUserId();

        fetch(`http://localhost:8787/cart/${userId}/remove?productId=${item.productId}`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) throw new Error("Error al eliminar");
                cartItems = cartItems.filter(i => i.id !== cartItemId);
                renderCart();
            })
            .catch(err => console.error("Error:", err));
    }

    // Inicializar
    const userId = getUserId();
    if (userId) {
        fetchCartItems(userId);
    } else {
        showEmptyCartMessage("Debes iniciar sesión para ver el carrito.");
    }

    $(document).on('click', '#continuar-preorden', function (e) {
        e.preventDefault();

        const itemsSeleccionados = cartItems.filter(item => item.selected);
        if (itemsSeleccionados.length === 0) {
            alert("Debes seleccionar al menos un producto.");
            return;
        }

        localStorage.setItem("items-preorden", JSON.stringify(itemsSeleccionados));
        history.pushState({}, '', '?page=preorden');
        getPage('../admin/pages/preorden');
    });
});

