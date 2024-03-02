document.addEventListener('DOMContentLoaded', function() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => moveToPage(index + 1));
  });

  moveToPage(currentPage); // Initialize
});


let currentPage = 1

function moveToPage(pageNumber) {
  currentPage = pageNumber;
  const pages = document.querySelectorAll('.page');

  // Hide all pages
  pages.forEach((page) => {
    page.style.display = 'none';
  });

  // Show the selected page
  const selectedPage = document.getElementById(`page${currentPage}`);
  selectedPage.style.display = 'block';

  updatePaginationDots();
}

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





