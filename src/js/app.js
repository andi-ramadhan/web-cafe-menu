const navMenus = document.querySelectorAll('.nav-menu');
const slider = document.querySelector('.nav-menu-slider');

navMenus.forEach(menu => {
  menu.addEventListener('click', (e) => {
    //remove active class from all menus
    navMenus.forEach(m => m.classList.remove('active'));
    //add active class to clicked menu
    e.target.classList.add('active');

    //move slider
    const index = e.target.dataset.index;
    slider.style.transform = `translateX(${100 * index}%)`;
  });
});

//set initial active state
if (navMenus.length > 0) {
  navMenus[0].classList.add('active');
}