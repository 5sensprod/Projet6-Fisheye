const url = new URL(window.location.href);
const id = url.searchParams.get("id");

fetch("https://5sensprod.github.io/Projet6-Fisheye/data/photographers.json")
  .then(response => response.json())
  .then(data => {
    const photographer = data.photographers.find(p => p.id == id);
    const picture = `assets/photographers/${photographer.portrait}`;
    return { photographer, picture };
  })
  .then(({ photographer, picture }) => {
    const photographerPortrait = document.querySelector('.photographer-portrait');
    const image = document.createElement("img");
    image.setAttribute("src", picture);
    image.setAttribute("alt", photographer.name);
    image.classList.add("photographer-portrait-image");
    photographerPortrait.appendChild(image);

    const photographerInfo = document.getElementById("photographer-info");

    const nameEl = document.createElement("h2");
    nameEl.textContent = photographer.name;
    nameEl.classList.add("photographer-name");
    photographerInfo.appendChild(nameEl);

    const locationEl = document.createElement("p");
    locationEl.textContent = `${photographer.city}, ${photographer.country}`;
    locationEl.classList.add("photographer-location");
    photographerInfo.appendChild(locationEl);

    const taglineEl = document.createElement("p");
    taglineEl.textContent = photographer.tagline;
    taglineEl.classList.add("photographer-tagline");
    photographerInfo.appendChild(taglineEl);
  });