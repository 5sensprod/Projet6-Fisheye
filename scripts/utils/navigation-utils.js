// Définition des sélecteurs
const TAB_SELECTORS = [
    '.media-link',
    '.media-video',
    '.page-content',
    '.dropdown',
    '#sort-by',
    '.contact_button'
];

// Elements de navigation à désactiver lors de l'ouverture de la lightbox
export const navElements = document.querySelectorAll(TAB_SELECTORS.join(','));

// Fonction pour désactiver la navigation par tabulation pour les éléments spécifiés
export function disableTabNavigation(elements) {
    TAB_SELECTORS.forEach(selector => {
        const elementsToDisable = document.querySelectorAll(selector);
        elementsToDisable.forEach(element => {
            element.setAttribute('tabindex', '-1');
        });
    });

    elements.forEach(element => {
        element.setAttribute('tabindex', '-1');
    });
}

// Fonction pour rétablir la navigation par tabulation pour les éléments spécifiés
export function enableTabNavigation(elements) {
    TAB_SELECTORS.forEach(selector => {
        const elementsToEnable = document.querySelectorAll(selector);
        elementsToEnable.forEach(element => {
            element.removeAttribute('tabindex');
        });
    });

    elements.forEach(element => {
        element.removeAttribute('tabindex');
    });
}

// Fonction pour fermer la lightbox et réactiver la navigation par tabulation
export function closeLightbox(lightbox, navElements) {
    lightbox.style.display = "none";
    enableTabNavigation(navElements);
}

// Fonction pour fermer la modale et réactiver la navigation par tabulation
export function closeModal(modal, navElements) {
    modal.style.display = "none";
    enableTabNavigation(navElements);
}

