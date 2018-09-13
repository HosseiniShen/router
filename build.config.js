const path = require('path')

module.exports = {
    mode: 'production',

    entry: {
        'easy-router': './dev/index.js'
    },

    output: {
        path: path.resolve(__dirname, './issue'),
        filename: '[name].js',
        library: 'easyRouter',
        libraryTarget: 'umd'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: '/node_modules/'
            }
        ]
    }

}