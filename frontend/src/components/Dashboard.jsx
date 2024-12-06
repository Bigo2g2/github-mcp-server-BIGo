import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { RefreshCw, Activity, TrendingUp, TrendingDown } from 'lucide-react';

const API_URL = 'http://127.0.0.1:8000/api';

const getTeamColor = (teamName) => {
  const teamColors = {
    'Lakers': '#552583',
    'Celtics': '#008348',
    'Warriors': '#1D428A',
    'Suns': '#1D1160',
    'Bucks': '#00471B',
    'Bulls': '#CE1141',
    'Cavaliers': '#860038',
    'Clippers': '#C8102E',
    'Grizzlies': '#5D76A9',
    'Hawks': '#E03A3E',
    'Heat': '#98002E',
    'Hornets': '#1D1160',
    'Jazz': '#002B5C',
    'Kings': '#5A2D81',
    'Knicks': '#006BB6',
    'Magic': '#0077C0',
    'Mavericks': '#00538C',
    'Nets': '#000000',
    'Nuggets': '#0E2240',
    '76ers': '#006BB6',
    'Pelicans': '#0C2340',
    'Pistons': '#C8102E',
    'Raptors': '#CE1141',
    'Rockets': '#CE1141',
    'Spurs': '#C4CED4',
    'Thunder': '#007AC1',
    'Timberwolves': '#0C2340',
    'Trail Blazers': '#E03A3E',
    'Wizards': '#002B5C'
  };
  return teamColors[teamName] || '#000000';
};

const GameCard = ({ game }) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const gameDate = new Date(game.date);
  const isPastGame = gameDate < new Date();

  const homeTeamColor = getTeamColor(game.home_team?.name);
  const awayTeamColor = getTeamColor(game.visitor_team?.name);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <div className="text-sm text-gray-500 mb-3">
          {gameDate.toLocaleDateString(undefined, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-3xl font-bold" style={{ color: awayTeamColor }}>
              {game.visitor_team_score || '-'}
            </p>
            <p className="text-lg font-semibold">{game.visitor_team?.city}</p>
            <p className="text-gray-600">{game.visitor_team?.name}</p>
          </div>
          <div className="text-center px-4">
            <div className="px-4 py-2 rounded-full bg-gray-100">
              <p className="font-semibold text-gray-800">{game.status}</p>
              <p className="text-sm text-gray-500">
                {gameDate.toLocaleTimeString(undefined, { 
                  hour: 'numeric', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold" style={{ color: homeTeamColor }}>
              {game.home_team_score || '-'}
            </p>
            <p className="text-lg font-semibold">{game.home_team?.city}</p>
            <p className="text-gray-600">{game.home_team?.name}</p>
          </div>
        </div>
      </div>

      {isPastGame && (
        <div className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Final Score</span>
              <span className="font-semibold">
                {game.visitor_team_score} - {game.home_team_score}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/games/all`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('Fetched games:', data);
      setGames(data);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching games:', err);
      setError('Failed to load games. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
    const interval = setInterval(fetchGames, 30000);
    return () => clearInterval(interval);
  }, []);

  const categorizedGames = games.reduce((acc, game) => {
    const gameDate = new Date(game.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (gameDate < today) {
      acc.past.unshift(game);
    } else if (gameDate > today) {
      acc.upcoming.push(game);
    } else {
      acc.today.push(game);
    }
    return acc;
  }, { past: [], today: [], upcoming: [] });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">NBA Games</h1>
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={fetchGames}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        {error && (
          <div className="mb-8 text-center text-red-600 p-4 bg-red-50 rounded-lg">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {categorizedGames.today.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Today's Games</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categorizedGames.today.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}

        {categorizedGames.upcoming.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Upcoming Games</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categorizedGames.upcoming.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}

        {categorizedGames.past.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Recent Games</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categorizedGames.past.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}

        {!games.length && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-xl text-gray-600">No games found</p>
            <p className="text-gray-500 mt-2">Check back later for updates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;