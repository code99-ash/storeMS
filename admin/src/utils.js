const production = process.env.VUE_APP_PRODUCTION_MODE

export const apiBase = {
    central: production=='false'? `${process.env.VUE_APP_CENTRAL_URL}/api` : `${window.location.origin}/api`,
    auth: production=='false'? `${process.env.VUE_APP_AUTH_URL}/api/auth` : `${window.location.origin}/api/auth`,
}