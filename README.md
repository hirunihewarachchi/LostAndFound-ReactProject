# Lost & Found - React + TypeScript (Course Work)

This is a minimal, ready-to-run React + TypeScript single-page application implementing a Lost & Found system for an educational institute.

## Features
- TypeScript + React
- Simple authentication (localStorage) with role support (`admin`, `user`)
- JWT-like token (mocked) issued on signup/signin (stored in memory/localStorage)
- Role-based routes (only admin can add or delete items)
- CRUD-like operations stored in `localStorage` (no backend required)
- Bootstrap for styling

## How to run
1. Make sure you have Node.js (14+) and npm installed.
2. Extract the project and in the project root run:
   ```bash
   npm install
   npm start
   ```
3. The app will open at `http://localhost:3000`.

## Notes
- This project uses `localStorage` as a mock backend so you can test signups, signins, and item management without a server.
- For a production-ready app, replace the mock services with real API endpoints and secure JWT handling.

Enjoy!


## Using Yarn (steps)

If you prefer `yarn` instead of `npm`, here's how to install and build the project with yarn:

1. Install Yarn (if you don't have it):
   - npm: `npm install -g yarn`
   - or follow instructions at https://yarnpkg.com/

2. Install dependencies:
```
yarn install
```

3. Run in development:
```
yarn start
```

4. Build production bundle:
```
yarn build
```

**Note:** If you hit dependency resolution issues with `react-scripts@5` and newer TypeScript versions, use the prepared `package.json` (TypeScript pinned to ^4.9.5) included in this archive. If you prefer modern TypeScript (>=5) consider switching to Vite — tell me and I can convert the project to Vite for you.
