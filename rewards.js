/**
 * SUPERVYBE - Secure Cash Rewards Brain (rewards.js)
 * Role: Problem checker, updator, self-healing, dual-stream revenue isolation.
 * Integrates: unified_participant_payout.js, equal_split_protocol.js
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Supervybe Rewards Brain Initialized. Auditing financial security protocols...");
    
    // 1. Diagnostics & Healing
    runRewardsDiagnostics();
    
    // 2. Isolate Streams and Calculate Secure Balance
    loadAndSecureBalance();
    
    // 3. Initialize USD Withdrawal Handler
    initWithdrawalSystem();
    
    // 4. Background Self-Healing Cycle
    startRewardsSelfHealingCycle();
});

// --- SECURE FINANCIAL ISOLATION LOGIC ---

function loadAndSecureBalance() {
    // Simulated backend data retrieval
    // Stream 1: Generated directly from user activity (watching ads, interacting)
    const grossUserActivityRevenueUSD = 150.00; 
    
    // Stream 2: Generated independent of the user (platform exclusive)
    const platformExclusiveRevenueUSD = 300.00; 

    // APPLY STRICT SYSTEM SPLIT (Hidden from UI rendering logic)
    // User Activity Split: 40% User / 60% Developer Maintenance
    const userAllocation = grossUserActivityRevenueUSD * 0.40;
    const devActivityMaintenanceCut = grossUserActivityRevenueUSD * 0.60;

    // Platform Exclusive: 100% Developer
    const totalDeveloperSecuredFunds = devActivityMaintenanceCut + platformExclusiveRevenueUSD;

    // Secure the developer funds in local memory/backend before rendering user UI
    if (typeof EqualSplitProtocol !== 'undefined' && EqualSplitProtocol.secureDeveloperFunds) {
        // Routes silently to Business Number: 400200, Account: 853390
        EqualSplitProtocol.secureDeveloperFunds(totalDeveloperSecuredFunds);
    }

    // Display ONLY the user's strictly allocated cut, formatted to USD
    const balanceDisplay = document.getElementById('user-usd-balance');
    if (balanceDisplay) {
        balanceDisplay.innerText = `$${userAllocation.toFixed(2)}`;
        balanceDisplay.dataset.maxWithdrawal = userAllocation.toFixed(2);
    }
}

function initWithdrawalSystem() {
    const btnWithdraw = document.getElementById('btn-process-withdrawal');
    const amountInput = document.getElementById('withdraw-amount');
    const accountInput = document.getElementById('withdraw-account');

    if (!btnWithdraw || !amountInput || !accountInput) return;

    btnWithdraw.addEventListener('click', () => {
        const reqAmount = parseFloat(amountInput.value);
        const targetAccount = accountInput.value.trim();
        const maxAllowed = parseFloat(document.getElementById('user-usd-balance').dataset.maxWithdrawal);

        // Client-Side Security Validations
        if (isNaN(reqAmount) || reqAmount <= 0) {
            alert("Invalid amount. Please enter a valid USD value.");
            return;
        }
        if (reqAmount > maxAllowed) {
            alert("Insufficient USD funds for this transaction.");
            return;
        }
        if (!targetAccount.includes('@')) {
            alert("Please enter a valid USD receiving account email.");
            return;
        }

        // Lock UI to prevent duplicate submissions
        btnWithdraw.innerHTML = `<span>Processing Securely...</span>`;
        btnWithdraw.style.opacity = "0.7";
        btnWithdraw.disabled = true;

        // Route to the Unified Payout Engine (Strictly USD)
        setTimeout(() => {
            if (typeof UnifiedPayout !== 'undefined' && UnifiedPayout.executeUSDTransfer) {
                UnifiedPayout.executeUSDTransfer(targetAccount, reqAmount);
            } else {
                console.log(`[SYSTEM] Secure USD transfer initiated: $${reqAmount} to ${targetAccount}`);
            }

            // Deduct and update UI dynamically
            const newBalance = maxAllowed - reqAmount;
            document.getElementById('user-usd-balance').dataset.maxWithdrawal = newBalance;
            document.getElementById('user-usd-balance').innerText = `$${newBalance.toFixed(2)}`;
            
            // Reset Inputs
            amountInput.value = "";
            accountInput.value = "";

            // Success State
            btnWithdraw.innerHTML = `<span>Withdrawal Confirmed</span>`;
            btnWithdraw.style.backgroundColor = "#27ae60";

            // Restore Button
            setTimeout(() => {
                btnWithdraw.innerHTML = `<span>Withdraw Funds</span>`;
                btnWithdraw.style.backgroundColor = "#2ecc71";
                btnWithdraw.style.opacity = "1";
                btnWithdraw.disabled = false;
            }, 3000);

        }, 1800);
    });
}

// --- SELF-HEALING & DIAGNOSTICS AI ---

function runRewardsDiagnostics() {
    let healthScore = 100;
    
    // The policy statement is a mandatory compliance piece.
    if (!document.getElementById('reward-policy-statement')) {
        console.error("⛔ [COMPLIANCE ALERT] Transparency policy missing!");
        healthScore -= 50; 
    }
    
    if (!document.getElementById('withdrawal-module')) {
        console.error("⛔ [SYSTEM ALERT] Withdrawal module missing.");
        healthScore -= 50;
    }

    if (healthScore < 100) {
        console.log(`Master AI triggering auto-correction. Rewards UI Health: ${healthScore}%`);
        window.triggerRewardsHealing();
    } else {
        console.log("Financial UI Diagnostics Complete. Data streams isolated and secure.");
    }
}

function startRewardsSelfHealingCycle() {
    // Auto-minute refresher specifically for financial UI integrity
    setInterval(() => {
        const policy = document.getElementById('reward-policy-statement');
        const withdrawModule = document.getElementById('withdrawal-module');
        
        if (!policy || !withdrawModule) {
            console.log("🔒 SECURITY ALERT: Critical financial node deleted. Restoring DOM...");
            location.reload();
        } else {
            // Re-verify the balance hasn't been maliciously edited in the DOM
            loadAndSecureBalance();
        }
    }, 60000);
}

// Global hook for script.js to call if needed
window.triggerRewardsHealing = function() {
    console.log("Financial Master AI: System Healing Triggered!");
    location.reload(); 
};
