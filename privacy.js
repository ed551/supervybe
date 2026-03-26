/**
 * SUPERVYBE - Privacy Policy Brain (privacy.js)
 * Role: Problem checker, updator, self-healing, data compliance manager.
 * Integrates: auto_translation_engine.js
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("🧠 Supervybe Privacy Brain Initialized. Auditing compliance interface...");
    
    // 1. Initial System Diagnostics
    runPrivacyDiagnostics();
    
    // 2. Initialize PDF Viewer & Fallbacks
    initPrivacyPDFViewer();
    
    // 3. Apply Auto-Translation (if available)
    applyTranslationToPrivacyPolicy();
    
    // 4. Start Background Self-Healing Cycle
    startPrivacySelfHealingCycle();
});

// --- PDF VIEWER & MOBILE FALLBACK ---

function initPrivacyPDFViewer() {
    const iframe = document.getElementById('pdf-iframe');
    if (!iframe) return;

    // Detect mobile environments that often block inline PDFs
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        console.log("📱 Mobile environment detected. Prepping secure PDF download fallback.");
    }

    iframe.onerror = () => {
        console.warn("⚠️ Privacy PDF failed to render securely. Triggering fallback UI...");
        const container = document.getElementById('privacy-document-viewer');
        if (container) {
            container.innerHTML = `
                <div class="pdf-fallback">
                    <span style="font-size: 3rem;">📄</span>
                    <p style="margin-top: 10px;">The Privacy PDF could not be loaded securely in this view.</p>
                    <a href="asset/privacy.pdf" class="btn-download" download>Download Privacy PDF safely</a>
                </div>
            `;
        }
    };
}

// --- TRANSLATION INTEGRATION ---

function applyTranslationToPrivacyPolicy() {
    const policyCard = document.getElementById('transparency-statement');
    if (!policyCard) return;

    // Hook into auto_translation_engine.js
    if (typeof AutoTranslationEngine !== 'undefined' && AutoTranslationEngine.translateElement) {
        console.log("🌍 Connecting to Translation Engine for maximum clarity...");
        AutoTranslationEngine.translateElement(policyCard);
    } else {
        console.log("🌍 Native language set to English. Privacy policy displayed clearly.");
    }
}

// --- SELF-HEALING & DIAGNOSTICS AI ---

function runPrivacyDiagnostics() {
    let healthScore = 100;
    
    if (!document.getElementById('transparency-statement')) {
        console.error("⛔ CRITICAL: Transparency policy statement missing! Data compliance failure.");
        healthScore -= 50; 
    }
    
    if (!document.getElementById('privacy-document-viewer')) {
        console.warn("⚠️ Problem Checker: Privacy PDF viewer container missing.");
        healthScore -= 25;
    }

    if (healthScore < 100) {
        console.log(`🛠️ Master AI triggering auto-correction. Privacy UI Health: ${healthScore}%`);
        window.triggerPrivacyHealing();
    } else {
        console.log("✅ Privacy Diagnostics Complete. Compliance verified.");
    }
}

function startPrivacySelfHealingCycle() {
    // Background monitor runs every 30 seconds to ensure the transparency card is never deleted
    setInterval(() => {
        const policyCard = document.getElementById('transparency-statement');
        if (!policyCard) {
            console.log("🔒 COMPLIANCE ALERT: Privacy transparency statement removed. Auto-restoring...");
            
            const main = document.getElementById('supervybe-main-content');
            const newCard = document.createElement('section');
            newCard.className = 'transparent-policy-card';
            newCard.id = 'transparency-statement';
            newCard.innerHTML = `
                <h3>🛡️ Data & Reward Clarity (Restored)</h3>
                <p><strong>This platform is strictly for market research and user testing.</strong></p>
                <p>Your engagement data is used to improve the app and distribute reward points fairly. <strong>No financial investment is required</strong> to participate. Reward distributions (points) are allocated as 50% to the user and 50% retained by the developer to sustain platform operations.</p>
            `;
            
            // Insert it right after the header
            const header = document.querySelector('.legal-header');
            if (header && main) {
                header.insertAdjacentElement('afterend', newCard);
            }
        }
    }, 30000);
}

// Global hook to restore the Privacy UI if completely broken
window.triggerPrivacyHealing = function() {
    console.log("⚕️ Legal Master AI: Compliance healing triggered! Reloading page...");
    location.reload(); 
};
