# Player Database Portal

A React frontend application that dynamically reflects data from a Google Sheet, displaying player information with search, filtering, and sorting capabilities.

## Features

- **Google Sheets Integration**: Automatically syncs data from a Google Sheet.
- **Player Data Display**: Shows Name, Sport, Hostel, Achievements, Gender and Level.
- **Search and Filtering**: Search by name or sport, filter by sport, hostel, Gender or level.
- **Sorting**: Sort players by name, sport, or level.
- **Real-time Updates**: Polls the backend every 10 seconds for updates.

## Architecture

- **Frontend**: React.js with Vite
- **Backend**: Node.js with Express
- **Data Source**: Google Sheets API

## Setup Instructions

### Prerequisites

- Node.js installed
- Google Sheets API key
- Public Google Sheet with player data

### Backend Setup

1. Navigate to the `backend` directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Update `server.js` with your Google Sheet details:
   - Replace `YOUR_SPREADSHEET_ID` with your Google Sheet ID.
   - Replace `YOUR_API_KEY` with your Google Sheets API key.

4. Start the backend server:
   ```
   npm start
   ```
   The server will run on `http://localhost:3001`.

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

### Google Sheets Setup

1. Create a Google Sheet with the following columns (starting from A1):
   - A: Name
   - B: Sport
   - C: Hostel
   - D: Achievements
   - E: Gender
   - F: Level

2. Make the sheet public (Share > Anyone with the link can view).

3. Get the Spreadsheet ID from the URL (the long string between `/d/` and `/edit`).

4. Enable Google Sheets API and create an API key in Google Cloud Console.

## Usage

- Open the frontend in your browser.
- The data will load from the Google Sheet.
- Use the search bar to find players by name or sport.
- Use the dropdowns to filter by sport, hostel, or level.
- Use the sort dropdown to sort the results.

## Notes

- The backend polls the Google Sheet every 10 seconds for updates.
- Ensure the Google Sheet is accessible with the API key.
- For production, consider more secure authentication methods.
