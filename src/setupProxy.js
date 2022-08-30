const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/web/search/topsearch/',
        createProxyMiddleware({
            target: 'https://www.instagram.com',
            changeOrigin: true,
        }),
    ),
        app.use(
            '/v/t51.2885-19/',
            createProxyMiddleware({
                target: 'https://instagram.fhan2-1.fna.fbcdn.net',
                changeOrigin: true,
            }),
        ),
        app.use(
            '/accounts/login/?next=/',
            createProxyMiddleware({
                target: 'https://www.instagram.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/accounts/login/?next=/': '/',
                },
            }),
        );
};
