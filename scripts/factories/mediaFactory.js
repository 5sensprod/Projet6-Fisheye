import { appendNode } from '../utils/domUtils.js';
import { totalLikes, createMediaItem, createMediaLink, createMediaContent, createMediaInfo, getTotalLikes } from '../modules/media.js';

function mediaFactory(id, title, image, likes, date, price, photographerId, type) {
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

    function renderLikes() {
        const likesCount = this.likes;
        const likesCountSpan = document.querySelector(`.media[data-id="${this.id}"] .likes-count`);
        likesCountSpan.textContent = likesCount;
        likesCountSpan.setAttribute("aria-label", `${this.title} à ${likesCount} j'aime`);
        totalLikes = getTotalLikes(mediaList);
    }

    return { id, title, image, likes, date, price, photographerId, type, isLiked: false, render, renderLikes };
}

export { mediaFactory };