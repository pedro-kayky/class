window.onload = () => {

    // ===================================================
    // ELEMENTOS
    // ===================================================
    const vento = document.getElementById("vento");
    const doorSound = document.getElementById("doorSound");
    
    const texto = document.getElementById("texto");
    const cursor = document.getElementById("cursor");

    const choice = document.getElementById("choice");
    const aceitar = document.getElementById("aceitar");
    const nao = document.getElementById("nao");

    const video = document.getElementById("introVideo");

    const fogLeft = document.getElementById("fogLeft");
    const fogRight = document.getElementById("fogRight");
    const flash = document.getElementById("flash");

    const loadingScreen = document.getElementById("loadingScreen");
    const loadingMessage = document.getElementById("loadingMessage");
    const loadingBar = document.getElementById("loadingProgress");
    const loadingPercent = document.getElementById("loadingPercent");
    const clickSound = document.getElementById("clickSound");
    const hoverSound = document.getElementById("hoverSound");
    const frases = [
        "遠い昔...",
        "魔法は選ばれた者だけの力だった。",
        "しかし...",
        "今日...",
        "あなたは招待された。",
        "あなたは選ばれた。"
    ];

    // ===================================================
    // CONFIGURAÇÃO DA PISCINA DE ÁUDIO (SOM DO TEXTO)
    // ===================================================
    const audioPool = [];
    let poolIndex = 0;
    const POOL_SIZE = 12; // Quantidade de canais para sobrepor os sons das letras perfeitamente
    const caminhoSomTexto = "Alchemy-Lab/audio/typing.mp3";

    // Pré-carrega todos os áudios na memória assim que a página abre
    for (let i = 0; i < POOL_SIZE; i++) {
        const canal = new Audio(caminhoSomTexto);
        canal.volume = 0.08;
        canal.preload = "auto"; // Força o download prévio do arquivo
        audioPool.push(canal);
    }

    // ===================================================
    // EVENTOS
    // ===================================================
    document.body.addEventListener("click", iniciar, { once: true });
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mousemove", fugirDoMouse);
    aceitar.addEventListener("click", aceitarDestino);
    video.addEventListener("ended", fimVideo);

    // ===================================================
    // FUNÇÃO AUXILIAR
    // ===================================================
    function esperar(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ===================================================
    // INÍCIO
    // ===================================================
    async function iniciar() {
        // Ativa a piscina de áudio com um play fantasma imediato.
        // Isso remove o bloqueio de segurança (Autoplay Policy) do navegador para todas as letras.
        audioPool.forEach(som => {
            som.play().then(() => {
                som.pause();
                som.currentTime = 0;
            }).catch(() => {});
        });

        try {
            vento.volume = 0.1;
            await vento.play();
        } catch (error) {
            console.log("Áudio do vento bloqueado pelo navegador. Aguardando interação.");
        }
        await historia();
    }

    // ===================================================
    // HISTÓRIA
    // ===================================================
   async function historia() {
    for (const fraseAtual of frases) {
        await frase(fraseAtual);
    }
    mostrarEscolha();
}

function mostrarEscolha() {
    choice.style.display = "flex";
}

// Função auxiliar para tocar o som de hover de forma limpa
function tocarSomHover() {
    if (hoverSound) {
        hoverSound.currentTime = 0; // Reseta para tocar rapidamente se o mouse passar direto
        hoverSound.volume = 0.12;   // Volume sutil
        hoverSound.play().catch(() => {});
    }
}

if (aceitar) {
    aceitar.addEventListener("mouseenter", tocarSomHover);
    
    aceitar.addEventListener("click", () => {
        aceitarDestino();
    });
}

// ===================================================
// ACEITAR DESTINO (AÇÃO DE ENTRAR)
// ===================================================
async function aceitarDestino() {
    // 1. TOCA O SOM DE CLIQUE DO MOUSE IMEDIATAMENTE
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.volume = 0.25;
        clickSound.play().catch(() => {});
    }

    // Esconde a tela de escolha
    choice.style.display = "none";
    
    // Diminui o som do vento (garanta que essa função exista no seu script)
    if (typeof diminuirVento === 'function') {
        diminuirVento();
    }

    // Ativa o efeito de neblina se os elementos existirem
    if (fogLeft && fogRight) {
        fogLeft.style.opacity = "1";
        fogRight.style.opacity = "1";
        fogLeft.style.left = "0";
        fogRight.style.right = "0";
    }

    // 2. REDIRECIONA PARA O LABORATÓRIO DENTRO DA PASTA CORRETA
    // Mantemos o delay para os efeitos visuais e sonoros acontecerem antes de mudar de página
    setTimeout(() => {
        window.location.href = "Alchemy-Lab/aula.html";
    }, 82);
}
// ===================================================
// ACEITAR DESTINO (AÇÃO DE ENTRAR)
// ===================================================
async function aceitarDestino() {
    // 1. TOCA O SOM DE CLIQUE DO MOUSE IMEDIATAMENTE
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.volume = 0.25;
        clickSound.play().catch(() => {});
    }

    // Esconde a tela de escolha
    choice.style.display = "none";
    diminuirVento();

    // Ativa o efeito de neblina se os elementos existirem
    if (fogLeft && fogRight) {
        fogLeft.style.opacity = "1";
        fogRight.style.opacity = "1";
        fogLeft.style.left = "0";
        fogRight.style.right = "0";
    }

    // 2. ESPERA A NEBLINA AGIR UM POUCO (600ms)
    await esperar(600); 

    // 3. AGORA SIM, TOCA O SOM DA PORTA ABRINDO
    if (doorSound) {
        doorSound.currentTime = 0;
        doorSound.volume = 0.15;
        try {
            await doorSound.play();
        } catch (e) {
            console.log("Erro ao tocar o som da porta:", e);
        }
    }

    // Espera mais um pouco para o impacto da porta e inicia o flash + vídeo
    await esperar(400);

    if (flash) {
        flash.style.opacity = ".9";
        await esperar(180);
        flash.style.opacity = "0";
        await esperar(200);
    }

    iniciarVideo(); 
}

    // ===================================================
    // FUNÇÕES DO VÍDEO
    // ===================================================
  let somDaPortaJaTocou = false;

