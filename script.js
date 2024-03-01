document.addEventListener('DOMContentLoaded', function () {
    // Function to get the current date
    function getCurrentDate() {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return today.toLocaleDateString('en-US', options);
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

    // Function to get a random quote
    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * monashFacts.length);
        return monashFacts[randomIndex];
    }

    // Display the current date
    document.getElementById('date').textContent = getCurrentDate();

    // Display a random funny quote
    document.getElementById('quote').textContent = getRandomQuote();
    

    let timer;
    let timeLeft = 25 * 60; // Initial time: 25 minutes, will make custom
    let timerRunning = false;
    let paused = false;

    const timeDisplay = document.getElementById('time');
    const startButton = document.getElementById('startButton');
    const resetButton = document.getElementById('resetButton');
    const customButton = document.getElementById('customButton');

    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
        timeDisplay.textContent = display;
    }

    function startTimer() {
        if (!timerRunning) {
            if (paused) {
                timeLeft -= Math.floor((Date.now() - startTime) / 1000);
            }   
            timer = setInterval(() => {
                timeLeft--;
                if (timeLeft < 0) {
                    clearInterval(timer);
                    alert('Time\'s up!');
                    resetTimer();
                }
                displayTimeLeft(timeLeft);
            }, 1000);
            timerRunning = true;
            paused = false;
        }
    }

    function pauseTimer() {
        if (timerRunning) {
            clearInterval(timer);
            startTime = Date.now();
            paused = true;
            timerRunning = false;
            pauseButton.textContent = 'Resume';
            document.getElementById("pauseButton").style.textAlign = "center";
        }
        else {
            startTimer();
            pauseButton.textContent = 'Pause';
        }
    }

    function resetTimer() {
        clearInterval(timer);
        timeLeft = 25 * 60;
        displayTimeLeft(timeLeft);
        timerRunning = false;
        paused = false;
        pauseButton.textContent = 'Pause';
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
});
