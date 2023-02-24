// Déclare la variable lightbox en tant que variable globale
const mediaUrl = 'assets/medias';
const imageType = 'image';
const videoType = 'video';
const lightbox = document.querySelector(".modal-lb");
const lightboxContent = document.querySelector(".lightbox-media");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");


// La lightbox

export function showLightbox(media) {
  let currentIndex = null;
  const allMedia = Array.from(document.querySelectorAll(".media-item")).filter((item) => item.querySelector("img, video"));
  for (let i = 0; i < allMedia.length; i++) {
    if (allMedia[i].querySelector("img, video").src === `${mediaUrl}/${media.photographerId}/${media.image}`) {
      currentIndex = i;
      break;
    }
  }
  const mediaList = allMedia;

  // Affiche le média actuel

  if (media.type === videoType) {
    const lightboxVideo = document.createElement("video");
    lightboxVideo.setAttribute("src", `${mediaUrl}/${media.photographerId}/${media.image}`);
    lightboxVideo.setAttribute("alt", media.title);
    lightboxVideo.setAttribute("controls", "");
    lightboxVideo.setAttribute("preload", "metadata");
    lightboxContent.innerHTML = "";
    lightboxContent.appendChild(lightboxVideo);

    // ajout description video pour l'accessibilité
    const description = document.createElement("source");
    description.setAttribute("src", `${mediaUrl}/${media.photographerId}/${media.description}`);
    description.setAttribute("type", "audio/mpeg");
    lightboxVideo.appendChild(description);

  } else if (media.type === imageType) {
    const lightboxImg = document.createElement("img");
    lightboxImg.setAttribute("src", `${mediaUrl}/${media.photographerId}/${media.image}`);
    lightboxImg.setAttribute("alt", media.title);
    lightboxContent.innerHTML = "";
    lightboxContent.appendChild(lightboxImg);
  }

  // Affiche le titre du média actuel
  lightboxTitle.textContent = media.title;

  // Affiche la lightbox
  lightbox.style.display = "block";

  // Ferme la lightbox quand l'utilisateur clique sur le bouton de fermeture
  const closeButton = document.querySelector(".modal-close");
  closeButton.addEventListener("click", (e) => {
    if (e.target === closeButton) {
      lightbox.style.display = "none";
    }
  });

  // Ferme la lightbox quand l'utilisateur clique en dehors de la lightbox
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // Affiche le média suivant quand l'utilisateur clique sur le bouton suivant
  lightboxNext.addEventListener("click", (e) => {
    currentIndex = currentIndex < mediaList.length - 1 ? currentIndex + 1 : 0;
    const nextMedia = mediaList[currentIndex].querySelector("img, video").cloneNode(true);
    if (nextMedia.tagName.toLowerCase() === "video") {
      nextMedia.controls = true;
    }
    lightboxContent.innerHTML = "";
    lightboxContent.appendChild(nextMedia);
    const nextMediaTitle = mediaList[currentIndex].querySelector(".media-title").textContent;
    lightboxTitle.textContent = nextMediaTitle;
  });

  // Affiche le média précédent quand l'utilisateur clique sur le bouton précédent
  lightboxPrev.addEventListener("click", (e) => {
    currentIndex = (currentIndex > 0) ? (currentIndex - 1) : (mediaList.length - 1);
    const prevMedia = mediaList[currentIndex].querySelector("img, video").cloneNode(true);

    if (prevMedia.tagName.toLowerCase() === "video") {
      prevMedia.controls = true;
    }

    lightboxContent.innerHTML = "";
    lightboxContent.appendChild(prevMedia);
    const prevMediaTitle = mediaList[currentIndex].querySelector(".media-title").textContent;
    lightboxTitle.textContent = prevMediaTitle;
  });

  // Gère les événements du clavier pour passer au média suivant ou précédent
  function handleKeyboardEvent(e) {
    switch (e.key) {
      case 'ArrowLeft':
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = mediaList.length - 1;
        }
        const prevMedia = mediaList[currentIndex].querySelector("img, video").cloneNode(true);
        if (prevMedia.tagName.toLowerCase() === "video") {
          prevMedia.controls = true;
        }
        lightboxContent.innerHTML = "";
        lightboxContent.appendChild(prevMedia);
        const prevMediaTitle = mediaList[currentIndex].querySelector(".media-title").textContent;
        lightboxTitle.textContent = prevMediaTitle;
        break;

      case 'ArrowRight':
        if (currentIndex < mediaList.length - 1) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        const nextMedia = mediaList[currentIndex].querySelector("img, video").cloneNode(true);
        if (nextMedia.tagName.toLowerCase() === "video") {
          nextMedia.controls = true;
        }
        lightboxContent.innerHTML = "";
        lightboxContent.appendChild(nextMedia);
        const nextMediaTitle = mediaList[currentIndex].querySelector(".media-title").textContent;
        lightboxTitle.textContent = nextMediaTitle;
        break;

      case 'Escape':
        // ferme la lightbox
        lightbox.style.display = "none";
        break;
    }
  }

  // Ajoute un gestionnaire d'événements pour les touches fléchées gauche et droite du clavier
  document.addEventListener("keydown", (e) => {
    handleKeyboardEvent(e);
  });
}