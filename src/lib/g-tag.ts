
export const gtag = typeof window !== 'undefined' ? (window as unknown as { gtag?: (type: string, name: string, params: Record<string, string>) => void; }).gtag : undefined