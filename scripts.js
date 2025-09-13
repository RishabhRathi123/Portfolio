// Basic interactions: mobile nav, smooth scroll, contact form behavior
document.addEventListener('DOMContentLoaded', function () {
  // Mobile toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  mobileToggle.addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    if (!nav.style.display || nav.style.display === 'none') {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.background = 'linear-gradient(180deg, rgba(6,6,10,0.95), rgba(6,6,10,0.95))';
      nav.style.position = 'absolute';
      nav.style.right = '18px';
      nav.style.top = '64px';
      nav.style.padding = '12px';
      nav.style.borderRadius = '10px';
    } else {
      nav.style.display = 'none';
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
      // close mobile nav if open
      const nav = document.querySelector('.nav');
      if (window.innerWidth < 960 && nav) nav.style.display = 'none';
    });
  });

  // Contact form behavior
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('form-msg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name').trim();
    const email = data.get('email').trim();
    const message = data.get('message').trim();
    if (!name || !email || !message) {
      msg.textContent = 'Please fill all fields.';
      return;
    }
    
    // Prepare mailto link details
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nFrom Email: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:rishabhrathi1512@gmail.com?subject=${subject}&body=${body}`;

    // UPDATED: Use a more robust method to open the mail client
    const tempLink = document.createElement('a');
    tempLink.href = mailtoLink;
    // Hide the link
    tempLink.style.display = 'none';
    // Append the link to the body
    document.body.appendChild(tempLink);
    // Programmatically click the link
    tempLink.click();
    // Remove the link from the body
    document.body.removeChild(tempLink);

    msg.textContent = 'Opening your mail client...';
    setTimeout(() => { 
        msg.textContent = ''; 
        form.reset(); 
    }, 3000);
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();
});

