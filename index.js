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
// document.getElementById("guestForm").addEventListener("submit", function (event) {
//     event.preventDefault();

//     var asistenciaValue = document.querySelector('select[name="asistencia"]').value;


//     if (asistenciaValue === "¿Vas a asistir a la boda?") {
//         event.preventDefault();
//         alert("Por favor, selecciona si asistirás o no a la boda.");
//         return;
//     }

//     var formData = new FormData(this);
//     var formObject = {};
//     formData.forEach(function (value, key) {
//         formObject[key] = value;
//     });


//     var asistenciaField = document.querySelector('select[name="asistencia"]');
//     if (asistenciaField) {
//         formObject["asistencia"] = asistenciaField.value;
//     }

//     console.log(formObject);

//     fetch("https://script.google.com/macros/s/AKfycbxbbcY5Ds_OFPx64oj4BjVXICHBh1M7EaYJN1f_v50qECAEdXE-cSI3h_xYl512ZmocXQ/exec", {
//         method: "POST",
//         body: new URLSearchParams(formObject),
//         mode: 'no-cors',
//     })
//         .then(response => response.text())
//         .then(data => {
//             console.log(data);


//             if (asistenciaValue === "Sí") {
//                 document.getElementById("successMessage").style.display = "block";
//                 document.getElementById("noAttendanceMessage").style.display = "none";
//             } else {
//                 document.getElementById("noAttendanceMessage").style.display = "block";
//                 document.getElementById("successMessage").style.display = "none";
//             }

//             document.getElementById("guestForm").reset();


//             setTimeout(function () {
//                 document.getElementById("successMessage").style.display = "none";
//                 document.getElementById("noAttendanceMessage").style.display = "none";
//             }, 3000);
//         })
//         .catch(error => {
//             console.error("Error:", error);
//         });
// });

// Validacion de asistencia
// document.getElementById("asistencia").addEventListener("change", function () {
//     var asistenciaValue = this.value;
//     var formElements = document.querySelectorAll("#guestForm input, #guestForm select");


//     if (asistenciaValue === "Sí") {
//         formElements.forEach(function (element) {
//             element.disabled = false;
//         });
//     } else if (asistenciaValue === "No") {

//         formElements.forEach(function (element) {
//             if (element.name !== "nombre" && element.name !== "asistencia") {
//                 element.disabled = true;
//             }
//         });
//     }
// });

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
    bg.style.opacity = 0;
    setTimeout(() => {
        bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${images[currentIndex]}')`;
        bg.style.opacity = 1;
        updateDots();
    }, 400);
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


// Crear los puntos
const dotsContainer = document.getElementById('carouselDots');


images.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateBackground();
        updateDots();
    });
    dotsContainer.appendChild(dot);
});

function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// modal invitavion
window.onload = function () {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex'; // Mostrar el modal
};

document.getElementById('modal').addEventListener('click', function (event) {
    const modalContent = document.querySelector('.modal-content');
    if (!modalContent.contains(event.target)) {
        document.getElementById('modal').style.display = 'none'; // Ocultar el modal
        document.getElementById('openModalBtn').style.display = 'block'; // Mostrar el botón
    }
});

document.getElementById('openModalBtn').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'flex'; // Mostrar el modal
    document.getElementById('openModalBtn').style.display = 'none'; // Ocultar el botón
});



//invitaciones
const getParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

const handleAsistenciaChange = (index) => {
    const asistenciaSelect = document.querySelector(`select[name="asistencia${index}"]`);
    const nombreInput = document.querySelector(`input[name="nombre${index}"]`);
    const telefonoInput = document.querySelector(`input[name="telefono${index}"]`);
    const licorSelect = document.querySelector(`select[name="licor${index}"]`);
    const vegetarianoSelect = document.querySelector(`select[name="vegetariano${index}"]`);

    if (asistenciaSelect.value === "No") {
        // Bloquear campos si no asiste
        nombreInput.disabled = false;
        telefonoInput.disabled = true;
        licorSelect.disabled = true;
        vegetarianoSelect.disabled = true;
    } else {
        // Habilitar campos si asiste
        nombreInput.disabled = false;
        telefonoInput.disabled = false;
        licorSelect.disabled = false;
        vegetarianoSelect.disabled = false;
    }
};

