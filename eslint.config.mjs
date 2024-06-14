import globals from "globals";
import eslintConfigMgol from "eslint-config-mgol";

export default [
    ...eslintConfigMgol,
    {
        ignores: [
            "node_modules/**",
            "dist/**",
        ],
    },
    {
        files: [ "*.js" ],
        languageOptions: {
            sourceType: "script",
            globals: {
                ...globals.node,
            },
        },
        rules: {
            // Strict mode
            "strict": ["error", "global"], // "global" in Node, "function" in a browser
        },
    },
    {
        files: [ "*.mjs" ],
        languageOptions: {
            sourceType: "module",
            globals: {
                ...globals.node,
            },
        },
    },
    {
        files: [ "src/**/*.js" ],
        languageOptions: {
            ecmaVersion: 5,
            sourceType: "script",
            globals: {
                ...globals.browser,
                jQuery: false,
            },
        },
        rules: {
            // Strict mode
            "strict": ["error", "function"], // "global" in Node, "function" in a browser

            // Stylistic issues
            "comma-dangle": ["error", {
                "arrays": "always-multiline",
                "objects": "always-multiline",
                "imports": "always-multiline",
                "exports": "always-multiline"
            }],
            "id-blacklist": ["error", "event"],

            // ECMAScript 6
            "no-var": "off",
            "object-shorthand": "off",
            "prefer-arrow-callback": "off",
            "prefer-const": "off",
            "prefer-rest-params": "off",
            "prefer-spread": "off",
            "prefer-template": "off",
            'id-denylist': ['error', 'event'],
        },
    },
];
