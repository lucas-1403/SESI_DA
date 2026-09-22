function updateClock() {
    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // Cálculos dos ângulos (360 graus divididos pelas frações de tempo)
    // Somamos a fração do próximo passo para o movimento ficar mais fluido
    const secondsDegrees = (seconds / 60) * 360;
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6);
    const hoursDegrees = ((hours % 12) / 12) * 360 + ((minutes / 60) * 30);

    // Seleciona os elementos e aplica a rotação baseada no centro horizontal X
    document.getElementById('second-hand').style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;
    document.getElementById('minute-hand').style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;
    document.getElementById('hour-hand').style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;
}

// Atualiza o relógio a cada 1000 milissegundos (1 segundo)
setInterval(updateClock, 1000);

// Executa a função imediatamente ao carregar a página para evitar o "delay" inicial
updateClock();
