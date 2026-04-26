// =============================================
//  LOUMI.JS — Área Interna INVB (Versão Supabase)
// =============================================

// ─── VERIFICAÇÃO DE ACESSO POR TOKEN ─────────
(function verificarToken() {
    const params = new URLSearchParams(window.location.search);
    const r = params.get('r');
    try {
        if (atob(r || '') !== 'invb') {
            document.body.innerHTML = '';
            window.location.href = '/';
        }
    } catch (_) {
        document.body.innerHTML = '';
        window.location.href = '/';
    }
})();

const _URL = 'https://qzuwwboddnpptkbtsicc.supabase.co';
const _KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6dXd3Ym9kZG5wcHRrYnRzaWNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NjQyMDcsImV4cCI6MjA5MjQ0MDIwN30.cycw6QQRcXMgLEJSakXapgP-mwAw4ZxrNJ6CGHhqlio';
const supabaseClient = supabase.createClient(_URL, _KEY);

const CONFIG = {
    senhaPadrao: 'vitorioso',

    // Senhas admin por ministério: nome sem acento + 123
    senhasAdmin: {
        louvor:   'louvor123',
        midia:    'midia123',
        infantil: 'infantil123'
    },

    ministerios: {
        louvor:   { nome: 'Louvor',   nomeCompleto: 'Ministério de Louvor', badgeClass: 'louvor'   },
        midia:    { nome: 'Mídia',    nomeCompleto: 'Ministério de Mídia',  badgeClass: 'midia'    },
        infantil: { nome: 'Infantil', nomeCompleto: 'Ministério Infantil',  badgeClass: 'infantil' }
    },

    materiais: {
        louvor: [{
            titulo: 'Arquivos do Louvor',
            icone: '🎵',
            tipo: 'Pasta Google Drive',
            descricao: 'Partituras, letras e guias para os ensaios.',
            driveId: '1GpX9XRMTDf92bLsglQZN0pSCdKWjomrM',
            tipoEmbed: 'pasta',
        }],
        midia: [],
        infantil: []
    }
};

let ministeriosSelecionados = new Set();
let escalasCarregadas = [];

// ─── HELPERS DE SELEÇÃO ──────────────────────
const todosKeys = () => Object.keys(CONFIG.ministerios);

function estaTodos() {
    return ministeriosSelecionados.size === 0 ||
           todosKeys().every(k => ministeriosSelecionados.has(k));
}

function selecionadosArray() {
    return estaTodos() ? todosKeys() : [...ministeriosSelecionados];
}

// ─── CONTROLE DE STEP DO LOGIN ────────────────
function getAcesso() {
    return document.getElementById('select-acesso').value;
}

function onAcessoChange() {
    const acesso = getAcesso();
    const wrapMin  = document.getElementById('wrap-ministerio-admin');
    const wrapSenha = document.getElementById('wrap-senha');
    const labelSenha = document.getElementById('label-senha');

    // Mostra seletor de ministério só para admin
    if (wrapMin) wrapMin.style.display = acesso === 'admin' ? 'block' : 'none';

    // Ajusta label da senha
    if (labelSenha) {
        labelSenha.textContent = acesso === 'admin' ? 'Senha do Ministério' : 'Senha de Acesso';
    }

    // Limpa senha e erro ao trocar
    const inputSenha = document.getElementById('input-senha');
    if (inputSenha) inputSenha.value = '';
    const erroEl = document.getElementById('login-erro');
    if (erroEl) erroEl.style.display = 'none';
}

// ─── SESSÃO ──────────────────────────────────
(function verificarSessao() {
    const sessaoSalva = sessionStorage.getItem('loumi_selecionados');
    if (sessaoSalva) {
        try {
            const parsed = JSON.parse(sessaoSalva);
            ministeriosSelecionados = new Set(parsed.filter(k => CONFIG.ministerios[k]));
            iniciarApp();
        } catch (_) { /* sessão inválida, ignora */ }
    }
})();

