import { getPhotographerById } from '../data/photographersFetcher.js';

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

getPhotographerById(id)
  .then(photographer => {
    // 1. Afficher la photo de profil
    const portraitImage = document.createElement('img');
    const portraitUrl = `assets/photographers/${photographer.portrait}`;
    portraitImage.src = portraitUrl;
    portraitImage.alt = photographer.name;
    portraitImage.classList.add('photographer-portrait-image');
    document.querySelector('.photographer-portrait').appendChild(portraitImage);

    // 2. Afficher les informations du photographe
    const nameElement = document.createElement('h2');
    nameElement.textContent = photographer.name;
    nameElement.classList.add('photographer-name');
    document.getElementById('photographer-info').appendChild(nameElement);

    const locationElement = document.createElement('p');
    locationElement.textContent = `${photographer.city}, ${photographer.country}`;
    locationElement.classList.add('photographer-location');
    document.getElementById('photographer-info').appendChild(locationElement);

    const taglineElement = document.createElement('p');
    taglineElement.textContent = photographer.tagline;
    taglineElement.classList.add('photographer-tagline');
    document.getElementById('photographer-info').appendChild(taglineElement);

    // 3. Afficher le prix journalier
    const priceElement = document.getElementById('daily-price');
    priceElement.textContent = `${photographer.price} € / jour`;
  })
  .catch(error => console.error(error));