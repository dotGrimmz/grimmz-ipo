// import { addSymbolToStore } from "./filehandler.js";
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const fs = require("fs");

const dbPath = "./data/database.db"; // Adjust to the correct path for your SQLite file
const storeFileFath = "./data/store.json"; // Path to your categories JSON file

// Function to get the SQLite DB connection
const getDbConnection = async () => {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    return db;
  } catch (error) {
    console.error("Error opening the database:", error);
    throw error;
  }
};

// Function to create the necessary tables in SQLite database
const initDb = async () => {
  try {
    const db = await getDbConnection();

    // Create tables
    await db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_name TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS symbols (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        symbol TEXT NOT NULL UNIQUE,
        company_name TEXT NOT NULL,
        category_id INTEGER,
        sector TEXT NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories (id)
      );
    `);

    console.log("Tables created or already exist.");

    // Read the categories and symbols from the JSON file
    const storeData = fs.readFileSync(storeFileFath);
    const store = JSON.parse(storeData);
    // Insert categories into the database
    for (const category of store.categories) {
      await db.run(
        "INSERT OR IGNORE INTO categories (category_name) VALUES (?)",
        category.category_name
      );
    }

    // Insert symbols into the database
    for (const symbol of store.symbols) {
      await db.run(
        "INSERT OR IGNORE INTO symbols (symbol, company_name, category_id, sector) VALUES (?, ?, ?, ?)",
        symbol.symbol,
        symbol.company_name,
        symbol.category_id,
        symbol.sector
      );
    }

    console.log("Categories and symbols loaded added from JSON file.");

    await db.close();
  } catch (err) {
    console.error("Error initializing DB:", err);
  }
};

// Call the initDb function to initialize the DB
initDb().catch((err) => {
  console.error("Failed to initialize database:", err);
});

// Function to get all categories from SQLite database
const getAllCategories = async () => {
  const db = await getDbConnection();
  const categories = await db.all("SELECT * FROM categories");
  await db.close();
  return categories;
};

// Function to add a category to SQLite database
const addCategory = async (categoryName) => {
  const db = await getDbConnection();
  await db.run(
    "INSERT INTO categories (category_name) VALUES (?)",
    categoryName
  );
  await db.close();
};

// Function to delete a symbol from the SQLite database
const deleteSymbol = async (id) => {
  const db = await getDbConnection();
  await db.run("DELETE FROM symbols WHERE id = ?", id);
  await db.close();
};

// Function to add a symbol to the SQLite database
const addSymbol = async (symbol, companyName, categoryId, sector) => {
  const db = await getDbConnection();
  await db.run(
    "INSERT INTO symbols (symbol, company_name, category_id, sector) VALUES (?, ?, ?, ?)",
    symbol,
    companyName,
    categoryId,
    sector
  );
  await db.close();
};

const getAllSymbols = async () => {
  const db = await getDbConnection();
  const symbols = await db.all("SELECT * FROM symbols");
  await db.close();
  return symbols;
};

// Function to get all symbols for a given category
const getSymbolsByCategory = async (categoryId) => {
  const db = await getDbConnection();
  const symbols = await db.all(
    "SELECT * FROM symbols WHERE category_id = ?",
    categoryId
  );
  await db.close();
  return symbols;
};

// Export functions for usage in other parts of your application
module.exports = {
  initDb,
  getDbConnection,
  getAllCategories,
  addCategory,
  addSymbol,
  deleteSymbol,
  getSymbolsByCategory,
  getAllSymbols,
};
