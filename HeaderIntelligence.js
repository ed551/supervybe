/**
 * HeaderIntelligence.js
 * Supervybe - Master Header AI & Global Insights
 * Role: Manages Gold Predictions, Weather, Time, and AI Status without reloading the screen.
 */

class HeaderBrain {
    constructor() {
        console.log("🧠 [Master AI] Header Intelligence Booting...");
        this.init();
    }

    init() {
        // Run updates immediately on load to prevent blank data
        this.updateTimeAndDate();
        this.updateGoldIndicator();
        this.updateWeather();

        // The Auto-Minute Refresher (Runs every 60 seconds = 60000ms)
        // This updates the DOM text directly, preventing the screen from flashing!
        setInterval(() => {
            this.updateTimeAndDate();
            this.updateGoldIndicator();
            this.updateWeather();
        }, 60000);
    }

    // 1. Smart Clock & Date System (Day ends at 12am)
    updateTimeAndDate() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; 
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        const timeString = `${hours}:${minutes} ${ampm}`;
        
        // Find the clock icon in the header and update its adjacent text
        const clockElements = document.querySelectorAll('.header-tools .material-symbols-outlined');
        clockElements.forEach(el => {
            if (el.innerText === 'schedule' || el.innerText.includes('schedule')) {
                el.innerHTML = `schedule <span style="font-size: 14px; font-weight: bold; margin-left: 4px;">${timeString}</span>`;
            }
        });
    }

    // 2. Gold Price Movement Predictor (Self-Updating AI Logic)
    updateGoldIndicator() {
        const goldElement = document.getElementById('gold-signal');
        if (!goldElement) return;

        // Simulated AI Logic for prediction (Input, Logic, Output)
        const predictionStates = [
            { signal: 'keyboard_double_arrow_up', color: '#10b981', text: 'Gold' }, // Up
            { signal: 'keyboard_double_arrow_down', color: '#ef4444', text: 'Gold' }, // Down
            { signal: 'skip_next', color: '#f59e0b', text: 'Gold' } // No Change
        ];
        
        const bestSellers = ["Aura Bullion", "Global Gold Corp", "Apex Gold Exchange"];
        
        // Randomize for demonstration (Your real AI logic will plug in here)
        const currentState = predictionStates[Math.floor(Math.random() * predictionStates.length)];
        const currentSeller = bestSellers[Math.floor(Math.random() * bestSellers.length)];

        // Injecting the Sharp Icon and HTML
        goldElement.innerHTML = `
            ${currentState.text} 
            <span class="material-symbols-outlined" style="color: ${currentState.color}; font-size: 18px; font-weight: bold;">${currentState.signal}</span>
            <div style="font-size: 8px; color: #666; position: absolute; top: -12px; white-space: nowrap;">Best Seller: ${currentSeller}</div>
        `;
    }

    // 3. Smart Weather System
    updateWeather() {
        // Simulated Weather Data
        const weatherStates = [
            { condition: 'Hot', icon: 'sunny', color: '#ff8c00' }, // Gold/Orange
            { condition: 'Cold', icon: 'ac_unit', color: '#00bcd4' }, // Ice Blue
            { condition: 'Rainy', icon: 'rainy', color: '#0f766e' }, // Deep Tea
            { condition: 'Cloudy', icon: 'cloud', color: '#94a3b8' }, // Soft White/Gray
            { condition: 'Stormy', icon: 'thunderstorm', color: '#a855f7' } // Electric Purple
        ];

        const currentWeather = weatherStates[Math.floor(Math.random() * weatherStates.length)];

        // Target the weather icon in the header
        const weatherElements = document.querySelectorAll('.header-tools .material-symbols-outlined.weather-hot');
        weatherElements.forEach(el => {
            el.innerText = currentWeather.icon;
            el.style.color = currentWeather.color;
            el.style.textShadow = `0 0 5px ${currentWeather.color}`;
        });
    }
}

// Boot the Header Brain as soon as the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.SupervybeHeaderIntelligence = new HeaderBrain();
});
