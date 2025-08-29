# Sustainability Tracker

A full-stack web application for tracking sustainability actions and earning points for eco-friendly activities.

## Features

### Frontend (React)
- **Display Actions**: View all sustainability actions in a beautiful, sortable table
- **Add Actions**: Form to add new sustainability actions with validation
- **Edit Actions**: Update existing actions with inline editing
- **Delete Actions**: Remove actions with confirmation
- **Real-time Updates**: Automatic refresh after CRUD operations
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Sorting**: Sort by ID, Action, Date, or Points
- **Statistics**: View total actions and points in the header

### Backend (Node.js/Express)
- **RESTful API**: Complete CRUD operations for sustainability actions
- **Data Persistence**: JSON file-based storage with automatic backup
- **Error Handling**: Comprehensive error handling and validation
- **Input Validation**: Server-side validation for all inputs
- **CORS Support**: Configured for frontend integration

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with responsive design
- **ES6+** - Modern JavaScript features

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **ES Modules** - Modern module system
- **File System** - JSON-based data storage

## 📁 Project Structure

```
carbon-app/
├── backend/
│   ├── data/
│   │   └── data.json          # Data storage
│   ├── routes/
│   │   └── actions.js         # API routes
│   ├── utils/
│   │   └── dataStore.js       # Data management
│   ├── package.json
│   ├── README.md
│   └── server.js              # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ActionForm.js      # Form component
│   │   │   ├── ActionForm.css
│   │   │   ├── ActionsTable.js    # Table component
│   │   │   └── ActionsTable.css
│   │   ├── services/
│   │   │   └── api.js             # API service layer
│   │   ├── App.js                 # Main app component
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── QUICK-START.md
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd carbon-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   # or
   node server.js
   ```
   The backend will run on `http://localhost:3001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to use the application

## Troubleshooting

### Port Already in Use Error

If you get an error like `EADDRINUSE: address already in use :::3001`, follow these steps:

1. **Check for running processes:**
   ```bash
   lsof -i :3001
   ```

2. **Kill existing processes:**
   ```bash
   # Kill by PID (replace XXXX with the actual PID)
   kill XXXX
   
   # Or kill all Node.js processes (be careful!)
   pkill -f "node server.js"
   ```

3. **Alternative: Use a different port:**
   ```bash
   PORT=3002 node server.js
   ```

### Common Issues

- **CORS errors**: Make sure both frontend and backend are running
- **Data not saving**: Check file permissions in the `backend/data/` directory
- **Module not found**: Ensure all dependencies are installed with `npm install`

## API Endpoints

### Base URL: `http://localhost:3001/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/actions` | Get all sustainability actions |
| POST | `/actions` | Create a new sustainability action |
| PUT | `/actions/:id` | Update an existing action (replace entire object) |
| PATCH | `/actions/:id` | Partially update an action |
| DELETE | `/actions/:id` | Delete an action |

### Request/Response Examples

#### Create Action (POST)
```json
{
  "action": "Used public transportation",
  "date": "2024-01-15",
  "points": 25
}
```

#### Response
```json
{
  "id": 1,
  "action": "Used public transportation",
  "date": "2024-01-15",
  "points": 25
}
```

## Features in Detail

### Frontend Features

#### 1. **Display Actions**
- Clean, modern table design
- Sortable columns (ID, Action, Date, Points)
- Responsive design for mobile devices
- Loading states and empty states
- Total points calculation

#### 2. **Add Action Form**
- Form validation (client-side)
- Date picker with future date prevention
- Points input with range validation (0-1000)
- Real-time error feedback
- Loading states during submission

#### 3. **Edit and Delete Actions**
- Inline editing with pre-filled form
- Delete confirmation dialog
- Optimistic updates
- Error handling and rollback

#### 4. **User Experience**
- Success/error message notifications
- Auto-dismissing success messages
- Smooth animations and transitions
- Accessibility features (focus management, ARIA labels)

### Backend Features

#### 1. **Data Management**
- JSON file-based storage
- Automatic file creation and backup
- Data validation and sanitization
- Error recovery for corrupted files

#### 2. **API Design**
- RESTful architecture
- Proper HTTP status codes
- Comprehensive error messages
- Input validation and type checking

#### 3. **Security & Performance**
- Request size limits
- Input sanitization
- Proper error handling
- Logging for debugging

## Development

### Code Quality
- **Separation of Concerns**: Clear separation between frontend and backend
- **Component Architecture**: Reusable React components
- **Service Layer**: Centralized API communication
- **Error Handling**: Comprehensive error handling throughout
- **Responsive Design**: Mobile-first approach

### Best Practices
- **ES6+ Features**: Modern JavaScript throughout
- **React Hooks**: Functional components with hooks
- **Async/Await**: Modern async handling
- **CSS Organization**: Modular CSS with BEM-like naming
- **API Documentation**: JSDoc comments for all functions

## Future Enhancements

- [ ] User authentication and profiles
- [ ] Categories for different types of actions
- [ ] Achievement badges and milestones
- [ ] Social sharing features
- [ ] Data visualization and charts
- [ ] Export functionality (CSV, PDF)
- [ ] Mobile app (React Native)
- [ ] Database integration (PostgreSQL, MongoDB)
- [ ] Real-time notifications
- [ ] Multi-language support

---

**🌍 Making the world greener, one action at a time!**
