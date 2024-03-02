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
    let rest = false;

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

    function runTimer() {
        timer = setInterval(() => {
            timeLeft -= 1;
            if (timeLeft < 0) {
                timerRunning = false;
                clearInterval(timer);
                if (!rest) {
                    rest = true;
                    //timeLeft = 5 * 60;
                    timeLeft = 5;
                    alert('Break!');
                }
                else {
                    rest = false;
                    timeLeft = 25 * 60;
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

    function startTimer() {
        if (!timerRunning) { 
            timerRunning = true;
            paused = false;
            runTimer();
        }
    }

    function pauseTimer() {
        if (timerRunning) {
            clearInterval(timer);
            paused = true;
            timerRunning = false;
            pauseButton.textContent = 'Resume';
            document.getElementById("pauseButton").style.textAlign = "center";
        }
        else {
            pauseButton.textContent = 'Pause';
            timerRunning = true;
            startTimer();
        }
    }

    function resetTimer() {
        clearInterval(timer);
        // timeLeft = 25 * 60;
        timeLeft = 5;
        displayTimeLeft(timeLeft);
        timerRunning = false;
        paused = false;
        rest = false;
        pauseButton.textContent = 'Pause';
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
});
