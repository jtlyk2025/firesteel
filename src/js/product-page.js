// document.addEventListener('DOMContentLoaded', () => {

//      // 1. Selecionar os elementos necessários
//      const addToCartBtn = document.getElementById('addToCartBtn');
//      const productNameElement = document.querySelector('.product__name');
//      const productPriceElement = document.querySelector('.product__prices');
//      const productQuantityInput = document.getElementById('product-quantity');
//      const productImageElement = document.querySelector('.product-gallery__featured img');

//      // 2. Adicionar um "ouvinte de evento" (event listener) ao botão
//      if (addToCartBtn) {
//          addToCartBtn.addEventListener('click', () => {
//              // 3. Coletar os dados do produto
//              const name = productNameElement.textContent.trim();
//              const priceText = productPriceElement.textContent.trim();
//              // Remover o cifrão e a vírgula e converter para um número de ponto flutuante
//              const price = parseFloat(priceText.replace('$', '').replace(',', ''));
//              const quantity = parseInt(productQuantityInput.value, 10);
//              const image = productImageElement.src;

//             // 4. Criar um objeto com as informações do produto
//             const product = {
//                 name: name,
//                 price: price,
//                 image: image,
//                 quantity: quantity
//              };
//             // 5. Obter o carrinho do LocalStorage ou criar um novo se não existir
//             let cart = JSON.parse(localStorage.getItem('cart')) || [];
//             // 6. Verificar se o produto já está no carrinho para atualizar a quantidade
//             const existingProductIndex = cart.findIndex(item => item.name === product.name);
//             if (existingProductIndex > -1) {
//                 // Se o produto já existe, apenas atualiza a quantidade
//                 cart[existingProductIndex].quantity += product.quantity;
//              } else {
//                  // Se o produto é novo, adiciona-o ao carrinho
//                  cart.push(product);
//              }

//              // 7. Salvar o carrinho atualizado no LocalStorage
//              localStorage.setItem('cart', JSON.stringify(cart));

//              // 8. Opcional: Redirecionar para a página do carrinho
//             window.location.href = 'cart.html';
//          });
//      }
    
//     });





 //Apenas um único DOMContentLoaded para toda a lógica da página
//  document.addEventListener('DOMContentLoaded', function() {
    
//      // Seu código de includes (já parece estar funcionando)
//      document.querySelectorAll("[data-include]").forEach(el => {
//          const file = el.getAttribute("data-include");
//          fetch(file)
//              .then(resp => resp.text())
//              .then(html => {
//                  el.innerHTML = html;
//              })
//              .catch(err => console.error("Erro ao carregar include:", err));
//      });

//      // Função principal para adicionar ao carrinho
//      function addToCart(event) {
//          // ... (o seu código que já está correto) ...
//          event.preventDefault();

//         // 1. Coletar os dados do produto, ajustando o preço
//             const priceString = document.querySelector('.product__prices').textContent;
//         // Remove o '$' e a vírgula ',' e converte para um número de ponto flutuante.
//             const productPrice = parseFloat(priceString.replace(/[$,]/g, ''));

//          const productInfo = {
//              name: document.querySelector('.product__name').textContent, // Você precisará verificar se este seletor está correto para o seu produto
//              price: productPrice, // Usando o valor de preço já convertido
//              quantity: parseInt(document.getElementById('product-quantity').value, 10), // Converte a quantidade para um número inteiro
//              image: document.querySelector('.product-gallery__featured img').src,
//          };
        
//          const selectedColor = document.querySelector('input[name="color"]:checked');
//          const selectedMaterial = document.querySelector('input[name="material"]:checked');      
//          if (selectedColor) {
//              productInfo.color = selectedColor.parentElement.style.color || 
//                             selectedColor.parentElement.getAttribute('data-color') || 
//                             selectedColor.parentElement.title;
//         }
        
//          if (selectedMaterial) {
//              productInfo.material = selectedMaterial.nextElementSibling.textContent;
//          }
        
