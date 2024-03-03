document.addEventListener('DOMContentLoaded', function () {

    // Pomodoro properties
    let timer;
    let timeLeft = 25 * 60; // Initial time: 25 minutes
    let timerRunning = false;
    let paused = false;
    let rest = false;

    const timeDisplay = document.getElementById('time');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button');
    const pauseButton = document.getElementById('pause-button');
    const logo = document.getElementById("logo");
    const titleCard = document.getElementById("titlecard");

    // FUNCTION: Change Logo Type
    function logoOn(bool) {
        logo.style.opacity = 0;
        titleCard.style.opacity = 0;

        setTimeout(() => {
            logo.src = bool ? "assets/page/logo-on.png" : "assets/page/logo-off.png";
            titleCard.src = bool ? "assets/page/title-card.png" : "assets/page/title-card-dark.png";

            titleCard.style.opacity = 1;
            logo.style.opacity = 1;
        }, 300);
    }

    // FUNCTION: Display pomodoro time left
    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
        timeDisplay.textContent = display;
    }

    // FUNCTION: Pomodoro run timer
    function runTimer() {
        timer = setInterval(() => {
            timeLeft -= 1;
            if (timeLeft < 0) {
                timerRunning = false;
                clearInterval(timer);
                if (!rest) {
                    rest = true;
                    timeLeft = breakTimeSeconds;
                    alert('Break!');
                }
                else {
                    rest = false;
                    timeLeft = studyTimeSeconds;
                    alert('Begin!');
                }
                displayTimeLeft(timeLeft);
                startTimer();
            }
            else {
                displayTimeLeft(timeLeft);
            }
        }, 1000);
    }

    // FUNCTION: Start pomodoro
    function startTimer() {
        if (!timerRunning) {
            if (paused){
                pauseButton.textContent = 'Pause';
            }
            timerRunning = true;
            paused = false;
            runTimer();
            logoOn(true);
        }
        
    }

    // FUNCTION: Pause pomodoro
    function pauseTimer() {
        if (!paused) {
            if (timerRunning){
            clearInterval(timer);
            paused = true;
            timerRunning = false;
            pauseButton.textContent = 'Resume';

            logoOn(false);
            }
        }
        else {
            pauseButton.textContent = 'Pause';
            paused = false;
            startTimer();

            logoOn(true);
        }
    }

    // FUNCTION: Reset pomodoro
    function resetTimer() {
        clearInterval(timer);
        if (typeof studyTimeSeconds === 'undefined') {
            timeLeft = 25 * 60;
        }
        else {
            timeLeft = studyTimeSeconds;
        }
        displayTimeLeft(timeLeft);
        timerRunning = false;
        paused = false;
        rest = false;
        pauseButton.textContent = 'Pause';

        logoOn(false);
    }

    // Add event listeners for pomdoro functions
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);

    // POMODORO MODAL SETTINGS
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        })    
    })

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
    })

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        })    
    })

    function openModal(modal) {
        if (modal == null) return
        modal.classList.add('active');
        overlay.classList.add('active');
    }

    function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }

    const saveButton = document.getElementById('custom-save-button');

    function saveTimerValues() {
        let studyTimeInput = document.getElementById('custom-modal-input-study');
        let breakTimeInput = document.getElementById('custom-modal-input-break');

        let studyTime = parseInt(studyTimeInput.value);
        let breakTime = parseInt(breakTimeInput.value);

        if (studyTime <= 0 || studyTime > 999 || isNaN(studyTime)) {
            alert("Invalid study time");
            return;
        }

        if (breakTime <= 0 || breakTime > 999 || isNaN(breakTime)) {
            alert("Invalid break time");
            return;
        }

        window.studyTimeSeconds = studyTime * 60;
        window.breakTimeSeconds = breakTime * 60;

        resetTimer();
    }

    saveButton.addEventListener('click', saveTimerValues);
});
