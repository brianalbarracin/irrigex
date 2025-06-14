/*function resetModal() {
    $("#email, #password").each(function () {
        $(this).removeClass('is-invalid');
        $(this).val('');
    });

    $('#login-form')[0].reset();
}

$(function () {


  

    $("#email, #password").on('change', function () {
        $(this).removeClass('is-invalid');
    });

    var myModal = document.getElementById('loginModal');
    myModal.addEventListener('hidden.bs.modal', function () {
        resetModal();
    });

    $("#btnLogin").on('click', function () {
        $("#login-form button[type=submit]").click();
    });

    $("#main-nav .nav-link.page, #main-nav .dropdown-item.page").click(function () {
        var pag = $(this).data('tag');
        if (pag && pag !== null && pag !== undefined) {
            currentPage = pag;
        }
        else {
            currentPage = defaultPage;
        }
        $("#main-nav .nav-link.page, #main-nav .dropdown-item.page").removeClass('active');
        getPage(currentPage);
    });



    $("#login-form").submit(function (event) {
        event.preventDefault();

        var isValidForm = true;
        var email = $("#email").val();
        var password = $("#password").val();

        // Validación básica de campos
        if (email === "") {
            $("#email").addClass('is-invalid');
            isValidForm = false;
        }

        if (password === "") {
            $("#password").addClass('is-invalid');
            isValidForm = false;
        }

        if (isValidForm) {
            var request = {
                email: email,
                password: password
            };

            console.log("Login::request", request);

            var url = "https://irrigexback.onrender.com/auth/login";
            var method = "POST";

            var ifSuccessLogin = function (apiResponse) {
                console.log("Login::response", apiResponse);

                // Validar que venga el token y los datos esperados
                if (apiResponse.data && apiResponse.data.token) {
                    // Guardar token y datos en localStorage
                    localStorage.setItem("data-user", JSON.stringify(apiResponse.data));

                    addAlert("Usuario logueado con éxito", "success", 3);

                    // Redirigir al dashboard
                    setTimeout(function () {
                        window.location.replace("admin.html?");
                    }, 2000);
                } else {
                    $('#login-form')[0].reset();
                    addAlert("Credenciales inválidas", "warning");
                }

                closeLoader();
            };

            var ifErrorLogin = function (xhr) {
                console.log("XHR completo:", xhr);
                addAlert("Error en el servidor: " + xhr.status, "danger", 8);
                closeLoader();
            };

            openLoader();
            callApi(url, method, request, ifSuccessLogin, ifErrorLogin);
        }
    });

//boton de google
    $("#loginGoogle").on("click", function () {
    // Redirigir a la URL de OAuth2 Google
    window.location.href = "https://irrigexback.onrender.com/oauth2/authorization/google";
  });




});*/

function resetModal() {
    // Reset login form
    $("#email, #password").each(function () {
        $(this).removeClass('is-invalid');
        $(this).val('');
    });
    $('#login-form')[0].reset();

    // Reset register form
    $("#register-name, #register-lastname, #register-email, #register-password").each(function () {
        $(this).removeClass('is-invalid');
        $(this).val('');
    });
    $('#register-form')[0].reset();
    $('#register-terms').prop('checked', false);
}