//          let cart = JSON.parse(localStorage.getItem('cart')) || [];      
//          const existingProductIndex = cart.findIndex(item => 
//             item.name === productInfo.name && 
//              item.color === productInfo.color && 
//              item.material === productInfo.material
//          );
        
        
//          if (existingProductIndex !== -1) {
//              cart[existingProductIndex].quantity = parseInt(cart[existingProductIndex].quantity) + parseInt(productInfo.quantity);
//          } else {
//              cart.push(productInfo);
//          }
        
//          localStorage.setItem('cart', JSON.stringify(cart));
        
//          alert('Product added to cart!');
//      }

//      // Event listener para o botão de adicionar ao carrinho
//      const addToCartBtn = document.querySelector('.product__actions-item--addtocart button');
//      if (addToCartBtn) {
//          addToCartBtn.addEventListener('click', addToCart);
//      }
    
//      // Código para os botões de produtos relacionados, se necessário
//      const relatedProductButtons = document.querySelectorAll('.product-card__addtocart');
//      relatedProductButtons.forEach(button => {
//          button.addEventListener('click', function() {
//              // ... (seu código para adicionar produtos relacionados) ...
//          });
//      });

//      // Código para o botão dos departamentos, se necessário
//      const deptButton = document.querySelector(".departments__button");
//      const deptWrapper = document.querySelector(".departments__links-wrapper");
//      if (deptButton && deptWrapper) {
//          deptButton.addEventListener("click", function() {
//              if (deptWrapper.style.height === "0px" || !deptWrapper.style.height) {
//                  deptWrapper.style.height = deptWrapper.scrollHeight + "px";
//                 deptWrapper.style.opacity = "1";
//             } else {
//                 deptWrapper.style.height = "0px";
//                 deptWrapper.style.opacity = "0";
//              }
//          });
//      }

//  });






// document.addEventListener('DOMContentLoaded', function() {

//     // Função para adicionar ao carrinho
//     function addToCart(event) {
//         event.preventDefault();

//         // 1. Coletar os dados do produto.
//         const productCard = event.target.closest('.product-card__actions');

//         // 2. Coletar e limpar o preço.
//         const priceString = productCard.querySelector('.product-card__prices').textContent;
//         const productPrice = parseFloat(priceString.replace(/[$,]/g, ''));

//         const productInfo = {
//             name: productCard.closest('.product-card').querySelector('.product-card__name a').textContent,
//             price: productPrice,
//             quantity: 1, // Quantidade padrão para adição rápida
//             image: productCard.closest('.product-card').querySelector('.product-card__image img').src,
//         };

//         // 3. Obter o carrinho atual do LocalStorage ou criar um novo array se não existir.
//         let cart = JSON.parse(localStorage.getItem('cart')) || [];

//         // 4. Verificar se o produto já existe no carrinho.
//         const existingProductIndex = cart.findIndex(item => item.name === productInfo.name);

//         if (existingProductIndex !== -1) {
//             // Se o produto já existe, apenas atualiza a quantidade.
//             cart[existingProductIndex].quantity += 1;
//         } else {
//             // Se não existe, adiciona o novo produto ao carrinho.
//             cart.push(productInfo);
//         }

//         // 5. Salvar o carrinho atualizado no LocalStorage.
//         localStorage.setItem('cart', JSON.stringify(cart));

//         alert('Product added to cart!');

//         // 6. Redireciona para a página do carrinho
//         window.location.href = 'cart.html';
//     }

//     // Adiciona o event listener aos botões "Add to Cart".
//     const addButtons = document.querySelectorAll('.product-card__addtocart');
//     addButtons.forEach(button => {
//         button.addEventListener('click', addToCart);
//     });

// });


// document.addEventListener('DOMContentLoaded', function() {
    
//     // Seu código de includes
//     document.querySelectorAll("[data-include]").forEach(el => {
//         const file = el.getAttribute("data-include");
//         fetch(file)
//             .then(resp => resp.text())
//             .then(html => {
//                 el.innerHTML = html;
//             })
//             .catch(err => console.error("Erro ao carregar include:", err));
//     });

