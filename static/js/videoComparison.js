window.addEventListener("load",init,false);


function init(){

    /* video comparison bar*/
    function trackLocation(e) {
        var rect = videoContainer.getBoundingClientRect();
        var position = ((e.pageX - rect.left) / videoContainer.offsetWidth)*100;
        if (position <= 100) { 
          videoClipper.style.width = position+"%";
          clippedVideo.style.width = ((100/position)*100)+"%";
          clippedVideo.style.zIndex = 3;
        }
    }
    var videoContainer = document.getElementById("video-compare-container"),
    videoClipper = document.getElementById("video-clipper"),
    clippedVideo = videoClipper.getElementsByTagName("video")[0];
    videoContainer.addEventListener( "mousemove", trackLocation, false); 
    videoContainer.addEventListener("touchstart",trackLocation,false);
    videoContainer.addEventListener("touchmove",trackLocation,false);


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
