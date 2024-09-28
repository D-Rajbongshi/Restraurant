let currentSlide = 0;
const totalSlides = 6;
let screenMode = 'large'; // Initial screen mode
let indicatorsContainer = document.querySelector('.carousel-indicators');

// Function to update the number of indicators based on screen size
function updateIndicators() {
    indicatorsContainer.innerHTML = '';

    // Determine the number of indicators based on screen size
    const numOfIndicators = screenMode === 'small' ? totalSlides : screenMode === 'medium' ? 3 : 2;

    for (let i = 0; i < numOfIndicators; i++) {
        const indicator = document.createElement('span');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active'); // First indicator is active
        indicator.dataset.slide = i;

        // Add click event listener to indicators
        indicator.addEventListener('click', () => moveToSlide(i));

        indicatorsContainer.appendChild(indicator);
    }
}

// Function to move to a specific slide
function moveToSlide(slideIndex) {
    const carouselSlide = document.querySelector('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    let maxSlides;

    if (screenMode === 'small') {
        maxSlides = totalSlides - 1; // 1 slide per view
    } else if (screenMode === 'medium') {
        maxSlides = Math.ceil(totalSlides / 2) - 1; // 2 slides per view
    } else {
        maxSlides = Math.ceil(totalSlides / 3) - 1; // 3 slides per view
    }

    // Ensure slideIndex doesn't exceed the maxSlides
    slideIndex = Math.min(slideIndex, maxSlides);

    // Adjust carousel sliding based on screen mode
    if (screenMode === 'small') {
        carouselSlide.style.transform = `translateX(-${slideIndex * 100}%)`; // Move 1 card at a time
    } else if (screenMode === 'medium') {
        carouselSlide.style.transform = `translateX(-${slideIndex * 100}%)`; // Move 2 cards at a time
    } else {
        carouselSlide.style.transform = `translateX(-${slideIndex * 100}%)`; // Move 3 cards at a time
    }

    // Update active indicator
    indicators.forEach(indicator => indicator.classList.remove('active'));
    if (indicators[slideIndex]) indicators[slideIndex].classList.add('active');

    currentSlide = slideIndex;
}

// Auto-slide function
function autoSlide() {
    const maxSlides = screenMode === 'small' ? totalSlides - 1 : screenMode === 'medium' ? Math.ceil(totalSlides / 2) - 1 : Math.ceil(totalSlides / 3) - 1;
    currentSlide = (currentSlide + 1) % (maxSlides + 1);
    moveToSlide(currentSlide);
}

// Function to detect screen size and update layout
function updateSliderLayout() {
    const windowWidth = window.innerWidth;

    // Update screen mode based on window width
    if (windowWidth <= 576) {
        screenMode = 'small'; // 1 card at a time
    } else if (windowWidth <= 992) {
        screenMode = 'medium'; // 2 cards at a time
    } else {
        screenMode = 'large'; // 3 cards at a time
    }

    // Update indicators
    updateIndicators();

    // Reset the slider position when layout changes
    moveToSlide(0);
}

// Listen for window resize and update layout accordingly
window.addEventListener('resize', updateSliderLayout);

// Initial layout setup
updateSliderLayout();

// Auto-slide every 6 seconds
setInterval(autoSlide, 6000);


// navbar toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const navBar = document.querySelector('.navbar');
    
    // Toggle the 'active' class for the hamburger and nav links
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    navBar.classList.toggle('navHeight');
}
