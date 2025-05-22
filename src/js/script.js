import "../css/styles.css";

let lastExpandedId = null;

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("#header", "header.html");
    loadComponent("#footer", "footer.html");

    // Efeito de fade-out na seção de boas-vindas
    window.addEventListener('scroll', function () {
        const homeSection = document.querySelector('.section-home');
        const cultosSection = document.querySelector('.section-cultos');

        if (homeSection && cultosSection) {
            if (window.scrollY > 100) {
                homeSection.classList.add('fade-out');
                cultosSection.style.transition = 'opacity 1s ease-in-out'; // Colocado antes da alteração de opacity
                cultosSection.style.opacity = 1;
            } else {
                homeSection.classList.remove('fade-out');
                cultosSection.style.opacity = 0;
            }
        }
    });

    // Botão copiar pix
    const botao = document.getElementById("copiar-btn");
    if (botao) {
        botao.addEventListener("click", copiarPix);
    }

    // Seleciona os cards antes de usar
    const cards = document.querySelectorAll('.card'); // <-- Ajuste aqui o seletor para seus cards
    const expandedContent = document.getElementById('expanded-content');
    let lastExpandedId = null;

    if (cards && expandedContent) {
        cards.forEach((card) => {
            card.addEventListener("click", () => {
                const id = card.id;
                const allExpandedItems = document.querySelectorAll("#expanded-items .expanded-item");

                expandedContent.innerHTML = "";

                if (!id) {
                    // Se for "Ver todos"
                    allExpandedItems.forEach((item) => {
                        expandedContent.appendChild(item.cloneNode(true));
                    });
                } else {
                    const item = document.querySelector(`#expanded-items .expanded-item[data-id="${id}"]`);
                    if (item) {
                        expandedContent.appendChild(item.cloneNode(true));
                    }
                }

                expandedContent.classList.remove("hidden");
                expandedContent.scrollIntoView({ behavior: "smooth" });

                lastExpandedId = id;
            });
        });

        // Clique direto no bloco expandido = fecha
        expandedContent.addEventListener('click', () => {
            expandedContent.classList.add('hidden');
            expandedContent.innerHTML = '';
            lastExpandedId = null;
        });
    }

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

    // Funções que você chamou (certifique-se que elas existem)
    carregarVideos();
    mostrarProximoCulto();
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

function copiarPix() {
    const chave = document.getElementById("chave-pix").innerText;
    navigator.clipboard.writeText(chave).then(function() {
        document.getElementById("confirmacao-pix").textContent = "Chave PIX copiada!";
        setTimeout(() => {
            document.getElementById("confirmacao-pix").textContent = "";
        }, 3000);
    });
}

// Carrega os últimos 3 vídeos do canal
async function carregarVideos() {
    const apiKey = 'AIzaSyBgXtC_kaKRq3E-WusWXXdqi0Bd1fNhnyI';
    const channelId = 'UCLuWhw8fYakYDzM9SlNXVKg';

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=3`);
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
    } catch (error) {
        console.error("Erro ao carregar vídeos:", error);
    }
}



/// Mostra o próximo culto (ou se está ao vivo)
function mostrarProximoCulto() {
    const container = document.getElementById("proximo-culto");
    if (!container) return;

    const agora = new Date();

    const cultos = [
        { dia: 3, hora: 19, minutos: 30 }, // quarta 19h30
        { dia: 0, hora: 10, minutos: 0 },  // domingo 10h00
        { dia: 0, hora: 19, minutos: 0 }   // domingo 19h00
    ];

    const proximoCulto = cultos
        .map(culto => {
            const dataCulto = new Date(agora);
            const diffDias = (culto.dia - dataCulto.getDay() + 7) % 7;
            dataCulto.setDate(dataCulto.getDate() + diffDias);
            dataCulto.setHours(culto.hora, culto.minutos, 0, 0);
            return dataCulto;
        })
        .filter(data => data > agora || (agora - data <= 2 * 60 * 60 * 1000)) // mostrar até 2h após
        .sort((a, b) => a - b)[0];

    if (!proximoCulto) return;

    const horaFormatada = proximoCulto.toLocaleString('pt-BR', {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit'
    });

    const link = "https://www.youtube.com/@igrejadenovavidabotafogo3785/live";

    const estaAoVivo = proximoCulto <= agora;

    container.innerHTML = estaAoVivo
        ? `🎥 Culto ao vivo agora! <a href="${link}" target="_blank">Clique para assistir</a>`
        : `🗓️ Próximo culto: ${horaFormatada}. <a href="${link}" target="_blank">Clique para assistir</a>`;
}