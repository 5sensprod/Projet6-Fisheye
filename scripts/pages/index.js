import { getPhotographers } from '../data/photographersFetcher.js';
import { photographerFactory } from '../factories/photographer.js';

// Affiche les photographes
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