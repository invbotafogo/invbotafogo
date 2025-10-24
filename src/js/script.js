import "../css/styles.css";

let lastExpandedId = null;

document.addEventListener("DOMContentLoaded", async () => {
    await loadComponent("#header", "header.html");
    await setupMobileMenu();

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

    await carregarVideos();
    await mostrarProximoCulto();
});

// ==== Funções utilitárias ====

async function carregarEstudosBiblicos(tema) {
    const container = document.getElementById(`${tema}-container`);
    if (!container) return;
  
    // Fecha outros temas abertos
    document.querySelectorAll('.aulas-container').forEach(div => {
      if (div !== container) div.classList.add('hidden');
    });
  
    // Alterna visibilidade do tema clicado
    container.classList.toggle("hidden");
  
    // Se estiver fechando, não precisa carregar de novo
    if (container.classList.contains("hidden")) return;
  
    // Se já tiver conteúdo carregado, não recarrega
    if (container.children.length > 0) return;

    const basePath = "https://raw.githubusercontent.com/invbotafogo/invbotafogo/main/src/assets/pdfs";
  
    if (tema === "apocalipse") {
        const aulas = [
            { titulo: "Aula 1", videoID: "W-9M-PvIs3I", pdf: `${basePath}/APOCALIPSE_Aula1.pdf` },
            { titulo: "Aula 2", videoID: "UjytdzVytzI", pdf: `${basePath}/APOCALIPSE_Aula2.pdf` },
            { titulo: "Aula 3", videoID: "NZ1r3sO4dfU", pdf: `${basePath}/APOCALIPSE_Aula3.pdf` },
            { titulo: "Aula 4", videoID: "V_scgNPGmUM", pdf: `${basePath}/APOCALIPSE_Aula4.pdf` },
            { titulo: "Aula 5", videoID: "Q1J2GK_81L0", pdf: `${basePath}/APOCALIPSE_Aula5.pdf` },
            { titulo: "Aula 6", videoID: "foY5i2GJQHI", pdf: `${basePath}/APOCALIPSE_Aula6.pdf` },
            { titulo: "Aula 7", videoID: "Ns_fhLRZfBc", pdf: `${basePath}/APOCALIPSE_Aula7.pdf` },
            { titulo: "Aula 8", videoID: "S2v4D7edAZY", pdf: `${basePath}/APOCALIPSE_Aula8.pdf` },
            { titulo: "Aula 9", videoID: "4BEZ3cBxAxs", pdf: `${basePath}/APOCALIPSE_Aula9.pdf` },
            { titulo: "Aula 10", videoID: "yyNB9latoJA", pdf: `${basePath}/APOCALIPSE_Aula10.pdf` },
            { titulo: "Aula 11", videoID: "B8nssUilmUw", pdf: `${basePath}/APOCALIPSE_Aula11.pdf` },
            { titulo: "Aula 12", videoID: "1vcK5Iq01Xg", pdf: `${basePath}/APOCALIPSE_Aula12.pdf` },
            { titulo: "Aula 13", videoID: "6ytzOZ6hxPo", pdf: `${basePath}/APOCALIPSE_Aula13.pdf` },
            { titulo: "Aula 14", videoID: "8xSw2fvRmos", pdf: `${basePath}/APOCALIPSE_Aula14.pdf` },
            { titulo: "Aula 15", videoID: "e2Hx7JHyCws", pdf: `${basePath}/APOCALIPSE_Aula15.pdf` },
            { titulo: "Aula 16", videoID: "9nF4GHUhqc8", pdf: `${basePath}/APOCALIPSE_Aula16.pdf` },
            { titulo: "Aula 17", videoID: "KKLdA2VGj6k", pdf: `${basePath}/APOCALIPSE_Aula17.pdf` },
            { titulo: "Aula 18", videoID: "Ix74fta9zYE", pdf: `${basePath}/APOCALIPSE_Aula18.pdf` },
            { titulo: "Aula 19", videoID: "nTVSwWWeDws", pdf: `${basePath}/APOCALIPSE_Aula19.pdf` },
            { titulo: "Aula 20", videoID: "", pdf: `${basePath}/APOCALIPSE_Aula20.pdf` },
            { titulo: "Aula 21", videoID: "Ezp3lBmE7gM", pdf: `${basePath}/APOCALIPSE_Aula21.pdf` },
        ];
  
        aulas.forEach(aula => {
            const card = document.createElement("div");
            card.classList.add("aula-card");

            const midia = aula.videoID
            ? `<iframe src="https://www.youtube.com/embed/${aula.videoID}" title="${aula.titulo}" allowfullscreen loading="lazy"></iframe>`
            : `<div class="sem-video" role="img" aria-label="Sem vídeo disponível">Sem vídeo</div>`;
    
            card.innerHTML = `
            ${midia}
            <h3>${aula.titulo}</h3>
            <a href="${aula.pdf}" download class="btn">Baixar PDF</a>
            `;
    
            container.appendChild(card);
        });
    }
  
    // --- Espírito Santo ---
    if (tema === "espirito_santo") {
        const aulas = [
            { titulo: "Aula 1 - Quem é o Espírito Santo?", pdf: `${basePath}/ESPIRITO_Aula1.pdf` },
            { titulo: "Aula 2 - Os símbolos do Espírito Santo", pdf: `${basePath}/ESPIRITO_Aula2.pdf` },
            // { titulo: "Aula 3 - O Espírito Santo e as Escrituras", pdf: "" },
            // { titulo: "Aula 4 - Da criação até o nascimento de Jesus", pdf: "" },
            // { titulo: "Aula 5 - Do nascimento de Jesus até Pentecostes", pdf: "" },
            // { titulo: "Aula 6 - Depois de Pentecostes", pdf: "" },
            // { titulo: "Aula 7 - O Espírito Santo na vida do crente", pdf: "" },
            // { titulo: "Aula 8 - O batismo com o Espírito Santo", pdf: "" },
            // { titulo: "Aula 9 - A luta interior do crente", pdf: "" },
            // { titulo: "Aula 10 - Pecados contra o Espírito Santo", pdf: "" },
            // { titulo: "Aula 11 - O fruto do Espírito", pdf: "" },
            // { titulo: "Aula 12 - Princípios e objetivos dos dons", pdf: "" },
            // { titulo: "Aula 13 - Os dons de ministério", pdf: "" },
            // { titulo: "Aula 14 - Os dons de serviço", pdf: "" },
            // { titulo: "Aula 15 - Os dons de sinais", pdf: "" },
            // { titulo: "Aula 16 - Como reconhecer o seu dom", pdf: "" },
            // { titulo: "Aula 17 - Como ficar cheio do Espírito Santo", pdf: "" },
                
            // Adicione mais aulas conforme necessário
        ];

        aulas.forEach(aula => {
        const card = document.createElement("div");
        card.classList.add("aula-card");

        card.innerHTML = `
            <h3>${aula.titulo}</h3>
            <a href="${aula.pdf}" download class="btn">Baixar PDF</a>
        `;

        container.appendChild(card);
        });
    }
}

