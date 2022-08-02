module.exports = {
    plugins: [
        require("autoprefixer"),
        require("postcss-import")({}),
        require("postcss-preset-env")({
            stage: 3,
            features: {
                "nesting-rules": true,
                "custom-properties": false,
            },
        }),
    ],
};
