export const teamInfo = {
  ATL: { 
    color: '#E03A3E', 
    logo: 'https://cdn.nba.com/logos/nba/1610612737/global/L/logo.svg',
    name: 'Hawks'
  },
  BOS: { 
    color: '#007A33', 
    logo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
    name: 'Celtics'
  },
  BKN: { 
    color: '#000000', 
    logo: 'https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg',
    name: 'Nets'
  },
  CHA: { 
    color: '#1D1160', 
    logo: 'https://cdn.nba.com/logos/nba/1610612766/global/L/logo.svg',
    name: 'Hornets'
  },
  CHI: { 
    color: '#CE1141', 
    logo: 'https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg',
    name: 'Bulls'
  },
  CLE: { 
    color: '#860038', 
    logo: 'https://cdn.nba.com/logos/nba/1610612739/global/L/logo.svg',
    name: 'Cavaliers'
  },
  DAL: { 
    color: '#00538C', 
    logo: 'https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg',
    name: 'Mavericks'
  },
  DEN: { 
    color: '#0E2240', 
    logo: 'https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg',
    name: 'Nuggets'
  },
  DET: { 
    color: '#C8102E', 
    logo: 'https://cdn.nba.com/logos/nba/1610612765/global/L/logo.svg',
    name: 'Pistons'
  },
  GSW: { 
    color: '#1D428A', 
    logo: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg',
    name: 'Warriors'
  },
  HOU: { 
    color: '#CE1141', 
    logo: 'https://cdn.nba.com/logos/nba/1610612745/global/L/logo.svg',
    name: 'Rockets'
  },
  IND: { 
    color: '#002D62', 
    logo: 'https://cdn.nba.com/logos/nba/1610612754/global/L/logo.svg',
    name: 'Pacers'
  },
  LAC: { 
    color: '#C8102E', 
    logo: 'https://cdn.nba.com/logos/nba/1610612746/global/L/logo.svg',
    name: 'Clippers'
  },
  LAL: { 
    color: '#552583', 
    logo: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg',
    name: 'Lakers'
  },
  MEM: { 
    color: '#5D76A9', 
    logo: 'https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg',
    name: 'Grizzlies'
  },
  MIA: { 
    color: '#98002E', 
    logo: 'https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg',
    name: 'Heat'
  },
  MIL: { 
    color: '#00471B', 
    logo: 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg',
    name: 'Bucks'
  },
  MIN: { 
    color: '#0C2340', 
    logo: 'https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg',
    name: 'Timberwolves'
  },
  NOP: { 
    color: '#0C2340', 
    logo: 'https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg',
    name: 'Pelicans'
  },
  NYK: { 
    color: '#006BB6', 
    logo: 'https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg',
    name: 'Knicks'
  },
  OKC: { 
    color: '#007AC1', 
    logo: 'https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg',
    name: 'Thunder'
  },
  ORL: { 
    color: '#0077C0', 
    logo: 'https://cdn.nba.com/logos/nba/1610612753/global/L/logo.svg',
    name: 'Magic'
  },
  PHI: { 
    color: '#006BB6', 
    logo: 'https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg',
    name: '76ers'
  },
  PHX: { 
    color: '#1D1160', 
    logo: 'https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg',
    name: 'Suns'
  },
  POR: { 
    color: '#E03A3E', 
    logo: 'https://cdn.nba.com/logos/nba/1610612757/global/L/logo.svg',
    name: 'Trail Blazers'
  },
  SAC: { 
    color: '#5A2D81', 
    logo: 'https://cdn.nba.com/logos/nba/1610612758/global/L/logo.svg',
    name: 'Kings'
  },
  SAS: { 
    color: '#C4CED4', 
    logo: 'https://cdn.nba.com/logos/nba/1610612759/global/L/logo.svg',
    name: 'Spurs'
  },
  TOR: { 
    color: '#CE1141', 
    logo: 'https://cdn.nba.com/logos/nba/1610612761/global/L/logo.svg',
    name: 'Raptors'
  },
  UTA: { 
    color: '#002B5C', 
    logo: 'https://cdn.nba.com/logos/nba/1610612762/global/L/logo.svg',
    name: 'Jazz'
  },
  WAS: { 
    color: '#002B5C', 
    logo: 'https://cdn.nba.com/logos/nba/1610612764/global/L/logo.svg',
    name: 'Wizards'
  }
};

// Helper functions
export const getTeamInfo = (teamCode) => {
  return teamInfo[teamCode] || {
    color: '#000000',
    logo: 'https://cdn.nba.com/logos/nba/fallback/fallback.svg',
    name: 'Unknown Team'
  };
};

export const getTeamColors = (teamCode) => {
  const team = getTeamInfo(teamCode);
  return {
    primary: team.color,
    secondary: `${team.color}99`, // 60% opacity
    tertiary: `${team.color}66`   // 40% opacity
  };
};