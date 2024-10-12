# Authify Tokenize

**authify-tokenize** is a lightweight library designed for managing authentication in MERN stack applications using JWT tokens. With this library, you can easily implement user registration, login, sign-out, and profile data retrieval in just a few lines of code. It streamlines the authentication process, saving you hours of development work.

## Key Features

- **Lightweight Library**: Minimalistic design ensures fast performance.
- **JWT Token Verification**: Securely verifies tokens for protected routes.
- **Easy Authentication Flow**: Built-in functions for login, registration, sign-out, and fetching user profiles.
- **Middleware Support**: Attach authentication middleware to any of your routes with ease.
- **Configuration**: Simple setup with MongoDB URI and JWT secret key.

## Installation

You can install the library via npm:

```bash
npm install authify-tokenize
```
## Example
```bash
const express = require('express');
const { initAuthLibrary, authMiddleware } = require('authify-tokenize');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize your auth library
const authApp = initAuthLibrary({
    mongoURI: 'your_mongodb_uri_here',
    jwtSecret: 'your_jwt_secret_here',
});

// Use the auth routes
app.use(authApp);

// Example protected route
app.get('/protected', authMiddleware, (req, res) => {
    res.send(`Hello ${req.user.username}, this is a protected route!`);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

## Middleware Function

```bash
app.get('/profile', authMiddleware, (req, res) => {
    // Access user data from the request
    res.json({
        username: req.user.username,
        email: req.user.email,
    });
});
```

## Conclusion

With authify-tokenize, implementing authentication in your MERN application becomes a breeze. Its lightweight design, combined with powerful features, allows you to focus on building your application rather than worrying about authentication complexities.

