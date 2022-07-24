//GET ELEMENTS
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//BUILD OUR FUNCTIONS
//PLAY / PAUSE FUNCTION
const togglePlay = () => {
  // if(video.paused) video.play()
  // else video.pause()
  const method = video.paused ? 'play' : 'pause'
  video[method]();
}

//UPDATE PLAY/PAUSE ICON
const updateButton = () => {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

//SKIP FORWARD/BACKWARD
const skip = (e) => {
  // if(e.target.dataset.skip==="-10") video.currentTime -= 10
  // else video.currentTime += 25
  video.currentTime += parseFloat(e.target.dataset.skip);
 }

//VOLUME/SPEED OF THE SOUND/VIDEO
const handleRangeUpdate = (e) => {
  video[e.target.name] = e.target.value;
}

//VIDEO PROGRESS BAR: TIME TO WIDTH
const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

//VIDEO PROGRESS BAR: WIDTH TO TIME
const scrub = e => {
  // video.currentTime = video.duration / (e.target.style.flexBasis/100);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}



//HOOK UP THE EVENT LISTENERS
toggle.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
skipButtons.forEach(btn => btn.addEventListener('click', (e)=>skip(e)));
ranges.forEach(range=>range.addEventListener('change', e=>handleRangeUpdate(e)))
ranges.forEach(range=>range.addEventListener('mousemove', e=>handleRangeUpdate(e)))
video.addEventListener('timeupdate', handleProgress)

let mousedown =  false;
progress.addEventListener('click', e=>scrub(e))
progress.addEventListener('mousemove', e => mousedown && scrub(e))
progress.addEventListener('mousedown', e =>mousedown=!mousedown)
progress.addEventListener('mouseup', e=>mousedown=!mousedown)

var myvid = document.getElementById('myvideo');
var myvids = [
  "https://images.all-free-download.com/footage_preview/mp4/crowd_watching_natural_water_eruption_on_ground_6892347.mp4", 
  "https://quantumhunts.com/user/manage/videos/1403/2020-08-20-11-19-07/557187-sharmistha-video-resume.mp4"
  ];
var activeVideo = 0;

myvid.addEventListener('ended', function(e) {
  // update the new active video index
  activeVideo = (++activeVideo) % myvids.length;

  // update the video source and play
  myvid.src = myvids[activeVideo];
  myvid.play();
});