//     // Função principal para adicionar ao carrinho
//     function addToCart(event) {
//         event.preventDefault();

//         // --- CORREÇÕES AQUI ---

//         // 1. Coletar e limpar o preço
//         // Certifica-se de que o seletor '.product__prices' está correto e que ele retorna o preço no formato esperado.
//         // Se o preço estiver em outro lugar ou formato, ajuste o seletor.
//         const priceElement = document.querySelector('.product__prices');
//         // let productPrice = 0; // Valor padrão caso o elemento não seja encontrado
//         //const productPrice = parseFloat(priceString.replace(/[$,]/g, ''));

//         if (priceElement) {
//             const priceString = priceElement.textContent;
//             // Remove o '$' e a vírgula ',' e converte para um número de ponto flutuante.
//             productPrice = parseFloat(priceString.replace(/[$,]/g, ''));
//             // Agora, se você quiser exibir esse número em formato de moeda americana:
//             // Você precisará usar Intl.NumberFormat
//             const formatter = new Intl.NumberFormat('en-US', {
//                 style: 'currency',
//                 currency: 'USD',

//             }); 

//             const formattedPrice = formatter.format(productPrice);
//             console.log("Preço formatado para USD:", formattedPrice);
        
//             // Se você quiser atualizar o DOM com o preço formatado (exemplo):
//             // priceElement.textContent = formattedPrice; // Cuidado: Isso sobrescreve o conteúdo original
        
        
//         }else {
//             console.error("Elemento de preço '.product__prices' não encontrado!");
//             // Você pode querer retornar ou exibir um erro para o usuário aqui
//         }

//         // 2. Coletar e converter a quantidade
//         // O seletor 'product-quantity' parece estar correto, mas garantimos a conversão para inteiro.
//         const quantityInput = document.getElementById('product-quantity');
//         let productQuantity = 1; // Valor padrão caso o input não seja encontrado ou seja inválido

//         if (quantityInput) {
//             const quantityValue = parseInt(quantityInput.value, 10);
//             if (!isNaN(quantityValue) && quantityValue >= 1) {
//                 productQuantity = quantityValue;
//             } else {
//                 console.warn("Valor de quantidade inválido, usando 1.");
//                 // Você pode querer resetar o input para 1 ou mostrar um aviso
//             }
//         } else {
//             console.error("Input de quantidade '#product-quantity' não encontrado!");
//         }

//         // 3. Coletar o nome e a imagem
//         // Certifique-se de que os seletores '.product__name' e '.product-gallery__featured img' estão corretos
//         const productNameElement = document.querySelector('.product__name');
//         const productImageElement = document.querySelector('.product-gallery__featured img');

//         const productInfo = {
//             name: productNameElement ? productNameElement.textContent : 'Nome do Produto Indisponível',
//             price: productPrice, // Agora é um número
//             quantity: productQuantity, // Agora é um número inteiro
//             image: productImageElement ? productImageElement.src : 'caminho/para/imagem/padrao.jpg', // Um fallback para a imagem
//         };
        
//         // Coleta de opções (cor e material) - esta parte parece estar correta
//         const selectedColor = document.querySelector('input[name="color"]:checked');
//         const selectedMaterial = document.querySelector('input[name="material"]:checked');      
        
//         if (selectedColor) {
//             // Tenta obter a cor de diferentes formas, o que é bom para compatibilidade
//             productInfo.color = selectedColor.parentElement.style.color || 
//                            selectedColor.parentElement.getAttribute('data-color') || 
//                            selectedColor.parentElement.title;
//         }
        
//         if (selectedMaterial) {
//             productInfo.material = selectedMaterial.nextElementSibling.textContent;
//         }
        
//         // --- Lógica de atualização do carrinho (já estava correta) ---
//         let cart = JSON.parse(localStorage.getItem('cart')) || [];      
//         const existingProductIndex = cart.findIndex(item => 
//            item.name === productInfo.name && 
//             item.color === productInfo.color && 
//             item.material === productInfo.material
//         );
        
