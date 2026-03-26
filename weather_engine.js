/**
 * weather_engine.js - Supervybe Smart Weather Driver
 * Logic: Day begins at 12am. 24hr cycle. 
 */
const WeatherDriver = {
    states: {
        hot: { icon: '☀️', color: '#FFD700', glow: '0 0 15px #FFA500', label: 'Rising' },
        cold: { icon: '❄️', color: '#AFEEEE', glow: '0 0 15px #00BFFF', label: 'Dropping' },
        rainy: { icon: '🌧️', color: '#483D8B', glow: '0 0 15px #1E90FF', label: 'Precipitation' },
        cloudy: { icon: '⛅', color: '#F8F8FF', glow: '0 0 10px #FFFFFF', label: 'Neutral' },
        stormy: { icon: '⛈️', color: '#9932CC', glow: '0 0 20px #BF00FF', label: 'Alert' }
    },

    getTodayWeather() {
        const seed = new Date().toLocaleDateString(); // Changes at 12am
        let hash = 0;
        for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
        
        const keys = Object.keys(this.states);
        const state = this.states[keys[Math.abs(hash) % keys.length]];
        return state;
    },

    render() {
        const target = document.getElementById('smart-weather-hub');
        if (!target) return;

        const data = this.getTodayWeather();
        target.innerHTML = `
            <div class="weather-display" style="color: ${data.color}; text-shadow: ${data.glow};">
                <span class="weather-icon">${data.icon}</span>
                <span class="weather-trend">${data.label}</span>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => WeatherDriver.render());
