window.onscroll = function () {
    const header = document.getElementById('header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

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

countdown(); // Inicial
setInterval(countdown, 1000); // Actualiza cada segundo

document.getElementById("guestForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(this);
    var formObject = {};
    formData.forEach(function (value, key) {
        formObject[key] = value;
    });

    console.log(formObject); // Verifica que los datos del formulario estén correctos

    fetch("https://script.google.com/macros/s/AKfycbwuKayawWYKGs4AIv6PrWMzR6P9z_Gbw-5WigTZDt-gMvl9VlnQO_l3V0v5_ZDwTM9R2w/exec", {
        method: "POST",
        body: new URLSearchParams(formObject),
        mode: 'no-cors',
    })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Verifica la respuesta del Web App
            document.getElementById("successMessage").style.display = "block"; // Muestra el mensaje de éxito
            document.getElementById("guestForm").reset(); // Reinicia los campos del formulario

            // Oculta el mensaje de éxito después de 3 segundos
            setTimeout(function () {
                document.getElementById("successMessage").style.display = "none";
            }, 3000);
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

// Habilitar o deshabilitar los campos dependiendo de la asistencia
document.querySelectorAll('input[name="asistencia"]').forEach(function (radio) {
    radio.addEventListener("change", function () {
        var isAttending = document.getElementById("asistirSi").checked;
        var inputs = document.querySelectorAll('input[type="text"], input[type="email"], select');

        inputs.forEach(function (input) {
            input.disabled = !isAttending; // Habilitar solo si asisten
        });
    });
});