document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const loader = document.createElement('div');
    loader.className = 'loader';
    preloader.appendChild(loader);

    window.addEventListener('load', () => {
      preloader.classList.add('done');
      setTimeout(() => {
        preloader.remove();
      }, 500);
    });
  }

  const header = document.querySelector('#header');
  if (header) {
    const headerScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', headerScroll);
    headerScroll();
  }

  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const toggleScrollTop = () => {
      if (window.scrollY > 400) {
        scrollTop.classList.add('visible');
      } else {
        scrollTop.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', toggleScrollTop);
    scrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navbar = document.querySelector('.navbar');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  if (mobileNavToggle && navbar) {
    mobileNavToggle.addEventListener('click', (e) => {
      e.preventDefault();
      navbar.classList.toggle('active');
      mobileNavToggle.style.display = navbar.classList.contains('active') ? 'none' : 'block';
      if (mobileNavHide) {
        mobileNavHide.style.display = navbar.classList.contains('active') ? 'block' : 'none';
      }
    });

    if (mobileNavHide) {
      mobileNavHide.addEventListener('click', () => {
        navbar.classList.remove('active');
        mobileNavToggle.style.display = 'block';
        mobileNavHide.style.display = 'none';
      });
    }

    document.querySelectorAll('#navbar a').forEach(link => {
      link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
          navbar.classList.remove('active');
          mobileNavToggle.style.display = 'block';
          if (mobileNavHide) {
            mobileNavHide.style.display = 'none';
          }
        }
      });
    });
  }

  const glightbox = GLightbox({
    selector: '.glightbox',
    touch: true,
    autoplayVideos: true
  });

  const portfolioIsotope = document.querySelector('.portfolio-isotope');
  if (portfolioIsotope) {
    const portfolioContainer = document.querySelector('.portfolio-container');
    if (portfolioContainer) {
      const filterButtons = document.querySelectorAll('.portfolio-flters li');

      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          const filterValue = button.getAttribute('data-filter');
          const items = portfolioContainer.querySelectorAll('.portfolio-item');

          items.forEach(item => {
            if (filterValue === '*' || item.classList.contains(filterValue.replace('.', ''))) {
              item.style.display = 'block';
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              }, 50);
            } else {
              item.style.opacity = '0';
              item.style.transform = 'scale(0.8)';
              setTimeout(() => {
                item.style.display = 'none';
              }, 300);
            }
          });
        });
      });
    }
  }

  const slides1 = document.querySelector('.slides-1');
  if (slides1) {
    new Swiper('.slides-1', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }

  const slides3 = document.querySelector('.slides-3');
  if (slides3) {
    new Swiper('.slides-3', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 1,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }

  const clientsSlider = document.querySelector('.clients-slider');
  if (clientsSlider) {
    new Swiper('.clients-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 40
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 60
        },
        992: {
          slidesPerView: 6,
          spaceBetween: 80
        }
      }
    });
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('#header')?.offsetHeight || 80;
        const targetPosition = targetElement.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;
      if (isVisible && !el.classList.contains('aos-animate')) {
        el.classList.add('aos-animate');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
});
