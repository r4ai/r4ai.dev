export const isServer = () => typeof window === "undefined"
export const isProduction = import.meta.env.PROD
