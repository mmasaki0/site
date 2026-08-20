function highlight(e) {
    e.style.transition = "text-shadow 1ms ease-in-out"
    e.style.textShadow = "white 0 0 2px";
    
    setTimeout(() => {
        e.style.transition = "text-shadow 1000ms ease-in-out"
        e.style.textShadow = "rgba(0,0,0,0) 0 0 0";
    }, 500);
}

// update gallery main item (wip)
function showGalleryMain(thumb) {
    mainDiv = document.getElementsByClassName("gallery-main")[0];
    mainVid = mainDiv.nextElementSibling;
    mainIframe = mainVid.nextElementSibling;

    switch(thumb.dataset.type) {
        case "img":
            mainDiv.style.backgroundImage = thumb.style.backgroundImage;

            mainDiv.style.display = "block";
            mainVid.style.display = "none";
            mainIframe.style.display = "none";
            mainVid.src="";
            mainIframe.src="";
            break;

        case "gif":
            mainDiv.style.backgroundImage = thumb.dataset.src

            mainDiv.style.display = "block";
            mainVid.style.display = "none";
            mainIframe.style.display = "none";
            mainVid.src="";
            mainIframe.src="";
            break;

        case "vid":
            mainVid.src = thumb.dataset.src + "#t=0.001";

            mainDiv.style.display = "none";
            mainVid.style.display = "block";
            mainIframe.style.display = "none";
            mainIframe.src="";
            break;
        case "yt":
            mainIframe.src = "https://www.youtube.com/embed/" + thumb.dataset.src;

            mainDiv.style.display = "none";
            mainVid.style.display = "none";
            mainIframe.style.display = "block";
            mainVid.src="";
            break;
        default:
            break;
    }
}

// scroll into view
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        highlight(document.querySelector(this.getAttribute('href')).nextElementSibling);
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// adds click to all gallery items
document.querySelectorAll(".gallery-thumbs > div").forEach(thumb => {
    thumb.addEventListener('click', function(evt) {
        showGalleryMain(evt.target);
    });
})

document.querySelector(".gallery-right").addEventListener('click', function(evt) {
    document.querySelector(".gallery-thumbs").scrollLeft += 150;
});

document.querySelector(".gallery-left").addEventListener('click', function(evt) {
    document.querySelector(".gallery-thumbs").scrollLeft -= 150;
});


// sets first item in gallery to main item
document.querySelectorAll(".gallery-thumbs").forEach(e => {
    showGalleryMain(e.firstElementChild);
})