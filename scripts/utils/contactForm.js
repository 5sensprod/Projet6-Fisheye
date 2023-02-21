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
      modalContainer.querySelectorAll('input').forEach(input => input.removeAttribute('aria-describedby'));
      modalContainer.querySelectorAll('.error-message').forEach(error => error.textContent = '');
    });

  const pageContent = document.querySelector('.page-content');
  pageContent.setAttribute('aria-hidden', 'true');
  pageContent.classList.add('modal-open');
  modal.style.display = "block";
}
  
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true');
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
  const submitButton = document.querySelector(".submit_button");
  
  submitButton.addEventListener("click", submitForm);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });