document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-include]").forEach(el => {
      const file = el.getAttribute("data-include");
      fetch(file)
        .then(resp => resp.text())
        .then(html => {
          el.innerHTML = html;
        })
        .catch(err => console.error("Erro ao carregar include:", err));
    });
  });
  



        // In your cart.html page
        document.addEventListener('DOMContentLoaded', function() {
          const cartItemsContainer = document.getElementById('cart-items-container');
          const cart = JSON.parse(localStorage.getItem('cart')) || [];
          
          if (cart.length === 0) {
              cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
              return;
          }
          
          let cartHTML = '';
          let total = 0;
          
          cart.forEach(item => {
              const itemTotal = parseFloat(item.price.replace('$', '').replace(',', '')) * parseInt(item.quantity);
              total += itemTotal;
              
              cartHTML += `
                  <div class="cart-item">
                      <img src="${item.image}" alt="${item.name}" width="80">
                      <div class="cart-item-details">
                          <h4>${item.name}</h4>
                          ${item.color ? `<p>Color: ${item.color}</p>` : ''}
                          ${item.material ? `<p>Material: ${item.material}</p>` : ''}
                          <p>Price: ${item.price}</p>
                          <p>Quantity: ${item.quantity}</p>
                          <p>Total: $${itemTotal.toFixed(2)}</p>
                      </div>
                  </div>
              `;
          });
          
          cartHTML += `<div class="cart-total"><h3>Total: $${total.toFixed(2)}</h3></div>`;
          cartItemsContainer.innerHTML = cartHTML;
      });


