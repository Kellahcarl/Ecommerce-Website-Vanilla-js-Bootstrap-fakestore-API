import { addToCart } from "./cart/addToCart.js";
import { formatPrice } from "./utils.js";

function displayProducts(data, section) {
  section.innerHTML = "";
  const createProductCard = (item) => {
    const { title, id, price, image, description } = item;

    const card = document.createElement("div");
    card.classList.add("col-12", "col-md-6", "col-lg-4");

    card.innerHTML = `
      <div class="card shadow features-card" data-id=${id}>
        <div class="card-body" data-toggle="modal" data-target="#exampleModalCenter">
          <div class="card-img-top">
            <img class="card-img-top img-fluid" src=${image} alt=${title} />
          </div>
          <div class="card-title text-center h5 fw-normal text-muted mt-">
            ${title}
          </div>
          <div class="card-text text-center">
            <span class="h4 text-center">${formatPrice(price)}</span>
          </div>
          <div class="f-icons">
            <span class="tt addBtn" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to cart" data-id=${id}>
              <i class="bi bi-cart-plus rounded-circle me-4" data-bs-toggle="offcanvas" data-bs-target="#cart" aria-controls="offcanvasRight"> Add to Cart</i>
            </span>
          </div>
        </div>
      </div>
    `;

    // Prevent modal from toggling when "Add to Cart" button is clicked
    const addBtn = card.querySelector(".addBtn");
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Stop event propagation
      const id = e.currentTarget.dataset.id;
      if (id) {
        addToCart(id, 1); // Add to Cart functionality
      }
    });

    card.addEventListener("click", () => {
      console.log("modal was selected");
      // Set the product description in the modal
      const modal = document.getElementById("exampleModalCenter");
      const descriptionContainer = document.getElementById(
        "product-description"
      );
      descriptionContainer.innerHTML = `
      <div class="card-img-top">
            <img class="card-img-top img-fluid" src=${image} alt=${title} />
          </div>
        <div class="card-title text-center h5 fw-normal text-muted mt-">
            ${title}
          </div>
        <div class="card-title text-center h5 fw-normal text-muted mt-">
            ${description}
          </div>
        <div class="card-text text-center">
            <span class="h4 text-center">${formatPrice(price)}</span>
          </div>
        <div class="f-icons">
            <span class="tt addBtn" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to cart" data-id=${id}>
              <i class="bi bi-cart-plus rounded-circle me-4" data-bs-toggle="offcanvas" data-bs-target="#cart" aria-controls="offcanvasRight"> Add to Cart</i>
            </span>
          </div>
      `;
      // console.log(modal);
    });

    return card;
  };
  // console.log(data);

  const productCards = data.map(createProductCard);

  productCards.forEach((card) => {
    section.appendChild(card);
  });
}

export { displayProducts };
