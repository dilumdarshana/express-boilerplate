module.exports = {
    "extends": ["airbnb"],
    "parser": "babel-eslint",
    "rules": {
        "indent": ["error", 4],
        "indent": [2, 4, {"SwitchCase": 1}],
        "react/jsx-indent": ["error", 4],
        "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "operator-linebreak": ["error", "after", {"overrides": {":": "before"}}],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-unused-vars": ["error", {"args": "none"}],
        "max-len": ["error", 150],
        "no-console": 0,
        "prefer-promise-reject-errors": ["error", {"allowEmptyReject": true}],
    },
    "env": {
        "node": true,
        "mocha": true
    }
};