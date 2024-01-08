document.addEventListener('DOMContentLoaded', () => {
    const slideText = document.querySelector('.slideText');
    const texts = ['Experience Fountain', 'Explore Museums', 'Enjoy Cuisine From Podillya', 'Attend Our Events', 'Discover City Tours'];
    let currentSlide = -1;
  
    function updateText() {
      slideText.textContent = texts[currentSlide];
      currentSlide = (currentSlide + 1) % texts.length;
    }
  
    // Initially set text
    updateText();
  
// Listen for the start of the animation to change text
slideText.addEventListener('animationstart', (event) => {
    if (event.animationName === 'textFadeIn') {
      updateText();
    }
  });
  
  // Handle animation end to reset class for next animation
  slideText.addEventListener('animationend', (event) => {
    if (event.animationName === 'textFadeOut') {
      slideText.style.animationName = 'textFadeIn';
    } else if (event.animationName === 'textFadeIn') {
      slideText.style.animationName = 'textFadeOut';
    }
  });
  
  // Start the animation
  slideText.style.animationName = 'textFadeIn';
  });
  function toggleCartMenu() {
    const cartMenu = document.getElementById('cartMenu');
    if (cartMenu.style.right === '0px') {
        cartMenu.style.right = '-100%'; // Hide
    } else {
        cartMenu.style.right = '0px'; // Show
    }
}