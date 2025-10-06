const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No hay token de autenticación' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {});
    
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de administrador.' });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Autenticación fallida' });
  }
};

module.exports = { auth, adminAuth };
