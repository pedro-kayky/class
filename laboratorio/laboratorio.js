window.onload = () => {
    // Liga a trilha sonora de RPG
    const musica = document.getElementById("bgMusic");
    const somClique = document.getElementById("clickSound");
    const somHover = document.getElementById("hoverSound");

    if (musica) {
        musica.volume = 0.15;
        musica.play().catch(error => {
            console.log("Aguardando clique na página para iniciar trilha sonora.");
        });
    }

    if (musica) {
    // Altere de 0.15 para 0.05 (5% do volume total) ou o valor que preferir
    musica.volume = 0.10; 
    musica.play().catch(error => {
        console.log("Aguardando clique na página para iniciar trilha sonora.");
    });
}

    // Seleciona os cards ativos
    const aulasAtivas = document.querySelectorAll('.card-aula.ativa');

    aulasAtivas.forEach(card => {
        // EVENTO 1: PASSAR O MOUSE (HOVER)
        card.addEventListener('mouseenter', () => {
            tocarSomHover();
        });

        // EVENTO 2: CLICAR
        card.addEventListener('click', () => {
            tocarSomClique();
            const numeroAula = card.getAttribute('data-aula');
            
            setTimeout(() => {
                entrarNaAula(numeroAula);
            }, 150);
        });
    });

    function tocarSomHover() {
        if (somHover) {
            somHover.currentTime = 0; // Reseta o tempo para poder tocar várias vezes seguidas
            somHover.volume = 0.12;   // Som de hover costuma ser mais baixo que o de clique
            somHover.play().catch(() => {});
        }
    }

    function tocarSomClique() {
        if (somClique) {
            somClique.currentTime = 0;
            somClique.volume = 0.25;
            somClique.play().catch(() => {});
        }
    }

    function entrarNaAula(id) {
    console.log(`Redirecionando para a aula: ${id}`);
    
    // Toca o som de clique antes de mudar de página (opcional, se você quiser manter o padrão)
    if (typeof somClique !== 'undefined' && somClique) {
        somClique.currentTime = 0;
        somClique.play().catch(() => {});
    }

    // OPÇÃO A: Se a pasta "aula" estiver do lado do seu arquivo "laboratorio.html"
    window.location.href = "/aula/aula.html"; 

    // OPÇÃO B: Se o arquivo se chamar "aula-coquetel.html" e estiver na mesma pasta principal
    // window.location.href = "aula-coquetel.html";
}
}