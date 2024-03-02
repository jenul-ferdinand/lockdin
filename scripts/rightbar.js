// Current page
let currentPage = 1



// EVENT LISTENER FUNCTION: When the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
	// Store all dots class html elements
	const dots = document.querySelectorAll('.dot');

	// For every dot assign an event listener to go to their respective page
	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => moveToPage(index + 1));
	});

	// Move to the first page
	moveToPage(currentPage); // Initialize
	// ARROW FUNCTIONALITY
	const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');

    leftArrow.addEventListener('click', function() {
        // If we're on the first page, wrap to the last page
        if (currentPage === 1) {
            moveToPage(dots.length);
        } else {
            // Otherwise, just move one page to the left
            moveToPage(currentPage - 1);
        }
	})

	rightArrow.addEventListener('click', function() {
        // If we're on the last page, wrap to the first page
        if (currentPage === dots.length) {
            moveToPage(1);
        } else {
            // Otherwise, just move one page to the right
            moveToPage(currentPage + 1);
        }
    });
});



// FUNCTION: Moving to pages based on the page number
function moveToPage(pageNumber) {
	// Set the current page to the page number we want to go to
	currentPage = pageNumber;

	// Store all page class elements 
	const pages = document.querySelectorAll('.page');

	// Hide all pages
	pages.forEach((page) => {
		page.style.display = 'none';
	});

	// Show the selected page
	const selectedPage = document.getElementById(`page${currentPage}`);
	selectedPage.style.display = 'block';

	// Update the current dot
	updatePaginationDots();
}



// FUNCTION: For changing the dots at the bottom
function updatePaginationDots() {
	const dots = document.querySelectorAll('.dot');
	dots.forEach((dot, index) => {
	if (index + 1 === currentPage) {
		dot.classList.add('active');
	} else {
		dot.classList.remove('active');
	}
	});
}
