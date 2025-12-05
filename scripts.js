// Variabile globale pentru carusel
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const progressBar = document.getElementById("progressBar");

// Funcție pentru actualizarea barei de progres
function updateProgress() {
  // Verificăm dacă există slide-uri pentru a evita erorile
  if (slides.length === 0) return;

  const progress = ((currentSlide + 1) / slides.length) * 100;
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
}

// Funcție principală pentru schimbarea slide-urilor
function moveSlide(direction) {
  if (slides.length === 0) return;

  // Resetăm clasele slide-ului curent
  slides[currentSlide].classList.remove("active");
  slides[currentSlide].classList.remove("prev");

  // Calculăm indexul următorului slide
  let nextSlide = currentSlide + direction;

  // Logica de loop (infinit)
  if (nextSlide >= slides.length) nextSlide = 0;
  if (nextSlide < 0) nextSlide = slides.length - 1;

  // Adăugăm clasa pentru animația "înapoi" dacă e cazul
  if (direction === -1) {
    slides[nextSlide].classList.add("prev");
    // Forțăm reflow pentru a declanșa tranziția CSS
    void slides[nextSlide].offsetWidth;
  }

  // Activăm noul slide
  slides[nextSlide].classList.add("active");
  slides[nextSlide].classList.remove("prev");

  // Actualizăm starea curentă
  currentSlide = nextSlide;
  updateProgress();

  // Scroll la începutul slide-ului (în caz că are conținut lung)
  slides[currentSlide].scrollTop = 0;
}

// Inițializare la încărcarea paginii
document.addEventListener("DOMContentLoaded", () => {
  updateProgress();

  // Event listeners pentru tastatură (Săgeți Stânga/Dreapta)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") moveSlide(1);
    if (e.key === "ArrowLeft") moveSlide(-1);
  });
});
