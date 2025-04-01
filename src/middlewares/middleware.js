const authorize = (roles) => (req, res, next) => {
    const { role } = req.user; // Extract role from decoded JWT
    if (!roles.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
  
  module.exports = authorize;