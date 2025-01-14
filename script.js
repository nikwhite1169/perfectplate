window.addEventListener('scroll', function () {
    const body = document.body;
    if (window.scrollY > 50) {
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
  });