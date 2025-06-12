$(function () {
    const user = JSON.parse(localStorage.getItem("data-user"));
    if (!user || !user.email) {
        addAlert("No se encontró el usuario", "danger");
        return;
    }

    // 1. Traer info del usuario y llenar campos
    fetch(`http://localhost:8787/api/users/email/${user.email}`)
        .then(response => response.json())
        .then(res => {
            const data = res.data;
            $("#nombre").val(data.name).prop("readonly", true).addClass("bg-light");
            $("#telefono").val(data.phone).prop("readonly", true).addClass("bg-light");
            $("#identificacion").val(data.cedula).prop("readonly", true).addClass("bg-light");
            $("#tipo-identificacion").val("CC").prop("disabled", true).addClass("bg-light");
        });

    // 2. Cargar departamentos
    fetch("http://localhost:8787/states")
        .then(res => res.json())
        .then(data => {
            const $select = $("#municipio");
            $select.empty().append('<option disabled selected>Seleccione un departamento</option>');
            data.data.forEach(state => {
                $select.append(`<option value="${state.id}">${state.name}</option>`);
            });
        });

    // 3. Manejar envío del formulario
    $("#formulario-persona").on("submit", function (e) {
        e.preventDefault();

        // Validación
        const direccion = $("#direccion").val();
        const ciudad = $("#ciudad").val();
        const stateId = $("#municipio").val();
        const zip = $("#zip").val();

        if (!direccion || !ciudad || !stateId || !zip) {
            addAlert("Todos los campos son obligatorios", "warning");
            return;
        }

        const nuevaDireccion = {
            addressLine: direccion,
            city: ciudad,
            zipCode: zip,
            stateId: stateId,
            country: "Colombia"
        };

        fetch(`http://localhost:8787/addresses/user/${user.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaDireccion)
        })
        .then(res => res.json())
        .then(res => {
            addAlert("Dirección guardada correctamente", "success", 3);
            $("#formulario-persona")[0].reset();

            getPage("direcciones", rootPath);
        })
        .catch(err => {
            console.error("Error guardando dirección", err);
            addAlert("Ocurrió un error al guardar la dirección", "danger");
        });
    });
});