// ─── LOGIN ───────────────────────────────────
async function tentarLogin() {
    const acesso        = getAcesso();
    const senhaDigitada = document.getElementById('input-senha').value;

    if (!acesso) return exibirErro('Selecione uma opção.');

    if (acesso === 'admin') {
        const ministerioAdmin = document.getElementById('select-ministerio-admin').value;
        if (!ministerioAdmin) return exibirErro('Selecione o ministério.');

        const senhaCorreta = CONFIG.senhasAdmin[ministerioAdmin];
        if (senhaDigitada === senhaCorreta) {
            // Redireciona para o painel admin passando o ministério como parâmetro
            window.location.href = `./src/pages/admin.html?ministerio=${ministerioAdmin}&r=aW52Yg==`;
        } else {
            exibirErro('Senha incorreta para este ministério.');
        }

    } else if (acesso === 'escala') {
        if (senhaDigitada === CONFIG.senhaPadrao) {
            ministeriosSelecionados = new Set();
            salvarSessao();
            iniciarApp();
        } else {
            exibirErro('Senha incorreta.');
        }
    } else {
        exibirErro('Opção inválida.');
    }
}

function exibirErro(msg) {
    const erroEl = document.getElementById('login-erro');
    if (erroEl) {
        erroEl.textContent = msg;
        erroEl.style.display = 'block';
    }
}

function salvarSessao() {
    sessionStorage.setItem('loumi_selecionados', JSON.stringify([...ministeriosSelecionados]));
}

// ─── LIMPEZA AUTOMÁTICA DE ESCALAS ANTIGAS ───
// async function limparEscalasAntigas() {
//     const hoje = new Date();
//     hoje.setHours(0, 0, 0, 0);

//     // Busca todas as escalas
//     const { data, error } = await supabaseClient
//         .from('escalas')
//         .select('id, data');

//     if (error || !data) return;

//     // Filtra os IDs cuja data já passou
//     // Data no banco: "DD/MM" — monta com o ano atual (ou próximo, se necessário)
//     const idsAntigos = data.filter(item => {
//         const [dia, mes] = item.data.split('/').map(Number);
//         let ano = hoje.getFullYear();
//         // Se o mês já passou este ano, usa ano atual mesmo
//         // Se for dezembro e estamos em janeiro, ajusta
//         const dataItem = new Date(ano, mes - 1, dia);
//         // Se a data ainda está no futuro com ano atual, não deleta
//         return dataItem < hoje;
//     }).map(item => item.id);

//     if (idsAntigos.length === 0) return;

//     await supabaseClient
//         .from('escalas')
//         .delete()
//         .in('id', idsAntigos);
// }

// ─── INICIAR APP ─────────────────────────────
function iniciarApp() {
    document.getElementById('tela-login').style.display = 'none';
    document.getElementById('tela-app').style.display   = 'flex';

    // Popula badge do mês atual
    const mesesNomes = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    const agora = new Date();
    const textoEl = document.getElementById('mes-atual-texto');
    if (textoEl) textoEl.textContent = `${mesesNomes[agora.getMonth()]} ${agora.getFullYear()}`;

    // limparEscalasAntigas();
    ativarAba('escala');
    renderizarSeletorMinisterio();
    renderizarEscala();
    renderizarMateriais();
}

// ─── SELETOR DE MINISTÉRIO (header) ──────────
function renderizarSeletorMinisterio() {
    const container = document.getElementById('seletor-ministerio');
    if (!container) return;

    const todos = estaTodos();

    let html = `
        <button class="btn-ministerio ${todos ? 'ativo' : ''}" onclick="selecionarTodos()">
            Todos
        </button>
    `;

    html += todosKeys().map(key => {
        const info  = CONFIG.ministerios[key];
        const ativo = !todos && ministeriosSelecionados.has(key);
        return `
            <button class="btn-ministerio ${ativo ? 'ativo' : ''}" onclick="toggleMinisterio('${key}')">
                ${info.nome}
            </button>
        `;
    }).join('');

    container.innerHTML = html;
}

function selecionarTodos() {
    ministeriosSelecionados = new Set();
    salvarSessao();
    renderizarSeletorMinisterio();
    renderizarEscala();
    renderizarMateriais();
}

function toggleMinisterio(key) {
    if (!CONFIG.ministerios[key]) return;

    if (estaTodos()) {
        ministeriosSelecionados = new Set([key]);
    } else {
        if (ministeriosSelecionados.has(key)) {
            ministeriosSelecionados.delete(key);
            if (ministeriosSelecionados.size === 0) {
                ministeriosSelecionados = new Set();
            }
        } else {
            ministeriosSelecionados.add(key);
        }
    }

    salvarSessao();
    renderizarSeletorMinisterio();
    renderizarEscala();
    renderizarMateriais();
}

