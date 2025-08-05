// Advanced animation utilities for the DeFi platform

export const animations = {
  // Price change animations
  priceFlash: (element: HTMLElement, type: 'increase' | 'decrease') => {
    const color = type === 'increase' ? '#22c55e' : '#ef4444';
    element.style.transition = 'all 0.3s ease';
    element.style.backgroundColor = `${color}20`;
    element.style.borderColor = color;
    element.style.transform = 'scale(1.02)';
    
    setTimeout(() => {
      element.style.backgroundColor = '';
      element.style.borderColor = '';
      element.style.transform = '';
    }, 300);
  },

  // Number counting animation
  countUp: (element: HTMLElement, start: number, end: number, duration: number = 1000) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = current.toLocaleString(undefined, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      });
    }, 16);
  },

  // Stagger animation for lists
  staggerIn: (elements: NodeListOf<Element>, delay: number = 100) => {
    elements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.opacity = '0';
      htmlElement.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        htmlElement.style.transition = 'all 0.5s ease';
        htmlElement.style.opacity = '1';
        htmlElement.style.transform = 'translateY(0)';
      }, index * delay);
    });
  },

  // Glow effect for important elements
  addGlow: (element: HTMLElement, color: string = 'hsl(var(--primary))') => {
    element.style.boxShadow = `0 0 20px ${color}40, 0 0 40px ${color}20`;
    element.style.transition = 'box-shadow 0.3s ease';
  },

  removeGlow: (element: HTMLElement) => {
    element.style.boxShadow = '';
  },

  // Typing animation
  typewriter: (element: HTMLElement, text: string, speed: number = 50) => {
    element.textContent = '';
    let index = 0;
    
    const timer = setInterval(() => {
      element.textContent += text[index];
      index++;
      
      if (index >= text.length) {
        clearInterval(timer);
      }
    }, speed);
  },

  // Parallax scroll effect
  parallax: (element: HTMLElement, speed: number = 0.5) => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },

  // Morphing background animation
  morphBackground: (element: HTMLElement) => {
    element.style.background = `
      linear-gradient(
        ${Math.random() * 360}deg, 
        hsl(${Math.random() * 360}, 70%, 50%) 0%, 
        hsl(${Math.random() * 360}, 70%, 30%) 100%
      )
    `;
    element.style.transition = 'background 2s ease';
  },

  // Floating animation
  float: (element: HTMLElement, distance: number = 10, duration: number = 3000) => {
    element.style.animation = `float ${duration}ms ease-in-out infinite`;
    element.style.animationDelay = `${Math.random() * duration}ms`;
  },

  // Pulse animation for notifications
  pulse: (element: HTMLElement, intensity: number = 1.1) => {
    element.style.animation = `pulse 1s ease-in-out infinite`;
    element.style.setProperty('--pulse-scale', intensity.toString());
  }
};

// CSS keyframes to be injected
export const injectAnimationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes pulse-glow {
      0%, 100% { 
        box-shadow: 0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 15px hsl(var(--primary));
        transform: scale(1);
      }
      50% { 
        box-shadow: 0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary));
        transform: scale(1.05);
      }
    }
    
    @keyframes slide-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: calc(200px + 100%) 0; }
    }
    
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
    .animate-slide-up { animation: slide-up 0.5s ease-out; }
    .animate-shimmer {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      background-size: 200px 100%;
      animation: shimmer 2s infinite;
    }
  `;
  
  document.head.appendChild(style);
};

// Auto-inject styles when module loads
if (typeof window !== 'undefined') {
  injectAnimationStyles();
}
