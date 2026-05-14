const AT = [
    ["OT01","Deus fez todas as coisas","https://truewaykids.com/pt/a-criacao-genesis-1/",true,true,true],
    ["OT02","Deus me fez","https://truewaykids.com/pt/adao-e-eva/",true,true,true],
    ["OT03","A Queda","https://truewaykids.com/pt/a-queda/",true,true,true],
    ["OT04","A Arca de Noé","https://truewaykids.com/pt/a-arca-de-noe/",true,true,true],
    ["OT05","Deus cumpre Suas promessas","https://truewaykids.com/pt/deus-cumpre-suas-promessas/",true,true,true],
    ["OT06","A Torre de Babel","https://truewaykids.com/pt/a-torre-de-babel/",true,true,true],
    ["OT07","Deus chama Abraão e Sara","https://truewaykids.com/pt/deus-chama-abraao-e-sara/",true,true,true],
    ["OT08","Nascimento de Isaque","https://truewaykids.com/pt/nascimento-de-isaque/",true,true,true],
    ["OT09","Abraão & Ló","https://truewaykids.com/pt/abraao-lo/",true,true,true],
    ["OT10","Sodoma e Gomorra","https://truewaykids.com/pt/sodoma-e-gomorra/",true,true,true],
    ["OT11","Rebeca","https://truewaykids.com/pt/rebeca/",true,true,true],
    ["OT12","Jacó","https://truewaykids.com/pt/jaco/",true,true,true],
    ["OT13","José","https://truewaykids.com/pt/jose/",true,true,true],
    ["OT14","O Bebê Moisés","https://truewaykids.com/pt/o-bebe-moises/",true,true,true],
    ["OT15","Moisés e a Sarça Ardente","https://truewaykids.com/pt/moises-e-a-sarca-ardente/",true,true,true],
    ["OT16","As Pragas do Egito","https://truewaykids.com/pt/as-pragas-do-egito/",true,true,true],
    ["OT17","O Mar Vermelho","https://truewaykids.com/pt/o-mar-vermelho/",true,true,true],
    ["OT18","Os dez mandamentos","https://truewaykids.com/pt/os-dez-mandamentos/",true,true,true],
    ["OT19","O Tabernáculo","https://truewaykids.com/pt/o-tabernaculo/",true,true,true],
    ["OT20","Deus Guia o Seu Povo","https://truewaykids.com/pt/deus-guia-o-seu-povo/",true,true,true],
    ["OT21","Os 12 espiões","https://truewaykids.com/pt/os-12-espioes/",true,true,true],
    ["OT22","Vagando no Deserto","https://truewaykids.com/pt/vagando-no-deserto/",true,true,true],
    ["OT23","Josué","https://truewaykids.com/pt/josue/",true,true,true],
    ["OT24","A Batalha de Jericó","https://truewaykids.com/pt/a-batalha-de-jerico/",true,true,true],
    ["OT25","Débora","https://truewaykids.com/pt/debora/",true,true,true],
    ["OT26","Gideão","https://truewaykids.com/pt/gideao/",true,true,true],
    ["OT27","Gideão – O Exército de 300","https://truewaykids.com/pt/gideao-o-exercito-de-300/",true,true,true],
    ["OT28","Sansão","https://truewaykids.com/pt/sansao/",true,true,true],
    ["OT29","Rute","https://truewaykids.com/pt/rute/",true,true,true],
    ["OT30","Ana e Samuel","https://truewaykids.com/pt/ana-e-samuel/",true,true,true],
    ["OT31","Rei Saul","https://truewaykids.com/pt/rei-saul/",true,true,true],
    ["OT32","Davi – O Menino Pastor","https://truewaykids.com/pt/davi-o-menino-pastor/",true,true,true],
    ["OT33","Davi e Golias","https://truewaykids.com/pt/david-e-golias/",true,true,true],
    ["OT34","Davi espera para ser Rei","https://truewaykids.com/pt/davi-espera-para-ser-rei/",true,true,true],
    ["OT35","Salomão","https://truewaykids.com/pt/salomao/",true,true,true],
    ["OT36","Provérbios","https://truewaykids.com/pt/proverbios/",true,true,true],
    ["OT37","Eclesiastes","https://truewaykids.com/pt/eclesiastes/",true,true,true],
    ["OT38","Elias","https://truewaykids.com/pt/elias/",true,true,true],
    ["OT39","Eliseu","https://truewaykids.com/pt/eliseu/",true,true,true],
    ["OT40","Naamã","https://truewaykids.com/pt/naama/",true,true,true],
    ["OT41","Eliseu e o Machado Flutuante","https://truewaykids.com/pt/eliseu-e-o-machado-flutuante/",true,true,true],
    ["OT42","Rei Josias","https://truewaykids.com/pt/rei-josias/",true,true,true],
    ["OT43","Neemias","https://truewaykids.com/pt/neemias/",true,true,true],
    ["OT44","Ester","https://truewaykids.com/pt/ester/",true,true,true],
    ["OT45","Jó","https://truewaykids.com/pt/jo/",true,true,true],
    ["OT46","Sadraque, Mesaque e Abede-Nego","https://truewaykids.com/pt/sadraque-mesaque-e-abede-nego-licao-da-biblia-para-pre-escolares/",true,true,true],
    ["OT47","Daniel e a Cova dos Leões","https://truewaykids.com/pt/daniel-e-a-cova-dos-leoes-licao-da-biblia-para-pre-escolares/",true,true,true],
    ["OT48","Jonas","https://truewaykids.com/pt/jonas/",true,true,true],
    ["OT49","Caim e Abel","https://truewaykids.com/pt/caim-e-abel/",true,true,false],
    ["OT50","Abraão e Isaque","https://truewaykids.com/pt/abraao-e-isaque/",true,true,false],
    ["OT51","O Senhor é o Meu Pastor – Salmo 23","https://truewaykids.com/pt/salmo-23/",true,true,false],
    ["OT52","Balaão","https://truewaykids.com/pt/balaao/",true,true,false],
    ["OT53","O Livro de Salmos","https://truewaykids.com/pt/salmos/",true,true,false],
    ["OT54","Mefibosete","https://truewaykids.com/pt/mefibosete/",true,true,false],
    ["OT55","A Ira de Jonas e a Misericórdia de Deus","https://truewaykids.com/pt/jonas-2/",true,true,true],
    ["OT56","Rei Joás","https://truewaykids.com/pt/rei-joas/",true,true,false],
    ["OT57","A Escrita na Parede","https://truewaykids.com/pt/a-escrita-na-parede/",true,true,false],
    ["OT58","Miriã","https://truewaykids.com/pt/miria/",true,true,false],
    ["OT59","Arão","https://truewaykids.com/pt/arao/",true,true,false],
    ["OT60","O sonho de Jacó","https://truewaykids.com/pt/o-sonho-de-jaco/",true,true,false],
    ["OT61","Davi Retorna a Arca da Aliança","https://truewaykids.com/pt/davi-retorna-a-arca/",true,true,false],
    ["OT62","Raabe e os Espiões","https://truewaykids.com/pt/raabe/",true,true,false],
    ["OT63","Cântico dos Cânticos","https://truewaykids.com/pt/cantico-dos-canticos/",true,true,false],
    ["OT64","Salmos 1 – Duas Maneiras de Viver","https://truewaykids.com/pt/salmos-1/",true,true,false],
    ["OT65","Atravessando o Jordão","https://truewaykids.com/pt/atravessando-o-jordao/",true,true,true],
  ];
  
  const NT = [
    ["NT01","Simeão e Ana","https://truewaykids.com/pt/simeao-e-ana/",true,true,true],
    ["NT02","A Infância de Jesus","https://truewaykids.com/pt/a-infancia-de-jesus/",true,true,true],
    ["NT03","João Batista","https://truewaykids.com/pt/joao-batista/",true,true,true],
    ["NT04","O Batismo de Jesus","https://truewaykids.com/pt/o-batismo-de-jesus/",true,true,true],
    ["NT05","A Tentação de Jesus","https://truewaykids.com/pt/a-tentacao-de-jesus/",true,true,true],
    ["NT06","O primeiro milagre de Jesus","https://truewaykids.com/pt/o-primeiro-milagre-de-jesus/",true,true,true],
    ["NT07","Jesus e Nicodemos","https://truewaykids.com/pt/jesus-e-nicodemos/",true,true,true],
    ["NT08","Pescadores de Homens","https://truewaykids.com/pt/pescadores-de-homens/",true,true,true],
    ["NT09","Jesus cura e perdoa","https://truewaykids.com/pt/jesus-cura-e-perdoa/",true,true,true],
    ["NT10","Jesus – amigo dos pecadores","https://truewaykids.com/pt/jesus-amigo-dos-pecadores/",true,true,true],
    ["NT11","Jesus escolhe Seus discípulos","https://truewaykids.com/pt/jesus-escolhe-seus-discipulos/",true,true,true],
    ["NT12","O Sermão da Montanha","https://truewaykids.com/pt/o-sermao-da-montanha/",true,true,true],
    ["NT13","O Construtor Prudente e o Insensato","https://truewaykids.com/pt/o-construtor-prudente-e-o-insensato/",true,true,true],
    ["NT14","Jesus acalma a tempestade","https://truewaykids.com/pt/jesus-acalma-a-tempestade/",true,true,true],
    ["NT15","A Parábola das Coisas Perdidas","https://truewaykids.com/pt/a-parabola-das-coisas-perdidas/",true,true,true],
    ["NT16","O Filho Pródigo","https://truewaykids.com/pt/o-filho-prodigo/",true,true,true],
    ["NT17","A Parábola do Semeador","https://truewaykids.com/pt/parabola-do-semeador/",true,true,true],
    ["NT18","A Parábola da Viúva Persistente","https://truewaykids.com/pt/da-viuva-persistente/",true,true,true],
    ["NT19","A semente de mostarda","https://truewaykids.com/pt/semente-de-mostarda/",true,true,true],
    ["NT20","O Bom Samaritano","https://truewaykids.com/pt/bom-samaritano/",true,true,true],
    ["NT21","A Parábola dos Talentos","https://truewaykids.com/pt/a-parabola-dos-talentos/",true,true,true],
    ["NT22","O Grande Banquete","https://truewaykids.com/pt/o-grande-banquete/",true,true,true],
    ["NT23","A Parábola do Servo Impiedoso","https://truewaykids.com/pt/a-parabola-do-servo-impiedoso/",true,true,true],
    ["NT24","A Mulher Samaritana","https://truewaykids.com/pt/a-mulher-samaritana/",true,true,true],
    ["NT25","A Primeira Multiplicação dos Pães","https://truewaykids.com/pt/multiplicacao-dos-paes/",true,true,true],
    ["NT26","Zaqueu","https://truewaykids.com/pt/zaqueu/",true,true,true],
    ["NT27","Os 10 Leprosos","https://truewaykids.com/pt/os-dez-leprosos/",true,true,true],
    ["NT28","Maria e Marta","https://truewaykids.com/pt/maria-e-marta/",true,true,true],
    ["NT29","Lázaro","https://truewaykids.com/pt/lazaro/",true,true,true],
    ["NT30","Jesus Recebe as Crianças","https://truewaykids.com/pt/jesus-recebe-as-criancas/",true,true,true],
    ["NT31","O Homem Cego","https://truewaykids.com/pt/o-homem-cego/",true,true,true],
    ["NT32","O Centurião Romano","https://truewaykids.com/pt/o-centuriao-romano/",true,true,true],
    ["NT33","A mulher que tocou Jesus","https://truewaykids.com/pt/a-mulher-que-tocou-jesus/",true,true,true],
    ["NT34","Casa de Oração","https://truewaykids.com/pt/casa-de-oracao/",true,true,true],
    ["NT35","Pedro anda sobre as águas","https://truewaykids.com/pt/pedro-anda-sobre-as-aguas/",true,true,true],
    ["NT36","A Grande Comissão","https://truewaykids.com/pt/a-grande-comissao/",true,true,true],
    ["NT37","Pentecostes","https://truewaykids.com/pt/pentecostes/",true,true,true],
    ["NT38","A Escolha dos Sete","https://truewaykids.com/pt/a-escolha-dos-sete/",true,true,true],
    ["NT39","Filipe e o Etíope","https://truewaykids.com/pt/filipe-e-o-etiope/",true,true,true],
    ["NT40","Pedro é resgatado","https://truewaykids.com/pt/pedro-e-resgatado/",true,true,true],
    ["NT41","Saulo se torna Paulo","https://truewaykids.com/pt/saulo-se-torna-paulo/",true,true,true],
    ["NT42","As Jornadas Missionárias de Paulo","https://truewaykids.com/pt/as-jornadas-missionarias-de-paulo/",true,true,true],
    ["NT43","Paulo e Silas na Prisão","https://truewaykids.com/pt/paulo-e-silas-na-prisao/",true,true,true],
    ["NT44","O Naufrágio de Paulo","https://truewaykids.com/pt/o-naufragio-de-paulo/",true,true,true],
    ["NT45","Timóteo","https://truewaykids.com/pt/timoteo/",true,true,true],
    ["NT46","A Armadura de Deus","https://truewaykids.com/pt/a-armadura-de-deus/",true,true,true],
    ["NT47","Os Frutos do Espírito","https://truewaykids.com/pt/os-frutos-do-espirito/",true,true,true],
    ["NT48","Filemom","https://truewaykids.com/pt/filemom/",true,true,false],
    ["NT49","O Tanque de Betesda","https://truewaykids.com/pt/o-tanque-de-betesda/",true,true,false],
    ["NT50","Pedro e João curam um mendigo aleijado","https://truewaykids.com/pt/pedro-e-joao-curam-um-mendigo-aleijado/",true,true,false],
    ["NT51","Estêvão","https://truewaykids.com/pt/estevao/",true,true,false],
    ["NT52","Zacarias e o Nascimento de João Batista","https://truewaykids.com/pt/zacarias-e-joao-batista/",true,true,false],
    ["NT53","No Caminho de Emaús","https://truewaykids.com/pt/no-caminho-de-emaus/",true,true,true],
    ["NT54","O Tesouro Escondido","https://truewaykids.com/pt/o-tesouro-escondido/",true,true,false],
    ["NT55","Pedro e Cornélio","https://truewaykids.com/pt/pedro-e-cornelio/",true,true,false],
    ["NT56","Jesus e Tomé","https://truewaykids.com/pt/jesus-e-tome/",true,true,true],
    ["NT57","Jesus Restaura Pedro","https://truewaykids.com/pt/jesus-restaura-pedro/",true,true,true],
    ["NT58","Jesus é Ungido por Maria","https://truewaykids.com/pt/jesus-e-ungido-por-maria/",true,true,false],
    ["NT59","Jesus Aparece a Maria Madalena","https://truewaykids.com/pt/jesus-aparece-a-maria-madalena/",true,true,true],
    ["NT60","Tabita (Dorcas)","https://truewaykids.com/pt/tabita-licao/",true,true,false],
    ["NT61","Paulo e Barnabé em Listra","https://truewaykids.com/pt/paulo-e-barnabe-em-listra/",true,true,false],
    ["NT62","Os Bereanos","https://truewaykids.com/pt/os-bereanos/",true,true,false],
    ["NT63","A oferta da viúva pobre","https://truewaykids.com/pt/a-oferta-da-viuva-pobre/",true,true,false],
    ["NT64","A Moeda na Boca do Peixe","https://truewaykids.com/pt/a-moeda-na-boca-do-peixe/",true,true,false],
    ["NT65","A Volta de Jesus","https://truewaykids.com/pt/a-volta-de-jesus/",true,true,false],
    ["NT66","A Transfiguração","https://truewaykids.com/pt/a-transfiguracao/",true,true,false],
    ["NT67","A Filha de Jairo","https://truewaykids.com/pt/a-filha-de-jairo/",true,true,true],
    ["NT68","A Parábola da Rede","https://truewaykids.com/pt/a-parabola-da-rede/",true,true,true],
    ["NT69","Paulo em Atenas","https://truewaykids.com/pt/paulo-em-atenas/",true,true,true],
    ["NT70","O Homem Rico","https://truewaykids.com/pt/o-homem-rico/",true,true,true],
    ["NT71","O Concílio de Jerusalém","https://truewaykids.com/pt/o-concilio-de-jerusalem/",true,true,true],
    ["NT72","Paulo em Corinto","https://truewaykids.com/pt/paulo-em-corinto/",true,true,true],
    ["NT73","O Início do Ministério de Paulo","https://truewaykids.com/pt/atos-9/",true,true,true],
    ["NT74","Lídia","https://truewaykids.com/pt/lidia/",true,true,true],
    ["NT75","Paulo em Éfeso","https://truewaykids.com/pt/paulo-em-efeso/",true,true,true],
  ];
  
  // ── Constants ──────────────────────────────────────────────
  
  const STORAGE_KEY = 'minfantil_done_v2';
  const GINFO = {
    b: { label: 'Berçário', cls: 'b' },
    m: { label: 'Maternal', cls: 'm' },
    j: { label: 'Juniores', cls: 'j' }
  };
  
  // ── State ──────────────────────────────────────────────────
  
  let done = {};
  let curTab = 'AT';
  let openC = {};
  let saveTimer = null;
  let activeFilter = 'all'; // 'all' | 'pending' | 'done' | 'b' | 'm' | 'j'
  
  const syncEl = document.getElementById('sync');
  
  // ── SVG gradient for ring ──────────────────────────────────
  
  // ringGrad já definido inline no SVG do HTML com cores da Nova Vida Botafogo
  
  // ── Storage ────────────────────────────────────────────────
  
  function setSyncMsg(msg, cls) {
    syncEl.textContent = msg;
    syncEl.className = 'sync' + (cls ? ' ' + cls : '');
  }
  
  async function loadFromStorage() {
    try {
      const res = await window.storage.get(STORAGE_KEY);
      done = res ? JSON.parse(res.value) : {};
      setSyncMsg('✓ Carregado', 'ok');
      setTimeout(() => setSyncMsg(''), 2000);
    } catch (e) {
      done = {};
      setSyncMsg('');
    }
    render();
    updateStats();
  }
  
  async function saveToStorage() {
    setSyncMsg('Salvando...');
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(done));
      setSyncMsg('✓ Salvo', 'ok');
      setTimeout(() => setSyncMsg(''), 2000);
    } catch (e) {
      setSyncMsg('Erro ao salvar', 'err');
    }
  }
  
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveToStorage, 800);
  }
  
  // ── Helpers ────────────────────────────────────────────────
  
  function lessonStatus(code, hasB, hasM, hasJ) {
    const avail = [hasB && 'b', hasM && 'm', hasJ && 'j'].filter(Boolean);
    const checked = avail.filter(g => done[code + '_' + g]);
    return {
      avail,
      full: avail.length > 0 && checked.length === avail.length,
      partial: checked.length > 0 && checked.length < avail.length,
    };
  }
  
  function rerenderCard(code) {
    const el = document.querySelector(`[data-code="${code}"]`);
    if (!el) return;
    const data = curTab === 'AT' ? AT : NT;
    const row = data.find(r => r[0] === code);
    if (!row) return;
    const newCard = buildCard(row);
    el.replaceWith(newCard);
  }
  
  // ── Confetti ───────────────────────────────────────────────
  
  function fireConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const colors = ['#f5c842','#e09a00','#ffffff','#4ecb71','#5aabff','#f5c842'];
    const particles = Array.from({length: 60}, () => ({
      x: Math.random() * canvas.width,
      y: -10,
      r: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - .5) * 4,
      vy: Math.random() * 4 + 2,
      alpha: 1,
      rot: Math.random() * 360,
      rotv: (Math.random() - .5) * 8,
    }));
  
    let frame;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += .07;
        p.alpha -= .012; p.rot += p.rotv;
        if (p.alpha > 0) alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot * Math.PI / 180);
        ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2);
        ctx.restore();
      });
      if (alive) frame = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    cancelAnimationFrame(frame);
    draw();
  }
  
  // ── Actions ────────────────────────────────────────────────
  
  function toggleGroup(code, g, e) {
    e.stopPropagation();
    const k = code + '_' + g;
    const wasDone = !!done[k];
    done[k] = !done[k];
    if (!done[k]) delete done[k];
    scheduleSave();
  
    // Check if lesson is now fully complete
    const data = curTab === 'AT' ? AT : NT;
    const row = data.find(r => r[0] === code);
    if (row && !wasDone) {
      const status = lessonStatus(code, row[3], row[4], row[5]);
      if (status.full) {
        fireConfetti();
        setTimeout(() => {
          const el = document.querySelector(`[data-code="${code}"]`);
          if (el) el.classList.add('just-done');
          setTimeout(() => el && el.classList.remove('just-done'), 600);
        }, 50);
      }
    }
  
    updateStats();
    rerenderCard(code);
  }
  
  function toggleCard(code) {
    openC[code] = !openC[code];
    rerenderCard(code);
  }
  
  // ── Filter ─────────────────────────────────────────────────
  
  function toggleFilter(f, btn) {
    activeFilter = f;
    document.querySelectorAll('.fchip').forEach(c => c.classList.remove('on'));
    btn.classList.add('on');
    render();
  }
  
  function passesFilter(row) {
    const [code,,, hasB, hasM, hasJ] = row;
    const { full, partial, avail } = lessonStatus(code, hasB, hasM, hasJ);
  
    if (activeFilter === 'done') return full;
    if (activeFilter === 'pending') return !full;
    if (activeFilter === 'b') return hasB;
    if (activeFilter === 'm') return hasM;
    if (activeFilter === 'j') return hasJ;
    return true;
  }
  
  // ── Bulk actions ───────────────────────────────────────────
  
  function getVisibleRows() {
    const q = document.getElementById('q').value.toLowerCase();
    const data = curTab === 'AT' ? AT : NT;
    return data.filter(l =>
      (!q || l[1].toLowerCase().includes(q) || l[0].toLowerCase().includes(q)) &&
      passesFilter(l)
    );
  }
  
  function bulkMark(g) {
    const rows = getVisibleRows();
    // Check if all already marked — if so, this is a toggle to unmark
    const allMarked = rows.every(([code,,,b,m,j]) => {
      const avail = [b&&'b',m&&'m',j&&'j'].filter(Boolean);
      return !avail.includes(g) || !!done[code+'_'+g];
    });
  
    rows.forEach(([code,,,b,m,j]) => {
      const avail = [b&&'b',m&&'m',j&&'j'].filter(Boolean);
      if (!avail.includes(g)) return;
      if (allMarked) {
        delete done[code+'_'+g];
      } else {
        done[code+'_'+g] = true;
      }
    });
  
    scheduleSave();
    updateStats();
    render();
  }
  
  function bulkClear() {
    const rows = getVisibleRows();
    rows.forEach(([code]) => {
      ['b','m','j'].forEach(g => delete done[code+'_'+g]);
    });
    scheduleSave();
    updateStats();
    render();
  }
  
  // ── Build DOM ──────────────────────────────────────────────
  
  function buildCard([code, title, url, hasB, hasM, hasJ]) {
    const { avail, full, partial } = lessonStatus(code, hasB, hasM, hasJ);
    const isOpen = !!openC[code];
  
    const div = document.createElement('div');
    div.className = 'card' + (full ? ' done' : '');
    div.dataset.code = code;
  
    const mindCls = 'mind' + (full ? ' full' : partial ? ' part' : '');
    const mindIcon = full ? '✓' : partial ? '–' : '';
    const htags = avail.map(g => `<span class="htag htag-${g}">${GINFO[g].label[0]}${GINFO[g].label.slice(1,4)}</span>`).join('');
  
    const head = document.createElement('div');
    head.className = 'head';
    head.onclick = () => toggleCard(code);
    head.innerHTML = `
      <div class="${mindCls}">${mindIcon}</div>
      <span class="cod">${code}</span>
      <span class="ttl${full ? ' s' : ''}">${title}</span>
      <div class="htags">${htags}</div>
      <span class="chev${isOpen ? ' op' : ''}">▾</span>
    `;
    div.appendChild(head);
  
    if (isOpen) {
      const body = document.createElement('div');
      body.className = 'body op';
  
      avail.forEach(g => {
        const isDoneG = !!done[code + '_' + g];
        const info = GINFO[g];
  
        const grp = document.createElement('div');
        grp.className = 'grp';
  
        const chk = document.createElement('div');
        chk.className = `gchk ${info.cls}${isDoneG ? ' on' : ''}`;
        chk.textContent = isDoneG ? '✓' : '';
        chk.onclick = e => toggleGroup(code, g, e);
  
        const lbl = document.createElement('span');
        lbl.className = 'glabel' + (isDoneG ? ' s' : '');
        lbl.textContent = info.label;
  
        const zone = document.createElement('div');
        zone.className = 'pdfzone';
  
        const a = document.createElement('a');
        a.className = `pdfbtn ${info.cls}`;
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.innerHTML = '↗ Ver lição';
        zone.appendChild(a);
  
        grp.appendChild(chk);
        grp.appendChild(lbl);
        grp.appendChild(zone);
        body.appendChild(grp);
      });
  
      div.appendChild(body);
    }
  
    return div;
  }
  
  // ── Stats ──────────────────────────────────────────────────
  
  function updateStats() {
    const data = curTab === 'AT' ? AT : NT;
  
    let totalB = 0, doneB = 0;
    let totalM = 0, doneM = 0;
    let totalJ = 0, doneJ = 0;
    let totalAll = data.length;
    let doneAll = 0;
  
    data.forEach(([code,,,b,m,j]) => {
      const { full } = lessonStatus(code, b, m, j);
      if (full) doneAll++;
      if (b) { totalB++; if (done[code+'_b']) doneB++; }
      if (m) { totalM++; if (done[code+'_m']) doneM++; }
      if (j) { totalJ++; if (done[code+'_j']) doneJ++; }
    });
  
    document.getElementById('sT').textContent = totalAll;
    document.getElementById('sD').textContent = doneAll;
    document.getElementById('sL').textContent = totalAll - doneAll;
  
    const pct = Math.round(doneAll / totalAll * 100);
    document.getElementById('dtPct').textContent = pct + '%';
  
    // Ring: circumference = 2 * pi * 26 ≈ 163.4
    const circ = 213.6;
    document.getElementById('ringFill').setAttribute('stroke-dasharray', `${(pct/100)*circ} ${circ}`);
  
    // Group bars
    function setBar(fillId, pctId, subId, d, t) {
      const p = t > 0 ? Math.round(d / t * 100) : 0;
      document.getElementById(fillId).style.width = p + '%';
      document.getElementById(pctId).textContent = p + '%';
      document.getElementById(subId).textContent = `${d} / ${t}`;
    }
  
    setBar('fillB', 'pctB', 'subB', doneB, totalB);
    setBar('fillM', 'pctM', 'subM', doneM, totalM);
    setBar('fillJ', 'pctJ', 'subJ', doneJ, totalJ);
  }
  
  function setTab(t, btn) {
    curTab = t;
    openC = {};
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    render();
    updateStats();
  }
  
  function render() {
    const q = document.getElementById('q').value.toLowerCase();
    const data = curTab === 'AT' ? AT : NT;
    const filtered = data.filter(l =>
      (!q || l[1].toLowerCase().includes(q) || l[0].toLowerCase().includes(q)) &&
      passesFilter(l)
    );
  
    const list = document.getElementById('list');
    if (!filtered.length) {
      list.innerHTML = '<div class="empty">// nenhuma lição encontrada</div>';
      return;
    }
    list.innerHTML = '';
    filtered.forEach((row, i) => {
      const card = buildCard(row);
      card.style.animationDelay = Math.min(i * 20, 300) + 'ms';
      list.appendChild(card);
    });
  }
  
  // ── Init ───────────────────────────────────────────────────
  loadFromStorage();