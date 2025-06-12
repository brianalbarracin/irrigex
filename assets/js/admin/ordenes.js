

$(function () {
  const dataUser = JSON.parse(localStorage.getItem("data-user"));
  if (!dataUser || !dataUser.id) {
    console.warn("Usuario no autenticado");
    return;
  }

  fetch(`https://irrigexback.onrender.com/orders/user/${dataUser.id}`)
    .then(response => response.json())
    .then(result => {
      const orders = result.data || [];
      const container = document.getElementById("orders-container");

      if (orders.length === 0) {
        container.innerHTML = "<p>No tienes órdenes registradas.</p>";
        return;
      }

      orders.forEach(order => {
        const fecha = new Date(order.createdAt).toLocaleString("es-CO");
        const total = order.total.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
        });

        const metodoPago = order.payment?.paymentMethod || "N/A";
        const estadoPago = order.payment?.paymentStatus || "N/A";

        const productos = order.items
          .map(
            item => `
              <div class="d-flex align-items-center mb-2">
                <img src="${item.imageUrl}" alt="${item.productName}" class="me-2" style="width: 40px; height: 40px; object-fit: contain;" />
                <span>${item.productName} × ${item.quantity}</span>
              </div>
            `
          )
          .join("");

        const card = document.createElement("div");
        card.className = "col-md-6";

        card.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Orden #${order.id}</h5>
              <p class="card-text"><strong>Fecha:</strong> ${fecha}</p>
              <p class="card-text"><strong>Total:</strong> ${total}</p>
              <p class="card-text"><strong>Método de pago:</strong> ${metodoPago}</p>
              <p class="card-text"><strong>Estado del pago:</strong> ${estadoPago}</p>
              <hr />
              <div><strong>Productos:</strong></div>
              ${productos}
            </div>
            <div class="card-footer bg-transparent border-top mt-auto text-end">
              <a href="#" class="text-decoration-none text-primary">Ver detalles</a>
            </div>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => console.error("Error al cargar órdenes:", error));
});