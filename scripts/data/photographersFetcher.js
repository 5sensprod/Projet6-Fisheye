// Cette fonction récupère les données des photographes à partir d'un fichier JSON en utilisant l'API Fetch
export const getPhotographers = async () => {
  const response = await fetch("https://5sensprod.github.io/Projet6-Fisheye/data/photographers.json");
  const data = await response.json();
  return data.photographers;
};

export async function getPhotographerById(id) {
  const photographers = await getPhotographers();
  const photographer = photographers.find(p => p.id == id);
  return photographer;
}