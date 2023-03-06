import { mediaFactory } from '../factories/mediaFactory.js';
import { createNode, setAttributes, addClass, appendNode, toggleClass } from '../utils/domUtils.js';
import { createMediaLink } from './lightbox.js';
import { getTotalLikes, updateTotalLikes } from './likes.js';

const mediaUrl = 'assets/medias';
const imageType = 'image';
const videoType = 'video';
let totalLikes = 0;
const totalLikesEl = document.querySelector("#total-likes");

// Crée un élément HTML div pour afficher le titre et le bouton "J'aime" d'un média
const mediaInfoContainer = createNode("div");
const likesCountTemplate = createNode("span");
addClass(likesCountTemplate, "likes-count", "media-likes-icon");

const createMediaInfo = (media) => {
  const mediaInfo = createNode("div");
  addClass(mediaInfo, "media-info");
  const mediaTitle = createNode("h2");
  addClass(mediaTitle, "media-title");
  mediaTitle.textContent = media.title;
  const likesButtonContainer = createNode("div");
  addClass(likesButtonContainer, "likes-button-container");
  const likesCount = mediaInfoContainer.querySelector(`.media[data-id="${media.id}"] .likes-count`) || likesCountTemplate.cloneNode();
  if (!likesCount.parentElement) {
    appendNode(likesButtonContainer, likesCount);
  }

  likesCount.textContent = media.likes;
  likesCount.setAttribute("aria-label", `${media.title} à ${media.likes} j'aime`);
  const likesButton = createLikesButton(media, likesCount);
  appendNode(likesButtonContainer, likesButton);
  appendNode(mediaInfo, mediaTitle);
  appendNode(mediaInfo, likesButtonContainer);
  mediaInfoContainer.appendChild(mediaInfo);
  return mediaInfo;
};

// Crée un élément HTML qui représente un média (image ou vidéo) en fonction du type de média passé en paramètre
function createMediaContent(media) {
  let mediaContent = media.type === imageType
    ? createNode("img")
    : createNode("video");

  if (media.type === imageType) {
    addClass(mediaContent, "media-img");
    setAttributes(mediaContent, {
      "src": `${mediaUrl}/${media.photographerId}/${media.image}`,
      "alt": media.title,
    });
  } else if (media.type === videoType) {
    addClass(mediaContent, "media-video");
    setAttributes(mediaContent, {
      "src": `${mediaUrl}/${media.photographerId}/${media.image}`,
      "alt": media.title,
      "tabindex": "-1",
    });

    const description = createNode("source");
    setAttributes(description, {
      "src": `${mediaUrl}/${media.photographerId}/${media.description}`,
      "type": "audio/mpeg",
    });
    appendNode(mediaContent, description);
  }
  return mediaContent;
}

// Crée un élément HTML pour contenir un média
const createMediaItem = () => {
  const mediaItem = createNode("article");
  addClass(mediaItem, "media-item");
  return mediaItem;
};

// Crée le bouton "J'aime" du média pour le compteur de likes
function createLikesButton(media, likesCount) {
  const label = media.isLiked ? `Vous avez aimé "${media.title}"` : `Ajouter un j'aime à "${media.title}"`;

  const likesButton = createNode("button");
  addClass(likesButton, "likes-button");
  setAttributes(likesButton, { "aria-label": label });

  const likesIcon = createNode("i");
  addClass(likesIcon, "fas", "fa-heart", "media-likes-icon");

  addClass(likesCount, "likes-count", "media-likes-icon");
  setAttributes(likesCount, {
    "aria-label": `${media.title} à ${media.likes} j'aime`,
  });

  appendNode(likesButton, likesIcon);

  likesButton.addEventListener("click", function () {
    // Inverse l'état du bouton "isLiked"
    media.isLiked = !media.isLiked;
    // Ajoute ou supprime la classe "liked" pour modifier l'apparence du bouton de likes et du compteur de likes
    toggleClass(likesIcon, 'liked');
    toggleClass(likesCount, 'liked');

    likesButton.setAttribute("aria-label", media.isLiked ? `Vous avez aimé "${media.title}"` : `Ajouter un j'aime à "${media.title}"`);
    media.likes += media.isLiked ? 1 : -1;
    likesCount.textContent = media.likes;

    const parent = likesCount.parentNode;
    if (parent) {
      likesCount.setAttribute("aria-label", `${media.title} à ${media.likes} j'aime`);
    } else {
      appendNode(likesButtonContainer, likesCount);
      likesCount.setAttribute("aria-label", `${media.title} à ${media.likes} j'aime`);
    }

    totalLikes = getTotalLikes();
    updateTotalLikes();
  });

  return likesButton;
}

//Crée un média à partir des données récupérées en fonction du type de media
const createMediaFromData = (data, photographerId) => {
  const type = getMediaType(data);
  return createMediaFromType(data, photographerId, type);
};

// Renvoie le type de média (image ou vidéo) à partir des données du média
const getMediaType = (data) => {
  return data.video ? videoType : imageType;
};

// Crée un média en fonction de son type
function createMediaFromType(data, photographerId, type) {
  return type === videoType
    ? mediaFactory(data.id, data.title, data.video, data.likes, data.date, data.price, photographerId, videoType, data.description)
    : mediaFactory(data.id, data.title, data.image, data.likes, data.date, data.price, photographerId, imageType);
}

export { totalLikesEl, totalLikes, createMediaFromData, createMediaItem, createMediaLink, createMediaContent, createMediaInfo, getTotalLikes };