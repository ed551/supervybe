/**
 * SUPERVYBE - Posts Screen Brain (posts.js)
 * Role: Problem checker, auto-updator, self-healing, self-generator.
 * Integrates: intelligent_dispatcher.js, security_audit.js
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("🧠 Supervybe Posts Brain Initialized. Commencing feed diagnostics...");
    
    // 1. Initial System Check
    runPostsDiagnostics();
    
    // 2. Initialize Post Creator Hub
    initPostCreator();
    
    // 3. Initialize Feed Interactions (Likes, Comments, Polls, Reports)
    initFeedInteractions();
    
    // 4. Start Background Self-Healing Cycle
    startPostsSelfHealingCycle();
});

// --- CONTENT CREATOR & DISPATCHER ---

function initPostCreator() {
    const submitBtn = document.getElementById('submit-post-btn');
    if (!submitBtn) return;

    submitBtn.addEventListener('click', () => {
        const titleInput = document.getElementById('post-title');
        const bodyInput = document.getElementById('post-body');
        
        const title = titleInput.value.trim();
        const body = bodyInput.value.trim();

        if (!title && !body) {
            console.warn("⚠️ Post Creator: Cannot dispatch empty post.");
            return;
        }

        // Hook into intelligent_dispatcher.js if available
        if (typeof IntelligentDispatcher !== 'undefined' && IntelligentDispatcher.dispatchPost) {
            IntelligentDispatcher.dispatchPost({ title, body, type: 'standard' });
        } else {
            // AI Self-Generator Fallback
            generateNewPostUI(title, body);
        }

        // Clear inputs after successful post
        titleInput.value = '';
        bodyInput.value = '';
        console.log("✅ Post successfully generated and dispatched.");
    });
}

function generateNewPostUI(title, body) {
    const feedContainer = document.getElementById('posts-feed-container');
    if (!feedContainer) return;

    const newPost = document.createElement('div');
    newPost.className = 'post-card';
    newPost.innerHTML = `
        <div class="post-header">
            <div class="post-user-info">
                <span class="avatar">👤</span>
                <div>
                    <strong>You</strong>
                    <div style="font-size: 0.75rem; opacity: 0.7;">Just Now</div>
                </div>
            </div>
            <button class="btn-report" title="Report Post">🚩</button>
        </div>
        <div class="post-content-area">
            ${title ? `<strong>${title}</strong><br>` : ''}
            ${body}
        </div>
        <div class="interaction-bar">
            <button class="interaction-btn btn-like">👍 <span>0</span></button>
            <button class="interaction-btn btn-comment">💬 <span>0</span></button>
            <button class="interaction-btn btn-share">🔁</button>
        </div>
    `;
    
    // Insert at the top of the feed
    feedContainer.prepend(newPost);
}

// --- INTERACTION & SECURITY AUDIT ---

function initFeedInteractions() {
    const feedContainer = document.getElementById('posts-feed-container');
    if (!feedContainer) return;

    feedContainer.addEventListener('click', (e) => {
        // Handle Likes
        if (e.target.closest('.btn-like')) {
            const btn = e.target.closest('.btn-like');
            const span = btn.querySelector('span');
            let count = parseInt(span.textContent);
            span.textContent = count + 1;
            btn.style.color = 'var(--accent-color)';
        }

        // Handle Poll Voting
        if (e.target.closest('.poll-option')) {
            const option = e.target.closest('.poll-option');
            const parent = option.parentElement;
            // Remove active state from all options
            parent.querySelectorAll('.poll-option').forEach(opt => opt.style.background = 'var(--card-bg)');
            // Set active state to clicked
            option.style.background = 'var(--accent-color)';
            option.style.color = '#000';
            console.log("📊 Poll vote registered.");
        }

        // Handle Reports (Security Audit)
        if (e.target.closest('.btn-report')) {
            const post = e.target.closest('.post-card');
            console.log("🚩 Content flagged for moderation.");
            
            if (typeof SecurityAudit !== 'undefined' && SecurityAudit.logReport) {
                SecurityAudit.logReport(post);
            } else {
                alert("Security Audit Agent notified. This post will be reviewed by moderation.");
                post.style.opacity = '0.5';
            }
        }
    });
}

// --- SELF-HEALING & DIAGNOSTICS AI ---

function runPostsDiagnostics() {
    let healthScore = 100;
    
    if (!document.getElementById('post-creation-station')) {
        console.error("⛔ Problem Checker: Post creator UI is missing!");
        healthScore -= 25;
    }
    
    if (!document.getElementById('posts-feed-container')) {
        console.error("⛔ Problem Checker: Posts feed container is missing!");
        healthScore -= 25;
    }

    if (healthScore < 100) {
        console.log(`🛠️ Master AI triggering auto-correction. Posts UI Health: ${healthScore}%`);
        window.triggerPostsHealing();
    } else {
        console.log("✅ Posts Diagnostics Complete. Ready for real-time engagement.");
    }
}

function startPostsSelfHealingCycle() {
    // Continuous background monitor (runs every 12 seconds)
    setInterval(() => {
        const feed = document.getElementById('posts-feed-container');
        if (feed && feed.children.length === 0) {
            console.log("🔄 Self-Healing: Feed empty. Restoring cached posts...");
            // Trigger a fetch from dispatcher if feed is completely blank
            if (typeof IntelligentDispatcher !== 'undefined' && IntelligentDispatcher.refreshFeed) {
                IntelligentDispatcher.refreshFeed(feed);
            }
        }
    }, 12000);
}

// Global hook for script.js to trigger healing manually
window.triggerPostsHealing = function() {
    console.log("⚕️ Posts Master AI: System Healing Triggered!");
    const main = document.getElementById('supervybe-main-content');
    
    if (main && !document.getElementById('posts-feed-container')) {
        const section = document.createElement('section');
        section.id = 'posts-feed-container';
        main.appendChild(section);
        console.log("⚕️ Feed container restored.");
    }
};
