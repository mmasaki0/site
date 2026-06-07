document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// window.addEventListener('load', () => {
//   const hash = window.location.hash;
//   if (hash) {
//     // 1. Instantly jump to top
//     window.scrollTo(0, 0);

//     // 2. Wait for paint, then smooth scroll to element
//     setTimeout(() => {
//       const element = document.querySelector(hash);
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//     }, 100);
//   }
// });