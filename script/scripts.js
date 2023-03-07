import selecionaCotacao from "./imprimeCotacao.js"

const graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar  = new Chart(graficoDolar, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dólar',
            data: [],
            borderWidth: 1
        }]
    },
});

function geraHorario() {
    let date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function adicionarDados(grafico, legenda, dados) {
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    })
    grafico.update();
}

let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');
workerDolar.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("dolar", valor);
    adicionarDados(graficoParaDolar, tempo, valor);
})

const graficoIene = document.getElementById('graficoIene');
const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Iene',
            data: [],
            borderWidth: 1
        }]
    },
});

let workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage('jpy');
workerIene.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("iene", valor);
    adicionarDados(graficoParaIene, tempo, valor);
})

const graficoBitcoin = document.getElementById('graficoBitcoin');
const graficoParaBitcoin = new Chart(graficoBitcoin, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Bitcoin',
            data: [],
            borderWidth: 1
        }]
    },
});

let workerBitcoin = new Worker('./script/workers/workerBitcoin.js');
workerBitcoin.postMessage('btc');
workerIene.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("bitcoin", valor);
    adicionarDados(graficoParaBitcoin, tempo, valor);
})

