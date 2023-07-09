export const production = process.env.VUE_APP_PRODUCTION_MODE
export const productionHost = process.env.VUE_APP_PRODUCTION_HOST

// console.log(process.env)

export const apiBase = {
    central: production=='false'? `${process.env.VUE_APP_CENTRAL_URL}/api` : `${productionHost}/api`,
    auth: production=='false'? `${process.env.VUE_APP_AUTH_URL}/api/auth` : `${productionHost}/api/auth`,
}