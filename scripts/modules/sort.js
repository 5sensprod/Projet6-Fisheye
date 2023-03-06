// Importer les fonctions nécessaires
import { media } from '../pages/photographer.js';
import { renderMedia } from '../pages/photographer.js';
import { setAttributes, addClass, removeClass } from '../utils/domUtils.js';

// Sélectionner les éléments HTML nécessaires
const sortOptions = document.querySelectorAll('.sort_option');
const sortDropdown = document.querySelector('.sort_dropdown');
const sortIcon = document.querySelector('.sort_icon');
const sortText = document.querySelector('.sort_dropdown span');

// Initialiser la variable pour stocker l'état actuel de la liste déroulante
let isCollapsed = sortDropdown.classList.contains('collapsed');

// Initialiser les attributs "tabindex" des options de tri en fonction de l'état initial de la liste déroulante
sortOptions.forEach(option => setAttributes(option, { 'tabindex': isCollapsed ? '-1' : '0' }));

// Fonction pour trier les médias en fonction du type de tri sélectionné
function sortMedia(media, sortType) {
    // Objets contenant les fonctions de tri pour chaque type de tri possible
    const sorts = {
        'popularity': (a, b) => b.likes - a.likes,
        'date': (a, b) => new Date(b.date) - new Date(a.date),
        'title': (a, b) => a.title.localeCompare(b.title)
    };

    media.sort(sorts[sortType]);
    renderMedia(media);
}
export { sortMedia }

// Fonction pour activer une option de tri et trier les médias en conséquence
function activateOption(option, media) {
    sortOptions.forEach(option => removeClass(option, 'sort_option-active'));
    addClass(option, 'sort_option-active');
    sortText.textContent = option.textContent;
    setAttributes(document.querySelector('.sort_used'), { 'aria-label': option.getAttribute('aria-label') });

    const sortType = option.dataset.sort;
    sortMedia(media, sortType);
}

// Initialiser les attributs "tabindex" des options de tri en fonction de l'état initial de la liste déroulante
sortOptions.forEach(option => setAttributes(option, { 'tabindex': sortDropdown.classList.contains('collapsed') ? '-1' : '0' }));

// Gestions des événements
// Ajouter l'événement "keydown" à la liste déroulante pour permettre l'ouverture/fermeture de la liste avec la touche "Enter"
sortDropdown.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sortDropdown.classList.toggle('collapsed');
        sortIcon.classList.toggle('rotate');
        sortOptions.forEach(option => setAttributes(option, { 'tabindex': sortDropdown.classList.contains('collapsed') ? '-1' : '0' }));
    }
});

// Ajouter l'événement "click" à l'icône de la liste déroulante pour permettre l'ouverture/fermeture de la liste
sortIcon.addEventListener('click', () => {
    sortDropdown.classList.toggle('collapsed');
    sortIcon.classList.toggle('rotate');
    sortOptions.forEach(option => setAttributes(option, { 'tabindex': sortDropdown.classList.contains('collapsed') ? '-1' : '0' }));
});

// Fermer la liste de tri quand on clique en dehors de la liste
window.addEventListener('click', event => {
    if (!sortDropdown.contains(event.target)) {
        addClass(sortDropdown, 'collapsed');
        removeClass(sortIcon, 'rotate');
    }
});

//  Fermer la liste de tri avec la touche "Tab" quand on sort de la liste
sortOptions[sortOptions.length - 1].addEventListener('keydown', event => {
    if (event.key === 'Tab' && !event.shiftKey) {
        addClass(sortDropdown, 'collapsed');
        removeClass(sortIcon, 'rotate');
    }
});

// Ajouter l'événement "click" à la liste déroulante pour permettre l'ouverture/fermeture de la liste
sortDropdown.addEventListener('click', () => {
    sortDropdown.classList.toggle('collapsed');
    sortIcon.classList.toggle('rotate');
});

// Ajoute l'événement "click" et "keydown" pour chaque option de tri
sortOptions.forEach(option => {
    option.addEventListener('click', () => activateOption(option, media));
    option.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            activateOption(option, media);
        }
    });
});

// Fermer la liste de tri avec la touche "Esc" quand on est dedans
sortDropdown.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        addClass(sortDropdown, 'collapsed');
        removeClass(sortIcon, 'rotate');
        sortOptions.forEach(option => setAttributes(option, { 'tabindex': sortDropdown.classList.contains('collapsed') ? '-1' : '0' }));
    }
});