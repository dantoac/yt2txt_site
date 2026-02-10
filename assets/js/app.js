(function () {
    'use strict';

    // ── Theme Toggle ─────────────────────────────────────────────
    function getPreferredTheme() {
        var stored = localStorage.getItem('yt2txt-theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('yt2txt-theme', theme);
    }

    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem('yt2txt-theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ── Rotating Tagline ─────────────────────────────────────────
    var taglinePhrases = document.querySelectorAll('.tagline-phrase');
    var taglineIndex = 0;
    var taglineTimer = null;

    function startTagline() {
        if (taglinePhrases.length < 2) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        taglineTimer = setInterval(function () {
            taglinePhrases[taglineIndex].classList.remove('tagline-phrase--active');
            taglinePhrases[taglineIndex].setAttribute('aria-hidden', 'true');
            taglineIndex = (taglineIndex + 1) % taglinePhrases.length;
            taglinePhrases[taglineIndex].classList.add('tagline-phrase--active');
            taglinePhrases[taglineIndex].removeAttribute('aria-hidden');
        }, 3500);
    }

    // ── DOM References ──────────────────────────────────────────
    var form          = document.getElementById('transcribe-form');
    var urlInput      = document.getElementById('url-input');
    var inputWrapper  = document.getElementById('input-wrapper');
    var inputHint     = document.getElementById('input-hint');
    var submitBtn     = document.getElementById('submit-btn');
    var processingEl  = document.getElementById('processing');
    var processingTxt = document.getElementById('processing-text');
    var resultEl      = document.getElementById('result');
    var resultTitle   = document.getElementById('result-title');
    var resultInfo    = document.getElementById('result-info');
    var transcriptEl  = document.getElementById('transcript');
    var copyBtn       = document.getElementById('copy-btn');
    var copyLabel     = document.getElementById('copy-label');
    var downloadBtn   = document.getElementById('download-btn');
    var newBtn        = document.getElementById('new-btn');
    var hintError     = inputHint.querySelector('.hint-error');

    // ── State ───────────────────────────────────────────────────
    var currentTranscript = null;
    var currentVideoTitle = '';
    var currentVideoURL   = '';

    // ── YouTube URL Validation ──────────────────────────────────
    var YT_PATTERNS = [
        /^https?:\/\/(?:www\.)?youtube\.com\/watch\?.*v=[\w-]{11}/,
        /^https?:\/\/youtu\.be\/[\w-]{11}/,
        /^https?:\/\/(?:www\.)?youtube\.com\/embed\/[\w-]{11}/,
        /^https?:\/\/(?:www\.)?youtube\.com\/shorts\/[\w-]{11}/,
    ];

    function isValidYouTubeURL(url) {
        return YT_PATTERNS.some(function (re) { return re.test(url.trim()); });
    }

    // ── UI State Transitions ────────────────────────────────────
    function showError(message) {
        hintError.textContent = message;
        inputHint.classList.add('show-error');
        inputWrapper.classList.add('has-error');
    }

    function clearError() {
        inputHint.classList.remove('show-error');
        inputWrapper.classList.remove('has-error');
        hintError.textContent = '';
    }

    function clearElement(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

    function setProcessing(active) {
        processingEl.hidden = !active;
        submitBtn.disabled = active;

        if (active) {
            urlInput.setAttribute('readonly', '');
        } else {
            urlInput.removeAttribute('readonly');
        }
    }

    function showResult(data) {
        clearInterval(taglineTimer);

        currentTranscript  = data.segments;
        currentVideoTitle  = data.title;

        resultTitle.textContent = data.title;
        resultInfo.textContent  = data.segments.length + ' segments \u00b7 ' + data.duration;

        clearElement(transcriptEl);
        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        data.segments.forEach(function (seg, i) {
            var div = document.createElement('div');
            div.className = 'transcript-segment';
            if (!reducedMotion) {
                div.style.animationDelay = Math.min(i * 30, 600) + 'ms';
            }

            var timeSpan = document.createElement('span');
            timeSpan.className = 'segment-time';
            timeSpan.textContent = formatTime(seg.start);

            var textSpan = document.createElement('span');
            textSpan.className = 'segment-text';
            textSpan.textContent = seg.text;

            div.appendChild(timeSpan);
            div.appendChild(textSpan);
            transcriptEl.appendChild(div);
        });

        setProcessing(false);
        resultEl.hidden = false;
        document.body.classList.add('has-result');
    }

    function resetUI() {
        document.body.classList.remove('has-result');
        resultEl.hidden = true;
        processingEl.hidden = true;
        clearElement(transcriptEl);
        urlInput.value = '';
        urlInput.removeAttribute('readonly');
        submitBtn.disabled = false;
        clearError();
        currentTranscript = null;
        currentVideoTitle = '';
        currentVideoURL   = '';
        urlInput.focus();
        startTagline();
    }

    // ── Helpers ─────────────────────────────────────────────────
    function formatTime(seconds) {
        var m = Math.floor(seconds / 60);
        var s = Math.floor(seconds % 60);
        return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }

    function buildPlainText() {
        if (!currentTranscript) return '';

        var lines = [
            'yt2txt \u2014 Transcript',
            'Video: ' + currentVideoTitle,
            'URL: ' + currentVideoURL,
            'Date: ' + new Date().toLocaleDateString('en-US'),
            '',
            '---',
            '',
        ];

        currentTranscript.forEach(function (seg) {
            lines.push('[' + formatTime(seg.start) + '] ' + seg.text);
        });

        return lines.join('\n');
    }

    // ── Processing Status Messages ──────────────────────────────
    var statusMessages = [
        'Downloading video audio...',
        'Processing with Whisper AI...',
        'Generating transcript...',
    ];

    function cycleProcessingStatus() {
        var i = 0;
        processingTxt.textContent = statusMessages[0];

        return setInterval(function () {
            i = (i + 1) % statusMessages.length;
            processingTxt.textContent = statusMessages[i];
        }, 2200);
    }

    // ── Mock Transcription API ──────────────────────────────────
    // Replace this function with a real API call.
    function mockTranscribe(_url) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve({
                    title: 'Introduction to Artificial Intelligence \u2014 Lesson 1',
                    duration: '12:34',
                    segments: [
                        { start: 0,   text: 'Welcome to this first class on artificial intelligence. Today we will begin with the fundamental concepts.' },
                        { start: 8,   text: 'Artificial intelligence is a field of computer science that seeks to create systems capable of performing tasks that normally require human intelligence.' },
                        { start: 19,  text: 'This includes learning, reasoning, perception, and natural language understanding.' },
                        { start: 28,  text: 'The history of AI begins in 1956, at the Dartmouth conference, where the term was coined for the first time.' },
                        { start: 38,  text: 'Since then, the field has experienced several cycles of enthusiasm and disappointment, known as AI winters.' },
                        { start: 49,  text: 'But in the last decade, thanks to increased computational power and the availability of large amounts of data, we have seen extraordinary advances.' },
                        { start: 61,  text: 'Deep learning has revolutionized areas such as computer vision, natural language processing, and speech recognition.' },
                        { start: 74,  text: 'Models like Whisper from OpenAI can transcribe audio with remarkable accuracy in multiple languages.' },
                        { start: 85,  text: 'In this course, we will explore the theoretical foundations and practical applications of these technologies.' },
                        { start: 95,  text: 'We will start with basic neural networks and gradually move towards more complex architectures like transformers.' },
                        { start: 106, text: 'For the next class, I ask you to review the reading material available on the course platform.' },
                        { start: 115, text: 'I also recommend installing Python and getting familiar with the NumPy and PyTorch libraries.' },
                        { start: 125, text: 'If you have any questions, don\'t hesitate to reach out. See you next week. Thank you for your attention.' },
                    ],
                });
            }, 4500);
        });
    }

    // ── Event Handlers ──────────────────────────────────────────
    function handleSubmit(e) {
        e.preventDefault();
        clearError();

        var url = urlInput.value.trim();

        if (!url) {
            showError('Enter a YouTube video URL.');
            urlInput.focus();
            return;
        }

        if (!isValidYouTubeURL(url)) {
            showError('This URL doesn\'t look like a valid YouTube video.');
            urlInput.focus();
            return;
        }

        currentVideoURL = url;
        resultEl.hidden = true;
        document.body.classList.remove('has-result');
        setProcessing(true);

        var statusInterval = cycleProcessingStatus();

        // Replace mockTranscribe with your real API call
        mockTranscribe(url)
            .then(function (data) {
                clearInterval(statusInterval);
                showResult(data);
            })
            .catch(function () {
                clearInterval(statusInterval);
                setProcessing(false);
                showError('Error transcribing the video. Please try again.');
            });
    }

    function handleCopy() {
        var text = buildPlainText();
        if (!text) return;

        navigator.clipboard.writeText(text).then(function () {
            copyBtn.classList.add('copied');
            copyLabel.textContent = 'Copied';

            setTimeout(function () {
                copyBtn.classList.remove('copied');
                copyLabel.textContent = 'Copy';
            }, 2000);
        });
    }

    function handleDownload() {
        var text = buildPlainText();
        if (!text) return;

        var safeName = currentVideoTitle
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .replace(/\s+/g, '_')
            .substring(0, 60);

        var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        var url  = URL.createObjectURL(blob);
        var a    = document.createElement('a');
        a.href     = url;
        a.download = (safeName || 'transcript') + '.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // ── Input: clear error on typing ────────────────────────────
    urlInput.addEventListener('input', function () {
        if (inputHint.classList.contains('show-error')) {
            clearError();
        }
    });

    // ── Bind Events ─────────────────────────────────────────────
    form.addEventListener('submit', handleSubmit);
    copyBtn.addEventListener('click', handleCopy);
    downloadBtn.addEventListener('click', handleDownload);
    newBtn.addEventListener('click', resetUI);

    // ── Start Tagline Rotation ──────────────────────────────────
    startTagline();

})();
