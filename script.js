document.addEventListener('DOMContentLoaded', (event) => {
    let startTime;
    let updatedTime;
    let difference;
    let timerInterval;
    let running = false;

    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const millisecondsDisplay = document.getElementById('milliseconds');
    const lapsContainer = document.getElementById('laps');

    function startTimer() {
        if (!running) {
            startTime = new Date().getTime() - (difference || 0);
            timerInterval = setInterval(updateTimer, 10);
            running = true;
        }
    }

    function pauseTimer() {
        if (running) {
            clearInterval(timerInterval);
            running = false;
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        running = false;
        difference = 0;
        minutesDisplay.textContent = '00';
        secondsDisplay.textContent = '00';
        millisecondsDisplay.textContent = '00';
        lapsContainer.innerHTML = '';
    }

    function updateTimer() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;

        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        let milliseconds = Math.floor((difference % 1000) / 10);

        minutesDisplay.textContent = (minutes < 10) ? '0' + minutes : minutes;
        secondsDisplay.textContent = (seconds < 10) ? '0' + seconds : seconds;
        millisecondsDisplay.textContent = (milliseconds < 10) ? '0' + milliseconds : milliseconds;
    }

    function recordLap() {
        if (running) {
            const lapTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
            const lapItem = document.createElement('li');
            lapItem.textContent = lapTime;
            lapsContainer.appendChild(lapItem);
        }
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    lapButton.addEventListener('click', recordLap);
});
