// Sélection des éléments
let plusBtns = document.querySelectorAll(".fa-plus-circle");
let minusBtns = document.querySelectorAll(".fa-minus-circle");
let deleteBtns = document.querySelectorAll(".fa-trash-alt");
let heartBtns = document.querySelectorAll(".fa-heart");

// Fonction de calcul du total
function updateTotal() {
  let total = 0;

  let cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    let unitPrice = parseInt(
      card.querySelector(".unit-price").innerText
    );

    let quantity = parseInt(
      card.querySelector(".quantity").innerText
    );

    total += unitPrice * quantity;
  });

  document.querySelector(".total").innerText = total + " $";
}

// Boutons +
plusBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let quantitySpan =
      btn.parentElement.querySelector(".quantity");

    quantitySpan.innerText =
      parseInt(quantitySpan.innerText) + 1;

    updateTotal();
  });
});

// Boutons -
minusBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let quantitySpan =
      btn.parentElement.querySelector(".quantity");

    let quantity = parseInt(quantitySpan.innerText);

    if (quantity > 0) {
      quantitySpan.innerText = quantity - 1;
    }

    updateTotal();
  });
});

// Suppression d'un produit
deleteBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".card-body").remove();

    updateTotal();
  });
});

// Favoris (cœur)
heartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("liked");
  });
});
// Calcul initial
updateTotal();