export const env = {
    centralBase: `${process.env.VUE_APP_CENTRAL_URL}`,
    authBase: `${process.env.VUE_APP_AUTH_URL}`,
    isProduction: process.env.VUE_APP_PRODUCTION_MODE,
    productionHost: process.env.VUE_APP_PRODUCTION_HOST
}

export const centralBase = env.isProduction == 'true' ? `/api` : `${env.centralBase}/api`
export const authBase = env.isProduction == 'true' ? `/api/auth` : `${env.authBase}/api/auth`