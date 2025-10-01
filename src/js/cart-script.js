// function formatPrice(price) {
//     const formatter = new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'USD',
//         minimumFractionDigits: 2
//     });
//     return formatter.format(price);
// }


// document.addEventListener('DOMContentLoaded', () => {
//     // Esta é a função principal que desenha a tabela do carrinho
//     function renderCartItems() {
//         // Obtém o carrinho do LocalStorage (sempre pega o estado mais recente)
//         const cart = JSON.parse(localStorage.getItem('cart')) || [];
//         const cartTableBody = document.querySelector('.cart-table__body');
        
//         // Limpa a tabela para evitar itens duplicados
//         cartTableBody.innerHTML = '';

//         // Se o carrinho estiver vazio, mostra uma mensagem
//         if (cart.length === 0) {
//             cartTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Seu carrinho está vazio.</td></tr>';
//             // Zera os totais se não houver itens
//             updateCartTotals(0, 0, 0, 0); 
//             return; // Sai da função
//         }

//         // Se houver itens, cria as linhas da tabela
//         cart.forEach((product, index) => {
//             const row = document.createElement('tr');
//             row.className = 'cart-table__row';
//             row.innerHTML = `
//                 <td class="cart-table__column cart-table__column--image"><a href="#"><img src="${product.image}" alt=""></a></td>
//                 <td class="cart-table__column cart-table__column--product">
//                     <a href="#" class="cart-table__product-name">${product.name}</a>
//                 </td>
//                 <td class="cart-table__column cart-table__column--price" data-title="Price">${formatPrice(product.price)}</td>
//                 <td class="cart-table__column cart-table__column--quantity" data-title="Quantity">
//                     <div class="input-number">
//                         <input class="form-control input-number__input" type="number" min="1" value="${product.quantity}" data-index="${index}">
//                         <div class="input-number__add" data-index="${index}"></div>
//                         <div class="input-number__sub" data-index="${index}"></div>
//                     </div>
//                 </td>
//                 <td class="cart-table__column cart-table__column--total" data-title="Total">${formatPrice(product.price * product.quantity)}</td>
//                 <td class="cart-table__column cart-table__column--remove">
//                     <button type="button" class="btn btn-light btn-sm btn-svg-icon remove-item-btn" data-index="${index}">
//                         <svg width="12px" height="12px">
//                             <use xlink:href="images/sprite.svg#cross-12"></use>
//                         </svg>
//                     </button>
//                 </td>
//             `;
//             cartTableBody.appendChild(row);
//         });

//         // Adiciona os event listeners após o HTML ser renderizado
//         addEventListenersToCartItems();
//         calculateCartTotals();
//     }

//     // Função para adicionar listeners aos botões de quantidade e remover
//     function addEventListenersToCartItems() {
//         // Usamos delegação de eventos para ser mais eficiente
//         const cartTableBody = document.querySelector('.cart-table__body');


//         // Adicione esta função auxiliar
//         function updateCartTotalsDOM(subtotal, shippingCost, tax, total) {
//             const subtotalElement = document.querySelector('.cart__totals-header td'); // Verifique seus seletores reais
//             const shippingElement = document.querySelector('.cart__totals-body tr:nth-child(1) td'); // Verifique seus seletores reais
//             const taxElement = document.querySelector('.cart__totals-body tr:nth-child(2) td'); // Verifique seus seletores reais
//             const totalElement = document.querySelector('.cart__totals-footer td'); // Verifique seus seletores reais

//             if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
//             if (shippingElement) shippingElement.textContent = formatPrice(shippingCost);
//             if (taxElement) taxElement.textContent = formatPrice(tax);
//             if (totalElement) totalElement.textContent = formatPrice(total);
//         }
        
//         cartTableBody.addEventListener('click', (event) => {
//             const target = event.target;
//             const isAddButton = target.classList.contains('input-number__add');
//             const isSubButton = target.classList.contains('input-number__sub');
//             const isRemoveButton = target.classList.contains('remove-item-btn');

//             if (isAddButton || isSubButton || isRemoveButton) {
//                 const index = parseInt(target.dataset.index, 10);
//                 let cart = JSON.parse(localStorage.getItem('cart')) || [];

