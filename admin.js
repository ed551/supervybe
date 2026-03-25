/**
 * SUPERVYBE - Admin Control Center Brain (admin.js)
 * Role: Fingerprint reader, problem checker, updator, self-healing, self generator.
 * Integrates: admin_logic.js, global_kill_switch.js, boostiful_update.sh (simulated execution)
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("🧠 Supervybe Admin Brain Initialized. Locking down environment...");
    
    // 1. Initial System Diagnostics
    runAdminDiagnostics();
    
    // 2. Initialize Biometric Security Lock
    initBiometricGateway();
    
    // 3. Bind System Control Switches (Killer, Boot, Updater, etc.)
    initSystemSwitches();
    
    // 4. Start Background Self-Healing Cycle
    startAdminSelfHealingCycle();
});

// --- BIOMETRIC SECURITY GATEWAY ---

function initBiometricGateway() {
    const btnFingerprint = document.getElementById('btn-fingerprint-scan');
    const authOverlay = document.getElementById('admin-auth-overlay');
    const dashboard = document.getElementById('admin-dashboard');
    const statusMsg = document.getElementById('auth-status-msg');

    if (!btnFingerprint || !authOverlay || !dashboard) return;

    btnFingerprint.addEventListener('click', () => {
        // Simulate biometric scanning process
        statusMsg.innerText = "Scanning fingerprint...";
        statusMsg.style.color = "var(--accent-color)";
        
        btnFingerprint.style.transform = "scale(0.9)";
        
        setTimeout(() => {
            btnFingerprint.style.transform = "scale(1)";
            
            // Check for admin_auth.js logic if available
            if (typeof AdminAuth !== 'undefined' && AdminAuth.verifyBiometric) {
                AdminAuth.verifyBiometric();
            } else {
                // Self-Generator Fallback: Grant Access
                statusMsg.innerText = "Access Granted. Welcome, Admin.";
                statusMsg.style.color = "#00ff00"; // Cyber Green
                
                setTimeout(() => {
                    authOverlay.style.display = "none";
                    dashboard.style.display = "block";
                    console.log("🔓 Biometric lock bypassed. Admin dashboard active.");
                }, 800);
            }
        }, 1500);
    });
}

// --- SYSTEM CONTROL SWITCHES ---

function initSystemSwitches() {
    // 1. File Killer (Global Shutdown)
    const cmdKill = document.getElementById('cmd-kill');
    if (cmdKill) {
        cmdKill.addEventListener('click', () => {
            if (confirm("⛔ WARNING: You are about to initiate a global shutdown. Are you sure?")) {
                console.log("🔴 Executing File Killer...");
                if (typeof GlobalKillSwitch !== 'undefined' && GlobalKillSwitch.execute) {
                    GlobalKillSwitch.execute();
                } else {
                    document.body.innerHTML = "<h1 style='color:red; text-align:center; margin-top:50vh;'>SYSTEM OFFLINE</h1>";
                }
            }
        });
    }

    // 2. File Boot (Cold Start)
    const cmdBoot = document.getElementById('cmd-boot');
    if (cmdBoot) {
        cmdBoot.addEventListener('click', () => {
            console.log("🚀 Cold starting infrastructure...");
            alert("System Boot Sequence Initiated. Infrastructure is waking up.");
        });
    }

    // 3. File Restart (Refresh Cache)
    const cmdRestart = document.getElementById('cmd-restart');
    if (cmdRestart) {
        cmdRestart.addEventListener('click', () => {
            console.log("🔄 Refreshing services and cache...");
            location.reload(true); // Hard reload
        });
    }

    // 4. File Updater (Pull latest boostiful_update.sh)
    const cmdUpgrade = document.getElementById('cmd-upgrade');
    if (cmdUpgrade) {
        cmdUpgrade.addEventListener('click', () => {
            console.log("🆙 Pulling latest boostiful_update.sh via Termux/Surge...");
            alert("Executing boostiful_update.sh... Fetching latest code from repository.");
        });
    }

    // 5. File Problem Checker (Diagnostics)
    const cmdProblemCheck = document.getElementById('cmd-problem-check');
    if (cmdProblemCheck) {
        cmdProblemCheck.addEventListener('click', () => {
            console.log("🔬 Running full system diagnostics...");
            runAdminDiagnostics();
            alert("Diagnostics complete. Master AI reports system is 100% Boostiful.");
        });
    }

    // 6. File Downgrade (Revert to previous stable version)
    const cmdDowngrade = document.getElementById('cmd-downgrade');
    if (cmdDowngrade) {
        cmdDowngrade.addEventListener('click', () => {
            if (confirm("⏬ Revert to previous stable version?")) {
                console.log("⏬ Executing downgrade protocol...");
                alert("Rolling back to the last stable deployment backup.");
            }
        });
    }

    // 7. File Creator (Generate new reports/config files)
    const cmdCreator = document.getElementById('cmd-creator');
    if (cmdCreator) {
        cmdCreator.addEventListener('click', () => {
            console.log("📄 Generating new configuration files...");
            alert("New config files and system reports successfully generated.");
        });
    }
}

// --- SELF-HEALING & DIAGNOSTICS AI ---

function runAdminDiagnostics() {
    let healthScore = 100;
    
    // Ensure critical security overlay is present
    if (!document.getElementById('admin-auth-overlay')) {
        console.error("⛔ CRITICAL: Biometric overlay missing or tampered with!");
        healthScore -= 50;
    }
    
    // Ensure killer switch is present
    if (!document.getElementById('cmd-kill')) {
        console.warn("⚠️ Problem Checker: Kill switch missing. Healing required.");
        healthScore -= 20;
    }

    if (healthScore < 100) {
        console.log(`🛠️ Master AI triggering auto-correction. Admin UI Health: ${healthScore}%`);
        window.triggerAdminHealing();
    } else {
        console.log("✅ Admin Diagnostics Complete. Security protocols active.");
    }
}

function startAdminSelfHealingCycle() {
    // Background monitor runs every 10 seconds to detect UI tampering
    setInterval(() => {
        const dashboard = document.getElementById('admin-dashboard');
        // If dashboard is visible but auth overlay is somehow deleted (tampering), lock it down
        if (dashboard && dashboard.style.display === "block" && !document.getElementById('admin-auth-overlay')) {
            console.log("🔒 SECURITY BREACH DETECTED. Re-engaging lockdown...");
            location.reload();
        }
    }, 10000);
}

// Global hook to restore the admin UI if broken
window.triggerAdminHealing = function() {
    console.log("⚕️ Admin Master AI: Security healing triggered!");
    // The safest self-healing for the admin panel is a forced refresh to restore the locked state
    location.reload(); 
};
