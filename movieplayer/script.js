const video =document.getElementById('video');
const play=document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// for clicking on video  
function toggleVideoStatus(){
    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
}

// create function for updating the play / pause icons 
function updatePlayIcon(){
    if(video.paused){
        play.innerHTML='<i class="fa fa-play fa-2x"></i>';
    }else{
        play.innerHTML='<i class="fa fa-pause fa-2x"></i>';
    }
}

//create function to update the progress
function updateprogress(){
    progress.value=(video.currentTime / video.duration)*100;
    //set time for time stamp
    let mins= Math.floor(video.currentTime/60);
    if(mins<10){
        mins='0'+ String(mins);
    }
    let secs=Math.floor(video.currentTime % 60);
    if(secs<10){
        secs='0'+String(secs);
    }

    timestamp.innerHTML= `${mins}:${secs}`;
    
}

//create function to stop the video
function stopvideo(){
    video.currentTime=0;
    video.pause();
}

function setvideoProgress(){
    video.currentTime = (+progress.value*video.duration)/100;
}

//event listners for video player
video.addEventListener('click',toggleVideoStatus);
video.addEventListener('pause',updatePlayIcon);
video.addEventListener('play',updatePlayIcon);
video.addEventListener('timeupdate',updateprogress);


// 2 event listener for play button
play.addEventListener('click',toggleVideoStatus);

// 3 event listner for stop button
stop.addEventListener('click',stopvideo);

//4 event listner for progress bar
progress.addEventListener('change',setvideoProgress);
