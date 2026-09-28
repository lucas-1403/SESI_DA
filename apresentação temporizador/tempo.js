// Elementos DOM
const clockFace = document.querySelector('#clockFace');
const ticksContainer = document.querySelector('#ticksContainer');
const minuteHand = document.querySelector('#minuteHand');
const secondHand = document.querySelector('#secondHand');
const digitalDisplay = document.querySelector('#digitalDisplay');
const inputMinutes = document.querySelector('#inputMinutes');
const inputSeconds = document.querySelector('#inputSeconds');
const btnSet = document.querySelector('#btnSet');
const btnStart = document.querySelector('#btnStart');
const btnPause = document.querySelector('#btnPause');
const btnReset = document.querySelector('#btnReset');
const statusBadge = document.querySelector('#statusBadge');

// Estado
let totalSeconds = 30;
let remainingSeconds = 30;
let isRunning = false;
let timerInterval = null;

const STORAGE_KEY = 'analog_timer_state';

// Criação dinâmica dos marcadores radiais (Repetição com for)
function createClockTicks() {
    ticksContainer.innerHTML = '';
    for (let i = 0; i < 60; i++) {
        const tick = document.createElement('div');
        tick.className = 'tick';
        
        // Condicional if/else
        if (i % 5 === 0) {
            tick.classList.add('major');
        }
        
        tick.style.transform = `rotate(${i * 6}deg)`;
        ticksContainer.appendChild(tick);
    }
}

// Emissão de som via Web Audio API
function playAlarmSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        for (let i = 0; i < 3; i++) {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, audioCtx.currentTime + (i * 0.3));
            
            gain.gain.setValueAtTime(0.3, audioCtx.currentTime + (i * 0.3));
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (i * 0.3) + 0.2);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start(audioCtx.currentTime + (i * 0.3));
            osc.stop(audioCtx.currentTime + (i * 0.3) + 0.2);
        }
    } catch (e) {
        console.log('Erro de áudio:', e);
    }
}

// Atualiza Ponteiros e Relógio Digital
function updateDisplay() {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;

    digitalDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    // Ângulos dos ponteiros em graus
    const secondDeg = secs * 6;
    const minuteDeg = (mins * 6) + (secs * 0.1);

    secondHand.style.transform = `rotate(${secondDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
}

function updateUIState() {
    if (isRunning) {
        btnStart.disabled = true;
        btnStart.classList.add('opacity-50', 'cursor-not-allowed');
        btnPause.disabled = false;
        btnPause.classList.remove('opacity-50', 'cursor-not-allowed');
        statusBadge.textContent = '⏱️ Em execução...';
        statusBadge.className = 'inline-block text-xs font-semibold px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50';
    } else {
        btnStart.disabled = false;
        btnStart.classList.remove('opacity-50', 'cursor-not-allowed');
        btnPause.disabled = true;
        btnPause.classList.add('opacity-50', 'cursor-not-allowed');
        
        if (remainingSeconds === 0) {
            statusBadge.textContent = '🚨 Tempo Esgotado!';
            statusBadge.className = 'inline-block text-xs font-semibold px-3 py-1 rounded-full bg-rose-900/60 text-rose-300 border border-rose-700/50';
        } else if (remainingSeconds < totalSeconds) {
            statusBadge.textContent = '⏸️ Pausado';
            statusBadge.className = 'inline-block text-xs font-semibold px-3 py-1 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50';
        } else {
            statusBadge.textContent = 'Pronto para iniciar';
            statusBadge.className = 'inline-block text-xs font-semibold px-3 py-1 rounded-full bg-slate-700 text-slate-300';
        }
    }
}

// Grava estado no localStorage
function saveStateToLocalStorage() {
    const state = {
        totalSeconds,
        remainingSeconds,
        isRunning,
        lastSavedTime: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Carrega dados e compensa tempo se a página for recarregada rodando
function loadStateFromLocalStorage() {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) return;

    try {
        const state = JSON.parse(savedState);
        totalSeconds = state.totalSeconds || 30;
        
        if (state.isRunning && state.lastSavedTime) {
            const elapsedSeconds = Math.floor((Date.now() - state.lastSavedTime) / 1000);
            remainingSeconds = Math.max(0, state.remainingSeconds - elapsedSeconds);
        } else {
            remainingSeconds = state.remainingSeconds !== undefined ? state.remainingSeconds : totalSeconds;
        }

        inputMinutes.value = Math.floor(totalSeconds / 60);
        inputSeconds.value = totalSeconds % 60;

        if (state.isRunning && remainingSeconds > 0) {
            startTimer();
        } else {
            updateDisplay();
            updateUIState();
        }
    } catch (e) {
        console.error("Erro ao carregar localStorage:", e);
    }
}

function tick() {
    if (remainingSeconds > 0) {
        remainingSeconds--;
        updateDisplay();
        saveStateToLocalStorage();
    } else {
        pauseTimer();
        clockFace.classList.add('alarm-active');
        playAlarmSound();
        updateUIState();
    }
}

function startTimer() {
    if (isRunning || remainingSeconds <= 0) return;
    
    clockFace.classList.remove('alarm-active');
    isRunning = true;
    timerInterval = setInterval(tick, 1000);
    updateUIState();
    saveStateToLocalStorage();
}

function pauseTimer() {
    if (!isRunning) return;
    
    isRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    updateUIState();
    saveStateToLocalStorage();
}

function resetTimer() {
    pauseTimer();
    clockFace.classList.remove('alarm-active');
    remainingSeconds = totalSeconds;
    updateDisplay();
    updateUIState();
    saveStateToLocalStorage();
}

function setCustomTime() {
    const mins = parseInt(inputMinutes.value) || 0;
    const secs = parseInt(inputSeconds.value) || 0;
    const calculatedTotal = (mins * 60) + secs;

    if (calculatedTotal <= 0) {
        alert('Defina um tempo maior que 0.');
        return;
    }

    pauseTimer();
    clockFace.classList.remove('alarm-active');
    totalSeconds = calculatedTotal;
    remainingSeconds = calculatedTotal;
    updateDisplay();
    updateUIState();
    saveStateToLocalStorage();
}

btnStart.addEventListener('click', startTimer);
btnPause.addEventListener('click', pauseTimer);
btnReset.addEventListener('click', resetTimer);
btnSet.addEventListener('click', setCustomTime);

window.addEventListener('load', () => {
    createClockTicks();
    updateDisplay();
    loadStateFromLocalStorage();
});