const i18n = {
    en: {
        app_title: 'Hena',
        app_desc: 'Save your locations and share them easily.',
        btn_ios: 'Download on the App Store',
        btn_android: 'Android - Coming Soon',
        lang_label: 'العربية',
        privacy_title: 'Privacy Policy',
        last_updated: 'Last updated: March 31, 2026',
        back_link: '\u2190 Back',
        privacy_link: 'Privacy Policy',
    },
    ar: {
        app_title: 'هنــــا',
        app_desc: 'احفظ مواقعك وشاركها بسهولة.',
        btn_ios: 'حمّل من App Store',
        btn_android: 'أندرويد - قريبًا',
        lang_label: 'English',
        privacy_title: 'سياسة الخصوصية',
        app_name_note: 'هنــــا',
        last_updated: 'آخر تحديث: 31 مارس 2026',
        back_link: 'رجوع \u2192',
        privacy_link: 'سياسة الخصوصية',
    },
};

let currentLang = localStorage.getItem('hena-lang') || 'en';
let currentTheme = localStorage.getItem('hena-theme') || 'light';

const isPrivacyPage = document.getElementById('content-en') !== null;

function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('hena-lang', lang);

    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const strings = i18n[lang];

    document.getElementById('lang-label').textContent = strings.lang_label;

    if (isPrivacyPage) {
        document.getElementById('app-title').textContent = strings.privacy_title;
        document.getElementById('last-updated').textContent = strings.last_updated;
        document.getElementById('back-link').textContent = strings.back_link;
        document.getElementById('content-en').hidden = lang !== 'en';
        document.getElementById('content-ar').hidden = lang !== 'ar';
    } else {
        document.getElementById('app-title').textContent = strings.app_title;
        document.getElementById('app-desc').textContent = strings.app_desc;
        const privacyLink = document.getElementById('privacy-link');
        if (privacyLink) privacyLink.textContent = strings.privacy_link;
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (strings[key]) el.textContent = strings[key];
        });
    }
}

function toggleLang() {
    applyLang(currentLang === 'en' ? 'ar' : 'en');
}

function applyTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('hena-theme', theme);

    const root = document.documentElement;
    if (theme === 'dark') {
        root.classList.add('dark');
        document.getElementById('theme-icon').innerHTML = '&#9788;';
    } else {
        root.classList.remove('dark');
        document.getElementById('theme-icon').innerHTML = '&#9790;';
    }
}

function toggleTheme() {
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
}

// Init
applyLang(currentLang);
applyTheme(currentTheme);