$(function () {
    // Mostrar vista de registro
    $("#show-register").on('click', function (e) {
        e.preventDefault();
        $("#login-view").hide();
        $("#register-view").show();
        $("#loginModalLabel").text("Crear Cuenta");
    });

    // Mostrar vista de login
    $("#show-login").on('click', function (e) {
        e.preventDefault();
        $("#register-view").hide();
        $("#login-view").show();
        $("#loginModalLabel").text("Inicio de Sesión");
    });

    // Validación de campos
    $("#email, #password").on('change', function () {
        $(this).removeClass('is-invalid');
    });

    $("#register-name, #register-lastname, #register-email, #register-password").on('change', function () {
        $(this).removeClass('is-invalid');
    });

    var myModal = document.getElementById('loginModal');
    myModal.addEventListener('hidden.bs.modal', function () {
        resetModal();
        // Mostrar vista de login al cerrar
        $("#register-view").hide();
        $("#login-view").show();
        $("#loginModalLabel").text("Inicio de Sesión");
    });

    $("#login-form").submit(function (event) {
        event.preventDefault();

        var isValidForm = true;
        var email = $("#email").val();
        var password = $("#password").val();

        // Validación básica de campos
        if (email === "") {
            $("#email").addClass('is-invalid');
            isValidForm = false;
        }

        if (password === "") {
            $("#password").addClass('is-invalid');
            isValidForm = false;
        }

        if (isValidForm) {
            var request = {
                email: email,
                password: password
            };

            console.log("Login::request", request);

            var url = "https://irrigexback.onrender.com/auth/login";
            var method = "POST";

            var ifSuccessLogin = function (apiResponse) {
                console.log("Login::response", apiResponse);

                // Validar que venga el token y los datos esperados
                if (apiResponse.data && apiResponse.data.token) {
                    // Guardar token y datos en localStorage
                    localStorage.setItem("data-user", JSON.stringify(apiResponse.data));

                    addAlert("Usuario logueado con éxito", "success", 3);

                    // Redirigir al dashboard
                    setTimeout(function () {
                        window.location.replace("admin.html?");
                    }, 2000);
                } else {
                    $('#login-form')[0].reset();
                    addAlert("Credenciales inválidas", "warning");
                }

                closeLoader();
            };

            var ifErrorLogin = function (xhr) {
                console.log("XHR completo:", xhr);
                addAlert("Error en el servidor: " + xhr.status, "danger", 8);
                closeLoader();
            };

            openLoader();
            callApi(url, method, request, ifSuccessLogin, ifErrorLogin);
        }
    });

    // Manejo del formulario de registro
    $("#register-form").submit(function (event) {
        event.preventDefault();

        var isValidForm = true;
        var name = $("#register-name").val();
        var lastname = $("#register-lastname").val();
        var email = $("#register-email").val();
        var phone = $("#register-phone").val();
        var password = $("#register-password").val();
        var terms = $("#register-terms").is(":checked");

        // Validación de campos
        if (name === "") {
            $("#register-name").addClass('is-invalid');
            isValidForm = false;
        }

        if (email === "") {
            $("#register-email").addClass('is-invalid');
            isValidForm = false;
        } else if (!validateEmail(email)) {
            $("#register-email").addClass('is-invalid');
            isValidForm = false;
        }

        // Validación opcional del teléfono
        if (phone !== "" && !validatePhone(phone)) {
            $("#register-phone").addClass('is-invalid');
            addAlert("Por favor ingresa un número de teléfono válido (sin espacios ni guiones)", "warning");
            isValidForm = false;
        }

        if (password === "") {
            $("#register-password").addClass('is-invalid');
            isValidForm = false;
        } else if (password.length < 6) {
            $("#register-password").addClass('is-invalid');
            addAlert("La contraseña debe tener al menos 6 caracteres", "warning");
            isValidForm = false;
        }

        if (!terms) {
            $("#register-terms").addClass('is-invalid');
            addAlert("Debes aceptar los términos y condiciones", "warning");
            isValidForm = false;
        }

        if (isValidForm) {
            var request = {
                name: name + (lastname ? ' ' + lastname : ''),
                email: email,
                password: password,
                phone: phone ? "+57" + phone : "" // Agregamos el código de país si hay teléfono
            };

            console.log("Register::request", request);

            var url = "https://irrigexback.onrender.com/auth/register";
            var method = "POST";

            var ifSuccessRegister = function (apiResponse) {
                console.log("Register::response", apiResponse);

                if (apiResponse.data) {
                    addAlert("Registro exitoso. Por favor inicia sesión.", "success", 5);

                    // Cambiar a vista de login
                    $("#register-view").hide();
                    $("#login-view").show();
                    $("#loginModalLabel").text("Inicio de Sesión");

                    // Prellenar email en login
                    $("#email").val(email);

                    resetModal();
                } else {
                    addAlert("Error en el registro: " + (apiResponse.message || "Intente nuevamente"), "danger");
                }

                closeLoader();
            };

            var ifErrorRegister = function (xhr) {
                console.log("XHR completo:", xhr);
                var errorMsg = "Error en el servidor";
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMsg = xhr.responseJSON.message;
                }
                addAlert(errorMsg, "danger", 8);
                closeLoader();
            };

            openLoader();
            callApi(url, method, request, ifSuccessRegister, ifErrorRegister);
        }
    });

    // Función para validar teléfono (solo números, mínimo 10 dígitos)
    function validatePhone(phone) {
        // Eliminar cualquier carácter que no sea número
        var cleaned = phone.replace(/\D/g, '');
        // Validar que tenga al menos 10 dígitos (para Colombia)
        return cleaned.length >= 10;
    }

    // Función para validar email (ya existente)
    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    // Resto de tu código existente...
    $("#main-nav .nav-link.page, #main-nav .dropdown-item.page").click(function () {
        var pag = $(this).data('tag');
        if (pag && pag !== null && pag !== undefined) {
            currentPage = pag;
        }
        else {
            currentPage = defaultPage;
        }
        $("#main-nav .nav-link.page, #main-nav .dropdown-item.page").removeClass('active');
        getPage(currentPage);
    });

    //boton de google en registro
    $("#registerGoogle").on("click", function () {
        // Redirigir a la URL de OAuth2 Google
        window.location.href = "https://irrigexback.onrender.com/oauth2/authorization/google";
    });
});