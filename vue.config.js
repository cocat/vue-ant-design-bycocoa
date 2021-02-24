module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            },
        }
    },
    devServer: {
        proxy: {
            '/api ': {
                target: 'http://localhost:3000',
                bypass: function (req, res) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    } else {
                        //req.path 就是 analysis里 axios.get（"api/dashboard/chart"）
                        const name = req.path.split('/api/')[1].split('/').join('_');

                        const mock = require(`./mock/${name}`);
                        const result = mock(req.method);
                        //清理缓存
                        delete require.cache[require.resolve(`./mock/${name}`)];
                        return res.send(result);
                    }
                }
            }
        }
    },
    runtimeCompiler: true,
}