const input = document.getElementById('addressInput');
const btn = document.getElementById('searchBtn');
const results = document.getElementById('results');
const mapDiv = document.getElementById('map');

let map = null;
let routeLayers = [];
let allRouteData = [];

const modeColors = {
    WALK: '#888', BUS: '#007ac9', TRAM: '#00985f',
    RAIL: '#8c4799', SUBWAY: '#ff6319', FERRY: '#00b9e4'
};

// Google encoded polyline decoder
function decodePolyline(encoded) {
    const points = [];
    let index = 0, lat = 0, lng = 0;
    while (index < encoded.length) {
        let b, shift = 0, result = 0;
        do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
        lat += (result & 1) ? ~(result >> 1) : (result >> 1);
        shift = 0; result = 0;
        do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
        lng += (result & 1) ? ~(result >> 1) : (result >> 1);
        points.push([lat / 1e5, lng / 1e5]);
    }
    return points;
}

function initMap() {
    if (!map) {
        mapDiv.style.display = 'block';
        map = L.map('map').setView([60.17, 24.94], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
    }
}

function clearMapLayers() {
    routeLayers.forEach(layer => map.removeLayer(layer));
    routeLayers = [];
}

function drawRoute(routeIndex) {
    clearMapLayers();
    const node = allRouteData[routeIndex];
    const bounds = L.latLngBounds();

    node.legs.forEach(leg => {
        const coords = decodePolyline(leg.legGeometry.points);
        const color = modeColors[leg.mode] || '#333';
        const line = L.polyline(coords, {
            color, weight: leg.mode === 'WALK' ? 4 : 6,
            opacity: 0.85,
            dashArray: leg.mode === 'WALK' ? '8, 8' : null
        }).addTo(map);
        routeLayers.push(line);
        coords.forEach(c => bounds.extend(c));
    });

    // Origin marker
    const first = node.legs[0];
    const originMarker = L.marker([first.from.lat, first.from.lon]).addTo(map)
        .bindPopup(`<b>Lähtö:</b> ${first.from.name}`);
    routeLayers.push(originMarker);

    // Destination marker
    const last = node.legs[node.legs.length - 1];
    const destMarker = L.marker([last.to.lat, last.to.lon]).addTo(map)
        .bindPopup(`<b>Kohde:</b> ${last.to.name}`);
    routeLayers.push(destMarker);

    map.fitBounds(bounds, { padding: [40, 40] });

    // Highlight active card
    document.querySelectorAll('.route-card').forEach((el, i) => {
        el.classList.toggle('active', i === routeIndex);
    });
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchRoute();
});

async function searchRoute() {
    const address = input.value.trim();
    if (!address) return;

    btn.disabled = true;
    results.innerHTML = '<div class="loading">Haetaan reittejä...</div>';
    allRouteData = [];

    try {
        const resp = await fetch('/api/route', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address })
        });
        const data = await resp.json();

        if (!resp.ok) {
            results.innerHTML = `<div class="error">${data.error}</div>`;
            return;
        }

        let html = '';

        html += `
            <div class="info-row">
                <div><span class="label">Lähtö</span><br><span class="value">${data.origin.name}</span></div>
                <div><span class="label">Kohde</span><br><span class="value">${data.destination.name}</span></div>
            </div>`;

        const edges = data.routes?.planConnection?.edges || [];
        if (edges.length === 0) {
            html += '<div class="error">Reittejä ei löytynyt</div>';
        }

        edges.forEach((edge, i) => {
            const node = edge.node;
            allRouteData.push(node);
            const startTime = new Date(node.start).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
            const endTime = new Date(node.end).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
            const totalMin = node.legs.reduce((sum, l) => sum + l.duration, 0);
            const totalMinutes = Math.round(totalMin / 60);

            html += `<div class="route-card" onclick="drawRoute(${i})">`;
            html += `<div class="route-header">
                <h3>Reitti ${i + 1}</h3>
                <span class="route-time">${startTime} → ${endTime} (${totalMinutes} min)</span>
            </div>`;

            node.legs.forEach(leg => {
                const mode = leg.mode;
                const route = leg.trip?.routeShortName || '';
                const label = route ? `${mode} ${route}` : mode;
                const duration = Math.round(leg.duration / 60);

                html += `<div class="leg">
                    <span class="mode-badge mode-${mode}">${label}</span>
                    <div class="leg-details">
                        <div class="leg-stops">${leg.from.name} <span class="arrow">→</span> ${leg.to.name}</div>
                        <div class="leg-duration">${duration} min</div>
                    </div>
                </div>`;
            });

            html += `</div>`;
        });

        results.innerHTML = html;

        // Show map and draw first route
        if (allRouteData.length > 0) {
            initMap();
            drawRoute(0);
        }

    } catch (err) {
        results.innerHTML = `<div class="error">Virhe: ${err.message}</div>`;
    } finally {
        btn.disabled = false;
    }
}