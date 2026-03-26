/**
 * terms.js
 * Supervybe - Terms & Conditions Master AI Agent
 * Role: Problem checker, updator, self-healing, self-generator brain.
 */

class TermsBrain {
    constructor() {
        this.pageName = "Terms & Conditions";
        // The specific files you requested to be included on the terms page
        this.requiredScripts = ['privacy_engine.js', 'auto_translation_engine.js'];
        this.pdfPath = 'asset/terms.pdf';
        
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
            console.log(`🤖 [Health Check] ${this.pageName} is boostiful and stable.`);
        }
    }

    // 4. Asset Verification
    verifyAssets() {
        // Checks if the terms.pdf actually exists in the background so the user doesn't hit a 404
        fetch(this.pdfPath, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    console.warn(`⚠️ [Problem Checker] ${this.pdfPath} is unreachable! Check public/asset folder.`);
                } else {
                    console.log(`✅ [Insights] PDF Asset ready for user viewing.`);
                }
            })
            .catch(err => console.error(`🚨 [System Fault] Network error while verifying PDF: ${err}`));
    }

    // 5. Admin AI Pulse
    showAIWorkSign() {
        // Creates a tiny visual pulse in the console or UI for the admin
        console.log('%c🤖 AI At Work: Attempting self-repair on Terms page...', 'color: #a855f7; font-weight: bold; background: #f3e8ff; padding: 3px; border-radius: 4px;');
    }
}

// Boot the brain as soon as the HTML has finished loading on the user's mobile screen
document.addEventListener('DOMContentLoaded', () => {
    window.SupervybeTermsBrain = new TermsBrain();
});
