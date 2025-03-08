import "../css/styles.css";
import "../css/oracao.css";

// Carrega o cabeçalho e rodapé em todas as páginas
document.addEventListener("DOMContentLoaded", function () {
    fetch("/components/header.html")
        .then(response => response.text())
        .then(data => document.body.insertAdjacentHTML("afterbegin", data));

    fetch("/components/footer.html")
        .then(response => response.text())
        .then(data => document.body.insertAdjacentHTML("beforeend", data));
});

// Efeito de fade-out para a seção "Bem-vindo"
window.addEventListener('scroll', function () {
    const heroSection = document.querySelector('.section-hero');
    const cultosSection = document.querySelector('.section-cultos');

    if (heroSection && cultosSection) {
        if (window.scrollY > 100) { // Quando o scroll for maior que 100px
            heroSection.classList.add('fade-out');
            cultosSection.style.opacity = 1; // Torna a seção de cultos visível
            cultosSection.style.transition = 'opacity 1s ease-in-out'; // Aparece suavemente
        } else {
            heroSection.classList.remove('fade-out');
            cultosSection.style.opacity = 0; // Deixa a seção de cultos invisível novamente
        }
    }
});

// Carrega o conteúdo de cada página na div de id content ao clicar no menu
document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById("content");

    function loadPage(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const newContent = doc.getElementById("content");

                if (newContent) {
                    content.style.opacity = 0; // Fade-out

                    setTimeout(() => {
                        content.innerHTML = newContent.innerHTML;
                        content.style.opacity = 1; // Fade-in
                        history.pushState({}, "", url); // Atualiza a URL sem recarregar a página
                    }, 300);
                }
            })
            .catch(error => console.error("Erro ao carregar a página:", error));
    }

    document.body.addEventListener("click", function (e) {
        if (e.target.matches(".ajax-link")) {
            e.preventDefault();
            loadPage(e.target.href);
        } else if (e.target.parentElement && e.target.parentElement.matches(".ajax-link")) {
            e.preventDefault();
            loadPage(e.target.parentElement.href);
        }
    });

    window.addEventListener("popstate", function () {
        loadPage(location.pathname);
    });

    function loadPageScript(url) {
        let scriptName = "";

        if (scriptName) {

            import(`./${scriptName}`)
                .then(module => {
                    if (module.init) module.init(); // Se o script tiver um método init(), chamamos ele
                })
                .catch(err => console.error(`Erro ao carregar ${scriptName}:`, err));
        }
    }

    // Carregar script da primeira página carregada
    loadPageScript(location.pathname);
});