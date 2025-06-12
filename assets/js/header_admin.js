var defaultPage = "principal";
var rootPath = "admin/";

$(function () {

    var objUser = redirectByLoginUser(true);
    var fullNombre = objUser.nombre;
    $("#data-user").html(fullNombre);


    $("#btn-principal").on("click", function (e) {
        e.preventDefault();
        getPage("principal", rootPath); // o window.location.href = "principal.html";
    });

    $("#btnLogout").on('click', function () {
       localStorage.clear();
       //localStorage.removeItem("data-user");
        redirectByLoginUser(true);
    });

    $("#main-nav .nav-link.page, #main-nav .dropdown-item.page .page").click(function () {
        localStorage.removeItem("id-inmueble");

        var pag = $(this).data('tag');
        if (pag && pag !== null && pag !== undefined) {
            currentPage = pag;
        }
        else {
            currentPage = defaultPage;
        }
        $("#main-nav .nav-link.page, #main-nav .dropdown-item.page .page").removeClass('active');
        getPage(currentPage, rootPath);
    });








    document.getElementById('btnReporte').addEventListener('click', () => {
  fetch('http://localhost:8787/api/reportes/productos-mas-vendidos')
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte-productos.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
});

});