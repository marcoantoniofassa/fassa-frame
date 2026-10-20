"use strict";

const DEFAULT_MAX_LINES = 350;

// A file whose basename says it is not production source. Config and story
// files are here for the same reason as tests: their length says nothing
// about how well the code behind them is factored.
const NON_SOURCE_BASENAME = /[.-](stories|config|conf)\.[^.]+$/;

// Directories whose contents are either not authored by hand or not part of
// the application being linted.
const IGNORED_PATH_SEGMENTS = new Set([
  "node_modules",
  "dist",
  "build",
  ".next",
  "generated",
  "__generated__",
  "migrations",
  "migration",
  "locales",
  "__tests__",
  "__mocks__",
  "fixtures",
  "mocks",
]);

function normalizeFilePath(filename) {
  return filename.replace(/\\/g, "/");
}

// ESLint 10 exposes filename directly.
function fileName(context) {
  return normalizeFilePath(context.filename);
}

function isTestFile(filename) {
  return /(^|\/)(__tests__|__mocks__|fixtures|mocks)(\/|$)|[.-](test|spec)\.[cm]?[jt]sx?$/.test(
    filename
  );
}

function isCheckableSourceFile(filename) {
  if (filename.endsWith(".d.ts")) return false;
  const segments = filename.split("/");
  for (const segment of segments.slice(0, -1)) {
    if (IGNORED_PATH_SEGMENTS.has(segment)) return false;
  }
  const base = segments[segments.length - 1];
  return !isTestFile(filename) && !NON_SOURCE_BASENAME.test(base);
}

// Baseline entries are matched as a whole path or as a path suffix, so an
// entry written the way a lint report prints it ("src/legacy.ts") matches
// regardless of whether ESLint hands the rule an absolute path.
function isBaselineIgnored(filename, ignore) {
  return ignore.some(
    (entry) => filename === entry || filename.endsWith(`/${entry}`)
  );
}

module.exports = {
  DEFAULT_MAX_LINES,
  fileName,
  isBaselineIgnored,
  isCheckableSourceFile,
  isTestFile,
};