//                 if (isAddButton) {
//                     cart[index].quantity += 1;
//                 } else if (isSubButton) {
//                     cart[index].quantity -= 1;
//                     if (cart[index].quantity < 1) {
//                         cart[index].quantity = 1;
//                     }
//                 } else if (isRemoveButton) {
//                     // 1. Remove o item do array do carrinho
//                     cart.splice(index, 1);
//                     // 2. Salva o carrinho atualizado no LocalStorage
//                     localStorage.setItem('cart', JSON.stringify(cart));
                
//                     // 3. Remove o elemento <tr> correspondente do DOM diretamente
//                     const rowToRemove = target.closest('.cart-table__row');
//                     if (rowToRemove) {
//                         rowToRemove.remove();
//                     }
                
//                     // 4. Recalcula os totais e atualiza APENAS os elementos de totais no DOM
//                     calculateCartTotals(); // Esta função recalcula e chama updateCartTotalsDOM
//                 }
                
//                 // Salva a alteração no LocalStorage e re-renderiza a página
//                 localStorage.setItem('cart', JSON.stringify(cart));
//                 renderCartItems(); 
//             }
//         });

//         cartTableBody.addEventListener('change', (event) => {
//             const target = event.target;
//             if (target.classList.contains('input-number__input')) {
//                 const index = parseInt(target.dataset.index, 10);
//                 let cart = JSON.parse(localStorage.getItem('cart')) || [];
//                 cart[index].quantity = parseInt(target.value, 10);
                
//                 // Validação de quantidade
//                 if (cart[index].quantity < 1 || isNaN(cart[index].quantity)) {
//                     cart[index].quantity = 1;
//                 }

//                 localStorage.setItem('cart', JSON.stringify(cart));
//                 renderCartItems(); 
//             }
//         });
//     }


    



//     // Função para calcular e atualizar os totais
//     function calculateCartTotals() {
//         const cart = JSON.parse(localStorage.getItem('cart')) || [];
//         let subtotal = 0;
//         cart.forEach(item => {
//             subtotal += item.price * item.quantity;
//         });

//         const shippingCost = 25.00; // Valor fixo
//         const tax = 0.00; // Valor fixo
//         const total = subtotal + shippingCost + tax;

//         // Chamamos a função auxiliar para atualizar o DOM
//         updateCartTotals(subtotal, shippingCost, tax, total);
//     }

//     // Função auxiliar para atualizar o HTML com os totais
//     function updateCartTotals(subtotal, shippingCost, tax, total) {
//         // Precisamos de seletores específicos para cada elemento de total
//         // Por exemplo, você pode adicionar IDs aos seus <td>s: <td id="subtotal">...</td>
//         const subtotalElement = document.querySelector('.cart__totals-header td');
//         const shippingElement = document.querySelector('.cart__totals-body tr:nth-child(1) td');
//         const taxElement = document.querySelector('.cart__totals-body tr:nth-child(2) td');
//         const totalElement = document.querySelector('.cart__totals-footer td');

//         if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
//         if (shippingElement) shippingElement.textContent = formatPrice(shippingCost); // Use formatPrice aqui também
//         if (taxElement) taxElement.textContent = formatPrice(tax); // Use formatPrice aqui também
//         if (totalElement) totalElement.textContent = formatPrice(total);
//         //if (shippingElement) shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
//         //if (totalElement) totalElement.textContent = formatPrice(total);
//         //if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
//     }

//     // --- PONTO DE ENTRADA DO SCRIPT ---
//     // Apenas uma única chamada para iniciar o processo
//     renderCartItems();

// });




