// ============================================
// GOTCHA - Networking Speed-Dating App
// Data & Logic Layer
// ============================================

// ============================================
// USER DATA (Hardcoded)
// ============================================

const users = [
  {
    id: 1,
    name: "Ana García",
    occupation: "Full-stack Developer",
    age: 28,
    interests: ["Conocer talento", "Colaboración"],
    capabilities: ["Full-stack", "Frontend"],
    hobbies: ["Gaming", "Tecnología"],
    xp: 1500,
    level: 3,
    photo: "👩‍💻"
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    occupation: "UX Designer",
    age: 32,
    interests: ["Buscar trabajo", "Amistades"],
    capabilities: ["Diseño", "Frontend"],
    hobbies: ["Arte", "Gaming"],
    xp: 800,
    level: 2,
    photo: "👨‍🎨"
  },
  {
    id: 3,
    name: "María López",
    occupation: "Data Scientist",
    age: 26,
    interests: ["Colaboración", "Conocer talento"],
    capabilities: ["Data", "Backend"],
    hobbies: ["Tecnología", "Deportes"],
    xp: 2100,
    level: 4,
    photo: "👩‍🔬"
  },
  {
    id: 4,
    name: "Diego Ramírez",
    occupation: "Inversionista",
    age: 35,
    interests: ["Conocer talento", "Colaboración"],
    capabilities: ["Finanzas", "Inversionista"],
    hobbies: ["Tecnología", "Deportes"],
    xp: 500,
    level: 1,
    photo: "👨‍💼"
  },
  {
    id: 5,
    name: "Laura Torres",
    occupation: "Backend Developer",
    age: 29,
    interests: ["Amistades", "Colaboración"],
    capabilities: ["Backend", "Full-stack"],
    hobbies: ["Gaming", "Tecnología"],
    xp: 1200,
    level: 2,
    photo: "👩‍💻"
  }
];

// ============================================
// GROUP COLORS
// ============================================

const groupColors = [
  { bg: '#FF6B6B', name: 'Coral', textColor: '#FFFFFF' },
  { bg: '#F39C12', name: 'Naranja', textColor: '#212529' },
  { bg: '#F4D03F', name: 'Amarillo', textColor: '#212529' },
  { bg: '#48C774', name: 'Verde', textColor: '#FFFFFF' },
  { bg: '#A8CDCD', name: 'Sage', textColor: '#212529' },
  { bg: '#4FC3F7', name: 'Cielo', textColor: '#212529' }
];

// ============================================
// MATCHING ALGORITHM
// ============================================

/**
 * Calculate affinity score between two users
 * @param {Object} user1 - First user
 * @param {Object} user2 - Second user
 * @returns {number} Affinity score (0-100)
 */
function calculateAffinity(user1, user2) {
  let score = 0;
  
  // Intereses (50%)
  const interestMatches = user1.interests.filter(i => 
    user2.interests.includes(i)
  ).length;
  score += (interestMatches / user1.interests.length) * 50;
  
  // Capacidades (30%)
  const capabilityMatches = user1.capabilities.filter(c => 
    user2.capabilities.includes(c)
  ).length;
  score += (capabilityMatches / user1.capabilities.length) * 30;
  
  // Gustos (20%)
  const hobbyMatches = user1.hobbies.filter(h => 
    user2.hobbies.includes(h)
  ).length;
  score += (hobbyMatches / user1.hobbies.length) * 20;
  
  return Math.round(score);
}

/**
 * Create a group for the current user based on affinity
 * @param {Object} currentUser - The user to create group for
 * @param {Array} allUsers - All available users
 * @returns {Array} Group members including current user
 */
function createGroup(currentUser, allUsers) {
  const others = allUsers.filter(u => u.id !== currentUser.id);
  
  // Calcular afinidad con todos
  const affinities = others.map(user => ({
    user,
    score: calculateAffinity(currentUser, user)
  }));
  
  // Ordenar por mayor afinidad
  affinities.sort((a, b) => b.score - a.score);
  
  // Log para debugging (visible en consola durante demo)
  console.log(`🎯 Matching for ${currentUser.name}:`);
  affinities.forEach(a => {
    console.log(`  - ${a.user.name}: ${a.score}% affinity`);
  });
  
  // Tomar top 3 para grupo de 4 personas
  return [currentUser, ...affinities.slice(0, 3).map(a => a.user)];
}

/**
 * Get group color based on group members
 * @param {Array} groupMembers - Members of the group
 * @returns {Object} Color configuration
 */
function getGroupColor(groupMembers) {
  const index = groupMembers[0].id % groupColors.length;
  return groupColors[index];
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

/**
 * Save current user to localStorage
 * @param {Object} user - User to save
 */
function saveCurrentUser(user) {
  localStorage.setItem('gotcha_currentUser', JSON.stringify(user));
}

/**
 * Get current user from localStorage
 * @returns {Object|null} Current user or null
 */
function getCurrentUser() {
  const data = localStorage.getItem('gotcha_currentUser');
  return data ? JSON.parse(data) : null;
}

/**
 * Update user XP and level
 * @param {number} xpGain - Amount of XP to add
 */
function addXP(xpGain) {
  const user = getCurrentUser();
  if (!user) {
    console.error('❌ addXP: No user found in localStorage');
    return null;
  }
  
  const oldLevel = user.level;
  user.xp += xpGain;
  
  // Level up logic (simple: 1000 XP per level)
  const newLevel = Math.floor(user.xp / 1000) + 1;
  user.level = newLevel;
  
  saveCurrentUser(user);
  
  return {
    leveledUp: newLevel > oldLevel,
    oldLevel,
    newLevel,
    xp: user.xp
  };
}

/**
 * Get user by ID
 * @param {number} id - User ID
 * @returns {Object|null} User object or null
 */
function getUserById(id) {
  return users.find(u => u.id === parseInt(id));
}

/**
 * Calculate XP progress to next level
 * @param {number} xp - Current XP
 * @returns {Object} Progress information
 */
function getXPProgress(xp) {
  const currentLevel = Math.floor(xp / 1000) + 1;
  const xpInCurrentLevel = xp % 1000;
  const xpNeeded = 1000;
  const percentage = (xpInCurrentLevel / xpNeeded) * 100;
  
  return {
    currentLevel,
    xpInCurrentLevel,
    xpNeeded,
    percentage,
    totalXP: xp
  };
}

/**
 * Reset demo state
 */
function resetDemo() {
  localStorage.removeItem('gotcha_currentUser');
  window.location.href = 'index.html';
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get user ID from URL hash
 * @returns {number|null} User ID or null
 */
function getUserIdFromHash() {
  const hash = window.location.hash;
  const match = hash.match(/#user-(\d+)/);
  return match ? parseInt(match[1]) : null;
}

/**
 * Navigate to page with user context
 * @param {string} page - Page name (without .html)
 * @param {number} userId - User ID
 */
function navigateTo(page, userId) {
  window.location.href = `${page}.html#user-${userId}`;
}

/**
 * Format number with comma separator
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Export for use in HTML files
if (typeof window !== 'undefined') {
  window.GotchaApp = {
    users,
    groupColors,
    calculateAffinity,
    createGroup,
    getGroupColor,
    saveCurrentUser,
    getCurrentUser,
    addXP,
    getUserById,
    getXPProgress,
    resetDemo,
    getUserIdFromHash,
    navigateTo,
    formatNumber
  };
}

