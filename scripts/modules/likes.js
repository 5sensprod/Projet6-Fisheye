import { setInnerHTML } from '../utils/domUtils.js';
import { totalLikesEl, totalLikes } from './media.js';
import { media } from '../pages/photographer.js';

//Calcule le nombre total de likes pour tous les médias
const getTotalLikes = () => {
  return media.reduce((totalLikes, m) => totalLikes + m.likes, 0);
}

//Met à jour l'affichage du nombre total de likes
const updateTotalLikes = () => {
  setInnerHTML(totalLikesEl, `${totalLikes} <i class="fas fa-heart"></i>`);
}

export { getTotalLikes, updateTotalLikes }