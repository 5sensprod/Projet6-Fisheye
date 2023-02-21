function displayModal() {
  const modal = document.getElementById("contact_modal");
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");

  fetch("https://5sensprod.github.io/Projet6-Fisheye/data/photographers.json")
    .then(response => response.json())
    .then(data => {
      const photographer = data.photographers.find(p => p.id == id);
      const photographerNameDiv = document.getElementById("photographer-name");
      photographerNameDiv.textContent = photographer.name;
      document.querySelector("#lastname").focus();
      const modalContainer = document.getElementById("contact_modal");
      const photographerName = photographer.name;
      modalContainer.setAttribute("role", "dialog");
      modalContainer.setAttribute("aria-label", `Formulaire pour contacter ${photographerName}`);
      modalContainer.setAttribute('aria-hidden', 'false');
      modalContainer.removeAttribute('aria-modal');
      modalContainer.removeAttribute('tabindex');
      // modalContainer.querySelectorAll('input').forEach(input => input.removeAttribute('aria-describedby'));
      // modalContainer.querySelectorAll('.error-message').forEach(error => error.textContent = '');

      // Mettre à jour la variable isModalOpen
      isModalOpen = true;

      // Exclure les articles de l'ordre de navigation au clavier
      const mediaItems = document.querySelectorAll('.media-item');
      mediaItems.forEach(mediaItem => {
        const mediaLink = mediaItem.querySelector('.media-link');
        mediaLink.setAttribute('tabindex', '-1');
      });

      // Exclure le bouton de contact de l'ordre de navigation au clavier
      const contactButton = document.querySelector('.contact_button');
      contactButton.setAttribute('tabindex', '-1');

      // Désactiver la navigation au clavier pour les vidéos
      const videoElements = document.querySelectorAll('video');
      videoElements.forEach(video => {
        video.setAttribute('tabindex', '-1');
        video.setAttribute('aria-hidden', 'true');
      });

      // Ajout de l'attribut tabindex="-1" à la div de contenu principal
      const pageContent = document.querySelector('.page-content');
      pageContent.setAttribute('tabindex', '-1');
    });

  // Empêcher le scroll de la page
  document.body.style.overflow = 'hidden';


  const pageContent = document.querySelector('.page-content');
  pageContent.setAttribute('aria-hidden', 'true');
  pageContent.classList.add('modal-open');
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true');

  // Mettre à jour la variable isModalOpen
  isModalOpen = false;

  // Rétablir l'ordre de navigation au clavier normal des articles
  const mediaItems = document.querySelectorAll('.media-item');
  mediaItems.forEach(mediaItem => {
    const mediaLink = mediaItem.querySelector('.media-link');
    mediaLink.removeAttribute('tabindex');
  });

  // Rétablir la navigation au clavier pour les vidéos
  const videoElements = document.querySelectorAll('video');
  videoElements.forEach(video => {
    video.removeAttribute('tabindex');
    video.removeAttribute('aria-hidden');
  });

  // Rétablir l'ordre de navigation au clavier normal du bouton de contact
  const contactButton = document.querySelector('.contact_button');
  contactButton.removeAttribute('tabindex');

  // Rétablir le scroll de la page
  document.body.style.overflow = '';

  const pageContent = document.querySelector('.page-content');
  pageContent.removeAttribute('aria-hidden');
  pageContent.classList.remove('modal-open');
}

function submitForm(event) {
  event.preventDefault();
  const lastname = document.querySelector("#lastname").value;
  const firstname = document.querySelector("#firstname").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;
  console.log("Nom :", lastname);
  console.log("Prénom :", firstname);
  console.log("Email :", email);
  console.log("Message :", message);
  form.reset();
  closeModal();
}

const form = document.querySelector("form");
const submitButton = document.querySelector('.submit_button');
submitButton.addEventListener("click", submitForm);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

function handleCloseModalKeydown(event) {
  if (event.key === 'Enter') {
    closeModal();
  }
}

const closeButton = document.querySelector('img[onclick="closeModal()"]');
closeButton.addEventListener('keydown', handleCloseModalKeydown);
