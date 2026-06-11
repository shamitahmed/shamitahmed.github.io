document.addEventListener("DOMContentLoaded", () => {
  // Select ALL elements with the class 'tilt-container'
  const tiltContainers = document.querySelectorAll('.tilt-container');
  
  // Set the intensity of the tilt
  const maxTilt = 15; 

  // Loop through each container and apply the effect independently
  tiltContainers.forEach(container => {
    const card = container.querySelector('.tilt-card');
    
    if(!card) return; // Safety check in case a container is missing a card

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTilt; 
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transition = 'none';
      // Pop out slightly on hover (scale 1.03)
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
      card.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(0, 0, 0, 0.5)`;
    });

    container.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
      card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.3)`;
    });
  });
});
