function photographerFactory(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
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
        priceElement.textContent = `${price}€`;
        priceElement.classList.add('card_price');
        descContainer.appendChild(location);
        descContainer.appendChild(taglineElement);
        descContainer.appendChild(priceElement);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(descContainer);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}