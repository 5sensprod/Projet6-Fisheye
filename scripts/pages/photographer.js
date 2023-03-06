import { getPhotographerById, getPhotographerMedia } from '../data/photographersFetcher.js';
import { clearNode, appendNode, setInnerHTML } from '../utils/domUtils.js';
import { totalLikesEl, createMediaFromData, getTotalLikes } from '../modules/media.js';
import { sortMedia } from '../modules/sort.js';

// Récupère l'id du photographe dans l'url
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

// Affiche les informations du photographe par rapport à l'id
async function renderPhotographerInfo() {
  try {
    const photographer = await getPhotographerById(id);

    // Vérifie si le photographe a été trouvé
    if (!photographer) {
      throw new Error("Photographer not found");
    }

    // Crée un élément HTML pour la photo de profil
    const portraitImage = document.createElement('img');
    const portraitUrl = `assets/photographers/${photographer.portrait}`;
    portraitImage.src = portraitUrl;
    portraitImage.alt = photographer.name;
    portraitImage.classList.add('photographer-portrait-image');
    document.querySelector('.photographer-portrait').appendChild(portraitImage);

    // Crée un élément HTML pour le nom du photographe
    const nameElement = document.createElement('h2');
    nameElement.textContent = photographer.name;
    nameElement.classList.add('photographer-name');

    // Crée un élément HTML pour la localisation du photographe
    const locationElement = document.createElement('p');
    locationElement.textContent = `${photographer.city}, ${photographer.country}`;
    locationElement.classList.add('photographer-location');

    // Crée un élément HTML pour la tagline du photographe
    const taglineElement = document.createElement('p');
    taglineElement.textContent = photographer.tagline;
    taglineElement.classList.add('photographer-tagline');

    // Ajoute les éléments HTML pour le nom, la localisation et la tagline du photographe dans #photographer-info
    const photographerInfoEl = document.getElementById('photographer-info');
    photographerInfoEl.appendChild(nameElement);
    photographerInfoEl.appendChild(locationElement);
    photographerInfoEl.appendChild(taglineElement);

    // Affiche le prix journalier
    const priceElement = document.getElementById('daily-price');
    priceElement.textContent = `${photographer.price} € / jour`;

    // Donne le titre de la page en fonction du nom du photographe
    document.title = `${photographer.name} - Fisheye`;

  } catch (error) {
    console.error(error);
    // Vérifie si l'erreur est due à un photographe introuvable (erreur 404)
    if (error.message === "Photographer not found") {
      // Redirige l'utilisateur vers la page 404
      window.location.href = "404.html";
    }
  }
}
renderPhotographerInfo();

// Récupère les données de médias pour le photographe actuel et les affiche
let media = [];

async function loadPhotographerMedia() {
  try {
    const url = new URL(window.location.href);
    const photographerId = url.searchParams.get("id");

    // Récupération des données des médias du photographe depuis l'API
    const mediaData = await getPhotographerMedia(photographerId);
    media = mediaData.map((m) => createMediaFromData(m, photographerId));
    const totalLikes = getTotalLikes(media);

    // Calcul et affichage du nombre total de likes pour les médias du photographe
    setInnerHTML(totalLikesEl, `${totalLikes} <i class="fas fa-heart"></i>`);

    // Tri des médias par popularité par défaut
    sortMedia(media, 'popularity');
  } catch (error) {
    console.error(error);
  }
}
loadPhotographerMedia();

// Affiche les médias du photographe grâce à l'id et la factory function  
function renderMedia(media) {
  const mediaList = document.querySelector(".media-photographer");
  // Supprime les médias précédents suite au tri
  clearNode(mediaList);
  media.forEach((m) => {
    appendNode(mediaList, m.render());
  });
}

export { renderMedia, media }