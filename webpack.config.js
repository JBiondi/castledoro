module.exports = {
    watch: true,
    module: {
        rules: [
            {
                // for any javascript file
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}