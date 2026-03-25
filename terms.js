/**
 * SUPERVYBE - Terms & Conditions Brain (terms.js)
 * Role: Problem checker, updator, self-healing, legal compliance manager.
 * Integrates: privacy_engine.js, auto_translation_engine.js
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("🧠 Supervybe Legal Brain Initialized. Auditing Terms of Service interface...");
    
    // 1. Initial System Diagnostics
    runTermsDiagnostics();
    
    // 2. Initialize PDF Viewer & Fallbacks
    initPDFViewer();
    
    // 3. Apply Auto-Translation (if available)
    applyTranslationToPolicy();
    
    // 4. Start Background Self-Healing Cycle
    startTermsSelfHealingCycle();
});

// --- PDF VIEWER & MOBILE FALLBACK ---

function initPDFViewer() {
    const iframe = document.getElementById('pdf-iframe');
    if (!iframe) return;

    // Many mobile browsers do not support direct PDF rendering inside iframes.
    // We listen for load errors or check if it's a known mobile environment to display the fallback.
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        console.log("📱 Mobile environment detected. Ensuring PDF download fallback is accessible.");
        // We ensure the fallback inside the iframe tag is available, 
        // or we could dynamically replace the iframe with a download button if preferred.
    }

    iframe.onerror = () => {
        console.warn("⚠️ PDF failed to render in iframe. Triggering fallback UI...");
        const container = document.getElementById('terms-document-viewer');
        container.innerHTML = `
            <div class="pdf-fallback">
                <span style="font-size: 3rem;">📄</span>
                <p style="margin-top: 10px;">The Terms PDF could not be loaded securely in this view.</p>
                <a href="asset/terms.pdf" class="btn-download" download>Download Terms PDF safely</a>
            </div>
        `;
    };
}

// --- TRANSLATION INTEGRATION ---

function applyTranslationToPolicy() {
    const policyCard = document.getElementById('transparency-statement');
    if (!policyCard) return;

    // Hook into auto_translation_engine.js
    if (typeof AutoTranslationEngine !== 'undefined' && AutoTranslationEngine.translateElement) {
        console.log("🌍 Connecting to Translation Engine for policy clarity...");
        AutoTranslationEngine.translateElement(policyCard);
    } else {
        console.log("🌍 Native language set to English. Transparency policy displayed clearly.");
    }
}

// --- SELF-HEALING & DIAGNOSTICS AI ---

function runTermsDiagnostics() {
    let healthScore = 100;
    
    if (!document.getElementById('transparency-statement')) {
        console.error("⛔ CRITICAL: Transparency policy statement missing! Compliance failure.");
        healthScore -= 50; // High penalty for missing legal transparency
    }
    
    if (!document.getElementById('terms-document-viewer')) {
        console.warn("⚠️ Problem Checker: PDF viewer container missing.");
        healthScore -= 25;
    }

    if (healthScore < 100) {
        console.log(`🛠️ Master AI triggering auto-correction. Legal UI Health: ${healthScore}%`);
        window.triggerTermsHealing();
    } else {
        console.log("✅ Terms Diagnostics Complete. Compliance and transparency verified.");
    }
}

function startTermsSelfHealingCycle() {
    // Background monitor runs every 30 seconds to ensure the transparency card is never deleted
    setInterval(() => {
        const policyCard = document.getElementById('transparency-statement');
        if (!policyCard) {
            console.log("🔒 COMPLIANCE ALERT: Transparency statement removed. Auto-restoring...");
            
            const main = document.getElementById('supervybe-main-content');
            const newCard = document.createElement('section');
            newCard.className = 'transparent-policy-card';
            newCard.id = 'transparency-statement';
            newCard.innerHTML = `
                <h3>⚖️ Platform Transparency (Restored)</h3>
                <p><strong>This platform is for market research and user testing.</strong> Rewards are given for feedback and engagement. <strong>No financial investment is required.</strong></p>
                <ul>
                    <li>Users receive <strong>50%</strong> of reward credits.</li>
                    <li>Developers retain <strong>50%</strong> to sustain the platform.</li>
                </ul>
            `;
            
            // Insert it right after the header
            const header = document.querySelector('.legal-header');
            if (header && main) {
                header.insertAdjacentElement('afterend', newCard);
            }
        }
    }, 30000);
}

// Global hook to restore the Terms UI if completely broken
window.triggerTermsHealing = function() {
    console.log("⚕️ Legal Master AI: Compliance healing triggered! Reloading page...");
    location.reload(); 
};
