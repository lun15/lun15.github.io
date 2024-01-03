window.addEventListener("load",init,false);


function init(){

    /* video comparison bar*/    
    var videoContainers = document.getElementsByClassName("video-compare-container");
    Array.prototype.forEach.call(videoContainers,videoContainer=>{        

        var videoClippers = document.getElementsByClassName("video-clipper");
        Array.prototype.forEach.call(videoClippers, videoClipper => {
            function trackLocation(e) {
                var rect = videoContainer.getBoundingClientRect();
                var position = ((e.pageX - rect.left) / videoContainer.offsetWidth)*100;
                if (position <= 100) { 
                  videoClipper.style.width = position+"%";
                //   video
                  clippedVideo.style.width = ((100/position)*100)+"%";
                  clippedVideo.style.zIndex = 3;
                //   image
                  clippedImage.style.width = ((100/position)*100)+"%";
                  clippedImage.style.zIndex = 3;
                }
            }
            var clippedVideo = videoClipper.getElementsByTagName("video")[0];   
            var clippedImage = videoClipper.getElementsByTagName("img")[0]; 
            videoContainer.addEventListener( "mousemove", trackLocation, false); 
            videoContainer.addEventListener("touchstart",trackLocation,false);
            videoContainer.addEventListener("touchmove",trackLocation,false);
        })
        
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
