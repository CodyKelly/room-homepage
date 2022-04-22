let navbar = document.getElementsByClassName('navbar')[0];
let menuButtons = Array.from(
  document.getElementsByClassName('menu-button__decoration'),
);

let menuActive = false;

function onMenu() {
  if (menuActive) {
    navbar.classList.remove('navbar__slide-in');
    navbar.classList.add('navbar__slide-out');

    let onAnimationEnd = () => {
      navbar.classList.add('inactive');
      navbar.removeEventListener('animationend', onAnimationEnd);
    };

    navbar.addEventListener('animationend', onAnimationEnd);
    for (let i = 0; i < menuButtons.length; i++) {
      menuButtons[i].classList.remove('menu-button__decoration--active');
    }
  } else {
    navbar.classList.remove('inactive');
    navbar.classList.add('navbar__slide-in');
    navbar.classList.remove('navbar__slide-out');
    for (let i = 0; i < menuButtons.length; i++) {
      menuButtons[i].classList.add('menu-button__decoration--active');
    }
  }
  menuActive = !menuActive;
}
