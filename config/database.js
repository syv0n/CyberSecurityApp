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

async function createIdentify(reportId, category, subcategory, oisFoundationalObjective, maturityLevel, informationSource, score) {
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
    console.log('Identify record created successfully.');
  } catch (err) {
    console.error('Failed to create Identify record:', err);
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

async function initializeReport(departmentName) {
  try {
    const request = new sql.Request();
    request.input('departmentName', sql.VarChar, departmentName);

    // Insert a new report and get the last inserted ID
    await request.query('INSERT INTO dbo.Report (Department_Name, Identity_Score, Protect_Score, Detect_Score, Respond_Score, Recover_Score, Total_Score) VALUES (@departmentName, 0, 0, 0, 0, 0, 0); SELECT SCOPE_IDENTITY() AS NewReportId;');

    // Extract the Report_ID from the result
    const result = await request.get();
    const reportId = result.recordset[0].NewReportId;

    return reportId;
  } catch (err) {
    console.error('Failed to initialize report:', err);
    throw err;
  }
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
async function createReport(reportId, departmentName, identityScore, protectScore, detectScore, respondScore, recoverScore, totalScore) {
  try {
    let sqlQuery = `
      UPDATE dbo.Report
      SET Department_Name = @departmentName,
          Identity_Score = @identityScore,
          Protect_Score = @protectScore,
          Detect_Score = @detectScore,
          Respond_Score = @respondScore,
          Recover_Score = @recoverScore,
          Total_Score = @totalScore
      WHERE Report_Id = @reportId;
    `;

    const request = new sql.Request();
    request.input('reportId', sql.BigInt, reportId)
    request.input('departmentName', sql.VarChar, departmentName)
    request.input('identityScore', sql.Float, identityScore)
    request.input('protectScore', sql.Float, protectScore)
    request.input('detectScore', sql.Float, detectScore)
    request.input('respondScore', sql.Float, respondScore)
    request.input('recoverScore', sql.Float, recoverScore)
    request.input('totalScore', sql.Float, totalScore)

  } catch (err) {
    console.error('Failed to update Report', err);
    throw err;
  }
}
// ------------------------------------------------------------------------ Delete -------------------------------------------------------
async function deleteReport(reportId) {
  try {
    await new Promise((resolve, reject) => {
      sql.Transaction(async t => {
        try {
          await t.request()
            .input('reportId', sql.Int, reportId)
            .query(`DELETE FROM Identity WHERE Report_ID = @reportId`);

          await t.request()
            .input('reportId', sql.Int, reportId)
            .query(`DELETE FROM Protect WHERE Report_ID = @reportId`);

          await t.request()
            .input('reportId', sql.Int, reportId)
            .query(`DELETE FROM Detect WHERE Report_ID = @reportId`);

          await t.request()
            .input('reportId', sql.Int, reportId)
            .query(`DELETE FROM Recover WHERE Report_ID = @reportId`);

          await t.request()
            .input('reportId', sql.Int, reportId)
            .query(`DELETE FROM Respond WHERE Report_ID = @reportId`);

          await t.request()
            .input('reportId', sql.Int, reportId)
            .query(`DELETE FROM Report WHERE Report_ID = @reportId`)

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

// --------------------------------------------------------------- SCORING -------------------------------------------------------------

async function getIdentifyScore(reportId) {
  try {
    // Fetch all records for the given reportId
    const records = await sql.query('SELECT Score, Subcategory FROM Identity WHERE Report_Id = ?', [reportId]);
    
    // Initialize variables
    let totalScore = 0;

    // Define weights for each subcategory
    const weights = {
      'ID.AM-1': 0.15,
      'ID.AM-2': 0.15,
      'ID.AM-5': 0.10,
      'ID.BE-5': 0.05,
      'ID.GV-1a': 0.10,
      'ID.GV-1b': 0.10,
      'ID.GV-2': 0.05,
      'ID.GV-4': 0.20,
      'ID.RA-1': 0.10

      // Add more categories as needed
    };

    // Calculate the weighted score for each record
    for (let record of records.recordset) {
      const weight = weights[record.Subcategory] || 0; // Use default weight if unknown category
      totalScore += record.Score * weight;
    }

    return totalScore;
  } catch (err) {
    console.error('Failed to calculate total score: ', err);
    throw err;
  }
}

async function getProtectScore(reportId) {
  try {
    // Fetch all records for the given reportId
    const records = await sql.query('SELECT Score, Subcategory FROM Protect WHERE Report_Id = ?', [reportId]);
    
    // Initialize variables
    let totalScore = 0;

    // Define weights for each subcategory
    const weights = {
      'PR.AC-1': 0.10,
      'PR.AC-2': 0.07,
      'PR.AC-3': 0.05,
      'PR.AC-5': 0.05,
      'PR.AT-1': 0.05,
      'PR.AT-2': 0.05,
      'PR-DS-1a': 0.05,
      'PR-DS-1b': 0.05,
      'PR-DS-2': 0.10,
      'PR.IP-1': 0.05,
      'PR.IP-3': 0.10,
      'PR.IP-5': 0.05,
      'PR.IP-9': 0.10,
      'PR.IP-10': 0.05,
      'PR.IP-12': 0.08
      // Add more categories as needed
    };

    // Calculate the weighted score for each record
    for (let record of records.recordset) {
      const weight = weights[record.Subcategory] || 0; // Use default weight if unknown category
      totalScore += record.Score * weight;
    }

    return totalScore;
  } catch (err) {
    console.error('Failed to calculate total score: ', err);
    throw err;
  }
}

async function getDetectScore(reportId) {
  try {
    // Fetch all records for the given reportId
    const records = await sql.query('SELECT Score, Subcategory FROM Detect WHERE Report_Id = ?', [reportId]);
    
    // Initialize variables
    let totalScore = 0;

    // Define weights for each subcategory
    const weights = {
      'DE.AE-3': 0.20,
      'DE.CM-1': 0.20,
      'DE.CM-4': 0.20,
      'DE.CM-8': 0.20,
      'DE.DP-1': 0.05,
      'DE.DP-3': 0.05,
      'DE.DP-4': 0.10
      // Add more categories as needed
    };

    // Calculate the weighted score for each record
    for (let record of records.recordset) {
      const weight = weights[record.Subcategory] || 0; // Use default weight if unknown category
      totalScore += record.Score * weight;
    }

    return totalScore;
  } catch (err) {
    console.error('Failed to calculate total score: ', err);
    throw err;
  }
}

async function getRespondScore(reportId) {
  try {
    // Fetch all records for the given reportId
    const records = await sql.query('SELECT Score, Subcategory FROM Respond WHERE Report_Id = ?', [reportId]);
    
    // Initialize variables
    let totalScore = 0;

    // Define weights for each subcategory
    const weights = {
      'RS.RP-1': 0.25,
      'RS.CO-1': 0.25,
      'RS.CO-2': 0.25,
      'RS.AN-1': 0.25
      // Add more categories as needed
    };

    // Calculate the weighted score for each record
    for (let record of records.recordset) {
      const weight = weights[record.Subcategory] || 0; // Use default weight if unknown category
      totalScore += record.Score * weight;
    }

    return totalScore;
  } catch (err) {
    console.error('Failed to calculate total score: ', err);
    throw err;
  }
}

async function getRecoverScore(reportId) {
  try {
    // Fetch all records for the given reportId
    const records = await sql.query('SELECT Score, Subcategory FROM Recover WHERE Report_Id = ?', [reportId]);
    
    // Initialize variables
    let totalScore = 0;

    // Define weights for each subcategory
    const weights = {
      'RC.RP-1': 1.0
      // Add more categories as needed
    };

    // Calculate the weighted score for each record
    for (let record of records.recordset) {
      const weight = weights[record.Subcategory] || 0; // Use default weight if unknown category
      totalScore += record.Score * weight;
    }

    return totalScore;
  } catch (err) {
    console.error('Failed to calculate total score: ', err);
    throw err;
  }
}

// export the modules for use
module.exports = { sql, connectDB, getReport, createIdentify, createProtect, 
  createDetect, createRespond, createRecover, deleteReport, getIdentifyScore, getProtectScore,
  getDetectScore, getRespondScore, getRecoverScore, createReport, initializeReport
 };