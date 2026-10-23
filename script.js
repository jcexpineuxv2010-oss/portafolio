// 1. Menú Hamburguesa para Móviles
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');

if (mobileMenu && navbar) {
    mobileMenu.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });
}

// 2. Modo Oscuro / Claro
const themeToggleBtn = document.getElementById('theme-toggle');

if (themeToggleBtn) {
    const themeIcon = themeToggleBtn.querySelector('i');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark' && themeIcon) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');

        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });
}

// 3. Enviar el formulario al backend
const contactForm = document.getElementById('contact-form');
const BACKEND_URL = 'https://portafolio-backend-zde7.onrender.com';

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const boton = contactForm.querySelector('button[type="submit"]');
        const textoOriginal = boton.textContent;
        boton.disabled = true;
        boton.textContent = 'Enviando... (puede tardar hasta 1 minuto)';

        const datos = {
            nombre: document.getElementById('form-nombre').value,
            email: document.getElementById('form-email').value,
            telefono: document.getElementById('form-telefono').value,
            mensaje: document.getElementById('form-mensaje').value
        };

        try {
            const respuesta = await fetch(`${BACKEND_URL}/contacto`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            if (!respuesta.ok) throw new Error('Error del servidor');

            alert('¡Mensaje enviado! Gracias por escribirme.');
            contactForm.reset();
        } catch (error) {
            alert('No se pudo enviar el mensaje. Inténtalo de nuevo en un momento.');
            console.error(error);
        } finally {
            boton.disabled = false;
            boton.textContent = textoOriginal;
        }
    });
}
