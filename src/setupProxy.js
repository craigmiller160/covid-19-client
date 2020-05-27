const { createProxyMiddleware } = require('http-proxy-middleware');

const createProxy = (app) => {
    app.use(createProxyMiddleware('/api', {
        target: 'http://localhost:7005',
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    }));
};

module.exports = createProxy;