import { showLightbox } from '../utils/lightbox.js';
import { createNode, setAttributes, addClass, removeClass, clearNode, appendNode, setInnerHTML, toggleClass } from '../utils/domUtils.js';
// import { popularitySort, dateSort, titleSort } from '../modules/sort.js';

const mediaUrl = 'assets/medias';
const imageType = 'image';
const videoType = 'video';
let totalLikes = 0;
const totalLikesEl = document.querySelector("#total-likes");

const params = new URLSearchParams(window.location.search);
const photographerName = params.get('name');

document.title = `${photographerName} - Fisheye`;

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
    const mediaItem = createNode("article");
addClass(mediaItem, "media-item");

const mediaLink = createMediaLink(this);

let mediaContent = this.type === imageType
  ? createNode("img")
  : createNode("video");

if (this.type === imageType) {
  addClass(mediaContent, "media-img");
  setAttributes(mediaContent, {
    "src": `${mediaUrl}/${this.photographerId}/${this.image}`,
    "alt": this.title,
  });
} else if (this.type === videoType) {
  addClass(mediaContent, "media-video");
  setAttributes(mediaContent, {
    "src": `${mediaUrl}/${this.photographerId}/${this.image}`,
    "alt": this.title,
    "tabindex": "-1",
  });

  const description = createNode("source");
  setAttributes(description, {
    "src": `${mediaUrl}/${this.photographerId}/${this.description}`,
    "type": "audio/mpeg",
  });
  appendNode(mediaContent, description);
}

appendNode(mediaLink, mediaContent);
appendNode(mediaItem, mediaLink);

if (this.type === videoType) {
  mediaContent.addEventListener('click', function (e) {
    e.preventDefault();
    showLightbox(media);
  });
}

const mediaInfo = createNode("div");
addClass(mediaInfo, "media-info");

const mediaTitle = createNode("h2");
addClass(mediaTitle, "media-title");
mediaTitle.textContent = this.title;

const likesButtonContainer = createNode("div");
addClass(likesButtonContainer, "likes-button-container");

const likesButton = createNode("button");
addClass(likesButton, "likes-button");
setAttributes(likesButton, {
  "aria-label": `Ajouter un j'aime à "${this.title}"`,
});
let isLiked = false;

const likesIcon = createNode("i");
addClass(likesIcon, "fas", "fa-heart", "media-likes-icon");

const likesCount = createNode("span");
addClass(likesCount, "likes-count");
likesCount.textContent = this.likes;
// Ajout aria-label à la like media
setAttributes(likesCount, {
  "aria-label": `${this.title} à ${this.likes} j'aime`,
});

appendNode(likesButton, likesIcon);
appendNode(likesButtonContainer, likesButton);
appendNode(likesButtonContainer, likesCount);
appendNode(mediaInfo, mediaTitle);
appendNode(mediaInfo, likesButtonContainer);

likesButton.addEventListener("click", function () {
  if (isLiked) {
    likesCount.textContent = parseInt(likesCount.textContent) - 1;
    removeClass(likesIcon, "liked");
    removeClass(likesCount, "liked");
    
    isLiked = false;
    totalLikes--;
    totalLikesEl.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
    // Ajout aria-label à la span totalLikesEl
    totalLikesEl.setAttribute("aria-label", `Total des j'aimes à ${totalLikes}`);
    likesButton.setAttribute("aria-label", `Ajouter un j'aime à ${this.title}`);
  } else {
    likesCount.textContent = parseInt(likesCount.textContent) + 1;
    addClass(likesIcon, "liked");
    addClass(likesCount, "liked");
    isLiked = true;
    totalLikes++;
    totalLikesEl.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
    totalLikesEl.setAttribute("aria-label", `Total des j'aimes à ${totalLikes}`);
    likesButton.setAttribute("aria-label", `Vous avez aimé ${this.title}`);
  }
  toggleClass(likesButton, 'liked');
});

mediaItem.appendChild(mediaInfo);

return mediaItem;
};
  return media;
}

function createMediaLink(media) {
  const mediaLink = createNode("a");
  addClass(mediaLink, "media-link");
  setAttributes(mediaLink, {
    "href": `${mediaUrl}/${media.photographerId}/${media.image}`,
    "data-lightbox": "gallery",
    "data-title": media.title,
    "aria-label": `Image nommée ${media.title}`,
  });

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
  clearNode(mediaList);
  media.forEach((m) => {
    appendNode(mediaList, m.render());
  });
}

function fetchMedia() {
  const url = new URL(window.location.href);
  const photographerId = url.searchParams.get("id");
  fetch("https://5sensprod.github.io/Projet6-Fisheye/data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      media = data.media.filter((m) => m.photographerId == photographerId).map(m => createMediaFromData(m, photographerId));
      renderMedia(); 

      const totalLikes = getTotalLikes(media);
      setInnerHTML(totalLikesEl, `${totalLikes} <i class="fas fa-heart"></i>`);
    });
}
fetchMedia();

export { renderMedia };
export { media };