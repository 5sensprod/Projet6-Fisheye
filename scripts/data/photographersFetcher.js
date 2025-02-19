const API_URL = 'https://5sensprod.github.io/Projet6-Fisheye/data/photographers.json';

// Récupère un photographe par ID
async function getPhotographerById(id) {
  const photographers = await getPhotographers();
  const photographer = photographers.find(p => p.id == id);
  return photographer;
}

// Récupère les médias d'un photographe par son ID
async function getPhotographerMedia(photographerId) {
  const response = await fetch(API_URL);
  const data = await response.json();
  const media = data.media.filter((m) => m.photographerId == photographerId);
  return media;
}

// Récupère tous les photographes
async function getPhotographers() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.photographers;
}

export { getPhotographerById, getPhotographers, getPhotographerMedia }