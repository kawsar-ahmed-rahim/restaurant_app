import jwt from "jsonwebtoken";


export const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not Authorized", success: false });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        message: "Admin access required",
        success: false
      });
    }

    req.admin = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not Authorized", success: false });
  }else {
      return res.status(403).json({ message: "Admin access required" });
    }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    if (req.admin.email === process.env.ADMIN_EMAIL) {
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
