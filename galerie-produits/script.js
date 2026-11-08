// =================================
// 1. BASCULEMENT MODE CLAIR / SOMBRE
// =================================

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeToggle.innerHTML = isDark
        ? "☀️ Mode clair"
        : "🌙 Mode sombre";

    localStorage.setItem("theme", isDark ? "dark" : "light");

});


// Restaurer le thème sauvegardé

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.innerHTML = "☀️ Mode clair";

}


// =================================
// 2. ANIMATION D'APPARITION PROGRESSIVE
// =================================

const cards = document.querySelectorAll(".product-card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            const index = [...cards].indexOf(entry.target);

            setTimeout(() => {

                entry.target.classList.add("visible");

            }, index * 200);

            observer.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.15

});


cards.forEach(card => {

    observer.observe(card);

});


// =================================
// 3. BOUTONS AJOUTER AU PANIER
// =================================

const buyButtons = document.querySelectorAll(".buy-button");

const notification = document.getElementById("notification");

let notificationTimeout;

buyButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productName = button
            .closest(".product-card")
            .querySelector("h2").textContent;

        notification.textContent =
            productName + " ajouté au panier !";

        notification.classList.add("show");

        clearTimeout(notificationTimeout);

        notificationTimeout = setTimeout(() => {

            notification.classList.remove("show");

        }, 2500);

    });

});


// =================================
// 4. BOUTONS FAVORIS
// =================================

const favorites = document.querySelectorAll(".favorite");

favorites.forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent === "♡") {

            button.textContent = "♥";

            button.style.color = "#ff5575";

        } else {

            button.textContent = "♡";

            button.style.color = "#333";

        }

    });

});