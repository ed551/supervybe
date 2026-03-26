/**
 * theme_engine.js
 * Supervybe - Master UI Theme Controller
 * Role: Manages persistent Light/Dark mode across all 11 pages seamlessly without flashing.
 */

class ThemeEngine {
    constructor() {
        this.themeKey = 'supervybe_theme';
        this.toggleBtnId = 'theme-toggle';
        
        // Boot instantly to prevent screen flashing
        this.init();
    }

    init() {
        // 1. Check local storage for the user's saved preference
        const savedTheme = localStorage.getItem(this.themeKey);
        
        // 2. Apply theme immediately before the rest of the page loads (stops the flash)
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }

        // 3. Sync the navigation icons once the HTML is fully drawn
        document.addEventListener('DOMContentLoaded', () => {
            this.updateIcon();
            this.attachListeners();
        });
    }

    toggle() {
        const body = document.body;
        const isDark = body.getAttribute('data-theme') === 'dark';

        if (isDark) {
            // Switch to Light Mode
            body.removeAttribute('data-theme');
            localStorage.setItem(this.themeKey, 'light');
            console.log('☀️ System Light Mode activated.');
        } else {
            // Switch to Dark Mode
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem(this.themeKey, 'dark');
            console.log('🌙 System Dark Mode activated.');
        }

        this.updateIcon();
    }

    updateIcon() {
        const toggleIcon = document.getElementById(this.toggleBtnId);
        if (!toggleIcon) return; // Failsafe if the button isn't on a specific page

        const isDark = document.body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            // In Dark Mode, show the Sun icon to switch back
            toggleIcon.innerText = 'light_mode'; 
            toggleIcon.style.color = '#ffd700'; // Golden
            toggleIcon.style.textShadow = '0 0 8px rgba(255, 215, 0, 0.5)';
        } else {
            // In Light Mode, show the Moon icon to switch to dark
            toggleIcon.innerText = 'dark_mode'; 
            toggleIcon.style.color = '#3730a3'; // Deep Indigo Crescent
            toggleIcon.style.textShadow = 'none';
        }
    }

    attachListeners() {
        // Failsafe: overrides any inline HTML clicks to ensure the engine fully controls the theme
        const toggleIcon = document.getElementById(this.toggleBtnId);
        if (toggleIcon) {
            toggleIcon.removeAttribute('onclick');
            toggleIcon.addEventListener('click', () => this.toggle());
        }
    }
}

// Start the engine immediately
const SupervybeTheme = new ThemeEngine();

// Expose the function globally just in case other files need to trigger it
window.toggleTheme = () => SupervybeTheme.toggle();
