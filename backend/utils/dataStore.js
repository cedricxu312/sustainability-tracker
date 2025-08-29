import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to JSON data file
const DATA_FILE_PATH = path.join(__dirname, "../data/data.json");

/**
 * Read sustainability actions from the JSON data file
 * @returns {Array} Array of sustainability action objects
 * @throws {Error} If file read fails or JSON parsing fails
 */
export const readData = () => {
  try {
    // Check if file exists, create empty array if it doesn't
    if (!fs.existsSync(DATA_FILE_PATH)) {
      console.log("Data file not found, creating new file with empty array");
      writeData([]);
      return [];
    }

    const jsonData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    const parsedData = JSON.parse(jsonData);
    
    // Validate that parsed data is an array
    if (!Array.isArray(parsedData)) {
      console.warn("Data file contains invalid format, resetting to empty array");
      writeData([]);
      return [];
    }
    
    return parsedData;
  } catch (error) {
    console.error("Error reading data file:", error.message);
    
    // If file is corrupted, backup and create new one
    if (fs.existsSync(DATA_FILE_PATH)) {
      const backupPath = `${DATA_FILE_PATH}.backup.${Date.now()}`;
      fs.renameSync(DATA_FILE_PATH, backupPath);
      console.log(`Corrupted data file backed up to: ${backupPath}`);
    }
    
    // Create new empty data file
    writeData([]);
    return [];
  }
};

/**
 * Write sustainability actions to the JSON data file
 * @param {Array} data - Array of sustainability action objects to write
 * @throws {Error} If data is not an array or write operation fails
 */
export const writeData = (data) => {
  try {
    // Validate input data
    if (!Array.isArray(data)) {
      throw new Error("Data must be an array");
    }
    
    // Ensure data directory exists
    const dataDir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
      console.log("Created data directory:", dataDir);
    }
    
    // Write data with proper formatting
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(DATA_FILE_PATH, jsonString, "utf-8");
    
    console.log(`Successfully wrote ${data.length} sustainability actions to data file`);
  } catch (error) {
    console.error("Error writing data file:", error.message);
    throw new Error(`Failed to write data: ${error.message}`);
  }
};

/**
 * Get the path to the data file (useful for debugging)
 * @returns {string} Absolute path to the data file
 */
export const getDataFilePath = () => {
  return DATA_FILE_PATH;
};
