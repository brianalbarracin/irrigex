var priceSlider = null;
$(document).ready(function () {
    // Dummy data by category

    $(".prod-cat a").removeClass("active");

    const productsByCategory = {
        "Dress": [
            { id: 1, title: "ATOM 14 WFC", typical: "$21.300", price: "$19.800", image: "assets/src/images/Riego/Apersores/ATOM14WFC.png?v=2" },
            { id: 2, title: "ATOM 14 FC", typical: "$26.300", price: "$25.000", image: "assets/src/images/Riego/Apersores/ATOM14FC.png?v=2" },
            { id: 3, title: "ATOM 14 PC", typical: "$26.200", price: "$25.000", image: "assets/src/images/Riego/Apersores/ATOM14PC.png?v=2" }

        ],
        "Pant": [
            { id: 4, title: "ATOM 15 FC", typical: "$24.300", price: "$22.400", image: "assets/src/images/Riego/Apersores/ATOM15FC.png?v=2" },
            { id: 5, title: "ATOM 15 LF", typical: "$24.300", price: "$22.400", image: "assets/src/images/Riego/Apersores/ATOM15LF.png?v=2" },
            { id: 6, title: "ATOM 15 PC", typical: "$30.200", price: "$28.600", image: "assets/src/images/Riego/Apersores/ATOM15PC.png?v=2" },
            { id: 7, title: "ATOM 15 PC/LF", typical: "$30.200", price: "$28.600", image: "assets/src/images/Riego/Apersores/ATOM15PC-LF.png?v=2" },
            { id: 8, title: "ATOM 22 PC", typical: "$182.000", price: "$170.000", image: "assets/src/images/Riego/Apersores/ATOM22PC.png?v=2" },
            { id: 9, title: "ATOM ECO 22 FC", typical: "$132.000", price: "$105.000", image: "assets/src/images/Riego/Apersores/ATOMECO22FC.png?v=2" }
        ],

        "Shirt-aspersores": [
            { id: 10, title: "ATOM 23 PC", typical: "$203.000", price: "$195.000", image: "assets/src/images/Riego/Apersores/ATOM23PC.png?v=2" },
            { id: 11, title: "ATOM 28 ECO", typical: "$268.300", price: "$260.000", image: "assets/src/images/Riego/Apersores/ATOM28ECO.png?v=2" },
            { id: 12, title: "ATOM 28 PC", typical: "$345.200", price: "$335.000", image: "assets/src/images/Riego/Apersores/ATOM28PC.png?v=2" },
            { id: 13, title: "ATOM 30 ECO PC", typical: "$302.200", price: "$275.000", image: "assets/src/images/Riego/Apersores/ATOM30ECOFC.png?v=2" },
            { id: 14, title: "ATOM 30 PC", typical: "$360.200", price: "$340.000", image: "assets/src/images/Riego/Apersores/ATOM30PC.png?v=2" }
        ],
        "Beauty-aspersores": [
            { id: 15, title: "ATOM 35", typical: "$472.200", price: "$450.000", image: "assets/src/images/Riego/Apersores/ATOM35.png?v=2" },
            { id: 16, title: "ATOM 40 S", typical: "$920.000", price: "$840.000", image: "assets/src/images/Riego/Apersores/ATOM40S.png?v=2" },
            { id: 17, title: "ATOM 42 FC", typical: "$950.000", price: "$850.000", image: "assets/src/images/Riego/Apersores/ATOM42FC.png?v=2" },
            { id: 18, title: "ATOM 42 PC", typical: "$1230000", price: "$1100.000", image: "assets/src/images/Riego/Apersores/ATOM42PC.png?v=2" }
        ],

        "Jet3035": [
            { id: 19, title: "JET 35", typical: "$1500.200", price: "$1450.000", image: "assets/src/images/Riego/Apersores/JET35.png?v=2" },
            { id: 20, title: "JET 40", typical: "$1920.000", price: "$1850.000", image: "assets/src/images/Riego/Apersores/JET40.png?v=2" }

        ]


    };


    //renderizacion de productos por selecion en categoría

    function renderProducts(category, page = 1) {
        const perPage = 6;
        const start = (page - 1) * perPage;
        const products = productsByCategory[category] || [];

        console.log("Porque mierdas no se mnuestra este:", category);
        const selected = products;
        //const selected = products.slice(start, start + perPage);
        const productHtml = selected.map(p => `
    <div class="col-md-4 mb-4">
        <a href="#" class="product-link" data-id="${p.id}">
            <div class="card h-100 shadow-sm border-0">
                <div class="position-relative">
                    <img src="${p.image}" class="card-img-top img-fluid selectable-image" alt="${p.title}">
                    <span class="badge bg-danger position-absolute top-0 start-0 m-2">20% off</span>
                    <span class="badge bg-light text-danger border position-absolute top-0 end-0 m-2">Oferta por tiempo limitado</span>
                </div>
                <div class="card-body text-start">
                    <h5 class="card-title fw-semibold" style="min-height: 48px;">${p.title}</h5>
                    <div>
                        <span class="text-danger fw-bold fs-5">${p.price}</span>
                        <span class="text-muted text-decoration-line-through ms-2 fs-6">Antes: ${p.typical}</span>
                    </div>
                </div>
            </div>
        </a>
    </div>
`).join("");

        $(".product-list").html(productHtml);

        // Pagination
        /* const pages = Math.ceil(products.length / perPage);
         let paginationHtml = "";
         for (let i = 1; i <= pages; i++) {
             paginationHtml += `<li><a href="#" class="page-link" data-page="${i}" data-category="${category}">${i}</a></li>`;
         }*/
        $(".pagination").html("");
    }

    // renderizacion de productos por barra search

    function searchAndRenderProducts(keyword) {
        const lowerKeyword = keyword.toLowerCase();
        let filteredProducts = [];

        // Recorremos todas las categorías
        Object.keys(productsByCategory).forEach(category => {
            productsByCategory[category].forEach(product => {
                if (
                    product.title.toLowerCase().includes(lowerKeyword) ||
                    product.price.replace('$', '').toLowerCase().includes(lowerKeyword)
                ) {
                    filteredProducts.push(product);
                }
            });
        });

        // Renderizamos los productos encontrados


        const productHtml = filteredProducts.map(p => `
    <div class="col-md-4 mb-4">
        <a href="#" class="product-link" data-id="${p.id}">
            <div class="card h-100 shadow-sm border-0">
                <div class="position-relative">
                    <img src="${p.image}" class="card-img-top img-fluid selectable-image" alt="${p.title}">
                    <span class="badge bg-danger position-absolute top-0 start-0 m-2">20% off</span>
                    <span class="badge bg-light text-danger border position-absolute top-0 end-0 m-2">Oferta por tiempo limitado</span>
                </div>
                <div class="card-body text-start">
                    <h5 class="card-title fw-semibold" style="min-height: 48px;">${p.title}</h5>
                    <div>
                        <span class="text-danger fw-bold fs-5">${p.price}</span>
                        <span class="text-muted text-decoration-line-through ms-2 fs-6">Antes: ${p.typical}</span>
                    </div>
                </div>
            </div>
        </a>
    </div>
`).join("");



        $(".product-list").html(productHtml);
        $(".pagination").html(""); // Oculta la paginación al hacer búsqueda


    }


    // render productos por slider


    $('#apply-price-filter').on('click', function () {

        console.log("Slider:", priceSlider);
        const values = priceSlider.noUiSlider.get();
        const min = parseFloat(values[0]);
        const max = parseFloat(values[1]);

        let filtered = [];

        Object.keys(productsByCategory).forEach(category => {
            productsByCategory[category].forEach(product => {
                const price = parseFloat(product.price.replace('$', ''));
                if (price >= min && price <= max) {
                    filtered.push(product);
                }
            });
        });


        const productHtml = filtered.map(p => `
    <div class="col-md-4 mb-4">
        <a href="#" class="product-link" data-id="${p.id}">
            <div class="card h-100 shadow-sm border-0">
                <div class="position-relative">
                    <img src="${p.image}" class="card-img-top img-fluid selectable-image" alt="${p.title}">
                    <span class="badge bg-danger position-absolute top-0 start-0 m-2">20% off</span>
                    <span class="badge bg-light text-danger border position-absolute top-0 end-0 m-2">Oferta por tiempo limitado</span>
                </div>
                <div class="card-body text-start">
                    <h5 class="card-title fw-semibold" style="min-height: 48px;">${p.title}</h5>
                    <div>
                        <span class="text-danger fw-bold fs-5">${p.price}</span>
                        <span class="text-muted text-decoration-line-through ms-2 fs-6">Antes: ${p.typical}</span>
                    </div>
                </div>
            </div>
        </a>
    </div>
`).join("");


        $(".product-list").html(productHtml);
        $(".pagination").html(""); // Oculta paginación
    });



    console.log("¿Existe el input?", $('#keyword-search').length);

    //inicializador busqueda searhch bar

    $(document).on('keyup', '#keyword-search', function (e) {
        console.log("Tecla presionada:", e.key); // Verifica si captura "Enter"
        if (e.key === "Enter") {
            e.preventDefault();
            const keyword = $(this).val().trim();
            console.log("Palabra clave:", keyword);
            if (keyword) {
                searchAndRenderProducts(keyword);
            }
        }
    });


    //inicializador slider
    const priceSliderElement = document.getElementById('price-range');
    if (priceSliderElement && !priceSliderElement.noUiSlider) {
        noUiSlider.create(priceSliderElement, {
            start: [15, 824],
            connect: true,
            range: {
                min: 0,
                max: 4750
            },
            step: 1,
            tooltips: true,
            format: {
                to: value => `${Math.round(value)}.000`, // ← Aquí agregamos la K
                from: value => Number(value.replace('.000', ''))
            }
        });

        priceSlider = priceSliderElement; // <== ASIGNACIÓN CLAVE

        priceSlider.noUiSlider.on('update', function (values) {
            $('#min-price').text(values[0]);
            $('#max-price').text(values[1]);
        });
    } else {
        console.warn("Slider no encontrado o noUiSlider no disponible");
    }

    //inicializador busqueda por categoría

    $(".prod-cat").click(function (e) {
        e.preventDefault();

        const category = $(this).data("category");
        console.log("Categoría clickeada:", category);

        if (category && productsByCategory.hasOwnProperty(category)) {
            console.log("Categoría clickeada:", category);
            renderProducts(category, 1);
        } else {
            console.warn("Categoría inválida o no definida:", category);
        }
    });


    //aqui busca la página de acuerdo al click en cualquiera de los elementos.


    let isProcessingClick = false;

    $(document).on('click', '.product-link', function (e) {
        e.preventDefault();

        if (isProcessingClick) return;
        isProcessingClick = true;
        
        const productId = $(this).data("id");

        // Guarda el ID en la URL sin recargar
        history.pushState({}, '', `?page=detalle-producto&id=${productId}`);

        // Llama tu función SPA
        //getPage('../admin/pages/detalle-producto-admin');
        getPage('../admin/pages/detalle-producto-admin').then(() => {
            isProcessingClick = false; // Rehabilita clics al cargar
        }).catch(() => {
            isProcessingClick = false; // Aún si falla, reactivar
        });
    });


    //renderiza al inicio de la página

    function renderMultipleCategories(categories) {
        let combinedProducts = [];

        categories.forEach(category => {
            if (productsByCategory[category]) {
                combinedProducts = combinedProducts.concat(productsByCategory[category]);
            }
        });

        const productHtml = combinedProducts.map(p => `
        <div class="col-md-4 mb-4">
            <a href="#" class="product-link" data-id="${p.id}">
                <div class="card h-100 shadow-sm border-0">
                    <div class="position-relative">
                        <img src="${p.image}" class="card-img-top img-fluid selectable-image" alt="${p.title}">
                        <span class="badge bg-danger position-absolute top-0 start-0 m-2">20% off</span>
                        <span class="badge bg-light text-danger border position-absolute top-0 end-0 m-2">Oferta por tiempo limitado</span>
                    </div>
                    <div class="card-body text-start">
                        <h5 class="card-title fw-semibold" style="min-height: 48px;">${p.title}</h5>
                        <div>
                            <span class="text-danger fw-bold fs-5">${p.price}</span>
                            <span class="text-muted text-decoration-line-through ms-2 fs-6">Antes: ${p.typical}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `).join("");

        $(".product-list").html(productHtml);
        $(".pagination").html(""); // Oculta paginación
    }





    renderMultipleCategories(["Jet3035", "Pant"]);


});


