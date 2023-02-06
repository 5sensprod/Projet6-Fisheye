async function getPhotographers() {
    const response = await fetch("https://5sensprod.github.io/Projet6-Fisheye/data/photographers.json");
    const data = await response.json();
    // console.log(data);
    const photographers = data["photographers"];
    return photographers;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
};

init();