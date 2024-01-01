
window.addEventListener("load",init,false);


function init(){
    function trackLocation(e) {
        var rect = videoContainer.getBoundingClientRect(),
        position = ((e.pageX - rect.left) / videoContainer.offsetWidth)*100;
        clippedVideo.style.left =  position+"%";

    }
    var videoContainer = document.getElementById("video-compare-container");
    var videoClipper = document.getElementById("video-clipper");
    var clippedVideo = videoClipper.getElementsByTagName("video")[0];
    
    videoContainer.addEventListener("mousemove", trackLocation, false); 
    videoContainer.addEventListener("touchstart",trackLocation,false);
    videoContainer.addEventListener("touchmove",trackLocation,false);
      
}
