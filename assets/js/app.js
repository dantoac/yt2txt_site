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

    // ── Mock Transcription API ──────────────────────────────────
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
        if (item.status === 'processing') return;

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

        mockTranscribe(next.url)
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
            .catch(function () {
                clearInterval(statusInterval);
                next.status = 'error';
                next.error = 'Transcription failed. Try again.';
                updateChipStatus(next);
                announce('Error transcribing video');
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
        document.body.classList.add('has-result');
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

        toggleBtn.appendChild(thumbLink);
        toggleBtn.appendChild(titleWrap);
        toggleBtn.appendChild(chevron);
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
        dlBtn.addEventListener('click', function () { handleCardDownload(item.id, 'txt'); });

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
        dlTxt.textContent = 'Download .txt';
        dlTxt.addEventListener('click', function () { handleCardDownload(item.id, 'txt'); dlMenu.hidden = true; dlToggle.setAttribute('aria-expanded', 'false'); });

        var dlMd = document.createElement('button');
        dlMd.className = 'download-menu-item';
        dlMd.setAttribute('role', 'menuitem');
        dlMd.textContent = 'Download .md';
        dlMd.addEventListener('click', function () { handleCardDownload(item.id, 'md'); dlMenu.hidden = true; dlToggle.setAttribute('aria-expanded', 'false'); });

        dlMenu.appendChild(dlTxt);
        dlMenu.appendChild(dlMd);

        dlToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            var open = dlMenu.hidden;
            dlMenu.hidden = !open;
            dlToggle.setAttribute('aria-expanded', String(open));
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
        copyBtn.addEventListener('click', function () { handleCardCopy(item.id, copyBtn, copyLabel); });

        // Upgrade CTA
        var upgradeCta = document.createElement('a');
        upgradeCta.href = 'pricing.html';
        upgradeCta.className = 'cta-upgrade';
        upgradeCta.setAttribute('aria-label', 'View pricing plans');
        upgradeCta.appendChild(createSvgElement('<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'));
        upgradeCta.appendChild(document.createTextNode(' Upgrade'));

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
                handleCardAIAction(item.id, ai.action, card);
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
            if (e.target.closest('.result-card-thumb')) return;
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

    // ── Reset ────────────────────────────────────────────────────
    function resetUI() {
        document.body.classList.remove('has-result');
        resultEl.hidden = true;
        processingEl.hidden = true;
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
        if (e.key === 'Escape' && pastePopover && !pastePopover.hidden) {
            dismissPastePopover();
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

        if (!url) {
            showError('Paste a YouTube URL to get started.');
            urlInput.focus();
            return;
        }

        if (!isValidYouTubeURL(url)) {
            showError('That doesn\'t look like a YouTube link. Check the URL?');
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
        if (!url) {
            showError('Paste a YouTube URL to get started.');
            urlInput.focus();
            return;
        }
        if (!isValidYouTubeURL(url)) {
            showError('That doesn\'t look like a YouTube link. Check the URL?');
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
    if (addBtn) addBtn.addEventListener('click', handleAddToQueue);

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
    var landingScrollHint = document.getElementById('landing-scroll');

    function scrollToHero() {
        var heroEl = document.getElementById('hero');
        if (heroEl) {
            heroEl.scrollIntoView({ behavior: 'smooth' });
            setTimeout(function () { urlInput.focus({ preventScroll: true }); }, 600);
        }
    }

    if (landingCta) landingCta.addEventListener('click', scrollToHero);
    if (landingScrollHint) landingScrollHint.addEventListener('click', scrollToHero);

    // ── Start Tagline Rotation ──────────────────────────────────
    startTagline();

})();