//         if (existingProductIndex !== -1) {
//             // Adiciona a quantidade existente à nova quantidade
//             cart[existingProductIndex].quantity = parseInt(cart[existingProductIndex].quantity) + productInfo.quantity;
//         } else {
//             cart.push(productInfo);
//         }
        
//         localStorage.setItem('cart', JSON.stringify(cart));
        
//         alert('Product added to cart!');
//     }

//     // Event listener para o botão de adicionar ao carrinho
//     // Certifique-se de que o seletor('.product__actions-item--addtocart button') está correto para o seu botão.
//     // Se o botão tiver um ID único como '#addToCartBtn', use-o para ser mais preciso.
//     const addToCartBtn = document.querySelector('.product__actions-item--addtocart button'); 
//     if (addToCartBtn) {
//         addToCartBtn.addEventListener('click', addToCart);
//     } else {
//         console.warn("Botão 'Adicionar ao Carrinho' não encontrado. Verifique o seletor '.product__actions-item--addtocart button'.");
//     }
    
//     // Código para os botões de produtos relacionados (se necessário)
//     // Esta parte pode precisar de ajustes semelhantes para garantir que preço e quantidade sejam números.
//     const relatedProductButtons = document.querySelectorAll('.product-card__addtocart');
//     relatedProductButtons.forEach(button => {
//         button.addEventListener('click', function(event) {
//             // IMPORTANTE: Se você adicionar produtos relacionados, a lógica AQUI
//             // também precisará tratar o preço e a quantidade como números.
//             // Por exemplo, se o preço estiver em um elemento '.product-card__price':
//             /*
//             event.preventDefault(); // Se for um link ou form
//             const productCard = this.closest('.product-card');
//             const priceStringRelated = productCard.querySelector('.product-card__price').textContent;
//             const relatedPrice = parseFloat(priceStringRelated.replace(/[$,]/g, ''));
//             const relatedQuantity = 1; // Ou obter de um input específico do card
            
//             const productInfo = {
//                 name: productCard.querySelector('.product-card__name a').textContent,
//                 price: relatedPrice,
//                 image: productCard.querySelector('.product-card__image img').src,
//                 quantity: relatedQuantity
//             };
//             // ... (restante da lógica para adicionar ao carrinho) ...
//             */
//            console.log("Adicionando produto relacionado ao carrinho (lógica a ser implementada com tratamento de números).");
//         });
//     });

//     // Código para o botão dos departamentos
//     const deptButton = document.querySelector(".departments__button");
//     const deptWrapper = document.querySelector(".departments__links-wrapper");
//     if (deptButton && deptWrapper) {
//         deptButton.addEventListener("click", function() {
//             if (deptWrapper.style.height === "0px" || !deptWrapper.style.height) {
//                 deptWrapper.style.height = deptWrapper.scrollHeight + "px";
//                 deptWrapper.style.opacity = "1";
//             } else {
//                 deptWrapper.style.height = "0px";
//                 deptWrapper.style.opacity = "0";
//             }
//         });
//     }
// });



