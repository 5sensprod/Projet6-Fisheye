import { getPhotographers } from '../data/photographersFetcher.js';
import { photographerFactory } from '../factories/photographer.js';

// Affiche les photographes

async function displayData() {
    // Récupère les données des photographes en appelant la fonction getPhotographers
    const photographers = await getPhotographers();

    const photographersSection = document.querySelector('.photographer_section');
    // Pour chaque photographe, crée un modèle de photographe et récupère le DOM de la carte utilisateur
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

displayData();