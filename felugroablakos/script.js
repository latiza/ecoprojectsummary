document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".belso-keret"); // Minden kártya kiválasztása
  
    // Modal elemek létrehozása
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <img class="modal-image" src="" alt="Kártya képe">
        <h2 class="modal-title"></h2>
        <p class="modal-text"></p>
        <p class="modal-author"></p>
      </div>
    `;
    document.body.appendChild(modal);
  
    const modalImage = modal.querySelector(".modal-image");
    const modalTitle = modal.querySelector(".modal-title");
    const modalText = modal.querySelector(".modal-text");
    const modalAuthor = modal.querySelector(".modal-author");
    const closeModal = modal.querySelector(".close-modal");
  
    // Modal bezárása
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    // Kártyák feldolgozása
    cards.forEach((card) => {
      const textElements = card.querySelectorAll(".text-data"); // Szöveg elemek kiválasztása
      const openButton = card.querySelector("#openbtn"); // Kinyit gomb
      const cardImage = card.querySelector("img"); // Kép kiválasztása
      const cardTitle = card.querySelector("h2"); // Cím kiválasztása
      const cardAuthor = card.querySelector(".author"); // Author kiválasztása
  
      // Eredeti szövegek tárolása, és első 100 karakter megjelenítése
      textElements.forEach((textElement) => {
        const fullText = textElement.textContent.trim();
        if (fullText.length > 100) {
          textElement.setAttribute("data-full-text", fullText); // Az eredeti szöveg mentése
          textElement.textContent = fullText.substring(0, 100) + "..."; // Levágott szöveg
        }
      });
  
      // Kinyit gomb eseménykezelő
      openButton.addEventListener("click", () => {
        const fullText = Array.from(textElements)
          .map((textElement) => textElement.getAttribute("data-full-text"))
          .join("\n\n");
  
        if (cardImage) {
          modalImage.src = cardImage.src; // Modalban lévő kép beállítása
          modalImage.alt = cardImage.alt || "Kártya képe";
        }
  
        if (cardTitle) {
          modalTitle.textContent = cardTitle.textContent; // Modalban lévő cím beállítása
        }
  
        modalText.textContent = fullText; // Teljes szöveg megjelenítése a modal ablakban
  
        if (cardAuthor) {
          modalAuthor.textContent = `Szerző: ${cardAuthor.textContent.trim()}`; // Author megjelenítése
        }
  
        modal.style.display = "block"; // Modal megjelenítése
      });
    });
  
    // Modal bezárása, ha a modal ablakon kívül kattintunk
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  