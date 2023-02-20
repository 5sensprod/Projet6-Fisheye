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
        modalContainer.setAttribute('aria-modal', 'true');
  
        // Désactive la navigation par tabulation pour les éléments en dehors du formulaire
        const pageContent = document.querySelector('.page-content');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        const nonFormElements = [pageContent, header, footer];
        nonFormElements.forEach(elem => {
          for (let child of elem.children) {
            child.setAttribute('tabindex', '-1');
          }
        });
      });
  
    const pageContent = document.querySelector('.page-content');
    pageContent.classList.add('modal-open');
    modal.style.display = "block";

    
  }
  
  function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.removeAttribute('aria-modal');
    const pageContent = document.querySelector('.page-content');
    pageContent.classList.remove('modal-open');
  
    // Réactive la navigation par tabulation pour les éléments en dehors du formulaire
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const nonFormElements = [header, footer];
    nonFormElements.forEach(elem => {
      for (let child of elem.children) {
        child.removeAttribute('tabindex');
      }
    });
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