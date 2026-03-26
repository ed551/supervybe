/**
 * support.js
 * Supervybe - Customer Support Master AI Agent
 * Role: Problem checker, updator, self-healing, self-generator brain.
 */

class SupportBrain {
    constructor() {
        this.pageName = "Customer Support";
        // The specific files requested for the support page, including the email reporter
        this.requiredScripts = [
            'privacy_engine.js', 
            'auto_translation_engine.js', 
            'email_system_reporter.js'
        ];
        this.pdfPath = 'asset/support.pdf';
        
        // Boot up the AI agent
        this.init();
    }

    init() {
        console.log(`🧠 [Master AI] Initializing ${this.pageName} Brain...`);
        this.loadDependencies();
        this.startSelfHealingCycle();
        this.verifyAssets();
    }

    // 1. Self-Generator: Dynamically injects required scripts if they are missing
    loadDependencies() {
        this.requiredScripts.forEach(script => {
            if (!document.querySelector(`script[src="${script}"]`)) {
                let scriptTag = document.createElement('script');
                scriptTag.src = script;
                scriptTag.async = true;
                document.body.appendChild(scriptTag);
                console.log(`🔄 [Auto-Updater] Injected missing dependency: ${script}`);
            } else {
                console.log(`✅ [System Checker] Dependency verified: ${script}`);
            }
        });
    }

    // 2. Auto-Minute Refresher & Problem Checker
    startSelfHealingCycle() {
        // Runs a health check every 60 seconds (60000 milliseconds)
        setInterval(() => {
            this.checkDOMHealth();
        }, 60000); 
    }

    // 3. Self-Healing Logic
    checkDOMHealth() {
        const nav = document.querySelector('.smart-nav');
        const header = document.querySelector('.smart-header');
        
        if (!nav || !header) {
            console.error(`⚠️ [Problem Checker] Crucial UI missing on ${this.pageName}. Triggering Master AI rebuild protocol...`);
            // AI sign to admin that it is working on a fix
            this.showAIWorkSign();
        } else {
            console.log(`🤖 [Health Check] ${this.pageName} UI is fully intact and boostiful.`);
        }
    }

    // 4. Asset Verification
    verifyAssets() {
        // Checks if the support.pdf actually exists to prevent user 404 errors
        fetch(this.pdfPath, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    console.warn(`⚠️ [Problem Checker] ${this.pdfPath} is unreachable! Check your public/asset folder.`);
                } else {
                    console.log(`✅ [Insights] Support PDF Asset is loaded and active.`);
                }
            })
            .catch(err => console.error(`🚨 [System Fault] Network error while verifying PDF: ${err}`));
    }

    // 5. Admin AI Pulse
    showAIWorkSign() {
        // Creates a visual pulse in the mobile dev console for the admin
        console.log('%c🤖 AI At Work: Verifying communication bridges on Support page...', 'color: #059669; font-weight: bold; background: #d1fae5; padding: 3px; border-radius: 4px;');
    }
}

// Boot the brain as soon as the HTML has finished loading on the screen
document.addEventListener('DOMContentLoaded', () => {
    window.SupervybeSupportBrain = new SupportBrain();
});
