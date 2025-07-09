# YouTube App Information

## Summary

A React application that imitates the YouTube interface, focusing on the topbar functionality. The app allows users to search for YouTube videos using the Google API. It requires authentication with a password and includes features like responsive design and internationalization.

## Structure

-   **public/**: Contains static assets and HTML template
-   **src/**: Main source code directory
    -   **components/**: React components including App and providers
    -   **contexts/**: React context providers
    -   **functions/**: Utility functions
    -   **hooks/**: Custom React hooks
    -   **HOCs/**: Higher-order components
    -   **i18n/**: Internationalization configuration
    -   **pages/**: Page components (Login, YouTube, NoPage)
    -   **reduxware/**: Redux state management (actions, reducers, thunks)
    -   **routing/**: Routing configuration
    -   **styles/**: SCSS stylesheets
    -   **themes/**: Material UI theme configuration
    -   **types/**: TypeScript type definitions

## Language & Runtime

**Language**: TypeScript/JavaScript
**Version**: TypeScript 4.4.x
**Build System**: React Scripts (Create React App)
**Package Manager**: npm

## Dependencies

**Main Dependencies**:

-   React 18.2.0 with React DOM and React Router 6.4.5
-   Redux/Redux Toolkit for state management
-   Material UI (MUI) 5.14.1 for UI components
-   TanStack Query 4.32.0 for data fetching
-   i18next for internationalization
-   react-youtube 10.0.0 for YouTube video integration
-   Workbox for service worker and PWA support

**Development Dependencies**:

-   TypeScript types for React and other libraries
-   Babel preset for environment configuration
-   gh-pages for deployment to GitHub Pages

## Build & Installation

```bash
# Install dependencies
npm install

# Create .env file with required keys
# REACT_APP_API_KEY={your Google API key}
# REACT_APP_PASSWORD=MISIO

# Start development server
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Testing

**Framework**: Jest
**Run Command**:

```bash
npm test
npm run test:watch
```

## Browser Support

Supports modern browsers (Chrome, Firefox, Safari, Edge) but not Internet Explorer or Opera Mini. The application is optimized for Chrome, with some features not fully supported in Firefox.
