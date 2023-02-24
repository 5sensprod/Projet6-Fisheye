import { showLightbox } from '../utils/lightbox.js';
import mediaSorter from '../utils/mediaSorter.js';

const mediaUrl = 'assets/medias';
const imageType = 'image';
const videoType = 'video';
let totalLikes = 0;

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
    likesIcon.classList.add("fas", "fa-heart");
    let isLiked = false;

    const likesCount = document.createElement("span");
    likesCount.classList.add("likes-count");
    likesCount.textContent = this.likes;

    mediaLikes.appendChild(likesIcon);
    mediaLikes.appendChild(likesCount);

    mediaInfo.appendChild(mediaTitle);
    mediaInfo.appendChild(mediaLikes);

    likesIcon.addEventListener("click", function () {
      if (!isLiked) {
        likesCount.textContent = parseInt(likesCount.textContent) + 1;
        likesIcon.classList.add("liked");
        isLiked = true;
        totalLikes++; //incrémente le total de likes
        totalLikesEl.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`; //met à jour l'affichage du total des likes
      } else {
        likesCount.textContent = parseInt(likesCount.textContent) - 1;
        likesIcon.classList.remove("liked");
        isLiked = false;
        totalLikes--; //décrémente le total de likes
        totalLikesEl.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`; //met à jour l'affichage du total des likes
      }
    });

    mediaItem.appendChild(mediaInfo);

    return mediaItem;
  };

  return media;
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
  if (type === videoType) {
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

  media.forEach(m => {
    totalLikes += m.likes;
    if (m.isLiked) {
      totalLikes += 1;
    }
  });
  return totalLikes;
}

const totalLikesEl = document.querySelector("#total-likes");
//Récupère les données de médias pour le photographe actuel et les affiche
function fetchMedia() {
  const url = new URL(window.location.href);
  const photographerId = url.searchParams.get("id");

  fetch("https://5sensprod.github.io/Projet6-Fisheye/data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      const photographerData = data.photographers.find((p) => p.id == photographerId);
      const media = data.media
        .filter((m) => m.photographerId == photographerId)
        .map((m) => createMediaFromData(m, photographerId));

      const mediaList = document.querySelector(".media-photographer");

      // Tri des médias par popularité (nombre de likes décroissant)
      media.sort((a, b) => b.likes - a.likes);

      media.forEach((m) => {
        mediaList.appendChild(m.render());
      });

      const totalLikes = getTotalLikes(media);

      totalLikesEl.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
    });
}

fetchMedia();