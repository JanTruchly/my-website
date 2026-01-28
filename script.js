function initAnimations() {
  // Vyber všechny prvky s atributem data-animate
  const observerElements = document.querySelectorAll('[data-animate]');
  
  // Konfigurační objekt pro observer
  const observerOptions = {
    threshold: 0.2,        // Aktivuj když je 20% prvku viditelné
    rootMargin: '0px 0px -50px 0px'  // Počkat až na dolní část prvku
  };
  
  // Vytvoř Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Prvek je viditelný - přidej animační třídu
        const animationType = entry.target.getAttribute('data-animate');
        entry.target.classList.add(animationType);
        
        // Pokud je .skill-card, přidej i stagger efekt
        if (entry.target.classList.contains('skill-card')) {
          const staggerIndex = Array.from(document.querySelectorAll('.skill-card')).indexOf(entry.target);
          entry.target.classList.add(`animate-stagger-${staggerIndex % 6 + 1}`);
        }
        
        // Když je prvek animován, přestane se sledovat
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Sleduj všechny prvky
  observerElements.forEach(element => observer.observe(element));
}