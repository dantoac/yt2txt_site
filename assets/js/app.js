(function () {
    'use strict';

    // ── Internationalization ──────────────────────────────────────
    var translations = {
        en: {
            // Page titles
            'title.index': 'yt2txt \u2014 Read any YouTube video',
            'title.pricing': 'Pricing \u2014 yt2txt',

            // Skip link
            'skip-link': 'Skip to content',

            // Navbar
            'nav.transcribe': 'Transcribe',
            'nav.features': 'Features',
            'nav.pricing': 'Pricing',
            'nav.faq': 'FAQ',

            // Theme toggle
            'theme.to-light': 'Switch to light mode',
            'theme.to-dark': 'Switch to dark mode',

            // Lang toggle
            'lang.to-es': 'Cambiar a espa\u00f1ol',
            'lang.to-en': 'Switch to English',

            // Hamburger
            'hamburger.open': 'Open navigation menu',
            'hamburger.close': 'Close navigation menu',

            // Hero
            'hero.headline': 'Read any<br>YouTube video',
            'hero.tagline-1': 'Reading your videos',
            'hero.tagline-2': 'Ears made of code',
            'hero.tagline-3': 'Actually listens to the audio',
            'hero.tagline-4': 'Bytes in, words out',
            'hero.tagline-5': 'Watching so you don\'t have to',
            'hero.tagline-6': 'No subtitles? No problem',
            'hero.tagline-7': '...I know kung-fu',

            // Plan strip
            'plan.badge': 'FREE',
            'plan.quota': '<strong>12 min</strong> of 30 min used',

            // Input
            'input.placeholder': 'https://youtube.com/watch?v=...',
            'input.aria': 'YouTube video URL',
            'input.hint': 'Paste any YouTube link',
            'btn.transcribe': 'Transcribe',
            'btn.transcribe-aria': 'Transcribe video',
            'btn.add-aria': 'Add another video',
            'upgrade.hint': '<a href="pricing.html">Upgrade</a> for AI summaries, longer videos &amp; batch processing',

            // Validation errors
            'validation.empty': 'Paste a YouTube URL to get started.',
            'validation.invalid': 'Paste a full YouTube URL (e.g. https://youtube.com/watch?v=...)',
            'validation.not-youtube': 'That\'s a valid URL, but not a YouTube link.',
            'validation.no-id': 'Looks like a YouTube URL, but we couldn\'t find a video ID.',

            // API errors
            'error.network': 'Network error. Check your connection and try again.',
            'error.timeout': 'The request timed out. The video may be too long \u2014 try again later.',
            'error.rate-limit': 'Too many requests. Please wait a moment and try again.',
            'error.server': 'Server error. Our team has been notified \u2014 please try again later.',
            'error.malformed': 'Received an unexpected response from the server.',
            'error.not-found': 'Video not found. It may be private or unavailable.',
            'error.generic': 'Transcription failed. Try again.',

            // Processing status
            'status.extracting': 'Extracting audio from the video...',
            'status.listening': 'Listening to the audio...',
            'status.transcribing': 'Transcribing the audio...',
            'status.formatting': 'Formatting your transcript...',

            // Export
            'export.header': 'yt2txt \u2014 Transcript',
            'export.video': 'Video: ',
            'export.url': 'URL: ',
            'export.date': 'Date: ',

            // Result card
            'result.open-yt': 'Open video on YouTube',
            'result.segments': 'segments',
            'result.paragraphs': 'paragraphs',

            // Toolbar
            'toolbar.aria': 'Transcript actions',
            'toolbar.download-aria': 'Download transcript',
            'toolbar.download-tooltip': 'Download transcript',
            'toolbar.download-txt': 'Download .txt',
            'toolbar.download-md': 'Download .md',
            'toolbar.copy-aria': 'Copy transcript',
            'toolbar.copy-tooltip': 'Copy to clipboard',
            'toolbar.copied': 'Copied',
            'toolbar.copied-aria': 'Copied to clipboard',
            'toolbar.plans-aria': 'View pricing plans',
            'toolbar.plans-tooltip': 'View plans',

            // AI actions
            'ai.summarize': 'Summarize',
            'ai.translate': 'Translate',
            'ai.chapters': 'Chapters',
            'ai.keywords': 'Keywords',
            'ai.quiz': 'Quiz',
            'ai.close': 'Close AI result',
            'ai.translate-label': 'Translated to Spanish',
            'ai.thinking': 'Thinking\u2026',

            // Transcript
            'transcript.aria': 'Transcript text',
            'transcript.badge': '\u2726 Auto-enhanced',
            'transcript.badge-tooltip': 'Corrected punctuation, filler words removed, and formatting improved',

            // Announcements
            'announce.complete': 'Transcription complete: ',
            'announce.error': 'Error: ',

            // Features section
            'features.title': 'One link. Four superpowers.',
            'features.sub': 'Everything you need to get more from any YouTube video.',
            'features.tab-transcript': 'Transcript',
            'features.tab-summary': 'Summary',
            'features.tab-keypoints': 'Key Points',
            'features.tab-translate': 'Translate',
            'features.transcript-title': 'Full Transcript',
            'features.transcript-body': 'Every word, with timestamps. Search, copy, and download in seconds.',
            'features.summary-title': 'AI Summary',
            'features.summary-body': 'Get the gist in 3 sentences. No fluff, no filler.',
            'features.keypoints-title': 'Key Points',
            'features.keypoints-body': 'The most important ideas, extracted and listed clearly.',
            'features.translate-title': 'Translate',
            'features.translate-body': 'Turn any transcript into any language instantly.',

            // Paywall
            'paywall.close-aria': 'Close upgrade dialog',
            'paywall.title': 'Unlock more transcriptions',
            'paywall.subtitle': 'You\'ve used your free quota. Choose a plan to keep going.',
            'paywall.starter': 'Starter',
            'paywall.starter-price': '$4<span>/mo</span>',
            'paywall.starter-desc': '60 min of transcription per month',
            'paywall.starter-cta': 'Get Starter',
            'paywall.popular': 'Popular',
            'paywall.standard': 'Standard',
            'paywall.standard-price': '$9<span>/mo</span>',
            'paywall.standard-desc': '300 min of transcription per month',
            'paywall.standard-cta': 'Get Standard',
            'paywall.bulk': 'Bulk',
            'paywall.bulk-price': '$19<span>/mo</span>',
            'paywall.bulk-desc': '1200 min of transcription per month',
            'paywall.bulk-cta': 'Get Bulk',
            'paywall.compare': '<a href="pricing.html">Compare all plans &rarr;</a>',

            // Footer
            'footer': '&copy; 2026 yt2txt &middot; <a href="pricing.html">Pricing</a> &middot; <a href="https://github.com/AInvirion/youtube-transcriber/issues" target="_blank" rel="noopener noreferrer" aria-label="Report an issue (opens GitHub)">Report an issue</a>',

            // Pricing page
            'pricing.title': 'Billing &amp; Credits',
            'pricing.subtitle': '30 free minutes every month. Buy more when you need them.',
            'pricing.plan-badge': 'Free Tier',
            'pricing.free-name': 'FREE',
            'pricing.free-quota': '30 minutes <span>/ month</span>',
            'pricing.feature-1': 'Standard queue',
            'pricing.feature-2': '.txt &amp; .md downloads',
            'pricing.feature-3': 'AI-powered transcription',
            'pricing.feature-4': 'Batch transcription',
            'pricing.start-cta': 'Start transcribing',
            'pricing.buy-heading': 'Buy Additional Minutes',
            'pricing.info-banner': 'Payment integration coming soon! Contact support to purchase credits.',
            'pricing.starter-name': 'Starter',
            'pricing.starter-min': '60 minutes',
            'pricing.starter-desc': 'Top up for a quick project.',
            'pricing.starter-btn': 'Coming Soon',
            'pricing.best-value': 'Best value',
            'pricing.standard-name': 'Standard',
            'pricing.standard-min': '150 minutes <span class="pricing-savings-badge">+25%</span>',
            'pricing.standard-desc': 'Great for regular use.',
            'pricing.standard-btn': 'Coming Soon',
            'pricing.bulk-name': 'Bulk',
            'pricing.bulk-min': '350 minutes <span class="pricing-savings-badge">+46%</span>',
            'pricing.bulk-desc': 'For heavy workloads.',
            'pricing.bulk-btn': 'Coming Soon',
            'pricing.faq-title': 'Frequently asked questions',
            'pricing.faq-q1': 'Can yt2txt transcribe videos without subtitles?',
            'pricing.faq-a1': 'Yes. yt2txt uses AI-powered speech recognition to transcribe directly from the audio, so it works even when no subtitles or captions are available.',
            'pricing.faq-q2': 'How many free minutes do I get?',
            'pricing.faq-a2': 'Every account gets 30 free minutes of transcription per month. You can purchase additional minutes if you need more.',
            'pricing.faq-q3': 'What formats can I download transcripts in?',
            'pricing.faq-a3': 'You can download transcripts as plain text (.txt) or Markdown (.md) files.',
            'pricing.still-questions': 'Still have questions?',
            'pricing.still-text': 'Open an issue on <a href="https://github.com/AInvirion/youtube-transcriber/issues" target="_blank" rel="noopener noreferrer">GitHub</a> or email us at <a href="mailto:hello@yt2txt.com">hello@yt2txt.com</a>.',
            'pricing.footer': '&copy; 2026 yt2txt &middot; <a href="pricing.html" aria-current="page">Pricing</a> &middot; <a href="https://github.com/AInvirion/youtube-transcriber/issues" target="_blank" rel="noopener noreferrer" aria-label="Report an issue (opens GitHub)">Report an issue</a>'
        },
        es: {
            // Page titles
            'title.index': 'yt2txt \u2014 Lee cualquier video de YouTube',
            'title.pricing': 'Precios \u2014 yt2txt',

            // Skip link
            'skip-link': 'Ir al contenido',

            // Navbar
            'nav.transcribe': 'Transcribir',
            'nav.features': 'Funciones',
            'nav.pricing': 'Precios',
            'nav.faq': 'Preguntas frecuentes',

            // Theme toggle
            'theme.to-light': 'Cambiar a modo claro',
            'theme.to-dark': 'Cambiar a modo oscuro',

            // Lang toggle
            'lang.to-es': 'Cambiar a espa\u00f1ol',
            'lang.to-en': 'Switch to English',

            // Hamburger
            'hamburger.open': 'Abrir men\u00fa de navegaci\u00f3n',
            'hamburger.close': 'Cerrar men\u00fa de navegaci\u00f3n',

            // Hero
            'hero.headline': 'Lee cualquier<br>video de YouTube',
            'hero.tagline-1': 'Leyendo tus videos',
            'hero.tagline-2': 'O\u00eddos hechos de c\u00f3digo',
            'hero.tagline-3': 'Realmente escucha el audio',
            'hero.tagline-4': 'Bytes entran, palabras salen',
            'hero.tagline-5': 'Mira por ti',
            'hero.tagline-6': '\u00bfSin subt\u00edtulos? No hay problema',
            'hero.tagline-7': '...Yo s\u00e9 kung-fu',

            // Plan strip
            'plan.badge': 'GRATIS',
            'plan.quota': '<strong>12 min</strong> de 30 min usados',

            // Input
            'input.placeholder': 'https://youtube.com/watch?v=...',
            'input.aria': 'URL del video de YouTube',
            'input.hint': 'Pega cualquier link de YouTube',
            'btn.transcribe': 'Transcribir',
            'btn.transcribe-aria': 'Transcribir video',
            'btn.add-aria': 'Agregar otro video',
            'upgrade.hint': '<a href="pricing.html">Mejora tu plan</a> para res\u00famenes con IA, videos m\u00e1s largos y procesamiento por lotes',

            // Validation errors
            'validation.empty': 'Pega una URL de YouTube para comenzar.',
            'validation.invalid': 'Pega una URL completa de YouTube (ej. https://youtube.com/watch?v=...)',
            'validation.not-youtube': 'Es una URL v\u00e1lida, pero no es un enlace de YouTube.',
            'validation.no-id': 'Parece una URL de YouTube, pero no encontramos un ID de video.',

            // API errors
            'error.network': 'Error de red. Verifica tu conexi\u00f3n e intenta de nuevo.',
            'error.timeout': 'La solicitud expir\u00f3. El video puede ser muy largo \u2014 intenta m\u00e1s tarde.',
            'error.rate-limit': 'Demasiadas solicitudes. Espera un momento e intenta de nuevo.',
            'error.server': 'Error del servidor. Nuestro equipo fue notificado \u2014 intenta m\u00e1s tarde.',
            'error.malformed': 'Respuesta inesperada del servidor.',
            'error.not-found': 'Video no encontrado. Puede ser privado o no estar disponible.',
            'error.generic': 'La transcripci\u00f3n fall\u00f3. Intenta de nuevo.',

            // Processing status
            'status.extracting': 'Extrayendo audio del video...',
            'status.listening': 'Escuchando el audio...',
            'status.transcribing': 'Transcribiendo el audio...',
            'status.formatting': 'Formateando tu transcripci\u00f3n...',

            // Export
            'export.header': 'yt2txt \u2014 Transcripci\u00f3n',
            'export.video': 'Video: ',
            'export.url': 'URL: ',
            'export.date': 'Fecha: ',

            // Result card
            'result.open-yt': 'Abrir video en YouTube',
            'result.segments': 'segmentos',
            'result.paragraphs': 'p\u00e1rrafos',

            // Toolbar
            'toolbar.aria': 'Acciones de transcripci\u00f3n',
            'toolbar.download-aria': 'Descargar transcripci\u00f3n',
            'toolbar.download-tooltip': 'Descargar transcripción',
            'toolbar.download-txt': 'Descargar .txt',
            'toolbar.download-md': 'Descargar .md',
            'toolbar.copy-aria': 'Copiar transcripci\u00f3n',
            'toolbar.copy-tooltip': 'Copiar al portapapeles',
            'toolbar.copied': 'Copiado',
            'toolbar.copied-aria': 'Copiado al portapapeles',
            'toolbar.plans-aria': 'Ver planes de precios',
            'toolbar.plans-tooltip': 'Ver planes',

            // AI actions
            'ai.summarize': 'Resumir',
            'ai.translate': 'Traducir',
            'ai.chapters': 'Capítulos',
            'ai.keywords': 'Palabras clave',
            'ai.quiz': 'Quiz',
            'ai.close': 'Cerrar resultado IA',
            'ai.translate-label': 'Traducido al español',
            'ai.thinking': 'Pensando\u2026',

            // Transcript
            'transcript.aria': 'Texto de la transcripci\u00f3n',
            'transcript.badge': '\u2726 Auto-mejorado',
            'transcript.badge-tooltip': 'Puntuaci\u00f3n corregida, muletillas eliminadas y formato mejorado',

            // Announcements
            'announce.complete': 'Transcripci\u00f3n completa: ',
            'announce.error': 'Error: ',

            // Features section
            'features.title': 'Un link. Cuatro superpoderes.',
            'features.sub': 'Todo lo que necesitas para sacar m\u00e1s de cualquier video de YouTube.',
            'features.tab-transcript': 'Transcripci\u00f3n',
            'features.tab-summary': 'Resumen',
            'features.tab-keypoints': 'Puntos clave',
            'features.tab-translate': 'Traducir',
            'features.transcript-title': 'Transcripci\u00f3n completa',
            'features.transcript-body': 'Cada palabra, con marcas de tiempo. Busca, copia y descarga en segundos.',
            'features.summary-title': 'Resumen con IA',
            'features.summary-body': 'La esencia en 3 oraciones. Sin relleno.',
            'features.keypoints-title': 'Puntos clave',
            'features.keypoints-body': 'Las ideas m\u00e1s importantes, extra\u00eddas y listadas con claridad.',
            'features.translate-title': 'Traducir',
            'features.translate-body': 'Convierte cualquier transcripci\u00f3n a cualquier idioma al instante.',

            // Paywall
            'paywall.close-aria': 'Cerrar di\u00e1logo de mejora',
            'paywall.title': 'Desbloquea m\u00e1s transcripciones',
            'paywall.subtitle': 'Usaste tu cuota gratuita. Elige un plan para continuar.',
            'paywall.starter': 'Starter',
            'paywall.starter-price': '$4<span>/mes</span>',
            'paywall.starter-desc': '60 min de transcripci\u00f3n al mes',
            'paywall.starter-cta': 'Elegir Starter',
            'paywall.popular': 'Popular',
            'paywall.standard': 'Standard',
            'paywall.standard-price': '$9<span>/mes</span>',
            'paywall.standard-desc': '300 min de transcripci\u00f3n al mes',
            'paywall.standard-cta': 'Elegir Standard',
            'paywall.bulk': 'Bulk',
            'paywall.bulk-price': '$19<span>/mes</span>',
            'paywall.bulk-desc': '1200 min de transcripci\u00f3n al mes',
            'paywall.bulk-cta': 'Elegir Bulk',
            'paywall.compare': '<a href="pricing.html">Comparar todos los planes &rarr;</a>',

            // Footer
            'footer': '&copy; 2026 yt2txt &middot; <a href="pricing.html">Precios</a> &middot; <a href="https://github.com/AInvirion/youtube-transcriber/issues" target="_blank" rel="noopener noreferrer" aria-label="Reportar un problema (abre GitHub)">Reportar un problema</a>',

            // Pricing page
            'pricing.title': 'Facturaci\u00f3n y cr\u00e9ditos',
            'pricing.subtitle': '30 minutos gratis cada mes. Compra m\u00e1s cuando los necesites.',
            'pricing.plan-badge': 'Plan gratuito',
            'pricing.free-name': 'GRATIS',
            'pricing.free-quota': '30 minutos <span>/ mes</span>',
            'pricing.feature-1': 'Cola est\u00e1ndar',
            'pricing.feature-2': 'Descargas .txt y .md',
            'pricing.feature-3': 'Transcripci\u00f3n con IA',
            'pricing.feature-4': 'Transcripci\u00f3n por lotes',
            'pricing.start-cta': 'Comenzar a transcribir',
            'pricing.buy-heading': 'Comprar minutos adicionales',
            'pricing.info-banner': '\u00a1Integraci\u00f3n de pagos pr\u00f3ximamente! Contacta a soporte para comprar cr\u00e9ditos.',
            'pricing.starter-name': 'Starter',
            'pricing.starter-min': '60 minutos',
            'pricing.starter-desc': 'Recarga para un proyecto r\u00e1pido.',
            'pricing.starter-btn': 'Pr\u00f3ximamente',
            'pricing.best-value': 'Mejor valor',
            'pricing.standard-name': 'Standard',
            'pricing.standard-min': '150 minutos <span class="pricing-savings-badge">+25%</span>',
            'pricing.standard-desc': 'Ideal para uso regular.',
            'pricing.standard-btn': 'Pr\u00f3ximamente',
            'pricing.bulk-name': 'Bulk',
            'pricing.bulk-min': '350 minutos <span class="pricing-savings-badge">+46%</span>',
            'pricing.bulk-desc': 'Para cargas pesadas.',
            'pricing.bulk-btn': 'Pr\u00f3ximamente',
            'pricing.faq-title': 'Preguntas frecuentes',
            'pricing.faq-q1': '\u00bfPuede yt2txt transcribir videos sin subt\u00edtulos?',
            'pricing.faq-a1': 'S\u00ed. yt2txt utiliza reconocimiento de voz con IA para transcribir directamente del audio, as\u00ed que funciona incluso cuando no hay subt\u00edtulos disponibles.',
            'pricing.faq-q2': '\u00bfCu\u00e1ntos minutos gratis tengo?',
            'pricing.faq-a2': 'Cada cuenta recibe 30 minutos gratis de transcripci\u00f3n al mes. Puedes comprar minutos adicionales si necesitas m\u00e1s.',
            'pricing.faq-q3': '\u00bfEn qu\u00e9 formatos puedo descargar las transcripciones?',
            'pricing.faq-a3': 'Puedes descargar transcripciones como archivos de texto plano (.txt) o Markdown (.md).',
            'pricing.still-questions': '\u00bfA\u00fan tienes preguntas?',
            'pricing.still-text': 'Abre un issue en <a href="https://github.com/AInvirion/youtube-transcriber/issues" target="_blank" rel="noopener noreferrer">GitHub</a> o escr\u00edbenos a <a href="mailto:hello@yt2txt.com">hello@yt2txt.com</a>.',
            'pricing.footer': '&copy; 2026 yt2txt &middot; <a href="pricing.html" aria-current="page">Precios</a> &middot; <a href="https://github.com/AInvirion/youtube-transcriber/issues" target="_blank" rel="noopener noreferrer" aria-label="Reportar un problema (abre GitHub)">Reportar un problema</a>'
        }
    };

    var currentLang = 'en';

    function getPreferredLang() {
        var stored = localStorage.getItem('yt2txt-lang');
        if (stored && translations[stored]) return stored;
        var nav = (navigator.language || '').slice(0, 2).toLowerCase();
        return translations[nav] ? nav : 'en';
    }

    function t(key) {
        var dict = translations[currentLang];
        if (dict && dict[key] !== undefined) return dict[key];
        return translations.en[key] || key;
    }

    function applyTranslations() {
        // textContent updates
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            el.textContent = t(el.getAttribute('data-i18n'));
        });
        // Safe HTML updates (trusted translation strings only, never user input)
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-html');
            var value = t(key);
            // Parse safely via template element to avoid script injection
            var tmpl = document.createElement('template');
            tmpl.innerHTML = value;
            while (el.firstChild) el.removeChild(el.firstChild);
            el.appendChild(tmpl.content.cloneNode(true));
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
        });
        document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
            el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria-label')));
        });
        document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
            el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
        });
        document.querySelectorAll('[data-i18n-data-tooltip]').forEach(function (el) {
            el.setAttribute('data-tooltip', t(el.getAttribute('data-i18n-data-tooltip')));
        });
    }

    function setLang(lang) {
        if (!translations[lang]) return;
        currentLang = lang;
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('yt2txt-lang', lang);

        // Update lang toggle display
        var langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            var code = langToggle.querySelector('.lang-toggle-code');
            if (code) code.textContent = lang.toUpperCase();
            langToggle.setAttribute('aria-label', lang === 'en' ? t('lang.to-es') : t('lang.to-en'));
        }

        // Update page title
        var isIndex = !document.body.classList.contains('page-pricing');
        document.title = t(isIndex ? 'title.index' : 'title.pricing');

        // Update theme toggle aria-label
        var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        var themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', currentTheme === 'dark' ? t('theme.to-light') : t('theme.to-dark'));
        }

        // Update hamburger aria-label
        var hamburger = document.querySelector('.island-hamburger');
        if (hamburger) {
            var isOpen = hamburger.classList.contains('is-open');
            hamburger.setAttribute('aria-label', isOpen ? t('hamburger.close') : t('hamburger.open'));
        }

        applyTranslations();

        // Mark active lang menu item
        if (typeof markActiveLangItem === 'function') markActiveLangItem();

        // Re-measure island width after text change
        if (remeasureIsland) remeasureIsland();
    }

    // Initialize language
    currentLang = getPreferredLang();
    document.documentElement.setAttribute('data-lang', currentLang);
    document.documentElement.setAttribute('lang', currentLang);

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
            toggle.setAttribute('aria-label', theme === 'dark' ? t('theme.to-light') : t('theme.to-dark'));
        }
    }

    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        var initTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
        themeToggle.setAttribute('aria-label', initTheme === 'dark' ? t('theme.to-light') : t('theme.to-dark'));

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

    // ── Island Navbar: Scroll Morph (standard -> island) ---------
    var remeasureIsland = null;

    (function () {
        var hero = document.querySelector('.landing') || document.querySelector('.pricing-hero');
        var nav = document.querySelector('.navbar--island');
        var island = document.querySelector('.navbar-island');
        if (!hero || !nav || !island) return;
        var morphClass = 'scrolled-past-hero';
        var isScrolled = false;

        nav.classList.add('navbar--no-transition');

        function measureIslandWidth() {
            island.style.removeProperty('--island-scroll-width');
            var wasScrolled = document.body.classList.contains(morphClass);
            if (!wasScrolled) document.body.classList.add(morphClass);
            var w = island.getBoundingClientRect().width;
            if (!wasScrolled) document.body.classList.remove(morphClass);
            island.style.setProperty('--island-scroll-width', w + 'px');
        }

        measureIslandWidth();

        // Expose for lang toggle re-measurement
        remeasureIsland = function () {
            nav.classList.add('navbar--no-transition');
            measureIslandWidth();
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    nav.classList.remove('navbar--no-transition');
                });
            });
        };

        function checkScroll() {
            var pastHero = window.scrollY > 0;
            if (pastHero !== isScrolled) {
                isScrolled = pastHero;
                document.body.classList.toggle(morphClass, isScrolled);
            }
        }

        checkScroll();

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                nav.classList.remove('navbar--no-transition');
            });
        });

        window.addEventListener('scroll', checkScroll, { passive: true });

        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                remeasureIsland();
            }, 150);
        });
    })();

    // ── Island Navbar: Mobile Hamburger Menu ────────────────────
    (function () {
        var hamburger = document.querySelector('.island-hamburger');
        var navbarIsland = document.querySelector('.navbar-island');
        var navbarNav = document.querySelector('.navbar--island');
        var menuItems = document.querySelectorAll('.island-menu-item');
        if (!hamburger || !navbarIsland) return;

        var scrollGuard = 0;

        function openMenu() {
            navbarIsland.classList.add('island-open');
            hamburger.classList.add('is-open');
            hamburger.setAttribute('aria-expanded', 'true');
            hamburger.setAttribute('aria-label', t('hamburger.close'));
            scrollGuard = Date.now();
        }

        function closeMenu() {
            navbarIsland.classList.remove('island-open');
            hamburger.classList.remove('is-open');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', t('hamburger.open'));
            hamburger.focus();
        }

        function isOpen() {
            return navbarIsland.classList.contains('island-open');
        }

        hamburger.addEventListener('click', function () {
            if (isOpen()) closeMenu(); else openMenu();
        });

        menuItems.forEach(function (item) {
            item.addEventListener('click', function () { closeMenu(); });
        });

        window.addEventListener('scroll', function () {
            if (isOpen() && Date.now() - scrollGuard > 150) closeMenu();
        }, { passive: true });

        document.addEventListener('click', function (e) {
            var container = navbarNav || navbarIsland;
            if (isOpen() && !container.contains(e.target)) closeMenu();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen()) closeMenu();
        });
    })();

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
    var planStrip          = document.querySelector('.plan-strip');
    var planStripParent    = planStrip ? planStrip.parentNode : null;
    var planStripSibling   = planStrip ? planStrip.nextElementSibling : null;
    var hintError     = inputHint ? inputHint.querySelector('.hint-error') : null;
    var announcer      = document.getElementById('status-announcer');
    var paywallOverlay = document.getElementById('paywall-overlay');
    var paywallClose   = document.getElementById('paywall-close');
    var paywallBackdrop = document.getElementById('paywall-backdrop');
    var paywallTimer   = null;

    // ── State ───────────────────────────────────────────────────
    var currentItem = null;
    var currentController = null;
    var isProcessing = false;

    // ── Demo Mode ──────────────────────────────────────────────
    var DEMO_URL = 'https://youtu.be/aircAruvnKk';
    var DEMO_CHAR_DELAY_MIN = 45;
    var DEMO_CHAR_DELAY_MAX = 85;
    var DEMO_POST_TYPE_DELAY = 700;
    var demoPlayed = false;
    var demoInProgress = false;

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
        if (!trimmed) return t('validation.empty');
        if (!isURL(trimmed)) return t('validation.invalid');
        if (!isYouTubeDomain(trimmed)) return t('validation.not-youtube');
        if (!isValidYouTubeURL(trimmed)) return t('validation.no-id');
        return null;
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
        if (urlInput) urlInput.setAttribute('aria-invalid', 'true');
    }

    function clearError() {
        if (!inputHint || !inputWrapper || !hintError) return;
        inputHint.classList.remove('show-error');
        inputWrapper.classList.remove('has-error');
        hintError.textContent = '';
        if (urlInput) urlInput.removeAttribute('aria-invalid');
    }

    function clearElement(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

    function announce(msg) {
        if (!announcer) return;
        announcer.textContent = '';
        setTimeout(function () {
            announcer.textContent = msg;
        }, 50);
    }

    // ── Helpers ─────────────────────────────────────────────────
    function formatTime(seconds) {
        var m = Math.floor(seconds / 60);
        var s = Math.floor(seconds % 60);
        return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }

    function buildPlainTextForItem(item) {
        if (!item || !item.segments) return '';
        var dateLang = currentLang === 'es' ? 'es-ES' : 'en-US';
        var lines = [
            t('export.header'),
            t('export.video') + item.title,
            t('export.url') + item.url,
            t('export.date') + new Date().toLocaleDateString(dateLang),
            '',
            '---',
            '',
        ];
        item.segments.forEach(function (seg) {
            lines.push(typeof seg.start === 'number' ? '[' + formatTime(seg.start) + '] ' + seg.text : seg.text);
        });
        return lines.join('\n');
    }

    function buildMarkdownTextForItem(item) {
        if (!item || !item.segments) return '';
        var dateLang = currentLang === 'es' ? 'es-ES' : 'en-US';
        var lines = [
            '# ' + item.title,
            '',
            '> Transcribed by [yt2txt](https://yt2txt.com)',
            '> ' + t('export.url') + item.url,
            '> ' + t('export.date') + new Date().toLocaleDateString(dateLang),
            '',
            '---',
            '',
        ];
        item.segments.forEach(function (seg) {
            lines.push(typeof seg.start === 'number' ? '**' + formatTime(seg.start) + '** ' + seg.text : seg.text);
            lines.push('');
        });
        return lines.join('\n');
    }

    // ── Processing Status Messages ──────────────────────────────
    function getStatusMessages() {
        return [
            t('status.extracting'),
            t('status.listening'),
            t('status.transcribing'),
            t('status.formatting'),
        ];
    }

    function cycleProcessingStatus() {
        var msgs = getStatusMessages();
        var i = 0;
        processingTxt.textContent = msgs[0];
        return setInterval(function () {
            i = (i + 1) % msgs.length;
            processingTxt.textContent = msgs[i];
        }, 2200);
    }

    // ── Transcription API ──────────────────────────────────────
    var API_BASE = '';
    var API_TIMEOUT_MS = 30000;
    var API_ERROR = {
        NETWORK:   'NETWORK',
        TIMEOUT:   'TIMEOUT',
        RATE_LIMIT:'RATE_LIMIT',
        SERVER:    'SERVER',
        MALFORMED: 'MALFORMED',
        NOT_FOUND: 'NOT_FOUND'
    };

    var API_ERROR_KEY_MAP = {};
    API_ERROR_KEY_MAP[API_ERROR.NETWORK]    = 'error.network';
    API_ERROR_KEY_MAP[API_ERROR.TIMEOUT]    = 'error.timeout';
    API_ERROR_KEY_MAP[API_ERROR.RATE_LIMIT] = 'error.rate-limit';
    API_ERROR_KEY_MAP[API_ERROR.SERVER]     = 'error.server';
    API_ERROR_KEY_MAP[API_ERROR.MALFORMED]  = 'error.malformed';
    API_ERROR_KEY_MAP[API_ERROR.NOT_FOUND]  = 'error.not-found';

    function ApiError(type, message) {
        this.type = type;
        this.message = message || t(API_ERROR_KEY_MAP[type] || 'error.generic');
    }

    function validateTranscriptResponse(data) {
        if (!data || typeof data !== 'object') return false;
        if (typeof data.title !== 'string' || !data.title) return false;
        if (typeof data.duration !== 'string') return false;
        if (!Array.isArray(data.segments) || data.segments.length === 0) return false;
        return data.segments.every(function (seg) {
            return typeof seg.text === 'string' && (seg.start === undefined || typeof seg.start === 'number');
        });
    }

    function mockTranscribe(_url) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve({
                    title: 'But what is a neural network? | Deep learning, chapter 1',
                    duration: '19:13',
                    segments: [
                        { text: 'This is a 3. It\u2019s sloppily written and rendered at an extremely low resolution of 28x28 pixels, but your brain has no trouble recognizing it as a 3. I want you to take a moment to appreciate how crazy it is that brains can do this so effortlessly. This, this, and this are also recognizable as 3s, even though the specific values of each pixel are very different from one image to the next. The particular light-sensitive cells in your eye that are firing when you see this 3 are very different from the ones firing when you see this 3. But something in that crazy-smart visual cortex of yours resolves these as representing the same idea while recognizing other images as their own distinct ideas.' },
                        { text: 'If I told you to sit down and write a program that takes in a grid of 28x28 pixels like this and outputs a single number between 0 and 10, telling you what it thinks the digit is, the task goes from comically trivial to dauntingly difficult. Unless you\u2019ve been living under a rock, I think I hardly need to motivate the relevance and importance of machine learning and neural networks to the present and future. What I want to do here is show you what a neural network actually is, assuming no background, and help visualize what it\u2019s doing\u2014not as a buzzword but as a piece of math.' },
                        { text: 'What we\u2019re going to do is put together a neural network that can learn to recognize handwritten digits. This is a somewhat classic example for introducing the topic, and I\u2019m happy to stick with the status quo here because at the end of the two videos I want to point you to a couple of good resources where you can learn more and where you can download the code that does this and play with it on your own computer.' },
                        { text: 'As the name suggests, neural networks are inspired by the brain, but let\u2019s break that down. What are the neurons, and in what sense are they linked together? Right now, when I say neuron, all I want you to think about is a thing that holds a number, specifically a number between 0 and 1. It\u2019s really not more than that.' },
                        { text: 'Now, jumping over to the last layer, this has 10 neurons, each representing one of the digits. The activation in these neurons, again some number between 0 and 1, represents how much the system thinks that a given image corresponds with a given digit.' },
                        { text: 'The way the network operates is that activations in one layer determine the activations of the next layer. The heart of the network as an information processing mechanism comes down to exactly how those activations from one layer bring about activations in the next layer.' },
                        { text: 'Before jumping into the math for how one layer influences the next or how training works, let\u2019s talk about why it\u2019s even reasonable to expect a layered structure like this to behave intelligently.' },
                        { text: 'Of course, that just kicks the problem down the road because how would you recognize these subcomponents or even learn what the right subcomponents should be?' },
                        { text: 'Whether or not this is what our final network actually does is another question, one that I\u2019ll come back to once we see how to train the network.' },
                        { text: 'All right, thank you, Lisha.' },
                    ],
                });
            }, 4500);
        });
    }

    function transcribe(url) {
        if (!API_BASE) return mockTranscribe(url);

        var controller = new AbortController();
        currentController = controller;

        var timeoutId = setTimeout(function () { controller.abort(); }, API_TIMEOUT_MS);

        return fetch(API_BASE + '/transcribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url }),
            signal: controller.signal
        })
        .then(function (res) {
            clearTimeout(timeoutId);
            currentController = null;

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
            currentController = null;

            if (err instanceof ApiError) throw err;
            if (err.name === 'AbortError') throw new ApiError(API_ERROR.TIMEOUT);
            throw new ApiError(API_ERROR.NETWORK);
        });
    }

    // ── SVG Icon Helpers (static, hardcoded) ─────────────────────
    function createSvgElement(svgMarkup) {
        var temp = document.createElement('div');
        temp.insertAdjacentHTML('beforeend', svgMarkup);
        return temp.firstElementChild;
    }

    // ── Single Transcription ─────────────────────────────────────
    function runTranscription(url) {
        var videoId = extractVideoId(url);

        currentItem = {
            id: 1,
            url: url,
            videoId: videoId,
            status: 'processing',
            title: null,
            duration: null,
            segments: null,
            error: null,
            activeAI: null
        };

        isProcessing = true;
        submitBtn.disabled = true;
        processingEl.hidden = false;
        var statusInterval = cycleProcessingStatus();

        transcribe(url)
            .then(function (data) {
                clearInterval(statusInterval);
                processingEl.hidden = true;
                currentItem.status = 'done';
                currentItem.title = data.title;
                currentItem.duration = data.duration;
                currentItem.segments = data.segments;
                renderResultCard(currentItem);
                announce(t('announce.complete') + data.title);
                showResultSection();
                isProcessing = false;
            })
            .catch(function (err) {
                clearInterval(statusInterval);
                processingEl.hidden = true;
                var msg = (err instanceof ApiError) ? err.message : t('error.generic');
                showError(msg);
                announce(t('announce.error') + msg);
                currentItem = null;
                isProcessing = false;
                submitBtn.disabled = false;
            });
    }

    // ── Result Card Rendering ────────────────────────────────────
    function showResultSection() {
        clearInterval(taglineTimer);
        resultEl.hidden = false;
        document.documentElement.style.scrollSnapType = 'none';
        document.body.classList.add('has-result');
        submitBtn.disabled = false;
        if (paywallTimer) clearTimeout(paywallTimer);
        paywallTimer = setTimeout(showPaywall, 3000);
        if (window.innerWidth <= 768) {
            resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function renderResultCard(item) {
        if (!resultsList) return;

        var card = document.createElement('article');
        card.className = 'result-card';
        card.id = 'card-' + item.id;
        card.setAttribute('role', 'listitem');

        var thumbContainer = document.createElement('div');
        thumbContainer.className = 'result-card-thumb';
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/' + item.videoId;
        iframe.width = 560;
        iframe.height = 315;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('loading', 'lazy');
        iframe.title = item.title;
        thumbContainer.appendChild(iframe);

        var titleEl = document.createElement('h2');
        titleEl.className = 'result-card-title';
        titleEl.textContent = item.title;

        var infoEl = document.createElement('p');
        infoEl.className = 'result-card-info';
        var hasTimestamps = item.segments.some(function (s) { return typeof s.start === 'number'; });
        var infoCount = document.createTextNode(item.segments.length + ' ');
        var infoUnit = document.createElement('span');
        var unitKey = hasTimestamps ? 'result.segments' : 'result.paragraphs';
        infoUnit.textContent = t(unitKey);
        infoUnit.setAttribute('data-i18n', unitKey);
        var infoDot = document.createTextNode(' \u00b7 ' + item.duration);
        infoEl.appendChild(infoCount);
        infoEl.appendChild(infoUnit);
        infoEl.appendChild(infoDot);

        var videoInfo = document.getElementById('video-info');
        if (videoInfo) {
            while (videoInfo.firstChild) videoInfo.removeChild(videoInfo.firstChild);
            videoInfo.hidden = false;
            videoInfo.appendChild(thumbContainer);
            videoInfo.appendChild(titleEl);
            videoInfo.appendChild(infoEl);
        }

        var body = document.createElement('div');
        body.className = 'result-card-body';
        body.id = 'card-body-' + item.id;

        var toolbar = document.createElement('div');
        toolbar.className = 'unified-toolbar';

        var dlGroup = document.createElement('div');
        dlGroup.className = 'download-group';

        var dlBtn = document.createElement('button');
        dlBtn.className = 'action-btn action-btn--primary card-download-btn';
        dlBtn.setAttribute('aria-label', t('toolbar.download-aria'));
        dlBtn.setAttribute('data-tooltip', t('toolbar.download-tooltip'));
        dlBtn.setAttribute('data-i18n-aria-label', 'toolbar.download-aria');
        dlBtn.setAttribute('data-i18n-data-tooltip', 'toolbar.download-tooltip');
        dlBtn.setAttribute('aria-haspopup', 'true');
        dlBtn.setAttribute('aria-expanded', 'false');
        dlBtn.appendChild(createSvgElement('<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'));

        var dlMenu = document.createElement('div');
        dlMenu.className = 'download-menu';
        dlMenu.setAttribute('role', 'menu');
        dlMenu.hidden = true;

        var dlTxt = document.createElement('button');
        dlTxt.className = 'download-menu-item';
        dlTxt.setAttribute('role', 'menuitem');
        dlTxt.setAttribute('tabindex', '-1');
        dlTxt.setAttribute('data-i18n', 'toolbar.download-txt');
        dlTxt.textContent = t('toolbar.download-txt');
        dlTxt.addEventListener('click', function () { showPaywall(true); closeDownloadMenu(dlMenu, dlBtn); });

        var dlMd = document.createElement('button');
        dlMd.className = 'download-menu-item';
        dlMd.setAttribute('role', 'menuitem');
        dlMd.setAttribute('tabindex', '-1');
        dlMd.setAttribute('data-i18n', 'toolbar.download-md');
        dlMd.textContent = t('toolbar.download-md');
        dlMd.addEventListener('click', function () { showPaywall(true); closeDownloadMenu(dlMenu, dlBtn); });

        dlMenu.appendChild(dlTxt);
        dlMenu.appendChild(dlMd);

        function openDownloadMenu() {
            dlMenu.hidden = false;
            dlBtn.setAttribute('aria-expanded', 'true');
            var firstItem = dlMenu.querySelector('[role="menuitem"]');
            if (firstItem) firstItem.focus();
        }

        function closeDownloadMenu(menu, toggle) {
            menu.hidden = true;
            toggle.setAttribute('aria-expanded', 'false');
        }

        dlBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (dlMenu.hidden) openDownloadMenu();
            else closeDownloadMenu(dlMenu, dlBtn);
        });

        dlBtn.addEventListener('keydown', function (e) {
            if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && dlMenu.hidden) {
                e.preventDefault();
                openDownloadMenu();
            }
        });

        dlMenu.addEventListener('keydown', function (e) {
            var items = Array.prototype.slice.call(dlMenu.querySelectorAll('[role="menuitem"]'));
            var idx = items.indexOf(document.activeElement);
            if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length].focus(); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length].focus(); }
            else if (e.key === 'Escape') { e.preventDefault(); closeDownloadMenu(dlMenu, dlBtn); dlBtn.focus(); }
            else if (e.key === 'Tab') { closeDownloadMenu(dlMenu, dlBtn); }
        });

        dlGroup.appendChild(dlBtn);
        dlGroup.appendChild(dlMenu);

        var copyBtn = document.createElement('button');
        copyBtn.className = 'action-btn';
        copyBtn.setAttribute('aria-label', t('toolbar.copy-aria'));
        copyBtn.setAttribute('data-tooltip', t('toolbar.copy-tooltip'));
        copyBtn.setAttribute('data-i18n-aria-label', 'toolbar.copy-aria');
        copyBtn.setAttribute('data-i18n-data-tooltip', 'toolbar.copy-tooltip');
        copyBtn.appendChild(createSvgElement('<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'));
        copyBtn.addEventListener('click', function () { showPaywall(true); });

        var upgradeCta = document.createElement('a');
        upgradeCta.href = 'pricing.html';
        upgradeCta.className = 'cta-upgrade';
        upgradeCta.setAttribute('aria-label', t('toolbar.plans-aria'));
        upgradeCta.setAttribute('data-tooltip', t('toolbar.plans-tooltip'));
        upgradeCta.setAttribute('data-i18n-aria-label', 'toolbar.plans-aria');
        upgradeCta.setAttribute('data-i18n-data-tooltip', 'toolbar.plans-tooltip');
        upgradeCta.appendChild(createSvgElement('<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'));

        toolbar.appendChild(dlGroup);
        toolbar.appendChild(copyBtn);

        var divider1 = document.createElement('span');
        divider1.className = 'toolbar-divider';
        divider1.setAttribute('aria-hidden', 'true');
        toolbar.appendChild(divider1);

        var aiActionDefs = [
            { action: 'summarize', label: t('ai.summarize'), tooltip: t('ai.summarize'), i18nKey: 'ai.summarize', svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>' },
            { action: 'translate', label: t('ai.translate'), tooltip: t('ai.translate'), i18nKey: 'ai.translate', svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>' },
            { action: 'chapters', label: t('ai.chapters'), tooltip: t('ai.chapters'), i18nKey: 'ai.chapters', svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' },
            { action: 'keywords', label: t('ai.keywords'), tooltip: t('ai.keywords'), i18nKey: 'ai.keywords', svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>' },
            { action: 'quiz', label: t('ai.quiz'), tooltip: t('ai.quiz'), i18nKey: 'ai.quiz', svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
        ];

        aiActionDefs.forEach(function (ai) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'ai-action-btn';
            btn.setAttribute('data-action', ai.action);
            btn.setAttribute('data-tooltip', ai.tooltip);
            btn.setAttribute('aria-label', ai.tooltip);
            btn.setAttribute('data-i18n-data-tooltip', ai.i18nKey);
            btn.setAttribute('data-i18n-aria-label', ai.i18nKey);
            btn.appendChild(createSvgElement(ai.svg));
            btn.addEventListener('click', function () { showPaywall(true); });
            toolbar.appendChild(btn);
        });

        var divider2 = document.createElement('span');
        divider2.className = 'toolbar-divider';
        divider2.setAttribute('aria-hidden', 'true');
        toolbar.appendChild(divider2);
        if (planStrip) toolbar.appendChild(planStrip);
        toolbar.appendChild(upgradeCta);

        var transcriptWrapper = document.createElement('div');
        transcriptWrapper.className = 'transcript-wrapper';

        var transcript = document.createElement('div');
        transcript.className = 'transcript';
        transcript.setAttribute('role', 'region');
        transcript.setAttribute('tabindex', '0');
        transcript.setAttribute('aria-label', t('transcript.aria'));
        transcript.setAttribute('data-i18n-aria-label', 'transcript.aria');

        var cleanBadge = document.createElement('span');
        cleanBadge.className = 'transcript-clean-badge';
        cleanBadge.textContent = t('transcript.badge');
        cleanBadge.setAttribute('data-tooltip', t('transcript.badge-tooltip'));
        cleanBadge.setAttribute('data-i18n', 'transcript.badge');
        cleanBadge.setAttribute('data-i18n-data-tooltip', 'transcript.badge-tooltip');
        transcript.appendChild(cleanBadge);

        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        item.segments.forEach(function (seg, i) {
            var div = document.createElement('div');
            div.className = 'transcript-segment';
            if (!reducedMotion) div.style.animationDelay = Math.min(i * 30, 600) + 'ms';
            if (typeof seg.start === 'number') {
                var timeSpan = document.createElement('span');
                timeSpan.className = 'segment-time';
                timeSpan.textContent = formatTime(seg.start);
                div.appendChild(timeSpan);
            } else {
                div.classList.add('transcript-segment--no-time');
            }
            var textSpan = document.createElement('span');
            textSpan.className = 'segment-text';
            textSpan.textContent = seg.text;
            div.appendChild(textSpan);
            transcript.appendChild(div);
        });

        transcriptWrapper.appendChild(transcript);

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
        aiClose.setAttribute('aria-label', t('ai.close'));
        aiClose.setAttribute('data-i18n-aria-label', 'ai.close');
        aiClose.appendChild(createSvgElement('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'));
        aiClose.addEventListener('click', function () { closeCardAIResult(card); });
        aiHeader.appendChild(aiBadge);
        aiHeader.appendChild(aiClose);

        var aiBody = document.createElement('div');
        aiBody.className = 'ai-result-body';
        aiBody.id = 'ai-result-body-' + item.id;
        aiBody.setAttribute('aria-live', 'polite');

        aiPanel.appendChild(aiHeader);
        aiPanel.appendChild(aiBody);

        toolbar.setAttribute('role', 'toolbar');
        toolbar.setAttribute('aria-orientation', 'horizontal');
        toolbar.setAttribute('aria-label', t('toolbar.aria'));
        toolbar.setAttribute('data-i18n-aria-label', 'toolbar.aria');

        transcriptWrapper.insertBefore(toolbar, transcript);
        body.appendChild(transcriptWrapper);
        body.appendChild(aiPanel);
        card.appendChild(body);
        resultsList.appendChild(card);
    }

    // ── Per-card Actions ─────────────────────────────────────────
    function handleCardCopy(btn, label) {
        if (!currentItem) return;
        var item = currentItem;
        var text = buildPlainTextForItem(item);
        if (!text) return;

        function onCopied() {
            btn.classList.add('copied');
            label.textContent = t('toolbar.copied');
            btn.setAttribute('aria-label', t('toolbar.copied-aria'));
            setTimeout(function () {
                btn.classList.remove('copied');
                label.textContent = t('toolbar.copy-tooltip');
                btn.setAttribute('aria-label', t('toolbar.copy-aria'));
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

    function handleCardDownload(format) {
        if (!currentItem) return;
        var item = currentItem;
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
        var safeName = item.title.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '_').substring(0, 60);
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
        summarize: { label: 'Summary', icon: '\u26A1', delay: 2000, render: function () {
            var frag = document.createDocumentFragment();
            var p1 = document.createElement('p');
            p1.textContent = 'This introductory lecture covers the fundamentals of artificial intelligence. Starting with AI\u2019s origins at the 1956 Dartmouth conference, it traces the field through periods of excitement and \u201CAI winters\u201D to the modern deep learning revolution.';
            var p2 = document.createElement('p');
            p2.textContent = 'Key topics include computer vision, NLP, and AI-powered speech recognition. The course will progress from basic neural networks to transformers, with practical assignments using Python, NumPy, and PyTorch.';
            frag.appendChild(p1); frag.appendChild(p2); return frag;
        }},
        'key-points': { label: 'Key Points', icon: '\u2261', delay: 1800, render: function () {
            var ul = document.createElement('ul');
            ['AI originated at the 1956 Dartmouth conference','The field has gone through cycles of enthusiasm and \u201CAI winters\u201D','Recent computational power and data availability drove breakthroughs','Deep learning revolutionized vision, NLP, and speech recognition','AI-powered speech recognition enables multilingual audio transcription','Course covers neural networks \u2192 transformers','Prerequisites: Python, NumPy, PyTorch'].forEach(function (text) { var li = document.createElement('li'); li.textContent = text; ul.appendChild(li); });
            return ul;
        }},
        translate: { label: 'Translation', icon: '\uD83C\uDF10', delay: 2500, render: function () {
            var frag = document.createDocumentFragment();
            var lbl = document.createElement('p'); lbl.style.fontSize = '0.75rem'; lbl.style.color = 'var(--text-muted)'; lbl.style.marginBottom = 'var(--space-sm)'; lbl.textContent = t('ai.translate-label'); frag.appendChild(lbl);
            ['Bienvenidos a esta primera clase sobre inteligencia artificial.','La inteligencia artificial es un campo de la inform\u00E1tica que busca crear sistemas capaces de realizar tareas que normalmente requieren inteligencia humana.','Esto incluye el aprendizaje, el razonamiento, la percepci\u00F3n y la comprensi\u00F3n del lenguaje natural.'].forEach(function (text) { var p = document.createElement('p'); p.textContent = text; frag.appendChild(p); });
            return frag;
        }},
        rewrite: { label: 'Rewrite', icon: '\u270F\uFE0F', delay: 2500, render: function () {
            var frag = document.createDocumentFragment();
            var h4 = document.createElement('h4'); h4.style.marginBottom = 'var(--space-sm)'; h4.textContent = 'The Rise of Artificial Intelligence: From Dartmouth to Deep Learning';
            var p1 = document.createElement('p'); p1.textContent = 'Artificial intelligence, once a niche academic pursuit born at a small workshop in Dartmouth in 1956, has become one of the most transformative technologies of our time.';
            var p2 = document.createElement('p'); p2.textContent = 'The journey was far from linear. Periods of intense optimism gave way to so-called "AI winters," where funding dried up and progress stalled.';
            var p3 = document.createElement('p'); p3.textContent = 'Today, deep learning has revolutionized fields from computer vision to natural language processing and speech recognition.';
            frag.appendChild(h4); frag.appendChild(p1); frag.appendChild(p2); frag.appendChild(p3); return frag;
        }}
    };

    function buildLoadingIndicator() {
        var wrap = document.createElement('div');
        wrap.className = 'ai-result-loading';
        var dots = document.createElement('div');
        dots.className = 'ai-result-loading-dot';
        for (var i = 0; i < 3; i++) dots.appendChild(document.createElement('span'));
        wrap.appendChild(dots);
        wrap.appendChild(document.createTextNode(' ' + t('ai.thinking')));
        return wrap;
    }

    function handleCardAIAction(action, cardEl) {
        if (!currentItem) return;
        var item = currentItem;
        if (item.activeAI === action) { closeCardAIResult(cardEl); return; }
        item.activeAI = action;
        var config = AI_ACTIONS[action];
        if (!config) return;
        var btns = cardEl.querySelectorAll('.ai-action-btn');
        btns.forEach(function (btn) { btn.classList.toggle('ai-action-btn--active', btn.getAttribute('data-action') === action); });
        var panel = cardEl.querySelector('.ai-result-panel');
        var badge = cardEl.querySelector('.ai-result-badge');
        var aiBody = cardEl.querySelector('.ai-result-body');
        if (!panel || !badge || !aiBody) return;
        badge.textContent = config.icon + ' ' + config.label;
        panel.hidden = false;
        clearElement(aiBody);
        if (config.delay > 0) {
            aiBody.appendChild(buildLoadingIndicator());
            setTimeout(function () { if (item.activeAI === action) { clearElement(aiBody); aiBody.appendChild(config.render()); } }, config.delay);
        } else { aiBody.appendChild(config.render()); }
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function closeCardAIResult(cardEl) {
        if (currentItem) currentItem.activeAI = null;
        var panel = cardEl.querySelector('.ai-result-panel');
        var aiBody = cardEl.querySelector('.ai-result-body');
        if (panel) panel.hidden = true;
        if (aiBody) clearElement(aiBody);
        cardEl.querySelectorAll('.ai-action-btn').forEach(function (btn) { btn.classList.remove('ai-action-btn--active'); });
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
        if (paywallTrigger && paywallTrigger.focus) { paywallTrigger.focus(); paywallTrigger = null; }
    }
    if (paywallClose) paywallClose.addEventListener('click', dismissPaywall);
    if (paywallBackdrop) paywallBackdrop.addEventListener('click', dismissPaywall);

    // ── Reset ────────────────────────────────────────────────────
    function resetUI() {
        document.body.classList.remove('has-result');
        document.documentElement.style.scrollSnapType = '';
        if (form) form.classList.remove('demo-mode');
        resultEl.hidden = true;
        processingEl.hidden = true;
        if (paywallTimer) clearTimeout(paywallTimer);
        dismissPaywall();
        if (planStrip && planStrip.closest('.results-list')) {
            if (planStripSibling && planStripSibling.parentNode === planStripParent) planStripParent.insertBefore(planStrip, planStripSibling);
            else if (planStripParent) planStripParent.appendChild(planStrip);
        }
        if (resultsList) clearElement(resultsList);
        urlInput.value = '';
        urlInput.removeAttribute('readonly');
        submitBtn.disabled = false;
        clearError();
        var videoInfo = document.getElementById('video-info');
        if (videoInfo) { videoInfo.hidden = true; while (videoInfo.firstChild) videoInfo.removeChild(videoInfo.firstChild); }
        if (currentController) { currentController.abort(); currentController = null; }
        currentItem = null;
        isProcessing = false;
        var heroSection = document.getElementById('transcribe');
        if (heroSection) heroSection.scrollIntoView();
        urlInput.focus({ preventScroll: true });
        startTagline();
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && paywallOverlay && !paywallOverlay.hidden) { dismissPaywall(); e.stopImmediatePropagation(); }
    });

    // ── Submit Handler ───────────────────────────────────────────
    function handleSubmit(e) {
        e.preventDefault();
        if (demoInProgress) return;
        clearError();
        if (currentItem && currentItem.status === 'done') { resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); return; }
        if (isProcessing) return;
        var url = urlInput.value.trim();
        var validationError = getURLValidationError(url);
        if (validationError) { showError(validationError); urlInput.focus(); return; }
        runTranscription(url);
    }

    if (urlInput) {
        urlInput.addEventListener('input', function () {
            if (inputHint && inputHint.classList.contains('show-error')) clearError();
        });
    }

    // ── Bind Events ─────────────────────────────────────────────
    var addBtn = document.getElementById('add-btn');
    if (addBtn) addBtn.addEventListener('click', function () { showPaywall(true); });
    if (form) form.addEventListener('submit', handleSubmit);

    document.addEventListener('click', function (e) {
        document.querySelectorAll('.result-card .download-menu:not([hidden])').forEach(function (menu) {
            if (!menu.parentElement.contains(e.target)) {
                menu.hidden = true;
                var toggle = menu.parentElement.querySelector('.download-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
            }
        });
        // Close lang dropdown on outside click
        if (langGroup && !langGroup.contains(e.target)) {
            closeLangMenu();
        }
    });

    window.addEventListener('beforeunload', function () {
        if (currentController) { currentController.abort(); currentController = null; }
    });

    startTagline();

    // ── Features Carousel ────────────────────────────────────────
    var featureTabs = document.querySelectorAll('.features-tab');
    var featurePanels = document.querySelectorAll('.features-panel');
    var featuresProgressFill = document.querySelector('.features-progress-fill');
    var featureIndex = 0;
    var FEATURE_INTERVAL = 5000;
    var featureTimer = null;

    function activateFeature(index) {
        featureTabs.forEach(function (t, i) { t.classList.toggle('features-tab--active', i === index); t.setAttribute('aria-selected', i === index ? 'true' : 'false'); t.setAttribute('tabindex', i === index ? '0' : '-1'); });
        featurePanels.forEach(function (p, i) { p.classList.toggle('features-panel--active', i === index); if (i === index) p.removeAttribute('hidden'); else p.setAttribute('hidden', ''); });
        featureIndex = index;
    }

    function startFeatureProgress() {
        if (!featuresProgressFill) return;
        featuresProgressFill.style.transition = 'none';
        featuresProgressFill.style.width = '0%';
        requestAnimationFrame(function () { requestAnimationFrame(function () { featuresProgressFill.style.transition = 'width ' + FEATURE_INTERVAL + 'ms linear'; featuresProgressFill.style.width = '100%'; }); });
    }

    function startFeatureCarousel() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        clearInterval(featureTimer);
        startFeatureProgress();
        featureTimer = setInterval(function () { var next = (featureIndex + 1) % featureTabs.length; activateFeature(next); startFeatureProgress(); }, FEATURE_INTERVAL);
    }

    function stopFeatureCarousel() { clearInterval(featureTimer); featureTimer = null; if (featuresProgressFill) { featuresProgressFill.style.transition = 'none'; featuresProgressFill.style.width = '0%'; } }

    var featuresSection = document.getElementById('features');
    if (featuresSection && featureTabs.length > 0) {
        featuresSection.addEventListener('mouseenter', stopFeatureCarousel);
        featuresSection.addEventListener('mouseleave', startFeatureCarousel);
        featuresSection.addEventListener('focusin', stopFeatureCarousel);
        featuresSection.addEventListener('focusout', function (e) { if (!featuresSection.contains(e.relatedTarget)) startFeatureCarousel(); });
        featureTabs.forEach(function (tab, i) { tab.addEventListener('click', function () { activateFeature(i); startFeatureCarousel(); }); });
        featureTabs.forEach(function (tab, i) {
            tab.setAttribute('tabindex', i === featureIndex ? '0' : '-1');
            tab.addEventListener('keydown', function (e) {
                var len = featureTabs.length; var newIndex = -1;
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); newIndex = (i + 1) % len; }
                else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); newIndex = (i - 1 + len) % len; }
                else if (e.key === 'Home') { e.preventDefault(); newIndex = 0; }
                else if (e.key === 'End') { e.preventDefault(); newIndex = len - 1; }
                if (newIndex >= 0) { featureTabs.forEach(function (t, j) { t.setAttribute('tabindex', j === newIndex ? '0' : '-1'); }); featureTabs[newIndex].focus(); activateFeature(newIndex); startFeatureCarousel(); }
            });
        });
        startFeatureCarousel();
    }

    // ── Floating Island: Scroll-linked Active State ──────────────
    var islandSteps = document.querySelectorAll('.island-step[data-section]');
    var islandIndicator = document.querySelector('.island-indicator');
    var stepSectionMap = { features: document.getElementById('features'), transcribe: document.getElementById('transcribe') };

    function updateIslandIndicator(activeBtn) {
        if (!islandIndicator || !activeBtn) return;
        var stepsContainer = activeBtn.parentElement; if (!stepsContainer) return;
        var containerRect = stepsContainer.getBoundingClientRect();
        var btnRect = activeBtn.getBoundingClientRect();
        islandIndicator.style.left = (btnRect.left - containerRect.left) + 'px';
        islandIndicator.style.width = btnRect.width + 'px';
    }

    var islandMenuItems = document.querySelectorAll('.island-menu-item[data-section]');

    function setActiveIslandStep(sectionName) {
        islandSteps.forEach(function (link) { var isActive = sectionName && link.getAttribute('data-section') === sectionName; link.classList.toggle('island-step--active', isActive); if (isActive) updateIslandIndicator(link); });
        islandMenuItems.forEach(function (item) { var isActive = sectionName && item.getAttribute('data-section') === sectionName; item.classList.toggle('island-menu-item--active', isActive); });
        if (islandIndicator) islandIndicator.style.opacity = sectionName ? '1' : '0';
    }

    function updateIslandActive() {
        var scrollY = window.scrollY + window.innerHeight * 0.35; var active = null;
        var entries = [{ name: 'features', el: stepSectionMap.features }, { name: 'transcribe', el: stepSectionMap.transcribe }];
        for (var i = 0; i < entries.length; i++) { if (entries[i].el && entries[i].el.offsetTop <= scrollY) { active = entries[i].name; break; } }
        setActiveIslandStep(active);
    }

    if (islandSteps.length > 0 && stepSectionMap.features && stepSectionMap.transcribe) {
        window.addEventListener('scroll', updateIslandActive, { passive: true });
        requestAnimationFrame(function () { updateIslandActive(); });
    }

    // ── Demo Mode: Typewriter + Auto-submit ────────────────────
    function runDemo() {
        if (demoPlayed || demoInProgress) return;
        if (!urlInput || !form) return;
        demoPlayed = true; demoInProgress = true;
        urlInput.setAttribute('readonly', ''); urlInput.placeholder = '';
        form.classList.add('demo-mode'); submitBtn.disabled = true;
        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) { urlInput.value = DEMO_URL; setTimeout(demoSubmit, 300); return; }
        var cursor = document.createElement('span'); cursor.className = 'demo-cursor'; cursor.setAttribute('aria-hidden', 'true');
        if (inputWrapper) inputWrapper.appendChild(cursor);
        var measureCanvas = document.createElement('canvas'); var ctx = measureCanvas.getContext('2d');
        var inputStyles = window.getComputedStyle(urlInput); ctx.font = inputStyles.fontSize + ' ' + inputStyles.fontFamily;
        var charIndex = 0;
        function positionCursor() { var textWidth = ctx.measureText(urlInput.value).width; var inputPadding = parseFloat(inputStyles.paddingLeft) || 0; cursor.style.left = (inputPadding + textWidth) + 'px'; }
        function typeNextChar() {
            if (charIndex < DEMO_URL.length) { urlInput.value += DEMO_URL[charIndex]; charIndex++; positionCursor(); setTimeout(typeNextChar, DEMO_CHAR_DELAY_MIN + Math.random() * (DEMO_CHAR_DELAY_MAX - DEMO_CHAR_DELAY_MIN)); }
            else { if (cursor.parentNode) cursor.parentNode.removeChild(cursor); setTimeout(demoSubmit, DEMO_POST_TYPE_DELAY); }
        }
        positionCursor(); typeNextChar();
    }

    function demoSubmit() { if (form) form.classList.remove('demo-mode'); demoInProgress = false; runTranscription(DEMO_URL); }

    (function () {
        var transcribeEl = document.getElementById('transcribe');
        if (!transcribeEl || typeof IntersectionObserver === 'undefined') return;
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) { if (entry.isIntersecting && !demoPlayed) { setTimeout(runDemo, 400); observer.disconnect(); } });
        }, { threshold: 0.5 });
        observer.observe(transcribeEl);
    })();

    // ── Language Dropdown ────────────────────────────────────────
    var langToggle = document.getElementById('lang-toggle');
    var langGroup = langToggle ? langToggle.closest('.lang-dropdown-group') : null;
    var langMenu = langGroup ? langGroup.querySelector('.lang-menu') : null;

    function openLangMenu() {
        if (!langMenu || !langToggle) return;
        langMenu.hidden = false;
        langGroup.classList.add('open');
        langToggle.setAttribute('aria-expanded', 'true');
        var firstItem = langMenu.querySelector('[role="menuitem"]');
        if (firstItem) firstItem.focus();
    }

    function closeLangMenu() {
        if (!langMenu || !langToggle) return;
        langMenu.hidden = true;
        langGroup.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
    }

    function markActiveLangItem() {
        if (!langMenu) return;
        var items = langMenu.querySelectorAll('.lang-menu-item');
        for (var i = 0; i < items.length; i++) {
            items[i].classList.toggle('active', items[i].getAttribute('data-lang') === currentLang);
        }
    }

    if (langToggle) {
        langToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (langMenu.hidden) openLangMenu();
            else closeLangMenu();
        });

        langToggle.addEventListener('keydown', function (e) {
            if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && langMenu.hidden) {
                e.preventDefault();
                openLangMenu();
            }
        });
    }

    if (langMenu) {
        langMenu.addEventListener('keydown', function (e) {
            var items = Array.prototype.slice.call(langMenu.querySelectorAll('[role="menuitem"]'));
            var idx = items.indexOf(document.activeElement);
            if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length].focus(); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx - 1 + items.length) % items.length].focus(); }
            else if (e.key === 'Escape') { e.preventDefault(); closeLangMenu(); langToggle.focus(); }
            else if (e.key === 'Tab') { closeLangMenu(); }
        });

        var langItems = langMenu.querySelectorAll('.lang-menu-item');
        for (var i = 0; i < langItems.length; i++) {
            langItems[i].addEventListener('click', function () {
                setLang(this.getAttribute('data-lang'));
                closeLangMenu();
            });
        }
    }

    // ── Initial i18n Setup ───────────────────────────────────────
    var isIndexPage = !document.body.classList.contains('page-pricing');
    document.title = t(isIndexPage ? 'title.index' : 'title.pricing');

    if (langToggle) {
        var langCode = langToggle.querySelector('.lang-toggle-code');
        if (langCode) langCode.textContent = currentLang.toUpperCase();
        langToggle.setAttribute('aria-label', currentLang === 'en' ? t('lang.to-es') : t('lang.to-en'));
    }
    markActiveLangItem();

    applyTranslations();

})();
