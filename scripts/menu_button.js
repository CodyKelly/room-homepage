const menuButton = document.querySelector('.menu-button');
const navbar = document.querySelector('.navbar');

menuButton.addEventListener('click', () => {
  const menuVisible = navbar.getAttribute('data-visible');

  if (menuVisible === 'true') {
    menuButton.setAttribute('aria-expanded', 'false');
    navbar.setAttribute('data-visible', 'false');
  } else if (menuVisible === 'false') {
    menuButton.setAttribute('aria-expanded', 'true');
    navbar.setAttribute('data-visible', 'true');
  }
});