window.carregarEstudosBiblicos = carregarEstudosBiblicos;

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


// Função para inicializar o calendário
function initializeCalendar() {
    const calendarContainer = document.getElementById('calendar-container');
    let lastMode = null;
    let lastUpdate = 0;

    function updateCalendar(force = false) {
        const now = Date.now();
        const hoursSinceLastUpdate = (now - lastUpdate) / (1000 * 60 * 60);

        // Atualiza a cada 6 horas ou se for forçado
        if (!force && hoursSinceLastUpdate < 6) return;

        lastUpdate = now;
        const width = window.innerWidth;
        let newMode = width < 450 ? "AGENDA" : "MONTH";

        // Evita recriar se o modo for o mesmo
        if (newMode === lastMode && !force) return;
        lastMode = newMode;

        const src = `https://calendar.google.com/calendar/embed?src=mdc.invb%40gmail.com&ctz=America%2FSao_Paulo&mode=${newMode}&showTitle=1&showPrint=0&showCalendars=0&showTz=0`;

        // Verifica se já existe um iframe dentro do container
        let iframe = calendarContainer.querySelector('iframe');
        if (iframe) {
            // Só atualiza o src e propriedades
            iframe.src = src;
            iframe.height = newMode === 'AGENDA' ? '600' : '550';
            iframe.scrolling = newMode === 'AGENDA' ? 'yes' : 'no';
        } else {
            // Cria o iframe apenas uma vez
            iframe = document.createElement('iframe');
            iframe.src = src;
            iframe.width = '100%';
            iframe.height = newMode === 'AGENDA' ? '600' : '550';
            iframe.style.border = 'none';
            iframe.style.borderRadius = '12px';
            iframe.frameBorder = '0';
            iframe.scrolling = newMode === 'AGENDA' ? 'yes' : 'no';
            calendarContainer.appendChild(iframe);
        }
    }

    window.addEventListener('DOMContentLoaded', () => updateCalendar(true));

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => updateCalendar(true), 1000);
    });

    // Atualiza automaticamente a cada 6 horas
    setInterval(() => updateCalendar(true), 6 * 60 * 60 * 1000);
}
initializeCalendar();



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
async function setupMobileMenu() {
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
