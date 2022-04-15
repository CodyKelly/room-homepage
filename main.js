const STATES = {
  animationActive: 'animationActive',
  idle: 'idle',
};

let state = STATES.idle;

let slides = document.getElementsByClassName('slide');
let currentSlideIndex = 0;

// Get index of the slide to the left of the given index
function getLeftIndex(slideIndex) {
  if (slideIndex === 0) {
    return slides.length - 1;
  }

  return slideIndex - 1;
}

// Get index of the slide to the right of the given index
function getRightIndex(slideIndex) {
  if (slideIndex === slides.length - 1) {
    return 0;
  }

  return slideIndex + 1;
}

function slideLeft() {
  if (state !== STATES.idle) {
    return;
  }

  let currentSlide = slides[currentSlideIndex];
  let nextSlideIndex = getRightIndex(currentSlideIndex);
  let nextSlide = slides[nextSlideIndex]; // Slide to the right of the current slide

  state = STATES.animationActive; // Disable slides while animation is playing

  currentSlide.classList.add('slide-out-left'); // currentSlide slides out of frame
  nextSlide.classList.remove('inactive');
  nextSlide.classList.add('slide-in-left'); // And the slide to its right slides into frame

  let onAnimationEnd = () => {
    currentSlide.classList.remove('slide-out-left');
    currentSlide.classList.add('inactive');
    nextSlide.classList.remove('slide-in-left');
    currentSlideIndex = getRightIndex(currentSlideIndex);
    state = STATES.idle;
    currentSlide.removeEventListener('animationend', onAnimationEnd);
  };

  currentSlide.addEventListener('animationend', onAnimationEnd);
}

function slideRight() {
  if (state !== STATES.idle) {
    return;
  }

  let currentSlide = slides[currentSlideIndex];
  let nextSlideIndex = getLeftIndex(currentSlideIndex);
  let nextSlide = slides[nextSlideIndex]; // Slide to the left of the current slide

  state = STATES.animationActive; // Disable slides while animation is playing

  currentSlide.classList.add('slide-out-right'); // currentSlide slides out of frame
  nextSlide.classList.remove('inactive');
  nextSlide.classList.add('slide-in-right'); // And the slide to its left slides into frame

  let onAnimationEnd = () => {
    currentSlide.classList.remove('slide-out-right');
    currentSlide.classList.add('inactive');
    nextSlide.classList.remove('slide-in-right');
    currentSlideIndex = getLeftIndex(currentSlideIndex);
    state = STATES.idle;
    currentSlide.removeEventListener('animationend', onAnimationEnd);
  };

  currentSlide.addEventListener('animationend', onAnimationEnd);
}
