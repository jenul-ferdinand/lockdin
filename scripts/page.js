document.addEventListener('DOMContentLoaded', function () {


    
    // FUNCTION: Returns current date as string
    function getCurrentDate() {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    }

    // FUNCTION: Returns a random string from monashFacts list
    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * monashFacts.length);
        return monashFacts[randomIndex];
    }

    // Array of Monash University facts
    const monashFacts = [
        "Named after WWI hero Sir John Monash.",
        "Australia's large university with global impact.",
        "Medical breakthroughs and healthcare leader.",
        "Global presence with campuses worldwide.",
        "Innovation hub in the Monash Technology Precinct.",
        "Ties to Nobel laureates and academic excellence.",
        "Prioritizes sustainability and cutting-edge research.",
        "Diverse student body for an inclusive academic environment."
    ];

    // Display the current date
    document.getElementById('date').textContent = getCurrentDate();

    // Display a random funny quote
    document.getElementById('quote').textContent = getRandomQuote();
    


    // Pomodoro properties
    let timer;
    let timeLeft = 25 * 60; // Initial time: 25 minutes, will make custom
    let timerRunning = false;
    let paused = false;
    let rest = false;

    const timeDisplay = document.getElementById('time');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button');
    const pauseButton = document.getElementById('pause-button');

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
            timerRunning = true;
            paused = false;
            runTimer();
        }
    }

    // FUNCTION: Pause pomodoro
    function pauseTimer() {
        if (!paused) {
            clearInterval(timer);
            paused = true;
            timerRunning = false;
            pauseButton.textContent = 'Resume';
        }
        else {
            pauseButton.textContent = 'Pause';
            paused = false;
            startTimer();
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
