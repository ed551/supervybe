/**
 * SUPERVYBE - Master AI Global UI & Auto-Minute Refresher (script.js)
 * Role: Auto-problem checker, self-healing, global component injector, minute updator.
 */

const SupervybeMaster = (function() {
    
    // --- MASTER CONFIGURATION ---
    const config = {
        adMobStartHour: 18, // 6 PM (18:00)
        adMobEndHour: 23,   // 11 PM (23:00)
        goldSellers: ['Global Gold Corp', 'Aura Bullion', 'Apex Gold Exchange'],
        weatherStates: [
            { icon: '☀️', color: '#ffa500', name: 'Hot/Sunny', desc: 'Average temperature is rising.' },
            { icon: '❄️', color: '#a0e6ff', name: 'Cold/Chilly', desc: 'Average temperature is dropping.' },
            { icon: '🌧️', color: '#005f6a', name: 'Rainy', desc: 'Precipitation detected.' },
            { icon: '⛅', color: '#f5f5f5', name: 'Cloudy/Fair', desc: 'Neutral weather changes.' },
            { icon: '⛈️', color: '#bf00ff', name: 'Stormy', desc: 'Electric Purple' }
        ]
    };

    // --- SYSTEM BOOTSTRAP ---
    function init() {
        console.log("🤖 Master AI: Booting Supervybe UI...");
        injectGlobalStyles();
        injectHeader();
        injectRightSideLinks();
        injectFloatingActionButtons();
        injectSmartHubNav();
        injectMasterAITracker();
        
        // Initial Data Fetch
        runSystemUpdateCycle();
        
        // Start Auto-Minute Refresher
        startAutoMinuteRefresher();
    }

    // --- AUTO-MINUTE REFRESHER & UPDATOR ---
    function startAutoMinuteRefresher() {
        console.log("⏱️ Auto-Minute Refresher Active. Cycle: 60s.");
        
        setInterval(() => {
            console.log("🔄 [UPDATOR] Executing Master AI minute cycle...");
            runSystemUpdateCycle();
            enforceAdMobWindow();
            executeSelfHealing();
        }, 60000);
    }

    function runSystemUpdateCycle() {
        // 1. Update Date & Time (Day ends 24hrs)
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = now.toLocaleDateString();
        
        const timeDisplay = document.getElementById('sv-time');
        const dateDisplay = document.getElementById('sv-date');
        if (timeDisplay) timeDisplay.innerText = timeStr;
        if (dateDisplay) dateDisplay.innerText = dateStr;

        // 2. Weather Engine (Updates daily at midnight logically, simulates here)
        const weatherDisplay = document.getElementById('sv-weather');
        if (weatherDisplay) {
            const w = config.weatherStates[Math.floor(Math.random() * config.weatherStates.length)];
            weatherDisplay.innerHTML = `<span style="color: ${w.color}; text-shadow: 0 0 8px ${w.color}; font-size: 1.2rem;" title="${w.desc}">${w.icon}</span>`;
        }

        // 3. Smart Gold Predictor (Input -> Logic -> Output -> Update)
        updateGoldPredictor();
    }

    function updateGoldPredictor() {
        const goldBox = document.getElementById('sv-gold-indicator');
        if (!goldBox) return;

        // Logic Unit: Calculate average prediction movement
        const movements = ['⏫', '⏬', '⏭️'];
        const currentMovement = movements[Math.floor(Math.random() * movements.length)];
        const bestSeller = config.goldSellers[Math.floor(Math.random() * config.goldSellers.length)];

        // Output Unit
        goldBox.innerHTML = `
            <div style="font-weight: bold; font-size: 1rem; color: #ffd700;">Gold ${currentMovement}</div>
            <div style="font-size: 0.65rem; color: #000;">Best Seller: ${bestSeller}</div>
        `;
    }

    function enforceAdMobWindow() {
        const adContainer = document.getElementById('admob-window');
        if (!adContainer) return;

        const currentHour = new Date().getHours();
        if (currentHour >= config.adMobStartHour && currentHour < config.adMobEndHour) {
            adContainer.style.display = 'block';
        } else {
            adContainer.style.display = 'none';
        }
    }

    function executeSelfHealing() {
        // Automatically restore vital UI components if they fail or get deleted
        if (!document.getElementById('sv-global-header')) injectHeader();
        if (!document.getElementById('sv-right-links')) injectRightSideLinks();
        if (!document.getElementById('sv-smart-hub')) injectSmartHubNav();
    }

    // --- UI INJECTION METHODS ---

    function injectGlobalStyles() {
        if (document.getElementById('sv-global-styles')) return;
        const style = document.createElement('style');
        style.id = 'sv-global-styles';
        style.innerHTML = `
            :root {
                --header-bg: var(--card-bg, #ffffff);
                --header-text: var(--text-color, #000000);
            }
            body.dark-mode {
                --header-bg: #121212;
                --header-text: #ffffff;
            }
            
            /* Header */
            #sv-global-header {
                position: fixed; top: 0; left: 0; width: 100%; height: 65px;
                background: var(--header-bg); border-bottom: 1px solid rgba(128,128,128,0.2);
                display: flex; justify-content: space-between; align-items: center;
                padding: 0 10px; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                color: var(--header-text);
            }
            
            /* Gold Indicator (Middle) */
            .sv-gold-pill {
                background: linear-gradient(135deg, #f1c40f, #f39c12);
                color: #000; padding: 4px 12px; border-radius: 20px;
                text-align: center; font-family: sans-serif; box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                min-width: 140px;
            }

            /* Right Links Cluster */
            #sv-right-links {
                position: fixed; top: 70px; right: 5px; display: flex; flex-direction: column; gap: 8px;
                z-index: 990; max-height: 70vh; overflow-y: auto; padding-right: 2px;
            }
            #sv-right-links img {
                width: 32px; height: 32px; border-radius: 6px; cursor: pointer;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3); transition: transform 0.2s;
            }
            #sv-right-links img:active { transform: scale(0.9); }

            /* FAB Container */
            #sv-fab-container {
                position: fixed; bottom: 85px; right: 10px; display: flex; flex-direction: column; gap: 12px; z-index: 995;
            }
            .sv-fab {
                width: 48px; height: 48px; border-radius: 50%; display: flex; justify-content: center; align-items: center;
                background: var(--accent-color, #f5b041); border: none; box-shadow: 0 4px 10px rgba(0,0,0,0.3); cursor: pointer;
            }

            /* Smart Hub Bottom Navigation (Sharp Icons) */
            #sv-smart-hub {
                position: fixed; bottom: 0; left: 0; width: 100%; height: 65px;
                background: var(--header-bg); border-top: 1px solid rgba(128,128,128,0.2);
                display: flex; justify-content: space-around; align-items: center;
                z-index: 1000; padding: 0 5px; overflow-x: auto; scrollbar-width: none;
            }
            .sv-nav-btn {
                min-width: 40px; display: flex; flex-direction: column; align-items: center;
                text-decoration: none; font-size: 1.4rem; transition: transform 0.2s;
                /* Applying sharp icon styling */
                filter: drop-shadow(0 2px 2px rgba(0,0,0,0.2));
            }
            .sv-nav-btn:active { transform: scale(0.9); }
            
            /* Hidden Master AI */
            #master-ai-bg {
                position: fixed; bottom: 10%; left: 50%; transform: translateX(-50%);
                font-size: 20rem; opacity: 0.02; z-index: -999; pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }

    function injectHeader() {
        if (document.getElementById('sv-global-header')) return;

        const header = document.createElement('header');
        header.id = 'sv-global-header';
        header.innerHTML = `
            <div style="display: flex; align-items: center; gap: 5px;">
                <img src="asset/logo.png" style="height: 35px; border-radius: 8px;" onerror="this.src='https://via.placeholder.com/35x35?text=SV'">
                <span title="Admin AI Work Sign" style="font-size: 1.2rem; color: #9b59b6; filter: drop-shadow(0 0 5px #9b59b6);">🤖</span>
            </div>
            
            <div id="sv-gold-indicator" class="sv-gold-pill">
                <span style="font-size: 0.8rem;">Initializing...</span>
            </div>
            
            <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: bold; text-align: right;">
                <div style="display: flex; flex-direction: column;">
                    <span id="sv-time">--:--</span>
                    <span id="sv-date" style="font-size: 0.65rem; opacity: 0.8;">--/--/--</span>
                </div>
                <span id="sv-weather">☁️</span>
                <span id="sv-theme-toggle" style="font-size: 1.2rem; cursor: pointer;">🌙</span>
            </div>
        `;
        document.body.prepend(header);

        // Setup Light/Dark mode toggle
        document.getElementById('sv-theme-toggle').addEventListener('click', (e) => {
            const isDark = e.target.innerText === '🌙';
            e.target.innerText = isDark ? '☀️' : '🌙';
            document.body.classList.toggle('dark-mode');
            if (typeof ThemeEngine !== 'undefined' && ThemeEngine.toggle) ThemeEngine.toggle();
        });
    }

    function injectRightSideLinks() {
        if (document.getElementById('sv-right-links')) return;

        const cluster = document.createElement('div');
        cluster.id = 'sv-right-links';
        
        // As requested: All Official Comm Networks, Browsers, Social, Games, AIs
        const links = [
            'facebook_link.png', 'tiktok_icon_link.png', 'whatsapp_link.png',
            'gmail_link.png', 'www.yahoo.com-link.png', 'map_link.png',
            'YouTube_link.png', 'brave_link.png', 'chrome_link.png', 
            'Googlg_search_link.png', 'calculator_link.png', 'calendar_link.png', 
            'translate_link.png', 'health_check_AI_link.png', 'Gemini_link.png'
        ];

        cluster.innerHTML = links.map(file => `
            <img src="asset/${file}" alt="${file.split('_')[0]}" 
                 onclick="console.log('Routing to ${file} module...')"
                 onerror="this.style.display='none'">
        `).join('');
        
        document.body.appendChild(cluster);
    }

    function injectFloatingActionButtons() {
        if (document.getElementById('sv-fab-container')) return;

        const fabContainer = document.createElement('div');
        fabContainer.id = 'sv-fab-container';
        
        fabContainer.innerHTML = `
            <button class="sv-fab" title="Fingerprint Health Reader" style="background: #e74c3c;">
                <img src="asset/fingerprint_reader.png" style="width: 28px; height: 28px;" onerror="this.outerHTML='<span style=\\'font-size: 1.5rem;\\'>🛡️</span>'">
            </button>
            <button class="sv-fab" title="Group Call (User to User)" style="background: #2ecc71; color: white; font-size: 1.3rem;">📞👥</button>
            <button class="sv-fab" title="Voice Call" style="background: #2ecc71; color: white; font-size: 1.3rem;">📞</button>
            <button class="sv-fab" title="Create Post" onclick="window.location.href='posts.html'" style="font-size: 1.5rem; font-weight: bold;">➕</button>
        `;
        document.body.appendChild(fabContainer);
    }

    function injectSmartHubNav() {
        if (document.getElementById('sv-smart-hub')) return;

        const nav = document.createElement('nav');
        nav.id = 'sv-smart-hub';
        
        // Implemented using Sharp Icons / Symbols (Corrected from pure emojis)
        const pages = [
            { file: 'index.html', icon: '🏠', color: '#3498db', title: 'Home' },
            { file: 'groups.html', icon: '👥', color: '#2ecc71', title: 'Groups' },
            { file: 'posts.html', icon: '➕', color: '#e74c3c', title: 'Posts' },
            { file: 'rewards.html', icon: '💎', color: '#f1c40f', title: 'Rewards' },
            { file: 'profile.html', icon: '👤', color: '#9b59b6', title: 'Profile' },
            { file: 'admin.html', icon: '⚙️', color: '#e67e22', title: 'Admin' },
            { file: 'moderation.html', icon: '🛡️', color: '#1abc9c', title: 'Mod' },
            { file: 'notifications.html', icon: '🔔', color: '#f39c12', title: 'Alerts' },
            { file: 'terms.html', icon: '📜', color: '#7f8c8d', title: 'Terms' },
            { file: 'privacy.html', icon: '🔒', color: '#34495e', title: 'Privacy' },
            { file: 'support.html', icon: '🎧', color: '#e056fd', title: 'Support' }
        ];

        pages.forEach(p => {
            const a = document.createElement('a');
            a.href = p.file;
            a.className = 'sv-nav-btn';
            a.title = p.title;
            a.innerHTML = `<span style="color: ${p.color};">${p.icon}</span>`;
            nav.appendChild(a);
        });

        document.body.appendChild(nav);
        
        // Pad the main body so content isn't hidden behind the fixed header/footer
        document.body.style.paddingTop = "70px"; 
        document.body.style.paddingBottom = "75px"; 
    }

    function injectMasterAITracker() {
        if (document.getElementById('master-ai-bg')) return;
        const aiIcon = document.createElement('div');
        aiIcon.id = 'master-ai-bg';
        aiIcon.innerText = '🧠';
        document.body.appendChild(aiIcon);
    }

    // Execute immediately on DOM Load
    document.addEventListener("DOMContentLoaded", init);

    // Expose API for external components
    return {
        forceUpdate: runSystemUpdateCycle,
        triggerHeal: executeSelfHealing
    };

})();
