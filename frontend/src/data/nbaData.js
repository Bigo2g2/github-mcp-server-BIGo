// NBA Teams and Players Data
export const nbaTeams = {
    // Eastern Conference
    BOS: {
      teamName: 'Celtics',
      teamCity: 'Boston',
      conference: 'East',
      color: '#007A33',
      statistics: {
        fgPercentage: 48.2,
        threePtPercentage: 37.8,
        rebounds: 45.3,
        assists: 26.5,
        steals: 7.2,
        blocks: 5.8,
        fastBreakPoints: 15.2,
        pointsInPaint: 48.6
      },
      players: [
        { id: 1, name: 'Jayson Tatum', number: '0', position: 'SF', points: 27.2, rebounds: 8.5, assists: 4.8 },
        { id: 2, name: 'Jaylen Brown', number: '7', position: 'SG', points: 26.1, rebounds: 6.2, assists: 3.5 },
        { id: 3, name: 'Kristaps Porzingis', number: '8', position: 'C', points: 20.3, rebounds: 7.8, assists: 1.9 }
      ]
    },
    MIL: {
      teamName: 'Bucks',
      teamCity: 'Milwaukee',
      conference: 'East',
      color: '#00471B',
      statistics: {
        fgPercentage: 49.1,
        threePtPercentage: 38.2,
        rebounds: 44.8,
        assists: 25.8,
        steals: 6.9,
        blocks: 4.9,
        fastBreakPoints: 13.8,
        pointsInPaint: 50.2
      },
      players: [
        { id: 4, name: 'Giannis Antetokounmpo', number: '34', position: 'PF', points: 30.5, rebounds: 11.2, assists: 5.7 },
        { id: 5, name: 'Damian Lillard', number: '0', position: 'PG', points: 26.8, rebounds: 4.2, assists: 7.1 },
        { id: 6, name: 'Brook Lopez', number: '11', position: 'C', points: 12.5, rebounds: 5.3, assists: 1.4 }
      ]
    },
    PHI: {
      teamName: '76ers',
      teamCity: 'Philadelphia',
      conference: 'East',
      color: '#006BB6',
      statistics: {
        fgPercentage: 47.8,
        threePtPercentage: 36.9,
        rebounds: 43.5,
        assists: 24.9,
        steals: 7.5,
        blocks: 5.2,
        fastBreakPoints: 14.5,
        pointsInPaint: 47.8
      },
      players: [
        { id: 7, name: 'Joel Embiid', number: '21', position: 'C', points: 32.1, rebounds: 11.8, assists: 6.2 },
        { id: 8, name: 'Tyrese Maxey', number: '0', position: 'PG', points: 25.7, rebounds: 3.8, assists: 6.8 },
        { id: 9, name: 'Tobias Harris', number: '12', position: 'PF', points: 16.9, rebounds: 6.1, assists: 3.1 }
      ]
    },
  
    // Western Conference
    DEN: {
      teamName: 'Nuggets',
      teamCity: 'Denver',
      conference: 'West',
      color: '#0E2240',
      statistics: {
        fgPercentage: 48.8,
        threePtPercentage: 37.5,
        rebounds: 44.2,
        assists: 28.5,
        steals: 7.1,
        blocks: 4.8,
        fastBreakPoints: 13.2,
        pointsInPaint: 52.4
      },
      players: [
        { id: 10, name: 'Nikola Jokic', number: '15', position: 'C', points: 28.5, rebounds: 13.2, assists: 9.8 },
        { id: 11, name: 'Jamal Murray', number: '27', position: 'PG', points: 21.2, rebounds: 4.1, assists: 6.5 },
        { id: 12, name: 'Michael Porter Jr.', number: '1', position: 'SF', points: 16.8, rebounds: 7.2, assists: 1.8 }
      ]
    },
    GSW: {
      teamName: 'Warriors',
      teamCity: 'Golden State',
      conference: 'West',
      color: '#1D428A',
      statistics: {
        fgPercentage: 47.2,
        threePtPercentage: 38.5,
        rebounds: 43.8,
        assists: 27.9,
        steals: 7.8,
        blocks: 4.5,
        fastBreakPoints: 16.8,
        pointsInPaint: 46.2
      },
      players: [
        { id: 13, name: 'Stephen Curry', number: '30', position: 'PG', points: 29.2, rebounds: 4.5, assists: 5.8 },
        { id: 14, name: 'Klay Thompson', number: '11', position: 'SG', points: 18.5, rebounds: 3.8, assists: 2.4 },
        { id: 15, name: 'Draymond Green', number: '23', position: 'PF', points: 8.8, rebounds: 7.2, assists: 6.8 }
      ]
    },
    LAL: {
      teamName: 'Lakers',
      teamCity: 'Los Angeles',
      conference: 'West',
      color: '#552583',
      statistics: {
        fgPercentage: 48.5,
        threePtPercentage: 36.2,
        rebounds: 43.9,
        assists: 26.2,
        steals: 7.4,
        blocks: 5.5,
        fastBreakPoints: 15.8,
        pointsInPaint: 51.8
      },
      players: [
        { id: 16, name: 'LeBron James', number: '23', position: 'SF', points: 25.5, rebounds: 7.8, assists: 7.2 },
        { id: 17, name: 'Anthony Davis', number: '3', position: 'PF', points: 24.8, rebounds: 12.2, assists: 3.5 },
        { id: 18, name: "D'Angelo Russell", number: '1', position: 'PG', points: 17.2, rebounds: 3.2, assists: 6.8 }
      ]
    }
  };
  
  // Helper function to get random teams for demo games
  export const getRandomTeams = () => {
    const teams = Object.values(nbaTeams);
    const homeIndex = Math.floor(Math.random() * teams.length);
    let awayIndex;
    do {
      awayIndex = Math.floor(Math.random() * teams.length);
    } while (awayIndex === homeIndex);
  
    return {
      homeTeam: teams[homeIndex],
      awayTeam: teams[awayIndex]
    };
  };
  
  // Helper function to generate mock game data
  export const generateMockGame = () => {
    const { homeTeam, awayTeam } = getRandomTeams();
    const homeScore = Math.floor(Math.random() * 40) + 80;
    const awayScore = Math.floor(Math.random() * 40) + 80;
  
    const quarters = [
      { period: 1, homeScore: Math.floor(homeScore * 0.25), awayScore: Math.floor(awayScore * 0.25) },
      { period: 2, homeScore: Math.floor(homeScore * 0.25), awayScore: Math.floor(awayScore * 0.25) },
      { period: 3, homeScore: Math.floor(homeScore * 0.25), awayScore: Math.floor(awayScore * 0.25) },
      { period: 4, homeScore: Math.floor(homeScore * 0.25), awayScore: Math.floor(awayScore * 0.25) }
    ];
  
    const gameLeaders = [
      { ...homeTeam.players[0], team: homeTeam.teamName },
      { ...awayTeam.players[0], team: awayTeam.teamName }
    ];
  
    return {
      gameId: Math.random().toString(36).substr(2, 9),
      homeTeam: { ...homeTeam, score: homeScore },
      awayTeam: { ...awayTeam, score: awayScore },
      quarters,
      gameLeaders,
      gameStatusText: 'In Progress',
      gameTimeLocal: new Date().toLocaleTimeString()
    };
  };