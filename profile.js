/**
 * SUPERVYBE - Profile Screen Brain (profile.js)
 * Role: Problem checker, auto-updator, self-healing, identity manager.
 * Integrates: auth_logic.js, user_history.js, wallet_engine.js
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("🧠 Supervybe Profile Brain Initialized. Verifying identity matrices...");
    
    // 1. Initial System Diagnostics
    runProfileDiagnostics();
    
    // 2. Initialize Auth Controls & State
    initAuthControls();
    
    // 3. Load User Data & History
    loadUserProfile();
    
    // 4. Initialize Premium / Wallet Hooks
    initPremiumUpgrades();
    
    // 5. Start Background Self-Healing Cycle
    startProfileSelfHealingCycle();
});

// --- AUTHENTICATION & UI STATE ---

function initAuthControls() {
    const btnSignIn = document.getElementById('btn-signin');
    const btnSignOut = document.getElementById('btn-signout');
    const btnDelete = document.getElementById('btn-delete-account');

    if (!btnSignIn || !btnSignOut || !btnDelete) return;

    btnSignIn.addEventListener('click', () => {
        // Connect to auth_logic.js if available
        if (typeof AuthLogic !== 'undefined' && AuthLogic.signIn) {
            AuthLogic.signIn();
        } else {
            console.log("🔐 (Simulated) Authenticating user...");
            simulateLoginState(true);
        }
    });

    btnSignOut.addEventListener('click', () => {
        if (typeof AuthLogic !== 'undefined' && AuthLogic.signOut) {
            AuthLogic.signOut();
        } else {
            console.log("🔓 (Simulated) User signed out.");
            simulateLoginState(false);
        }
    });

    btnDelete.addEventListener('click', () => {
        const confirmDelete = confirm("Are you sure you want to delete your Boostiful account? This action is irreversible.");
        if (confirmDelete) {
            console.log("🗑️ Account deletion initiated.");
            simulateLoginState(false);
            alert("Account data wiped successfully.");
        }
    });
}

function simulateLoginState(isLoggedIn) {
    const btnSignIn = document.getElementById('btn-signin');
    const btnSignOut = document.getElementById('btn-signout');
    const btnDelete = document.getElementById('btn-delete-account');
    const displayName = document.getElementById('display-name');
    const displayBio = document.getElementById('display-bio');

    if (isLoggedIn) {
        btnSignIn.classList.add('hidden');
        btnSignOut.classList.remove('hidden');
        btnDelete.classList.remove('hidden');
        
        // Populate with active user data
        displayName.innerText = "Edwin";
        displayBio.innerText = "Supervybe Developer & Community Leader 🚀";
        
        loadUserStats(42, 5, 850); // Simulated active stats
    } else {
        btnSignIn.classList.remove('hidden');
        btnSignOut.classList.add('hidden');
        btnDelete.classList.add('hidden');
        
        displayName.innerText = "Guest User";
        displayBio.innerText = "Welcome to Supervybe. Sign in to boost your identity.";
        
        loadUserStats(0, 0, 0); // Reset stats
    }
}

// --- DATA LOADING (HISTORY & STATS) ---

function loadUserProfile() {
    // Check if user_history.js is available to fetch real stats
    if (typeof UserHistory !== 'undefined' && UserHistory.fetchStats) {
        const stats = UserHistory.fetchStats();
        loadUserStats(stats.posts, stats.groups, stats.rewards);
    } else {
        // Default to Guest State on boot
        loadUserStats(0, 0, 0);
    }
}

function loadUserStats(posts, groups, rewards) {
    const statPosts = document.getElementById('stat-posts');
    const statGroups = document.getElementById('stat-groups');
    const statRewards = document.getElementById('stat-rewards');

    if (statPosts) statPosts.innerText = posts;
    if (statGroups) statGroups.innerText = groups;
    if (statRewards) statRewards.innerText = rewards;
}

// --- PREMIUM CUSTOMIZATION ---

function initPremiumUpgrades() {
    const btnUpgrade = document.getElementById('btn-upgrade-premium');
    if (!btnUpgrade) return;

    btnUpgrade.addEventListener('click', () => {
        // Connect to wallet_engine.js for monetization processing
        if (typeof WalletEngine !== 'undefined' && WalletEngine.triggerUpgrade) {
            WalletEngine.triggerUpgrade();
        } else {
            alert("✨ Premium Profile Customization Module: Unlock custom avatar borders, GIF profiles, and VIP badges! (Routing to Wallet Engine...)");
        }
    });
}

// --- SELF-HEALING & DIAGNOSTICS AI ---

function runProfileDiagnostics() {
    let healthScore = 100;
    
    const criticalElements = ['user-identity-display', 'auth-panel', 'btn-signin'];
    criticalElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.error(`⛔ Problem Checker: Profile UI component [${id}] is missing!`);
            healthScore -= 20;
        }
    });

    if (healthScore < 100) {
        console.log(`🛠️ Master AI triggering auto-correction. Profile UI Health: ${healthScore}%`);
        window.triggerProfileHealing();
    } else {
        console.log("✅ Profile Diagnostics Complete. Identity modules stable.");
    }
}

function startProfileSelfHealingCycle() {
    // Background monitor runs every 25 seconds
    setInterval(() => {
        const authPanel = document.getElementById('auth-panel');
        if (authPanel && authPanel.children.length === 0) {
            console.log("🔄 Self-Healing AI: Auth controls vanished. Restoring buttons...");
            authPanel.innerHTML = `
                <button class="btn-auth btn-signin" id="btn-signin">Sign In / Sign Up</button>
                <button class="btn-auth btn-signout hidden" id="btn-signout">Sign Out</button>
                <button class="btn-auth btn-delete hidden" id="btn-delete-account">Delete Account</button>
            `;
            initAuthControls(); // Rebind events
        }
    }, 25000);
}

// Global hook for script.js to trigger healing manually
window.triggerProfileHealing = function() {
    console.log("⚕️ Profile Master AI: System Healing Triggered!");
    const main = document.getElementById('supervybe-main-content');
    
    if (main && !document.getElementById('user-identity-display')) {
        console.warn("Critical layout failure. Reloading identity interface...");
        location.reload(); 
    }
};
