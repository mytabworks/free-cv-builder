export function isMobile() {
  if(typeof navigator === 'undefined') return false
  // const agentData = (navigator as any).userAgentData

  // if (agentData) {
  //   return agentData.mobile; // Returns true if on mobile
  // }
  
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}