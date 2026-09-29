module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.js"],
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
