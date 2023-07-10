const loadClient = require('../config/redis')

const verifyAdminAccess = async(req, res, next) => {
    const authorization = req.header("Authorization");
    const token = authorization?.split(' ')[1];
    // console.log(token)

    if(!token) return res.status(403).send('Access Denied !!');

    try {
        // Connect to Redis
        const client = await loadClient()
        let user = await client.get(token);
        user = JSON.parse(user)
        // console.log(user)
        if(!user._id || user.role !== 'admin')  return res.status(403).send('Access Denied. Admin authorization required !!');

        next()
    }catch(err) {
        res.status(500).send('Access Denied, an error occured !!');
    }
}

const verifyUserAccess = async (req, res, next) => {
    const authorization = req.header("Authorization");
    const token = authorization?.split(' ')[1];

    // console.log(token)
    if(!token) return res.status(403).send('Access Denied, please login !!');

    try {
        // Connect to Redis
        const client = await loadClient()
        let user = await client.get(token);
        user = JSON.parse(user)
        // console.log(user)
        if(!user)  return res.status(403).send('Access Denied, please login !!');

        next()
    }catch(err) {
        // console.log(err)
        res.status(500).send('Access Denied, an error occured !!');
    }
}

module.exports = { verifyAdminAccess, verifyUserAccess }