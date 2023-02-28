import { showLightbox } from '../utils/lightbox.js';


const mediaUrl = 'assets/medias';
const imageType = 'image';
const videoType = 'video';
let totalLikes = 0;
const totalLikesEl = document.querySelector("#total-likes");


//Crée un objet media à partir des paramètres fournis
function createMedia(id, title, image, likes, date, price, photographerId, type) {
  const media = {
    id,
    title,
    image,
    likes,
    date,
    price,
    photographerId,
    type,
  };

  media.render = function () {
    const mediaItem = document.createElement("article");
    mediaItem.classList.add("media-item");

    const mediaLink = createMediaLink(this);

    let mediaContent = this.type === imageType
      ? document.createElement("img")
      : document.createElement("video");

    if (this.type === imageType) {
      mediaContent.classList.add("media-img");
      mediaContent.setAttribute("src", `${mediaUrl}/${this.photographerId}/${this.image}`);
      mediaContent.setAttribute("alt", this.title);
    } else if (this.type === videoType) {
      mediaContent.classList.add("media-video");
      mediaContent.setAttribute("src", `${mediaUrl}/${this.photographerId}/${this.image}`);
      mediaContent.setAttribute("alt", this.title);
      mediaContent.setAttribute("tabindex", "-1");

      const description = document.createElement("source");
      description.setAttribute("src", `${mediaUrl}/${this.photographerId}/${this.description}`);
      description.setAttribute("type", "audio/mpeg");
      mediaContent.appendChild(description);
    }

    mediaLink.appendChild(mediaContent);
    mediaItem.appendChild(mediaLink);

    if (this.type === videoType) {
      mediaContent.addEventListener('click', function (e) {
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
    likesIcon.classList.add("fas", "fa-heart", "media-likes-icon");
    let isLiked = false;

    const likesCount = document.createElement("span");
    likesCount.classList.add("likes-count");
    likesCount.textContent = this.likes;

    mediaLikes.appendChild(likesIcon);
    mediaLikes.appendChild(likesCount);

    mediaInfo.appendChild(mediaTitle);
    mediaInfo.appendChild(mediaLikes);

    likesIcon.addEventListener("click", function () {
      isLiked ? (
        likesCount.textContent = parseInt(likesCount.textContent) - 1,
        likesIcon.classList.remove("liked"),
        isLiked = false,
        totalLikes--,
        totalLikesEl.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`
      ) : (
        likesCount.textContent = parseInt(likesCount.textContent) + 1,
        likesIcon.classList.add("liked"),
        isLiked = true,
        totalLikes++,
        totalLikesEl.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`
      );
    });

    mediaItem.appendChild(mediaInfo);

    return mediaItem;
  };
  return media;
}

function createMediaLink(media) {
  const mediaLink = document.createElement("a");
  mediaLink.classList.add("media-link");
  mediaLink.setAttribute("href", `${mediaUrl}/${media.photographerId}/${media.image}`);
  mediaLink.setAttribute("data-lightbox", "gallery");
  mediaLink.setAttribute("data-title", media.title);
  mediaLink.setAttribute("aria-label", `Image nommée ${media.title}`);

  // Ajout de l'écouteur d'événement de clic sur le lien
  mediaLink.addEventListener('click', function (e) {
    e.preventDefault(); // empêche le comportement par défaut du lien
    showLightbox(media);
  });
  return mediaLink;
}

//Calcule le nombre total de likes pour tous les médias
function getTotalLikes(media) {
  media.forEach(m => {
    totalLikes += m.likes;
    if (m.isLiked) {
      totalLikes += 1;
    }
  });
  return totalLikes;
}

//Crée un média à partir des données récupérées en fonction du type de media
function createMediaFromData(data, photographerId) {
  const type = getMediaType(data);
  return createMediaFromType(data, photographerId, type);
}

// Renvoie le type de média (image ou vidéo) à partir des données du média
function getMediaType(data) {
  return data.video ? videoType : imageType;
}

// Crée un média en fonction de son type
function createMediaFromType(data, photographerId, type) {
  return type === videoType
    ? createMedia(data.id, data.title, data.video, data.likes, data.date, data.price, photographerId, videoType, data.description)
    : createMedia(data.id, data.title, data.image, data.likes, data.date, data.price, photographerId, imageType);
}

//Récupère les données de médias pour le photographe actuel et les affiche
let media = [];

function renderMedia() {
  const mediaList = document.querySelector(".media-photographer");
  mediaList.innerHTML = "";
  media.forEach((m) => {
    mediaList.appendChild(m.render());
  });
}

// Tri des médias par popularité décroissante
function sortMediaByPopularity(media) {
  media.sort((a, b) => b.likes - a.likes);
  renderMedia(media);
}

// Tri des médias par date de publication décroissante
function sortMediaByDate(media) {
  media.sort((a, b) => new Date(b.date) - new Date(a.date));
  renderMedia(media);
}

// Tri des médias par titre (ordre alphabétique)
function sortMediaByTitle(media) {
  media.sort((a, b) => a.title.localeCompare(b.title));
  renderMedia(media);
}

const sortOptions = document.querySelectorAll('.sort_option');
const sortDropdown = document.querySelector('.sort_dropdown');
const sortIcon = document.querySelector('.sort_icon');
const defaultSortOption = document.querySelector('.sort_option-active');
const sortText = document.querySelector('.sort_dropdown span');

// Initialise le texte de tri par défaut
sortText.textContent = defaultSortOption.textContent;

// Ajoute l'événement "click" pour la div qui englobe la liste de tri
sortDropdown.addEventListener('click', () => {
  sortDropdown.classList.toggle('collapsed');
  sortIcon.classList.toggle('rotate');
});

// Ajoute l'événement "click" et "keydown" pour chaque option de tri
sortOptions.forEach(option => {
  option.addEventListener('click', () => {
    activateOption(option);
  });
  option.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      activateOption(option);
    }
  });
});

