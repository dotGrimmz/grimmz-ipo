const fs = require("fs");
const path = require("path");

const jsonPath = path.resolve(process.cwd(), "data", "store.json");

// Read JSON data
const readData = async () => {
  try {
    const data = await fs.promises.readFile(jsonPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to read JSON file:", error);
    throw error;
  }
};

// Write JSON data
const writeData = async (data) => {
  try {
    await fs.promises.writeFile(
      jsonPath,
      JSON.stringify(data, null, 2),
      "utf-8"
    );
    console.log("Data successfully updated.");
  } catch (error) {
    console.error("Failed to write JSON file:", error);
    throw error;
  }
};

// CRUD operations
const addSymbolToStore = async (symbolData) => {
  const data = await readData();
  symbolData.id = data.symbols.length + 1; // Assign new ID
  data.symbols.push(symbolData);
  await writeData(data);
};

// const updateSymbol = async (id, updates) => {
//   const data = await readData();
//   const symbol = data.symbols.find((s) => s.id === id);
//   if (!symbol) throw new Error(`Symbol with ID ${id} not found.`);
//   Object.assign(symbol, updates);
//   await writeData(data);
// };

const deleteSymbol = async (id) => {
  const data = await readData();
  data.symbols = data.symbols.filter((s) => s.id !== id);
  await writeData(data);
};

const getSymbols = async () => {
  return await readData();
};

module.exports = {
  addSymbolToStore,
  deleteSymbol,
  getSymbols,
};
