/**
 * script.js
 * Supervybe - Global Core & Soft Auto-Refresher
 * Role: Problem checker, updator, active state manager, and flash-free background refresher.
 */

class SupervybeCore {
    constructor() {
        console.log("🧠 [Master AI] Supervybe Global Core Booting...");
        this.init();
    }

    init() {
        this.highlightActiveNavigation();
        this.startSoftAutoRefresher();
        this.runSystemHealthCheck();
    }

    // 1. Smart Navigation Active State
    // Automatically highlights the current page's icon in the bottom bar
    highlightActiveNavigation() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.smart-nav a');
        
        navLinks.forEach(link => {
            // Remove active class from all
            link.classList.remove('active');
            
            // Add active class to the one matching the current URL
            const linkHref = link.getAttribute('href');
            if (currentPath === linkHref) {
                link.classList.add('active');
            }
        });
    }

    // 2. The Auto-Minute Update Refresher (FLASH-FREE)
    startSoftAutoRefresher() {
        // Runs every 60 seconds (60000ms)
        setInterval(() => {
            console.log("🔄 [Auto-Refresher] Executing silent background sync...");
            
            // Instead of reloading the page (which causes flashing), 
            // the AI checks DOM health and triggers background data fetches.
            this.runSystemHealthCheck();
            
            // Dispatch a custom event so other scripts (like posts.js or rewards.js)
            // know it's time to update their specific data dynamically.
            const updateEvent = new CustomEvent('supervybeMinuteUpdate');
            window.dispatchEvent(updateEvent);
            
            console.log("✅ [Auto-Refresher] Sync complete. UI remains stable.");
        }, 60000);
    }

    // 3. Auto-Problem Checker & Self-Healing
    runSystemHealthCheck() {
        const missingElements = [];
        
        // Ensure the universal layout elements exist
        if (!document.querySelector('.smart-header')) missingElements.push('Header');
        if (!document.querySelector('.smart-nav')) missingElements.push('Navigation Bar');
        if (!document.querySelector('.content-container')) missingElements.push('Main Content');

        if (missingElements.length > 0) {
            console.error(`⚠️ [Problem Checker] Missing critical UI components: ${missingElements.join(', ')}`);
            this.triggerSelfHealing();
        } else {
            // AI Sign to admin
            console.log('%c🤖 App Control: Core layout is fully functional and boostiful.', 'color: #059669; font-weight: bold;');
        }
    }

    triggerSelfHealing() {
        // If the nav is missing, the AI attempts to reconstruct a basic safe-mode nav
        if (!document.querySelector('.smart-nav')) {
            console.log("🔧 [Self-Healing] Injecting emergency navigation bridge...");
            const emergencyNav = document.createElement('nav');
            emergencyNav.className = 'smart-nav';
            emergencyNav.innerHTML = `<a href="index.html" class="active"><span class="material-symbols-outlined">home</span></a>`;
            document.body.appendChild(emergencyNav);
        }
    }
}

// Boot the Core Brain as soon as the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.SupervybeGlobalCore = new SupervybeCore();
});
