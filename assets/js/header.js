function resetModal() {
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

            var url = "http://irrigexback.onrender.com/auth/login";
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
    window.location.href = "http://localhost:8787/oauth2/authorization/google";
  });




});

