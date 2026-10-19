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

// 3. Redirección automática a Gmail con los datos del formulario
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('form-nombre').value;
        const emailUsuario = document.getElementById('form-email').value;
        const telefono = document.getElementById('form-telefono').value;
        const mensaje = document.getElementById('form-mensaje').value;

        const tuCorreo = 'jc.espinozav.2010@gmail.com';
        
        const asunto = encodeURIComponent(`Nuevo mensaje de contacto de: ${nombre}`);
        
        // Formato exacto solicitado
        const cuerpo = encodeURIComponent(`Hola, te escribo desde la web de tu portafolio.\n\nNombre: ${nombre}\nCorreo: ${emailUsuario}\nTeléfono: ${telefono}\n\nMensaje:\n${mensaje}`);

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${tuCorreo}&su=${asunto}&body=${cuerpo}`;

        window.open(gmailUrl, '_blank');
        contactForm.reset();
    });
}