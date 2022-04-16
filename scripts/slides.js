animationActive = false;

// HTML slide containers
let slideContainers = document.getElementsByClassName('slide--container');
slideContainers = Array.from(slideContainers);

// Array of objects containing data for each individual slide container
let containers = [];

// Create a new object for each slide container on the page
for (let i = 0; i < slideContainers.length; i++) {
  let children = slideContainers[i].children;
  children = Array.from(children);
  containers.push({
    currentSlideIndex: 0,
    slides: children.filter((child) => {
      // Get only children that are slides
      return child.classList.contains('slide');
    }),
  });
}

// Get index of the slide to the left of the given index
function getLeftIndex(slideIndex, slides) {
  if (slideIndex === 0) {
    return slides.length - 1;
  }

  return slideIndex - 1;
}

// Get index of the slide to the right of the given index
function getRightIndex(slideIndex, slides) {
  if (slideIndex === slides.length - 1) {
    return 0;
  }

  return slideIndex + 1;
}

function slideLeft() {
  // Slides the slides of all slide containers to the left

  if (animationActive) {
    return; // We don't want to start a new animation if one's already active.
  }

  for (let i = 0; i < containers.length; i++) {
    let { currentSlideIndex, slides } = containers[i];

    let currentSlide = slides[currentSlideIndex];
    let nextSlideIndex = getRightIndex(currentSlideIndex, slides);
    let nextSlide = slides[nextSlideIndex]; // Slide to the right of the current slide

    animationActive = true; // Disable slides while animation is playing

    currentSlide.classList.add('slide-out-left'); // currentSlide slides out of frame
    nextSlide.classList.remove('inactive');
    nextSlide.classList.add('slide-in-left'); // And the slide to its right slides into frame

    let onAnimationEnd = () => {
      currentSlide.classList.remove('slide-out-left');
      currentSlide.classList.add('inactive');
      nextSlide.classList.remove('slide-in-left');
      containers[i].currentSlideIndex = getRightIndex(
        currentSlideIndex,
        slides,
      );
      animationActive = false;
      currentSlide.removeEventListener('animationend', onAnimationEnd);
    };

    currentSlide.addEventListener('animationend', onAnimationEnd);
  }
}

function slideRight() {
  // Slides the slides of all slide containers to the right

  if (animationActive) {
    return; // We don't want to start a new animation if one's already active.
  }

  for (let i = 0; i < containers.length; i++) {
    let { currentSlideIndex, slides } = containers[i];

    let currentSlide = slides[currentSlideIndex];
    let nextSlideIndex = getLeftIndex(currentSlideIndex, slides);
    let nextSlide = slides[nextSlideIndex]; // Slide to the left of the current slide

    animationActive = true; // Disable slides while animation is playing

    currentSlide.classList.add('slide-out-right'); // currentSlide slides out of frame
    nextSlide.classList.remove('inactive');
    nextSlide.classList.add('slide-in-right'); // And the slide to its right slides into frame

    let onAnimationEnd = () => {
      currentSlide.classList.remove('slide-out-right');
      currentSlide.classList.add('inactive');
      nextSlide.classList.remove('slide-in-right');
      containers[i].currentSlideIndex = getLeftIndex(currentSlideIndex, slides);
      animationActive = false;
      currentSlide.removeEventListener('animationend', onAnimationEnd);
    };

    currentSlide.addEventListener('animationend', onAnimationEnd);
  }
}
