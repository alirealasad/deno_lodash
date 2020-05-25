import { createRequire } from "https://deno.land/std/node/module.ts";
const require = createRequire(import.meta.url);
// Loads native module polyfill.
const path = require("path");

const _ = require('./index.js');

export default _;
