/*!
=========================================================
* LeadMark Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});



// protfolio filters
$(window).on("load", function() {
    var t = $(".portfolio-container");
    t.isotope({
        filter: ".new",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    }), $(".filters a").click(function() {
        $(".filters .active").removeClass("active"), $(this).addClass("active");
        var i = $(this).attr("data-filter");
        return t.isotope({
            filter: i,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), !1
    })
})

//// scripts.js
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let autoScrollInterval;
let pauseTimeout;

// Configuración
const SCROLL_INTERVAL = 30000; // 30 segundos
const DRAG_THRESHOLD = 100; // Mínimo desplazamiento para cambiar de imagen

// Desplazamiento automático
function startAutoScroll() {
  stopAutoScroll(); // Asegurarse de que no haya intervalos duplicados
  autoScrollInterval = setInterval(() => {
    goToNextSlide();
  }, SCROLL_INTERVAL);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

function pauseAutoScrollFor(duration) {
  stopAutoScroll();
  clearTimeout(pauseTimeout); // Evitar conflictos si ya hay un timeout en ejecución
  pauseTimeout = setTimeout(startAutoScroll, duration);
}

function goToNextSlide() {
  currentIndex = (currentIndex + 1) % items.length; // Ciclar hacia el siguiente índice
  updateCarousel();
}

function goToPreviousSlide() {
  currentIndex = (currentIndex - 1 + items.length) % items.length; // Ciclar hacia el índice previo
  updateCarousel();
}

// Manejo del carrusel
function updateCarousel() {
  currentTranslate = currentIndex * -(items[0].offsetWidth + 20);
  prevTranslate = currentTranslate;
  carousel.style.transform = `translateX(${currentTranslate}px)`;
  updateIndicators();
}

function updateIndicators() {
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
  });
}

// Eventos de interacción
function handleStartDrag(event) {
  isDragging = true;
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animateDrag);
  carousel.style.cursor = 'grabbing';
  stopAutoScroll();
}

function handleDrag(event) {
  if (!isDragging) return;
  const currentPosition = getPositionX(event);
  currentTranslate = prevTranslate + currentPosition - startPos;
}

function handleEndDrag() {
  if (!isDragging) return;
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -DRAG_THRESHOLD && currentIndex < items.length - 1) {
    goToNextSlide();
  } else if (movedBy > DRAG_THRESHOLD && currentIndex > 0) {
    goToPreviousSlide();
  } else {
    updateCarousel();
  }

  carousel.style.cursor = 'grab';
  pauseAutoScrollFor(SCROLL_INTERVAL); // Pausar auto-scroll temporalmente
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animateDrag() {
  carousel.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animateDrag);
}

// Eventos en indicadores
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
    pauseAutoScrollFor(SCROLL_INTERVAL);
  });
});

// Manejo de redimensionamiento
window.addEventListener('resize', updateCarousel);

// Manejo de eventos
carousel.addEventListener('mousedown', handleStartDrag);
carousel.addEventListener('touchstart', handleStartDrag);

carousel.addEventListener('mousemove', handleDrag);
carousel.addEventListener('touchmove', handleDrag);

carousel.addEventListener('mouseup', handleEndDrag);
carousel.addEventListener('touchend', handleEndDrag);
carousel.addEventListener('mouseleave', handleEndDrag);

// Iniciar desplazamiento automático
startAutoScroll();

/*flecha*/ 
// Seleccionar el botón
const backToTopButton = document.querySelector('.back-to-top');

// Detectar clic y aplicar scroll suave
backToTopButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
  window.scrollTo({
    top: 0, // Desplazar hasta el inicio
    behavior: 'smooth' // Efecto de scroll suave
  });
});

// Mostrar/ocultar el botón según el desplazamiento
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) { // Mostrar el botón si el desplazamiento es mayor a 200px
    backToTopButton.style.display = 'flex';
  } else {
    backToTopButton.style.display = 'none';
  }
});





