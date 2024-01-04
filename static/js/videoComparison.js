window.addEventListener("load",init,false);

function init(){

    /* video comparison bar*/    
    var videoContainers = document.getElementsByClassName("video-compare-container");
    Array.prototype.forEach.call(videoContainers,videoContainer=>{    

        function trackLocation(e) {
            let currentContainer = e.target;
            let currentClipper = e.target.parentNode;

            if((e.target.tagName.toLowerCase() == "img" || e.target.tagName.toLowerCase() == "video") && e.target.parentNode.classList.contains("video-compare-container")){
                currentContainer = e.target.parentNode;
                currentClipper = e.target.parentNode.children[1];
            }
            if(e.target.tagName.toLowerCase() == "div" && e.target.classList.contains("video-clipper")){
                currentContainer = e.target.parentNode;
                currentClipper = e.target;
            }

            if((e.target.tagName.toLowerCase() == "img" || e.target.tagName.toLowerCase() == "video") && e.target.parentNode.classList.contains("video-clipper")){
                currentContainer = e.target.parentNode.parentNode;
                currentClipper = e.target.parentNode;
            }

            // console.log(currentContainer);
            // console.log(currentClipper);
            
            var clippedVideo = currentClipper.children[0]; 
            var rect = currentContainer.getBoundingClientRect();
            var position = ((e.pageX - rect.left) / currentContainer.offsetWidth)*100;
            if (position <= 100) { 
                currentClipper.style.width = position+"%";                  
                clippedVideo.style.width = ((100/position)*100)+"%";
                clippedVideo.style.zIndex = 3;
            }
        }

        videoContainer.addEventListener("mousemove", trackLocation, false); 
        videoContainer.addEventListener("touchstart",trackLocation,false);
        videoContainer.addEventListener("touchmove",trackLocation,false);
        
    })
    


    /* enlarge image on hover*/
    var images = document.getElementsByClassName("normalize-image");

    Array.prototype.forEach.call(images,image => {    
        image.addEventListener("click", (e)=>{            
            var container = document.getElementById("enlarge-container")
            var label = container.childNodes[0];
            var img = container.childNodes[1];
            img.src = e.target.src;
            label.innerHTML = "result";
            container.hidden = false;

        }, false);        


        image.addEventListener("mouseleave", (e)=>{
            var container = document.getElementById("enlarge-container")
            var label = container.getAttribute("label");
            var img = container.getAttribute("img");
            container.hidden = true;

        }, false);  
    });      

}
