// =============================================
// VALENTINE PROPOSAL WEBSITE - JAVASCRIPT
// =============================================

// State Management
let currentStage = 1;
const NO_BUTTON_EVASION_DISTANCE = 150;

// =============================================
// DOM ELEMENTS
// =============================================

const stage1 = document.getElementById('stage-1');
const stage2 = document.getElementById('stage-2');
const stage3 = document.getElementById('stage-3');
const stage4 = document.getElementById('stage-4');

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainGif = document.getElementById('main-gif');
const celebrationGif = document.getElementById('celebration-gif');
const giftBox = document.getElementById('gift-box');
const diamondRing = document.getElementById('diamond-ring');

const celebratorySound = document.getElementById('celebratory-sound');
const romanticSound = document.getElementById('romantic-sound');

const confettiContainer = document.getElementById('confetti-container');
const rosePetalsContainer = document.getElementById('rose-petals');

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Transition between stages with fade effect
 */
function transitionToStage(fromStage, toStage, delay = 0) {
    setTimeout(() => {
        // Fade out current stage
        fromStage.classList.add('fade-out');
        
        setTimeout(() => {
            fromStage.classList.remove('active', 'fade-out');
            
            // Fade in new stage
            toStage.classList.add('active');
            currentStage++;
        }, 800);
    }, delay);
}

/**
 * Play audio with error handling
 */
function playSound(audioElement) {
    if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play().catch(err => console.log('Audio playback failed:', err));
    }
}

/**
 * Generate random confetti pieces
 */
function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffd700', '#00bfff', '#7fff00'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * 0.5;
        const randomDuration = 2.5 + Math.random() * 1;
        
        confetti.style.left = randomLeft + '%';
        confetti.style.backgroundColor = randomColor;
        confetti.style.animationDelay = randomDelay + 's';
        confetti.style.animationDuration = randomDuration + 's';
        
        confettiContainer.appendChild(confetti);
    }
    
    // Clean up after animation
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 3500);
}

/**
 * Generate falling rose petals
 */
function createRosePetals() {
    const petals = ['🌹', '🌺', '💕', '✨'];
    const petalCount = 30;
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        const randomPetal = petals[Math.floor(Math.random() * petals.length)];
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * 0.5;
        const randomDuration = 4 + Math.random() * 2;
        const randomSize = 1.5 + Math.random() * 1.5;
        
        petal.textContent = randomPetal;
        petal.style.left = randomLeft + '%';
        petal.style.fontSize = randomSize + 'rem';
        petal.style.animationDelay = randomDelay + 's';
        petal.style.animationDuration = randomDuration + 's';
        petal.style.top = '-50px';
        
        rosePetalsContainer.appendChild(petal);
    }
    
    // Clean up after animation
    setTimeout(() => {
        rosePetalsContainer.innerHTML = '';
    }, 5500);
}

/**
 * Decorate background with floating hearts
 */
function decorateBackground() {
    const heartsContainer = document.querySelector('.hearts');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝'];
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * 2;
        
        heart.style.left = randomLeft + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = randomDelay + 's';
        
        heartsContainer.appendChild(heart);
    }
}

// =============================================
// NO BUTTON EVASION
// =============================================

/**
 * Make the NO button evade when hovered
 */
function evadeNoButton() {
    const randomX = (Math.random() - 0.5) * 2 * NO_BUTTON_EVASION_DISTANCE;
    const randomY = (Math.random() - 0.5) * 2 * NO_BUTTON_EVASION_DISTANCE;
    
    // Get button dimensions and viewport
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - btnRect.width - 20;
    const maxY = window.innerHeight - btnRect.height - 20;
    
    // Calculate new position
    let newX = Math.max(20, Math.min(btnRect.left + randomX, maxX));
    let newY = Math.max(20, Math.min(btnRect.top + randomY, maxY));
    
    // Apply position
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    
    // Add animation class
    noBtn.style.transition = 'all 0.3s ease';
}

/**
 * Fade out NO button briefly
 */
function fadeOutNoButton() {
    noBtn.style.opacity = '0';
    noBtn.style.pointerEvents = 'none';
    
    setTimeout(() => {
        noBtn.style.opacity = '1';
        noBtn.style.pointerEvents = 'auto';
    }, 1000);
}

// Add event listeners for NO button
noBtn.addEventListener('mouseenter', () => {
    evadeNoButton();
});

noBtn.addEventListener('mouseover', () => {
    // Double evasion for extra effect
    if (Math.random() > 0.5) {
        evadeNoButton();
    }
});

// Prevent clicking NO button
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    evadeNoButton();
    fadeOutNoButton();
});

// =============================================
// YES BUTTON - STAGE 2 TRANSITION
// =============================================

yesBtn.addEventListener('click', () => {
    // Disable buttons
    yesBtn.disabled = true;
    noBtn.disabled = true;
    
    // Play celebratory sound
    playSound(celebratorySound);
    
    // Change GIF to celebratory
    mainGif.src = 'assets/puppy-happy.gif';
    
    // Create confetti
    createConfetti();
    
    // Transition to stage 2
    setTimeout(() => {
        transitionToStage(stage1, stage2, 500);
    }, 500);
    
    // Show gift box after stage 2 plays for a bit
    setTimeout(() => {
        transitionToStage(stage2, stage3, 2000);
    }, 3000);
});

// =============================================
// GIFT BOX - STAGE 4 TRANSITION
// =============================================

giftBox.addEventListener('click', () => {
    // Disable gift box
    giftBox.style.pointerEvents = 'none';
    
    // Play romantic sound
    playSound(romanticSound);
    
    // Transition to stage 4
    transitionToStage(stage3, stage4, 300);
    
    // Create rose petals after ring appears
    setTimeout(() => {
        createRosePetals();
    }, 1000);
});

// =============================================
// KEYBOARD ACCESSIBILITY
// =============================================

/**
 * Handle keyboard navigation
 */
document.addEventListener('keydown', (e) => {
    if (currentStage === 1) {
        if (e.key === 'Enter' || e.key === 'y' || e.key === 'Y') {
            yesBtn.click();
        }
    }
});

// =============================================
// INITIALIZATION
// =============================================

/**
 * Initialize website on load
 */
function initializeWebsite() {
    // Decorate background
    decorateBackground();
    
    // Ensure stage 1 is active
    stage1.classList.add('active');
    
    // Log for debugging
    console.log('✨ Valentine Website Initialized ✨');
}

// Start when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeWebsite);

// Alternative initialization
window.addEventListener('load', () => {
    // Re-check stage 1 is visible
    if (!stage1.classList.contains('active')) {
        stage1.classList.add('active');
    }
});

// =============================================
// MOBILE TOUCH SUPPORT
// =============================================

/**
 * Support touch events for mobile
 */
giftBox.addEventListener('touchend', (e) => {
    e.preventDefault();
    giftBox.click();
});

yesBtn.addEventListener('touchstart', () => {
    yesBtn.style.transform = 'scale(0.95)';
});

yesBtn.addEventListener('touchend', () => {
    yesBtn.style.transform = 'scale(1)';
    yesBtn.click();
});

// =============================================
// CONSOLE MESSAGE
// =============================================

console.log('%c💕 Welcome to the Valentine Proposal! 💕', 'color: #ff1493; font-size: 20px; font-weight: bold;');
console.log('%cMade with ❤️ for someone special', 'color: #d63384; font-size: 14px;');
