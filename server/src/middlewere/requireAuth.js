import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = async (req, res, next) => {
    let token;
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            console.log("Token was not provided");
            res.status(401).json({ success: false, message: "Not authorized" });
        }
        const secret = process.env.SECRET_TOKEN;
        const user = jwt.verify(token, secret);
        if (!user) {
            console.log("Token verification failed or missing id");
            return res.status(401).json({ success: false, message: "Not authorized" });
        }
        req.user = user;
        //agentCode,id,role

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ success: false, message: "Not authorized" });
    }
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);

        if (req.user.role === 'admin') {
            return next();
        }

        res.status(403).json({ message: "You are not authorized as admin" })
    });
};