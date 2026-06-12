import requests

def geocode(place: str):
    url = "https://geocoding-api.open-meteo.com/v1/search"
    r = requests.get(url, params={"name": place, "count": 1, "language": "en", "format": "json"}, timeout=15)
    r.raise_for_status()
    data = r.json()
    results = data.get("results") or []
    if not results:
        raise SystemExit(f"No results found for: {place}")
    return results[0]["latitude"], results[0]["longitude"], results[0].get("name", place), results[0].get("country", "")

def current_temp_c(lat: float, lon: float):
    url = "https://api.open-meteo.com/v1/forecast"
    r = requests.get(
        url,
        params={
            "latitude": lat,
            "longitude": lon,
            "current": "temperature_2m",
            "temperature_unit": "celsius",
        },
        timeout=15,
    )
    r.raise_for_status()
    data = r.json()
    current = data.get("current") or {}
    return current.get("temperature_2m"), current.get("time")

def main():
    place = input("Enter a location (e.g., 'Richmond, VA' or 'Virginia Beach'): ").strip()
    lat, lon, name, country = geocode(place)
    temp_c, obs_time = current_temp_c(lat, lon)

    if temp_c is None:
        raise SystemExit("Temperature not available from API response.")

    where = f"{name}, {country}".strip().rstrip(",")
    print(f"Current temperature in {where}: {temp_c}°C (as of {obs_time})")

if __name__ == "__main__":
    main()