document.addEventListener('DOMContentLoaded', function() {
    
    // ... (Seu código de includes e setupButtons) ...

    function addToCart(event) {
        event.preventDefault();

        // --- Garante que os dados coletados sejam números válidos ---

        // 1. Coletar e limpar o preço
        const priceElement = document.querySelector('.product__prices');
        let productPrice = 0; // Valor padrão caso o elemento não seja encontrado ou seja inválido

        if (priceElement) {
            const priceString = priceElement.textContent;
            // Remove caracteres não numéricos (exceto o ponto decimal)
            const cleanedPriceString = priceString.replace(/[^\d.]/g, ''); 
            productPrice = parseFloat(cleanedPriceString);
            
            // Verifica se o resultado é NaN e define como 0 se for o caso
            if (isNaN(productPrice)) {
                console.error("Erro ao converter preço para número. Definindo como 0.");
                productPrice = 0;
            }
        } else {
            console.error("Elemento de preço '.product__prices' não encontrado!");
        }

        // 2. Coletar e converter a quantidade
        const quantityInput = document.getElementById('product-quantity');
        let productQuantity = 1; // Valor padrão

        if (quantityInput) {
            // Usa Number() para uma conversão mais robusta
            const quantityValue = Number(quantityInput.value); 
            // Verifica se é um número válido e maior ou igual a 1
            if (!isNaN(quantityValue) && quantityValue >= 1) {
                productQuantity = quantityValue;
            } else {
                console.warn("Valor de quantidade inválido, usando 1.");
                // Opcional: Resetar o input para 1
                // quantityInput.value = 1; 
            }
        } else {
            console.error("Input de quantidade '#product-quantity' não encontrado!");
        }

        // 3. Coletar o nome e a imagem (com fallbacks seguros)
        const productNameElement = document.querySelector('.product__name');
        const productImageElement = document.querySelector('.product-gallery__featured img');

        const productInfo = {
            // Fallbacks seguros para evitar 'undefined' no nome/imagem
            name: productNameElement ? productNameElement.textContent.trim() : 'Nome Indisponível', 
            price: productPrice, // Já é um número validado
            quantity: productQuantity, // Já é um número validado
            // Usa o 'src' se o elemento de imagem for encontrado, senão usa um placeholder
            image: productImageElement ? productImageElement.src : 'images/placeholder.png', // Coloque um caminho de placeholder válido
        };
        
        // 4. Coleta de opções (cor e material) - Verifique se os seletores estão corretos
        const selectedColorElement = document.querySelector('input[name="color"]:checked');
        const selectedMaterialElement = document.querySelector('input[name="material"]:checked');      
        
        if (selectedColorElement) {
            // Tenta obter a cor de diferentes formas
            productInfo.color = selectedColorElement.parentElement?.style.color || 
                           selectedColorElement.parentElement?.getAttribute('data-color') || 
                           selectedColorElement.parentElement?.title ||
                           selectedColorElement.value; // Adiciona .value como fallback
        }
        
        if (selectedMaterialElement) {
            // Tenta obter o texto do label associado, ou o value do input
            const label = selectedMaterialElement.nextElementSibling;
            productInfo.material = label ? label.textContent.trim() : selectedMaterialElement.value;
        }
        
        // --- Lógica de atualização do carrinho ---
        let cart = JSON.parse(localStorage.getItem('cart')) || [];      
        
        // Encontra o produto existente no carrinho (considerando nome, cor e material)
        const existingProductIndex = cart.findIndex(item => 
           item.name === productInfo.name && 
            item.color === productInfo.color && 
            item.material === productInfo.material
        );
        
        if (existingProductIndex !== -1) {
            // Se o produto já existe, apenas aumenta a quantidade
            // Garante que ambos os valores sejam números antes de somar
            const currentQuantity = Number(cart[existingProductIndex].quantity);
            const newQuantity = Number(productInfo.quantity);
            if (!isNaN(currentQuantity) && !isNaN(newQuantity)) {
                cart[existingProductIndex].quantity = currentQuantity + newQuantity;
            } else {
                console.error("Erro ao somar quantidades de um item existente. Usando nova quantidade.");
                cart[existingProductIndex].quantity = newQuantity;
            }
        } else {
            // Se for um novo produto, adiciona ao array
            cart.push(productInfo);
        }
        
        // Salva o carrinho atualizado no localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        alert('Product added to cart!');
        // Opcional: Redirecionar para a página do carrinho ou mostrar um feedback visual
    }

    // Event listener para o botão de adicionar ao carrinho
    const addToCartBtn = document.querySelector('.product__actions-item--addtocart button'); 
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
    } else {
        console.warn("Botão 'Adicionar ao Carrinho' não encontrado. Verifique o seletor '.product__actions-item--addtocart button'.");
    }
    
    // ... (Restante do seu código de relacionados, departamentos, etc.) ...
});