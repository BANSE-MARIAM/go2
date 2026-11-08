// ======================================
// 1. LES 10 IMAGES EN LIGNE
// ======================================

const images = [

    // NATURE : 4 IMAGES

    {
        url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
        category: "nature",
        alt: "Paysage naturel"
    },

    {
        url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800",
        category: "nature",
        alt: "Montagnes et lac"
    },

    {
        url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
        category: "nature",
        alt: "Forêt"
    },

    {
        url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800",
        category: "nature",
        alt: "Lever du soleil"
    },


    // PERSONNES : 3 IMAGES

    {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
        category: "personnes",
        alt: "Portrait de femme"
    },

    {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
        category: "personnes",
        alt: "Portrait d'homme"
    },

    {
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
        category: "personnes",
        alt: "Portrait féminin"
    },


    // ABSTRAIT : 3 IMAGES

    {
        url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800",
        category: "abstrait",
        alt: "Art abstrait coloré"
    },

    {
        url: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=800",
        category: "abstrait",
        alt: "Composition abstraite"
    },

    {
        url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800",
        category: "abstrait",
        alt: "Fond artistique"
    }

];


// ======================================
// 2. RECUPERATION DES ELEMENTS HTML
// ======================================

const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const imageCounter = document.getElementById("image-counter");

let visibleImages = [];
let currentIndex = 0;


// ======================================
// 3. GENERER LA GALERIE
// ======================================

function generateGallery() {

    loader.classList.add("show-loader");

    gallery.innerHTML = "";

    let loaded = 0;

    if (images.length === 0) {
        loader.classList.remove("show-loader");
        return;
    }

    images.forEach((image, index) => {

        const item = document.createElement("div");

        item.className = "gallery-item";

        item.dataset.category = image.category;

        const img = document.createElement("img");

        img.src = image.url;

        img.alt = image.alt;

        img.loading = "eager";

        item.appendChild(img);

        gallery.appendChild(item);

        img.addEventListener("load", () => {

            loaded++;

            item.classList.add("show");

            if (loaded === images.length) {
                loader.classList.remove("show-loader");
            }

        }, { once: true });

        img.addEventListener("error", () => {

            loaded++;

            item.remove();

            if (loaded === images.length) {
                loader.classList.remove("show-loader");
            }

            updateCounters();

        }, { once: true });

        // OUVERTURE LIGHTBOX

        img.addEventListener("click", () => {

            openLightbox(index);

        });

    });

    updateCounters();

}


// ======================================
// 4. COMPTEURS AUTOMATIQUES
// ======================================

function updateCounters() {

    document.getElementById("count-all").textContent =
        images.length;

    ["nature", "personnes", "abstrait"].forEach(category => {

        const count = images.filter(image =>
            image.category === category
        ).length;

        document.getElementById(
            "count-" + category
        ).textContent = count;

    });

}


// ======================================
// 5. FILTRAGE DES CATEGORIES
// ======================================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.filter;

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const items = document.querySelectorAll(".gallery-item");

        items.forEach(item => {

            if (
                category === "all" ||
                item.dataset.category === category
            ) {

                item.classList.remove("hidden");
                item.classList.add("show");

            } else {

                item.classList.add("hidden");

            }

        });

    });

});


// ======================================
// 6. OUVRIR LIGHTBOX
// ======================================

function openLightbox(index) {

    const items = [...document.querySelectorAll(".gallery-item")];

    visibleImages = items
        .filter(item => !item.classList.contains("hidden"))
        .map(item => ({
            url: item.querySelector("img").src,
            alt: item.querySelector("img").alt
        }));

    const clickedUrl = images[index].url;

    currentIndex = visibleImages.findIndex(image =>
        image.url.includes(clickedUrl.split("?")[0])
    );

    if (currentIndex === -1) return;

    showLightboxImage();

    lightbox.style.display = "flex";

    document.body.style.overflow = "hidden";

}


// ======================================
// 7. AFFICHER IMAGE
// ======================================

function showLightboxImage() {

    const image = visibleImages[currentIndex];

    lightboxImg.src = image.url;

    lightboxImg.alt = image.alt;

    imageCounter.textContent =
        `${currentIndex + 1} / ${visibleImages.length}`;

}


// ======================================
// 8. IMAGE PRECEDENTE
// ======================================

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    showLightboxImage();

});


// ======================================
// 9. IMAGE SUIVANTE
// ======================================

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    showLightboxImage();

});


// ======================================
// 10. FERMER LIGHTBOX
// ======================================

function closeLightbox() {

    lightbox.style.display = "none";

    lightboxImg.src = "";

    document.body.style.overflow = "";

}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// ======================================
// 11. RACCOURCIS CLAVIER
// ======================================

document.addEventListener("keydown", event => {

    if (lightbox.style.display !== "flex") return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextBtn.click();
    }

    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }

});


// ======================================
// 12. LANCEMENT DE LA GALERIE
// ======================================

generateGallery();