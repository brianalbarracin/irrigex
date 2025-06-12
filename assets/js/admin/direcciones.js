$(function () {
    const dataUser = JSON.parse(localStorage.getItem("data-user"));
    if (!dataUser || !dataUser.id) {
      console.warn("Usuario no autenticado");
      return;
    }

    fetch(`https://irrigexback.onrender.com/addresses/user/${dataUser.id}`)
      .then(response => response.json())
      .then(result => {

        console.log("Respuesta completa del backend direcciones:", dataUser);
        const addresses = result.data || [];
        const container = document.getElementById("addresses-container");

        addresses.forEach(address => {
          const card = document.createElement("div");
          card.className = "col-md-4";
          card.innerHTML = `
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <h5 class="card-title">${dataUser.name || "Nombre"}</h5>
                <p class="card-text mb-1">${address.addressLine || ""}</p>
                <p class="card-text mb-1">${address.city || ""}, ${address.zipCode || ""}</p>
                <p class="card-text mb-1">Colombia</p>
                <p class="card-text mb-2"><strong>Teléfono:</strong> ${address.phone || ""}</p>
                <a href="#" class="card-link">Add delivery instructions</a>
              </div>
              <div class="card-footer bg-transparent border-top mt-auto">
                <a href="#" class="me-3 text-decoration-none">Editar</a>
                <a href="#" class="me-3 text-decoration-none">Quitar</a>
                <a href="#" class="text-decoration-none">Dirección por defecto</a>
              </div>
            </div>
          `;
          container.appendChild(card);
        });
      })
      .catch(error => console.error("Error al cargar direcciones:", error));
  });
  