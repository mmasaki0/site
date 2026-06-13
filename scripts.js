function highlight(e) {
    e.style.transition = "text-shadow 1ms ease-in-out"
    e.style.textShadow = "white 0 0 4px";
    
    setTimeout(() => {
        e.style.transition = "text-shadow 1000ms ease-in-out"
        e.style.textShadow = "rgba(0,0,0,0) 0 0 0";
    }, 500);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        highlight(document.querySelector(this.getAttribute('href')).nextElementSibling);
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll(".gallery-thumbs > div").forEach(e => {
    e.addEventListener('click', function (el) {
        main1 = e.parentElement.parentElement.firstElementChild;
        main2 = main1.nextElementSibling;

        switch(e.dataset.type) {
            case "img":
                main1.style.backgroundImage = e.style.backgroundImage;

                main1.style.display = "block";
                main2.style.display = "none";
                break;
            case "gif":
                console.log(e.dataset.src);
                main1.style.backgroundImage = e.dataset.src

                main1.style.display = "block";
                main2.style.display = "none";
                break;
            default:
                break;
        }
        // document.getElementsByClassName("gallery-main")[0].style.backgroundImage = this.style.backgroundImage;
    });
})

document.querySelectorAll(".gallery-main").forEach(e => {
    e.style.backgroundImage = e.nextElementSibling.firstElementChild.style.backgroundImage;
})
// document.getElementsByClassName("gallery-main")[0].style.backgroundImage = document.getElementsByClassName("gallery-thumbs")[0].firstElementChild.style.backgroundImage;

