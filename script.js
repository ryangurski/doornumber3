document.addEventListener('DOMContentLoaded', function() {
    var mainVideo = document.getElementById('main');
    var mainAudio = document.getElementById('main-audio');
    var darkVideo = document.getElementById('dark-video');
    var darkAudio = document.getElementById('dark1-audio');
    var lightVideo = document.getElementById('light-video');
    var lightAudio = document.getElementById('light2-audio');
    var video1 = document.getElementById('ending1');
    var audio1 = document.getElementById('door1-audio');
    var video2 = document.getElementById('ending2');
    var audio2 = document.getElementById('door2-audio');
    var video3dark = document.getElementById('ending3-dark');
    var audio3 = document.getElementById('door3-audio');
    var video3light = document.getElementById('ending3-light');
    var title = document.getElementById('title-intro');
    var playEnter = document.getElementById('enter');
    var skip = document.getElementById('skip');
    var choice = document.querySelectorAll('#light, #dark');
    var light = document.getElementById('light');
    var dark = document.getElementById('dark');
    var door1 = document.getElementById('dark-1');
    var door2 = document.getElementById('light-2');
    var dark3 = document.getElementById('dark-3');
    var light3 = document.getElementById('light-3');
    var darkchoice = document.querySelectorAll('#dark-1, #dark-3');
    var lightchoice = document.querySelectorAll('#light-2, #light-3');

    function adjustVideoHeight() {
        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var aspectRatio = 16 / 9;
        var adjustedHeight = windowHeight;
        var adjustedWidth = windowHeight * aspectRatio;

        if (adjustedWidth > windowWidth) {
            adjustedWidth = windowWidth;
            adjustedHeight = windowWidth / aspectRatio;
        }

        var topOffset = (windowHeight - adjustedHeight) / 2;

        document.getElementById('video-container').style.height = adjustedHeight + 'px';
        document.getElementById('video-container').style.top = topOffset + 'px';
    }

    function adjustTextPosition() {
        var windowHeight = window.innerHeight;
        var videoHeight = document.getElementById('video-container').offsetHeight;
        var textVerticalCenter = (windowHeight - videoHeight) / 2;
    
        if (mainVideo.style.display === 'block' ||
            darkVideo.style.display === 'block' ||
            lightVideo.style.display === 'block' ||
            video1.style.display === 'block' ||
            video2.style.display === 'block' ||
            video3dark.style.display === 'block' ||
            video3light.style.display === 'block') {
            title.style.display = 'none';
            playEnter.style.display = 'none';
            skip.style.display = 'none';
        } else {
            title.style.top = textVerticalCenter + videoHeight * 0.1 + 'px';
            title.style.left = '50%';
            title.style.transform = 'translate(-50%, -50%)';
            if (title.style.opacity !== '1') { 
                title.style.opacity = 0;
            }
            title.style.display = 'block';
    
            setTimeout(function() {
                if (title.style.opacity !== '1') { 
                    title.style.opacity = 1;
                }
            }, 1000);
    
            playEnter.style.top = textVerticalCenter + videoHeight * 0.9 + 'px';
            playEnter.style.left = '40%';
            playEnter.style.transform = 'translate(-50%, -50%)';
            if (playEnter.style.opacity !== '1') { 
                playEnter.style.opacity = 0;
            }
            playEnter.style.display = 'block';
    
            setTimeout(function() {
                if (playEnter.style.opacity !== '1') { 
                    playEnter.style.opacity = 1;
                }
            }, 3000);
    
            skip.style.top = textVerticalCenter + videoHeight * 0.9 + 'px';
            skip.style.left = '60%';
            skip.style.transform = 'translate(-50%, -50%)';
            if (skip.style.opacity !== '1') { 
                skip.style.opacity = 0;
            }
            skip.style.display = 'block';
    
            setTimeout(function() {
                if (skip.style.opacity !== '1') { 
                    skip.style.opacity = 1;
                }
            }, 3000);
        }
    
        light.style.top = textVerticalCenter + videoHeight * 0.5 + 'px';
        light.style.left = '70%';
        light.style.transform = 'translate(-50%, -50%)';
    
        dark.style.top = textVerticalCenter + videoHeight * 0.5 + 'px';
        dark.style.left = '30%';
        dark.style.transform = 'translate(-50%, -50%)';
    
        door1.style.top = textVerticalCenter + videoHeight * 0.35 + 'px';
        door1.style.left = '35%';
        door1.style.transform = 'translate(-50%, -50%)';
    
        dark3.style.top = textVerticalCenter + videoHeight * 0.35 + 'px';
        dark3.style.left = '69%';
        dark3.style.transform = 'translate(-50%, -50%)';
    
        door2.style.top = textVerticalCenter + videoHeight * 0.35 + 'px';
        door2.style.left = '35%';
        door2.style.transform = 'translate(-50%, -50%)';
    
        light3.style.top = textVerticalCenter + videoHeight * 0.35 + 'px';
        light3.style.left = '69%';
        light3.style.transform = 'translate(-50%, -50%)';
    }


    Array.from(choice).forEach(function(element) {
        element.style.display = 'none';
    });

    Array.from(darkchoice).forEach(function(element) {
        element.style.display = 'none';
    });

    Array.from(lightchoice).forEach(function(element) {
        element.style.display = 'none';
    });

    darkVideo.style.display = 'none';
    lightVideo.style.display = 'none';
    video1.style.display = 'none';
    video3dark.style.display = 'none';
    video2.style.display = 'none';
    video3light.style.display = 'none';

    playEnter.addEventListener('click', function() {
        mainAudio.play();
        mainVideo.play();
        mainVideo.style.display = 'block';
        playEnter.classList.add('fade-out');
        setTimeout(function() {
            playEnter.style.display = 'none';
        }, 2000);
        skip.classList.add('fade-out');
        setTimeout(function() {
            skip.style.display = 'none';
        }, 2000);
        title.classList.add('fade-out');
        setTimeout(function() {
            title.style.display = 'none';
        }, 2000);
    });

    skip.addEventListener('click', function() {
        mainVideo.style.display = 'block';
        skip.style.display = 'none';
        playEnter.style.display = 'none';
        title.style.display = 'none';
    
        // Function to handle the currentTime setting
        function setMediaCurrentTime(mediaElement, targetElement) {
            if (mediaElement.readyState >= 2) {
                targetElement.currentTime = targetElement.duration;  // Skip to end
                targetElement.play();  // Ensure playback is continued
            } else {
                mediaElement.addEventListener('loadedmetadata', function onLoadedMetadata() {
                    targetElement.currentTime = targetElement.duration;
                    targetElement.play();  // Ensure playback is continued
                    mediaElement.removeEventListener('loadedmetadata', onLoadedMetadata);
                });
            }
        }
    
        // Set current time for audio elements
        setMediaCurrentTime(lightAudio, mainAudio);
        setMediaCurrentTime(darkAudio, mainAudio);
    
        // Set current time for video elements
        setMediaCurrentTime(lightVideo, mainVideo);
        setMediaCurrentTime(darkVideo, mainVideo);
    });

    mainVideo.addEventListener('timeupdate', function() {
        if (mainVideo.style.display === 'block') {
            Array.from(choice).forEach(function(element) {
                element.style.display = 'none';
            });
        }
    });

    mainVideo.addEventListener('ended', function() {
        Array.from(choice).forEach(function(element) {
            element.style.opacity = '0';
            element.style.display = 'block';
            setTimeout(function() {
                element.style.transition = 'opacity 1s'; 
                element.style.opacity = '1';
            }, 1000); 
        });
    });

    dark.addEventListener('click', function() {
        if (darkVideo.style.display === 'none') {
            darkVideo.style.display = 'block';
            mainVideo.style.display = 'none';
            darkAudio.play();
            darkVideo.play();
            Array.from(choice).forEach(function(element) {
                element.style.transition = 'opacity 1s'; 
                element.style.opacity = '0';
                setTimeout(function() {
                    element.style.display = 'none';
                }, 1000); 
            });
        }
    });

    light.addEventListener('click', function() {
        if (lightVideo.style.display === 'none') {
            lightVideo.style.display = 'block';
            mainVideo.style.display = 'none';
            lightAudio.play();
            lightVideo.play();
            Array.from(choice).forEach(function(element) {
                element.style.transition = 'opacity 1s'; 
                element.style.opacity = '0';
                setTimeout(function() {
                    element.style.display = 'none';
                }, 1000); 
            });
        }
    });

    darkVideo.addEventListener('timeupdate', function() {
        if (darkVideo.style.display === 'block') {
            Array.from(darkchoice).forEach(function(element) {
                element.style.display = 'none';
            });
        }
    });

    darkVideo.addEventListener('ended', function() {
        Array.from(darkchoice).forEach(function(element) {
            element.style.opacity = '0';
            element.style.display = 'block';
            setTimeout(function() {
                element.style.transition = 'opacity 1s'; 
                element.style.opacity = '1';
            }, 1000); 
        });
    });

    lightVideo.addEventListener('timeupdate', function() {
        if (lightVideo.style.display === 'block') {
            Array.from(lightchoice).forEach(function(element) {
                element.style.display = 'none';
            });
        }
    });

    lightVideo.addEventListener('ended', function() {
        Array.from(lightchoice).forEach(function(element) {
            element.style.opacity = '0';
            element.style.display = 'block';
            setTimeout(function() {
                element.style.transition = 'opacity 1s'; 
                element.style.opacity = '1';
            }, 1000); 
        });
    });

    function reloadPage() {
        window.location.reload();
    }

    door1.addEventListener('click', function() {
        if (video1.style.display === 'none') {
            video1.style.display = 'block';
            darkVideo.style.display = 'none';
            audio1.play();
            video1.play();
            Array.from(darkchoice).forEach(function(element) {
                element.style.transition = 'opacity 1s'; 
                element.style.opacity = '0';
                setTimeout(function() {
                    element.style.display = 'none';
                }, 1000); 
            });
        }
    });

    video1.addEventListener('ended', function() {
        reloadPage();
    });

    dark3.addEventListener('click', function() {
        if (video3dark.style.display === 'none') {
            video3dark.style.display = 'block';
            darkVideo.style.display = 'none';
            audio3.play();
            video3dark.play();
            Array.from(darkchoice).forEach(function(element) {
                element.style.transition = 'opacity 1s'; 
                element.style.opacity = '0';
                setTimeout(function() {
                    element.style.display = 'none';
                }, 1000); 
            });
        }
    });

    video3dark.addEventListener('ended', function() {
        reloadPage();
    });

    door2.addEventListener('click', function() {
        if (video2.style.display === 'none') {
            video2.style.display = 'block';
            lightVideo.style.display = 'none';
            audio2.play();
            video2.play();
            Array.from(lightchoice).forEach(function(element) {
                element.style.display = 'none';
            });
        }
    });

    video2.addEventListener('ended', function() {
        reloadPage();
    });

    light3.addEventListener('click', function() {
        if (video3light.style.display === 'none') {
            video3light.style.display = 'block';
            lightVideo.style.display = 'none';
            audio3.play();
            video3light.play();
            Array.from(lightchoice).forEach(function(element) {
                element.style.display = 'none';
            });
        }
    });

    video3light.addEventListener('ended', function() {
        reloadPage();
    });

    adjustVideoHeight();
    window.addEventListener('resize', adjustVideoHeight);

    adjustTextPosition();
    window.addEventListener('resize', adjustTextPosition);
});