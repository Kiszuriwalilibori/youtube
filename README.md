# YouTube App

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

## The objective

-   Present modern React development skills
-   Demonstrate best practices in frontend architecture

## Features

-   YouTube interface imitation with focus on the topbar functionality
-   Search for YouTube videos using Google API
-   Authentication with password protection
-   Responsive design for various screen sizes
-   Internationalization (i18n) with English and Polish language support
-   Lazy loading for improved performance
-   Offline detection and handling
-   Voice search capability

## Technologies

-   TypeScript
-   React 18
-   Redux Toolkit for state management
-   TanStack Query (React Query) for data fetching
-   Material UI (MUI) for UI components
-   SASS/SCSS for styling
-   React Router for navigation
-   i18next for internationalization
-   React Hook Form for form handling
-   Service workers for offline capabilities

## Installation

-   This application is hosted on GitHub Pages
-   Available at: https://kiszuriwalilibori.github.io/youtube/

## Steps to create local copy:

1. Clone the repository
2. Run `npm install` (not configured for yarn)
3. Create a `.env` file with the following content:
    ```
    REACT_APP_API_KEY={your Google API key}
    REACT_APP_PASSWORD=MISIO
    ```
4. Run `npm start` to start the development server
5. Run `npm run build` to create a production build

## Browser Support

-   Supports modern browsers (Chrome, Firefox, Safari, Edge)
-   Not compatible with Internet Explorer or Opera Mini
-   Best experience on Chrome (some features like input focus styling may not be visible on Firefox)

## Version History

### 1.0.0

-   Initial release

### 1.0.1

-   Added lazy loading for improved performance

### 1.0.2

-   Simplified dependencies
-   Added version number in `<head>` meta tag
-   New favicon

### 1.0.3

-   Modified folder structure
-   Renamed files and variables
-   Prepared codebase for TanStack Query integration

### 1.0.4

-   Integrated TanStack Query for data fetching

### 1.0.5

-   Improved WCAG accessibility
-   Replaced speech recognition package
-   General code revision and cleanup

### 1.0.6

-   Updated Redux, TypeScript, i18n, and React Hook Form
-   Removed unused dependencies
-   Improved language detection and language switching
-   Added automatic version synchronization between package.json and meta tag

### 1.0.7

-   Removed Axios dependency by creating custom error handling
-   Improved documentation with more comprehensive project information
-   Enhanced error handling in API requests

### 1.0.8

-   Further dependency optimization
-   Code cleanup and performance improvements
-   Updated documentation

## Important Notes

-   The default login password is "MISIO"
-   The application requires a valid Google API key with YouTube Data API v3 enabled
