import { appendNode } from '../utils/domUtils.js';
import { totalLikes, createMediaItem, createMediaLink, createMediaContent, createMediaInfo, getTotalLikes } from '../modules/media.js';

// Définit une fonction factory pour les objets de média
function mediaFactory(id, title, image, likes, date, price, photographerId, type) {
    // Définit une méthode pour le rendu
    function render() {
        const mediaItem = createMediaItem();
        const mediaLink = createMediaLink(this);

        const mediaContent = createMediaContent(this);
        appendNode(mediaLink, mediaContent);

        const mediaInfo = createMediaInfo(this);
        appendNode(mediaItem, mediaLink);
        appendNode(mediaItem, mediaInfo);

        return mediaItem;
    }
    // Méthode pour le rendu des likes
    function renderLikes() {
        const likesCount = this.likes;
        const likesCountSpan = document.querySelector(`.media[data-id="${this.id}"] .likes-count`);
        likesCountSpan.textContent = likesCount;
        likesCountSpan.setAttribute("aria-label", `${this.title} à ${likesCount} j'aime`);
        totalLikes = getTotalLikes(mediaList);
    }
    // Représente l'objet de média avec ses propriétés et méthodes
    return { id, title, image, likes, date, price, photographerId, type, isLiked: false, render, renderLikes };
}

export { mediaFactory };