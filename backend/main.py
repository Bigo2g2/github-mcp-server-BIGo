from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from datetime import date, timedelta
import httpx # type: ignore
import asyncio

app = FastAPI()

app.add_middleware(
   CORSMiddleware,
   allow_origins=["*"],
   allow_credentials=True,
   allow_methods=["*"], 
   allow_headers=["*"],
)

async def fetch_teams():
   """Fetch all NBA teams from balldontlie and store them in app state."""
   url = "https://www.balldontlie.io/api/v1/teams"
   async with httpx.AsyncClient() as client:
       try:
           resp = await client.get(url)
           resp.raise_for_status()
           return {team["id"]: team for team in resp.json().get("data", [])}
       except httpx.HTTPError as e:
           print(f"HTTP error fetching teams: {e}")
           print(f"Response content: {resp.content}")
           return {}
       except Exception as e:
           print(f"Error fetching teams: {e}")
           return {}

async def fetch_all_players():
   """Fetch all players from balldontlie, handling pagination."""
   players = {}
   page = 1
   per_page = 100  # max allowed by balldontlie
   async with httpx.AsyncClient() as client:
       while True:
           try:
               url = f"https://www.balldontlie.io/api/v1/players?per_page={per_page}&page={page}"
               resp = await client.get(url)
               resp.raise_for_status()
               data = resp.json()
               for player in data.get("data", []):
                   players[player["id"]] = player
               # Check if there are more pages
               meta = data.get("meta", {})
               if meta.get("next_page") is None:
                   break
               page += 1
           except Exception as e:
               print(f"Error fetching players page {page}: {e}")
               break
   return players

@app.on_event("startup")
async def startup_event():
   try:
       app.state.teams = await fetch_teams()
       app.state.players = await fetch_all_players()
   except Exception as e:
       print(f"Startup error: {e}")
       # Initialize with empty data rather than failing
       app.state.teams = {}
       app.state.players = {}

@app.get("/api/standings")
async def get_standings():
    """Fetch team standings"""
    sample_standings = [
        {
            "team_id": 1,
            "team_name": "Los Angeles Lakers",
            "conference": "Western",
            "division": "Pacific",
            "games_played": 82,
            "wins": 48,
            "losses": 34,
            "win_percentage": 0.585,
            "home_record": "28-13",
            "away_record": "20-21",
            "streak": "W2"
        },
        {
            "team_id": 2, 
            "team_name": "Golden State Warriors",
            "conference": "Western",
            "division": "Pacific",
            "games_played": 82,
            "wins": 45,
            "losses": 37,
            "win_percentage": 0.549,
            "home_record": "26-15",
            "away_record": "19-22",
            "streak": "L1"
        },
        {
            "team_id": 3,
            "team_name": "Los Angeles Clippers",
            "conference": "Western",
            "division": "Pacific",
            "games_played": 82,
            "wins": 44,
            "losses": 38,
            "win_percentage": 0.537,
            "home_record": "24-17",
            "away_record": "20-21",
            "streak": "W3"
        }
    ]
    return sample_standings

@app.get("/api/games/all")
async def get_all_games():
    """Fetch past, today's, and upcoming games."""
    today = date.today().isoformat()
    start_date = (date.today() - timedelta(days=7)).isoformat()  # Past week
    end_date = (date.today() + timedelta(days=7)).isoformat()    # Next week

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                f"https://www.balldontlie.io/api/v1/games",
                params={"start_date": start_date, "end_date": end_date}
            )
            response.raise_for_status()
            return response.json().get("data", [])
        except Exception as e:
            print(f"Error fetching games: {e}")
            return []