// IgnorBob - Content Script for DuckDice Chat Filter
// Filters messages from user "bobstone"

(function() {
  'use strict';

  const BLOCKED_USERNAME = 'bobstone';
  
  // Function to check if an element contains bobstone's message
  function isMessageFromBobstone(element) {
    const blocked = BLOCKED_USERNAME.toLowerCase();
    const matchesBlocked = (value) => {
      if (!value) return false;
      const normalized = value.toLowerCase();
      if (normalized === blocked) return true;
      const boundaryPattern = new RegExp(`\\b${blocked}\\b`, 'i');
      return boundaryPattern.test(value);
    };

    // Check for username in the message element
    const usernameElements = element.querySelectorAll('.username, [class*="username"], [class*="user"], [class*="name"]');
    
    for (let usernameEl of usernameElements) {
      if (matchesBlocked(usernameEl.textContent.trim())) {
        return true;
      }
    }
    
    // Alternative: Check text content directly for username patterns
    const textContent = element.textContent || '';
    if (matchesBlocked(textContent)) {
      return true;
    }
    
    // Check if the element has attributes that might contain username
    const dataUsername = element.getAttribute('data-username') || 
                        element.getAttribute('data-user') || 
                        element.getAttribute('data-name');
    
    if (matchesBlocked(dataUsername)) {
      return true;
    }

    // Check descendant elements for data attributes or profile links
    const attributeElements = element.querySelectorAll('[data-username], [data-user], [data-name], [data-nickname]');
    for (let attrEl of attributeElements) {
      const candidate = attrEl.getAttribute('data-username') ||
                        attrEl.getAttribute('data-user') ||
                        attrEl.getAttribute('data-name') ||
                        attrEl.getAttribute('data-nickname');
      if (matchesBlocked(candidate)) {
        return true;
      }
    }

    const linkElements = element.querySelectorAll('a[href*="/@"], a[href*="/user/"], a[href*="user="]');
    const hrefPatterns = [
      /@([^/?#]+)/,
      /user\/([^/?#]+)/,
      /user=([^&#]+)/
    ];
    for (let linkEl of linkElements) {
      const href = linkEl.getAttribute('href') || '';
      const hrefMatch = hrefPatterns.map((pattern) => href.match(pattern)).find(Boolean);
      if (hrefMatch && matchesBlocked(hrefMatch[1])) return true;
      if (matchesBlocked(linkEl.textContent.trim())) return true;
    }
    
    return false;
  }
  
  // Function to remove bobstone's messages
  function removeBobstoneMessages() {
    // Common chat message selectors
    const messageSelectors = [
      '.message',
      '.chat-message',
      '[class*="message"]',
      '[class*="chat"]',
      'li',
      'div[class*="Message"]',
      '[class*="profile-block"]'
    ];
    
    messageSelectors.forEach(selector => {
      try {
        const messages = document.querySelectorAll(selector);
        messages.forEach(message => {
          if (isMessageFromBobstone(message)) {
            console.log('[IgnorBob] Removing message from bobstone:', message);
            message.style.display = 'none';
            message.setAttribute('data-ignorbob-hidden', 'true');
          }
        });
      } catch (e) {
        // Silently handle selector errors
      }
    });
  }
  
  // Initial cleanup
  console.log('[IgnorBob] Extension loaded');
  
  // Run after page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeBobstoneMessages);
  } else {
    removeBobstoneMessages();
  }
  
  // Watch for new messages being added to the DOM
  const observer = new MutationObserver((mutations) => {
    let shouldCheck = false;
    
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        shouldCheck = true;
      }
    });
    
    if (shouldCheck) {
      removeBobstoneMessages();
    }
  });
  
  // Start observing the document for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Also run periodically as a fallback
  setInterval(removeBobstoneMessages, 2000);
  
  console.log('[IgnorBob] Monitoring for bobstone messages...');
})();
