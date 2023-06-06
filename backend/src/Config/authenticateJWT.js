const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    // const token = req.headers.authorization;

    // if (!token) {
    //     return res.status(401).json({ message: 'Authorization token not found' });
    // }
    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = decoded.user;
    //     next();
    // } catch (error) {
    //     console.error(error);
    //     return res.status(401).json({ message: 'Invalid token' });
    // }
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
};

module.exports = authenticateJWT;