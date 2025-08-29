# Sustainability Frontend

This is a React app that connects to the Sustainability API backend and lets you manage sustainability actions.

---

## Features

- Display all actions in a table (ID, Action, Date, Points).
- Add a new action using a form (Action, Date, Points).
- Edit or delete existing actions.
- Data is persisted via the backend API.

---

## Setup & Run

# Navigate into the frontend folder
cd frontend

# Install dependencies
npm install

# Start the React app
npm start

Frontend runs at http://localhost:3000
Make sure the backend server is also running on http://localhost:3001

---

## API Configuration

By default, the frontend expects the backend API at:

http://localhost:3001/api/actions

If you change the backend port, update the API base URL in your frontend code (e.g., services/api.js).

---

## Testing

1. Open the app in your browser.
2. Use the form to add new sustainability actions.
3. Edit or delete actions directly in the table.
4. Verify that the data is persisted in backend/data/data.json.