// Fonction pour activer une option
function activateOption(option) {

  // Met à jour la classe active
  sortOptions.forEach(option => {
    option.classList.remove('sort_option-active');
  });
  option.classList.add('sort_option-active');

  // Met à jour le texte de tri
  sortText.textContent = option.textContent;

  // Trie les médias en fonction de l'option sélectionnée
  switch (option.dataset.sort) {
    case 'popularity':
      sortMediaByPopularity(media);
      break;
    case 'date':
      sortMediaByDate(media);
      break;
    case 'title':
      sortMediaByTitle(media);
      break;
  }
}



// Initialise l'attribut tabindex des options en fonction de l'état initial de la liste déroulante
if (sortDropdown.classList.contains('collapsed')) {
  sortOptions.forEach(option => {
    option.setAttribute('tabindex', '-1');
  });
} else {
  sortOptions.forEach(option => {
    option.setAttribute('tabindex', '0');
  });
}

sortIcon.addEventListener('click', () => {
  sortDropdown.classList.toggle('selected');
});

const sortDropTab = document.querySelector('.sort_dropdown');

sortDropTab.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sortDropdown.classList.toggle('collapsed');
    sortIcon.classList.toggle('rotate');

    if (sortDropdown.classList.contains('collapsed')) {
      sortOptions.forEach(option => {
        option.setAttribute('tabindex', '-1');
      });
    } else {
      sortOptions.forEach(option => {
        option.setAttribute('tabindex', '0');
      });
    }
  }
});

// Ajoute l'événement "keydown" pour fermer la liste avec la touche "Escape"
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !sortDropdown.classList.contains('collapsed')) {
    sortDropdown.classList.add('collapsed');
    sortIcon.classList.remove('rotate');
  }
});

// Ajoute l'événement "click" pour fermer la liste en cliquant en dehors de celle-ci
window.addEventListener('click', (event) => {
  if (!sortDropdown.contains(event.target)) {
    sortDropdown.classList.add('collapsed');
    sortIcon.classList.remove('rotate');
  }
});
// Fermer la liste quand on sort de la liste avec la touche "Tab"
sortOptions[sortOptions.length - 1].addEventListener('keydown', (event) => {
  if (event.key === 'Tab' && !event.shiftKey) {
    sortDropdown.classList.add('collapsed');
    sortIcon.classList.remove('rotate');
  }
});


function fetchMedia() {
  const url = new URL(window.location.href);
  const photographerId = url.searchParams.get("id");
  fetch("https://5sensprod.github.io/Projet6-Fisheye/data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      media = data.media.filter((m) => m.photographerId == photographerId).map(m => createMediaFromData(m, photographerId));

      media.sort((a, b) => b.likes - a.likes); // Tri par popularité décroissante par défaut
      renderMedia(); // Affiche les médias triés par popularité

      const totalLikes = getTotalLikes(media);
      totalLikesEl.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
    });
}
fetchMedia();
