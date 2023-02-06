const url = new URL(window.location.href);
const id = url.searchParams.get("id");

fetch("https://5sensprod.github.io/Projet6-Fisheye/data/photographers.json")
  .then(response => response.json())
  .then(data => {
    const photographer = data.photographers.find(p => p.id == id);
    return photographer;
  })
  .then(photographer => {
    const photographerInfo = document.getElementById("photographer-info");
    photographerInfo.innerHTML = `
      <h2>${photographer.name}</h2>
      <p>${photographer.city}, ${photographer.country}</p>
      <p>${photographer.tagline}</p>
    `;
  });