function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
  
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
  
    fetch("https://5sensprod.github.io/Projet6-Fisheye/data/photographers.json")
      .then(response => response.json())
      .then(data => {
        const photographer = data.photographers.find(p => p.id == id);
  
        const photographerNameDiv = document.getElementById("photographer-name");
        photographerNameDiv.textContent = photographer.name;
      });
  }
  
  function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
  }
  
  const form = document.querySelector("form");
  const submitButton = document.querySelector(".submit_button");
  
  submitButton.addEventListener("click", (event) => {
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
  });