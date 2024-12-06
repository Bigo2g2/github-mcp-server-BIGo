@app.get("/api/standings")
async def get_standings():
    """Fetch team standings"""
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(f"https://www.balldontlie.io/api/v1/games")
            resp.raise_for_status()
            data = resp.json() 
            standings = []
            for team_id in app.state.teams:
                team = app.state.teams[team_id]
                games = [game for game in data["data"] if game["home_team"]["id"] == team_id or game["visitor_team"]["id"] == team_id]
                wins = len([g for g in games if (g["home_team"]["id"] == team_id and g["home_team_score"] > g["visitor_team_score"]) or (g["visitor_team"]["id"] == team_id and g["visitor_team_score"] > g["home_team_score"])])
                losses = len(games) - wins
                standings.append({
                    "team_id": team_id,
                    "team_name": team["full_name"],
                    "conference": team["conference"],
                    "division": team["division"], 
                    "games_played": len(games),
                    "wins": wins,
                    "losses": losses,
                    "win_percentage": round(wins / len(games), 3) if games else 0,
                    "home_record": f"{len([g for g in games if g['home_team']['id'] == team_id and g['home_team_score'] > g['visitor_team_score']])} - {len([g for g in games if g['home_team']['id'] == team_id and g['home_team_score'] &lt; g['visitor_team_score']])}",
                    "road_record": f"{len([g for g in games if g['visitor_team']['id'] == team_id and g['visitor_team_score'] > g['home_team_score']])} - {len([g for g in games if g['visitor_team']['id'] == team_id and g['visitor_team_score'] &lt; g['home_team_score']])}"  
                })
            return sorted(standings, key=lambda x: x["win_percentage"], reverse=True)
        except Exception as e:
            print(f"Error fetching standings: {e}")
            return []
