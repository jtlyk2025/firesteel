const addToCartBtn = document.getElementById('addToCartBtn');

addToCartBtn.addEventListener('click', () => {
    // Get product data from data attributes
    const productId = addToCartBtn.dataset.productId;
    const productName = addToCartBtn.dataset.productName;
    const productPrice = parseFloat(addToCartBtn.dataset.productPrice);

    // Create a product object
    const newProduct = {
        id: productId,
        name: productName,
        price: productPrice
    };

    // Get the current cart from local storage, or an empty array if none exists
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new product to the cart
    cart.push(newProduct);

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to the cart page
    window.location.href = 'cart.html';
});



document.addEventListener("DOMContentLoaded", () => {
    const subtotalElement = document.querySelector(".cart__totals-header td");
    const totalCartElement = document.querySelector(".cart__totals-footer td");
    const couponForm = document.querySelector(".cart__coupon-form");

    let shipping = 25.00;
    let discountPercent = 0;

    // Atualiza totais do carrinho
    function updateCartTotals() {
        let subtotal = 0;

        document.querySelectorAll(".cart-table__row").forEach(row => {
            const qtyInput = row.querySelector(".input-number__input");
            const priceElement = row.querySelector(".cart-table__column--price");
            const totalElement = row.querySelector(".cart-table__column--total");

            if (!qtyInput || !priceElement || !totalElement) return;

            let price = parseFloat(priceElement.textContent.replace("$", "").replace(",", ""));
            let qty = parseInt(qtyInput.value) || 1;
            let totalProduct = price * qty;

            totalElement.textContent = `$${totalProduct.toFixed(2)}`;
            subtotal += totalProduct;
        });

        // aplica desconto
        let discount = subtotal * discountPercent;
        let totalCart = subtotal + shipping - discount;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalCartElement.textContent = `$${totalCart.toFixed(2)}`;
    }

    // Ativa eventos para uma linha
    function attachRowEvents(row) {
        const qtyInput = row.querySelector(".input-number__input");
        const btnAdd = row.querySelector(".input-number__add");
        const btnSub = row.querySelector(".input-number__sub");
        const removeBtn = row.querySelector(".cart-table__column--remove button");

        if (btnAdd) {
            btnAdd.addEventListener("click", () => {
                qtyInput.value = parseInt(qtyInput.value) + 1;
                updateCartTotals();
            });
        }

        if (btnSub) {
            btnSub.addEventListener("click", () => {
                let val = parseInt(qtyInput.value);
                if (val > 1) qtyInput.value = val - 1;
                updateCartTotals();
            });
        }

        if (qtyInput) {
            qtyInput.addEventListener("change", updateCartTotals);
        }

        if (removeBtn) {
            removeBtn.addEventListener("click", () => {
                row.remove();
                updateCartTotals();
            });
        }
    }

    // Cupom
    if (couponForm) {
        couponForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const code = document.querySelector("#input-coupon-code").value.trim().toUpperCase();
            if (code === "DESCONTO10") {
                discountPercent = 0.10;
                alert("Cupom aplicado: 10% OFF");
            } else {
                discountPercent = 0;
                alert("Cupom inválido");
            }
            updateCartTotals();
        });
    }

    // ---------------------------
    // 🚀 Função para adicionar produto dinamicamente
    // ---------------------------
    function addProductToCart(product) {
        const tbody = document.querySelector(".cart-table__body");

        // Verifica se já existe (mesmo nome)
        let existingRow = [...document.querySelectorAll(".cart-table__row")].find(row => {
            return row.querySelector(".cart-table__product-name").textContent === product.name;
        });

        if (existingRow) {
            const qtyInput = existingRow.querySelector(".input-number__input");
            qtyInput.value = parseInt(qtyInput.value) + product.qty;
            updateCartTotals();
            return;
        }

        // Cria nova linha
        const row = document.createElement("tr");
        row.classList.add("cart-table__row");

        row.innerHTML = `
            <td class="cart-table__column cart-table__column--image">
                <a href="#"><img src="${product.image}" alt=""></a>
            </td>
            <td class="cart-table__column cart-table__column--product">
                <a href="#" class="cart-table__product-name">${product.name}</a>
                <ul class="cart-table__options">
                    ${product.options.map(opt => `<li>${opt}</li>`).join("")}
                </ul>
            </td>
            <td class="cart-table__column cart-table__column--price" data-title="Price">$${product.price.toFixed(2)}</td>
            <td class="cart-table__column cart-table__column--quantity" data-title="Quantity">
                <div class="input-number">
                    <input class="form-control input-number__input" type="number" min="1" value="${product.qty}">
                    <div class="input-number__add"></div>
                    <div class="input-number__sub"></div>
                </div>
            </td>
            <td class="cart-table__column cart-table__column--total" data-title="Total">$${(product.price * product.qty).toFixed(2)}</td>
            <td class="cart-table__column cart-table__column--remove">
                <button type="button" class="btn btn-light btn-sm btn-svg-icon">
                    <svg width="12px" height="12px"><use xlink:href="images/sprite.svg#cross-12"></use></svg>
                </button>
            </td>
        `;

        tbody.appendChild(row);
        attachRowEvents(row);
        updateCartTotals();
    }

    // Torna global para usar em outras páginas
    window.addProductToCart = addProductToCart;

    // Inicializa eventos das linhas já existentes
    document.querySelectorAll(".cart-table__row").forEach(row => attachRowEvents(row));

    // Inicializa totais
    updateCartTotals();
});


