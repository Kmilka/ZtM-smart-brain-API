const requireAuth = (redisClient) =>  (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json('unauthorized')
    }
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(401).json('unathorized')
        }
        return next()
    })
}

module.exports = {
    requireAuth: requireAuth
}