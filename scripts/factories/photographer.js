import { getPhotographers } from '../data/photographersFetcher.js';

function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    article.setAttribute('role', 'region');

    const figure = document.createElement('figure');
    figure.classList.add('card_portrait');
    figure.setAttribute('tabindex', '0');
    figure.setAttribute('aria-label', `Afficher les médias de ${name}`);
    figure.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        window.location.href = `photographer.html?id=${data.id}`;
      }
    });

    figure.addEventListener('click', function () {
      window.location.href = `photographer.html?id=${data.id}`;
    });

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `Portrait de ${name}`);

    const h2 = document.createElement('h2');
    h2.textContent = name;

    const descContainer = document.createElement('div');
    descContainer.classList.add('card_desc-container');
    const location = document.createElement('p');
    location.textContent = `${city}, ${country}`;
    location.classList.add('card_location');
    const taglineElement = document.createElement('p');
    taglineElement.textContent = tagline;
    taglineElement.classList.add('card_tagline');
    const priceElement = document.createElement('p');
    priceElement.textContent = `${price} € / jour`;
    priceElement.classList.add('card_price');
    descContainer.appendChild(location);
    descContainer.appendChild(taglineElement);
    descContainer.appendChild(priceElement);

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = `Photographe ${name}`;

    figure.appendChild(img);
    figure.appendChild(h2);
    figure.appendChild(figcaption);
    article.appendChild(figure);
    article.appendChild(descContainer);
    return article;
  }

  return { name, picture, city, country, tagline, price, id, getUserCardDOM };
}

async function displayData() {
  const photographers = await getPhotographers();

  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

displayData();