async function aceitarDestino() {
    somDaPortaJaTocou = false;

    // 1. FORÇA O SOM DE CLIQUE A TOCAR IMEDIATAMENTE (Com await)
    if (clickSound) {
        try {
            clickSound.currentTime = 0;
            clickSound.volume = 1;
            await clickSound.play(); // Garante a execução antes de esconder a tela
        } catch (e) {
            console.log("Navegador barrou o som de clique inicial:", e);
        }
    }

    // Esconde a tela de escolha
    choice.style.display = "none";
    diminuirVento();

    // Ativa o efeito de neblina se os elementos existirem
    if (fogLeft && fogRight) {
        fogLeft.style.opacity = "1";
        fogRight.style.opacity = "1";
        fogLeft.style.left = "0";
        fogRight.style.right = "0";
    }

    // 2. ESPERAS VISUAIS (Neblina e Flash)
    await esperar(600); 
    await esperar(400);

    if (flash) {
        flash.style.opacity = ".9";
        await esperar(180);
        flash.style.opacity = "0";
        await esperar(200);
    }

    iniciarVideo(); 
}

// ===================================================
// FUNÇÕES DO VÍDEO
// ===================================================
function iniciarVideo() {
    if (video) {
        video.style.display = "block";
        video.style.opacity = "1";
        video.currentTime = 0;

        // Limpa qualquer escuta antiga do onplaying para não dar conflito
        video.onplaying = null;

        // Configura o evento de forma limpa
        video.onplaying = () => {
            if (somDaPortaJaTocou) return;
            somDaPortaJaTocou = true;

            setTimeout(() => {
                if (doorSound) {
                    doorSound.currentTime = 0;
                    doorSound.volume = 0.15;
                    doorSound.play().catch(e => console.log("Erro ao tocar o som da porta:", e));
                }
            }, 830); // 82ms cravados
        };

        // Inicia o vídeo
        video.play().catch(error => {
            console.error("Erro ao tentar tocar o vídeo:", error);
            fimVideo(); 
        });
    }
}

    function fimVideo() {
        if (video) {
            video.style.opacity = "0";
            setTimeout(() => {
                video.style.display = "none";
                iniciarLoading(); // Aciona a tela de carregamento após o vídeo
            }, 1200); // Sincronizado com o tempo de transição do CSS
        }
    }

    // ===================================================
    // LOADING SCREEN (MÁQUINA DE ESTADOS)
    // ===================================================
    async function iniciarLoading() {
        if (!loadingScreen) {
            // Caso não tenha os elementos de loading, inicia o jogo direto
            iniciarAcademia();
            return;
        }
        
        loadingScreen.style.display = "flex";

        const mensagens = [
            "Initializing Academy...",
            "Analyzing Creativity...",
            "Checking Communication...",
            "Checking Teamwork...",
            "Preparing Laboratory...",
            "Mission Generated."
        ];

        let progresso = 0;

        for (let i = 0; i < mensagens.length; i++) {
            if (loadingMessage) loadingMessage.innerHTML = mensagens[i];

            for (let j = 0; j < 16; j++) {
                progresso += 100 / 96;
                if (loadingBar) loadingBar.style.width = progresso + "%";
                if (loadingPercent) loadingPercent.innerHTML = Math.floor(progresso) + "%";
                await esperar(90);
            }
        }

        if (loadingPercent) loadingPercent.innerHTML = "100%";
        if (loadingMessage) loadingMessage.innerHTML = "Welcome to Alchemy Academy.";
        
        await esperar(1800);
        loadingScreen.style.display = "none";
        iniciarAcademia();
    }

    
        function iniciarAcademia() {
    // Redireciona o jogador da Fase 1 direto para a Fase 2
      window.location.href = "/laboratorio/laboratorio.html";
}

    

    // ===================================================
    // COMPORTAMENTOS VISUAIS (MOUSE E FUGA)
    // ===================================================
    function fugirDoMouse(e) {
        if (choice.style.display !== "flex") return;

        const rect = nao.getBoundingClientRect();
        const centroX = rect.left + rect.width / 2;
        const centroY = rect.top + rect.height / 2;

        const dx = e.clientX - centroX;
        const dy = e.clientY - centroY;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        if (distancia < 100) {
            const velocidade = 12; 
            
            let novoX = rect.left;
            let novoY = rect.top;

            if (dx > 0) { novoX -= velocidade; } else { novoX += velocidade; }
            if (dy > 0) { novoY -= velocidade; } else { novoY += velocidade; }

            const margem = 40;
            
            novoX = Math.max(margem, Math.min(window.innerWidth - rect.width - margem, novoX));
            novoY = Math.max(margem, Math.min(window.innerHeight - rect.height - margem, novoY));

            const atualX = parseFloat(nao.dataset.translateX || 0);
            const atualY = parseFloat(nao.dataset.translateY || 0);
            const diffX = novoX - rect.left;
            const diffY = novoY - rect.top;
            const finalX = atualX + diffX;
            const finalY = atualY + diffY;

            nao.dataset.translateX = finalX;
            nao.dataset.translateY = finalY;
            nao.style.transform = `translate(${finalX}px, ${finalY}px)`;
        }
    }

    function mouseMove(e) {
        if (cursor) {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        }

        const p = document.createElement("div");
        p.className = "magic"; 
        p.style.left = e.clientX + "px";
        p.style.top = e.clientY + "px";
        document.body.appendChild(p);

        setTimeout(() => { p.remove(); }, 800);
    }

    // ===================================================
    // EFEITOS DE TEXTO E SOM CORRIGIDO
    // ===================================================
    async function frase(msg) {
        texto.innerHTML = "";
        texto.style.opacity = "1";

        for (const letra of msg) {
            texto.innerHTML += letra;
            tocarSomTexto(letra);
            // Pequeno fator aleatório para simular digitação humana fluida
            await esperar(45 + Math.random() * 35);
        }

        await esperar(2500);
        texto.style.opacity = "0";
        await esperar(1200);
    }

    function tocarSomTexto(letra) {
        const ignorar = [" ", "。", "、", "・", "…"];
        if (ignorar.includes(letra)) return;

        if (audioPool.length > 0) {
            const somInstancia = audioPool[poolIndex];
            somInstancia.currentTime = 0; // Reseta o som atual caso ele ainda esteja rodando
            somInstancia.play().catch(() => {});
            
            // Rotaciona o ponteiro da piscina entre os canais disponíveis (0 a 11)
            poolIndex = (poolIndex + 1) % POOL_SIZE;
        }
    }

    function diminuirVento() {
        if (!vento) return;
        const fade = setInterval(() => {
            if (vento.volume > 0.02) {
                vento.volume -= 0.02;
            } else {
                vento.pause();
                clearInterval(fade);
            }
        }, 100);
    }
}