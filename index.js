require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 4000;

// Base URL for the-odds-api
const ODDS_API_BASE_URL = 'https://api.the-odds-api.com/v4';
const API_KEY = process.env.ODDS_API_KEY || "999ec718191c0fa6a8f5cf74fb4c8c48";

// Helper function to handle API calls
const makeApiCall = async (endpoint, params = {}) => {
    try {
        const response = await axios.get(`${ODDS_API_BASE_URL}${endpoint}`, {
            params: {
                apiKey: API_KEY,
                ...params
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

// Get all sports
// Example: GET /api/sports
app.get('/api/sports', async (req, res) => {
    try {
        const data = await makeApiCall('/sports');
        res.json(data);
    } catch (error) {
        console.error('Error fetching sports:', error.message);
        res.status(500).json({ error: 'Failed to fetch sports', message: error.message });
    }
});

// Get odds for a specific sport
// Example: GET /api/sports/soccer_epl/odds?regions=us,uk&markets=h2h,spreads
app.get('/api/sports/:sportKey/odds', async (req, res) => {
    try {
        const { sportKey } = req.params;
        const { regions, markets } = req.query;
        const data = await makeApiCall(`/sports/${sportKey}/odds`, { regions, markets });
        res.json(data);
    } catch (error) {
        console.error('Error fetching odds:', error.message);
        res.status(500).json({ error: 'Failed to fetch odds', message: error.message });
    }
});

// Get scores for a specific sport
// Example: GET /api/sports/soccer_epl/scores?date=2024-03-20
app.get('/api/sports/:sportKey/scores', async (req, res) => {
    try {
        const { sportKey } = req.params;
        const { date } = req.query;
        const data = await makeApiCall(`/sports/${sportKey}/scores`, { date });
        res.json(data);
    } catch (error) {
        console.error('Error fetching scores:', error.message);
        res.status(500).json({ error: 'Failed to fetch scores', message: error.message });
    }
});

// Get events for a specific sport
// Example: GET /api/sports/soccer_uefa_champs_league/events
app.get('/api/sports/:sportKey/events', async (req, res) => {
    try {
        const { sportKey } = req.params;
        const data = await makeApiCall(`/sports/${sportKey}/events`);
        res.json(data);
    } catch (error) {
        console.error('Error fetching events:', error.message);
        res.status(500).json({ error: 'Failed to fetch events', message: error.message });
    }
});

// Get odds for a specific event
// Example: GET /api/sports/soccer_epl/events/123456/odds?regions=us,uk&markets=h2h,spreads
app.get('/api/sports/:sportKey/events/:eventId/odds', async (req, res) => {
    try {
        const { sportKey, eventId } = req.params;
        const { regions, markets } = req.query;
        const data = await makeApiCall(`/sports/${sportKey}/events/${eventId}/odds`, { regions, markets });
        res.json(data);
    } catch (error) {
        console.error('Error fetching event odds:', error.message);
        res.status(500).json({ error: 'Failed to fetch event odds', message: error.message });
    }
});

// Get participants for a specific sport
// Example: GET /api/sports/soccer_epl/participants
app.get('/api/sports/:sportKey/participants', async (req, res) => {
    try {
        const { sportKey } = req.params;
        const data = await makeApiCall(`/sports/${sportKey}/participants`);
        res.json(data);
    } catch (error) {
        console.error('Error fetching participants:', error.message);
        res.status(500).json({ error: 'Failed to fetch participants', message: error.message });
    }
});

// Get historical odds for a sport
// Example: GET /api/historical/sports/soccer_epl/odds?date=2024-03-20
app.get('/api/historical/sports/:sportKey/odds', async (req, res) => {
    try {
        const { sportKey } = req.params;
        const { date } = req.query;
        const data = await makeApiCall(`/historical/sports/${sportKey}/odds`, { date });
        res.json(data);
    } catch (error) {
        console.error('Error fetching historical odds:', error.message);
        res.status(500).json({ error: 'Failed to fetch historical odds', message: error.message });
    }
});

// Get historical events for a sport
// Example: GET /api/historical/sports/soccer_epl/events?date=2024-03-20
app.get('/api/historical/sports/:sportKey/events', async (req, res) => {
    try {
        const { sportKey } = req.params;
        const { date } = req.query;
        const data = await makeApiCall(`/historical/sports/${sportKey}/events`, { date });
        res.json(data);
    } catch (error) {
        console.error('Error fetching historical events:', error.message);
        res.status(500).json({ error: 'Failed to fetch historical events', message: error.message });
    }
});

// Get historical odds for a specific event
// Example: GET /api/historical/sports/soccer_epl/events/123456/odds?date=2024-03-20
app.get('/api/historical/sports/:sportKey/events/:eventId/odds', async (req, res) => {
    try {
        const { sportKey, eventId } = req.params;
        const { date } = req.query;
        const data = await makeApiCall(`/historical/sports/${sportKey}/events/${eventId}/odds`, { date });
        res.json(data);
    } catch (error) {
        console.error('Error fetching historical event odds:', error.message);
        res.status(500).json({ error: 'Failed to fetch historical event odds', message: error.message });
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

// Export the Express API
module.exports = app;