document.addEventListener('DOMContentLoaded', function() {
    // Inicializa os dois carrosséis Owl Carousel
    const featuredCarousel = $('#product-image');
    const thumbCarousel = $('#product-carousel');

    featuredCarousel.owlCarousel({
        items: 1,
        dots: false,
        nav: true,
        loop: false,
        mouseDrag: false, // Desativa o arrastar padrão do Owl Carousel
        touchDrag: false, // Desativa o arrastar padrão para toque
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
    });

    thumbCarousel.owlCarousel({
        items: 4,
        dots: false,
        nav: false,
        margin: 10,
        slideBy: 1,
        responsive: {
            0: {
                items: 3
            },
            768: {
                items: 4
            }
        }
    });

    // Sincroniza o carrossel de miniaturas com a imagem principal
    thumbCarousel.on('click', '.owl-item', function() {
        featuredCarousel.trigger('to.owl.carousel', [$(this).index(), 300]);
    });

    // Lógica para o efeito 360° de arrastar
    const productGallery = document.querySelector('.product-gallery__featured');
    let isDragging = false;
    let startX = 0;
    const dragThreshold = 50; // Sensibilidade de arrasto em pixels

    productGallery.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.pageX || e.touches[0].pageX;
        productGallery.style.cursor = 'grabbing';
    });

    productGallery.addEventListener('mouseup', function() {
        isDragging = false;
        productGallery.style.cursor = 'grab';
    });

    productGallery.addEventListener('mouseleave', function() {
        isDragging = false;
        productGallery.style.cursor = 'grab';
    });

    productGallery.addEventListener('mousemove', function(e) {
        if (!isDragging) return;

        const currentX = e.pageX;
        const deltaX = currentX - startX;

        // Se o arrasto ultrapassou o limite, muda a imagem e reseta a posição
        if (Math.abs(deltaX) > dragThreshold) {
            if (deltaX < 0) { // Arrastando para a esquerda (próxima imagem)
                featuredCarousel.trigger('next.owl.carousel');
            } else { // Arrastando para a direita (imagem anterior)
                featuredCarousel.trigger('prev.owl.carousel');
            }
            startX = currentX; // Reseta a posição inicial para o próximo movimento
        }
    });

    // Adiciona suporte a dispositivos móveis
    productGallery.addEventListener('touchstart', function(e) {
        isDragging = true;
        startX = e.touches[0].pageX;
    });

    productGallery.addEventListener('touchend', function() {
        isDragging = false;
    });

    productGallery.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        const currentX = e.touches[0].pageX;
        const deltaX = currentX - startX;
        if (Math.abs(deltaX) > dragThreshold) {
            if (deltaX < 0) {
                featuredCarousel.trigger('next.owl.carousel');
            } else {
                featuredCarousel.trigger('prev.owl.carousel');
            }
            startX = currentX;
        }
    });
});