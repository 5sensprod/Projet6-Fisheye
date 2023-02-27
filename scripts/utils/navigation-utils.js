// Fonction pour rétablir le défilement du corps du document
function enableBodyScroll() {
    document.body.style.overflow = 'auto';
}

// Fonction pour faire disparaitre les modales
function hideModal(modal) {
    modal.style.display = "none";
}


// Définition des sélecteurs
const TAB_SELECTORS = [
    '.sort_dropdown collapsed',
    '.media-link',
    '.dropdown',
    '#sort-dropdown',
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
            element.setAttribute('tabindex', '0');
        });
    });

    elements.forEach(element => {
        element.setAttribute('tabindex', '0');
    });
}

// Fonction pour fermer la lightbox et réactiver la navigation par tabulation
export function closeLightbox(lightbox, navElements) {
    hideModal(lightbox);
    enableTabNavigation(navElements);
    enableBodyScroll();
}

// Fonction pour fermer la modale et réactiver la navigation par tabulation
export function closeModal(modal, navElements) {
    hideModal(modal);
    enableTabNavigation(navElements);
    enableBodyScroll();
    document.querySelector('.page-content').classList.remove('modal-open');
}