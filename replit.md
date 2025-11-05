# RecordViewer - Salesforce User Interface API Tool

## Overview
This is a Node.js/Express web application that demonstrates how to use the Salesforce User Interface API to create, read, update, and delete Salesforce records. The application uses React for the frontend with Redux for state management, and Express for the backend server.

**Current Status**: Fully configured and running on Replit
**Last Updated**: November 5, 2025

## Project Architecture

### Technology Stack
- **Backend**: Node.js with Express 4.x
- **Frontend**: React 15.x with Redux and Redux-Saga
- **Build System**: Browserify with Babelify for transpiling React/ES6
- **View Engine**: Pug templates
- **CSS Framework**: Salesforce Lightning Design System (SLDS)
- **Session Management**: express-session with cookie-parser

### Project Structure
```
/
├── app/                    # Backend application code
│   ├── middlewares/        # Express middleware (auth, instance checks)
│   ├── routers/            # Express route handlers
│   └── config.js           # Application configuration
├── client-src/             # React frontend source (pre-transpilation)
│   ├── actions/            # Redux actions
│   ├── components/         # React components
│   ├── containers/         # Redux containers
│   ├── reducers/           # Redux reducers
│   ├── sagas/              # Redux-saga async logic
│   └── root.js             # Frontend entry point
├── lib/                    # Transpiled JavaScript output
├── views/                  # Pug templates
├── public/                 # Static assets
└── app.js                  # Main server entry point
```

### Key Configuration
- **Port**: 5000 (configured for Replit webview)
- **Host**: 0.0.0.0 (allows external connections)
- **Build Process**: Browserify transpiles React code from client-src/ to lib/
- **Session Secret**: Configured in app.js (should be changed for production)

## Recent Changes
- **Nov 5, 2025**: Initial Replit setup
  - Updated port configuration from 3001 to 5000
  - Modified server to bind to 0.0.0.0 for Replit compatibility
  - Fixed inline-style-prefixer dependency version (v3.0.8) for compatibility with react-modal-dialog
  - Configured workflow for continuous running
  - Set up deployment configuration for Replit autoscale

## How to Use

### Development
The application is configured to run automatically via the workflow:
- Command: `npm start`
- The server will start on port 5000
- Access the application through the Replit webview

### Build Process
The React frontend is automatically built during `npm install` via the postinstall script:
```bash
npm run build  # Manually rebuild if needed after frontend code changes
```

**Important**: After making changes to any files in `client-src/`, you must run `npm run build` to regenerate the transpiled JavaScript in the `lib/` directory. The server serves the transpiled files, not the source files.

### Salesforce Configuration Required
To use this application, you need to configure a Salesforce Connected App:

1. **Create Connected App** in your Salesforce org
   - Set Callback URL to match your Replit deployment URL + `/oauth-redirect`
   - Note the Consumer Key for login

2. **Configure CORS** in Salesforce
   - Add your Replit domain to allowed origins
   - Format: `https://<your-repl-name>.<your-username>.repl.co`

3. **Environment Variables**
   - `SESSION_SECRET`: (Recommended) Session secret for secure cookies - set this for production
   - `LOGIN_URL`: (Optional) Default Salesforce login URL
   - `CONSUMER_KEY`: (Optional) Default consumer key for the Connected App
   - `PORT`: (Optional) Server port (defaults to 5000)

## Features
- OAuth 2.0 authentication with Salesforce
- View recent Salesforce records
- Create, read, update, and delete records
- Support for custom objects and many standard objects
- Raw JSON view of User Interface API responses
- Session-based state management

## User Preferences
None set yet. Configure as needed during development.

## Dependencies
### Production Dependencies
- Express and related middleware (body-parser, cookie-parser, express-session)
- React and Redux ecosystem (react, react-redux, redux, redux-saga)
- Salesforce Lightning Design System (@salesforce-ux/design-system)
- View templating (pug)
- Utilities (q for promises, xml2js for parsing)

### Development Dependencies
- Babel toolchain for ES6/React transpilation
- Browserify for module bundling
- Redux DevTools for debugging

### Known Issues
- Using older versions of some packages (React 15.x, Node packages from 2017-2018)
- 52 npm audit vulnerabilities (expected for older dependencies)
- inline-style-prefixer pinned to v3.0.8 for compatibility

## Deployment
Configured for Replit autoscale deployment:
- **Target**: autoscale (stateless web application)
- **Run command**: `npm start`
- Build happens automatically during deployment via npm postinstall hook

## Notes
- This is a demonstration/testing tool for Salesforce User Interface API
- Requires valid Salesforce org and Connected App configuration
- Session data is stored in-memory (will reset on server restart)
- For production use, consider upgrading dependencies and implementing persistent session storage
