import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
    // Configuración de Airbnb convertida a flat config
    ...compat.config({
        extends: ["airbnb-base"]
    }),

    // Configuración para TypeScript
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module"
            }
        },
        plugins: {
            "@typescript-eslint": tsPlugin
        },
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "caughtErrorsIgnorePattern": "^_",
                }
            ],
            'no-underscore-dangle': [
                'error',
                {
                    'allowAfterThis': true,
                    'allowAfterSuper': true,
                    'enforceInMethodNames': false
                }
            ],
            "brace-style": ["error", "allman", { allowSingleLine: false }],
            "import/extensions": ["error", "ignorePackages", {
                "ts": "never"
            }],
            'import/no-unresolved': 'off',
            "@typescript-eslint/no-useless-constructor": "error",
            "no-empty-function": ["error", { "allow": ["constructors"] }],
            "no-useless-constructor": "off",
            "no-unused-vars": "off",
            "no-console": "off",
            'max-classes-per-file': 'off',
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.ts'],
                    moduleDirectory: ['node_modules', 'src/']
                }
            }
        },
    },

    {
        ignores: [
            "**/node_modules",
            "dist/**",
            "coverage/**",
            "**/*.config.js",
            ".env*"
        ]
    }
];