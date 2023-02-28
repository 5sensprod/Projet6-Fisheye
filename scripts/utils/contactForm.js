import { getPhotographerById } from '../data/photographersFetcher.js';
import { disableTabNavigation, navElements, closeModal } from './navigation-utils.js';


// Elements du DOM
const modal = document.getElementById("contact_modal");
const closeButton = document.getElementById('close_modal_button');
const contactButton = document.querySelector('.contact_button');
const submitButton = document.querySelector('.submit_button');


// Fonction d'affichage de la modale
function displayModal() {
  disableTabNavigation(navElements);
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  getPhotographerById(id)
    .then(photographer => {
      const photographerName = photographer.name;
      const photographerNameDiv = document.getElementById("photographer-name");
      photographerNameDiv.textContent = photographerName;
      document.querySelector("#lastname").focus();
      const modalContainer = document.getElementById("contact_modal");
      modalContainer.setAttribute("role", "dialog");
      modalContainer.setAttribute("aria-label", `Formulaire pour contacter ${photographerName}`);
      modalContainer.setAttribute('aria-hidden', 'false');
      modalContainer.removeAttribute('aria-modal');
      modalContainer.removeAttribute('tabindex');

    });

  // Afficher la modale
  modal.style.display = "block";
  document.body.style.overflow = 'hidden';

  // Ajouter la classe "modal-open" à la "page-content"
  const pageContent = document.querySelector(".page-content");
  pageContent.classList.add("modal-open");

}
contactButton.addEventListener('click', displayModal);

// Fermer la modale en cliquant en dehors de la modale
document.addEventListener('click', (event) => {
  if (modal.style.display === "block" && !modal.contains(event.target) && !event.target.matches(".contact_button")) {
    closeModal(modal, navElements);
  }
});

// Fermer la modale en cliquant sur Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal(modal, navElements)
  }
});

// Fermer la modale en cliquant sur enter sur le bouton de fermeture
function handleCloseModalKeydown(event) {
  if (event.key === 'Enter') {
    closeModal(modal, navElements)
  }
}

// Fermer la modale en cliquant sur le bouton de fermeture
closeButton.addEventListener('keydown', handleCloseModalKeydown);
closeButton.addEventListener('click', () => closeModal(modal, navElements));
submitButton.addEventListener("click", submitForm);

// Gestion de la soumission du formulaire

// Sélection des éléments du formulaire
// const form = document.querySelector('form');
const lastnameInput = document.querySelector('#lastname');
const firstnameInput = document.querySelector('#firstname');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const lastnameError = document.querySelector('#lastname-error');
const firstnameError = document.querySelector('#firstname-error');
const emailError = document.querySelector('#email-error');
const messageError = document.querySelector('#message-error');

// Validation du formulaire
function validateForm() {
  const nameRegex = /^[a-zA-Z\s]*$/;
  const emailRegex = /^\S+@\S+\.\S+$/;
  let errors = false;

  // Validation du champ nom
  if (lastnameInput.value === '') {
    lastnameError.textContent = 'Le nom est requis';
    lastnameError.setAttribute('aria-live', 'assertive'); // Ajout de l'attribut aria-live
    errors = true;
  } else if (!nameRegex.test(lastnameInput.value)) {
    lastnameError.textContent = 'Le nom doit contenir des lettres uniquement';
    lastnameError.setAttribute('aria-live', 'assertive'); // Ajout de l'attribut aria-live
    errors = true;
  } else {
    lastnameError.textContent = '';
  }

  // Validation du champ prénom
  if (firstnameInput.value === '') {
    firstnameError.textContent = 'Le prénom est requis';
    firstnameError.setAttribute('aria-live', 'assertive'); // Ajout de l'attribut aria-live
    errors = true;
  } else if (!nameRegex.test(firstnameInput.value)) {
    firstnameError.textContent = 'Le prénom doit contenir des lettres uniquement';
    firstnameError.setAttribute('aria-live', 'assertive'); // Ajout de l'attribut aria-live
    errors = true;
  } else {
    firstnameError.textContent = '';
  }

  // Validation du champ email
  if (emailInput.value === '') {
    emailError.textContent = 'L\'adresse e-mail est requise';
    emailError.setAttribute('aria-live', 'assertive'); // Ajout de l'attribut aria-live
    errors = true;
  } else if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = 'L\'adresse e-mail est invalide';
    emailError.setAttribute('aria-live', 'assertive'); // Ajout de l'attribut aria-live
    errors = true;
  } else {
    emailError.textContent = '';
  }

  // Validation du champ message
  if (messageInput.value === '') {
    messageError.textContent = 'Le message est requis';
    messageError.setAttribute('aria-live', 'assertive'); // Ajout de l'attribut aria-live
    errors = true;
  } else {
    messageError.textContent = '';
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
    closeModal(modal, navElements)
  }
}

// Validation du formulaire en temps réel

const nameInputs = document.querySelectorAll("#lastname, #firstname");
nameInputs.forEach(input => {
  input.addEventListener("input", function () {
    const error = document.querySelector(`#${input.id}-error`);
    const nameRegex = /^[a-zA-Z\s]*$/;
    if (nameRegex.test(input.value)) {
      error.textContent = "";
    } else {
      error.textContent = "Le champ doit contenir des lettres uniquement";
    }
  });
});

emailInput.addEventListener("input", function () {
  const error = document.querySelector("#email-error");
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (emailRegex.test(emailInput.value)) {
    error.textContent = "";
  } else {
    error.textContent = "L'adresse e-mail est invalide";
  }
});

messageInput.addEventListener("input", function () {
  const error = document.querySelector("#message-error");
  if (messageInput.value === "") {
    error.textContent = "Le message est requis";
  } else {
    error.textContent = "";
  }
});

