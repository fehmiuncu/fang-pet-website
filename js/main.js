document.addEventListener('DOMContentLoaded', () => {
    // Mark JS as loaded for progressive enhancement
    document.body.classList.add('js-loaded');

    // Language Handling
    // Default to 'en', but check if device is 'tr'
    let detectedLang = 'en';
    if (navigator.language.startsWith('tr')) {
        detectedLang = 'tr';
    }

    let currentLang = localStorage.getItem('fang_lang') || detectedLang;

    const updateContent = (lang) => {
        document.documentElement.lang = lang;

        // Update simple text elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const keys = element.getAttribute('data-i18n').split('.');
            let value = translations[lang];
            keys.forEach(key => {
                if (value) value = value[key];
            });
            if (value) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = value;
                } else {
                    element.textContent = value;
                }
            }
        });

        // Update Legal Content (Show/Hide sections)
        document.querySelectorAll('.legal-text-block').forEach(block => {
            if (block.getAttribute('lang') === lang) {
                block.style.display = 'block';
            } else {
                block.style.display = 'none';
            }
        });

        localStorage.setItem('fang_lang', lang);

        // Update select dropdown if exists
        const langSelect = document.getElementById('language-select');
        if (langSelect) langSelect.value = lang;

        // Update App Store badge
        const appStoreBadge = document.getElementById('app-store-badge');
        if (appStoreBadge) {
            appStoreBadge.src = lang === 'tr' ? 'assets/images/badges/app-store-tr.svg' : 'assets/images/badges/app-store-en.svg';
            appStoreBadge.alt = lang === 'tr' ? 'App Store\'dan İndir' : 'Download on the App Store';
        }

        // Update App Screenshot
        const appScreenshot = document.getElementById('app-screenshot');
        if (appScreenshot) {
            appScreenshot.src = lang === 'tr' ? 'assets/images/app-screenshot-tr.png' : 'assets/images/app-screenshot-en.png';
        }
    };

    // Initialize language
    updateContent(currentLang);

    // Language Switcher Event
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            updateContent(currentLang);
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Animation on Scroll
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// Modal Logic
const modalData = {
    privacy: {
        icon: "🔒",
        title: { tr: "Gizliliğiniz Önceliğimiz", en: "Privacy First" },
        desc: {
            tr: "Reklam yok. Sunucu yok. Fang, verilerinizi asla sunucularına göndermez. Tüm sağlık, konum ve evcil hayvan verileriniz cihazınızda şifrelenir ve sadece sizin kişisel iCloud hesabınızla senkronize edilir. Bizim bile verilerinize erişimimiz yoktur.",
            en: "No ads. No servers. Fang never sends your data to its servers. All health, location, and pet data is encrypted on your device and synced only with your personal iCloud account. Even we cannot access your data."
        }
    },
    sync: {
        icon: "☁️",
        title: { tr: "Ortak Bakım & Paylaşım", en: "Shared Care" },
        desc: {
            tr: "Sadece aile değil; bakıcılar, yürüyüş yaptıranlar veya veterinerinizle de paylaşın. Bir davet linki ile kişileri ekleyin. Biri köpeği gezdirdiğinde veya mamasını verdiğinde, diğer herkes anında bildirim alır ve veriler güncellenir.",
            en: "Not just for family; share with sitters, walkers, or your vet. Add people with an invite link. When someone walks the dog or feeds them, everyone else gets notified and data updates instantly."
        }
    },
    walk: {
        icon: "🦮",
        title: { tr: "Detaylı Yürüyüş Takibi", en: "Detailed Walk Tracking" },
        desc: {
            tr: "GPS ile rotanızı haritada görün. Yürüyüş sırasında telefonunuz kilitli olsa bile Live Activities ile süreyi ve mesafeyi kilit ekranından takip edin. Yürüyüş sonrası detaylı analizleri inceleyin.",
            en: "See your route on the map with GPS. Track duration and distance from the lock screen with Live Activities even while your phone is locked. Review detailed analytics after the walk."
        }
    },
    poster: {
        icon: "📢",
        title: { tr: "Kayıp Posteri", en: "Lost Pet Poster" },
        desc: {
            tr: "En kötü senaryoya hazırlıklı olun. Evcil hayvanınız kaybolursa, saniyeler içinde fotoğrafı, ismi, özellikleri ve iletişim bilgilerinizin yer aldığı yüksek kaliteli bir kayıp posteri oluşturun ve sosyal medyada paylaşın.",
            en: "Be prepared for the worst scenario. If your pet gets lost, create a high-quality lost poster with their photo, name, traits, and your contact info in seconds and share on social media."
        }
    },
    health: {
        icon: "❤️",
        title: { tr: "Sağlık Günlüğü", en: "Health Journal" },
        desc: {
            tr: "Aşı takvimini takip edin, yaklaşan aşılar için hatırlatıcı alın. Veteriner ziyaretlerini, uygulanan tedavileri ve ilaçları kaydedin. Evcil hayvanınızın tüm tıbbi geçmişi cebinizde.",
            en: "Track vaccine schedules and get reminders for upcoming shots. Record vet visits, treatments, and medications. Your pet's entire medical history in your pocket."
        }
    },
    insights: {
        icon: "📊",
        title: { tr: "Akıllı Analizler", en: "Smart Insights" },
        desc: {
            tr: "Haftalık ve aylık grafiklerle aktivite düzeyini izleyin. Kilo değişimini takip edin. Fang, evcil hayvanınızın sağlığı hakkında size eyleme geçirilebilir içgörüler sunar.",
            en: "Monitor activity levels with weekly and monthly charts. Track weight changes. Fang provides actionable insights about your pet's health."
        }
    }
};

function openModal(featureKey) {
    const modal = document.getElementById('feature-modal');
    const data = modalData[featureKey];
    // Use currentLang from localStorage or default to en
    const lang = localStorage.getItem('fang_lang') || 'en';

    if (data) {
        document.getElementById('modal-icon').textContent = data.icon;
        document.getElementById('modal-title').textContent = data.title[lang];
        document.getElementById('modal-desc').textContent = data.desc[lang];
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('feature-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on outside click
const modal = document.getElementById('feature-modal');
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'feature-modal') {
            closeModal();
        }
    });
}
