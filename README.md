# 📊 Rahat IK Assignment

This project is a fullstack application that regularly fetches data from an external REST API, saves it to a PostgreSQL database, and displays it in a collapsible table format on a modern frontend built with React + Redux Toolkit + MUI + TailwindCSS.

---

## 📑 Table of Contents

- [Technologies](#-technologies)  
- [Installation](#-installation)  
  - [Clone the repository](#1-clone-the-repository)  
  - [Backend setup](#2-backend-setup)  
  - [Frontend setup](#3-frontend-setup)  
- [How it works?](#-how-it-works)  
- [Redux Structure Used](#-redux-structure-used)  
- [Example API](#-example-api)  
- [Common Issues & Solutions](#-common-issues--solutions)  
- [Live Demo](#-live-demo)  
- [Contact](#-contact)  
- [License](#-license)  


---

## 🚀 Technologies

* **Backend:** Node.js (Express), node-cron, Axios, PostgreSQL (pg)  
* **Frontend:** React, Redux Toolkit, MUI (Material UI), TailwindCSS, React Icons  
* **API:** REST API Basic Auth + Bearer Token

---

## 📦 Installation

### 1️⃣ Clone the repository

git clone github.com/ardcoding/rahatik
cd rahatik

---

### 2️⃣ Backend setup

cd backend
npm install

npm installEdit the `config/.env` file as follows:

DATABASE_USERNAME=
HOSTNAME=
DATABASE=
DATABASE_PASSWORD=
DATABASE_PORT=
AUTH_USERNAME=
AUTH_PASSWORD=


Create the database and prepare the table schema:

```sql
CREATE TABLE records (
  id SERIAL PRIMARY KEY,
  hesap_kodu VARCHAR(50) UNIQUE NOT NULL,
  hesap_adi TEXT,
  tipi CHAR(1),
  ust_hesap_id INTEGER,
  borc NUMERIC,
  alacak NUMERIC,
  borc_sistem NUMERIC,
  alacak_sistem NUMERIC,
  borc_doviz NUMERIC,
  alacak_doviz NUMERIC,
  borc_islem_doviz NUMERIC,
  alacak_islem_doviz NUMERIC,
  birim_adi VARCHAR(50),
  bakiye_sekli INTEGER,
  aktif BOOLEAN,
  dovizkod INTEGER
);
```

Start the backend:

npm start

---
## 3️⃣ Frontend setup

cd frontend
npm install

Install Tailwind:
npx tailwindcss init -p

Add the following to tailwind.config.js:
content: ["./src/**/*.{js,jsx,ts,tsx}"],

Add the following to your index.css:
@tailwind base;
@tailwind components;
@tailwind utilities;

Start the frontend:

npm start

---

## ⚙️ How it works?
✅ 1. Token Retrieval:
Backend gets the API token via a cron job or the /api/fetch-now endpoint.

✅ 2. Data Fetching:
With the token, a PATCH request is sent to the data endpoint; JSON data is received.

✅ 3. Synchronization:
Received records are updated or inserted in PostgreSQL. Data is automatically updated every 5 minutes by a cron job.

✅ 4. Display:
Frontend fetches records from /api/records, groups them into 3 levels using the groupRecords function.
MUI Collapse Table is used for expandable group rows.
TailwindCSS provides responsive styling.

Redux Structure Used
features/records/recordsSlice.js

fetchRecords thunk → fetches data from API.

groupRecords → groups data inside slice.

records → raw data.

groups → grouped data.

🔍 Sample API
GET /api/records → returns all records as JSON

GET /api/fetch-now → triggers immediate API synchronizatio

---

## ⚡ Issues Encountered & Solutions

1️⃣ SyntaxError: Cannot use import statement outside a module
Cause: Missing "type": "module" in package.json for Node.js ES modules.
Solution: Added "type": "module" to package.json and used import syntax in .js files.

2️⃣ Axios SSL Error (certificate expired)
Cause: External API’s SSL certificate was invalid.
Solution: Disabled SSL verification during development with environment variable NODE_TLS_REJECT_UNAUTHORIZED=0.

3️⃣ PostgreSQL Error: invalid input syntax for type numeric: ""
Cause: Numeric fields in API response sometimes were empty strings "".
Solution: Safely converted numeric values with Number(value) || 0 before saving.

4️⃣ Incorrect grouping calculations in groupRecords function
Cause: Group totals were being summed twice due to incorrect logic.
Solution: Simplified grouping logic to accumulate sums only once.

5️⃣ MUI Collapse Table indentation and row management issues
Cause: Parent groups repeated in child groups and toggling was confusing.
Solution: Unique keys per group level for toggling; used Box with marginLeft for indentation.

6️⃣ CORS error from frontend to backend requests
Cause: Backend was not configured to allow cross-origin requests.
Solution: Added cors middleware in Express backend with app.use(cors()).

7️⃣ Tailwind and MUI style conflicts
Cause: Overlapping styles between Tailwind and MUI components.
Solution: Used Tailwind for layout and spacing, MUI for tables and icons; avoided conflicting class names.

---

## ✅ Live Demo

>

---

## 📞 Contact

For feedback and inquiries, please contact:

```
Mail: ahmmetdoraa@gmail.com
```

---

## 🪪 License

MIT

This project is licensed for use as a Rahat IK Assignment solution and development purposes.