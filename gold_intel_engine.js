/**
 * gold_intel_engine.js
 * Supervybe - Gold Price Movement Engine
 * Role: Auto-updates the DOM, corrects errors, and updates units silently.
 */

class GoldIntelEngine {
    constructor() {
        console.log("📈 [Master AI] Gold Intel Engine Booting...");
        this.currentSeed = null;
        this.init();
    }

    init() {
        // Initial draw on page load
        this.updateDOM();

        // 4. UPDATE UNIT: Silent Auto Minute Refresher
        setInterval(() => {
            this.autoUpdateCheck();
        }, 60000);
    }

    updateDOM() {
        const container = document.getElementById('gold-signal');
        
        // Auto-Error Correction: If the header container is missing, abort to prevent flashing/crashing
        if (!container) {
            console.warn("⚠️ [Problem Checker] Gold indicator container not found on this screen.");
            return; 
        }

        // Fetch the locked daily data
        const data = window.GoldIntelLogic.generatePrediction();
        this.currentSeed = data.seedID;

        // Inject the Sharp Icons and Boostiful styling
        container.innerHTML = `
            ${data.state.text} 
            <span class="material-symbols-outlined" style="color: ${data.state.color}; font-size: 18px; font-weight: bold; margin-left: 2px;">${data.state.signal}</span>
            <div style="font-size: 9px; color: #888; position: absolute; top: -14px; left: 50%; transform: translateX(-50%); white-space: nowrap; font-weight: normal;">
                Top Seller: <span style="color: #b8860b;">${data.seller}</span>
            </div>
        `;
    }

    autoUpdateCheck() {
        // Check if the clock just struck 9:00 AM to generate the next day's prediction
        const newSeed = window.GoldIntelLogic.getDailySeed();
        
        if (this.currentSeed !== newSeed) {
            console.log("🔄 [System Updater] 9 AM Threshold Reached. Updating Daily Gold Prediction...");
            this.updateDOM();
        }
    }
}

// Boot the Engine only after the page is fully drawn
document.addEventListener('DOMContentLoaded', () => {
    // Ensure the Logic file loaded properly before starting the Engine
    if (window.GoldIntelLogic) {
        window.SupervybeGoldEngine = new GoldIntelEngine();
    } else {
        console.error("🚨 [System Fault] gold_intel_logic.js is missing! Cannot start Gold Engine.");
    }
});
