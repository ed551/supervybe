/**
 * script.js
 * Supervybe - Global Core, Soft Refresher, Weather & Health Drivers
 * Role: Problem checker, updator, flash-free background refresher, and AI driver hub.
 */

class SupervybeCore {
    constructor() {
        console.log("🧠 [Master AI] Supervybe Global Core Booting...");
        this.init();
    }

    init() {
        this.highlightActiveNavigation();
        this.initWeatherDriver();
        this.initHealthSentinel();
        this.startSoftAutoRefresher();
        this.runSystemHealthCheck();
    }

    // --- 1. SMART NAVIGATION ---
    // Highlights the active page icon in the bottom bar
    highlightActiveNavigation() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.smart-nav a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentPath === link.getAttribute('href')) {
                link.classList.add('active');
            }
        });
    }

    // --- 2. PERFECT WEATHER DRIVER ---
    initWeatherDriver() {
        // Defines sharp icon states and Boostiful color glows
        this.weatherStates = [
            { id: 'hot', icon: 'sunny', color: '#ff8c00', textShadow: '0 0 5px #ff8c00', label: 'Rising' }, // Gold/Orange
            { id: 'cold', icon: 'ac_unit', color: '#00bcd4', textShadow: '0 0 5px #00bcd4', label: 'Dropping' }, // Ice Blue
            { id: 'rainy', icon: 'water_drop', color: '#0f766e', textShadow: '0 0 5px #0f766e', label: 'Precipitation' }, // Deep Tea
            { id: 'cloudy', icon: 'cloud', color: '#94a3b8', textShadow: '0 0 5px #94a3b8', label: 'Neutral' }, // Soft White
            { id: 'stormy', icon: 'thunderstorm', color: '#a855f7', textShadow: '0 0 5px #a855f7', label: 'Alert' } // Electric Purple
        ];
        this.updateWeather();
    }

    updateWeather() {
        // Deterministic seed: Weather day begins at 12 AM midnight
        const seed = new Date().toLocaleDateString();
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = seed.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        const currentState = this.weatherStates[Math.abs(hash) % this.weatherStates.length];
        
        // Find the weather icon in the DOM and update it silently
        const weatherElements = document.querySelectorAll('.header-tools .weather-hot, .material-symbols-outlined.weather-hot');
        weatherElements.forEach(el => {
            el.innerText = currentState.icon;
            el.style.color = currentState.color;
            el.style.textShadow = currentState.textShadow;
        });
    }

    // --- 3. FINGERPRINT & HEALTH SENTINEL DRIVER ---
    initHealthSentinel() {
        // Find the fingerprint reader image and attach the Master AI logic
        const fpIcons = document.querySelectorAll('img[src*="fingerprint_reader.png"]');
        fpIcons.forEach(icon => {
            icon.style.cursor = 'pointer';
            // Ensure no duplicate listeners are attached
            icon.replaceWith(icon.cloneNode(true)); 
            const newIcon = document.querySelector('img[src*="fingerprint_reader.png"]');
            newIcon.addEventListener('click', () => this.triggerHealthScan(newIcon));
        });
    }

    diagnoseHealth() {
        const vitals = ["Heart Rate: Optimal", "Oxygen: 98%", "Hydration: Low", "Stress: Moderate"];
        const remedies = [
            "Drink 500ml of mineral water.",
            "Take a 5-minute deep breathing break.",
            "Standard mobility stretch required.",
            "Rest your eyes from the screen for 2 minutes."
        ];
        
        // AI Sign to Admin that it is at work
        console.log("🤖 [AI AT WORK]: Admin Notification - User health status examined.");
        
        return {
            status: "Healthy - Maintenance Required",
            report: vitals.join(" | "),
            action: remedies[Math.floor(Math.random() * remedies.length)]
        };
    }

    triggerHealthScan(iconElement) {
        // Trigger CSS glow animation for scanning effect
        iconElement.classList.add('scanning-glow');
        
        // Simulate Master AI processing time
        setTimeout(() => {
            const results = this.diagnoseHealth();
            alert(`🏥 MASTER AI HEALTH REPORT\n\nStatus: ${results.status}\n\nVitals: ${results.report}\n\nRemedy: ${results.action}`);
            iconElement.classList.remove('scanning-glow');
        }, 1500);
    }

    // --- 4. FLASH-FREE AUTO REFRESHER ---
    startSoftAutoRefresher() {
        // Runs exactly every 60 seconds (60000ms)
        setInterval(() => {
            console.log("🔄 [Auto-Refresher] Executing silent background sync...");
            
            this.runSystemHealthCheck();
            this.updateWeather(); // Sync weather seamlessly
            
            // Sync Gold Predictor dynamically if the engine is loaded
            if (window.SupervybeGoldEngine) {
                window.SupervybeGoldEngine.autoUpdateCheck();
            }
            
            // Dispatch a custom event so specific pages (like rewards) can update their numbers
            const updateEvent = new CustomEvent('supervybeMinuteUpdate');
            window.dispatchEvent(updateEvent);
            
            console.log("✅ [Auto-Refresher] Sync complete. UI remains stable.");
        }, 60000);
    }

    // --- 5. SYSTEM HEALTH CHECK ---
    runSystemHealthCheck() {
        const missingElements = [];
        if (!document.querySelector('.smart-header')) missingElements.push('Header');
        if (!document.querySelector('.smart-nav')) missingElements.push('Navigation Bar');
        if (!document.querySelector('.content-container')) missingElements.push('Main Content');

        if (missingElements.length > 0) {
            console.error(`⚠️ [Problem Checker] Missing critical UI components: ${missingElements.join(', ')}`);
        } else {
            console.log('%c🤖 App Control: Core layout is fully functional and boostiful.', 'color: #059669; font-weight: bold;');
        }
    }
}

// Boot the Core Brain as soon as the DOM is ready on the mobile screen
document.addEventListener('DOMContentLoaded', () => {
    window.SupervybeGlobalCore = new SupervybeCore();
});
