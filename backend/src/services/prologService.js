const { spawn } = require("child_process");
const path = require("path");

const PROLOG_ENGINE_PATH = process.env.PROLOG_ENGINE_PATH;
const PROLOG_FILE = PROLOG_ENGINE_PATH 
  ? path.resolve(process.cwd(), PROLOG_ENGINE_PATH)
  : path.resolve(__dirname, "../../../expert-system/mental_health.pl");

/**
 * Analyzes symptoms using the Prolog expert system.
 * @param {string[]} symptoms - Array of symptom IDs.
 * @returns {Promise<Object>} - The analysis results.
 */
const analyzeSymptoms = (symptoms) => {
  return new Promise((resolve, reject) => {
    // Format symptoms for Prolog: [symptom1, symptom2, ...]
    const inputStr = `[${symptoms.join(",")}]`;
    
    // Spawn swipl with quiet mode and run our predicate
    const swipl = spawn("swipl", ["-q", "-s", PROLOG_FILE, "-g", "run"]);

    let output = "";
    let errorOutput = "";

    swipl.stdout.on("data", (data) => {
      output += data.toString();
    });

    swipl.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    swipl.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(`Prolog process exited with code ${code}: ${errorOutput}`));
      }
      try {
        const result = JSON.parse(output.trim());
        resolve(result);
      } catch (err) {
        reject(new Error(`Failed to parse Prolog output: ${output}. Error: ${err.message}`));
      }
    });

    // Write input to stdin and end it
    swipl.stdin.write(`${inputStr}.\n`);
    swipl.stdin.end();
  });
};

module.exports = {
  analyzeSymptoms
};
