export function isMobile() {
  if(typeof navigator === 'undefined') return false
  // const agentData = (navigator as any).userAgentData

  // if (agentData) {
  //   return agentData.mobile; // Returns true if on mobile
  // }
  
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}

export function isIOSMobile() {
  if(typeof navigator === 'undefined') return false
  
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function isSafari() {
  if(typeof navigator === 'undefined') return false
  
  const userAgent = navigator.userAgent;
  return userAgent.includes("Safari") && !userAgent.includes("Chrome");
}

export function isAppBrowser() {
  const userAgent = navigator.userAgent || navigator.vendor || (window as unknown as { opera: string }).opera;

  // Check for Facebook app
  const isFacebookApp = /FBAN|FBAV|FB_IAB/.test(userAgent);
  
  // Check for Messenger app
  const isMessengerApp = /FB_MESSENGER/.test(userAgent);

  // Check for LinkedIn in-app browser identifiers
  const isLinkedInApp = /LinkedIn|LiInternal/.test(userAgent);

  // Check for Instagram in-app browser identifier
  const isInstagramApp = /Instagram/.test(userAgent);

  if (isFacebookApp || isMessengerApp || isLinkedInApp || isInstagramApp) {
    return true;
  }
  
  return false
}