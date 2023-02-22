const mediaUrl = 'assets/medias';
const imageType = 'image';
const videoType = 'video';

//Crée un objet media à partir des paramètres fournis
function createMedia(id, title, image, likes, date, price, photographerId, type) {
  const media = {};

  media.id = id;
  media.title = title;
  media.image = image;
  media.likes = likes;
  media.date = date;
  media.price = price;
  media.photographerId = photographerId;
  media.type = type;

  media.render = function () {
    const mediaItem = document.createElement("article");
    mediaItem.classList.add("media-item");

    const mediaLink = document.createElement("a");
    mediaLink.classList.add("media-link");
    mediaLink.setAttribute("href", `${mediaUrl}/${this.photographerId}/${this.image}`);
    mediaLink.setAttribute("data-lightbox", "gallery");
    mediaLink.setAttribute("data-title", this.title);
    mediaLink.setAttribute("aria-label", `Image nommée ${this.title}`);

    // Ajout de l'écouteur d'événement de clic sur le lien
    mediaLink.addEventListener('click', function (e) {
      e.preventDefault(); // empêche le comportement par défaut du lien
      showLightbox(media);
    });

    let mediaContent;

    if (this.type === imageType) {
      const mediaImg = document.createElement("img");
      mediaImg.classList.add("media-img");
      mediaImg.setAttribute("src", `${mediaUrl}/${this.photographerId}/${this.image}`);
      mediaImg.setAttribute("alt", this.title);
      mediaContent = mediaImg;

    } else if (this.type === videoType) {
      const mediaVideo = document.createElement("video");
      mediaVideo.classList.add("media-video");
      mediaVideo.setAttribute("src", `${mediaUrl}/${this.photographerId}/${this.image}`);
      mediaVideo.setAttribute("alt", this.title);
      // mediaVideo.setAttribute("controls", "");

      // ajout description video pour l'accessibilité
      const description = document.createElement("source");
      description.setAttribute("src", `${mediaUrl}/${this.photographerId}/${this.description}`);
      description.setAttribute("type", "audio/mpeg");
      mediaVideo.appendChild(description);

      mediaContent = mediaVideo;

    }

    mediaLink.appendChild(mediaContent);
    mediaItem.appendChild(mediaLink);

    if (this.type === videoType) {
      mediaContent.addEventListener('click', function(e) {
        e.preventDefault();
        showLightbox(media);
      });
    }

    const mediaInfo = document.createElement("div");
    mediaInfo.classList.add("media-info");

    const mediaTitle = document.createElement("h2");
    mediaTitle.classList.add("media-title");
    mediaTitle.textContent = this.title;

    const mediaLikes = document.createElement("div");
    mediaLikes.classList.add("media-likes");

    const likesIcon = document.createElement("i");
    likesIcon.classList.add("fas", "fa-heart");

    const likesCount = document.createElement("span");
    likesCount.classList.add("likes-count");
    likesCount.textContent = this.likes;

    mediaLikes.appendChild(likesIcon);
    mediaLikes.appendChild(likesCount);

    mediaInfo.appendChild(mediaTitle);
    mediaInfo.appendChild(mediaLikes);

    mediaItem.appendChild(mediaInfo);

    return mediaItem;
  };

  return media;
}

//Crée un média à partir des données récupérées en fonction du type de media
function createMediaFromData(data, photographerId) {
  if (data.video) {
    return createMedia(
      data.id,
      data.title,
      data.video,
      data.likes,
      data.date,
      data.price,
      photographerId,
      videoType,
      data.description
    );
  } else {
    return createMedia(
      data.id,
      data.title,
      data.image,
      data.likes,
      data.date,
      data.price,
      photographerId,
      imageType
    );
  }
}

//Calcule le nombre total de likes pour tous les médias
function getTotalLikes(media) {
  return media.reduce((totalLikes, m) => totalLikes + m.likes, 0);
}

//Récupère les données de médias pour le photographe actuel et les affiche
function fetchMedia() {
  const url = new URL(window.location.href);
  const photographerId = url.searchParams.get("id");

  fetch("https://5sensprod.github.io/Projet6-Fisheye/data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      const photographerData = data.photographers.find(p => p.id == photographerId);
      const media = data.media.filter((m) => m.photographerId == photographerId).map(m => createMediaFromData(m, photographerId));
      const mediaList = document.querySelector(".media-photographer");


      media.forEach((m) => {
        mediaList.appendChild(m.render());
      });

      const totalLikes = getTotalLikes(media);
      const totalLikesEl = document.querySelector("#total-likes");
      totalLikesEl.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
    });
}
fetchMedia();

// Affiche la lightbox

function showLightbox(media) {
  const lightbox = document.querySelector(".modal-lb");
  const lightboxContent = document.querySelector(".lightbox-media");
  const lightboxTitle = document.querySelector(".lightbox-title");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  let currentIndex = null;
  let mediaList = null;

  // Récupère la liste de tous les médias dans la page et trouve l'index du média actuel
  const allMedia = Array.from(document.querySelectorAll(".media-item")).filter((item) => item.querySelector("img, video"));
  for (let i = 0; i < allMedia.length; i++) {
    if (allMedia[i].querySelector("img, video").src === `${mediaUrl}/${media.photographerId}/${media.image}`) {
      currentIndex = i;
      break;
    }
  }
  mediaList = allMedia;

  // Fonction pour afficher le média suivant
  function showNextMedia() {
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
  }

  // Fonction pour afficher le média précédent
  function showPrevMedia() {
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
  }

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
closeButton.addEventListener("click", function (e) {
  if (e.target === closeButton) {
    lightbox.style.display = "none";
  }
});

// Ferme la lightbox quand l'utilisateur clique en dehors de la lightbox
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Affiche le média suivant quand l'utilisateur clique sur le bouton suivant
lightboxNext.addEventListener("click", function (e) {
showNextMedia();
});

// Affiche le média précédent quand l'utilisateur clique sur le bouton précédent
lightboxPrev.addEventListener("click", function (e) {
showPrevMedia();
});
}
  