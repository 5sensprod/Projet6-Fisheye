import { getPhotographerById } from '../data/photographersFetcher.js';

const url = new URL(window.location.href);
const id = url.searchParams.get("id");

// Vérifie si l'ID existe
if (id) {
  let photographerName;

  async function displayName() {
    const photographer = await getPhotographerById(id);

    // Vérifie si le photographe existe
    if (!photographer) {
      window.location.href = "404.html";
      return;
    }

    photographerName = photographer.name;
  }

  await displayName();

} else {
  window.location.href = "404.html";
}
export let photographerName;