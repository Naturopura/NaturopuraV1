"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleOAuthCallback = void 0;
const passport_1 = require("../config/passport");
const googleOAuthCallback = (req, res) => {
    // @ts-ignore
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = (0, passport_1.generateJwtToken)(user);
    // Construct redirect URL to client OAuth callback page with token and user info as query params
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const redirectUrl = ;
    `\${clientUrl}/oauth-callback?token=\${encodeURIComponent(token)}&user=\${encodeURIComponent(JSON.stringify({ _id: user._id, name: user.name, email: user.email, role: user.role }))}\`;

  res.redirect(redirectUrl);
};
    ;
};
exports.googleOAuthCallback = googleOAuthCallback;
