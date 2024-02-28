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

    

});