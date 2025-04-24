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

    var asistenciaValue = document.querySelector('select[name="asistencia"]').value;

    // Validar si se seleccionó una opción de asistencia
    if (asistenciaValue === "¿Vas a asistir a la boda?") {
        event.preventDefault(); // Evita que el formulario se envíe
        alert("Por favor, selecciona si asistirás o no a la boda.");
        return;
    }

    var formData = new FormData(this);
    var formObject = {};
    formData.forEach(function (value, key) {
        formObject[key] = value;
    });

    // Asegurarse de incluir el valor de "asistencia"
    var asistenciaField = document.querySelector('select[name="asistencia"]');
    if (asistenciaField) {
        formObject["asistencia"] = asistenciaField.value; // Asegura que "asistencia" esté siempre en el formObject
    }

    console.log(formObject); // Verifica que los datos del formulario estén correctos

    fetch("https://script.google.com/macros/s/AKfycbzgEwfGvk7YWB76U6GrQNrdB_E3Obo4HGMI6SvNcdmS1mpn0ULZ6E6cLeB0N_e7bCyr/exec", {
        method: "POST",
        body: new URLSearchParams(formObject),
        mode: 'no-cors',
    })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Verifica la respuesta del Web App

            // Mostrar mensaje dependiendo de la asistencia
            if (asistenciaValue === "Sí") {
                document.getElementById("successMessage").style.display = "block"; // Muestra el mensaje de éxito para asistencia
                document.getElementById("noAttendanceMessage").style.display = "none"; // Asegura que el mensaje de no asistencia no se muestre
            } else {
                document.getElementById("noAttendanceMessage").style.display = "block"; // Muestra el mensaje de no asistencia
                document.getElementById("successMessage").style.display = "none"; // Asegura que el mensaje de éxito no se muestre
            }

            document.getElementById("guestForm").reset(); // Reinicia los campos del formulario

            // Oculta los mensajes después de 3 segundos
            setTimeout(function () {
                document.getElementById("successMessage").style.display = "none";
                document.getElementById("noAttendanceMessage").style.display = "none";
            }, 3000);
        })
        .catch(error => {
            console.error("Error:", error);
        });
});
// Habilitar o deshabilitar los campos dependiendo de la asistencia
document.getElementById("asistencia").addEventListener("change", function () {
    var asistenciaValue = this.value;
    var formElements = document.querySelectorAll("#guestForm input, #guestForm select");

    // Habilita todos los campos si la respuesta es "Sí"
    if (asistenciaValue === "Sí") {
        formElements.forEach(function (element) {
            element.disabled = false; // habilitar todos los campos
        });
    } else if (asistenciaValue === "No") {
        // Deshabilita todos los campos excepto el de nombre y el select de asistencia
        formElements.forEach(function (element) {
            if (element.name !== "nombre" && element.name !== "asistencia") {
                element.disabled = true; // deshabilitar los campos que no sean "nombre" ni "asistencia"
            }
        });
    }
});
