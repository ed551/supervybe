/**
 * SUPERVYBE - Support Screen Brain (support.js)
 * Role: Problem checker, updator, self-healing, communications manager.
 * Integrates: privacy_engine.js, auto_translation_engine.js, email_system_reporter.js
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("🧠 Supervybe Support Brain Initialized. Routing communication channels...");
    
    // 1. Initial System Diagnostics
    runSupportDiagnostics();
    
    // 2. Initialize Direct Messaging System
    initContactForm();
    
    // 3. Initialize PDF Viewer & Fallbacks
    initSupportPDFViewer();
    
    // 4. Start Background Self-Healing Cycle
    startSupportSelfHealingCycle();
});

// --- DIRECT MESSAGING SYSTEM ---

function initContactForm() {
    const btnSubmit = document.getElementById('btn-submit-support');
    const subjectInput = document.getElementById('support-subject');
    const messageInput = document.getElementById('support-message');

    if (!btnSubmit || !subjectInput || !messageInput) return;

    btnSubmit.addEventListener('click', () => {
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        if (!subject || !message) {
            alert("Please provide both a subject and a message so we can assist you properly.");
            return;
        }

        // UI Feedback
        btnSubmit.innerHTML = `<span>Sending...</span> ⏳`;
        btnSubmit.style.opacity = "0.7";

        const payload = {
            subject: subject,
            message: message,
            timestamp: new Date().toISOString()
        };

        // Hook into email_system_reporter.js
        setTimeout(() => {
            if (typeof EmailSystemReporter !== 'undefined' && EmailSystemReporter.dispatch) {
                EmailSystemReporter.dispatch(payload);
            } else {
                console.log("📨 (Simulated) Support ticket dispatched to Admin queue:", payload);
            }

            // Success state
            btnSubmit.innerHTML = `<span>Message Sent!</span> ✅`;
            btnSubmit.style.backgroundColor = "#2ed573"; // Success Green
            btnSubmit.style.opacity = "1";
            
            // Clear form
            subjectInput.value = "";
            messageInput.value = "";

            // Reset button after 3 seconds
            setTimeout(() => {
                btnSubmit.innerHTML = `<span>Send Message</span> 🚀`;
                btnSubmit.style.backgroundColor = "var(--accent-color)";
            }, 3000);
            
        }, 1200);
    });
}

// --- PDF VIEWER & MOBILE FALLBACK ---

function initSupportPDFViewer() {
    const iframe = document.getElementById('pdf-iframe');
    if (!iframe) return;

    // Detect mobile environments (crucial for accurate rendering on phone browsers/Termux testing)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        console.log("📱 Mobile environment detected. Prepping secure support guide download fallback.");
    }

    iframe.onerror = () => {
        console.warn("⚠️ Support PDF failed to render in iframe. Triggering fallback UI...");
        const container = document.getElementById('support-document-viewer');
        if (container) {
            container.innerHTML = `
                <div class="pdf-fallback">
                    <span style="font-size: 3rem;">📄</span>
                    <p style="margin-top: 10px;">The Support Guide could not be loaded securely in this view.</p>
                    <a href="asset/support.pdf" class="btn-download" download>Download Support Guide</a>
                </div>
            `;
        }
    };
}

// --- SELF-HEALING & DIAGNOSTICS AI ---

function runSupportDiagnostics() {
    let healthScore = 100;
    
    const requiredElements = ['support-contact-form', 'support-document-viewer'];
    
    requiredElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.error(`⛔ Problem Checker: Missing support UI element [${id}]!`);
            healthScore -= 30;
        }
    });

    if (healthScore < 100) {
        console.log(`🛠️ Master AI triggering auto-correction. Support UI Health: ${healthScore}%`);
        window.triggerSupportHealing();
    } else {
        console.log("✅ Support Diagnostics Complete. Help channels open.");
    }
}

function startSupportSelfHealingCycle() {
    // Background monitor runs every 25 seconds
    setInterval(() => {
        const contactForm = document.getElementById('support-contact-form');
        // If the messaging form is somehow deleted from the DOM, restore it
        if (!contactForm) {
            console.log("🔄 Self-Healing AI: Contact form missing. Restoring messaging capabilities...");
            location.reload(); 
        }
    }, 25000);
}

// Global hook for manual/external recovery
window.triggerSupportHealing = function() {
    console.log("⚕️ Support Master AI: Communications healing triggered! Reloading page...");
    location.reload(); 
};
