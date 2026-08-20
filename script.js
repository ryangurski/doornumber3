document.addEventListener('DOMContentLoaded', function() {
    const title = document.getElementById('title-intro');
    const playEnter = document.getElementById('enter');
    const skip = document.getElementById('skip');
    const light = document.getElementById('light');
    const dark = document.getElementById('dark');
    const door1 = document.getElementById('dark-1');
    const door2 = document.getElementById('light-2');
    const dark3 = document.getElementById('dark-3');
    const light3 = document.getElementById('light-3');
    const choice = document.querySelectorAll('#light, #dark');
    const darkchoice = document.querySelectorAll('#dark-1, #dark-3');
    const lightchoice = document.querySelectorAll('#light-2, #light-3');

    const overlay = document.createElement('div');
    overlay.id = 'fade-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '9999';
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.backgroundColor = 'white';
    overlay.style.opacity = '1';
    document.body.appendChild(overlay);

    const MAIN_CHOICE_TIME = 232; 
    const DARK_PATH_CHOICE_TIME = 247; 
    const DARK_DOOR1_END_TIME = 267; 
    const DARK_DOOR3_START_TIME = 270; 
    const DARK_DOOR3_END_TIME = 299; 
    const LIGHT_PATH_START_TIME = 300; 
    const LIGHT_PATH_CHOICE_TIME = 314.7;
    const LIGHT_DOOR2_END_TIME = 333; 
    const LIGHT_DOOR3_START_TIME = 334; 
    const LIGHT_DOOR3_END_TIME = 362;

    let mainChoiceHandled = false;
    let doorChoiceHandled = false;
    let path = null;
    let targetEnd = null;
    let isSeeking = false;
    let expectedSeekTime = null;
    let fallbackTimer = null;

    const iframe = document.getElementById('vimeo-iframe');
    const player = new Vimeo.Player(iframe);

    function showElements(list) {
        list.forEach(function(el){ 
            if (!el) return;
            el.style.opacity = '0'; 
            el.style.display = 'block'; 
            setTimeout(function(){ 
                el.style.transition = 'opacity 1s'; 
                el.style.opacity = '1'; 
            }, 100); 
        });
    }

    function hideElements(list) {
        list.forEach(function(el){ 
            if (!el) return;
            el.style.transition = 'opacity 1s'; 
            el.style.opacity = '0'; 
            setTimeout(function(){ el.style.display = 'none'; }, 1000); 
        });
    }

    function showMainChoices() { showElements(choice); }
    function hideMainChoices() { hideElements(choice); }

    function showDoorChoices(which) {
        if (which === 'dark') showElements(darkchoice);
        else if (which === 'light') showElements(lightchoice);
    }

    function hideDoorChoices() {
        hideElements(darkchoice);
        hideElements(lightchoice);
    }

    choice.forEach(function(el){ if (el) el.style.display = 'none'; });
    darkchoice.forEach(function(el){ if (el) el.style.display = 'none'; });
    lightchoice.forEach(function(el){ if (el) el.style.display = 'none'; });

    function playNow() {
        player.setVolume(1).catch(function(){});
        return player.play().catch(function(){});
    }

    function performSeek(targetTime, shouldPause = false) {
        isSeeking = true;
        expectedSeekTime = targetTime;
        targetEnd = null;

        if (fallbackTimer) clearTimeout(fallbackTimer);
        fallbackTimer = setTimeout(function() {
            isSeeking = false;
            expectedSeekTime = null;
        }, 2500);

        return player.setCurrentTime(targetTime).then(function() {
            if (shouldPause) {
                return player.pause();
            } else {
                return player.play();
            }
        });
    }

    function transitionScreen(color, actionCallback) {
        overlay.style.backgroundColor = color;
        overlay.style.opacity = '1';
        setTimeout(function() {
            if (actionCallback) {
                const result = actionCallback();
                if (result && typeof result.then === 'function') {
                    result.then(function() {
                        setTimeout(function() {
                            overlay.style.opacity = '0';
                        }, 200);
                    }).catch(function() {
                        overlay.style.opacity = '0';
                    });
                } else {
                    setTimeout(function() {
                        overlay.style.opacity = '0';
                    }, 200);
                }
            } else {
                overlay.style.opacity = '0';
            }
        }, 500);
    }

    function resetToStart(fadeColor = 'white') {
        path = null;
        targetEnd = null;
        mainChoiceHandled = false;
        doorChoiceHandled = false;

        hideMainChoices();
        hideDoorChoices();

        transitionScreen(fadeColor, function() {
            return performSeek(0, true).then(function() {
                const introElements = [title, playEnter, skip].filter(Boolean);
                introElements.forEach(el => el.classList.remove('fade-out'));
                showElements(introElements);
            }).catch(function(){});
        });
    }

    playEnter.addEventListener('click', function(){
        if (title) title.classList.add('fade-out');
        playEnter.classList.add('fade-out');
        skip.classList.add('fade-out');
        
        playNow();
        player.setCurrentTime(0).catch(function(){});
        
        setTimeout(function(){ 
            if (playEnter) playEnter.style.display = 'none'; 
            if (skip) skip.style.display = 'none'; 
            if (title) title.style.display = 'none'; 
        }, 1000);
    });

    skip.addEventListener('click', function(){
        if (title) title.classList.add('fade-out');
        playEnter.classList.add('fade-out');
        skip.classList.add('fade-out');
        
        mainChoiceHandled = true;
        path = null;

        transitionScreen('white', function() {
            return playNow().then(function() {
                return performSeek(MAIN_CHOICE_TIME, true);
            }).then(function() {
                showMainChoices();
            }).catch(function() {
                showMainChoices();
            });
        });

        setTimeout(function(){ 
            if (playEnter) playEnter.style.display = 'none'; 
            if (skip) skip.style.display = 'none'; 
            if (title) title.style.display = 'none'; 
        }, 1000);
    });

    player.on('timeupdate', function(data){
        const s = data.seconds;

        if (isSeeking) {
            if (expectedSeekTime !== null && Math.abs(s - expectedSeekTime) < 2.0) {
                isSeeking = false;
                expectedSeekTime = null;
                if (fallbackTimer) clearTimeout(fallbackTimer);
            } else {
                return;
            }
        }

        if (!mainChoiceHandled && s >= MAIN_CHOICE_TIME) {
            mainChoiceHandled = true;
            player.pause().then(function(){ showMainChoices(); });
            return;
        }

        if (path === 'dark' && !doorChoiceHandled && s >= DARK_PATH_CHOICE_TIME) {
            doorChoiceHandled = true;
            player.pause().then(function(){ showDoorChoices('dark'); });
            return;
        }

        if (path === 'light' && !doorChoiceHandled && s >= LIGHT_PATH_CHOICE_TIME) {
            doorChoiceHandled = true;
            player.pause().then(function(){ showDoorChoices('light'); });
            return;
        }

        if (targetEnd !== null && s >= targetEnd) {
            const fadeColor = (path === 'dark') ? 'black' : 'white';
            resetToStart(fadeColor);
        }
    });

    dark.addEventListener('click', function(){
        hideMainChoices();
        path = 'dark';
        targetEnd = null;
        playNow();
    });

    light.addEventListener('click', function(){
        hideMainChoices();
        path = 'light';
        doorChoiceHandled = false;
        performSeek(LIGHT_PATH_START_TIME, false);
    });

    door1.addEventListener('click', function(){
        hideDoorChoices();
        targetEnd = DARK_DOOR1_END_TIME;
        playNow();
    });

    dark3.addEventListener('click', function(){
        hideDoorChoices();
        performSeek(DARK_DOOR3_START_TIME, false);
        targetEnd = DARK_DOOR3_END_TIME;
    });

    door2.addEventListener('click', function(){
        hideDoorChoices();
        targetEnd = LIGHT_DOOR2_END_TIME;
        playNow();
    });

    light3.addEventListener('click', function(){
        hideDoorChoices();
        performSeek(LIGHT_DOOR3_START_TIME, false);
        targetEnd = LIGHT_DOOR3_END_TIME;
    });

    const initialElements = [title, playEnter, skip].filter(Boolean);
    initialElements.forEach(el => {
        el.style.display = 'block';
        el.style.opacity = '0';
    });
    setTimeout(function(){ 
        initialElements.forEach(el => el.style.opacity = '1'); 
        overlay.style.opacity = '0';
    }, 500);
});