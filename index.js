function trackVideoEvents(videoElement) {
    function getBuffer() {
        var currentTime = videoElement.currentTime;
        var len = videoElement.buffered.length
        for (var i = 0; i < len; i++) {
            var start = videoElement.buffered.start(i);
            var end = videoElement.buffered.end(i);
            if (currentTime >= start && currentTime <= end) {
                return end - currentTime;
            }
        }

        return 0;
    }
    
    function getQuality() {
         var frames = videoElement.getVideoPlaybackQuality && videoElement.getVideoPlaybackQuality();
        
        if (!frames) {
            return {
                droppedFrames: 0,
                shownFrames: 0
            };
        }
        
        return frames;
    }

    function getReadyState() {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
        return {
            0: 'HAVE_NOTHING',
            1: 'HAVE_METADATA',
            2: 'HAVE_CURRENT_DATA',
            3: 'HAVE_FUTURE_DATA',
            4: 'HAVE_ENOUGH_DATA'
        }[videoElement.readyState] + ' (' + videoElement.readyState + ')';
    }

    function getNetworkState() {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/networkState
        return {
            0: 'NETWORK_EMPTY',
            1: 'NETWORK_IDLE',
            2: 'NETWORK_LOADING',
            3: 'NETWORK_NO_SOURCE'
        }[videoElement.networkState] + ' (' + videoElement.networkState + ')';
    }

    videoElement.addEventListener('canplay', function() {
        console.log('canplay', 'buffer: ' + getBuffer(), 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
    });

    videoElement.addEventListener('canplaythrough', function() {
        console.log('canplaythrough', 'buffer: ' + getBuffer());
    });

    videoElement.addEventListener('durationchange', function() {
        console.log('durationchange', 'duration: ' + videoElement.duration);
    });

    videoElement.addEventListener('ended', function() {
        console.log('ended', 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
    });

    videoElement.addEventListener('emptied', function() {
        console.log('emptied', 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
    });

    videoElement.addEventListener('resize', function() {
        console.log('resize', 'videoWidth: ' + videoElement.videoWidth, 'videoHeight: ' + videoElement.videoHeight);
    });

    videoElement.addEventListener('loadstart', function() {
        console.log('loadstart', 'src: ' + videoElement.src, 'autoplay: ' + videoElement.autoplay, 'loop: ' + videoElement.loop, 'preload: ' + videoElement.preload, 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
    });

    videoElement.addEventListener('loadeddata', function() {
        console.log('loadeddata', 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
    });

    videoElement.addEventListener('loadedmetadata', function() {
        console.log('loadedmetadata', 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
    });

    videoElement.addEventListener('seeking', function() {
        console.log('seeking', 'currentTime: ' + videoElement.currentTime, 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
    });

    videoElement.addEventListener('seeked', function() {
        console.log('seeked', 'currentTime: ' + videoElement.currentTime, 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
    });

    videoElement.addEventListener('play', function() {
        console.log('play');
    });

    videoElement.addEventListener('playing', function() {
        console.log('playing');
    });

    videoElement.addEventListener('pause', function() {
        console.log('pause');
    });

    videoElement.addEventListener('volumechange', function() {
        console.log('volumechange', 'volume: '+ videoElement.volume);
    });

    videoElement.addEventListener('ratechange', function() {
        console.log('ratechange', 'rate: '+ videoElement.rate);
    });

    videoElement.addEventListener('stalled', function() {
        console.log('stalled', 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
    });

    videoElement.addEventListener('suspend', function() {
        console.log('suspend', 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
    });

    videoElement.addEventListener('abort', function() {
        console.log('abort');
    });

    videoElement.addEventListener('progress', function() {
        console.log('progress', 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
    });

    videoElement.addEventListener('error', function() {
        console.log('error', videoElement.error, 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
    });

    videoElement.addEventListener('encrypted', function() {
        console.log('encrypted');
    });

    videoElement.addEventListener('waitingforkey', function() {
        console.log('waitingforkey');
    });

    videoElement.addEventListener('waiting', function() {
        var frames = getQuality();
        if (frames.droppedFrames) {
            console.log('waiting', 'shownFrames: ' + frames.shownFrames, 'droppedFrames: ' + frames.droppedFrames, 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
        } else {
            console.log('waiting', 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
        }
    });
    
    videoElement.addEventListener('timeupdate', function() {
        var frames = getQuality();
        if (frames.droppedFrames) {
            console.log('timeupdate', 'currentTime: ' + videoElement.currentTime, 'shownFrames: ' + frames.shownFrames, 'droppedFrames: ' + frames.droppedFrames, 'buffer: ' + getBuffer(), 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState()
        } else {
            console.log('timeupdate', 'currentTime: ' + videoElement.currentTime, 'buffer: ' + getBuffer(), 'networkState: ' + getNetworkState(), 'readyState: ' + getReadyState());
        }
    });    
}

// var video = document.querySelector('video');
// trackVideoEvents(video);
