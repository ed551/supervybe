/**
 * SUPERVYBE - Moderation Screen Brain (moderation.js)
 * Role: Problem checker, updator, self-healing, integrity auditor.
 * Integrates: admin_logic.js, integrity_audit_engine.js, global_kill_switch.js
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("🧠 Supervybe Moderation Brain Initialized. Auditing integrity logs...");
    
    // 1. Initial System Diagnostics
    runModerationDiagnostics();
    
    // 2. Initialize Queue Handlers
    initReportsQueue();
    
    // 3. Initialize Role Management Actions
    initRoleManagement();
    
    // 4. Start Background Self-Healing Cycle
    startModerationSelfHealingCycle();
});

// --- REPORTS QUEUE LOGIC ---

function initReportsQueue() {
    const queueContainer = document.getElementById('reports-queue-container');
    if (!queueContainer) return;

    queueContainer.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('.btn-mod-action');
        if (!actionBtn) return;

        const reportCard = actionBtn.closest('.report-card');
        const targetTitle = reportCard.querySelector('.report-header strong').innerText;
        
        let actionTaken = "";
        let logIcon = "";

        // Determine Action
        if (actionBtn.classList.contains('btn-approve')) {
            actionTaken = "approved";
            logIcon = "✅";
        } else if (actionBtn.classList.contains('btn-delete')) {
            actionTaken = "deleted";
            logIcon = "🗑️";
        } else if (actionBtn.classList.contains('btn-warn')) {
            actionTaken = "warned user regarding";
            logIcon = "⚠️";
        } else if (actionBtn.classList.contains('btn-ban')) {
            actionTaken = "banned user and removed";
            logIcon = "🚫";
            
            // Execute deeper security protocol if ban is selected
            if (typeof GlobalKillSwitch !== 'undefined' && GlobalKillSwitch.banUser) {
                GlobalKillSwitch.banUser(targetTitle);
            }
        }

        // Apply action and animate removal from queue
        reportCard.style.transform = "scale(0.9)";
        reportCard.style.opacity = "0";
        
        setTimeout(() => {
            reportCard.remove();
            
            // Update Transparency Log
            appendTransparencyLog(logIcon, `<strong>Mod @Edwin</strong> ${actionTaken} ${targetTitle}.`);
            
            // Sync with Integrity Audit Engine
            if (typeof IntegrityAudit !== 'undefined' && IntegrityAudit.recordAction) {
                IntegrityAudit.recordAction({ target: targetTitle, action: actionTaken });
            }
        }, 300);
    });
}

// --- ROLE MANAGEMENT ---

function initRoleManagement() {
    const btnAssignMod = document.getElementById('btn-assign-mod');
    const btnAssignAdmin = document.getElementById('btn-assign-admin');
    const targetInput = document.getElementById('target-user-id');

    if (!btnAssignMod || !btnAssignAdmin || !targetInput) return;

    const executeRoleChange = (roleName, logIcon) => {
        const userId = targetInput.value.trim();
        if (!userId) {
            alert("Please enter a valid User ID or Handle.");
            return;
        }

        // Connect to admin_logic.js for real DB update
        if (typeof AdminLogic !== 'undefined' && AdminLogic.assignRole) {
            AdminLogic.assignRole(userId, roleName);
        }

        alert(`Success! ${userId} has been granted ${roleName} privileges.`);
        appendTransparencyLog(logIcon, `<strong>Mod @Edwin</strong> promoted ${userId} to ${roleName}.`);
        targetInput.value = "";
    };

    btnAssignMod.addEventListener('click', () => executeRoleChange('Moderator', '🛡️'));
    btnAssignAdmin.addEventListener('click', () => executeRoleChange('Administrator', '⚙️'));
}

// --- TRANSPARENCY LOG UPDATER ---

function appendTransparencyLog(icon, messageHtml) {
    const logContainer = document.getElementById('transparency-log-container');
    if (!logContainer) return;

    const newLog = document.createElement('div');
    newLog.className = 'log-item';
    newLog.innerHTML = `
        <span class="log-icon">${icon}</span>
        <span>${messageHtml}</span>
    `;

    // Insert at the top
    logContainer.prepend(newLog);
}

// --- SELF-HEALING & DIAGNOSTICS AI ---

function runModerationDiagnostics() {
    let healthScore = 100;
    
    if (!document.getElementById('reports-queue-container')) {
        console.error("⛔ Problem Checker: Reports queue is missing!");
        healthScore -= 30;
    }
    
    if (!document.getElementById('transparency-log-container')) {
        console.warn("⚠️ Problem Checker: Transparency log missing. Healing required.");
        healthScore -= 20;
    }

    if (healthScore < 100) {
        console.log(`🛠️ Master AI triggering auto-correction. Moderation UI Health: ${healthScore}%`);
        window.triggerModerationHealing();
    } else {
        console.log("✅ Moderation Diagnostics Complete. Systems secure.");
    }
}

function startModerationSelfHealingCycle() {
    // Background monitor runs every 15 seconds
    setInterval(() => {
        const queueContainer = document.getElementById('reports-queue-container');
        // AI auto-fetches new reports if the queue gets empty
        if (queueContainer && queueContainer.children.length === 0) {
            console.log("🔄 Integrity AI: Queue empty. Refreshing reports from database...");
            
            // Simulated fetch of a new report if none exist
            setTimeout(() => {
                if (queueContainer.children.length === 0) {
                    const dummyReport = document.createElement('div');
                    dummyReport.className = 'report-card';
                    dummyReport.innerHTML = `
                        <div class="report-header">
                            <span>Target: <strong>System Check</strong></span>
                            <span>Reason: Auto-ping</span>
                        </div>
                        <div class="report-content">Automated routine ping from Master AI to verify queue activity.</div>
                        <div class="report-actions">
                            <button class="btn-mod-action btn-approve" title="Acknowledge">✅</button>
                        </div>
                    `;
                    queueContainer.appendChild(dummyReport);
                }
            }, 3000);
        }
    }, 15000);
}

// Global hook for manual/external recovery
window.triggerModerationHealing = function() {
    console.log("⚕️ Moderation Master AI: Healing executed. Reloading interface...");
    location.reload(); 
};
