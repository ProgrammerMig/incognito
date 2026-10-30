/* Elementos HTML */
const question_n = document.getElementById("question-number")
const question_txt = document.getElementById("question")
const contador = document.getElementById("contador")
const buttons = document.getElementById("buttons")

const popup = document.getElementById("popup")

const incognito_txt = document.getElementById("incognito-dialog")
const incognito = document.getElementById("incognito")

const suspeita = document.getElementById("suspeita")
const q_sim = document.getElementById("q_sim")
const veredito = document.getElementById("veredito")

/* Outras variáveis */
let sim = 0
let incognitoSuspeita = ''
let tempo = 30
let pergunta = 1
let perguntas = [
    "Você conhecia a vitma?",
    "Você já teve passagem pela polícia?",
    "Você costuma sair tarde da noite?",
    "Você vai ao centro da cidade com frequência?",
    "Você gosta da cor verde?",
    "Você já cometeu algum furto? Pequeno que seja.",
    "Você pega o trem com frequência durante sua semana?",
    'Você se considera ter "sangue frio"?',
    "Você já fez uso de drogas ilícitas?",
    "Você tem escolaridade incompleta?"
]

let ended = false

let incognitoState = 'n'

/* Declaração do contador pra poder ser resetado a cada troca */
count = setInterval(() => {}, 1000)

/* Fazer a animação de falar e mudar as expressões */
function incognitoTalk(final){
    /* Feliz */
    if(final == 'Agree'){
        incognito.classList.add('i-talk')
        incognito.src = `assets/incognito/incognito_a_talk.png`
        setTimeout(() => {
            incognito.classList.remove('i-talk')
            incognito.src = `assets/incognito/incognito_a.png`
        }, 500)
    /* Normal */
    } else if (final == 'Normal') {
        incognito.classList.add('i-talk')
        incognito.src = `assets/incognito/incognito_n_talk.png`
        setTimeout(() => {
            incognito.classList.remove('i-talk')
            incognito.src = `assets/incognito/incognito_n.png`
        }, 500)
    /* Em dúvida */
    } else if (final == 'Doubt') {
        incognito.classList.add('i-talk')
        incognito.src = `assets/incognito/incognito_d_talk.png`
        setTimeout(() => {
            incognito.classList.remove('i-talk')
            incognito.src = `assets/incognito/incognito_d.png`
        }, 500)
    /* Com raiva */
    } else if (final == 'Rage') {
        incognito.classList.add('i-talk')
        incognito.src = `assets/incognito/incognito_r_talk.png`
        setTimeout(() => {
            incognito.classList.remove('i-talk')
            incognito.src = `assets/incognito/incognito_r.png`
        }, 500)
    /* Automático conforme a suspeita */
    } else {
        incognito.classList.add('i-talk')
        incognito.src = `assets/incognito/incognito_${incognitoState}_talk.png`
        setTimeout(() => {
            incognito.classList.remove('i-talk')
            incognito.src = `assets/incognito/incognito_${incognitoState}.png`
        }, 500)
    }

}