// ─── ESCALA (BUSCA NO SUPABASE) ──────────────
async function renderizarEscala() {
    const keys = selecionadosArray();

    const { data, error } = await supabaseClient
        .from('escalas')
        .select('*')
        .in('ministerio', keys)
        .order('data', { ascending: true });

    if (error) return console.error("Erro ao buscar dados:", error);

    escalasCarregadas = data || [];

    const filtroDataEl = document.getElementById('filtro-data');
    if (filtroDataEl) {
        const datasUnicas = [...new Set(escalasCarregadas.map(e => e.data))];
        filtroDataEl.innerHTML = '<option value="">Todos os cultos</option>' +
            datasUnicas.map(d => `<option value="${d}">${d}</option>`).join('');
    }

    atualizarFiltroDeFuncoes();
    aplicarFiltrosVisual();
}

// ─── FILTROS VISUAIS & RENDERIZAÇÃO ──────────
function aplicarFiltrosVisual() {
    const filtroDataVal   = document.getElementById('filtro-data')?.value || '';
    const filtroNomeVal   = document.getElementById('filtro-nome')?.value.trim().toLowerCase() || '';
    const filtroFuncaoVal = document.getElementById('filtro-funcao')?.value || '';
    const tbody           = document.getElementById('escala-tbody');
    const mostrandoVarios = selecionadosArray().length > 1;

    const filtrados = escalasCarregadas.filter(item => {
        const passaData   = !filtroDataVal   || item.data   === filtroDataVal;
        const passaNome   = !filtroNomeVal   || item.nome.toLowerCase().includes(filtroNomeVal);
        const passaFuncao = !filtroFuncaoVal || item.funcao === filtroFuncaoVal;
        return passaData && passaNome && passaFuncao;
    });

    const thead = document.querySelector('.tabela-escala thead tr');
    if (thead) {
        thead.innerHTML = mostrandoVarios
            ? '<th style="width:40px;"></th><th>Função</th><th>Nome</th><th>Ministério</th>'
            : '<th style="width:40px;"></th><th>Função</th><th>Nome</th>';
    }

    // Botão de download — aparece só se tem resultados
    const btnDownload = document.getElementById('btn-download-escala');
    if (btnDownload) btnDownload.style.display = filtrados.length > 0 ? 'flex' : 'none';

    if (filtrados.length === 0) {
        const colspan = mostrandoVarios ? 4 : 3;
        tbody.innerHTML = `<tr><td colspan="${colspan}" style="text-align:center; padding: 32px; opacity:0.5;">Nenhuma escala encontrada.</td></tr>`;
        return;
    }

    let html      = "";
    let ultimaData = "";

    filtrados.forEach(item => {
        if (item.data !== ultimaData) {
            const colspan = mostrandoVarios ? 4 : 3;
            html += `
                <tr class="linha-separadora">
                    <td colspan="${colspan}" style="background: #1a1a1a; color: #ffd700; font-weight: bold; padding: 12px; border-left: 4px solid #ffd700; border-top: 10px solid #121212;">
                        🗓️ ${item.data} - ${item.culto}
                    </td>
                </tr>`;
            ultimaData = item.data;
        }

        const colunaMinisterio = mostrandoVarios
            ? `<td style="padding: 14px 8px;"><span class="tag-ministerio tag-${item.ministerio}">${CONFIG.ministerios[item.ministerio]?.nome ?? item.ministerio}</span></td>`
            : '';

        html += `
            <tr>
                <td style="width: 40px; opacity: 0.3; text-align: center; font-size: 0.6rem;">●</td>
                <td style="padding: 14px 8px;"><span class="tag-funcao">${item.funcao}</span></td>
                <td><strong>${item.nome}</strong></td>
                ${colunaMinisterio}
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

// ─── ATUALIZA FILTRO DE FUNÇÕES ───────────────
function atualizarFiltroDeFuncoes() {
    const selFuncao = document.getElementById('filtro-funcao');
    if (!selFuncao) return;
    const funcoesUnicas = [...new Set(escalasCarregadas.map(e => e.funcao))].sort();
    selFuncao.innerHTML = '<option value="">Todas as funções</option>' +
        funcoesUnicas.map(f => `<option value="${f}">${f}</option>`).join('');
}

// ─── DOWNLOAD PNG DA ESCALA (Canvas nativo) ───
async function baixarEscalaPNG() {
    const filtroDataVal   = document.getElementById('filtro-data')?.value || '';
    const filtroNomeVal   = document.getElementById('filtro-nome')?.value.trim().toLowerCase() || '';
    const filtroFuncaoVal = document.getElementById('filtro-funcao')?.value || '';
    const mostrandoVarios = selecionadosArray().length > 1;

    const filtrados = escalasCarregadas.filter(item => {
        const passaData   = !filtroDataVal   || item.data   === filtroDataVal;
        const passaNome   = !filtroNomeVal   || item.nome.toLowerCase().includes(filtroNomeVal);
        const passaFuncao = !filtroFuncaoVal || item.funcao === filtroFuncaoVal;
        return passaData && passaNome && passaFuncao;
    });

    if (filtrados.length === 0) return;

    // Título do filtro ativo
    const partesFiltro = [];
    if (!mostrandoVarios) partesFiltro.push(CONFIG.ministerios[selecionadosArray()[0]]?.nome || '');
    if (filtroFuncaoVal) partesFiltro.push(filtroFuncaoVal);
    if (filtroNomeVal)   partesFiltro.push(filtroNomeVal);
    if (filtroDataVal)   partesFiltro.push(filtroDataVal);
    const subtitulo = partesFiltro.length ? partesFiltro.join(' · ') : 'Escala Completa';

    // Agrupa por data/culto
    const grupos = {};
    filtrados.forEach(item => {
        const chave = `${item.data}  •  ${item.culto}`;
        if (!grupos[chave]) grupos[chave] = [];
        grupos[chave].push(item);
    });

    const corMin = { louvor: '#ffd700', midia: '#64b4ff', infantil: '#78dc78' };

    // ── Dimensões e constantes ──
    const DPR     = 2;           // resolução 2x
    const W       = 420;         // largura lógica em px
    const PAD     = 24;
    const FONT    = 'system-ui, -apple-system, Arial, sans-serif';

    // ── Pré-calcular altura total ──
    const ROW_H      = 44;
    const GROUP_HEAD = 38;
    const GROUP_GAP  = 12;
    const HEADER_H   = 70;
    const FOOTER_H   = 40;
    const DIVIDER    = 1;

    let totalH = PAD + HEADER_H + 16; // topo + header + espaço
    Object.values(grupos).forEach(itens => {
        totalH += GROUP_HEAD + itens.length * ROW_H + DIVIDER + GROUP_GAP;
    });
    totalH += FOOTER_H + PAD;

    // ── Cria canvas ──
    const canvas  = document.createElement('canvas');
    canvas.width  = W * DPR;
    canvas.height = totalH * DPR;
    const ctx     = canvas.getContext('2d');
    ctx.scale(DPR, DPR);

    // ── Helpers ──
    const rect = (x, y, w, h, color) => { ctx.fillStyle = color; ctx.fillRect(x, y, w, h); };
    const roundRect = (x, y, w, h, r, color) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        ctx.fill();
    };
    const text = (str, x, y, color, size, weight = 'normal', align = 'left') => {
        ctx.fillStyle = color;
        ctx.font = `${weight} ${size}px ${FONT}`;
        ctx.textAlign = align;
        ctx.fillText(str, x, y);
    };

    // ── Fundo ──
    roundRect(0, 0, W, totalH, 12, '#161616');

    // ── Borda sutil ──
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(0.5, 0.5, W - 1, totalH - 1, 12);
    ctx.stroke();

    // ── Header ──
    let y = PAD;

    // Logo INVB
    roundRect(PAD, y, 52, 36, 8, '#ffd700');
    text('INVB', PAD + 26, y + 24, '#111111', 13, '800', 'center');

    // Título
    text('Escala do Ministério', PAD + 64, y + 14, '#ffffff', 14, '700');
    text(subtitulo, PAD + 64, y + 30, '#888888', 11, 'normal');

    y += HEADER_H;

    // Linha divisória
    rect(PAD, y, W - PAD * 2, 1, '#2a2a2a');
    y += 16;

    // ── Grupos ──
    Object.entries(grupos).forEach(([titulo, itens]) => {
        // Cabeçalho do grupo
        rect(PAD, y, 3, GROUP_HEAD, '#ffd700');                       // barra lateral
        roundRect(PAD + 3, y, W - PAD * 2 - 3, GROUP_HEAD, [0,4,0,0], '#1e1e1e'); // fundo
        text(titulo, PAD + 16, y + GROUP_HEAD / 2 + 5, '#ffd700', 11, '700');
        y += GROUP_HEAD;

        // Linhas de cada pessoa
        itens.forEach((item, idx) => {
            const rowBg = idx % 2 === 0 ? '#1a1a1a' : '#191919';
            rect(PAD + 3, y, W - PAD * 2 - 3, ROW_H, rowBg);

            const cor = mostrandoVarios ? (corMin[item.ministerio] || '#ffd700') : '#ffd700';

            // Ponto colorido
            ctx.fillStyle = cor;
            ctx.globalAlpha = 0.6;
            ctx.beginPath();
            ctx.arc(PAD + 18, y + ROW_H / 2, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;

            // Função
            text(item.funcao, PAD + 30, y + ROW_H / 2 + 4, '#999999', 10.5);

            // Nome (direita)
            const nomeX = mostrandoVarios ? W - PAD - 70 : W - PAD - 12;
            text(item.nome, nomeX, y + ROW_H / 2 + 4, '#ffffff', 12, '600', 'right');

            // Tag de ministério (só quando mostrando vários)
            if (mostrandoVarios) {
                const nomeMin = CONFIG.ministerios[item.ministerio]?.nome ?? item.ministerio;
                const tagW = 58, tagH = 18, tagX = W - PAD - 60, tagY = y + ROW_H / 2 - 9;
                ctx.fillStyle = cor + '22';
                ctx.strokeStyle = cor + '66';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(tagX, tagY, tagW, tagH, 4);
                ctx.fill();
                ctx.stroke();
                text(nomeMin.toUpperCase(), tagX + tagW / 2, tagY + 12, cor, 8, '700', 'center');
            }

            y += ROW_H;
        });

        // Linha separadora embaixo do grupo
        rect(PAD + 3, y, W - PAD * 2 - 3, DIVIDER, '#252525');
        y += DIVIDER + GROUP_GAP;
    });

    // ── Rodapé ──
    y = totalH - FOOTER_H;
    rect(PAD, y, W - PAD * 2, 1, '#2a2a2a');
    text(
        `invbotafogo.com.br  ·  gerado em ${new Date().toLocaleDateString('pt-BR')}`,
        W / 2, y + 24, '#444444', 10, 'normal', 'center'
    );

    // ── Download ──
    const link = document.createElement('a');
    link.download = `escala-invb-${subtitulo.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// ─── MATERIAIS ───────────────────────────────
function renderizarMateriais() {
    const grid = document.getElementById('drive-grid');
    if (!grid) return;

    const materiais = selecionadosArray().flatMap(k => CONFIG.materiais[k] || []);

    if (materiais.length === 0) {
        grid.innerHTML = '<p style="opacity:0.5; padding:20px;">Nenhum material disponível.</p>';
        return;
    }

    grid.innerHTML = materiais.map(mat => `
        <div class="drive-card">
          <div class="drive-card-header">
            <span class="drive-card-icone">${mat.icone}</span>
            <div>
              <div class="drive-card-titulo">${mat.titulo}</div>
              <div class="drive-card-tipo">${mat.tipo}</div>
            </div>
          </div>
          <div class="drive-card-body">
            <p class="drive-card-desc">${mat.descricao}</p>
            <a class="btn-abrir-drive" href="https://drive.google.com/drive/folders/${mat.driveId}" target="_blank" style="text-decoration:none; display:block; text-align:center;">↗ Abrir no Drive</a>
          </div>
        </div>
    `).join('');
}

function ativarAba(aba) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('ativo', btn.dataset.aba === aba));
    document.querySelectorAll('.secao').forEach(s => s.classList.toggle('ativa', s.id === 'secao-' + aba));
}

function sair() {
    sessionStorage.removeItem('loumi_selecionados');
    window.location.reload();
}

// ─── EXPORTS ─────────────────────────────────
window.tentarLogin          = tentarLogin;
window.onAcessoChange       = onAcessoChange;
window.renderizarEscala     = renderizarEscala;
window.aplicarFiltrosVisual = aplicarFiltrosVisual;
window.ativarAba            = ativarAba;
window.toggleMinisterio     = toggleMinisterio;
window.selecionarTodos      = selecionarTodos;
window.sair                 = sair;
window.baixarEscalaPNG      = baixarEscalaPNG;

document.getElementById('input-senha')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tentarLogin();
});