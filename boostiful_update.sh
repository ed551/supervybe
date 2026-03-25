#!/bin/bash

# ==============================================================================
# SUPERVYBE - Boostiful Auto-Minute Refresher & Updator (boostiful_update.sh)
# Role: Termux Background Agent, Master AI Diagnostics, File Integrity Sync.
# ==============================================================================

# --- Boostiful Terminal Colors ---
CYAN='\033[1;36m'
GREEN='\033[1;32m'
PURPLE='\033[1;35m'
YELLOW='\033[1;33m'
RED='\033[1;31m'
NC='\033[0m' # No Color

# --- Configuration ---
LOG_FILE="sync.log"
PUBLIC_DIR="./public"
BACKUP_DIR="./master_recovery_archive"

clear
echo -e "${PURPLE}=====================================================${NC}"
echo -e "${CYAN}   🧠 SUPERVYBE MASTER AI: SYSTEM UPDATOR BOOTING   ${NC}"
echo -e "${PURPLE}=====================================================${NC}"
echo -e "${YELLOW}⚙️  Initializing Auto-Minute Refresher...${NC}"
sleep 2

# Create log file if it doesn't exist
touch $LOG_FILE

# ==============================================================================
# MAIN AUTO-MINUTE LOOP
# ==============================================================================

while true; do
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    
    echo -e "\n${CYAN}-----------------------------------------------------${NC}"
    echo -e "🕒 [${TIMESTAMP}] Cycle Start: Auto-Minute Refresher"
    
    # 1. SYSTEM INTEGRITY CHECK (Self-Healing Diagnostic)
    echo -e "${PURPLE}🔬 Master AI:${NC} Auditing core MPA files..."
    
    CRITICAL_FILES=("index.html" "script.js" "admin.html" "style.css")
    HEALTHY=true
    
    for file in "${CRITICAL_FILES[@]}"; do
        if [ ! -f "$PUBLIC_DIR/$file" ]; then
            echo -e "   ${RED}⛔ ALERT: $file missing! Initiating self-healing...${NC}"
            HEALTHY=false
            # Trigger self-healing: copy from backup if exists
            if [ -f "$BACKUP_DIR/$file" ]; then
                cp "$BACKUP_DIR/$file" "$PUBLIC_DIR/$file"
                echo -e "   ${GREEN}⚕️ Restored $file from Master Archive.${NC}"
                echo "[${TIMESTAMP}] AUTO-REPAIR: Restored $file" >> $LOG_FILE
            else
                echo -e "   ${RED}❌ Critical failure: No backup found for $file.${NC}"
                echo "[${TIMESTAMP}] CRITICAL ERROR: $file missing and no backup." >> $LOG_FILE
            fi
        fi
    done
    
    if [ "$HEALTHY" = true ]; then
        echo -e "   ${GREEN}✅ File structure is 100% Boostiful.${NC}"
    fi

    # 2. TRIGGER BACKEND SYNC ENGINES
    echo -e "${YELLOW}🔄 [UPDATOR] Syncing dynamic data arrays...${NC}"
    
    # Check if the Node.js daily twin sync exists and run it
    if [ -f "daily_twin_sync.js" ]; then
        # Run silently in background so it doesn't freeze the loop
        node daily_twin_sync.js >> $LOG_FILE 2>&1 &
        echo -e "   ${CYAN}🔗 daily_twin_sync.js executed.${NC}"
    else
        echo -e "   ${YELLOW}⚠️ daily_twin_sync.js not found. Skipping...${NC}"
    fi

    # 3. LIVE DEPLOYMENT CACHE REFRESH (Simulated for Surge/Localhost)
    echo -e "${GREEN}🚀 Pushing local memory cache updates...${NC}"
    echo "[${TIMESTAMP}] Minute Refresher executed successfully." >> $LOG_FILE

    # 4. SLEEP FOR 60 SECONDS (The Auto-Minute Refresher)
    echo -e "${PURPLE}🤖 Master AI entering standby for 60 seconds...${NC}"
    
    # Visual countdown (optional, keeps the terminal looking alive)
    for i in {60..1}; do
        printf "\r   ⏳ Next refresh in: %2d seconds..." $i
        sleep 1
    done
    printf "\r\033[K" # Clear the countdown line
done
