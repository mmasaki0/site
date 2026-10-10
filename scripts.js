//media query identifier
const phoneMediaQuery = window.matchMedia("(width < 768px)");
const tabletMediaQuery = window.matchMedia("(width >= 768px) and (width < 1024px)");
const desktopMediaQuery = window.matchMedia("(width >= 1024px)");

const photoModalContainer = document.querySelector(".photo-modal-container")

let currentMediaQuery = "phone";
updateCurrentMediaQuery();

function updateCurrentMediaQuery() {
    if(phoneMediaQuery.matches && currentMediaQuery != "phone") {
        currentMediaQuery = "phone";
        // console.log(currentMediaQuery)
    }
    if(tabletMediaQuery.matches && currentMediaQuery != "tablet") {
        currentMediaQuery = "tablet";
        // console.log(currentMediaQuery)
    }
    if(desktopMediaQuery.matches && currentMediaQuery != "desktop") {
        currentMediaQuery = "desktop";
        // console.log(currentMediaQuery)
    }
}

addEventListener("resize", () => {
    updateCurrentMediaQuery();

    if(currentMediaQuery == "phone" || currentMediaQuery == "tablet") {
        photoModalHide()
    }
})

function photoModalHide() {
    if(photoModalContainer) {
        photoModalContainer.style.display = "none";
    }
}

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
    mainDiv = document.querySelector(".gallery-main");
    mainVid = document.querySelector(".gallery-main ~ video")
    mainIframe = document.querySelector(".gallery-main ~ iframe")

    // console.log(mainDiv);    

    switch(thumb.dataset.type) {
        case "img":
            mainDiv.style.backgroundImage = thumb.style.backgroundImage;

            mainDiv.style.display = "flex";
            mainVid.style.display = "none";
            // mainIframe.style.display = "none";

            mainVid.src="";

            if(mainIframe) {
                mainIframe.remove();
            }

            break;

        case "gif":
            mainDiv.style.backgroundImage = thumb.dataset.src

            mainDiv.style.display = "block";
            mainVid.style.display = "none";
            // mainIframe.style.display = "none";

            mainVid.src="";
            if(mainIframe) {
                mainIframe.remove();
            }

            break;

        case "vid":
            mainVid.src = thumb.dataset.src + "#t=0.001";

            mainDiv.style.display = "none";
            mainVid.style.display = "block";
            // mainIframe.style.display = "none";

            if(mainIframe) {
                mainIframe.remove();
            }

            break;
        case "yt":
            if(mainIframe) {
                mainIframe.remove();
            }

            mainIframe = document.createElement("iframe");
            mainIframe.setAttribute("allowfullscreen", "");
            mainIframe.setAttribute("frameborder", "0");
            mainIframe.setAttribute("preload", "metadata");
            mainIframe.style.width = "100%";
            mainIframe.style.height = "100%";
            
            mainIframe.classList.add("gallery-main");
            mainIframe.src = "https://www.youtube.com/embed/" + thumb.dataset.src;

            mainVid.after(mainIframe);

            mainDiv.style.display = "none";
            mainVid.style.display = "none";
            mainIframe.style.display = "block";

            mainVid.src="";

            break;
        default:
            break;
    }
    
    document.querySelectorAll(".gallery-caption").forEach(caption => {
        if(thumb.hasAttribute("data-caption")) {
            caption.innerHTML = thumb.dataset.caption;
        } else {
            caption.innerHTML = "";
        }
    });
};

// scroll into view
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        highlight(document.querySelector(this.getAttribute('href')).nextElementSibling);
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // history.replaceState(null, null, anchor.getAttribute('href'));
    });
});

// adds click to all gallery items
document.querySelectorAll(".gallery-thumbs > div").forEach(thumb => {
    thumb.addEventListener('click', function(evt) {
        showGalleryMain(evt.target);
    });
});

document.querySelector(".photo-modal-container").addEventListener('click', (event) => {
    if(event.target == photoModalContainer) {
        photoModalHide();
    }
});

// add click to div gallery main
document.querySelectorAll("div.gallery-main").forEach(e => {
    e.addEventListener('click', function () {
        if(currentMediaQuery == "desktop") {
            // make new image object to get width and height for aspect ratio
            var image = new Image();
            image.src = e.style.backgroundImage.replace(/"/g,"").replace(/url\(|\)$/ig, "");

            image.onload = function() {
                document.querySelector(".photo-modal-item").style.backgroundImage = e.style.backgroundImage;
                document.querySelector(".photo-modal-item").style.aspectRatio = image.width / image.height;
                document.querySelector(".photo-modal-container").style.display = "block";
            }
        }
    })
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