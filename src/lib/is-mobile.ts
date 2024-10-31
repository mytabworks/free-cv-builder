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