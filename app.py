from flask import Flask, request, render_template, redirect, url_for, flash, jsonify
import pyodbc
import os
from datetime import datetime

app = Flask(__name__, static_folder='static')
app.secret_key = 'supersecretkey'

#CONNECTION STRING for connection to Database
conn_str = (
    'Driver={ODBC Driver 18 for SQL Server};'
    'Server=tcp:cybersecurityappserver.database.windows.net,1433;'
    'Database=cybersecuritydemodb;'
    'UID=jaygokul;'
    'PWD=S3@ttleAzure$Float;'
    'Encrypt=yes;'
    'TrustServerCertificate=yes;'
    'Connection Timeout=30;'
)

# GET CONNECTION FOR DATABASE OPERATIONS
def get_db_connection():
    try:
        conn = pyodbc.connect(conn_str)
        print("Connection successful")
        return conn
    except pyodbc.Error as ex:
        sqlstate = ex.args[0]
        if sqlstate == '08001':
            print("Network-related or instance-specific error occurred")
        elif sqlstate == '28000':
            print("Invalid authorization specification")
        else:
            print(f"Error: {ex}")
        raise

#----------------------------------------------------- RESPONSE -------------------------------------------------#

#CREATE Operations
def insert_respond_RS_RP(data):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO Respond (
                Department_Id,
                Type,
                TypeDescription,
                Score,
                Created_By,
                Create_Datetime
            ) VALUES (?, ?, ?, ?, ?, ?)
        """, data['Department_Id'], 'RS.RP', 'Response Planning', data['Score'],  'Admin', datetime.now())
        conn.commit()
    except Exception as e:
        print(f"Error inserting Respond data: {e}")
        flash("An error occurred while submitting the form. Please try again.", "danger")
    finally:
        conn.close()

def insert_respond_RS_AN(data):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO Respond (
                Department_Id,
                Type,
                TypeDescription,
                Score,
                Created_By,
                Create_Datetime
            ) VALUES (?, ?, ?, ?, ?, ?)
        """, data['Department_Id'], 'RS.AN', 'Analysis', data['Score'],  'Admin', datetime.now())
        conn.commit()
    except Exception as e:
        print(f"Error inserting Respond data: {e}")
        flash("An error occurred while submitting the form. Please try again.", "danger")
    finally:
        conn.close()


@app.route('/')
def home():
    return render_template('Nist_2.0.html')


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)