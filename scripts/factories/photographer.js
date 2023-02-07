function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("role", "region");

        const figure = document.createElement('figure');
        figure.classList.add('card_portrait');
        figure.setAttribute("tabindex", "0");
        figure.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                window.location.href = `photographer.html?id=${data.id}`;
            }
        });

        figure.addEventListener("click", function () {
            window.location.href = `photographer.html?id=${data.id}&name=${data.name}`;
        });

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const descContainer = document.createElement('div');
        descContainer.classList.add('card_desc-container');
        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        location.classList.add('card_location');
        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;
        taglineElement.classList.add('card_tagline');
        const priceElement = document.createElement('p');
        priceElement.textContent = `${price} € / jour`;
        priceElement.classList.add('card_price');
        descContainer.appendChild(location);
        descContainer.appendChild(taglineElement);
        descContainer.appendChild(priceElement);

        figure.appendChild(img);
        figure.appendChild(h2);
        article.appendChild(figure);
        article.appendChild(descContainer);
        return article;
    }
    return { name, picture, city, country, tagline, price, id, getUserCardDOM }
}