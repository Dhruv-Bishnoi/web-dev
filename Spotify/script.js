const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      const child = card.querySelector('.player');

      card.addEventListener('mouseenter', () => {
        child.classList.add('playhoverd');
      });

      card.addEventListener('mouseleave', () => {
        child.classList.remove('playhoverd');
      });
    });