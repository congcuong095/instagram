import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
    app.use(
        '/api/v1/web/search/topsearch/',
        createProxyMiddleware({
            target: 'https://i.instagram.com',
            changeOrigin: true,
        }),
    );
    app.use(
        '/v/t51.2885-19/',
        createProxyMiddleware({
            target: 'https://instagram.fhan2-4.fna.fbcdn.net',
            changeOrigin: true,
        }),
    );
}
