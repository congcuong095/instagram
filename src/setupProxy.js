const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/web/search/topsearch/',
        createProxyMiddleware({
            target: 'https://www.instagram.com',
            changeOrigin: true,
        }),
    );
};
