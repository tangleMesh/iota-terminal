const LocalIpMiddleware = (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip !== "::1") {
        return res.status (403).send ();
    }
    return next ();
}

module.exports = LocalIpMiddleware;