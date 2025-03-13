import "../css/styles.css";
import "../css/oracao.css";

// Efeito de fade-out para a seção "Bem-vindo"
window.addEventListener('scroll', function () {
    const heroSection = document.querySelector('.section-hero');
    const cultosSection = document.querySelector('.section-cultos');

    if (window.scrollY > 100) { // Quando o scroll for maior que 100px
        heroSection.classList.add('fade-out');
        cultosSection.style.opacity = 1; // Torna a seção de cultos visível
        cultosSection.style.transition = 'opacity 1s ease-in-out'; // Aparece suavemente
    } else {
        heroSection.classList.remove('fade-out');
        cultosSection.style.opacity = 0; // Deixa a seção de cultos invisível novamente
    }
});

async function loadComponent(selector, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Erro ao carregar ${file}`);

        const content = await response.text();
        document.querySelector(selector).innerHTML = content;
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("#header", "header.html");
    loadComponent("#footer", "footer.html");
});