function formatPrice(price) {
    // Adiciona uma verificação explícita para NaN e retorna 0 formatado se for o caso
    if (typeof price !== 'number' || isNaN(price)) {
        price = 0; 
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
    return formatter.format(price);
}

document.addEventListener('DOMContentLoaded', () => {
    // --- INICIALIZAÇÃO E ZERAMENTO DOS TOTAIS ---
    // Sempre zerar os totais ao carregar a página do carrinho, caso contrário, valores antigos podem persistir
    function resetCartTotalsOnLoad() {
        updateCartTotals(0, 0, 0, 0); 
    }
    resetCartTotalsOnLoad(); // Chama a função logo no início

    function renderCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartTableBody = document.querySelector('.cart-table__body');
        
        cartTableBody.innerHTML = ''; // Limpa a tabela

        if (cart.length === 0) {
            cartTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Seu carrinho está vazio.</td></tr>';
            // Garante que os totais também sejam zerados se o carrinho estiver vazio
            updateCartTotals(0, 0, 0, 0); 
            return;
        }

        cart.forEach((product, index) => {
            const row = document.createElement('tr');
            row.className = 'cart-table__row';
            
            // ** VERIFICAÇÃO CRÍTICA ANTES DE RENDERIZAR **
            // Garante que product.name, product.price, product.quantity e product.image
            // sejam válidos ANTES de tentar usá-los.
            const productName = product.name || 'Produto Indisponível';
            // Garante que price e quantity sejam números. Se não forem, usa 0.
            const productPrice = Number(product.price);
            const productQuantity = Number(product.quantity);
            const productImage = product.image || 'images/placeholder.png'; // Fallback de imagem

            // Calcula o total da linha, garantindo que os cálculos sejam com números
            const lineTotal = (!isNaN(productPrice) && !isNaN(productQuantity)) ? productPrice * productQuantity : 0;

            row.innerHTML = `
                <td class="cart-table__column cart-table__column--image"><a href="#"><img src="${productImage}" alt="${productName}"></a></td>
                <td class="cart-table__column cart-table__column--product">
                    <a href="#" class="cart-table__product-name">${productName}</a>
                </td>
                <td class="cart-table__column cart-table__column--price" data-title="Price">${formatPrice(productPrice)}</td>
                <td class="cart-table__column cart-table__column--quantity" data-title="Quantity">
                    <div class="input-number">
                        <input class="form-control input-number__input" type="number" min="1" value="${isNaN(productQuantity) ? 1 : productQuantity}" data-index="${index}">
                        <div class="input-number__add" data-index="${index}"></div>
                        <div class="input-number__sub" data-index="${index}"></div>
                    </div>
                </td>
                <td class="cart-table__column cart-table__column--total" data-title="Total">${formatPrice(lineTotal)}</td>
                <td class="cart-table__column cart-table__column--remove">
                    <button type="button" class="btn btn-light btn-sm btn-svg-icon remove-item-btn" data-index="${index}">
                        <svg width="12px" height="12px">
                            <use xlink:href="images/sprite.svg#cross-12"></use>
                        </svg>
                    </button>
                </td>`;
            cartTableBody.appendChild(row);
        });

        addEventListenersToCartItems();
        calculateCartTotals();
    }

    // Função para adicionar listeners aos botões de quantidade e remover
    function addEventListenersToCartItems() {
        const cartTableBody = document.querySelector('.cart-table__body');

        // Use delegação de eventos
        // Remova listeners antigos para evitar duplicação (essencial!)
        cartTableBody.removeEventListener('click', handleCartClick);
        cartTableBody.removeEventListener('change', handleCartChange);

        // Adicione os novos listeners
        cartTableBody.addEventListener('click', handleCartClick);
        cartTableBody.addEventListener('change', handleCartChange);
    }

    // Handler consolidado para ações de clique (adicionar, remover)
    function handleCartClick(event) {
        const target = event.target;
        const button = target.closest('button, .input-number__add, .input-number__sub'); // Captura botões e elementos de controle de quantidade
        
        if (!button) return; // Sai se não for um botão de ação

        const row = button.closest('.cart-table__row');
        if (!row) return; // Sai se não encontrar a linha da tabela

        const index = parseInt(button.dataset.index, 10);
        if (isNaN(index)) return; // Sai se o índice for inválido

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (button.classList.contains('remove-item-btn')) {
            // --- LÓGICA DE REMOÇÃO OTIMIZADA ---
            cart.splice(index, 1); // Remove do array
            localStorage.setItem('cart', JSON.stringify(cart)); // Salva no localStorage
            
            row.remove(); // Remove o elemento <tr> do DOM imediatamente (mais rápido!)
            
            // Recalcula os totais após a remoção
            calculateCartTotals(); 
            
            // Se o carrinho ficou vazio, mostra a mensagem apropriada
            if (cart.length === 0) {
                const cartTableBody = document.querySelector('.cart-table__body');
                cartTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Seu carrinho está vazio.</td></tr>';
            }
        } else if (button.classList.contains('input-number__add') || button.classList.contains('input-number__sub')) {
            // Lógica para adicionar/subtrair quantidade
            const quantityInput = row.querySelector('.input-number__input');
            let currentQuantity = Number(quantityInput.value);
            
            if (isNaN(currentQuantity)) currentQuantity = 1; // Fallback

            if (button.classList.contains('input-number__add')) {
                currentQuantity += 1;
            } else if (button.classList.contains('input-number__sub')) {
                currentQuantity -= 1;
            }

            // Garante que a quantidade não seja menor que 1
            if (currentQuantity < 1) {
                currentQuantity = 1;
            }
            
            // Atualiza o valor no input do DOM
            quantityInput.value = currentQuantity;
            
            // Atualiza a quantidade no array do carrinho
            cart[index].quantity = currentQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Recalcula os totais
            calculateCartTotals();
        }
    }

    // Handler para a mudança direta na quantidade (input type="number")
    function handleCartChange(event) {
        const target = event.target;
        if (target.classList.contains('input-number__input')) {
            const row = target.closest('.cart-table__row');
            if (!row) return;

            const index = parseInt(target.dataset.index, 10);
            if (isNaN(index)) return;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Valida a nova quantidade
            const newQuantity = Number(target.value);
            let finalQuantity = 1; // Valor padrão

            if (!isNaN(newQuantity) && newQuantity >= 1) {
                finalQuantity = newQuantity;
            } else {
                console.warn("Quantidade direta inválida, resetando para 1.");
                target.value = 1; // Reseta o input no DOM
            }
            
            cart[index].quantity = finalQuantity; // Atualiza no array do carrinho
            localStorage.setItem('cart', JSON.stringify(cart)); // Salva
            
            // Recalcula os totais
            calculateCartTotals();
        }
    }

    // Função para calcular e atualizar os totais
    function calculateCartTotals() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let subtotal = 0;
        
        cart.forEach(item => {
            const price = Number(item.price);
            const quantity = Number(item.quantity);
            // Calcula o total da linha APENAS se ambos forem números válidos
            if (!isNaN(price) && !isNaN(quantity)) {
                subtotal += price * quantity;
            }
        });

        const shippingCost = 25.00; // Valor fixo
        const tax = 0.00; // Valor fixo
        const total = subtotal + shippingCost + tax;

        // Chama a função para atualizar o DOM com os totais formatados
        updateCartTotals(subtotal, shippingCost, tax, total);
    }

    // Função auxiliar para atualizar o HTML com os totais
    function updateCartTotals(subtotal, shippingCost, tax, total) {
        // Verifique se esses seletores correspondem exatamente ao seu HTML

        // const subtotalElement = document.querySelector('.cart__totals-header .cart-total-subtotal td'); // Exemplo: Adicione uma classe ou ID
        // const shippingElement = document.querySelector('.cart__totals-body .cart-total-shipping td'); // Exemplo
        // const taxElement = document.querySelector('.cart__totals-body .cart-total-tax td'); // Exemplo
        // const totalElement = document.querySelector('.cart__totals-footer .cart-total-final td'); // Exemplo



         // Usando seletores de ID específicos
        const subtotalElement = document.getElementById('cart-subtotal');
        const shippingElement = document.getElementById('cart-shipping');
        const taxElement = document.getElementById('cart-tax');
        const totalElement = document.getElementById('cart-total');

        // if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
        // if (shippingElement) shippingElement.textContent = formatPrice(shippingCost);
        // if (taxElement) taxElement.textContent = formatPrice(tax);
        // if (totalElement) totalElement.textContent = formatPrice(total);
            // A verificação `if (elemento)` garante que o código não falhe

                
        // se por algum motivo o elemento não for encontrado.
        if (subtotalElement) {
            subtotalElement.textContent = formatPrice(subtotal);
        } else {
            console.error("Erro: Elemento para subtotal não encontrado.");
        }
        
        if (shippingElement) {
            shippingElement.textContent = formatPrice(shippingCost);
        } else {
            console.error("Erro: Elemento para frete não encontrado.");
        }
        
        if (taxElement) {
            taxElement.textContent = formatPrice(tax);
        } else {
            console.error("Erro: Elemento para imposto não encontrado.");
        }
        
        if (totalElement) {
            totalElement.textContent = formatPrice(total);
        } else {
            console.error("Erro: Elemento para total não encontrado.");
        }
        
    }

    // --- PONTO DE ENTRADA DO SCRIPT ---
    renderCartItems(); // Desenha a tabela do carrinho ao carregar a página
});