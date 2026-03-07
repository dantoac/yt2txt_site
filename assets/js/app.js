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
            'plan.quota': '<strong>{used} min</strong> of {limit} min used',
            'plan.quota.unlimited': '<strong>{used} min</strong> used — unlimited plan',

            // Input
            'input.placeholder': 'https://youtube.com/watch?v=...',
            'input.aria': 'YouTube video URL',
            'input.hint': 'Paste any YouTube link',
            'btn.transcribe': 'Transcribe',
            'btn.transcribe-aria': 'Transcribe video',
            'btn.add-aria': 'Add another video',
            'upgrade.hint': '<a href="pricing.html">Upgrade</a> for AI summaries, longer videos &amp; batch processing',

            // Demo
            'demo.trigger': 'Try a demo',

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
            'error.unauthorized': 'Please sign in to transcribe videos.',
            'error.quota-exceeded': 'You\u2019ve reached your plan\u2019s transcription limit.',
            'error.daily-limit': 'Daily transcription limit reached. Try again tomorrow.',
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
            'ai.toolbar-aria': 'AI actions',
            'ai.translate-label': 'Translated to Spanish',
            'ai.thinking': 'Thinking\u2026',

            // Transcript
            'transcript.title': 'Transcript',
            'transcript.aria': 'Transcript text',
            'transcript.badge': '\u2726 Auto-enhanced',
            'transcript.badge-tooltip': 'Corrected punctuation, filler words removed, and formatting improved',
            'transcript.view-cleaned': 'Cleaned',
            'transcript.view-raw': 'Raw',
            'transcript.view-segments': 'Segments',

            // Toolbar (new)
            'toolbar.copy-label': 'Copy',
            'toolbar.download-txt-label': 'TXT',
            'toolbar.download-srt': 'SRT',
            'toolbar.download-vtt': 'VTT',

            // Announcements
            'announce.complete': 'Transcription complete: ',
            'announce.error': 'Error: ',

            // Features section
            'features.title': 'Everything you need. Nothing you don\'t.',
            'features.sub': 'Six real features, zero fluff.',
            'features.transcript-title': 'Full Transcript',
            'features.transcript-desc': 'Every word with timestamps. Copy, search, and download in seconds.',
            'features.formats-title': 'Multiple Formats',
            'features.formats-desc': 'Download as TXT, SRT, or VTT. Ready for any workflow.',
            'features.batch-title': 'Batch Queue',
            'features.batch-desc': 'Queue up to 10 videos. They process one by one, automatically.',
            'features.theme-title': 'Dark & Light Mode',
            'features.theme-desc': 'Auto-detects your preference. Toggle anytime.',
            'features.bilingual-title': 'Bilingual',
            'features.bilingual-desc': 'Full interface in English and Spanish.',
            'features.free-title': 'Free & Fast',
            'features.free-desc': 'No sign-up, no API key. Paste a link and go.',

            // Paywall
            'paywall.close-aria': 'Close upgrade dialog',
            'paywall.title': 'Unlock more transcriptions',
            'paywall.subtitle': 'You\'ve used your free quota. Choose a plan to keep going.',
            'paywall.free': 'Free',
            'paywall.free-price': '$0<span>/mo</span>',
            'paywall.free-desc': '300 min/month',
            'paywall.free-cta': 'Current plan',
            'paywall.starter': 'Starter',
            'paywall.starter-price': '$10<span>/mo</span>',
            'paywall.starter-desc': '5,000 min/month',
            'paywall.starter-cta': 'Get Starter',
            'paywall.popular': 'Popular',
            'paywall.pro': 'Pro',
            'paywall.pro-price': '$20<span>/mo</span>',
            'paywall.pro-desc': '15,000 min/month',
            'paywall.pro-cta': 'Get Pro',
            'paywall.max': 'Max',
            'paywall.max-price': '$50<span>/mo</span>',
            'paywall.max-desc': 'Unlimited transcription',
            'paywall.max-cta': 'Get Max',
            'paywall.api': 'API',
            'paywall.api-price': 'Custom',
            'paywall.api-desc': 'Custom rate limits, dedicated support',
            'paywall.api-cta': 'Contact us',
            'paywall.compare': '<a href="pricing.html">Compare all plans &rarr;</a>',

            // Footer
            'footer.tagline': 'YouTube transcription, simplified',
            'footer.report': 'Report an issue',
            'footer.legal': '&copy; 2026 AInvirion LLC &middot; Spokane, WA',
            'footer.privacy': 'Privacy Policy',
            'footer.terms': 'Terms of Service',

            // Pricing page
            'pricing.title': 'Billing &amp; Credits',
            'pricing.subtitle': '300 free minutes every month. Buy more when you need them.',
            'pricing.plan-badge': 'Free Tier',
            'pricing.free-name': 'FREE',
            'pricing.free-quota': '300 minutes <span>/ month</span>',
            'pricing.feature-1': '300 minutes/month',
            'pricing.feature-2': '10 minutes/day',
            'pricing.feature-3': '5 requests/hour',
            'pricing.feature-4': 'YouTube transcription',
            'pricing.feature-5': 'AI actions (via UI)',
            'pricing.start-cta': 'Start transcribing',
            'pricing.plans-heading': 'Subscription Plans',
            'pricing.popular': 'Popular',
            'pricing.plan-starter-name': 'Starter',
            'pricing.plan-starter-sub': 'For regular content consumers',
            'pricing.plan-starter-btn': 'Coming Soon',
            'pricing.plan-pro-name': 'Pro',
            'pricing.plan-pro-sub': 'For power users and professionals',
            'pricing.plan-pro-btn': 'Coming Soon',
            'pricing.plan-max-name': 'Max',
            'pricing.plan-max-sub': 'Unlimited transcription for teams',
            'pricing.plan-max-btn': 'Coming Soon',
            'pricing.plan-api-name': 'API',
            'pricing.plan-api-price': 'Custom',
            'pricing.plan-api-sub': 'For integrations and automation',
            'pricing.plan-api-btn': 'Contact us',
            'pricing.plan-api-f1': 'API key access',
            'pricing.plan-api-f2': 'Custom rate limits',
            'pricing.plan-api-f3': 'Dedicated support',
            'pricing.plan-api-f4': 'SLA guarantees',
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
            'pricing.faq-a2': 'Every account gets 300 free minutes of transcription per month. You can purchase additional minutes or subscribe to a plan if you need more.',
            'pricing.faq-q3': 'What formats can I download transcripts in?',
            'pricing.faq-a3': 'You can download transcripts as plain text (.txt) or Markdown (.md) files.',
            'pricing.still-questions': 'Still have questions?',
            'pricing.still-text': 'Open an issue on <a href="https://github.com/AInvirion/youtube-transcriber/issues" target="_blank" rel="noopener noreferrer">GitHub</a> or email us at <a href="mailto:support@ainvirion.com">support@ainvirion.com</a>.'
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
            'nav.faq': 'FAQ',

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
            'plan.quota': '<strong>{used} min</strong> de {limit} min usados',
            'plan.quota.unlimited': '<strong>{used} min</strong> usados — plan ilimitado',

            // Input
            'input.placeholder': 'https://youtube.com/watch?v=...',
            'input.aria': 'URL del video de YouTube',
            'input.hint': 'Pega cualquier link de YouTube',
            'btn.transcribe': 'Transcribir',
            'btn.transcribe-aria': 'Transcribir video',
            'btn.add-aria': 'Agregar otro video',
            'upgrade.hint': '<a href="pricing.html">Mejora tu plan</a> para res\u00famenes con IA, videos m\u00e1s largos y procesamiento por lotes',

            // Demo
            'demo.trigger': 'Probar demo',

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
            'error.unauthorized': 'Inicia sesi\u00f3n para transcribir videos.',
            'error.quota-exceeded': 'Has alcanzado el l\u00edmite de transcripciones de tu plan.',
            'error.daily-limit': 'L\u00edmite diario de transcripciones alcanzado. Intenta ma\u00f1ana.',
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
            'ai.toolbar-aria': 'Acciones de IA',
            'ai.translate-label': 'Traducido al español',
            'ai.thinking': 'Pensando\u2026',

            // Transcript
            'transcript.title': 'Transcripci\u00f3n',
            'transcript.aria': 'Texto de la transcripci\u00f3n',
            'transcript.badge': '\u2726 Auto-mejorado',
            'transcript.badge-tooltip': 'Puntuaci\u00f3n corregida, muletillas eliminadas y formato mejorado',
            'transcript.view-cleaned': 'Limpio',
            'transcript.view-raw': 'Crudo',
            'transcript.view-segments': 'Segmentos',

            // Toolbar (new)
            'toolbar.copy-label': 'Copiar',
            'toolbar.download-txt-label': 'TXT',
            'toolbar.download-srt': 'SRT',
            'toolbar.download-vtt': 'VTT',

            // Announcements
            'announce.complete': 'Transcripci\u00f3n completa: ',
            'announce.error': 'Error: ',

            // Features section
            'features.title': 'Todo lo que necesitas. Nada que no.',
            'features.sub': 'Seis funciones reales, cero relleno.',
            'features.transcript-title': 'Transcripci\u00f3n completa',
            'features.transcript-desc': 'Cada palabra con marcas de tiempo. Copia, busca y descarga en segundos.',
            'features.formats-title': 'M\u00faltiples formatos',
            'features.formats-desc': 'Descarga como TXT, SRT o VTT. Listo para cualquier flujo de trabajo.',
            'features.batch-title': 'Cola de lotes',
            'features.batch-desc': 'Agrega hasta 10 videos. Se procesan uno a uno, autom\u00e1ticamente.',
            'features.theme-title': 'Modo oscuro y claro',
            'features.theme-desc': 'Detecta tu preferencia autom\u00e1ticamente. Cambia cuando quieras.',
            'features.bilingual-title': 'Biling\u00fce',
            'features.bilingual-desc': 'Interfaz completa en ingl\u00e9s y espa\u00f1ol.',
            'features.free-title': 'Gratis y r\u00e1pido',
            'features.free-desc': 'Sin registro, sin API key. Pega un link y listo.',

            // Paywall
            'paywall.close-aria': 'Cerrar di\u00e1logo de mejora',
            'paywall.title': 'Desbloquea m\u00e1s transcripciones',
            'paywall.subtitle': 'Usaste tu cuota gratuita. Elige un plan para continuar.',
            'paywall.free': 'Free',
            'paywall.free-price': '$0<span>/mes</span>',
            'paywall.free-desc': '300 min/mes',
            'paywall.free-cta': 'Plan actual',
            'paywall.starter': 'Starter',
            'paywall.starter-price': '$10<span>/mes</span>',
            'paywall.starter-desc': '5,000 min/mes',
            'paywall.starter-cta': 'Elegir Starter',
            'paywall.popular': 'Popular',
            'paywall.pro': 'Pro',
            'paywall.pro-price': '$20<span>/mes</span>',
            'paywall.pro-desc': '15,000 min/mes',
            'paywall.pro-cta': 'Elegir Pro',
            'paywall.max': 'Max',
            'paywall.max-price': '$50<span>/mes</span>',
            'paywall.max-desc': 'Transcripci\u00f3n ilimitada',
            'paywall.max-cta': 'Elegir Max',
            'paywall.api': 'API',
            'paywall.api-price': 'Personalizado',
            'paywall.api-desc': 'L\u00edmites personalizados, soporte dedicado',
            'paywall.api-cta': 'Cont\u00e1ctanos',
            'paywall.compare': '<a href="pricing.html">Comparar todos los planes &rarr;</a>',

            // Footer
            'footer.tagline': 'Transcripción de YouTube, simplificada',
            'footer.report': 'Reportar un problema',
            'footer.legal': '&copy; 2026 AInvirion LLC &middot; Spokane, WA',
            'footer.privacy': 'Política de Privacidad',
            'footer.terms': 'Términos de Servicio',

            // Pricing page
            'pricing.title': 'Facturaci\u00f3n y cr\u00e9ditos',
            'pricing.subtitle': '300 minutos gratis cada mes. Compra m\u00e1s cuando los necesites.',
            'pricing.plan-badge': 'Plan gratuito',
            'pricing.free-name': 'GRATIS',
            'pricing.free-quota': '300 minutos <span>/ mes</span>',
            'pricing.feature-1': '300 minutos/mes',
            'pricing.feature-2': '10 minutos/d\u00eda',
            'pricing.feature-3': '5 solicitudes/hora',
            'pricing.feature-4': 'Transcripci\u00f3n de YouTube',
            'pricing.feature-5': 'Acciones de IA (v\u00eda UI)',
            'pricing.start-cta': 'Comenzar a transcribir',
            'pricing.plans-heading': 'Planes de suscripci\u00f3n',
            'pricing.popular': 'Popular',
            'pricing.plan-starter-name': 'Starter',
            'pricing.plan-starter-sub': 'Para consumidores regulares de contenido',
            'pricing.plan-starter-btn': 'Pr\u00f3ximamente',
            'pricing.plan-pro-name': 'Pro',
            'pricing.plan-pro-sub': 'Para usuarios avanzados y profesionales',
            'pricing.plan-pro-btn': 'Pr\u00f3ximamente',
            'pricing.plan-max-name': 'Max',
            'pricing.plan-max-sub': 'Transcripci\u00f3n ilimitada para equipos',
            'pricing.plan-max-btn': 'Pr\u00f3ximamente',
            'pricing.plan-api-name': 'API',
            'pricing.plan-api-price': 'Personalizado',
            'pricing.plan-api-sub': 'Para integraciones y automatizaci\u00f3n',
            'pricing.plan-api-btn': 'Cont\u00e1ctanos',
            'pricing.plan-api-f1': 'Acceso por API key',
            'pricing.plan-api-f2': 'L\u00edmites personalizados',
            'pricing.plan-api-f3': 'Soporte dedicado',
            'pricing.plan-api-f4': 'Garant\u00edas de SLA',
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
            'pricing.faq-a2': 'Cada cuenta recibe 300 minutos gratis de transcripci\u00f3n al mes. Puedes comprar minutos adicionales o suscribirte a un plan si necesitas m\u00e1s.',
            'pricing.faq-q3': '\u00bfEn qu\u00e9 formatos puedo descargar las transcripciones?',
            'pricing.faq-a3': 'Puedes descargar transcripciones como archivos de texto plano (.txt) o Markdown (.md).',
            'pricing.still-questions': '\u00bfA\u00fan tienes preguntas?',
            'pricing.still-text': 'Abre un issue en <a href="https://github.com/AInvirion/youtube-transcriber/issues" target="_blank" rel="noopener noreferrer">GitHub</a> o escr\u00edbenos a <a href="mailto:support@ainvirion.com">support@ainvirion.com</a>.',
        }
    };

    var currentLang = 'en';

    var VALID_LANGS = { en: true, es: true };

    function getPreferredLang() {
        var stored = localStorage.getItem('yt2txt-lang');
        if (stored && VALID_LANGS[stored]) return stored;
        var nav = (navigator.language || '').slice(0, 2).toLowerCase();
        return VALID_LANGS[nav] ? nav : 'en';
    }

    function t(key) {
        var dict = translations[currentLang];
        if (dict && dict[key] !== undefined) return dict[key];
        return translations.en[key] || key;
    }

    function tReplace(key, replacements) {
        var str = t(key);
        Object.keys(replacements).forEach(function (k) {
            str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), replacements[k]);
        });
        return str;
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
        updatePlanStrip();

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
    var VALID_THEMES = { light: true, dark: true };

    function getPreferredTheme() {
        var stored = localStorage.getItem('yt2txt-theme');
        if (stored && VALID_THEMES[stored]) return stored;
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

        var resizeRaf;
        window.addEventListener('resize', function () {
            if (resizeRaf) cancelAnimationFrame(resizeRaf);
            resizeRaf = requestAnimationFrame(function () {
                remeasureIsland();
            });
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
        releaseFocusTrap();
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
        if (taglineTimer) clearInterval(taglineTimer);

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
    var API_ERROR = {
        NETWORK:        'NETWORK',
        TIMEOUT:        'TIMEOUT',
        RATE_LIMIT:     'RATE_LIMIT',
        SERVER:         'SERVER',
        MALFORMED:      'MALFORMED',
        NOT_FOUND:      'NOT_FOUND',
        UNAUTHORIZED:   'UNAUTHORIZED',
        QUOTA_EXCEEDED: 'QUOTA_EXCEEDED',
        DAILY_LIMIT:    'DAILY_LIMIT'
    };

    var API_ERROR_KEY_MAP = {};
    API_ERROR_KEY_MAP[API_ERROR.NETWORK]    = 'error.network';
    API_ERROR_KEY_MAP[API_ERROR.TIMEOUT]    = 'error.timeout';
    API_ERROR_KEY_MAP[API_ERROR.RATE_LIMIT] = 'error.rate-limit';
    API_ERROR_KEY_MAP[API_ERROR.SERVER]     = 'error.server';
    API_ERROR_KEY_MAP[API_ERROR.MALFORMED]       = 'error.malformed';
    API_ERROR_KEY_MAP[API_ERROR.NOT_FOUND]       = 'error.not-found';
    API_ERROR_KEY_MAP[API_ERROR.UNAUTHORIZED]    = 'error.unauthorized';
    API_ERROR_KEY_MAP[API_ERROR.QUOTA_EXCEEDED]  = 'error.quota-exceeded';
    API_ERROR_KEY_MAP[API_ERROR.DAILY_LIMIT]     = 'error.daily-limit';

    function ApiError(type, message) {
        this.type = type;
        this.message = message || t(API_ERROR_KEY_MAP[type] || 'error.generic');
    }

    var AUTH_TOKEN_KEY = 'auth_token';
    var POLL_INTERVAL_MS = 3000;
    var POLL_MAX_ATTEMPTS = 200;

    function getAuthToken() {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    }

    function isAuthenticated() {
        return !!getAuthToken();
    }

    function redirectToLogin() {
        window.location.href = '/static/login.html';
    }

    function authHeaders() {
        var headers = { 'Content-Type': 'application/json' };
        var token = getAuthToken();
        if (token) headers['Authorization'] = 'Bearer ' + token;
        if (currentLang) headers['X-Language'] = currentLang;
        return headers;
    }

    // ── Plan Strip ──────────────────────────────────────────────
    function renderPlanStrip(used, limit, badge, unlimited) {
        var badgeEl = document.querySelector('.plan-badge');
        var quotaEl = document.querySelector('.plan-strip-quota');
        var meterFill = document.querySelector('.plan-strip-meter-fill');
        var meter = document.querySelector('.plan-strip-meter');
        if (!badgeEl || !quotaEl || !meterFill) return;

        badgeEl.textContent = badge;

        var quotaKey = unlimited ? 'plan.quota.unlimited' : 'plan.quota';
        var quotaHtml = tReplace(quotaKey, { used: used, limit: limit });
        // Safe: quotaHtml comes from trusted i18n strings with numeric replacements, never user input
        var tmpl = document.createElement('template');
        tmpl.innerHTML = quotaHtml;
        while (quotaEl.firstChild) quotaEl.removeChild(quotaEl.firstChild);
        quotaEl.appendChild(tmpl.content.cloneNode(true));

        var pct = unlimited ? Math.min((used / 1000) * 100, 100) : (limit > 0 ? Math.min((used / limit) * 100, 100) : 0);
        meterFill.style.width = pct + '%';

        if (meter) {
            meter.setAttribute('aria-valuenow', used);
            meter.setAttribute('aria-valuemax', unlimited ? '' : limit);
            meter.setAttribute('aria-label', unlimited
                ? used + ' minutes used — unlimited plan'
                : 'Plan usage: ' + used + ' of ' + limit + ' minutes');
        }
    }

    function updatePlanStrip() {
        if (!isAuthenticated()) {
            renderPlanStrip(0, 300, t('plan.badge'), false);
            return;
        }

        fetch('/billing/current', {
            headers: authHeaders()
        })
        .then(function (res) {
            if (!res.ok) throw new Error('billing fetch failed');
            return res.json();
        })
        .then(function (data) {
            var used = Math.round(data.minutes_used || 0);
            var limit = Math.round(data.minutes_limit || 300);
            var badge = (data.plan_name || 'FREE').toUpperCase();
            var unlimited = !!data.is_unlimited_monthly;
            renderPlanStrip(used, limit, badge, unlimited);
        })
        .catch(function () {
            renderPlanStrip(0, 300, t('plan.badge'), false);
        });
    }

    function validateTranscriptResponse(data) {
        if (!data || typeof data !== 'object') return false;
        if (typeof data.title !== 'string' || !data.title) return false;
        if (typeof data.duration !== 'string') return false;
        if (!Array.isArray(data.segments)) return false;
        return true;
    }

    function pollJob(jobId, controller) {
        var attempts = 0;
        return new Promise(function (resolve, reject) {
            function poll() {
                if (controller && controller.signal.aborted) {
                    return reject(new ApiError(API_ERROR.TIMEOUT));
                }
                fetch('/v1/jobs/' + jobId, {
                    headers: authHeaders(),
                    signal: controller ? controller.signal : undefined
                })
                .then(function (res) {
                    if (res.status === 401) { redirectToLogin(); throw new ApiError(API_ERROR.UNAUTHORIZED); }
                    if (!res.ok) throw new ApiError(API_ERROR.SERVER);
                    return res.json();
                })
                .then(function (job) {
                    if (job.status === 'completed') return resolve(job);
                    if (job.status === 'failed') {
                        var code = job.error_code || 'SERVER';
                        var msg = job.error_message || undefined;
                        return reject(new ApiError(API_ERROR[code] || API_ERROR.SERVER, msg));
                    }
                    attempts++;
                    if (attempts >= POLL_MAX_ATTEMPTS) return reject(new ApiError(API_ERROR.TIMEOUT));
                    setTimeout(poll, POLL_INTERVAL_MS);
                })
                .catch(function (err) {
                    if (err instanceof ApiError) return reject(err);
                    if (err.name === 'AbortError') return reject(new ApiError(API_ERROR.TIMEOUT));
                    reject(new ApiError(API_ERROR.NETWORK));
                });
            }
            poll();
        });
    }

    function mapBackendResponse(job) {
        var v = job.video;
        var tr = job.transcription;
        return {
            title: v.title,
            channel: v.channel,
            duration: formatTime(v.duration_seconds),
            thumbnail_url: v.thumbnail_url,
            segments: tr.segments,
            text: tr.text,
            raw_text: tr.raw_text,
            word_count: tr.word_count,
            language: tr.language,
            job_id: String(job.job_id),
            usage: job.usage
        };
    }

    function transcribe(url) {
        if (!isAuthenticated()) {
            redirectToLogin();
            return Promise.reject(new ApiError(API_ERROR.UNAUTHORIZED));
        }

        var controller = new AbortController();
        currentController = controller;

        return fetch('/v1/transcribe', {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ url: url, async: true }),
            signal: controller.signal
        })
        .then(function (res) {
            if (res.status === 401) { redirectToLogin(); throw new ApiError(API_ERROR.UNAUTHORIZED); }
            if (res.status === 402) throw new ApiError(API_ERROR.QUOTA_EXCEEDED);
            if (res.status === 404) throw new ApiError(API_ERROR.NOT_FOUND);
            if (res.status === 429) throw new ApiError(API_ERROR.RATE_LIMIT);
            if (res.status >= 500) throw new ApiError(API_ERROR.SERVER);
            if (!res.ok) throw new ApiError(API_ERROR.SERVER);
            return res.json();
        })
        .then(function (data) {
            return pollJob(data.job_id, controller);
        })
        .then(function (job) {
            return mapBackendResponse(job);
        })
        .then(function (data) {
            if (!validateTranscriptResponse(data)) throw new ApiError(API_ERROR.MALFORMED);
            return data;
        })
        .catch(function (err) {
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
                currentItem.job_id = data.job_id;
                currentItem.text = data.text;
                currentItem.raw_text = data.raw_text;
                currentItem.channel = data.channel;
                renderResultCard(currentItem);
                announce(t('announce.complete') + data.title);
                showResultSection();
                updatePlanStrip();
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
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // ── Transcript View Building & Switching ─────────────────────
    function buildTranscriptView(mode, item) {
        var wrapper = document.createElement('div');
        wrapper.className = 'transcript--' + mode;

        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (mode === 'cleaned') {
            if (item.text) {
                var paragraphs = item.text.split(/\n\n+/);
                paragraphs.forEach(function (para) {
                    if (!para.trim()) return;
                    var p = document.createElement('p');
                    p.className = 'transcript-paragraph';
                    p.textContent = para.trim();
                    wrapper.appendChild(p);
                });
            } else {
                var chunkSize = 5;
                for (var i = 0; i < item.segments.length; i += chunkSize) {
                    var p = document.createElement('p');
                    p.className = 'transcript-paragraph';
                    var texts = [];
                    for (var j = i; j < Math.min(i + chunkSize, item.segments.length); j++) {
                        texts.push(item.segments[j].text);
                    }
                    p.textContent = texts.join(' ');
                    wrapper.appendChild(p);
                }
            }
        } else if (mode === 'raw') {
            var rawContent = item.raw_text || item.segments.map(function (s) { return s.text; }).join(' ');
            var p = document.createElement('p');
            p.className = 'transcript-raw-text';
            p.textContent = rawContent;
            wrapper.appendChild(p);
        } else {
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
                wrapper.appendChild(div);
            });
        }

        return wrapper;
    }

    function switchTranscriptView(mode, toggleContainer, transcriptEl, item) {
        var btns = toggleContainer.querySelectorAll('.view-toggle-btn');
        btns.forEach(function (b) {
            var isActive = b.getAttribute('data-view') === mode;
            b.classList.toggle('view-toggle-btn--active', isActive);
            b.setAttribute('aria-checked', isActive ? 'true' : 'false');
        });
        var views = transcriptEl.querySelectorAll('[data-view]');
        views.forEach(function (v) { v.hidden = v.getAttribute('data-view') !== mode; });
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
            videoInfo.appendChild(titleEl);
            videoInfo.appendChild(thumbContainer);
            videoInfo.appendChild(infoEl);
        }

        var body = document.createElement('div');
        body.className = 'result-card-body';
        body.id = 'card-body-' + item.id;

        var toolbar = document.createElement('div');
        toolbar.className = 'transcript-toolbar';

        // Transcript title
        var toolbarTitle = document.createElement('h3');
        toolbarTitle.className = 'transcript-toolbar-title';
        toolbarTitle.textContent = t('transcript.title');
        toolbarTitle.setAttribute('data-i18n', 'transcript.title');

        // View toggle (segmented control)
        var viewToggle = document.createElement('div');
        viewToggle.className = 'view-toggle';
        viewToggle.setAttribute('role', 'radiogroup');
        viewToggle.setAttribute('aria-label', 'Transcript view');

        var viewModes = [
            { mode: 'cleaned', i18nKey: 'transcript.view-cleaned' },
            { mode: 'raw', i18nKey: 'transcript.view-raw' },
            { mode: 'segments', i18nKey: 'transcript.view-segments' }
        ];

        viewModes.forEach(function (vm, idx) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'view-toggle-btn' + (idx === 0 ? ' view-toggle-btn--active' : '');
            btn.setAttribute('role', 'radio');
            btn.setAttribute('aria-checked', idx === 0 ? 'true' : 'false');
            btn.setAttribute('data-view', vm.mode);
            btn.setAttribute('data-i18n', vm.i18nKey);
            btn.textContent = t(vm.i18nKey);
            btn.addEventListener('click', function () {
                switchTranscriptView(vm.mode, viewToggle, transcript, item);
            });
            viewToggle.appendChild(btn);
        });

        // Left side: title + view toggle
        var toolbarLeft = document.createElement('div');
        toolbarLeft.className = 'transcript-toolbar-left';
        toolbarLeft.appendChild(toolbarTitle);
        toolbarLeft.appendChild(viewToggle);

        // Right side: copy + download buttons
        var toolbarRight = document.createElement('div');
        toolbarRight.className = 'transcript-toolbar-right';

        // Copy button
        var copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'toolbar-action';
        copyBtn.setAttribute('aria-label', t('toolbar.copy-aria'));
        copyBtn.setAttribute('data-i18n-aria-label', 'toolbar.copy-aria');
        copyBtn.appendChild(createSvgElement('<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'));
        var copyLabel = document.createElement('span');
        copyLabel.textContent = t('toolbar.copy-label');
        copyLabel.setAttribute('data-i18n', 'toolbar.copy-label');
        copyBtn.appendChild(copyLabel);
        copyBtn.addEventListener('click', function () { handleCardCopy(copyBtn, copyLabel); });

        // Download SVG template
        var dlSvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';

        // TXT download
        var dlTxt = document.createElement('button');
        dlTxt.type = 'button';
        dlTxt.className = 'toolbar-action';
        dlTxt.appendChild(createSvgElement(dlSvg));
        var dlTxtLabel = document.createElement('span');
        dlTxtLabel.textContent = t('toolbar.download-txt-label');
        dlTxtLabel.setAttribute('data-i18n', 'toolbar.download-txt-label');
        dlTxt.appendChild(dlTxtLabel);
        dlTxt.addEventListener('click', function () { handleCardDownload('txt'); });

        // SRT download
        var dlSrt = document.createElement('button');
        dlSrt.type = 'button';
        dlSrt.className = 'toolbar-action';
        dlSrt.appendChild(createSvgElement(dlSvg));
        var dlSrtLabel = document.createElement('span');
        dlSrtLabel.textContent = t('toolbar.download-srt');
        dlSrtLabel.setAttribute('data-i18n', 'toolbar.download-srt');
        dlSrt.appendChild(dlSrtLabel);
        dlSrt.addEventListener('click', function () { handleCardDownload('srt'); });

        // VTT download
        var dlVtt = document.createElement('button');
        dlVtt.type = 'button';
        dlVtt.className = 'toolbar-action';
        dlVtt.appendChild(createSvgElement(dlSvg));
        var dlVttLabel = document.createElement('span');
        dlVttLabel.textContent = t('toolbar.download-vtt');
        dlVttLabel.setAttribute('data-i18n', 'toolbar.download-vtt');
        dlVtt.appendChild(dlVttLabel);
        dlVtt.addEventListener('click', function () { handleCardDownload('vtt'); });

        toolbarRight.appendChild(copyBtn);
        toolbarRight.appendChild(dlTxt);
        toolbarRight.appendChild(dlSrt);
        toolbarRight.appendChild(dlVtt);

        toolbar.appendChild(toolbarLeft);
        toolbar.appendChild(toolbarRight);

        var transcriptWrapper = document.createElement('div');
        transcriptWrapper.className = 'transcript-wrapper';

        var transcript = document.createElement('div');
        transcript.className = 'transcript';
        transcript.setAttribute('role', 'region');
        transcript.setAttribute('tabindex', '0');
        transcript.setAttribute('aria-label', t('transcript.aria'));
        transcript.setAttribute('data-i18n-aria-label', 'transcript.aria');

        // Pre-build all 3 views; only 'cleaned' is visible initially
        ['cleaned', 'raw', 'segments'].forEach(function(mode) {
            var view = buildTranscriptView(mode, item);
            view.setAttribute('data-view', mode);
            view.hidden = (mode !== 'cleaned');
            transcript.appendChild(view);
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

        // Plan-strip row: plan-strip + inline upgrade CTA
        var tPlanRow = document.createElement('div');
        tPlanRow.className = 'transcript-plan-strip';
        if (planStrip) tPlanRow.appendChild(planStrip);

        var tUpgradeCta = document.createElement('a');
        tUpgradeCta.href = 'pricing.html';
        tUpgradeCta.className = 'cta-upgrade cta-upgrade--inline';
        tUpgradeCta.setAttribute('aria-label', t('toolbar.plans-aria'));
        tUpgradeCta.setAttribute('data-i18n-aria-label', 'toolbar.plans-aria');
        tUpgradeCta.appendChild(createSvgElement('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'));
        var tCtaLabel = document.createElement('span');
        tCtaLabel.textContent = t('toolbar.plans-tooltip');
        tCtaLabel.setAttribute('data-i18n', 'toolbar.plans-tooltip');
        tUpgradeCta.appendChild(tCtaLabel);
        tPlanRow.appendChild(tUpgradeCta);

        // Transcript sidebar: vertical AI action buttons
        var sidebar = document.createElement('div');
        sidebar.className = 'transcript-sidebar';
        sidebar.setAttribute('role', 'toolbar');
        sidebar.setAttribute('aria-orientation', 'vertical');
        sidebar.setAttribute('aria-label', t('ai.toolbar-aria'));
        sidebar.setAttribute('data-i18n-aria-label', 'ai.toolbar-aria');

        var sidebarActions = [
            { action: 'summarize', i18nKey: 'ai.summarize', svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>' },
            { action: 'translate', i18nKey: 'ai.translate', svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>' },
            { action: 'chapters', i18nKey: 'ai.chapters', svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' },
            { action: 'keywords', i18nKey: 'ai.keywords', svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>' },
            { action: 'quiz', i18nKey: 'ai.quiz', svg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' },
        ];

        sidebarActions.forEach(function (ai) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'tsb-btn';
            btn.setAttribute('data-action', ai.action);
            btn.setAttribute('aria-label', t(ai.i18nKey));
            btn.setAttribute('data-tooltip', t(ai.i18nKey));
            btn.setAttribute('data-i18n-aria-label', ai.i18nKey);
            btn.setAttribute('data-i18n-data-tooltip', ai.i18nKey);
            btn.appendChild(createSvgElement(ai.svg));
            btn.addEventListener('click', function () { handleCardAIAction(ai.action, card); });
            sidebar.appendChild(btn);
        });

        // Assemble: toolbar → plan-strip → transcript inside wrapper
        transcriptWrapper.insertBefore(toolbar, transcript);
        transcriptWrapper.insertBefore(tPlanRow, toolbar);

        // Wrap sidebar + transcript in transcript-layout (below toolbar)
        var transcriptLayout = document.createElement('div');
        transcriptLayout.className = 'transcript-layout';
        transcriptLayout.appendChild(sidebar);
        transcriptLayout.appendChild(transcript);
        transcriptWrapper.appendChild(transcriptLayout);

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

    function buildSrtForItem(item) {
        if (!item || !item.segments || !item.segments.length) return '';
        return item.segments.map(function (seg, i) {
            var start = typeof seg.start === 'number' ? seg.start : 0;
            var end = (item.segments[i + 1] && typeof item.segments[i + 1].start === 'number')
                ? item.segments[i + 1].start : start + 5;
            return (i + 1) + '\n' + formatSrtTime(start) + ' --> ' + formatSrtTime(end) + '\n' + seg.text;
        }).join('\n\n');
    }

    function buildVttForItem(item) {
        if (!item || !item.segments || !item.segments.length) return '';
        var lines = ['WEBVTT', ''];
        item.segments.forEach(function (seg, i) {
            var start = typeof seg.start === 'number' ? seg.start : 0;
            var end = (item.segments[i + 1] && typeof item.segments[i + 1].start === 'number')
                ? item.segments[i + 1].start : start + 5;
            lines.push(formatVttTime(start) + ' --> ' + formatVttTime(end));
            lines.push(seg.text);
            lines.push('');
        });
        return lines.join('\n');
    }

    function formatSrtTime(seconds) {
        var h = Math.floor(seconds / 3600);
        var m = Math.floor((seconds % 3600) / 60);
        var s = Math.floor(seconds % 60);
        var ms = Math.round((seconds % 1) * 1000);
        return pad2(h) + ':' + pad2(m) + ':' + pad2(s) + ',' + pad3(ms);
    }

    function formatVttTime(seconds) {
        var h = Math.floor(seconds / 3600);
        var m = Math.floor((seconds % 3600) / 60);
        var s = Math.floor(seconds % 60);
        var ms = Math.round((seconds % 1) * 1000);
        return pad2(h) + ':' + pad2(m) + ':' + pad2(s) + '.' + pad3(ms);
    }

    function pad2(n) { return n < 10 ? '0' + n : '' + n; }
    function pad3(n) { return n < 10 ? '00' + n : n < 100 ? '0' + n : '' + n; }

    function handleCardDownload(format) {
        if (!currentItem) return;
        var item = currentItem;
        format = format || 'txt';
        var text, mime, ext;
        if (format === 'srt') {
            text = buildSrtForItem(item);
            mime = 'application/x-subrip;charset=utf-8';
            ext  = '.srt';
        } else if (format === 'vtt') {
            text = buildVttForItem(item);
            mime = 'text/vtt;charset=utf-8';
            ext  = '.vtt';
        } else if (format === 'md') {
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
        if (!currentItem || !currentItem.job_id) return;
        var item = currentItem;
        if (item.activeAI === action) { closeCardAIResult(cardEl); return; }

        if (!isAuthenticated()) { redirectToLogin(); return; }

        item.activeAI = action;
        var btns = cardEl.querySelectorAll('.tsb-btn');
        btns.forEach(function (btn) { btn.classList.toggle('tsb-btn--active', btn.getAttribute('data-action') === action); });
        var panel = cardEl.querySelector('.ai-result-panel');
        var badge = cardEl.querySelector('.ai-result-badge');
        var aiBody = cardEl.querySelector('.ai-result-body');
        if (!panel || !badge || !aiBody) return;

        badge.textContent = t('ai.' + action);
        panel.hidden = false;
        clearElement(aiBody);
        aiBody.appendChild(buildLoadingIndicator());

        var body = {};
        if (action === 'translate') {
            body.language = currentLang === 'en' ? 'es' : 'en';
        }

        fetch('/v1/jobs/' + item.job_id + '/actions/' + action, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(body)
        })
        .then(function (res) {
            if (res.status === 401) { redirectToLogin(); throw new ApiError(API_ERROR.UNAUTHORIZED); }
            if (res.status === 402) throw new ApiError(API_ERROR.QUOTA_EXCEEDED);
            if (!res.ok) return res.json().then(function (d) {
                var msg = (d.detail && d.detail.error && d.detail.error.message) || 'Action failed';
                throw new Error(msg);
            });
            return res.json();
        })
        .then(function (data) {
            if (item.activeAI !== action) return;
            clearElement(aiBody);
            var div = document.createElement('div');
            div.className = 'ai-result-text';
            div.textContent = data.result;
            aiBody.appendChild(div);
        })
        .catch(function (err) {
            if (item.activeAI !== action) return;
            clearElement(aiBody);
            var errEl = document.createElement('p');
            errEl.className = 'ai-result-error';
            errEl.textContent = err.message || t('error.generic');
            aiBody.appendChild(errEl);
        });

        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function closeCardAIResult(cardEl) {
        if (currentItem) currentItem.activeAI = null;
        var panel = cardEl.querySelector('.ai-result-panel');
        var aiBody = cardEl.querySelector('.ai-result-body');
        if (panel) panel.hidden = true;
        if (aiBody) clearElement(aiBody);
        cardEl.querySelectorAll('.tsb-btn').forEach(function (btn) { btn.classList.remove('tsb-btn--active'); });
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
        if (planStrip && (planStrip.closest('.results-list') || planStrip.closest('.video-info') || planStrip.closest('.transcript-plan-strip'))) {
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
    var lastActiveSection = undefined;

    function setActiveIslandStep(sectionName) {
        if (sectionName === lastActiveSection) return;
        lastActiveSection = sectionName;
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

    // ── Demo Mode: Typewriter + Mock Result ─────────────────────
    var demoTrigger = document.getElementById('demo-trigger');
    var demoTypeTimer = null;

    function stopDemo() {
        if (demoTypeTimer) { clearTimeout(demoTypeTimer); demoTypeTimer = null; }
        var cursor = inputWrapper ? inputWrapper.querySelector('.demo-cursor') : null;
        if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
        if (form) form.classList.remove('demo-mode');
        demoInProgress = false;
        urlInput.removeAttribute('readonly');
        submitBtn.disabled = false;
    }

    function runDemo() {
        if (demoPlayed || demoInProgress) return;
        if (!urlInput || !form) return;
        demoPlayed = true; demoInProgress = true;
        if (demoTrigger) demoTrigger.hidden = true;
        urlInput.setAttribute('readonly', ''); urlInput.placeholder = '';
        form.classList.add('demo-mode'); submitBtn.disabled = true;

        function onInterrupt() {
            urlInput.removeEventListener('focus', onInterrupt);
            urlInput.removeEventListener('click', onInterrupt);
            stopDemo();
            urlInput.value = '';
            urlInput.focus();
        }
        urlInput.addEventListener('focus', onInterrupt);
        urlInput.addEventListener('click', onInterrupt);

        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) {
            urlInput.value = DEMO_URL;
            urlInput.removeEventListener('focus', onInterrupt);
            urlInput.removeEventListener('click', onInterrupt);
            setTimeout(demoSubmit, 300);
            return;
        }
        var cursor = document.createElement('span'); cursor.className = 'demo-cursor'; cursor.setAttribute('aria-hidden', 'true');
        if (inputWrapper) inputWrapper.appendChild(cursor);
        var measureCanvas = document.createElement('canvas'); var ctx = measureCanvas.getContext('2d');
        var inputStyles = window.getComputedStyle(urlInput); ctx.font = inputStyles.fontSize + ' ' + inputStyles.fontFamily;
        var charIndex = 0;
        function positionCursor() { var textWidth = ctx.measureText(urlInput.value).width; var inputPadding = parseFloat(inputStyles.paddingLeft) || 0; cursor.style.left = (inputPadding + textWidth) + 'px'; }
        function typeNextChar() {
            if (!demoInProgress) return;
            if (charIndex < DEMO_URL.length) {
                urlInput.value += DEMO_URL[charIndex]; charIndex++; positionCursor();
                demoTypeTimer = setTimeout(typeNextChar, DEMO_CHAR_DELAY_MIN + Math.random() * (DEMO_CHAR_DELAY_MAX - DEMO_CHAR_DELAY_MIN));
            } else {
                if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
                urlInput.removeEventListener('focus', onInterrupt);
                urlInput.removeEventListener('click', onInterrupt);
                demoTypeTimer = setTimeout(demoSubmit, DEMO_POST_TYPE_DELAY);
            }
        }
        positionCursor(); typeNextChar();
    }

    function demoSubmit() {
        if (form) form.classList.remove('demo-mode');
        demoInProgress = false;
        urlInput.removeAttribute('readonly');
        submitBtn.disabled = false;

        currentItem = {
            id: 1, url: DEMO_URL, videoId: extractVideoId(DEMO_URL),
            status: 'done',
            title: 'But what is a neural network? | Chapter 1, Deep learning',
            channel: '3Blue1Brown', duration: '19:13',
            segments: [
                { start: 0, text: 'This is the number three. It\'s sloppily written and rendered at an extremely low resolution of 28x28 pixels, but your brain has no trouble recognizing it as a 3.' },
                { start: 18, text: 'And I want you to take a moment to appreciate how crazy it is that brains can do this so effortlessly.' },
                { start: 25, text: 'I mean, this, this and this are also recognizable as 3s, even though the specific values of each pixel is very different from one image to the next.' },
                { start: 36, text: 'The particular light-sensitive cells in your eye that are firing when you see this 3 are very different from the ones firing when you see this 3.' }
            ],
            text: 'This is the number three. It\'s sloppily written and rendered at an extremely low resolution of 28x28 pixels, but your brain has no trouble recognizing it as a 3.\n\nAnd I want you to take a moment to appreciate how crazy it is that brains can do this so effortlessly.\n\nI mean, this, this and this are also recognizable as 3s, even though the specific values of each pixel is very different from one image to the next.\n\nThe particular light-sensitive cells in your eye that are firing when you see this 3 are very different from the ones firing when you see this 3.',
            raw_text: 'This is the number three. It\'s sloppily written and rendered at an extremely low resolution of 28x28 pixels, but your brain has no trouble recognizing it as a 3. And I want you to take a moment to appreciate how crazy it is that brains can do this so effortlessly. I mean, this, this and this are also recognizable as 3s, even though the specific values of each pixel is very different from one image to the next. The particular light-sensitive cells in your eye that are firing when you see this 3 are very different from the ones firing when you see this 3.'
        };
        renderResultCard(currentItem);
        showResultSection();
    }

    if (demoTrigger) {
        demoTrigger.addEventListener('click', runDemo);
    }

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
    updatePlanStrip();

    // Re-measure island width after initial translations (ES texts are wider)
    if (remeasureIsland) remeasureIsland();

})();
