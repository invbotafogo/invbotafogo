import "../css/styles.css";

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
                cultosSection.style.opacity = 1;
                cultosSection.style.transition = 'opacity 1s ease-in-out';
            } else {
                homeSection.classList.remove('fade-out');
                cultosSection.style.opacity = 0;
            }
        }
    });

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

// Mostra o próximo culto (ou se está ao vivo)
function mostrarProximoCulto() {
    const container = document.getElementById("proximo-culto");
    if (!container) return;

    const agora = new Date();

    const cultos = [
        { dia: 3, hora: 19 }, // quarta 19h
        { dia: 0, hora: 10 }, // domingo 10h
        { dia: 0, hora: 19 }  // domingo 19h
    ];

    const proximoCulto = cultos
        .map(culto => {
            const dataCulto = new Date(agora);
            const diffDias = (culto.dia - dataCulto.getDay() + 7) % 7;
            dataCulto.setDate(dataCulto.getDate() + diffDias);
            dataCulto.setHours(culto.hora, 0, 0, 0);
            return dataCulto;
        })
        .filter(data => data > agora || (agora - data <= 2 * 60 * 60 * 1000)) // em até 2h depois
        .sort((a, b) => a - b)[0];

    if (!proximoCulto) return;

    const horaFormatada = proximoCulto.toLocaleString('pt-BR', {
        weekday: 'long', hour: '2-digit', minute: '2-digit'
    });

    const link = "https://www.youtube.com/@igrejadenovavidabotafogo3785/live";


    const estaAoVivo = proximoCulto <= agora;

    container.innerHTML = estaAoVivo
        ? `🎥 Culto ao vivo agora! <a href="${link}" target="_blank">Clique para assistir</a>`
        : `🗓️ Próximo culto: ${horaFormatada}. <a href="${link}" target="_blank">Clique para assistir</a>`;
}