# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `rec-engine/`:

```bash
npm start        # Dev server at http://localhost:3000
npm run build    # Production build
npm test         # Jest in watch mode
```

The backend (Flask, separate repo) must be running at `http://127.0.0.1:8000` for API calls to work.

## Architecture

Rec-Engine is a React SPA that recommends restaurants, movies, and songs based on user preferences. It's fully modal-driven: the main page (`interactive.js`) renders a 3D Spline scene with clickable hotspots that open cascading modal workflows.

**Global state** is minimal — the user's email (from Google OAuth) lives in `App.js` state and is passed down as props. Geolocation (lat/lng) is captured in `interactive.js` and passed to location-dependent modals.

**Routing** (`App.js`):
- `/` — Main interactive page with 3D scene
- `/about` — Team page
- `/pastRecs` — Past recommendations

**Modal flows** (each step is a separate component):
- Restaurants: cuisine select → restaurant list → detail/similar
- Songs: genre select → artist select → song list
- Movies: movie search → recommendations
- Past Recs: shown directly in a modal

## Key Files

| File | Role |
|------|------|
| `src/App.js` | Router setup, email state, renders Navbar + routes |
| `src/components/interactive.js` | Main page; Spline scene, geolocation, modal triggers |
| `src/components/Navbar/index.js` | Google OAuth login/logout |
| `src/components/Restaurant/modalRestaurant.js` | Step 1 of restaurant flow — fetches cuisines by location |
| `src/components/pastRecs.js` | Past recommendations (restaurants + songs) by user email |

## Backend API

Base URL: `http://127.0.0.1:8000`

**Restaurants**
- `GET /restaurant/all_cusine?longitude=&latitude=` — cuisines near user
- `GET /restaurant/similar?rest_id=&longitude=&latitude=` — similar restaurants
- `GET /restaurant/get_rest?rest_id=` — restaurant details
- `GET /restaurant/insert?rest_id=&email=` — save a recommendation
- `GET /restaurant/get_past_recs?email=&longitude=&latitude=` — past recs

**Songs**
- `GET /song/get_allGenre` — all genres
- `GET /song/get_artist_by_genre?genre=` — artists for a genre
- `GET /song/get_past_song?email=` — user's past songs

**Movies**
- `GET /movie/get_MovieName` — all movies

## Auth

Google OAuth via `react-google-login`. The Client ID is hardcoded in `Navbar/index.js`. New test users must be added in Google Cloud Console (the OAuth app is in test mode).

## Tech Stack

React 18, React Router v6, React Bootstrap 5, Axios, Styled Components, react-spline (3D scenes), react-google-login.
