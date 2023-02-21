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



// Fermer la modale en cliquant sur Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Fermer la modale en cliquant sur enter sur le bouton de fermeture
function handleCloseModalKeydown(event) {
  if (event.key === 'Enter') {
    closeModal();
  }
}

const closeButton = document.querySelector('img[onclick="closeModal()"]');
closeButton.addEventListener('keydown', handleCloseModalKeydown);



const submitButton = document.querySelector('.submit_button');
submitButton.addEventListener("click", submitForm);


// fonction de validation du formulaire
function validateForm() {
  const lastname = document.querySelector("#lastname").value;
  const firstname = document.querySelector("#firstname").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;
  const lastnameError = document.querySelector("#lastname-error");
  const firstnameError = document.querySelector("#firstname-error");
  const emailError = document.querySelector("#email-error");
  const messageError = document.querySelector("#message-error");

  const nameRegex = /^[a-zA-Z\s]*$/;
  const emailRegex = /^\S+@\S+\.\S+$/;

  let errors = false;

  if (lastname === "") {
    lastnameError.textContent = "Le nom est requis";
    errors = true;
  } else if (!nameRegex.test(lastname)) {
    lastnameError.textContent = "Le nom doit contenir des lettres uniquement";
    errors = true;
  } else {
    lastnameError.textContent = "";
  }

  if (firstname === "") {
    firstnameError.textContent = "Le prénom est requis";
    errors = true;
  } else if (!nameRegex.test(firstname)) {
    firstnameError.textContent = "Le prénom doit contenir des lettres uniquement";
    errors = true;
  } else {
    firstnameError.textContent = "";
  }

  if (email === "") {
    emailError.textContent = "L'adresse e-mail est requise";
    errors = true;
  } else if (!emailRegex.test(email)) {
    emailError.textContent = "L'adresse e-mail est invalide";
    errors = true;
  } else {
    emailError.textContent = "";
  }

  if (message === "") {
    messageError.textContent = "Le message est requis";
    errors = true;
  } else {
    messageError.textContent = "";
  }

  return !errors;
}


// fonction d'envoi du formulaire

function submitForm(event) {
  event.preventDefault();
  if (validateForm()) {
    const form = document.querySelector("form");
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
}


// Validation du formulaire en temps réel

const nameInputs = document.querySelectorAll("#lastname, #firstname");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

nameInputs.forEach(input => {
  input.addEventListener("input", function() {
    const error = document.querySelector(`#${input.id}-error`);
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (nameRegex.test(input.value)) {
      error.textContent = "";
    } else {
      error.textContent = "Le champ doit contenir des lettres uniquement";
    }
  });
});

emailInput.addEventListener("input", function() {
  const error = document.querySelector("#email-error");
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (emailRegex.test(emailInput.value)) {
    error.textContent = "";
  } else {
    error.textContent = "L'adresse e-mail est invalide";
  }
});

messageInput.addEventListener("input", function() {
  const error = document.querySelector("#message-error");
  if (messageInput.value === "") {
    error.textContent = "Le message est requis";
  } else {
    error.textContent = "";
  }
});