const loadNombreInvitado = async () => {
    const id = getParam("id");
    if (!id) return;

    try {
        const response = await fetch("https://opensheet.elk.sh/1VhCjyGa-xwFu3DwjkXyPOnhVUNZlg0n9v3v_aw_g7dM/invitados");
        const data = await response.json();
        console.log(data);

        const invitado = data.find(row => row.id === id);
        const cantidad = parseInt(invitado["cantidad"]);
        const dynamicContainer = document.getElementById("dynamicGuests");
        dynamicContainer.innerHTML = "";

        if (invitado) {
            document.getElementById("nombreInvitado").textContent = `${invitado["nombre para la tarjeta"]}`;
            if (cantidad && dynamicContainer) {
                for (let i = 1; i <= cantidad; i++) {
                    const guestCard = document.createElement("div");
                    guestCard.className = "form-row";
                    guestCard.innerHTML = `
                    <select class="full-width" name="asistencia${i}" required>
                      <option disabled selected>¿Confirmará asistencia?</option>
                      <option>Sí</option>
                      <option>No</option>
                    </select>
                    <input type="text" name="nombre${i}" placeholder="Nombre invitado ${i}" required />
                    <input type="number" name="telefono${i}" placeholder="Teléfono invitado ${i}" />
                    <select name="licor${i}" required>
                      <option disabled selected>¿Prefiere Ron o Guaro?</option>
                      <option>Ron</option>
                      <option>Guaro</option>
                      <option>Ninguno</option>
                    </select>
                    <select name="vegetariano${i}" required>
                      <option disabled selected>¿Desea opción vegetariana?</option>
                      <option>Sí</option>
                      <option>No</option>
                    </select>
                  `;
                    dynamicContainer.appendChild(guestCard);

                    // Agregar el event listener para cada select de asistencia
                    const asistenciaSelect = guestCard.querySelector(`select[name="asistencia${i}"]`);
                    asistenciaSelect.addEventListener("change", () => handleAsistenciaChange(i));
                }
            }
        } else {
            document.getElementById("nombreInvitado").textContent = "Querid@ invitado";
        }
    } catch (error) {
        console.error("Error cargando nombres:", error);
    }
};

window.addEventListener("DOMContentLoaded", loadNombreInvitado);

// Envio formulario
const sendFormData = async (formData) => {
    const encodedData = new URLSearchParams(formData);

    try {
        fetch("https://script.google.com/macros/s/AKfycbyP2ue24nxJplwUrBl2at50RNXT9rkKXsiCZTak54CR5CBqDgEjq4jW-_oWY_6g0kJ97w/exec", {
            method: "POST",
            body: encodedData,
            mode: "no-cors"
        });

        const entries = Object.entries(formData);
        const asistenciaValues = entries.filter(([key, val]) => key.startsWith("asistencia") && val === "Sí");
        const totalGuests = entries.filter(([key]) => key.startsWith("asistencia"));

        if (asistenciaValues.length === totalGuests.length) {
            document.getElementById("successMessage").style.display = "block";
        } else if (asistenciaValues.length === 0) {
            document.getElementById("noAttendanceMessage").style.display = "block";
        } else {
            document.getElementById("mixedAttendanceMessage").style.display = "block";
        }

        setTimeout(() => {
            document.getElementById("successMessage").style.display = "none";
            document.getElementById("noAttendanceMessage").style.display = "none";
            document.getElementById("mixedAttendanceMessage").style.display = "none";
        }, 3000);

    } catch (error) {
        console.error("Error al enviar los datos:", error);
    }
};


// Formulario de envío
document.getElementById("guestForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    const selectsAsistencia = form.querySelectorAll("select[name^='asistencia']");
    let allResponded = true;

    selectsAsistencia.forEach((select) => {
        if (!select.value || select.value === "¿Confirmará asistencia?") {
            select.classList.add("error-border");
            allResponded = false;
        } else {
            select.classList.remove("error-border");
        }
    });

    const errorBox = document.getElementById("errorMessage");

    if (!allResponded) {
        errorBox.style.display = "block";
        return;
    } else {
        errorBox.style.display = "none";
    }

    // Armar y enviar datos
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    sendFormData(data);
    form.reset();
});


function mostrarNombre(nombre) {
    const nombreEl = document.getElementById("nombreInvitado");
    nombreEl.textContent = nombre;


    nombreEl.style.animation = 'none';
    void nombreEl.offsetWidth;
    nombreEl.style.animation = 'aparecerDesdeArriba 1s ease-out forwards';

    document.getElementById("modal").style.display = "flex";
}

