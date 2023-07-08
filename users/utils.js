export const env = {
    centralBase: `${process.env.VUE_APP_CENTRAL_URL}`,
    authBase: `${process.env.VUE_APP_AUTH_URL}`,
    isProduction: process.env.VUE_APP_PRODUCTION_MODE
}

export const centralBase = env.isProduction == 'true' ? `${window.location.origin}/api` : `${env.centralBase}/api`
export const authBase = env.isProduction == 'true' ? `${window.location.origin}/api/auth` : `${env.authBase}/api/auth`