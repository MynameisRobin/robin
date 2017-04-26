var path = require('path');
var webpack = require('webpack');
var config = require('./config/index');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("../webpack.config");
var is_dev = config().env === 'development';


var args = process.argv;
var hot = args.indexOf('--hot') > -1;

var ip = config().runtime.ip;
var port = config().runtime.port;

// 开启React hot loader v3相关设置
if (hot === true) {
    // webpackConfig.entry.commons.unshift('react-hot-loader'); //加入了CommonsChunkPlugin,index.html先加载commons.js
    // webpackConfig.entry.app.unshift(
    //     "webpack-dev-server/client?http://localhost:" + port + "/",
    //     "webpack/hot/only-dev-server");
    // webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}
// 开启sourcemap
if (is_dev) {
    webpackConfig.devtool = 'source-map';
}
var serverConfig = {
    hot: true,
    inline: true,
    historyApiFallback: true,
    compress: true,
    staticOptions: {},
    stats: { colors: true },
    contentBase: '../build/',
    publicPath: webpackConfig.output.publicPath
}

//开发代理设置
var devConfig = {
        headers: {
            'X-Custom-Header': 'yes'
        },
        proxy: {
            "/api/*": {
                // target: 'http://192.168.0.55:8080/mockjs/1/',

                target: 'http://192.168.3.82:8090/',
                secure: false
            },
            '/**': {
                target: '/index.html',
                secure: false,
                bypass: function(req, res, proxyOptions) {
                    if (req.path == '/config') {
                        return res.json(config().runtime)
                    }
                    return '/'
                }
            }
        },
        publicPath: webpackConfig.output.publicPath
    }
    // Dashboard
    // if (is_dev) {
    //     var Dashboard = require('webpack-dashboard');
    //     var DashboardPlugin = require('webpack-dashboard/plugin');
    //     var dashboard = new Dashboard();
    //     webpackConfig.plugins.push(new DashboardPlugin(dashboard.setData));
    //     devConfig.quiet = true;
    // }

serverConfig = config().env === 'development' ? Object.assign({}, serverConfig, devConfig) : serverConfig;
var compiler = webpack(webpackConfig);


var server = new WebpackDevServer(compiler, serverConfig);

server.listen(port, ip, function() {
    console.log('listening on ' + ip + ' : ' + port);
});