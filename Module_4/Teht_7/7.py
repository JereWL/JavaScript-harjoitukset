from flask import Flask, request, jsonify, send_from_directory
import requests as http_requests
import json
import os

app = Flask(__name__, static_folder=".", static_url_path="")

API_KEY = "79c93aaead7340bbb61f69b496a073a2"
GEOCODE_URL = "https://api.digitransit.fi/geocoding/v1/search"
ROUTING_URL = "https://api.digitransit.fi/routing/v2/hsl/gtfs/v1"

api_headers = {
    "digitransit-subscription-key": API_KEY,
    "Content-Type": "application/json"
}

def geocode(address):
    params = {
        "text": address,
        "size": 1,
        "digitransit-subscription-key": API_KEY
    }
    resp = http_requests.get(GEOCODE_URL, params=params)
    data = resp.json()
    if data["features"]:
        feature = data["features"][0]
        coords = feature["geometry"]["coordinates"]
        name = feature["properties"]["label"]
        return {"lon": coords[0], "lat": coords[1], "name": name}
    return None

def plan_route(from_coords, to_coords):
    query = {
        "query": """
        {
            planConnection(
                origin: {location: {coordinate: {latitude: %f, longitude: %f}}}
                destination: {location: {coordinate: {latitude: %f, longitude: %f}}}
                first: 3
            ) {
                edges {
                    node {
                        start
                        end
                        legs {
                            mode
                            startTime
                            endTime
                            duration
                            from { name lat lon }
                            to { name lat lon }
                            legGeometry { points }
                            trip {
                                routeShortName
                            }
                        }
                    }
                }
            }
        }
        """ % (from_coords["lat"], from_coords["lon"], to_coords["lat"], to_coords["lon"])
    }
    resp = http_requests.post(ROUTING_URL, headers=api_headers, json=query)
    return resp.json()

@app.route("/")
def index():
    return send_from_directory(".", "7.html")

@app.route("/api/route", methods=["POST"])
def get_route():
    data = request.get_json()
    address = data.get("address", "").strip()
    if not address:
        return jsonify({"error": "Osoite puuttuu"}), 400

    origin = geocode(address)
    destination = geocode("Karaportti 2, Espoo")

    if not origin:
        return jsonify({"error": f"Osoitetta '{address}' ei löytynyt!"}), 404
    if not destination:
        return jsonify({"error": "Kohteen 'Karaportti 2' osoitetta ei löytynyt!"}), 404

    result = plan_route(origin, destination)

    return jsonify({
        "origin": origin,
        "destination": destination,
        "routes": result.get("data", {})
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)