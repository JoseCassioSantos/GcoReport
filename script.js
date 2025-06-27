document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos do Timer ---
    const timerDuracaoInput = document.getElementById('timerDuracao');
    const iniciarTimerBtn = document.getElementById('iniciarTimer');
    const pausarTimerBtn = document.getElementById('pausarTimer');
    const resetarTimerBtn = document.getElementById('resetarTimer');
    const tempoRestanteDisplay = document.getElementById('tempoRestante');

    let timerInterval;
    let tempoEmSegundos;
    let timerPausado = false;
    const somAlerta = new Audio('alarm.mp3'); 
    somAlerta.volume = 0.5; // Ajuste o volume, de 0.0 (mudo) a 1.0 (máximo)

    // --- Elementos do Popup Customizado ---
    const customAlertPopup = document.getElementById('customAlertPopup');
    const customAlertMessage = document.getElementById('customAlertMessage');
    const closeAlertPopupBtn = document.getElementById('closeAlertPopup');
    const okAlertButton = document.getElementById('okAlertButton');

    // Função para tentar carregar e pré-ativar o áudio
    function precarregarAudio() {
        // Tenta tocar e pausar o áudio com volume zero para contornar a política de autoplay
        somAlerta.volume = 0; // Temporariamente mudo
        somAlerta.play()
            .then(() => {
                somAlerta.pause();
                somAlerta.currentTime = 0; // Volta para o início
                somAlerta.volume = 0.5; // Restaura o volume original
                console.log("Áudio pré-carregado com sucesso.");
            })
            .catch(e => {
                console.warn("Não foi possível pré-carregar o áudio (política de autoplay):", e);
                // Se falhar aqui, ele provavelmente só vai tocar se o usuário interagir primeiro.
                // Mas a lógica de tocar no final ainda tentará.
            });
    }

    // Chame a função de pré-carregamento assim que o DOM estiver pronto
    precarregarAudio();

    // --- Lógica do Timer ---
    function formatarTempo(segundos) {
        const min = Math.floor(segundos / 60);
        const sec = segundos % 60;
        return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }

    function iniciarContagemRegressiva() {
        if (!timerPausado) {
            tempoEmSegundos = parseInt(timerDuracaoInput.value) * 60;
            if (isNaN(tempoEmSegundos) || tempoEmSegundos <= 0) {
                alert('Por favor, defina uma duração válida para o timer.');
                return;
            }
        }
        
        iniciarTimerBtn.style.display = 'none';
        pausarTimerBtn.style.display = 'inline-block';
        resetarTimerBtn.style.display = 'inline-block';
        timerDuracaoInput.disabled = true; // Desabilita o input durante a contagem

        timerInterval = setInterval(() => {
            tempoEmSegundos--;
            tempoRestanteDisplay.textContent = `Tempo Restante: ${formatarTempo(tempoEmSegundos)}`;

            if (tempoEmSegundos <= 0) {
                clearInterval(timerInterval);
                tempoRestanteDisplay.textContent = 'Tempo Esgotado!';
                tocarAlerta(); // Toca o som primeiro
                mostrarCustomPopupAlerta('🔔 ALERTA NOC: Hora de Postar a Atualização no Grupo! 🔔'); // Mostra o popup
                resetarTimerBotoes(); // Reseta os botões para "Iniciar Timer"
            }
        }, 1000);
        timerPausado = false;
    }

    function pausarTimer() {
        clearInterval(timerInterval);
        timerPausado = true;
        iniciarTimerBtn.textContent = 'Continuar Timer';
        iniciarTimerBtn.style.display = 'inline-block';
        pausarTimerBtn.style.display = 'none';
    }

    function resetarTimer() {
        clearInterval(timerInterval);
        tempoEmSegundos = parseInt(timerDuracaoInput.value) * 60; // Reseta para a duração configurada
        tempoRestanteDisplay.textContent = `Tempo Restante: ${formatarTempo(tempoEmSegundos)}`;
        timerPausado = false;
        resetarTimerBotoes();
    }

    function resetarTimerBotoes() {
        iniciarTimerBtn.style.display = 'inline-block';
        iniciarTimerBtn.textContent = 'Iniciar Timer';
        pausarTimerBtn.style.display = 'none';
        resetarTimerBtn.style.display = 'none';
        timerDuracaoInput.disabled = false; // Habilita o input novamente
    }

    function tocarAlerta() {
        somAlerta.currentTime = 0; // Garante que o som sempre comece do início
        somAlerta.volume = 0.8; // Garante que o volume esteja audível no momento do alerta
        somAlerta.play().catch(e => console.error("Erro ao tocar áudio no alerta:", e));
    }

    // --- Funções para o Popup Customizado ---
    function mostrarCustomPopupAlerta(message) {
        customAlertMessage.textContent = message;
        customAlertPopup.style.display = 'flex'; // Mostra o popup
    }

    function esconderCustomPopupAlerta() {
        customAlertPopup.style.display = 'none'; // Esconde o popup
    }

    // Event Listeners para os botões do popup
    closeAlertPopupBtn.addEventListener('click', esconderCustomPopupAlerta);
    okAlertButton.addEventListener('click', esconderCustomPopupAlerta);
    // Também esconde se clicar fora do conteúdo do popup (opcional)
    customAlertPopup.addEventListener('click', (event) => {
        if (event.target === customAlertPopup) {
            esconderCustomPopupAlerta();
        }
    });

    // ... (restante dos Event Listeners do timer) ...
    iniciarTimerBtn.addEventListener('click', iniciarContagemRegressiva);
    pausarTimerBtn.addEventListener('click', pausarTimer);
    resetarTimerBtn.addEventListener('click', resetarTimer);

    // Inicializa o display do timer com a duração padrão
    tempoEmSegundos = parseInt(timerDuracaoInput.value) * 60;
    tempoRestanteDisplay.textContent = `Tempo Restante: ${formatarTempo(tempoEmSegundos)}`;


    // --- O restante do seu código JavaScript (API e Gerador de Mensagens) permanece aqui ---

    const tipoNotificacao = document.getElementById('tipoNotificacao');
    const numeroIncidente = document.getElementById('numeroIncidente');
    const buscarDadosBtn = document.getElementById('buscarDados');
    const gerarMensagemBtn = document.getElementById('gerarMensagem');
    const copiarMensagemBtn = document.getElementById('copiarMensagem');
    const mensagemGerada = document.getElementById('mensagemGerada');

    // Campos comuns de crise
    const tituloCrise = document.getElementById('tituloCrise');
    const pasAfetadas = document.getElementById('pasAfetadas');
    const descricaoCrise = document.getElementById('descricaoCrise');
    const inicioCrise = document.getElementById('inicioCrise');

    // Campos específicos
    const linkConferencia = document.getElementById('linkConferencia');
    const atualizacaoCrise = document.getElementById('atualizacaoCrise');
    const terminoCrise = document.getElementById('terminoCrise');
    const duracaoCrise = document.getElementById('duracaoCrise');
    const causaDetectada = document.getElementById('causaDetectada');
    const motivoCausa = document.getElementById('motivoCausa');
    const solucaoAplicada = document.getElementById('solucaoAplicada');
    const participantesArea = document.getElementById('participantesArea');

    // Campos de link de internet
    const tituloLink = document.getElementById('tituloLink');
    const dataAberturaLink = document.getElementById('dataAberturaLink');
    const horarioAberturaLink = document.getElementById('horarioAberturaLink');
    const localidadeLink = document.getElementById('localidadeLink');
    const interligacaoLink = document.getElementById('interligacaoLink');
    const designacaoLink = document.getElementById('designacaoLink');
    const operadoraLink = document.getElementById('operadoraLink');
    const protocoloLink = document.getElementById('protocoloLink');
    const ordemServicoLink = document.getElementById('ordemServicoLink');
    const horarioChamadoOperadoraLink = document.getElementById('horarioChamadoOperadoraLink');
    const nivelEscalonamentoLink = document.getElementById('nivelEscalonamentoLink');
    const slaLink = document.getElementById('slaLink');
    // NOVO CAMPO: Referência ao campo de atualização de link de internet
    const atualizacaoLink = document.getElementById('atualizacaoLink'); 


    // Elementos de DIV para controlar visibilidade
    const camposCriseDiv = document.querySelector('.campos-crise');
    const camposAberturaCriseDiv = document.getElementById('camposAberturaCrise');
    const camposEmAndamentoCriseDiv = document.getElementById('camposEmAndamentoCrise');
    const camposFechamentoCriseDiv = document.getElementById('camposFechamentoCrise');
    const camposLinkInternetDiv = document.getElementById('camposLinkInternet');

    // Função para resetar a visibilidade de todos os campos específicos
    function resetarCampos() {
        camposCriseDiv.style.display = 'none';
        camposAberturaCriseDiv.style.display = 'none';
        camposEmAndamentoCriseDiv.style.display = 'none';
        camposFechamentoCriseDiv.style.display = 'none';
        camposLinkInternetDiv.style.display = 'none';
    }

    // Lógica para mostrar/esconder campos baseado no tipo de notificação
    tipoNotificacao.addEventListener('change', () => {
        const tipo = tipoNotificacao.value;
        resetarCampos(); // Esconde tudo primeiro

        if (tipo.includes('Crise')) {
            camposCriseDiv.style.display = 'block';
            if (tipo === 'aberturaCrise') {
                camposAberturaCriseDiv.style.display = 'block';
            } else if (tipo === 'emAndamentoCrise') {
                camposEmAndamentoCriseDiv.style.display = 'block';
            } else if (tipo === 'fechamentoCrise') {
                camposFechamentoCriseDiv.style.display = 'block';
            }
        } else if (tipo === 'linkInternet') {
            camposLinkInternetDiv.style.display = 'block';
        }
    });

    // --- Lógica para buscar dados da API do TOPdesk (Neoservice) ---
    buscarDadosBtn.addEventListener('click', async () => {
        const incidenteNum = numeroIncidente.value.trim();
        if (!incidenteNum) {
            alert('Por favor, insira o número do chamado para buscar.');
            return;
        }

        const apiUrl = `https://neoservice.neobpo.com.br/tas/api/incidents/number/${incidenteNum}`;
        const username = 'APITOPDESK';
        const password = '7haq5-l2znj-xdzgf-jpdpx-ovoz2';

        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
        headers.set('Content-Type', 'application/json');

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: headers,
            });

            if (!response.ok) {
                let errorDetails = response.statusText;
                try {
                    const errorJson = await response.json();
                    errorDetails = errorJson.message || errorDetails;
                } catch (e) { }
                alert(`Erro ao buscar dados do chamado: ${response.status} - ${errorDetails}`);
                console.error('Erro na resposta da API:', response);
                return;
            }

            const data = await response.json();
            console.log('Dados da API:', data);

            numeroIncidente.value = data.number || '';
            descricaoCrise.value = data.briefDescription || ''; 

            if (data.callDate) {
                const callDate = new Date(data.callDate);
                inicioCrise.value = `${String(callDate.getHours()).padStart(2, '0')}:${String(callDate.getMinutes()).padStart(2, '0')}`;
                dataAberturaLink.value = `${String(callDate.getDate()).padStart(2, '0')}/${String(callDate.getMonth() + 1).padStart(2, '0')}/${callDate.getFullYear()}`;
                horarioAberturaLink.value = `${String(callDate.getHours()).padStart(2, '0')}h${String(callDate.getMinutes()).padStart(2, '0')}`;
            }

            if (data.briefDescription) {
                tituloCrise.value = data.briefDescription;
                tituloLink.value = data.briefDescription;
            }

            alert('Dados do chamado (Número, Descrição, Início) preenchidos com sucesso! Preencha o restante manualmente.');

        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
            alert(`Falha ao buscar dados do chamado: ${error.message}. Verifique o console para mais detalhes. Por favor, preencha manualmente.`);
        }
    });

    // --- Lógica para gerar a mensagem final ---
    gerarMensagemBtn.addEventListener('click', () => {
        const tipo = tipoNotificacao.value;
        let mensagem = '';

        if (!tipo) {
            alert('Por favor, selecione o tipo de notificação.');
            return;
        }
        if (!numeroIncidente.value.trim()) {
            alert('Por favor, insira o número do Chamado.');
            return;
        }

        switch (tipo) {
            case 'aberturaCrise':
                if (!tituloCrise.value.trim() || !pasAfetadas.value.trim() || !descricaoCrise.value.trim() || !inicioCrise.value.trim() || !linkConferencia.value.trim()) {
                    alert('Por favor, preencha todos os campos para Notificação de Crise - Abertura.');
                    return;
                }
                mensagem = `${tituloCrise.value.trim()}\n\n` +
                           `*Status:* Abertura\n` +
                           `*PA's Afetadas:* ${pasAfetadas.value.trim()}\n` +
                           `*Descrição:* ${descricaoCrise.value.trim()}\n` +
                           `*Chamado:* ${numeroIncidente.value.trim()}\n` +
                           `*Início:* ${inicioCrise.value.trim()}\n\n` +
                           `*Link da Conferência:* ${linkConferencia.value.trim()}`;
                break;

            case 'emAndamentoCrise':
                if (!tituloCrise.value.trim() || !pasAfetadas.value.trim() || !descricaoCrise.value.trim() || !inicioCrise.value.trim() || !atualizacaoCrise.value.trim()) {
                    alert('Por favor, preencha todos os campos para Notificação de Crise - Em Andamento.');
                    return;
                }
                mensagem = `${tituloCrise.value.trim()}\n\n` +
                           `*Status:* Em andamento\n` +
                           `*PA's Afetadas:* ${pasAfetadas.value.trim()}\n` +
                           `*Descrição:* ${descricaoCrise.value.trim()}\n` +
                           `*Chamado:* ${numeroIncidente.value.trim()}\n` +
                           `*Início:* ${inicioCrise.value.trim()}\n\n` +
                           `*Atualização:*\n\n${atualizacaoCrise.value.trim()}`;
                break;

            case 'fechamentoCrise':
                if (!tituloCrise.value.trim() || !pasAfetadas.value.trim() || !descricaoCrise.value.trim() || !numeroIncidente.value.trim() || !inicioCrise.value.trim() || !terminoCrise.value.trim() || !duracaoCrise.value.trim() || !causaDetectada.value.trim() || !motivoCausa.value.trim() || !solucaoAplicada.value.trim() || !participantesArea.value.trim()) {
                    alert('Por favor, preencha todos os campos para Notificação de Crise - Fechamento.');
                    return;
                }
                mensagem = `${tituloCrise.value.trim()}\n\n` +
                           `*Status:* Fechamento\n` +
                           `*PA's Afetadas:* ${pasAfetadas.value.trim()}\n` +
                           `*Descrição:* ${descricaoCrise.value.trim()}\n` +
                           `*Chamado:* ${numeroIncidente.value.trim()}\n` +
                           `*Início:* ${inicioCrise.value.trim()}\n` +
                           `*Término:* ${terminoCrise.value.trim()}\n` +
                           `*Duração:* ${duracaoCrise.value.trim()}\n\n` +
                           `*Causa detectada:* ${causaDetectada.value.trim()}\n` +
                           `*Motivo da causa:* ${motivoCausa.value.trim()}\n` +
                           `*Solução Aplicada:* ${solucaoAplicada.value.trim()}\n\n` +
                           `*Lista de Participantes/Área:*\n${participantesArea.value.trim()}`;
                break;

            case 'linkInternet':
                if (!tituloLink.value.trim() || !dataAberturaLink.value.trim() || !numeroIncidente.value.trim() || !horarioAberturaLink.value.trim() || !localidadeLink.value.trim() || !interligacaoLink.value.trim() || !designacaoLink.value.trim() || !operadoraLink.value.trim() || !protocoloLink.value.trim() || !ordemServicoLink.value.trim() || !horarioChamadoOperadoraLink.value.trim() || !nivelEscalonamentoLink.value.trim() || !slaLink.value.trim() || !atualizacaoLink.value.trim()) { // Adicionado validação para o novo campo
                    alert('Por favor, preencha todos os campos para Notificação de Link de Internet, incluindo a Atualização.');
                    return;
                }
                mensagem = `${tituloLink.value.trim()}\n\n` +
                           `*Data Abertura:* ${dataAberturaLink.value.trim()}\n` +
                           `*Chamado interno:* ${numeroIncidente.value.trim()}\n` +
                           `*Horário abertura:* ${horarioAberturaLink.value.trim()}\n` +
                           `*Localidade:* ${localidadeLink.value.trim()}\n` +
                           `*Interligação:* ${interligacaoLink.value.trim()}\n` +
                           `*Designação:* ${designacaoLink.value.trim()}\n` +
                           `*Operadora:* ${operadoraLink.value.trim()}\n` +
                           `*Protocolo:* ${protocoloLink.value.trim()}\n` +
                           `*Ordem de Serviço:* ${ordemServicoLink.value.trim()}\n` +
                           `*Horário do chamado aberto junto a operadora:* ${horarioChamadoOperadoraLink.value.trim()}\n` +
                           `*Nível de Escalonamento:* ${nivelEscalonamentoLink.value.trim()}\n` +
                           `*SLA:* ${slaLink.value.trim()}\n\n` +
                           `*Atualização:*\n${atualizacaoLink.value.trim()}`; // Usando o valor do novo campo
                break;

            default:
                mensagem = 'Tipo de notificação inválido. Selecione um tipo para gerar a mensagem.';
        }
        mensagemGerada.textContent = mensagem;
    });

    // --- Lógica para copiar a mensagem para a área de transferência ---
    copiarMensagemBtn.addEventListener('click', () => {
        const textToCopy = mensagemGerada.textContent;
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    alert('Mensagem copiada para a área de transferência!');
                })
                .catch(err => {
                    console.error('Erro ao copiar a mensagem:', err);
                    alert('Falha ao copiar a mensagem. Por favor, copie manualmente (Ctrl+C ou Cmd+C).');
                });
        } else {
            alert('Nenhuma mensagem para copiar.');
        }
    });

    // Inicializa os campos ocultos ao carregar a página
    resetarCampos();
});