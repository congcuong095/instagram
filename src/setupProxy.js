const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function () {
    app.use(
        '/web/search/topsearch/',
        createProxyMiddleware({
            target: 'https://www.instagram.com',
            secure: false,
            changeOrigin: true,
        }),
    );
    app.use(
        '/v/t51.2885-19/',
        createProxyMiddleware({
            target: 'https://instagram.fhan2-1.fna.fbcdn.net',
            secure: false,
            changeOrigin: true,
        }),
    );
    app.listen(3000);
};
