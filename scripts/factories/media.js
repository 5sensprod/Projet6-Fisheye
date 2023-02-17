function createMedia(id, title, image, likes, date, price, photographerId, type) {
  const media = {};

  media.id = id;
  media.title = title;
  media.image = image;
  media.likes = likes;
  media.date = date;
  media.price = price;
  media.photographerId = photographerId;
  media.type = type;

  media.render = function () {
    const mediaItem = document.createElement("article");
    mediaItem.classList.add("media-item");

    const mediaLink = document.createElement("a");
    mediaLink.setAttribute("href", `assets/medias/${this.photographerId}/${this.image}`);
    mediaLink.setAttribute("data-lightbox", "gallery");
    mediaLink.setAttribute("data-title", this.title);

    let mediaContent;

    if (this.type === "image") {
      const mediaImg = document.createElement("img");
      mediaImg.classList.add("media-img");
      mediaImg.setAttribute("src", `assets/medias/${this.photographerId}/${this.image}`);
      mediaImg.setAttribute("alt", this.title);
      mediaContent = mediaImg;
    } else if (this.type === "video") {
      const mediaVideo = document.createElement("video");
      mediaVideo.classList.add("media-video");
      mediaVideo.setAttribute("src", `assets/medias/${this.photographerId}/${this.image}`);
      mediaVideo.setAttribute("alt", this.title);
      mediaVideo.setAttribute("controls", "");
      mediaContent = mediaVideo;
    }

    mediaLink.appendChild(mediaContent);
    mediaItem.appendChild(mediaLink);

    const mediaInfo = document.createElement("div");
    mediaInfo.classList.add("media-info");

    const mediaTitle = document.createElement("h2");
    mediaTitle.classList.add("media-title");
    mediaTitle.textContent = this.title;

    const mediaLikes = document.createElement("div");
    mediaLikes.classList.add("media-likes");

    const likesIcon = document.createElement("i");
    likesIcon.classList.add("fas", "fa-heart");

    const likesCount = document.createElement("span");
    likesCount.classList.add("likes-count");
    likesCount.textContent = this.likes;

    mediaLikes.appendChild(likesIcon);
    mediaLikes.appendChild(likesCount);

    mediaInfo.appendChild(mediaTitle);
    mediaInfo.appendChild(mediaLikes);

    mediaItem.appendChild(mediaInfo);

    return mediaItem;
  };

  return media;
}
  
  function getTotalLikes(media) {
    return media.reduce((totalLikes, m) => totalLikes + m.likes, 0);
  }

  function fetchMedia() {
    const url = new URL(window.location.href);
    const photographerId = url.searchParams.get("id");
  
    fetch("https://5sensprod.github.io/Projet6-Fisheye/data/photographers.json")
      .then((response) => response.json())
      .then((data) => {
        const media = data.media.filter((m) => m.photographerId == photographerId);
        const mediaList = document.querySelector(".media-photographer");
  
        media.forEach((m) => {
          let mediaItem;
  
          if (m.video) {
            mediaItem = createMedia(
              m.id,
              m.title,
              m.video,
              m.likes,
              m.date,
              m.price,
              m.photographerId,
              "video"
            );
          } else {
            mediaItem = createMedia(
              m.id,
              m.title,
              m.image,
              m.likes,
              m.date,
              m.price,
              m.photographerId,
              "image"
            );
          }
  
          mediaList.appendChild(mediaItem.render());
        });
  
        const totalLikes = getTotalLikes(media);
        const totalLikesEl = document.querySelector("#total-likes");
        totalLikesEl.innerHTML = `<i class="fas fa-heart"></i> ${totalLikes}`;
  
        const dailyPriceEl = document.querySelector("#daily-price");
        dailyPriceEl.textContent = photographer.price;
      });
  }
  
  fetchMedia();