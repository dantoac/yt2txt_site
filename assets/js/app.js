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
        var toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }

    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Initialize aria-label based on current theme
        var initTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
        themeToggle.setAttribute('aria-label', initTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

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

    // ── Focus Trap Utility ──────────────────────────────────────
    var activeFocusTrap = null;

    function trapFocus(container) {
        var focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

        function handleKeydown(e) {
            if (e.key !== 'Tab') return;
            var focusables = Array.prototype.slice.call(container.querySelectorAll(focusableSelector)).filter(function (el) {
                return el.offsetParent !== null;
            });
            if (focusables.length === 0) return;
            var first = focusables[0];
            var last = focusables[focusables.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        container.addEventListener('keydown', handleKeydown);
        activeFocusTrap = { container: container, handler: handleKeydown };
    }

    function releaseFocusTrap() {
        if (activeFocusTrap) {
            activeFocusTrap.container.removeEventListener('keydown', activeFocusTrap.handler);
            activeFocusTrap = null;
        }
    }

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
    var resultsList   = document.getElementById('results-list');
    var newBtn        = document.getElementById('new-btn');
    var hintError     = inputHint ? inputHint.querySelector('.hint-error') : null;
    var queueEl       = document.getElementById('queue');
    var pastePopover  = document.getElementById('paste-popover');
    var pasteCount    = document.getElementById('paste-count');
    var pasteCountBtn = document.getElementById('paste-count-btn');
    var pasteAllBtn   = document.getElementById('paste-all-btn');
    var pasteFirstBtn = document.getElementById('paste-first-btn');
    var queueAnnouncer = document.getElementById('queue-announcer');
    var paywallOverlay = document.getElementById('paywall-overlay');
    var paywallClose   = document.getElementById('paywall-close');
    var paywallBackdrop = document.getElementById('paywall-backdrop');
    var paywallTimer   = null;

    // ── State ───────────────────────────────────────────────────
    var queue = [];
    var queueIdCounter = 0;
    var isProcessing = false;
    var MAX_QUEUE = 10;

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

    function isURL(str) {
        try { new URL(str); return true; } catch (_) { return false; }
    }

    function isYouTubeDomain(url) {
        try {
            var host = new URL(url).hostname.replace('www.', '');
            return host === 'youtube.com' || host === 'youtu.be';
        } catch (_) { return false; }
    }

    function getURLValidationError(input) {
        var trimmed = input.trim();
        if (!trimmed) return 'Paste a YouTube URL to get started.';
        if (!isURL(trimmed)) return 'Paste a full YouTube URL (e.g. https://youtube.com/watch?v=...)';
        if (!isYouTubeDomain(trimmed)) return "That's a valid URL, but not a YouTube link.";
        if (!isValidYouTubeURL(trimmed)) return "Looks like a YouTube URL, but we couldn't find a video ID.";
        return null;
    }

    function extractVideoId(url) {
        var m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
        return m ? m[1] : null;
    }

    // Global regex for extracting all YouTube URLs from text
    var YT_GLOBAL_RE = /https?:\/\/(?:(?:www\.)?youtube\.com\/(?:watch\?[^\s]*v=|embed\/|shorts\/)|youtu\.be\/)[\w-]{11}[^\s]*/gi;

    function extractAllYouTubeURLs(text) {
        var matches = text.match(YT_GLOBAL_RE);
        if (!matches) return [];
        var seen = {};
        var result = [];
        matches.forEach(function (url) {
            var vid = extractVideoId(url);
            if (vid && !seen[vid]) {
                seen[vid] = true;
                result.push(url);
            }
        });
        return result;
    }

    // ── UI State Transitions ────────────────────────────────────
    function showError(message) {
        if (!hintError || !inputHint || !inputWrapper) return;
        hintError.textContent = message;
        inputHint.classList.add('show-error');
        inputWrapper.classList.add('has-error');
    }

    function clearError() {
        if (!inputHint || !inputWrapper || !hintError) return;
        inputHint.classList.remove('show-error');
        inputWrapper.classList.remove('has-error');
        hintError.textContent = '';
    }

    function clearElement(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

    function announce(msg) {
        if (queueAnnouncer) queueAnnouncer.textContent = msg;
    }

    // ── Helpers ─────────────────────────────────────────────────
    function formatTime(seconds) {
        var m = Math.floor(seconds / 60);
        var s = Math.floor(seconds % 60);
        return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }

    function getItemById(id) {
        for (var i = 0; i < queue.length; i++) {
            if (queue[i].id === id) return queue[i];
        }
        return null;
    }

    function getDoneItems() {
        return queue.filter(function (item) { return item.status === 'done'; });
    }

    function buildPlainTextForItem(item) {
        if (!item || !item.segments) return '';
        var lines = [
            'yt2txt \u2014 Transcript',
            'Video: ' + item.title,
            'URL: ' + item.url,
            'Date: ' + new Date().toLocaleDateString('en-US'),
            '',
            '---',
            '',
        ];
        item.segments.forEach(function (seg) {
            lines.push('[' + formatTime(seg.start) + '] ' + seg.text);
        });
        return lines.join('\n');
    }

    function buildMarkdownTextForItem(item) {
        if (!item || !item.segments) return '';
        var lines = [
            '# ' + item.title,
            '',
            '> Transcribed by [yt2txt](https://yt2txt.com)',
            '> URL: ' + item.url,
            '> Date: ' + new Date().toLocaleDateString('en-US'),
            '',
            '---',
            '',
        ];
        item.segments.forEach(function (seg) {
            lines.push('**' + formatTime(seg.start) + '** ' + seg.text);
            lines.push('');
        });
        return lines.join('\n');
    }

    // ── Processing Status Messages ──────────────────────────────
    var statusMessages = [
        'Extracting audio from the video...',
        'Listening to the audio...',
        'Transcribing the audio...',
        'Formatting your transcript...',
    ];

    function cycleProcessingStatus() {
        var i = 0;
        processingTxt.textContent = statusMessages[0];
        return setInterval(function () {
            i = (i + 1) % statusMessages.length;
            processingTxt.textContent = statusMessages[i];
        }, 2200);
    }

    // ── Transcription API ──────────────────────────────────────
    var API_BASE = ''; // Set to API URL when ready; empty = use mock fallback
    var API_TIMEOUT_MS = 30000;
    var activeControllers = {};

    var API_ERROR = {
        NETWORK:   'NETWORK',
        TIMEOUT:   'TIMEOUT',
        RATE_LIMIT:'RATE_LIMIT',
        SERVER:    'SERVER',
        MALFORMED: 'MALFORMED',
        NOT_FOUND: 'NOT_FOUND'
    };

    var API_ERROR_MESSAGES = {};
    API_ERROR_MESSAGES[API_ERROR.NETWORK]    = 'Network error. Check your connection and try again.';
    API_ERROR_MESSAGES[API_ERROR.TIMEOUT]    = 'The request timed out. The video may be too long — try again later.';
    API_ERROR_MESSAGES[API_ERROR.RATE_LIMIT] = 'Too many requests. Please wait a moment and try again.';
    API_ERROR_MESSAGES[API_ERROR.SERVER]     = 'Server error. Our team has been notified — please try again later.';
    API_ERROR_MESSAGES[API_ERROR.MALFORMED]  = 'Received an unexpected response from the server.';
    API_ERROR_MESSAGES[API_ERROR.NOT_FOUND]  = 'Video not found. It may be private or unavailable.';

    function ApiError(type, message) {
        this.type = type;
        this.message = message || API_ERROR_MESSAGES[type] || 'Unknown error';
    }

    function validateTranscriptResponse(data) {
        if (!data || typeof data !== 'object') return false;
        if (typeof data.title !== 'string' || !data.title) return false;
        if (typeof data.duration !== 'string') return false;
        if (!Array.isArray(data.segments) || data.segments.length === 0) return false;
        return data.segments.every(function (seg) {
            return typeof seg.start === 'number' && typeof seg.text === 'string';
        });
    }

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
                        { start: 74,  text: 'AI models can transcribe audio with remarkable accuracy in multiple languages.' },
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

    function transcribe(url, queueId) {
        // Use mock fallback when no API is configured
        if (!API_BASE) return mockTranscribe(url);

        var controller = new AbortController();
        activeControllers[queueId] = controller;

        var timeoutId = setTimeout(function () { controller.abort(); }, API_TIMEOUT_MS);

        return fetch(API_BASE + '/transcribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url }),
            signal: controller.signal
        })
        .then(function (res) {
            clearTimeout(timeoutId);
            delete activeControllers[queueId];

            if (res.status === 404) throw new ApiError(API_ERROR.NOT_FOUND);
            if (res.status === 429) throw new ApiError(API_ERROR.RATE_LIMIT);
            if (res.status >= 500) throw new ApiError(API_ERROR.SERVER);
            if (!res.ok) throw new ApiError(API_ERROR.SERVER, 'Unexpected status: ' + res.status);

            return res.json();
        })
        .then(function (data) {
            if (!validateTranscriptResponse(data)) throw new ApiError(API_ERROR.MALFORMED);
            return data;
        })
        .catch(function (err) {
            clearTimeout(timeoutId);
            delete activeControllers[queueId];

            if (err instanceof ApiError) throw err;
            if (err.name === 'AbortError') throw new ApiError(API_ERROR.TIMEOUT);
            throw new ApiError(API_ERROR.NETWORK);
        });
    }

    function cancelTranscription(queueId) {
        var controller = activeControllers[queueId];
        if (controller) {
            controller.abort();
            delete activeControllers[queueId];
        }
    }

    // ── SVG Icon Helpers (static, hardcoded) ─────────────────────
    function createSvgElement(svgMarkup) {
        var temp = document.createElement('div');
        temp.insertAdjacentHTML('beforeend', svgMarkup);
        return temp.firstElementChild;
    }

    // ── Queue Management ─────────────────────────────────────────
    function addToQueue(url, skipProcessing) {
        var videoId = extractVideoId(url);

        if (queue.length >= MAX_QUEUE) {
            showError('Queue is full (max ' + MAX_QUEUE + '). Wait for some to finish or remove items.');
            return null;
        }

        var isDup = queue.some(function (item) {
            return item.videoId === videoId && item.status !== 'error';
        });
        if (isDup) {
            showError('This video is already in the queue.');
            return null;
        }

        var item = {
            id: ++queueIdCounter,
            url: url,
            videoId: videoId,
            status: 'queued',
            title: null,
            duration: null,
            segments: null,
            error: null,
            activeAI: null
        };

        queue.push(item);
        renderQueueChip(item);
        updateQueueVisibility();
        announce('Video added to queue');
        updateQueueHint();
        if (!skipProcessing) processNextInQueue();
        return item;
    }

    function removeFromQueue(id) {
        var item = getItemById(id);
        if (!item) return;
        if (item.status === 'processing') {
            cancelTranscription(id);
            isProcessing = false;
        }

        queue = queue.filter(function (q) { return q.id !== id; });

        var chip = document.getElementById('chip-' + id);
        if (chip) chip.remove();

        var card = document.getElementById('card-' + id);
        if (card) card.remove();

        updateQueueVisibility();
        updateResultsListMode();
        updateQueueHint();

        if (getDoneItems().length === 0) {
            resultEl.hidden = true;
            document.body.classList.remove('has-result');
        }

        announce('Video removed from queue');
    }

    function processNextInQueue() {
        if (isProcessing) return;

        var next = null;
        for (var i = 0; i < queue.length; i++) {
            if (queue[i].status === 'queued') {
                next = queue[i];
                break;
            }
        }
        if (!next) {
            processingEl.hidden = true;
            return;
        }

        isProcessing = true;
        next.status = 'processing';
        updateChipStatus(next);
        updateQueueHint();

        processingEl.hidden = false;
        var statusInterval = cycleProcessingStatus();

        transcribe(next.url, next.id)
            .then(function (data) {
                clearInterval(statusInterval);
                next.status = 'done';
                next.title = data.title;
                next.duration = data.duration;
                next.segments = data.segments;
                updateChipStatus(next);
                renderResultCard(next);
                showResultSection();
                isProcessing = false;
                processNextInQueue();
            })
            .catch(function (err) {
                clearInterval(statusInterval);
                next.status = 'error';
                next.error = (err instanceof ApiError) ? err.message : 'Transcription failed. Try again.';
                updateChipStatus(next);
                announce('Error: ' + next.error);
                isProcessing = false;
                processNextInQueue();
            });
    }

    function updateQueueVisibility() {
        if (!queueEl) return;
        queueEl.hidden = queue.length < 1;
    }

    function getQueuedCount() {
        return queue.filter(function (i) { return i.status === 'queued'; }).length;
    }

    function updateQueueHint() {
        if (!inputHint) return;
        var hintDefault = inputHint.querySelector('.hint-default');
        if (!hintDefault) return;
        var count = getQueuedCount();
        if (count > 0) {
            hintDefault.textContent = count + ' video' + (count > 1 ? 's' : '') + ' queued \u2014 paste another or hit Transcribe';
        } else {
            hintDefault.textContent = 'Paste any YouTube link';
        }
    }

    // ── Queue Chip Rendering ─────────────────────────────────────
    function renderQueueChip(item) {
        if (!queueEl) return;

        var chip = document.createElement('div');
        chip.className = 'queue-chip';
        chip.id = 'chip-' + item.id;
        chip.setAttribute('role', 'listitem');
        chip.setAttribute('data-status', item.status);
        chip.setAttribute('data-id', item.id);

        var thumb = document.createElement('img');
        thumb.className = 'queue-chip-thumb';
        thumb.src = 'https://img.youtube.com/vi/' + item.videoId + '/default.jpg';
        thumb.alt = '';
        thumb.width = 40;
        thumb.height = 30;
        thumb.setAttribute('aria-hidden', 'true');

        var label = document.createElement('span');
        label.className = 'queue-chip-label';
        label.textContent = item.videoId;

        var dot = document.createElement('span');
        dot.className = 'queue-chip-dot';
        dot.setAttribute('aria-hidden', 'true');

        var removeBtn = document.createElement('button');
        removeBtn.className = 'queue-chip-remove';
        removeBtn.setAttribute('aria-label', 'Remove from queue');
        var removeSvg = createSvgElement('<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>');
        removeBtn.appendChild(removeSvg);
        removeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            removeFromQueue(item.id);
        });

        chip.appendChild(dot);
        chip.appendChild(thumb);
        chip.appendChild(label);
        chip.appendChild(removeBtn);

        chip.addEventListener('click', function () {
            if (item.status === 'done') {
                var card = document.getElementById('card-' + item.id);
                if (card) {
                    var body = card.querySelector('.result-card-body');
                    var toggle = card.querySelector('.result-card-toggle');
                    if (body && body.hidden) {
                        body.hidden = false;
                        if (toggle) toggle.setAttribute('aria-expanded', 'true');
                    }
                    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });

        chip.setAttribute('tabindex', '0');
        chip.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                chip.click();
            }
        });

        queueEl.appendChild(chip);
    }

    function updateChipStatus(item) {
        var chip = document.getElementById('chip-' + item.id);
        if (!chip) return;
        chip.setAttribute('data-status', item.status);

        var label = chip.querySelector('.queue-chip-label');
        if (label && item.title) {
            label.textContent = item.title;
        }
    }

    // ── Result Card Rendering ────────────────────────────────────
    function showResultSection() {
        clearInterval(taglineTimer);
        resultEl.hidden = false;
        document.documentElement.style.scrollSnapType = 'none';
        document.body.classList.add('has-result');
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (paywallTimer) clearTimeout(paywallTimer);
        paywallTimer = setTimeout(showPaywall, 3000);
        updateResultsListMode();
    }

    function updateResultsListMode() {
        if (!resultsList) return;
        var doneItems = getDoneItems();
        if (doneItems.length <= 1) {
            resultsList.classList.add('results-list--single');
        } else {
            resultsList.classList.remove('results-list--single');
        }
    }

    function renderResultCard(item) {
        if (!resultsList) return;

        var card = document.createElement('article');
        card.className = 'result-card';
        card.id = 'card-' + item.id;
        card.setAttribute('role', 'listitem');

        // ── Card Header (accordion toggle) ──
        var header = document.createElement('div');
        header.className = 'result-card-header';

        var toggleBtn = document.createElement('button');
        toggleBtn.className = 'result-card-toggle';
        toggleBtn.type = 'button';
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.setAttribute('aria-controls', 'card-body-' + item.id);

        var thumbLink = document.createElement('a');
        thumbLink.className = 'result-card-thumb';
        thumbLink.href = item.url;
        thumbLink.target = '_blank';
        thumbLink.rel = 'noopener noreferrer';
        thumbLink.setAttribute('aria-label', 'Open video on YouTube');
        var thumbImg = document.createElement('img');
        thumbImg.src = 'https://img.youtube.com/vi/' + item.videoId + '/mqdefault.jpg';
        thumbImg.alt = item.title;
        thumbImg.width = 80;
        thumbImg.height = 45;
        thumbImg.loading = 'lazy';
        thumbLink.appendChild(thumbImg);

        var titleWrap = document.createElement('div');
        titleWrap.className = 'result-card-meta';

        var titleEl = document.createElement('h2');
        titleEl.className = 'result-card-title';
        titleEl.textContent = item.title;

        var infoEl = document.createElement('p');
        infoEl.className = 'result-card-info';
        infoEl.textContent = item.segments.length + ' segments \u00b7 ' + item.duration;

        titleWrap.appendChild(titleEl);
        titleWrap.appendChild(infoEl);

        var chevron = document.createElement('span');
        chevron.className = 'result-card-chevron';
        chevron.setAttribute('aria-hidden', 'true');
        chevron.appendChild(createSvgElement('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'));

        toggleBtn.appendChild(titleWrap);
        toggleBtn.appendChild(chevron);
        header.appendChild(thumbLink);
        header.appendChild(toggleBtn);

        // ── Card Body ──
        var body = document.createElement('div');
        body.className = 'result-card-body';
        body.id = 'card-body-' + item.id;

        // Actions row
        var actions = document.createElement('div');
        actions.className = 'result-card-actions';

        // Download group
        var dlGroup = document.createElement('div');
        dlGroup.className = 'download-group';

        var dlBtn = document.createElement('button');
        dlBtn.className = 'action-btn action-btn--primary card-download-btn';
        dlBtn.setAttribute('aria-label', 'Download transcript as text file');
        dlBtn.appendChild(createSvgElement('<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'));
        var dlSpan = document.createElement('span');
        dlSpan.textContent = 'Download .txt';
        dlBtn.appendChild(dlSpan);
        dlBtn.addEventListener('click', function () { showPaywall(true); });

        var dlToggle = document.createElement('button');
        dlToggle.className = 'action-btn action-btn--primary download-toggle';
        dlToggle.setAttribute('aria-label', 'More download options');
        dlToggle.setAttribute('aria-expanded', 'false');
        dlToggle.setAttribute('aria-haspopup', 'true');
        dlToggle.appendChild(createSvgElement('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'));

        var dlMenu = document.createElement('div');
        dlMenu.className = 'download-menu';
        dlMenu.setAttribute('role', 'menu');
        dlMenu.hidden = true;

        var dlTxt = document.createElement('button');
        dlTxt.className = 'download-menu-item';
        dlTxt.setAttribute('role', 'menuitem');
        dlTxt.setAttribute('tabindex', '-1');
        dlTxt.textContent = 'Download .txt';
        dlTxt.addEventListener('click', function () { showPaywall(true); closeDownloadMenu(dlMenu, dlToggle); });

        var dlMd = document.createElement('button');
        dlMd.className = 'download-menu-item';
        dlMd.setAttribute('role', 'menuitem');
        dlMd.setAttribute('tabindex', '-1');
        dlMd.textContent = 'Download .md';
        dlMd.addEventListener('click', function () { showPaywall(true); closeDownloadMenu(dlMenu, dlToggle); });

        dlMenu.appendChild(dlTxt);
        dlMenu.appendChild(dlMd);

        function openDownloadMenu() {
            dlMenu.hidden = false;
            dlToggle.setAttribute('aria-expanded', 'true');
            var firstItem = dlMenu.querySelector('[role="menuitem"]');
            if (firstItem) firstItem.focus();
        }

        function closeDownloadMenu(menu, toggle) {
            menu.hidden = true;
            toggle.setAttribute('aria-expanded', 'false');
        }

        dlToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (dlMenu.hidden) {
                openDownloadMenu();
            } else {
                closeDownloadMenu(dlMenu, dlToggle);
            }
        });

        dlToggle.addEventListener('keydown', function (e) {
            if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && dlMenu.hidden) {
                e.preventDefault();
                openDownloadMenu();
            }
        });

        dlMenu.addEventListener('keydown', function (e) {
            var items = Array.prototype.slice.call(dlMenu.querySelectorAll('[role="menuitem"]'));
            var idx = items.indexOf(document.activeElement);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                var next = idx + 1 < items.length ? idx + 1 : 0;
                items[next].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                var prev = idx - 1 >= 0 ? idx - 1 : items.length - 1;
                items[prev].focus();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeDownloadMenu(dlMenu, dlToggle);
                dlToggle.focus();
            } else if (e.key === 'Tab') {
                closeDownloadMenu(dlMenu, dlToggle);
            }
        });

        dlGroup.appendChild(dlBtn);
        dlGroup.appendChild(dlToggle);
        dlGroup.appendChild(dlMenu);

        // Copy button
        var copyBtn = document.createElement('button');
        copyBtn.className = 'action-btn';
        copyBtn.setAttribute('aria-label', 'Copy transcript');
        copyBtn.appendChild(createSvgElement('<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'));
        var copyLabel = document.createElement('span');
        copyLabel.textContent = 'Copy';
        copyBtn.appendChild(copyLabel);
        copyBtn.addEventListener('click', function () { showPaywall(true); });

        // Upgrade CTA
        var upgradeCta = document.createElement('a');
        upgradeCta.href = 'pricing.html';
        upgradeCta.className = 'cta-upgrade';
        upgradeCta.setAttribute('aria-label', 'View pricing plans');
        upgradeCta.appendChild(createSvgElement('<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'));
        upgradeCta.appendChild(document.createTextNode('Upgrade'));

        actions.appendChild(dlGroup);
        actions.appendChild(copyBtn);
        actions.appendChild(upgradeCta);

        // Transcript wrapper (transcript + AI toolbar)
        var transcriptWrapper = document.createElement('div');
        transcriptWrapper.className = 'transcript-wrapper';

        var transcript = document.createElement('div');
        transcript.className = 'transcript';
        transcript.setAttribute('role', 'region');
        transcript.setAttribute('tabindex', '0');
        transcript.setAttribute('aria-label', 'Transcript text');

        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        item.segments.forEach(function (seg, i) {
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
            transcript.appendChild(div);
        });

        // AI toolbar
        var aiToolbar = document.createElement('aside');
        aiToolbar.className = 'ai-toolbar';
        aiToolbar.setAttribute('aria-label', 'AI actions');

        var aiActionDefs = [
            { action: 'summarize', tooltip: 'Summarize', svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' },
            { action: 'key-points', tooltip: 'Key points', svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' },
            { action: 'translate', tooltip: 'Translate', svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' },
            { action: 'ask', tooltip: 'Ask AI', svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' },
            { action: 'cleanup', tooltip: 'Clean up', svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/></svg>' },
            { action: 'chapters', tooltip: 'Chapters', svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg>' },
            { action: 'action-items', tooltip: 'Action items', svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>' },
            { action: 'rewrite', tooltip: 'Rewrite as article', svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>' },
        ];

        aiActionDefs.forEach(function (ai) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'ai-action-btn';
            btn.setAttribute('data-action', ai.action);
            btn.setAttribute('data-tooltip', ai.tooltip);
            btn.setAttribute('aria-label', ai.tooltip + ' transcript');
            btn.setAttribute('data-queue-id', String(item.id));
            btn.appendChild(createSvgElement(ai.svg));
            btn.addEventListener('click', function () {
                showPaywall(true);
            });
            aiToolbar.appendChild(btn);
        });

        transcriptWrapper.appendChild(transcript);
        transcriptWrapper.appendChild(aiToolbar);

        // AI result panel (per card)
        var aiPanel = document.createElement('div');
        aiPanel.className = 'ai-result-panel';
        aiPanel.id = 'ai-result-' + item.id;
        aiPanel.hidden = true;

        var aiHeader = document.createElement('div');
        aiHeader.className = 'ai-result-header';
        var aiBadge = document.createElement('span');
        aiBadge.className = 'ai-result-badge';
        aiBadge.id = 'ai-result-badge-' + item.id;
        var aiClose = document.createElement('button');
        aiClose.type = 'button';
        aiClose.className = 'ai-result-close';
        aiClose.setAttribute('aria-label', 'Close AI result');
        aiClose.appendChild(createSvgElement('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'));
        aiClose.addEventListener('click', function () {
            closeCardAIResult(item.id, card);
        });
        aiHeader.appendChild(aiBadge);
        aiHeader.appendChild(aiClose);

        var aiBody = document.createElement('div');
        aiBody.className = 'ai-result-body';
        aiBody.id = 'ai-result-body-' + item.id;

        aiPanel.appendChild(aiHeader);
        aiPanel.appendChild(aiBody);

        // Assemble card body
        body.appendChild(actions);
        body.appendChild(transcriptWrapper);
        body.appendChild(aiPanel);

        // Assemble card
        card.appendChild(header);
        card.appendChild(body);

        // Accordion toggle behavior
        toggleBtn.addEventListener('click', function (e) {
            var expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', String(!expanded));
            body.hidden = expanded;
        });

        resultsList.appendChild(card);
        updateResultsListMode();

        // Focus the title of the first result
        if (getDoneItems().length === 1) {
            titleEl.setAttribute('tabindex', '-1');
            titleEl.focus({ preventScroll: false });
        }
    }

    // ── Per-card Actions ─────────────────────────────────────────
    function handleCardCopy(queueId, btn, label) {
        var item = getItemById(queueId);
        if (!item) return;
        var text = buildPlainTextForItem(item);
        if (!text) return;

        function onCopied() {
            btn.classList.add('copied');
            label.textContent = 'Copied';
            btn.setAttribute('aria-label', 'Copied to clipboard');
            setTimeout(function () {
                btn.classList.remove('copied');
                label.textContent = 'Copy';
                btn.setAttribute('aria-label', 'Copy transcript');
            }, 2000);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(onCopied).catch(function () {
                fallbackCopy(text);
                onCopied();
            });
        } else {
            fallbackCopy(text);
            onCopied();
        }
    }

    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
    }

    function handleCardDownload(queueId, format) {
        var item = getItemById(queueId);
        if (!item) return;

        format = format || 'txt';
        var text, mime, ext;
        if (format === 'md') {
            text = buildMarkdownTextForItem(item);
            mime = 'text/markdown;charset=utf-8';
            ext  = '.md';
        } else {
            text = buildPlainTextForItem(item);
            mime = 'text/plain;charset=utf-8';
            ext  = '.txt';
        }
        if (!text) return;

        var safeName = item.title
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .replace(/\s+/g, '_')
            .substring(0, 60);

        var blob = new Blob([text], { type: mime });
        var url  = URL.createObjectURL(blob);
        var a    = document.createElement('a');
        a.href     = url;
        a.download = (safeName || 'transcript') + ext;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }

    // ── AI Actions (per card) ────────────────────────────────────
    var AI_ACTIONS = {
        summarize: {
            label: 'Summary',
            icon: '\u26A1',
            delay: 2000,
            render: function () {
                var frag = document.createDocumentFragment();
                var p1 = document.createElement('p');
                p1.textContent = 'This introductory lecture covers the fundamentals of artificial intelligence. Starting with AI\u2019s origins at the 1956 Dartmouth conference, it traces the field through periods of excitement and \u201CAI winters\u201D to the modern deep learning revolution.';
                var p2 = document.createElement('p');
                p2.textContent = 'Key topics include computer vision, NLP, and AI-powered speech recognition. The course will progress from basic neural networks to transformers, with practical assignments using Python, NumPy, and PyTorch.';
                frag.appendChild(p1);
                frag.appendChild(p2);
                return frag;
            }
        },
        'key-points': {
            label: 'Key Points',
            icon: '\u2261',
            delay: 1800,
            render: function () {
                var ul = document.createElement('ul');
                ['AI originated at the 1956 Dartmouth conference',
                 'The field has gone through cycles of enthusiasm and \u201CAI winters\u201D',
                 'Recent computational power and data availability drove breakthroughs',
                 'Deep learning revolutionized vision, NLP, and speech recognition',
                 'AI-powered speech recognition enables multilingual audio transcription',
                 'Course covers neural networks \u2192 transformers',
                 'Prerequisites: Python, NumPy, PyTorch'
                ].forEach(function (text) {
                    var li = document.createElement('li');
                    li.textContent = text;
                    ul.appendChild(li);
                });
                return ul;
            }
        },
        translate: {
            label: 'Translation',
            icon: '\uD83C\uDF10',
            delay: 2500,
            render: function () {
                var frag = document.createDocumentFragment();
                var lbl = document.createElement('p');
                lbl.style.fontSize = '0.75rem';
                lbl.style.color = 'var(--text-muted)';
                lbl.style.marginBottom = 'var(--space-sm)';
                lbl.textContent = 'Translated to Spanish';
                frag.appendChild(lbl);
                ['Bienvenidos a esta primera clase sobre inteligencia artificial. Hoy comenzaremos con los conceptos fundamentales.',
                 'La inteligencia artificial es un campo de la inform\u00E1tica que busca crear sistemas capaces de realizar tareas que normalmente requieren inteligencia humana.',
                 'Esto incluye el aprendizaje, el razonamiento, la percepci\u00F3n y la comprensi\u00F3n del lenguaje natural.'
                ].forEach(function (text) {
                    var p = document.createElement('p');
                    p.textContent = text;
                    frag.appendChild(p);
                });
                return frag;
            }
        },
        ask: {
            label: 'Ask AI',
            icon: '\uD83D\uDCAC',
            delay: 0,
            render: function (queueId, cardEl) {
                var frag = document.createDocumentFragment();
                var p = document.createElement('p');
                p.textContent = 'Ask anything about this video\u2019s content:';
                frag.appendChild(p);
                var suggestions = document.createElement('div');
                suggestions.className = 'ai-ask-suggestions';
                ['What are the main topics covered?',
                 'What homework was assigned?',
                 'Explain AI winters in simple terms'
                ].forEach(function (q) {
                    var chip = document.createElement('button');
                    chip.type = 'button';
                    chip.className = 'ai-ask-chip';
                    chip.setAttribute('data-question', q);
                    chip.textContent = '\u201C' + q + '\u201D';
                    chip.addEventListener('click', function () {
                        handleAskChipClick(queueId, q, cardEl);
                    });
                    suggestions.appendChild(chip);
                });
                frag.appendChild(suggestions);
                return frag;
            }
        },
        cleanup: {
            label: 'Clean Up',
            icon: '\u2728',
            delay: 2200,
            render: function () {
                var frag = document.createDocumentFragment();
                var p1 = document.createElement('p');
                p1.textContent = 'Welcome to this first lecture on artificial intelligence. Today we will begin with the fundamental concepts that underpin the entire field.';
                var p2 = document.createElement('p');
                p2.textContent = 'Artificial intelligence is a branch of computer science that aims to create systems capable of performing tasks that normally require human intelligence. This includes learning, reasoning, perception, and natural language understanding.';
                var p3 = document.createElement('p');
                p3.textContent = 'The field originated at the 1956 Dartmouth conference and has since gone through cycles of excitement and so-called AI winters. Recent advances in computational power and data availability have driven a deep learning revolution that transformed computer vision, natural language processing, and speech recognition.';
                frag.appendChild(p1);
                frag.appendChild(p2);
                frag.appendChild(p3);
                return frag;
            }
        },
        chapters: {
            label: 'Chapters',
            icon: '\uD83D\uDCD6',
            delay: 2000,
            render: function () {
                var ul = document.createElement('ul');
                [
                    { time: '0:00', title: 'Introduction & Course Overview' },
                    { time: '3:24', title: 'What Is Artificial Intelligence?' },
                    { time: '8:15', title: 'History: From Dartmouth to AI Winters' },
                    { time: '14:02', title: 'The Deep Learning Revolution' },
                    { time: '19:47', title: 'Computer Vision & NLP Breakthroughs' },
                    { time: '25:30', title: 'Course Roadmap & Prerequisites' }
                ].forEach(function (ch) {
                    var li = document.createElement('li');
                    var ts = document.createElement('span');
                    ts.style.fontFamily = 'var(--font-mono)';
                    ts.style.color = 'var(--accent)';
                    ts.style.marginRight = '0.6rem';
                    ts.textContent = ch.time;
                    li.appendChild(ts);
                    li.appendChild(document.createTextNode(ch.title));
                    ul.appendChild(li);
                });
                return ul;
            }
        },
        'action-items': {
            label: 'Action Items',
            icon: '\u2705',
            delay: 1800,
            render: function () {
                var ul = document.createElement('ul');
                [
                    'Install Python 3.10+ and set up a virtual environment',
                    'Install NumPy and PyTorch following the course guide',
                    'Read Chapter 1 of the recommended textbook before next class',
                    'Complete the introductory survey on the course portal',
                    'Join the course Slack channel for Q&A and announcements',
                    'Review linear algebra basics (vectors, matrices, dot products)'
                ].forEach(function (text) {
                    var li = document.createElement('li');
                    li.textContent = text;
                    ul.appendChild(li);
                });
                return ul;
            }
        },
        rewrite: {
            label: 'Rewrite',
            icon: '\u270F\uFE0F',
            delay: 2500,
            render: function () {
                var frag = document.createDocumentFragment();
                var h4 = document.createElement('h4');
                h4.style.marginBottom = 'var(--space-sm)';
                h4.textContent = 'The Rise of Artificial Intelligence: From Dartmouth to Deep Learning';
                var p1 = document.createElement('p');
                p1.textContent = 'Artificial intelligence, once a niche academic pursuit born at a small workshop in Dartmouth in 1956, has become one of the most transformative technologies of our time. What began as an ambitious dream to replicate human cognition in machines has evolved through decades of breakthroughs and setbacks into a discipline that touches nearly every aspect of modern life.';
                var p2 = document.createElement('p');
                p2.textContent = 'The journey was far from linear. Periods of intense optimism gave way to so-called "AI winters," where funding dried up and progress stalled. Yet each winter was followed by a renaissance, fueled by new ideas and, crucially, by exponential growth in computational power and data availability.';
                var p3 = document.createElement('p');
                p3.textContent = 'Today, deep learning has revolutionized fields from computer vision to natural language processing and speech recognition. Neural networks can now identify objects in images, translate between languages in real time, and transcribe spoken words with remarkable accuracy \u2014 capabilities that seemed like science fiction just a decade ago.';
                frag.appendChild(h4);
                frag.appendChild(p1);
                frag.appendChild(p2);
                frag.appendChild(p3);
                return frag;
            }
        }
    };

    function handleAskChipClick(queueId, question, cardEl) {
        var aiBody = cardEl.querySelector('.ai-result-body');
        if (!aiBody) return;
        clearElement(aiBody);
        aiBody.appendChild(buildLoadingIndicator());
        setTimeout(function () {
            clearElement(aiBody);
            var questionP = document.createElement('p');
            var strong = document.createElement('strong');
            strong.textContent = '\u201C' + question + '\u201D';
            questionP.appendChild(strong);
            var answerP = document.createElement('p');
            answerP.textContent = 'This feature will be available soon. AI-powered Q&A about video content is coming in a future update.';
            aiBody.appendChild(questionP);
            aiBody.appendChild(answerP);
        }, 1500);
    }

    function buildLoadingIndicator() {
        var wrap = document.createElement('div');
        wrap.className = 'ai-result-loading';
        var dots = document.createElement('div');
        dots.className = 'ai-result-loading-dot';
        for (var i = 0; i < 3; i++) dots.appendChild(document.createElement('span'));
        wrap.appendChild(dots);
        wrap.appendChild(document.createTextNode(' Thinking\u2026'));
        return wrap;
    }

    function handleCardAIAction(queueId, action, cardEl) {
        var item = getItemById(queueId);
        if (!item) return;

        if (item.activeAI === action) {
            closeCardAIResult(queueId, cardEl);
            return;
        }

        item.activeAI = action;
        var config = AI_ACTIONS[action];
        if (!config) return;

        var btns = cardEl.querySelectorAll('.ai-action-btn');
        btns.forEach(function (btn) {
            btn.classList.toggle('ai-action-btn--active', btn.getAttribute('data-action') === action);
        });

        var panel = cardEl.querySelector('.ai-result-panel');
        var badge = cardEl.querySelector('.ai-result-badge');
        var aiBody = cardEl.querySelector('.ai-result-body');
        if (!panel || !badge || !aiBody) return;

        badge.textContent = config.icon + ' ' + config.label;
        panel.hidden = false;
        clearElement(aiBody);

        if (config.delay > 0) {
            aiBody.appendChild(buildLoadingIndicator());
            setTimeout(function () {
                if (item.activeAI === action) {
                    clearElement(aiBody);
                    aiBody.appendChild(config.render(queueId, cardEl));
                }
            }, config.delay);
        } else {
            aiBody.appendChild(config.render(queueId, cardEl));
        }

        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function closeCardAIResult(queueId, cardEl) {
        var item = getItemById(queueId);
        if (item) item.activeAI = null;

        var panel = cardEl.querySelector('.ai-result-panel');
        var aiBody = cardEl.querySelector('.ai-result-body');
        if (panel) panel.hidden = true;
        if (aiBody) clearElement(aiBody);

        var btns = cardEl.querySelectorAll('.ai-action-btn');
        btns.forEach(function (btn) {
            btn.classList.remove('ai-action-btn--active');
        });
    }

    // ── Paywall Modal ────────────────────────────────────────────
    var paywallTrigger = null;

    function showPaywall(force) {
        if (!paywallOverlay) return;
        if (!force && sessionStorage.getItem('yt2txt-paywall-dismissed')) return;
        paywallTrigger = document.activeElement;
        paywallOverlay.hidden = false;
        document.body.style.overflow = 'hidden';
        trapFocus(paywallOverlay);
        if (paywallClose) paywallClose.focus();
    }

    function dismissPaywall() {
        if (!paywallOverlay) return;
        releaseFocusTrap();
        paywallOverlay.hidden = true;
        document.body.style.overflow = '';
        sessionStorage.setItem('yt2txt-paywall-dismissed', '1');
        if (paywallTrigger && paywallTrigger.focus) {
            paywallTrigger.focus();
            paywallTrigger = null;
        }
    }

    if (paywallClose) paywallClose.addEventListener('click', dismissPaywall);
    if (paywallBackdrop) paywallBackdrop.addEventListener('click', dismissPaywall);

    // ── Reset ────────────────────────────────────────────────────
    function resetUI() {
        document.body.classList.remove('has-result');
        document.documentElement.style.scrollSnapType = '';
        resultEl.hidden = true;
        processingEl.hidden = true;
        if (paywallTimer) clearTimeout(paywallTimer);
        dismissPaywall();
        if (resultsList) clearElement(resultsList);
        if (queueEl) { clearElement(queueEl); queueEl.hidden = true; }
        urlInput.value = '';
        urlInput.removeAttribute('readonly');
        submitBtn.disabled = false;
        clearError();
        dismissPastePopover();

        queue = [];
        queueIdCounter = 0;
        isProcessing = false;

        updateQueueHint();
        var heroSection = document.getElementById('hero');
        if (heroSection) heroSection.scrollIntoView();
        urlInput.focus({ preventScroll: true });
        startTagline();
    }

    // ── Smart Paste ──────────────────────────────────────────────
    var pastePopoverTimeout = null;
    var pendingPasteUrls = [];

    function showPastePopover(urls) {
        if (!pastePopover) return;
        pendingPasteUrls = urls;
        var count = urls.length;
        if (pasteCount) pasteCount.textContent = count;
        if (pasteCountBtn) pasteCountBtn.textContent = count;
        pastePopover.hidden = false;

        clearTimeout(pastePopoverTimeout);
        pastePopoverTimeout = setTimeout(dismissPastePopover, 8000);
    }

    function dismissPastePopover() {
        if (!pastePopover) return;
        pastePopover.hidden = true;
        pendingPasteUrls = [];
        clearTimeout(pastePopoverTimeout);
    }

    function handlePaste(e) {
        var text = (e.clipboardData || window.clipboardData).getData('text');
        if (!text) return;

        var urls = extractAllYouTubeURLs(text);
        if (urls.length > 1) {
            e.preventDefault();
            showPastePopover(urls);
        }
    }

    if (pasteAllBtn) {
        pasteAllBtn.addEventListener('click', function () {
            var urls = pendingPasteUrls.slice();
            dismissPastePopover();
            urlInput.value = '';
            clearError();
            urls.forEach(function (url) {
                addToQueue(url);
            });
        });
    }

    if (pasteFirstBtn) {
        pasteFirstBtn.addEventListener('click', function () {
            var urls = pendingPasteUrls.slice();
            dismissPastePopover();
            if (urls.length > 0) {
                urlInput.value = urls[0];
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (paywallOverlay && !paywallOverlay.hidden) {
                dismissPaywall();
            } else if (pastePopover && !pastePopover.hidden) {
                dismissPastePopover();
            }
        }
    });

    // ── Submit Handler ───────────────────────────────────────────
    function handleSubmit(e) {
        e.preventDefault();
        clearError();

        var url = urlInput.value.trim();

        if (!url && getQueuedCount() > 0) {
            processNextInQueue();
            return;
        }

        var validationError = getURLValidationError(url);
        if (validationError) {
            showError(validationError);
            urlInput.focus();
            return;
        }

        var added = addToQueue(url);
        if (added) {
            urlInput.value = '';
            clearError();
        }
    }

    function handleAddToQueue() {
        clearError();
        var url = urlInput.value.trim();

        var validationError = getURLValidationError(url);
        if (validationError) {
            showError(validationError);
            urlInput.focus();
            return;
        }

        var added = addToQueue(url, true);
        if (added) {
            urlInput.value = '';
            clearError();
            urlInput.focus();
        }
    }

    // ── Input: clear error on typing ────────────────────────────
    if (urlInput) {
        urlInput.addEventListener('input', function () {
            if (inputHint && inputHint.classList.contains('show-error')) {
                clearError();
            }
            if (pastePopover && !pastePopover.hidden) {
                dismissPastePopover();
            }
        });
        urlInput.addEventListener('paste', handlePaste);
    }

    // ── Bind Events ─────────────────────────────────────────────
    var addBtn = document.getElementById('add-btn');
    if (addBtn) addBtn.addEventListener('click', function () { showPaywall(true); });

    if (form) form.addEventListener('submit', handleSubmit);
    if (newBtn) newBtn.addEventListener('click', resetUI);

    // Close download menus and paste popover on outside click
    document.addEventListener('click', function (e) {
        var openMenus = document.querySelectorAll('.result-card .download-menu:not([hidden])');
        openMenus.forEach(function (menu) {
            if (!menu.parentElement.contains(e.target)) {
                menu.hidden = true;
                var toggle = menu.parentElement.querySelector('.download-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
        });

        if (pastePopover && !pastePopover.hidden && !pastePopover.contains(e.target) && e.target !== urlInput) {
            dismissPastePopover();
        }
    });

    // ── Landing CTA & Scroll ────────────────────────────────────
    var landingCta = document.getElementById('landing-cta');

    function scrollToHero() {
        var heroEl = document.getElementById('hero');
        if (heroEl) {
            heroEl.scrollIntoView({ behavior: 'smooth' });
            setTimeout(function () { urlInput.focus({ preventScroll: true }); }, 600);
        }
    }

    if (landingCta) landingCta.addEventListener('click', scrollToHero);

    // ── Cleanup on page unload ─────────────────────────────────
    window.addEventListener('beforeunload', function () {
        Object.keys(activeControllers).forEach(function (id) {
            activeControllers[id].abort();
        });
        activeControllers = {};
    });

    // ── Start Tagline Rotation ──────────────────────────────────
    startTagline();

    // ── Features Carousel ────────────────────────────────────────
    var featureTabs = document.querySelectorAll('.features-tab');
    var featurePanels = document.querySelectorAll('.features-panel');
    var featuresProgressFill = document.querySelector('.features-progress-fill');
    var featureIndex = 0;
    var FEATURE_INTERVAL = 5000;
    var featureTimer = null;

    function activateFeature(index) {
        featureTabs.forEach(function (t, i) {
            t.classList.toggle('features-tab--active', i === index);
            t.setAttribute('aria-selected', i === index ? 'true' : 'false');
        });
        featurePanels.forEach(function (p, i) {
            p.classList.toggle('features-panel--active', i === index);
            if (i === index) p.removeAttribute('hidden');
            else p.setAttribute('hidden', '');
        });
        featureIndex = index;
    }

    function startFeatureProgress() {
        if (!featuresProgressFill) return;
        featuresProgressFill.style.transition = 'none';
        featuresProgressFill.style.width = '0%';
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                featuresProgressFill.style.transition = 'width ' + FEATURE_INTERVAL + 'ms linear';
                featuresProgressFill.style.width = '100%';
            });
        });
    }

    function startFeatureCarousel() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        clearInterval(featureTimer);
        startFeatureProgress();
        featureTimer = setInterval(function () {
            var next = (featureIndex + 1) % featureTabs.length;
            activateFeature(next);
            startFeatureProgress();
        }, FEATURE_INTERVAL);
    }

    function stopFeatureCarousel() {
        clearInterval(featureTimer);
        featureTimer = null;
        if (featuresProgressFill) {
            featuresProgressFill.style.transition = 'none';
            featuresProgressFill.style.width = '0%';
        }
    }

    var featuresSection = document.getElementById('features');
    if (featuresSection && featureTabs.length > 0) {
        featuresSection.addEventListener('mouseenter', stopFeatureCarousel);
        featuresSection.addEventListener('mouseleave', startFeatureCarousel);
        featuresSection.addEventListener('focusin', stopFeatureCarousel);
        featuresSection.addEventListener('focusout', function (e) {
            if (!featuresSection.contains(e.relatedTarget)) {
                startFeatureCarousel();
            }
        });

        featureTabs.forEach(function (tab, i) {
            tab.addEventListener('click', function () {
                activateFeature(i);
                startFeatureCarousel();
            });
        });

        startFeatureCarousel();
    }

})();
