# Sports Betting API

A Node.js API that provides access to sports betting data using The Odds API. This API offers endpoints for retrieving sports information, odds, scores, events, and historical data.

## Base URL

```
https://your-project-name.vercel.app/api
```

## Available Endpoints

### 1. Get All Sports
Returns a list of all available sports.

```http
GET /api/sports
```

Example Response:
```json
[
    {
        "key": "soccer_epl",
        "group": "Soccer",
        "title": "EPL",
        "description": "English Premier League",
        "active": true,
        "has_outrights": false
    },
    {
        "key": "basketball_nba",
        "group": "Basketball",
        "title": "NBA",
        "description": "US Basketball",
        "active": true,
        "has_outrights": false
    }
]
```

### 2. Get Odds for a Sport
Retrieves odds for a specific sport.

```http
GET /api/sports/{sport_key}/odds
```

Query Parameters:
- `regions` (optional): Comma-separated list of regions (e.g., "us,uk")
- `markets` (optional): Comma-separated list of markets (e.g., "h2h,spreads,totals")

Example:
```http
GET /api/sports/soccer_epl/odds?regions=us,uk&markets=h2h,spreads
```

### 3. Get Scores for a Sport
Retrieves scores for a specific sport.

```http
GET /api/sports/{sport_key}/scores
```

Query Parameters:
- `date` (optional): Date in YYYY-MM-DD format

Example:
```http
GET /api/sports/soccer_epl/scores?date=2024-03-20
```

### 4. Get Events for a Sport
Retrieves events for a specific sport.

```http
GET /api/sports/{sport_key}/events
```

Example:
```http
GET /api/sports/soccer_uefa_champs_league/events
```

### 5. Get Odds for a Specific Event
Retrieves odds for a specific event.

```http
GET /api/sports/{sport_key}/events/{event_id}/odds
```

Query Parameters:
- `regions` (optional): Comma-separated list of regions
- `markets` (optional): Comma-separated list of markets

Example:
```http
GET /api/sports/soccer_epl/events/123456/odds?regions=us,uk&markets=h2h,spreads
```

### 6. Get Participants for a Sport
Retrieves participants (teams/players) for a specific sport.

```http
GET /api/sports/{sport_key}/participants
```

Example:
```http
GET /api/sports/soccer_epl/participants
```

### 7. Get Historical Odds
Retrieves historical odds for a sport.

```http
GET /api/historical/sports/{sport_key}/odds
```

Query Parameters:
- `date` (required): Date in YYYY-MM-DD format

Example:
```http
GET /api/historical/sports/soccer_epl/odds?date=2024-03-20
```

### 8. Get Historical Events
Retrieves historical events for a sport.

```http
GET /api/historical/sports/{sport_key}/events
```

Query Parameters:
- `date` (required): Date in YYYY-MM-DD format

Example:
```http
GET /api/historical/sports/soccer_epl/events?date=2024-03-20
```

### 9. Get Historical Odds for a Specific Event
Retrieves historical odds for a specific event.

```http
GET /api/historical/sports/{sport_key}/events/{event_id}/odds
```

Query Parameters:
- `date` (required): Date in YYYY-MM-DD format

Example:
```http
GET /api/historical/sports/soccer_epl/events/123456/odds?date=2024-03-20
```

## Available Sports Keys

Here are some commonly used sport keys:

- `soccer_epl` - English Premier League
- `soccer_uefa_champs_league` - UEFA Champions League
- `basketball_nba` - NBA
- `icehockey_nhl` - NHL
- `baseball_mlb` - MLB
- `americanfootball_nfl` - NFL

## Available Markets

Common betting markets:
- `h2h` - Head to Head
- `spreads` - Point Spreads
- `totals` - Over/Under
- `outrights` - Outright Winner

## Available Regions

Common regions:
- `us` - United States
- `uk` - United Kingdom
- `eu` - Europe
- `au` - Australia

## Error Handling

The API returns appropriate HTTP status codes and error messages in case of failures:

```json
{
    "error": "Error message",
    "message": "Detailed error description"
}
```

## Rate Limiting

Please be aware that The Odds API has rate limits. Check your API key's limits in your account dashboard.

## Environment Variables

Required environment variables:
- `ODDS_API_KEY`: Your The Odds API key

## Local Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your API key:
```
ODDS_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:4000` 