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

        ],
        "Jet5055": [
            { id: 21, title: "JET 50", typical: "$2500.200", price: "$2400.000", image: "assets/src/images/Riego/Apersores/JET50.png?v=2" },
            { id: 22, title: "JET 55", typical: "$3920.000", price: "$3250.000", image: "assets/src/images/Riego/Apersores/JET55.png?v=2" }

        ],
        "Jet6570": [
            { id: 23, title: "JET 65", typical: "$3700.200", price: "$3650.000", image: "assets/src/images/Riego/Apersores/JET65.png?v=2" },
            { id: 24, title: "JET 70", typical: "$5650.000", price: "$4750.000", image: "assets/src/images/Riego/Apersores/JET70.png?v=2" }

        ],
        "Estercoleros": [
            { id: 25, title: "JET 35T", typical: "$2500.200", price: "$1950.000", image: "assets/src/images/Riego/Apersores/JET35T.png?v=2" },
            { id: 26, title: "JET 50T", typical: "$3250.000", price: "$2475.000", image: "assets/src/images/Riego/Apersores/JET50T.png?v=2" }

        ]
        ,
        "Ngun": [
            { id: 27, title: "Ngun28", typical: "$500.200", price: "$450.000", image: "assets/src/images/Riego/Apersores/NGUN28.png?v=2" },
            { id: 28, title: "Ngun40", typical: "$1250.000", price: "$1000.000", image: "assets/src/images/Riego/Apersores/NGUN40.png?v=2" }

        ]
        ,
        "Industriales": [
            { id: 29, title: "ATOM 42 DUST43", typical: "$1300.000", price: "$1200.000", image: "assets/src/images/Riego/Apersores/ATOM42DUST43.png?v=2" },
            { id: 30, title: "Super DUSTJET43", typical: "$4250.000", price: "$3750000", image: "assets/src/images/Riego/Apersores/SUPERDUSTJET43.png?v=2" }

        ]
        ,
        "Bases": [
            { id: 31, title: "Mini ECO 1 in", typical: "$300.000", price: "$270.000", image: "assets/src/images/Riego/Apersores/MINIECO1PVC.png?v=2" },
            { id: 32, title: "Mini ECO 1 in PVC", typical: "$250.000", price: "$230.000", image: "assets/src/images/Riego/Apersores/MINIECO1ALUM.png?v=2" },
            { id: 33, title: "PRO ECO 1,5 in", typical: "$400.000", price: "$385.000", image: "assets/src/images/Riego/Apersores/PROECO1.5.png?v=2" },
            { id: 34, title: "PRO ECO 4 Pod 1,5", typical: "$450.000", price: "$425.000", image: "assets/src/images/Riego/Apersores/PROECO4POD1.5.png?v=2" }
            ,
            { id: 35, title: "PRO ECO 4 Pod 2 in QC", typical: "$550.000", price: "$480.000", image: "assets/src/images/Riego/Apersores/PROECO4POD2QC.png?v=2" }
            ,
            { id: 36, title: "4 Pod 2 in", typical: "$690.000", price: "$650.000", image: "assets/src/images/Riego/Apersores/4POD2.png?v=2" }
            ,
            { id: 37, title: "4 Pod 3 in", typical: "$890.000", price: "$884.000", image: "assets/src/images/Riego/Apersores/4POD3.png?v=2" }

        ]

        ,
        "Basesruedas": [
            { id: 38, title: "Wheeled Raingun Cart 1 in", typical: "$570000", price: "$470.000", image: "assets/src/images/Riego/Apersores/BASERUEDASCAÑON1.png?v=2" },
            { id: 39, title: "Wheeled Raingun Cart 1,5 in", typical: "$715.000", price: "$615.000", image: "assets/src/images/Riego/Apersores/BASERUEDASCAÑON1.5.png?v=2" },
            { id: 40, title: "Wheeled Raingun Cart with 2 in", typical: "$1035.000", price: "$935.000", image: "assets/src/images/Riego/Apersores/BASERUEDASCAÑON2.png?v=2" }

        ]
        ,
        "Couplings": [
            { id: 41, title: "Quick Coupling", typical: "$195000", price: "$175.000", image: "assets/src/images/Riego/Apersores/ACOPLERAPIDO1.png?v=2" },
            { id: 42, title: "Quick Coupling 2 in", typical: "$315.000", price: "$228.000", image: "assets/src/images/Riego/Apersores/ACOPLERAPIDO2.png?v=2" }

        ]


    };

    //renderizacion de productos por selecion en categoría moviles

    function renderMobileProducts(products) {
        const mobileProductHtml = products.map(p => `
                <div class="mobile-product-card">
                    <a href="#" class="product-link" data-id="${p.id}">
                        <div class="card h-100 product-card">
                            <div class="position-relative">
                                <img src="${p.image}" class="card-img-top mobile-product-image" alt="${p.title}">
                                <span class="badge discount-badge position-absolute top-0 start-0 m-2">20%</span>
                            </div>
                            <div class="card-body">
                                <h6 class="card-title">${p.title}</h6>
                                <div>
                                    <span class="text-danger fw-bold price-badge">${p.price}</span>
                                    <span class="original-price ms-2 small">${p.typical}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            `).join("");

        $("#mobile-products-container").html(mobileProductHtml);
    }

    //renderizacion de productos por selecion en categoría

    /*function renderProducts(category, page = 1) {
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

        $(".pagination").html("");
    }*/



    function renderDesktopProducts(products) {
        const productHtml = products.map(p => `
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

        $(".pagination").html("");
    }

    // Función para cargar productos por categoría
    function loadProductsByCategory(category) {
        const products = productsByCategory[category] || [];

        if ($(window).width() < 768) {
            renderMobileProducts(products);

            // Cerrar el panel de filtros y scroll automático
            $(".mobile-filter-panel").slideUp();

            // Actualizar solo el nombre de categoría (sin guiones ni texto largo)
            const categoryText = $(`.prod-cat[data-category="${category}"]`).text().trim().replace(/^-\s*/, '');
            $(".mobile-category-title").text(categoryText);

            // Quitar texto largo adicional si lo hubiera
           // $(".mobile-category-description").hide();
        } else {
            renderDesktopProducts(products);
        }
    }

    // Manejar clics en categorías
    $(".prod-cat").click(function (e) {
        e.preventDefault();
        const category = $(this).data("category");
        if (category) {
            loadProductsByCategory(category);
        }
    });

    // Toggle para filtros móviles
    $("#mobile-filter-toggle").click(function () {
        $(".mobile-filter-panel").slideToggle();
    });

    // Inicializar slider de precios para móviles
    if ($(window).width() < 768) {
        noUiSlider.create(document.getElementById('price-range-mobile'), {
            start: [15, 824],
            connect: true,
            range: {
                'min': 0,
                'max': 4750
            },
            step: 1,
            tooltips: true,
            format: {
                to: value => `${Math.round(value)}.000`,
                from: value => Number(value.replace('.000', ''))
            }
        });

        document.getElementById('price-range-mobile').noUiSlider.on('update', function (values) {
            $('#min-price-mobile').text(values[0]);
            $('#max-price-mobile').text(values[1]);
        });
    }


    $('#apply-price-filter-mobile').on('click', function () {
        const values = document.getElementById('price-range-mobile').noUiSlider.get();
        const min = parseFloat(values[0].replace('.000', ''));
        const max = parseFloat(values[1].replace('.000', ''));

        let filtered = [];

        Object.keys(productsByCategory).forEach(category => {
            productsByCategory[category].forEach(product => {
                const price = parseFloat(product.price.replace('$', '').replace('.', '').replace(',', '.'));
                if (price >= min && price <= max) {
                    filtered.push(product);
                }
            });
        });

        renderMobileProducts(filtered);
        $(".mobile-category-title").text("Filtrado por precio");
    });

    // Cargar productos iniciales
    if ($(window).width() < 768) {
        // Cargar todos los productos o una categoría por defecto
        const allProducts = Object.values(productsByCategory).flat();
        renderMobileProducts(allProducts);
    } else {
        // Cargar categoría por defecto en desktop
        loadProductsByCategory("Dress");
    }

    // Manejar redimensionamiento de pantalla
    $(window).resize(function () {
        if ($(window).width() < 768) {
            $(".mobile-filter-panel").hide();
        }
    });

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
    }

    //inicializador busqueda por categoría

    /*$(".prod-cat").click(function (e) {
        e.preventDefault();

        const category = $(this).data("category");
        console.log("Categoría clickeada:", category);

        if (category && productsByCategory.hasOwnProperty(category)) {
            console.log("Categoría clickeada:", category);
            renderProducts(category, 1);
        } else {
            console.warn("Categoría inválida o no definida:", category);
        }
    });*/

    $(document).on('click', '.product-link', function (e) {
        e.preventDefault();
        const productId = $(this).data("id");

        // Guarda el ID en la URL sin recargar
        history.pushState({}, '', `?page=detalle-producto&id=${productId}`);

        // Llama tu función SPA
        getPage('detalle-producto');
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


