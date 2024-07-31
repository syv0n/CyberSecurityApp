const sql = require('mssql');
const { create } = require('../models/User');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

async function connectDB() {
  try {
    await sql.connect(config);
    console.log('Connected to MSSQL');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

// Database Operations

// ------------------------------------------------------------Create-----------------------------------------------------------------

async function createIdentity(reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score) {
  try {
    // Prepare the INSERT query with placeholders for parameters
    let sqlQuery = `
      INSERT INTO dbo.Identity (Report_ID, Category, Subcategory, OIS_Foundational_Objective, Maturity_Level, Information_Source, Score)
      VALUES (@reportId, @category, @subcategory, @oisFoundationalObjective, @maturityLevel, @informationSource, @score);
    `;
    
    // Execute the query with the provided parameters
    const request = new sql.Request();
    request.input('reportId', sql.BigInt, reportId);
    request.input('category', sql.VarChar, category);
    request.input('subcategory', sql.VarChar, subcategory);
    request.input('oisFoundationalObjective', sql.VarChar, oisFoundationalObjective);
    request.input('maturityLevel', sql.VarChar, maturityLevel);
    request.input('informationSource', sql.VarChar, informationSource);
    request.input('score', sql.Float, score); // Added input for the new Score column
    
    await request.query(sqlQuery);
    console.log('Identity record created successfully.');
  } catch (err) {
    console.error('Failed to create Identity record:', err);
    throw err; // Rethrow the error to handle it further up the call stack
  }
}



async function createProtect(reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score) {
  try {
    // Prepare the INSERT query with placeholders for parameters
    let sqlQuery = `
      INSERT INTO dbo.Protect (Report_ID, Category, Subcategory, OIS_Foundational_Objective, Maturity_Level, Information_Source, Score)
      VALUES (@reportId, @category, @subcategory, @oisFoundationalObjective, @maturityLevel, @informationSource, @score);
    `;
    
    // Execute the query with the provided parameters
    const request = new sql.Request();
    request.input('reportId', sql.BigInt, reportId);
    request.input('category', sql.VarChar, category);
    request.input('subcategory', sql.VarChar, subcategory);
    request.input('oisFoundationalObjective', sql.VarChar, oisFoundationalObjective);
    request.input('maturityLevel', sql.VarChar, maturityLevel);
    request.input('informationSource', sql.VarChar, informationSource);
    request.input('score', sql.Float, score); // Added input for the new Score column
    
    await request.query(sqlQuery);
    console.log('Protect record created successfully.');
  } catch (err) {
    console.error('Failed to create Protect record:', err);
    throw err; // Rethrow the error to handle it further up the call stack
  }
}

async function createDetect(reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score) {
  try {
    // Prepare the INSERT query with placeholders for parameters
    let sqlQuery = `
      INSERT INTO dbo.Detect (Report_ID, Category, Subcategory, OIS_Foundational_Objective, Maturity_Level, Information_Source, Score)
      VALUES (@reportId, @category, @subcategory, @oisFoundationalObjective, @maturityLevel, @informationSource, @score);
    `;
    
    // Execute the query with the provided parameters
    const request = new sql.Request();
    request.input('reportId', sql.BigInt, reportId);
    request.input('category', sql.VarChar, category);
    request.input('subcategory', sql.VarChar, subcategory);
    request.input('oisFoundationalObjective', sql.VarChar, oisFoundationalObjective);
    request.input('maturityLevel', sql.VarChar, maturityLevel);
    request.input('informationSource', sql.VarChar, informationSource);
    request.input('score', sql.Float, score); // Added input for the new Score column
    
    await request.query(sqlQuery);
    console.log('Detect record created successfully.');
  } catch (err) {
    console.error('Failed to create Detect record:', err);
    throw err; // Rethrow the error to handle it further up the call stack
  }
}

async function createRespond(reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score) {
  try {
    // Prepare the INSERT query with placeholders for parameters
    let sqlQuery = `
      INSERT INTO dbo.Respond (Report_ID, Category, Subcategory, OIS_Foundational_Objective, Maturity_Level, Information_Source, Score)
      VALUES (@reportId, @category, @subcategory, @oisFoundationalObjective, @maturityLevel, @informationSource, @score);
    `;
    
    // Execute the query with the provided parameters
    const request = new sql.Request();
    request.input('reportId', sql.BigInt, reportId);
    request.input('category', sql.VarChar, category);
    request.input('subcategory', sql.VarChar, subcategory);
    request.input('oisFoundationalObjective', sql.VarChar, oisFoundationalObjective);
    request.input('maturityLevel', sql.VarChar, maturityLevel);
    request.input('informationSource', sql.VarChar, informationSource);
    request.input('score', sql.Float, score); // Added input for the new Score column
    
    await request.query(sqlQuery);
    console.log('Respond record created successfully.');
  } catch (err) {
    console.error('Failed to create Respond record:', err);
    throw err; // Rethrow the error to handle it further up the call stack
  }
}

async function createRecover(reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score) {
  try {
    // Prepare the INSERT query with placeholders for parameters
    let sqlQuery = `
      INSERT INTO dbo.Recover (Report_ID, Category, Subcategory, OIS_Foundational_Objective, Maturity_Level, Information_Source, Score)
      VALUES (@reportId, @category, @subcategory, @oisFoundationalObjective, @maturityLevel, @informationSource, @score);
    `;
    
    // Execute the query with the provided parameters
    const request = new sql.Request();
    request.input('reportId', sql.BigInt, reportId);
    request.input('category', sql.VarChar, category);
    request.input('subcategory', sql.VarChar, subcategory);
    request.input('oisFoundationalObjective', sql.VarChar, oisFoundationalObjective);
    request.input('maturityLevel', sql.VarChar, maturityLevel);
    request.input('informationSource', sql.VarChar, informationSource);
    request.input('score', sql.Float, score); // Added input for the new Score column
    
    await request.query(sqlQuery);
    console.log('Recover record created successfully.');
  } catch (err) {
    console.error('Failed to create Recover record:', err);
    throw err; // Rethrow the error to handle it further up the call stack
  }
}

async function createReport(reportId) {
  // TODO Have a score totalled for each section (identity, protect, etc)
}

// -------------------------------------------------------------------------Read-----------------------------------------------------
async function getReport() {
  try {
    const result = await sql.query('SELECT * FROM Report');
    return result
  } catch (err) {
    console.error('Failed to fetch data: ', err);
    throw err;
  }
}

// get full report, joining all tables
async function getFullReport(reportId) {

}

// ------------------------------------------------------------------------ Update -------------------------------------------------------

// ------------------------------------------------------------------------ Delete -------------------------------------------------------
async function deleteReport(reportId) {
  try {
    await new Promise((resolve, reject) => {
      sql.Transaction(async t => {
        try {
          await t.request()
            .input('reportId', sql.Int, reportId)
            .query(`DELETE FROM Identity WHERE Report_Id = @reportId`);

          await t.request()
            .input('reportId', sql.Int, reportId)
            .query(`DELETE FROM Protect WHERE Report_Id = @reportId`);

          await t.request()
            .input('reportId', sql.Int, reportId)
            .query(`DELETE FROM Detect WHERE Report_Id = @reportId`);

          await t.request()
            .input('reportId', sql.Int, reportId)
            .query(`DELETE FROM Recover WHERE Report_Id = @reportId`);

          await t.request()
            .input('reportId', sql.Int, reportId)
            .query(`DELETE FROM Respond WHERE Report_Id = @reportId`);

          await t.request()
            .input('reportId', sql.Int, reportId)
            .query(`DELETE FROM Report WHERE Report_Id = @reportId`)

          resolve();
        } catch (err) {
          reject(err);
        }
      }, (err) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log("All deletions successful.");
          resolve();
        }
      });
    });
  } catch (error) {
    console.error(error);
    // Handle error appropriately
  } finally {
    sql.close(); // Close the connection after operations are done
  }
}


// export the modules for use
module.exports = { sql, connectDB, getReport, createIdentity, createProtect, 
  createDetect, createRespond, createRecover, deleteReport
 };