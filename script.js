document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const VIDEOS = [
        'video1.mp4', 'video2.mp4', 'video3.mp4', 'video4.mp4', 'video5.mp4',
        'video6.mp4', 'video7.mp4', 'video8.mp4', 'video9.mp4', 'video10.mp4'
    ];
    const GATE_TIME_SECONDS = 10;
    const REDIRECT_URL = 'https://nba14.com/';

    // State
    let currentState = {
        isPlaying: false,
        isGated: false,
        hasSignedUp: false,
        duration: 0
    };

    // Elements
    const videoEl = document.getElementById('mainVideo');
    const playOverlay = document.getElementById('playOverlay');
    const authModal = document.getElementById('authModal');
    const signupForm = document.getElementById('signupForm');
    const submitBtn = document.getElementById('submitBtn');
    const progressBar = document.getElementById('progressBar');
    const gateMarker = document.getElementById('gateMarker');
    const timeDisplay = document.getElementById('timeDisplay');
    const videoTitle = document.getElementById('videoTitle');
    const errorToast = document.getElementById('errorToast');
    const controlsBar = document.getElementById('controlsBar');

    // Initialization
    function init() {
        // Select random video
        const randomIndex = Math.floor(Math.random() * VIDEOS.length);
        const selectedVideo = VIDEOS[randomIndex];
        
        videoEl.src = selectedVideo;
        videoTitle.textContent = `Game Clip #${randomIndex + 1}`;
        
        console.log(`Loaded: ${selectedVideo}`);
    }

    // Play/Pause Logic
    function togglePlay() {
        if (currentState.isGated) return;

        if (videoEl.paused) {
            videoEl.play().then(() => {
                currentState.isPlaying = true;
                updateUI();
            }).catch(err => {
                console.error("Play failed:", err);
            });
        } else {
            videoEl.pause();
            currentState.isPlaying = false;
            updateUI();
        }
    }

    // Update UI based on state
    function updateUI() {
        if (currentState.isPlaying) {
            playOverlay.style.opacity = '0';
            playOverlay.style.pointerEvents = 'none';
        } else {
            playOverlay.style.opacity = '1';
            playOverlay.style.pointerEvents = 'auto';
        }

        if (currentState.isGated) {
            authModal.classList.remove('hidden');
            videoEl.pause();
        } else {
            authModal.classList.add('hidden');
        }
    }

    // Time Update & Gating Logic
    videoEl.addEventListener('timeupdate', () => {
        const currentTime = videoEl.currentTime;
        
        // Update Progress Bar
        if (currentState.duration) {
            const progress = (currentTime / currentState.duration) * 100;
            progressBar.style.width = `${progress}%`;
            
            // Format time
            const currMins = Math.floor(currentTime / 60);
            const currSecs = Math.floor(currentTime % 60);
            const durMins = Math.floor(currentState.duration / 60);
            const durSecs = Math.floor(currentState.duration % 60);
            timeDisplay.textContent = `${currMins}:${currSecs.toString().padStart(2, '0')} / ${durMins}:${durSecs.toString().padStart(2, '0')}`;
        }

        // Check Gate
        if (!currentState.hasSignedUp && currentTime >= GATE_TIME_SECONDS && !currentState.isGated) {
            currentState.isGated = true;
            currentState.isPlaying = false;
            videoEl.currentTime = GATE_TIME_SECONDS; // Lock to 10s
            videoEl.pause();
            updateUI();
        }
        
        // Enforce Gate (prevent scrubbing past)
        if (currentState.isGated && currentTime > GATE_TIME_SECONDS) {
            videoEl.currentTime = GATE_TIME_SECONDS;
            videoEl.pause();
        }
    });

    // Metadata Loaded
    videoEl.addEventListener('loadedmetadata', () => {
        currentState.duration = videoEl.duration;
        
        // Position Gate Marker
        if (videoEl.duration > GATE_TIME_SECONDS) {
            const markerPos = (GATE_TIME_SECONDS / videoEl.duration) * 100;
            gateMarker.style.left = `${markerPos}%`;
            gateMarker.classList.remove('hidden');
        }
    });

    // Error Handling
    videoEl.addEventListener('error', () => {
        errorToast.classList.remove('hidden');
    });

    // Event Listeners
    playOverlay.addEventListener('click', togglePlay);
    videoEl.addEventListener('click', togglePlay);

    // Form Submission - Redirect to external URL
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<div class="loader w-5 h-5 border-2 rounded-full"></div><span>Redirecting...</span>`;
        submitBtn.disabled = true;

        console.log("Form submitted. Redirecting to:", REDIRECT_URL);

        // Redirect immediately (or with very short delay for UX)
        setTimeout(() => {
            window.location.assign(REDIRECT_URL);
        }, 500);
    });

    // Start
    init();
});
