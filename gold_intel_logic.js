/**
 * gold_intel_logic.js
 * Supervybe - Gold Price Movement Logic Unit
 * Role: Input, Logic, and Output definitions for daily predictions.
 */

class GoldIntelLogic {
    // 1. INPUT UNIT: Calculate the true "Gold Day"
    static getDailySeed() {
        const now = new Date();
        // Shift time back by 9 hours. 
        // This makes sure a new "day" seed doesn't generate until exactly 9:00 AM.
        const adjustedTime = new Date(now.getTime() - (9 * 60 * 60 * 1000));
        
        // Output a unique string for today (e.g., "2026-3-26")
        return `${adjustedTime.getFullYear()}-${adjustedTime.getMonth()}-${adjustedTime.getDate()}`;
    }

    // 2. LOGIC UNIT: Generate a stable prediction based on today's seed
    static generatePrediction() {
        const seed = this.getDailySeed();
        
        // Convert the date string into a consistent number
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = ((hash << 5) - hash) + seed.charCodeAt(i);
            hash |= 0;
        }
        const dailyNumber = Math.abs(hash);

        // 3. OUTPUT UNITS: Define the possible movements and sellers
        const states = [
            { signal: 'keyboard_double_arrow_up', color: '#10b981', text: 'Gold' },   // Up
            { signal: 'keyboard_double_arrow_down', color: '#ef4444', text: 'Gold' }, // Down
            { signal: 'skip_next', color: '#f59e0b', text: 'Gold' }                   // No Change
        ];

        const sellers = [
            "Aura Bullion", 
            "Global Gold Corp", 
            "Apex Exchange", 
            "Quantum Reserve",
            "Sovereign Gold"
        ];

        // Return the locked-in data for the day
        return {
            state: states[dailyNumber % states.length],
            seller: sellers[dailyNumber % sellers.length],
            seedID: seed
        };
    }
}

// Make globally available to the Engine
window.GoldIntelLogic = GoldIntelLogic;
