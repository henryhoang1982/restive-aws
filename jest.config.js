module.exports = {
    roots: ['<rootDir>/test', '<rootDir>/src'],
    testMatch: ['**/*.test.ts'],
    preset: "ts-jest",
    collectCoverageFrom: ['<rootDir>/src/**/*.ts']
}