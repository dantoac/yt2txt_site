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
    var downloadToggle = document.getElementById('download-toggle');
    var downloadMenu   = document.getElementById('download-menu');
    var newBtn        = document.getElementById('new-btn');
    var hintError     = inputHint ? inputHint.querySelector('.hint-error') : null;
    var aiResultPanel = document.getElementById('ai-result');
    var aiResultBadge = document.getElementById('ai-result-badge');
    var aiResultBody  = document.getElementById('ai-result-body');
    var aiResultClose = document.getElementById('ai-result-close');
    var aiActionBtns  = document.querySelectorAll('.ai-action-btn');

    // ── State ───────────────────────────────────────────────────
    var currentTranscript = null;
    var currentVideoTitle = '';
    var currentVideoURL   = '';
    var activeAIAction    = null;

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

        var thumbEl  = document.getElementById('result-thumb');
        var thumbImg = document.getElementById('result-thumb-img');
        var videoId  = extractVideoId(currentVideoURL);
        if (thumbEl && thumbImg && videoId) {
            thumbImg.src = 'https://img.youtube.com/vi/' + videoId + '/mqdefault.jpg';
            thumbImg.alt = data.title;
            thumbEl.href = currentVideoURL;
            thumbEl.hidden = false;
        }

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

        var upgradeCard = document.querySelector('.upgrade-card');
        if (upgradeCard && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            var delay = Math.min(data.segments.length * 30, 600) + 200;
            upgradeCard.style.animationDelay = delay + 'ms';
        }

        setProcessing(false);
        resultEl.hidden = false;
        document.body.classList.add('has-result');

        resultTitle.setAttribute('tabindex', '-1');
        resultTitle.focus({ preventScroll: false });
    }

    function resetUI() {
        document.body.classList.remove('has-result');
        resultEl.hidden = true;
        closeAIResult();
        processingEl.hidden = true;
        clearElement(transcriptEl);
        urlInput.value = '';
        urlInput.removeAttribute('readonly');
        submitBtn.disabled = false;
        clearError();
        currentTranscript = null;
        currentVideoTitle = '';
        currentVideoURL   = '';

        var thumbEl  = document.getElementById('result-thumb');
        var thumbImg = document.getElementById('result-thumb-img');
        if (thumbEl) { thumbEl.hidden = true; }
        if (thumbImg) { thumbImg.src = ''; }

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

    function buildMarkdownText() {
        if (!currentTranscript) return '';

        var lines = [
            '# ' + currentVideoTitle,
            '',
            '> Transcribed by [yt2txt](https://yt2txt.com)',
            '> URL: ' + currentVideoURL,
            '> Date: ' + new Date().toLocaleDateString('en-US'),
            '',
            '---',
            '',
        ];

        currentTranscript.forEach(function (seg) {
            lines.push('**' + formatTime(seg.start) + '** ' + seg.text);
            lines.push('');
        });

        return lines.join('\n');
    }

    // ── Processing Status Messages ──────────────────────────────
    var statusMessages = [
        'Extracting audio from the video...',
        'Listening to the audio...',
        'Whisper is transcribing...',
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
            showError('Paste a YouTube URL to get started.');
            urlInput.focus();
            return;
        }

        if (!isValidYouTubeURL(url)) {
            showError('That doesn\'t look like a YouTube link. Check the URL?');
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
                showError('Something went wrong. Try again \u2014 or try a different video.');
            });
    }

    function handleCopy() {
        var text = buildPlainText();
        if (!text) return;

        function onCopied() {
            copyBtn.classList.add('copied');
            copyLabel.textContent = 'Copied';
            copyBtn.setAttribute('aria-label', 'Copied to clipboard');

            setTimeout(function () {
                copyBtn.classList.remove('copied');
                copyLabel.textContent = 'Copy';
                copyBtn.setAttribute('aria-label', 'Copy transcript');
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

    function handleDownload(format) {
        format = format || 'txt';

        var text, mime, ext;
        if (format === 'md') {
            text = buildMarkdownText();
            mime = 'text/markdown;charset=utf-8';
            ext  = '.md';
        } else {
            text = buildPlainText();
            mime = 'text/plain;charset=utf-8';
            ext  = '.txt';
        }
        if (!text) return;

        var safeName = currentVideoTitle
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

    // ── AI Actions ───────────────────────────────────────────────
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
                p2.textContent = 'Key topics include computer vision, NLP, speech recognition, and models like OpenAI\u2019s Whisper. The course will progress from basic neural networks to transformers, with practical assignments using Python, NumPy, and PyTorch.';
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
                 'Whisper by OpenAI enables multilingual audio transcription',
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
                var label = document.createElement('p');
                label.style.fontSize = '0.75rem';
                label.style.color = 'var(--text-muted)';
                label.style.marginBottom = 'var(--space-sm)';
                label.textContent = 'Translated to Spanish';
                frag.appendChild(label);
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
            render: function () {
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
                    suggestions.appendChild(chip);
                });
                frag.appendChild(suggestions);
                return frag;
            }
        }
    };

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

    function handleAIAction(action) {
        if (activeAIAction === action) {
            closeAIResult();
            return;
        }

        activeAIAction = action;
        var config = AI_ACTIONS[action];
        if (!config) return;

        aiActionBtns.forEach(function (btn) {
            btn.classList.toggle('ai-action-btn--active', btn.getAttribute('data-action') === action);
        });

        aiResultBadge.textContent = config.icon + ' ' + config.label;
        aiResultPanel.hidden = false;
        clearElement(aiResultBody);

        if (config.delay > 0) {
            aiResultBody.appendChild(buildLoadingIndicator());
            setTimeout(function () {
                if (activeAIAction === action) {
                    clearElement(aiResultBody);
                    aiResultBody.appendChild(config.render());
                    bindAskChips();
                }
            }, config.delay);
        } else {
            aiResultBody.appendChild(config.render());
            bindAskChips();
        }

        aiResultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function closeAIResult() {
        activeAIAction = null;
        aiResultPanel.hidden = true;
        clearElement(aiResultBody);
        aiActionBtns.forEach(function (btn) {
            btn.classList.remove('ai-action-btn--active');
        });
    }

    function bindAskChips() {
        var chips = aiResultPanel.querySelectorAll('.ai-ask-chip');
        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                var q = chip.getAttribute('data-question');
                clearElement(aiResultBody);
                aiResultBody.appendChild(buildLoadingIndicator());
                setTimeout(function () {
                    clearElement(aiResultBody);
                    var questionP = document.createElement('p');
                    var strong = document.createElement('strong');
                    strong.textContent = '\u201C' + q + '\u201D';
                    questionP.appendChild(strong);
                    var answerP = document.createElement('p');
                    answerP.textContent = 'This feature will be available soon. AI-powered Q&A about video content is coming in a future update.';
                    aiResultBody.appendChild(questionP);
                    aiResultBody.appendChild(answerP);
                }, 1500);
            });
        });
    }

    // ── Input: clear error on typing ────────────────────────────
    if (urlInput) {
        urlInput.addEventListener('input', function () {
            if (inputHint.classList.contains('show-error')) {
                clearError();
            }
        });
    }

    // ── Bind Events ─────────────────────────────────────────────
    if (form) form.addEventListener('submit', handleSubmit);
    if (copyBtn) copyBtn.addEventListener('click', handleCopy);
    if (downloadBtn) downloadBtn.addEventListener('click', function () { handleDownload('txt'); });
    if (newBtn) newBtn.addEventListener('click', resetUI);

    // ── Download Dropdown ─────────────────────────────────────────
    function toggleDownloadMenu() {
        if (!downloadMenu) return;
        var open = downloadMenu.hidden;
        downloadMenu.hidden = !open;
        if (downloadToggle) downloadToggle.setAttribute('aria-expanded', String(open));
    }

    function closeDownloadMenu() {
        if (!downloadMenu) return;
        downloadMenu.hidden = true;
        if (downloadToggle) downloadToggle.setAttribute('aria-expanded', 'false');
    }

    if (downloadToggle) {
        downloadToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleDownloadMenu();
        });
    }

    if (downloadMenu) {
        downloadMenu.addEventListener('click', function (e) {
            var item = e.target.closest('.download-menu-item');
            if (!item) return;
            var fmt = item.getAttribute('data-format');
            handleDownload(fmt);
            closeDownloadMenu();
        });
    }

    document.addEventListener('click', function () {
        closeDownloadMenu();
    });

    aiActionBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            handleAIAction(btn.getAttribute('data-action'));
        });
    });
    if (aiResultClose) aiResultClose.addEventListener('click', closeAIResult);

    // ── Start Tagline Rotation ──────────────────────────────────
    startTagline();

})();