/* Ciclo do teste */
function fazerPergunta(){
    tempo = 30
    /* Resultado pós-teste */
    if (pergunta == 11){
        /* Finaliza o teste. */
        ended = true

        contador.innerText = `--:--`
        question_n.innerText = `Fim do teste.`
        question_txt.innerText = `Obrigado pela cooperação.`

        /* Muda a cor do contador baseada na Suspeita/Veredito */
        if(sim < 5){
            // Baixa, Inocente
            contador.style.color = `var(--i_agree)`
        } else if (sim == 5){
            // Média, Suspeito
            contador.style.color = `var(--i_doubt)`
        } else if (sim >= 6 && sim <= 8){
            // Alta, Cúmplice
            contador.style.color = `var(--i_uhoh)`
        } else if (sim >= 9 && sim <= 10){
            // CULPADO.
            contador.style.color = `var(--i_enrage)`
        }

        /* Diálogo do Incognito + Veredito final */
        setTimeout(()=>{
            incognito_txt.innerText = `INCOGNITO: De acordo com as suas respostas...`
            incognitoTalk('Normal')
        }, 1000)
        if (sim < 5) {
            /* Best Ending */
            setTimeout(()=>{
                incognito_txt.innerText = `INCOGNITO: Você demonstrou baixo índice de envolvimento com o caso.`
                incognitoTalk('Agree')
            }, 2000)
            setTimeout(()=>{
                incognito_txt.innerText = `INCOGNITO: Você agora está liberado para deixar a sala.`
                incognitoTalk('Agree')
            }, 5000)
            setTimeout(()=>{
                incognito_txt.innerText = `INCOGNITO: Obrigado pela cooperação.`
                incognitoTalk('Agree')

                veredito.innerText = `Inocente.`
                veredito.style.color = `var(--i_agree)`
            }, 7000)
        } else if (sim == 5){
            /* Good Ending */
            setTimeout(()=>{
                incognito_txt.innerText = `INCOGNITO: Você ainda é considerado suspeito.`
                incognitoTalk('Doubt')
            }, 2000)
            setTimeout(()=>{
                incognito_txt.innerText = `INCOGNITO: Entretanto . . .`
                incognitoTalk('Normal')
            }, 4000)
            setTimeout(()=>{
                incognito_txt.innerText = `INCOGNITO: Ainda será liberado, você será investigado mais a fundo e, se houver necessdade, fará outro teste.`
                incognitoTalk('Doubt')
            }, 6000)
            setTimeout(()=>{
                incognito_txt.innerText = `INCOGNITO: Está dispensado.`
                incognitoTalk('Normal')

                veredito.innerText = `Suspeito.`
                veredito.style.color = `var(--i_doubt)`
            }, 10000)
        } else if (sim >= 6 && sim <= 8) {
            /* Bad Ending */
            setTimeout(()=>{
                incognito_txt.innerText = `INCOGNITO: Você apresentou alto índice de envolvimento com o caso.`
                incognitoTalk('Rage')
            }, 2000)
            setTimeout(()=>{
                incognito_txt.innerText = `INCOGNITO: Apesar de não ter certeza se você é de fato o criminoso ou não.`
                incognitoTalk('Doubt')
            }, 5000)
            setTimeout(()=>{
                incognito_txt.innerText = `INCOGNITO: Vou pedir para acompanhar os políciais até a delegacia.`
                incognitoTalk('Rage')

                veredito.innerText = `Cúmplice.`
                veredito.style.color = `var(--i_uhoh)`
            }, 8000)
        } else if (sim >= 9 && sim <= 10) {
            /* Guilty Ending */
            setTimeout(()=>{
                incognito_txt.innerHTML = `INCOGNITO: Você é considerado <span style="color: var(--i_enrage)">culpado</span>.`
                incognitoTalk('Rage')
            }, 2000)
            setTimeout(()=>{
                incognito_txt.innerText = `INCOGNITO: Peço que acompanhe os políciais até a delegacia.`
                incognitoTalk('Rage')
            }, 4000)
            setTimeout(()=>{
                incognito_txt.innerText = `INCOGNITO: Espero que aproveite o seu tempo <span style="color: var(--i_enrage)">apodrecendo</span> na prisão.`
                incognitoTalk('Rage')

                veredito.innerText = `Culpado.`
                veredito.style.color = `var(--i_enrage)`
            }, 7000)
        }
    } else {
        question_n.innerText = ``
        question_txt.innerText = ``

        /* Muda a frase dependendo da suspeita */
        if (incognitoSuspeita == 'Baixa.'){
            incognito_txt.innerText = `INCOGNITO: Ok . . .`
        } else if(incognitoSuspeita == 'Média.'){
            incognito_txt.innerText = `INCOGNITO: Mhm . . .`
        } else if(incognitoSuspeita == 'Alta.') {
            incognito_txt.innerText = `INCOGNITO: Certo . . .`
        } else if(incognitoSuspeita == 'Culpado.'){
            incognito_txt.innerText = `INCOGNITO: Entendi . . .`
        } else{
            incognito_txt.innerText = `INCOGNITO: Vamos começar.`
        }

        /* Ciclo de perguntas */
        setTimeout(()=>{
            incognito_txt.innerText = `INCOGNITO: Me responda . . .`
            incognitoTalk()
        }, 1000)
        setTimeout(()=>{
            incognito_txt.innerText = `INCOGNITO: ${perguntas[pergunta-1]}`
            incognitoTalk()
        }, 2000)

        setTimeout(() => {
            count = setInterval(() => {
                /* Mostra os botões */
                buttons.classList.remove("fade-out")
                buttons.classList.add("fade-in")

                /* Mostra a pergunta para o usuário */
                question_n.innerText = `${pergunta}ª pergunta`
                question_txt.innerText = perguntas[pergunta-1]

                if(tempo >= 0){
                /* Ajusta o contador para aparecer corretamente. */
                    if(tempo >= 10){
                        contador.innerText = `00:${tempo}`
                    } else {
                        contador.innerText = `00:0${tempo}`
                    }

                /* Muda a cor do contador caso o tempo seja entre 0 e 10. */
                    if(tempo <= 10){
                        contador.style.color = `var(--i_enrage)`
                    } else {
                        contador.style.color = `var(--gray)`
                    }

                /* Verifica se o tempo acabou. */
                    if(tempo == 0){
                        clearInterval(count)
                        resposta('sim')
                    } else {
                        tempo = tempo - 1
                    }
                }
            }, 1000)
        }, 2250)

    }

}

/* Tira o popup de instruções */
function comecarTeste(){
    popup.classList.add('fade-out')
    fazerPergunta()
    incognitoTalk()
}

/* Resposta e estatísticas */
function resposta(resposta){
    /* Reseta o contador da pergunta anterior */
    clearInterval(count)

    /* Some com os botões */
    buttons.classList.remove("fade-in")
    buttons.classList.add("fade-out")

    /* Conta quantos 'Sim' o usuário respondeu. */
    if(resposta == 'sim' && pergunta < 11){
        sim += 1
    }
    /* Suspeita do Incógnito */
    if(sim < 5){
        incognitoSuspeita = 'Baixa.'
        incognitoState = 'n'
    } else if (sim == 5){
        incognitoSuspeita = 'Média.'
        incognitoState = 'd'
        suspeita.style.color = `var(--i_doubt)`
    } else if (sim >= 6 && sim <= 8){
        incognitoSuspeita = 'Alta.'
        incognitoState = 'd'
        suspeita.style.color = `var(--i_uhoh)`
    } else if (sim >= 9 && sim <= 10){
        incognitoSuspeita = 'Culpado.'
        incognitoState = 'r'
        suspeita.style.color = `var(--i_enrage)`
    }
    /* Muda as estatísticas */
    suspeita.innerText = `Suspeita do Incognito: ${incognitoSuspeita}`
    q_sim.innerText = `Quantidade de respostas sim: ${sim}`

    /* Muda a pergunta */
    if(pergunta <= 10){
        pergunta += 1
        fazerPergunta()
        incognitoTalk()
    }
}