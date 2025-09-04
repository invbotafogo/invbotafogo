import "../css/styles.css";

let lastExpandedId = null;

document.addEventListener("DOMContentLoaded", async () => {
    await loadComponent("#header", "header.html");
    setupMobileMenu();

    await loadComponent("#footer", "footer.html");

    // Fade
    window.addEventListener('scroll', function () {
        const homeSection = document.querySelector('.section-home');
        const eventosCultosSection = document.querySelector('.section-cultos-unificada');
        const historiaSection = document.querySelector('.section-historia');

        if (homeSection && eventosCultosSection && historiaSection) {
            if (window.scrollY > 100) {
                homeSection.classList.add('fade-out');
                eventosCultosSection.style.opacity = 1;
                historiaSection.style.opacity = 1;
            } else {
                homeSection.classList.remove('fade-out');
                eventosCultosSection.style.opacity = 0;
                historiaSection.style.opacity = 0;
            }
        }
    });

    // Pix
    const botao = document.getElementById("copiar-btn");
    if (botao) botao.addEventListener("click", copiarPix);

    // Cards
    const cards = document.querySelectorAll('.card');
    const expandedContent = document.getElementById('expanded-content');
    if (cards && expandedContent) {
        cards.forEach((card) => {
            card.addEventListener("click", () => {
                const id = card.id;
                expandedContent.innerHTML = "";
                const item = document.querySelector(`#expanded-items .expanded-item[data-id="${id}"]`);
                if (item) expandedContent.appendChild(item.cloneNode(true));
                expandedContent.classList.remove("hidden");
                expandedContent.scrollIntoView({ behavior: "smooth" });
                lastExpandedId = id;
            });
        });
        expandedContent.addEventListener('click', () => {
            expandedContent.classList.add('hidden');
            expandedContent.innerHTML = '';
            lastExpandedId = null;
        });
    }

    // Query string ministério
    const urlParams = new URLSearchParams(window.location.search);
    const ministerioId = urlParams.get('ministerio');
    if (ministerioId) {
        const expandedContent = document.getElementById('expanded-content');
        const item = document.querySelector(`#expanded-items .expanded-item[data-id="${ministerioId}"]`);
        if (expandedContent && item) {
            expandedContent.innerHTML = "";
            expandedContent.appendChild(item.cloneNode(true));
            expandedContent.classList.remove("hidden");
            expandedContent.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Carrossel
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let index = 0;
    function updateCarousel() {
        if (items && items[0]) {
            const width = items[0].offsetWidth;
            track.style.transform = `translateX(-${index * width}px)`;
        }
    }
    if (nextBtn) nextBtn.addEventListener('click', () => { index = (index + 1) % items.length; updateCarousel(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { index = (index - 1 + items.length) % items.length; updateCarousel(); });
    window.addEventListener('resize', updateCarousel);

    carregarVideos();
    mostrarProximoCulto();
});

// ==== Funções utilitárias ====

async function loadComponent(selector, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Erro ao carregar ${file}`);
        const content = await response.text();
        document.querySelector(selector).innerHTML = content;
    } catch (error) { console.error(error); }
}

function copiarPix() {
    const chave = document.getElementById("chave-pix").innerText;
    navigator.clipboard.writeText(chave).then(() => {
        document.getElementById("confirmacao-pix").textContent = "Chave PIX copiada!";
        setTimeout(() => { document.getElementById("confirmacao-pix").textContent = ""; }, 3000);
    });
}

async function carregarVideos() {
    try {
        const response = await fetch(`https://raw.githubusercontent.com/invbotafogo/invbotafogo/refs/heads/data/videos.json`);
        const data = await response.json();
        const container = document.getElementById("videos");
        if (!container) return;
        data.items.forEach(item => {
            if (item.id.kind === 'youtube#video') {
                const videoId = item.id.videoId;
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${videoId}`;
                iframe.width = "360";
                iframe.height = "215";
                iframe.frameBorder = "0";
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;
                iframe.style.margin = "10px";
                container.appendChild(iframe);
            }
        });
    } catch (error) { console.error("Erro ao carregar vídeos:", error); }
}

function mostrarProximoCulto() {
    const container = document.getElementById("proximo-culto");
    if (!container) return;
    const agora = new Date();
    const cultos = [
        { dia: 3, hora: 19, minutos: 30 },
        { dia: 0, hora: 10, minutos: 0 },
        { dia: 0, hora: 19, minutos: 0 }
    ];
    const proximoCulto = cultos
        .map(culto => {
            const dataCulto = new Date(agora);
            const diffDias = (culto.dia - dataCulto.getDay() + 7) % 7;
            dataCulto.setDate(dataCulto.getDate() + diffDias);
            dataCulto.setHours(culto.hora, culto.minutos, 0, 0);
            return dataCulto;
        })
        .filter(data => data > agora || (agora - data <= 2 * 60 * 60 * 1000))
        .sort((a, b) => a - b)[0];
    if (!proximoCulto) return;
    const horaFormatada = proximoCulto.toLocaleString('pt-BR', { weekday: 'long', hour: '2-digit', minute: '2-digit' });
    const link = "https://www.youtube.com/@igrejadenovavidabotafogo3785/live";
    const estaAoVivo = proximoCulto <= agora;
    container.innerHTML = estaAoVivo
        ? `🎥 Culto ao vivo agora! <a href="${link}" target="_blank">Clique para assistir</a>`
        : `🗓️ Próximo culto: ${horaFormatada}. <a href="${link}" target="_blank">Clique para assistir</a>`;
}

// ==== Novo: toggle menu (sem aria) ====
function setupMobileMenu() {
    const btn = document.querySelector('.navbar__toggle');
    const menu = document.querySelector('#menu');
    if (!btn || !menu) return;
    const OPEN_CLASS = 'is-open';
    function openMenu() {
        btn.classList.toggle('active');
        menu.classList.add(OPEN_CLASS);
        document.addEventListener('click', handleOutsideClick);
        document.addEventListener('keydown', handleEsc, { once: true });
    }
    function closeMenu() {
        btn.classList.toggle('active');
        menu.classList.remove(OPEN_CLASS);
        document.removeEventListener('click', handleOutsideClick);
    }
    function toggleMenu() {
        menu.classList.contains(OPEN_CLASS) ? closeMenu() : openMenu();
    }
    function handleOutsideClick(e) {
        if (!menu.contains(e.target) && e.target !== btn) closeMenu();
    }
    function handleEsc(e) { if (e.key === 'Escape') closeMenu(); }
    window.addEventListener('resize', () => closeMenu());
    menu.addEventListener('click', (e) => { if (e.target.tagName === 'A') closeMenu(); });
    btn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
}
