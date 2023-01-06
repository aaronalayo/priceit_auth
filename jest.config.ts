/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type { Config } from 'jest';

const config: Config = {
    
    transform: {
        '\\.[jt]sx?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },

    moduleNameMapper: {
        "/^components\/(.*)$/": "<rootDir>/src/components/$1" 
    },
    extensionsToTreatAsEsm: ['.ts']
};
// import type {Config} from '@jest/types';
// // Sync object
// const config: Config.InitialOptions = {
//   verbose: true,
//   transform: {
//   '^.+\\.tsx?$': 'ts-jest',
//   "^.+\\.(js|jsx)$": "babel-jest",
//   },
// };
export default config;
// /** @type {import('ts-jest').JestConfigWithTsJest} */
// export default {
//   preset : 'ts-jest',
//  testEnvironment : 'node',
//  transform: {
//   '^.+\\.(ts|tsx)?$': 'ts-jest',
//   "^.+\\.(js|jsx)$": "babel-jest",
// }
// }
// export default {
//   "roots": ["<rootDir>/src"],
//   "extensionsToTreatAsEsm": [".ts"],
//   "testEnvironment": "node",
//   "moduleNameMapper": {
//     "^(\\.{1,2}/.*)\\.js$": "$1"
//   },
//   "transform": {
//     "\\.[jt]sx?$": [
//       "babel-jest",
//       {
//         "babelrc": false,
//         "presets": ["@babel/preset-typescript"],
//         "plugins": ["@babel/plugin-proposal-optional-chaining"]
//       }
//     ]
//   }
// }