/**
 * SUPERVYBE - Notifications Settings Brain (notifications.js)
 * Role: Problem checker, updator, self-healing, preference manager.
 * Integrates: language_engine.js, performance_optimizer.js
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("🧠 Supervybe Notifications Brain Initialized. Auditing user preferences...");
    
    // 1. Initial System Diagnostics
    runNotificationsDiagnostics();
    
    // 2. Load User Preferences
    loadNotificationPreferences();
    
    // 3. Initialize Interactive Handlers
    initSaveLogic();
    
    // 4. Start Background Self-Healing Cycle
    startNotificationSelfHealingCycle();
});

// --- DATA LOADING & SAVING ---

function loadNotificationPreferences() {
    // Attempt to load from performance_optimizer.js (local storage hook)
    let prefs = null;
    
    if (typeof PerformanceOptimizer !== 'undefined' && PerformanceOptimizer.getSettings) {
        prefs = PerformanceOptimizer.getSettings('notifications');
    }

    // Default Fallback
    if (!prefs) {
        prefs = {
            replies: true,
            mentions: true,
            groups: false,
            rewards: true,
            frequency: 'instant',
            isPremiumUser: false // Simulated premium check
        };
    }

    // Apply to UI
    document.getElementById('notify-replies').checked = prefs.replies;
    document.getElementById('notify-mentions').checked = prefs.mentions;
    document.getElementById('notify-groups').checked = prefs.groups;
    document.getElementById('notify-rewards').checked = prefs.rewards;
    
    const freqSelect = document.getElementById('notify-frequency');
    if (freqSelect) freqSelect.value = prefs.frequency;

    // Handle Premium Toggles
    if (prefs.isPremiumUser) {
        document.getElementById('notify-events').disabled = false;
        document.getElementById('notify-vip').disabled = false;
        // Strip the visual disabled state
        const premiumSection = document.querySelector('.premium-alert');
        if(premiumSection) premiumSection.style.opacity = '1';
    } else {
        // Visual indicator that they are locked
        const premiumSection = document.querySelector('.premium-alert');
        if(premiumSection) premiumSection.style.opacity = '0.6';
    }
}

function initSaveLogic() {
    const btnSave = document.getElementById('btn-save-prefs');
    if (!btnSave) return;

    btnSave.addEventListener('click', () => {
        const prefs = {
            replies: document.getElementById('notify-replies').checked,
            mentions: document.getElementById('notify-mentions').checked,
            groups: document.getElementById('notify-groups').checked,
            rewards: document.getElementById('notify-rewards').checked,
            frequency: document.getElementById('notify-frequency').value
        };

        // UI Feedback
        btnSave.innerText = "Saving...";
        btnSave.style.opacity = "0.7";

        // Hook into performance_optimizer.js to save locally/remotely
        setTimeout(() => {
            if (typeof PerformanceOptimizer !== 'undefined' && PerformanceOptimizer.saveSettings) {
                PerformanceOptimizer.saveSettings('notifications', prefs);
            } else {
                console.log("💾 (Simulated) Preferences saved locally.");
                // Fallback to basic localStorage
                localStorage.setItem('sv_notify_prefs', JSON.stringify(prefs));
            }

            btnSave.innerText = "Preferences Saved ✔️";
            btnSave.style.opacity = "1";
            btnSave.style.backgroundColor = "#2ed573"; // Success Green

            // Reset button text after 2 seconds
            setTimeout(() => {
                btnSave.innerText = "Save Preferences";
                btnSave.style.backgroundColor = "var(--accent-color)";
            }, 2000);
        }, 800);
    });
}

// --- SELF-HEALING & DIAGNOSTICS AI ---

function runNotificationsDiagnostics() {
    let healthScore = 100;
    
    const requiredElements = [
        'notify-replies', 'notify-mentions', 'notify-frequency', 'btn-save-prefs'
    ];

    requiredElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.error(`⛔ Problem Checker: Missing settings element [${id}]!`);
            healthScore -= 25;
        }
    });

    if (healthScore < 100) {
        console.log(`🛠️ Master AI triggering auto-correction. Settings UI Health: ${healthScore}%`);
        window.triggerNotificationHealing();
    } else {
        console.log("✅ Notification Settings Diagnostics Complete. UI stable.");
    }
}

function startNotificationSelfHealingCycle() {
    // Background monitor runs every 20 seconds
    setInterval(() => {
        const btnSave = document.getElementById('btn-save-prefs');
        // Self-Healing logic if the save button was accidentally removed from DOM
        if (!btnSave) {
            console.log("🔄 Self-Healing AI: Save button missing. Regenerating...");
            const main = document.getElementById('supervybe-main-content');
            if (main) {
                const newBtn = document.createElement('button');
                newBtn.className = 'btn-save-settings';
                newBtn.id = 'btn-save-prefs';
                newBtn.innerText = 'Save Preferences';
                main.insertBefore(newBtn, document.getElementById('admob-window'));
                initSaveLogic(); // Re-bind the event listener
            }
        }
    }, 20000);
}

// Global hook for script.js to trigger healing manually
window.triggerNotificationHealing = function() {
    console.log("⚕️ Notifications Master AI: System Healing Triggered!");
    location.reload(); 
};
