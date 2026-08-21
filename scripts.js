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

// scroll into view from different page
document.addEventListener('DOMContentLoaded', function() {
    if(window.location.hash != '' && window.location.hash.length > 1 && performance.getEntriesByType('navigation')[0].type === 'navigate') {
        document.querySelector('.main').scroll(0,0);
        setTimeout(() => {
                highlight(document.querySelector(window.location.hash).nextElementSibling)
            document.querySelector(window.location.hash).scrollIntoView({
                behavior: 'smooth'
            });
        }, 100);
    }
})

// adds click to all gallery items
document.querySelectorAll(".gallery-thumbs > div").forEach(thumb => {
    thumb.addEventListener('click', function(evt) {
        showGalleryMain(evt.target);
    });
});

document.querySelectorAll(".gallery-right").forEach(e => {
    e.addEventListener('click', function() {
        document.querySelector(".gallery-thumbs").scrollLeft += 150;
    });
});

document.querySelectorAll(".gallery-left").forEach(e => {
    e.addEventListener('click', function() {
        document.querySelector(".gallery-thumbs").scrollLeft -= 150;
    });
});

// sets first item in gallery to main item
document.querySelectorAll(".gallery-thumbs").forEach(e => {
    showGalleryMain(e.firstElementChild);
})

const mal = document.querySelector(".contact");
if(mal) {
    mal.childNodes[1].childNodes.forEach((node) => {
        let currentNode;
        
        if(node.nodeType === Node.TEXT_NODE) {
            currentNode = node;
        } else if(node.nodeType === Node.ELEMENT_NODE) {
            currentNode = node.childNodes[0]
        }

        
        currentNode.nodeValue = currentNode.nodeValue
            .replaceAll("\"", "")
            .replace("kawa", "ma")
            .replace("sub", "m")
            .replace("h", "")
            .replace("46", "@gmail.com")

    })
}