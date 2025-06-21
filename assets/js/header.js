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

function resetModal(clearFields = true) {
    // Reset login form
    $("#email, #password").each(function () {
        $(this).removeClass('is-invalid');
        if (clearFields) $(this).val('');
    });
    $('#remember-user').prop('checked', false);
    
    // Reset register form
    $("#register-name, #register-lastname, #register-email, #register-phone, #register-password").each(function () {
        $(this).removeClass('is-invalid');
        if (clearFields) $(this).val('');
    });
    $('#register-terms').prop('checked', false);
    
    // Limpiar mensajes de error
    $(".invalid-feedback").remove();
}

$(function () {
    // Mostrar vista de registro con limpieza
    $("#show-register").on('click', function (e) {
        e.preventDefault();
        resetModal();
        $("#login-view").hide();
        $("#register-view").show();
        $("#loginModalLabel").text("Crear Cuenta");
    });

    // Mostrar vista de login con limpieza
    $("#show-login").on('click', function (e) {
        e.preventDefault();
        resetModal(false); // No limpiar campos para mantener el email
        $("#register-view").hide();
        $("#login-view").show();
        $("#loginModalLabel").text("Inicio de Sesión");
    });

    // Validación de campos
    $("#email, #password").on('change', function () {
        $(this).removeClass('is-invalid');
        $(".invalid-feedback").remove();
    });

    $("#register-name, #register-lastname, #register-email, #register-phone, #register-password").on('change', function () {
        $(this).removeClass('is-invalid');
        $(".invalid-feedback").remove();
    });

    var myModal = document.getElementById('loginModal');
    myModal.addEventListener('hidden.bs.modal', function () {
        resetModal();
        // Mostrar vista de login al cerrar
        $("#register-view").hide();
        $("#login-view").show();
        $("#loginModalLabel").text("Inicio de Sesión");
    });

    // Validar si el correo ya existe cuando el usuario sale del campo
    $("#register-email").on('blur', function() {
        var email = $(this).val();
        if (email && validateEmail(email)) {
            checkEmailExists(email);
        }
    });

    // Función para verificar si el correo existe
    function checkEmailExists(email) {
        var url = "https://irrigexback.onrender.com/auth/check-email?email=" + encodeURIComponent(email);
        var method = "GET";

        var ifSuccess = function(response) {
            if (response.exists) {
                showEmailExistsError(email);
            }
        };

        var ifError = function(xhr) {
            console.log("Error al verificar email:", xhr);
        };

        callApi(url, method, null, ifSuccess, ifError);
    }

    // Función para mostrar error de correo existente
    function showEmailExistsError(email) {
        $("#register-email").addClass('is-invalid');
        $("<div class='invalid-feedback'>Este correo ya está registrado. <a href='#' id='go-to-login' class='text-decoration-none'>¿Iniciar sesión?</a></div>")
            .insertAfter("#register-email");
        
        // Manejar clic en el enlace "iniciar sesión"
        $("#go-to-login").on('click', function(e) {
            e.preventDefault();
            resetModal(false); // No limpiar campos
            $("#register-view").hide();
            $("#login-view").show();
            $("#loginModalLabel").text("Inicio de Sesión");
            $("#email").val(email);
            $("#register-email").val('').removeClass('is-invalid');
        });
    }

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
            // Verificar nuevamente si el email existe antes de enviar
            openLoader();
            checkEmailExistsBeforeSubmit(email, function(emailExists) {
                if (emailExists) {
                    showEmailExistsError(email);
                    closeLoader();
                } else {
                    submitRegistration(name, lastname, email, phone, password);
                }
            });
        }
    });

    // Función para verificar email antes de enviar el registro
    function checkEmailExistsBeforeSubmit(email, callback) {
        var url = "https://irrigexback.onrender.com/auth/check-email?email=" + encodeURIComponent(email);
        var method = "GET";

        callApi(url, method, null, function(response) {
            callback(response.exists);
        }, function() {
            callback(false); // En caso de error, permitir el envío
        });
    }

    // Función para enviar el registro
    function submitRegistration(name, lastname, email, phone, password) {
        var request = {
            name: name + (lastname ? ' ' + lastname : ''),
            email: email,
            password: password,
            phone: phone ? "+57" + phone : ""
        };

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
                
                // Si el error es porque el email ya existe
                if (xhr.responseJSON.message.toLowerCase().includes("ya existe")) {
                    showEmailExistsError(email);
                }
            }
            addAlert(errorMsg, "danger", 8);
            closeLoader();
        };

        callApi(url, method, request, ifSuccessRegister, ifErrorRegister);
    }

    // Función para validar teléfono (solo números, mínimo 10 dígitos)
    function validatePhone(phone) {
        // Eliminar cualquier carácter que no sea número
        var cleaned = phone.replace(/\D/g, '');
        // Validar que tenga al menos 10 dígitos (para Colombia)
        return cleaned.length >= 10;
    }

    // Función para validar email
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

    //boton de google en registro
    $("#registerGoogle2").on("click", function () {
        // Redirigir a la URL de OAuth2 Google
        window.location.href = "https://irrigexback.onrender.com/oauth2/authorization/google";
    });
});