import { getPhotographerById } from '../data/photographersFetcher.js';

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
let photographerName;

async function checkIdValidity() {
  // Vérifie si l'ID existe
  if (id) {
    const photographer = await getPhotographerById(id);

    // Vérifie si le photographe existe
    if (!photographer) {
      window.location.href = "404.html";
      return;
    }

    photographerName = photographer.name;

  } else {
    window.location.href = "404.html";
  }
}
export { photographerName };
checkIdValidity();