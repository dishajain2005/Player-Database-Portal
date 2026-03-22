const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const sheets = google.sheets('v4');

// Replace with your actual spreadsheet ID and API key
const SPREADSHEET_ID = '1ci3zIv3cVwjrLJZ4iZmQF-MW871vAal6opJIiSDZc88';
const API_KEY = 'AIzaSyB7cQym9gsDQ1vjO20LGBKeHzrrKyXT-Ik';

app.get('/api/players', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:E', // Adjust range as needed: Name, Sport, Hostel, Achievements, Level
      key: API_KEY
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.json([]);
    }

    // Assuming first row is header
    const players = rows.slice(1).map(row => ({
      name: row[0] || '',
      sport: row[1] || '',
      hostel: row[2] || '',
      achievements: row[3] || '',
      level: row[4] || ''
    }));

    res.json(players);
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});