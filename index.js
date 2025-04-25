// Scroll del header
window.onscroll = function () {
    const header = document.getElementById('header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

// Menu hamburguesa
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const icon = hamburger.querySelector('i');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times'); // ícono de cerrar (X)
});

// Cerrar menú al hacer clic en un enlace
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Tiempo de espera
const weddingDate = new Date("2025-08-16T15:00:00").getTime();

const countdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.querySelector(".day-timer").innerHTML = "¡Ya llegó el gran día! 💍";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
};

countdown();
setInterval(countdown, 1000);

// Envio de formulario
document.getElementById("guestForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var asistenciaValue = document.querySelector('select[name="asistencia"]').value;


    if (asistenciaValue === "¿Vas a asistir a la boda?") {
        event.preventDefault();
        alert("Por favor, selecciona si asistirás o no a la boda.");
        return;
    }

    var formData = new FormData(this);
    var formObject = {};
    formData.forEach(function (value, key) {
        formObject[key] = value;
    });


    var asistenciaField = document.querySelector('select[name="asistencia"]');
    if (asistenciaField) {
        formObject["asistencia"] = asistenciaField.value;
    }

    console.log(formObject);

    fetch("https://script.google.com/macros/s/AKfycbxbbcY5Ds_OFPx64oj4BjVXICHBh1M7EaYJN1f_v50qECAEdXE-cSI3h_xYl512ZmocXQ/exec", {
        method: "POST",
        body: new URLSearchParams(formObject),
        mode: 'no-cors',
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);


            if (asistenciaValue === "Sí") {
                document.getElementById("successMessage").style.display = "block";
                document.getElementById("noAttendanceMessage").style.display = "none";
            } else {
                document.getElementById("noAttendanceMessage").style.display = "block";
                document.getElementById("successMessage").style.display = "none";
            }

            document.getElementById("guestForm").reset();


            setTimeout(function () {
                document.getElementById("successMessage").style.display = "none";
                document.getElementById("noAttendanceMessage").style.display = "none";
            }, 3000);
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

// Validacion de asistencia
document.getElementById("asistencia").addEventListener("change", function () {
    var asistenciaValue = this.value;
    var formElements = document.querySelectorAll("#guestForm input, #guestForm select");


    if (asistenciaValue === "Sí") {
        formElements.forEach(function (element) {
            element.disabled = false;
        });
    } else if (asistenciaValue === "No") {

        formElements.forEach(function (element) {
            if (element.name !== "nombre" && element.name !== "asistencia") {
                element.disabled = true;
            }
        });
    }
});

// Carrusel
const images = [
    './img/carrusel-1.jpeg',
    './img/carrusel-2.jpeg',
    './img/carrusel-3.jpeg'
];

let currentIndex = 0;
const section = document.getElementById('hero-carousel');

const bg = document.getElementById('carouselBg');

function updateBackground() {
    bg.style.opacity = 0; // Comienza el desvanecimiento

    setTimeout(() => {
        bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${images[currentIndex]}')`;
        bg.style.opacity = 1; // Desvanece hacia la nueva imagen
    }, 400); // Tiempo intermedio antes de mostrar la nueva imagen
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateBackground();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateBackground();
}

document.getElementById('nextBtn').addEventListener('click', nextImage);
document.getElementById('prevBtn').addEventListener('click', prevImage);


setInterval(nextImage, 5000);


updateBackground();
