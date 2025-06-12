
$(function () {

    console.log("Cargando estados...");

    fetch("https://irrigexback.onrender.com/states")
        .then(response => response.json())
        .then(data => {

            console.log("Iniciando carga de estados...");
            console.log("Respuesta recibida:", data);
            const select = document.getElementById("municipio");
            select.innerHTML = ""; // Limpia el contenido anterior

            const states = data.data;
            states.forEach(state => {
                const option = document.createElement("option");
                option.value = state.id;
                option.textContent = state.name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error("Error al cargar estados:", error));

    /*Es este espacio solicito la información del usuario*/

    const user = JSON.parse(localStorage.getItem("data-user"));

    if (!user || !user.email) {
        console.warn("No hay usuario logueado");
        return;
    }

    fetch(`https://irrigexback.onrender.com/api/users/email/${user.email}`)
        .then(response => response.json())
        .then(data => {

            console.log("Respuesta completa del backend:", data);
            const userData = data.data;

            console.log("Datos del usuario:", userData);

            // Rellenar los campos del formulario
            $("#nombre").val(userData.name ?? "");
            $("#telefono").val(userData.phone ?? "");
            $("#identificacion").val(userData.cedula ?? "");
            $("#direccion").val(userData.addressLine ?? "");
            $("#ciudad").val(userData.city ?? "");
            $("#zip").val(userData.zipCode ?? "");
        })
        .catch(error => {
            console.error("Error al cargar los datos del usuario:", error);
        });


    /* Desde aqui se guarda el formulario*/

    $("#formulario-persona").on("submit", async function (e) {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("data-user"));
        if (!user || !user.id) {
            addAlert("No hay sesión activa", "danger");
            return;
        }

        // 1. Construir datos del usuario
        const userUpdate = {
            name: $("#nombre").val(),
            cedula: $("#identificacion").val(),
            phone: $("#telefono").val(),
            email: user.email
        };

        // 2. Construir datos de la dirección
        const addressUpdate = {
            addressLine: $("#direccion").val(),
            zipCode: $("#zip").val(),
            stateId: $("#municipio").val(),
            city: $("#ciudad").val(), // Si tienes este campo, puedes capturarlo de otro input
            country: "Colombia" // o déjalo opcional
        };

        openLoader();

        try {
            // 3. Actualizar usuario
            await fetch(`https://irrigexback.onrender.com/api/users/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userUpdate)
            });

            // 4. Consultar si ya tiene dirección registrada
            const result = await fetch(`https://irrigexback.onrender.com/addresses/user/${user.id}`);
            const addressList = await result.json();

            if (addressList.data && addressList.data.length > 0) {
                // 4. Tiene dirección → hacer PUT
                const addressId = addressList.data[0].id;
                await fetch(`https://irrigexback.onrender.com/addresses/${addressId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(addressUpdate)
                });
            } else {
                // 5. No tiene dirección → hacer POST
                await fetch(`https://irrigexback.onrender.com/addresses/user/${user.id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(addressUpdate)
                });
            }

            addAlert("Datos guardados con éxito", "success", 3);


        } catch (error) {
            console.error("Error al guardar datos:", error);
            addAlert("Error al guardar datos", "danger", 4);
        } finally {
            closeLoader();
        }
    });




});

function guardarNuevaPersona(request) {

    var ifSuccessNuevaPersona = function (response) {
        $("#formulario-persona")[0].reset();
        closeLoader();
        addAlert("Registro creado con exito", "success", 3);
    }

    var url = "https://irrigexback.onrender.com/persona";
    openLoader();
    callApi(url, "POST", request, ifSuccessNuevaPersona, ifErrorRequest);

}
