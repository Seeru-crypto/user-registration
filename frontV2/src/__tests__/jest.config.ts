import type {Config} from 'jest';
import '@testing-library/jest-dom';
import React from 'react';

const config: Config = {
    verbose: true,
    testEnvironment: "jsdom",
    moduleDirectories: ['./node_modules', 'src'],
    setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts']

};
global.React = React;
export default config;