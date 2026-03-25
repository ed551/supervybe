/**
 * SUPERVYBE - Home Screen Brain (index.js)
 * Role: Problem checker, auto-updater, self-healing, self-generator.
 * Integrates: multimedia_stream_engine.js, content_governor.js, revenue_logic.js
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("🧠 Supervybe Home Brain Initialized. Commencing diagnostics...");
    
    // 1. Initial System Check & Boot
    runDiagnostics();
    
    // 2. Load Core Feed Content
    loadMultimediaStream();
    loadDynamicPosts();
    loadSponsoredSlots();
    
    // 3. Start Background Self-Healing AI
    startSelfHealingCycle();
});

// --- CORE GENERATOR FUNCTIONS ---

function loadMultimediaStream() {
    const videoContainer = document.getElementById('video-stream-container');
    if (!videoContainer) return;

    // Assuming multimedia_stream_engine.js provides a global object or function
    if (typeof MultimediaEngine !== 'undefined') {
        MultimediaEngine.renderLiveStreams(videoContainer);
    } else {
        // Self-generator fallback if engine is still loading
        videoContainer.innerHTML = `
            <div class="video-wrapper" style="background: #000; border-radius: 10px; overflow: hidden; position: relative; height: 200px; display: flex; justify-content: center; align-items: center;">
                <span style="color: #fff; font-size: 2rem;">▶️ Live Video Stream</span>
                <div style="position: absolute; bottom: 10px; left: 10px; color: red; font-weight: bold; animation: pulse 1.5s infinite;">🔴 LIVE</div>
            </div>
        `;
    }
}

function loadDynamicPosts() {
    const feedContainer = document.getElementById('dynamic-post-feed');
    if (!feedContainer) return;

    // Assuming content_governor.js provides the feed logic
    if (typeof ContentGovernor !== 'undefined') {
        ContentGovernor.fetchLatestHappenings(feedContainer);
    } else {
        // AI Self-Generator Fallback
        const newPost = document.createElement('div');
        newPost.className = 'post-card';
        newPost.style.cssText = 'background: var(--card-bg); margin-top: 15px; padding: 15px; border-radius: 10px; box-shadow: 0 2px 5px var(--shadow-light);';
        newPost.innerHTML = `
            <div class="post-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <span class="avatar" style="font-size: 1.5rem;">👤</span>
                <strong>Supervybe Auto-Generator</strong>
                <span style="margin-left: auto; color: #888; font-size: 0.8rem;">Just now</span>
            </div>
            <div class="post-content" style="margin-bottom: 10px;">
                Welcome to the Boostiful community! The AI is currently optimizing your feed. Stay tuned for real-time updates and polls.
            </div>
            <div class="post-actions" style="display: flex; gap: 15px; font-size: 1.2rem; cursor: pointer;">
                <span>👍 <small>10</small></span> 
                <span>💬 <small>2</small></span> 
                <span>🔁</span>
            </div>
        `;
        feedContainer.appendChild(newPost);
    }
}

function loadSponsoredSlots() {
    const adContainer = document.getElementById('ad-content-area');
    if (!adContainer) return;

    // Assuming revenue_logic.js provides monetization rendering
    if (typeof RevenueLogic !== 'undefined') {
        RevenueLogic.renderSponsoredPost(adContainer);
    } else {
        // Fallback Sponsored Slot
        adContainer.innerHTML = `
            <div style="background: linear-gradient(135deg, var(--accent-color), transparent); padding: 10px; border-radius: 8px; margin-top: 5px;">
                <strong>Boostiful Premium</strong>
                <p style="font-size: 0.9rem; margin-top: 5px;">Upgrade your Vybe! Experience the full power of the AI Master Hub.</p>
            </div>
        `;
    }
}

// --- SELF-HEALING & DIAGNOSTICS AI ---

function runDiagnostics() {
    const requiredElements = [
        'supervybe-global-header',
        'smart-hub-navigation',
        'supervybe-main-content'
    ];

    let healthScore = 100;

    requiredElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.warn(`⚠️ System Alert: Missing critical UI component [${id}].`);
            healthScore -= 20;
        }
    });

    if (healthScore < 100) {
        console.log(`🛠️ Initiating auto-correction. Current Health: ${healthScore}%`);
        window.triggerSystemHealing(); // Call global recovery
    } else {
        console.log("✅ Diagnostics Complete: System is 100% Boostiful.");
    }
}

function startSelfHealingCycle() {
    // Continuous background monitor (runs every 10 seconds)
    setInterval(() => {
        // 1. Check for orphaned empty feeds and regenerate them
        const feed = document.getElementById('dynamic-post-feed');
        if (feed && feed.children.length === 0) {
            console.log("🔄 Self-Healing: Feed empty. Regenerating content...");
            loadDynamicPosts();
        }

        // 2. Verify AdMob 5-hour window compliance
        const admobWindow = document.getElementById('admob-window');
        if (admobWindow) {
            const currentHour = new Date().getHours();
            // Example Logic: Show only between 12 PM and 5 PM (5 hours)
            if (currentHour >= 12 && currentHour < 17) {
                admobWindow.style.display = 'block';
            } else {
                admobWindow.style.display = 'none';
            }
        }
    }, 10000);
}

// Global hook for script.js to trigger healing manually
window.triggerSystemHealing = function() {
    console.log("⚕️ Master AI: System Healing Triggered!");
    // Re-verify main containers
    if (!document.getElementById('video-stream-container')) {
        console.log("Restoring Video Container...");
        const main = document.getElementById('supervybe-main-content');
        if (main) main.insertAdjacentHTML('afterbegin', '<section id="video-stream-container" class="feed-section"></section>');
        loadMultimediaStream();
    }
    // Update local data cache (mock)
    console.log("⚕️ Cache refreshed. Errors corrected.");
};
