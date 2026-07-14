const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach((item) => {
        const top = item.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            item.classList.add("active");
        }
        else{
             item.classList.remove("active");
        }
        
    });
});

// ============================================================
 
const loading = document.querySelector(".loading");
const find    = document.querySelector(".find");
const staticEl = document.querySelector(".static"); // BUG FIX: 'static' reserved word hai JS mein
 
find.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
            doFetch(latitude, longitude); // location milne ke BAAD fetch karo
             const foot=document.querySelector(".foot")
             console.log(foot)
              foot.scrollIntoView({
               behavior:"smooth"
                })
             staticEl.style.display = "none";
             loading.style.display  = "flex";
 

        },
        (error) => {
            loading.style.display = "none";
            staticEl.style.display = "block";

            const title="Location Required"
            const info="Please allow location access to find nearby mosques."
            const warning="📍"
            popup(title,info,warning)
            console.error("Geolocation error:", error);
        }
    );
});
 
// ── FETCH FUNCTION ───────────────────────────────────────────
function doFetch(latitude, longitude) {
    const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value;
 
    fetch("/masjid/api/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf,
        },
        body: JSON.stringify({ latitude, longitude }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("API response:", data);
            loading.style.display = "none";
            renderMosques(data, latitude, longitude);
        })
        .catch((err) => {
            loading.style.display = "none";
            const title="Something Went Wrong"
            const info="We couldn't load the requested data.Please try again"
            const warning="⚠️"
            popup(title,info,warning)
            console.error("Fetch error:", err);
        });
}
 
// ── RENDER FUNCTION ──────────────────────────────────────────
function renderMosques(data, latitude, longitude) {
    const mosquebody = document.querySelector(".mosquebody");
 
    // BUG FIX 2: pehle purana content clear karo — duplicate na banein
    mosquebody.innerHTML = "";
 
    if (!data.mosques || data.mosques.length === 0) {
        staticEl.style.display = "flex";
        staticEl.innerText="We couldn't find any nearby mosques.Please try another location or increase the search radius."
        return;
    }
 
    // ── TOP FEATURED CARD ────────────────────────────────────
    const firstMosque = data.mosques[0];
 
    const ranking = document.createElement("div");
    ranking.classList.add("ranking");
 
    const top1 = document.createElement("div");
    top1.classList.add("top1");
 
    const tag = document.createElement("div");
    tag.classList.add("tag");
    tag.innerText = "⭐ Most Nearest Mosque";
 
    const masjid_name = document.createElement("div");
    masjid_name.classList.add("masjid-name");
    masjid_name.innerText = firstMosque.name;
 
    const location = document.createElement("div");
    location.classList.add("location");
    location.innerText = firstMosque.location;
 
    const svg = document.createElement("div");
    svg.classList.add("svg");
    svg.innerHTML = `
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        <path d="M50 105 Q50 70 80 62 Q110 70 110 105 Z"
              fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.6)" stroke-width="1"/>
        <rect x="56" y="105" width="48" height="30" rx="2"
              fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.4)" stroke-width="0.8"/>
        <rect x="36" y="86" width="10" height="36" rx="1"
              fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.4)" stroke-width="0.8"/>
        <path d="M36 86 Q41 76 46 86Z"
              fill="rgba(201,168,76,0.2)" stroke="rgba(201,168,76,0.5)" stroke-width="0.8"/>
        <line x1="41" y1="75" x2="41" y2="68" stroke="rgba(201,168,76,0.7)" stroke-width="1"/>
        <rect x="114" y="86" width="10" height="36" rx="1"
              fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.4)" stroke-width="0.8"/>
        <path d="M114 86 Q119 76 124 86Z"
              fill="rgba(201,168,76,0.2)" stroke="rgba(201,168,76,0.5)" stroke-width="0.8"/>
        <line x1="119" y1="75" x2="119" y2="68" stroke="rgba(201,168,76,0.7)" stroke-width="1"/>
        <path d="M73 135 L73 116 Q80 110 87 116 L87 135Z"
              fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.35)" stroke-width="0.8"/>
        <path d="M80 57 Q83 50 80 45 Q82 49 87 48 Q82 51 80 57Z" fill="rgba(201,168,76,0.7)"/>
        <circle cx="80" cy="80" r="55" stroke="rgba(201,168,76,0.08)" stroke-width="0.8"/>
      </svg>`;
 
    const timing = document.createElement("div");
    timing.className = "timing";
    buildPrayerRows(timing);
 
    top1.appendChild(tag);
    top1.appendChild(masjid_name);
    top1.appendChild(location);
    top1.appendChild(timing);
 
    ranking.appendChild(top1);
    ranking.appendChild(svg);
    mosquebody.appendChild(ranking);
 
    // ── HEADER ───────────────────────────────────────────────
    const headers = document.createElement("div");
    headers.classList.add("headers");
 
    const mosquecity = document.createElement("h2");
    mosquecity.classList.add("mosquecity");
    mosquecity.innerText = "All Nearest Mosques";
 
    const showing = document.createElement("p");
    showing.classList.add("showing");
    showing.innerText = `Showing ${data.mosques.length} mosques`;
 
    headers.appendChild(mosquecity);
    headers.appendChild(showing);
    mosquebody.appendChild(headers);
 
    // BUG FIX 3: mosquebox ek baar banao — loop ke BAHAR
    // Pehle loop ke andar querySelector(".mosquebox") tha
    // jab HTML mein .mosquebox exist na kare toh null milta tha
    // aur appendChild crash karta tha
    const mosquebox = document.createElement("div");
    mosquebox.classList.add("mosquebox");
    mosquebody.appendChild(mosquebox); // pehle append karo
 
    // ── MOSQUE CARDS LOOP ────────────────────────────────────
    data.mosques.forEach((mosqueItem) => {
 
        const sub_mosque = document.createElement("div");
        sub_mosque.classList.add("sub-mosque");
 
        // About section
        const about = document.createElement("div");
        about.classList.add("about");
 
        const title = document.createElement("div");
        title.classList.add("title");
 
        const icon = document.createElement("div");
        icon.classList.add("icon");
        icon.innerText = "🕌";
 
        const dist = document.createElement("div");
        dist.classList.add("dist");
        dist.innerText = `${mosqueItem.distance}m`;
 
        const mosquename = document.createElement("h2");
        mosquename.classList.add("mosquename");
        mosquename.innerText = mosqueItem.name;
 
        const loc = document.createElement("div");
        loc.classList.add("location");
        // BUG FIX 4: pehle mosque.location tha (sirf first mosque ka)
        // ab mosqueItem.location hai — har card ka apna address
        loc.innerText = `📍 ${mosqueItem.location}`;
 
        const prayerLabel = document.createElement("div");
        prayerLabel.classList.add("prayer");
        prayerLabel.innerText = "Today's Prayer Timings";
 
        // Prayer timings
        const timing_sub = document.createElement("div");
        timing_sub.className = "timing-sub";
        buildPrayerRows(timing_sub);
 
        // Direction button + map wrapper
        const mapWrap = document.createElement("div");
        mapWrap.classList.add("map");
 
        const direction = document.createElement("button");
        direction.classList.add("direction");
        direction.innerText = "🗺️ Get Direction";
        direction.dataset.lat = mosqueItem.lat;
        direction.dataset.lng = mosqueItem.lng;
 
        direction.addEventListener("click", () => {
            const lat = parseFloat(direction.dataset.lat);
            const lng = parseFloat(direction.dataset.lng);
            const foot=document.querySelector(".foot")
             foot.scrollIntoView({
                 behavior:"smooth",
                block: "center"
             })

            showMap(lat, lng, latitude, longitude);
        });
 
        mapWrap.appendChild(direction);
 
        // BUG FIX 5: sahi order mein append karo
        // Pehle wale code mein mosquebox.appendChild(sub_mosque) timing se pehle tha
        // aur baad mein elements add ho rahe the — DOM mein order galat tha
        title.appendChild(icon);
        title.appendChild(dist);
 
        about.appendChild(title);
        about.appendChild(mosquename);
        about.appendChild(loc);
 
        sub_mosque.appendChild(about);
        sub_mosque.appendChild(prayerLabel);
        sub_mosque.appendChild(timing_sub);
        sub_mosque.appendChild(mapWrap);
 
        // LAST mein mosquebox mein dalo
        mosquebox.appendChild(sub_mosque);
    });
}
 
// ── HELPER: prayer timing rows ───────────────────────────────
function buildPrayerRows(container) {
    const prayers = [
        { name: "FAJR",    time: "4:20 AM",  className: "fajr"    },
        { name: "DHUHR",   time: "12:15 PM", className: "dhuhr"   },
        { name: "ASR",     time: "4:45 PM",  className: "asr"     },
        { name: "MAGHRIB", time: "7:08 PM",  className: "maghrib" },
        { name: "ISHA",    time: "8:35 PM",  className: "isha"    },
    ];
 
    prayers.forEach((prayer) => {
        const div  = document.createElement("div");
        div.className = prayer.className;
 
        const p    = document.createElement("p");
        p.innerText = prayer.name;
 
        const span = document.createElement("span");
        span.innerText = prayer.time;
 
        div.appendChild(p);
        div.appendChild(span);
        container.appendChild(div);
    });
}
 
const container = document.querySelector(".search_container");
const search    = document.querySelector(".searchbtn");
const input     = document.querySelector(".search");
const dropdown  = document.querySelector(".city");
 
// BUG FIX 1: latitude/longitude ko outer scope mein declare karo
// taake showMap() mein bhi accessible rahein
let userLat = null;
let userLng = null;
 
search.addEventListener("click", () => {



    if (input.value.trim() === "") {
        container.classList.add("shake-error");
        setTimeout(() => container.classList.remove("shake-error"), 350);
        return;
    }
    // BUG FIX 1 (continued): geolocation aur fetch ko sahi order mein rakho
    // pehle location lo, phir fetch karo — warna lat/lng undefined rehta hai
    navigator.geolocation.getCurrentPosition(
        function (position) {
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;
            doSearch(); // location milne ke baad hi search karo
            staticEl.style.display = "none";
            loading.style.display = "flex";
            const foot=document.querySelector(".foot")
            console.log(foot)
            foot.scrollIntoView({
            behavior:"smooth"
             })

        },
        function (error) {
            // Agar user location deny kare toh bhi search chalao
            console.warn("Geolocation denied:", error.message);
            const title="Location Required"
            const info="Please allow location access to find nearby mosques."
            const warning="📍"
            popup(title,info,warning)

            doSearch();
        }
    );
});
 
function doSearch() {
    const csrf = document.querySelector("[name=csrfmiddlewaretoken]").value;
 
    fetch("/masjid/bysearch/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf,
        },
        body: JSON.stringify({
            area: input.value,
            // BUG FIX 2: dropdown.value use karo, sirf dropdown nahi
            city: dropdown.value,
        }),
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
         loading.style.display = "none";

            const mosquebody = document.querySelector(".mosquebody");
 
            // BUG FIX 3: purani results clear karo warna duplicate bante rahenge
            mosquebody.innerHTML = "";
 
            // ── FEATURED MOSQUE (top result) ──────────────────────────
            const mosque = result.search_mosques[0];
            if (!mosque) {
                staticEl.style.display = "flex";
                staticEl.innerText="We couldn't find any nearby mosques.Please try another location or increase the search radius."

                return;
            }
 
            const ranking = document.createElement("div");
            ranking.classList.add("ranking");
 
            const top1 = document.createElement("div");
            top1.classList.add("top1");
 
            const tag = document.createElement("div");
            tag.classList.add("tag");
            tag.innerText = "⭐ Mosque of the Month";
 
            const masjid_name = document.createElement("div");
            masjid_name.classList.add("masjid-name");
            masjid_name.innerText = mosque.name;
 
            const location = document.createElement("div");
            location.classList.add("location");
            location.innerText = mosque.location;
 
            const svg = document.createElement("div");
            svg.classList.add("svg");
            svg.innerHTML = `
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
                <path d="M50 105 Q50 70 80 62 Q110 70 110 105 Z"
                      fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.6)" stroke-width="1"/>
                <rect x="56" y="105" width="48" height="30" rx="2"
                      fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.4)" stroke-width="0.8"/>
                <rect x="36" y="86" width="10" height="36" rx="1"
                      fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.4)" stroke-width="0.8"/>
                <path d="M36 86 Q41 76 46 86Z"
                      fill="rgba(201,168,76,0.2)" stroke="rgba(201,168,76,0.5)" stroke-width="0.8"/>
                <line x1="41" y1="75" x2="41" y2="68" stroke="rgba(201,168,76,0.7)" stroke-width="1"/>
                <rect x="114" y="86" width="10" height="36" rx="1"
                      fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.4)" stroke-width="0.8"/>
                <path d="M114 86 Q119 76 124 86Z"
                      fill="rgba(201,168,76,0.2)" stroke="rgba(201,168,76,0.5)" stroke-width="0.8"/>
                <line x1="119" y1="75" x2="119" y2="68" stroke="rgba(201,168,76,0.7)" stroke-width="1"/>
                <path d="M73 135 L73 116 Q80 110 87 116 L87 135Z"
                      fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.35)" stroke-width="0.8"/>
                <path d="M80 57 Q83 50 80 45 Q82 49 87 48 Q82 51 80 57Z" fill="rgba(201,168,76,0.7)"/>
                <circle cx="80" cy="80" r="55" stroke="rgba(201,168,76,0.08)" stroke-width="0.8"/>
              </svg>`;
 
            top1.appendChild(tag);
            top1.appendChild(masjid_name);
            top1.appendChild(location);
 
            // Prayer timings for featured mosque
            const timing = document.createElement("div");
            timing.className = "timing";
            buildPrayerTimings(timing);
            top1.appendChild(timing);
 
            ranking.appendChild(top1);
            ranking.appendChild(svg);
            mosquebody.appendChild(ranking);
 
            // ── HEADER ───────────────────────────────────────────────
            const headers = document.createElement("div");
            headers.classList.add("headers");
 
            const mosquecity = document.createElement("h2");
            mosquecity.classList.add("mosquecity");
            // BUG FIX 2: dropdown.value use karo
            mosquecity.innerText = `All ${dropdown.value} Mosques`;
 
            const showing = document.createElement("p");
            showing.classList.add("showing");
            showing.innerText = `Showing ${result.search_mosques.length} results`;
 
            headers.appendChild(mosquecity);
            headers.appendChild(showing);
            mosquebody.appendChild(headers);
 
            // ── MOSQUE LIST ──────────────────────────────────────────
            // BUG FIX 3: mosquebox ek baar banao, loop ke bahar
            const mosquebox = document.createElement("div");
            mosquebox.classList.add("mosquebox");
            mosquebody.appendChild(mosquebox);
 
            result.search_mosques.forEach((mosqueItem) => {
 
                const sub_mosque = document.createElement("div");
                sub_mosque.classList.add("sub-mosque");
 
                const about = document.createElement("div");
                about.classList.add("about");
 
                const title = document.createElement("div");
                title.classList.add("title");
 
                const icon = document.createElement("div");
                icon.classList.add("icon");
                icon.innerText = "🕌";
 
                const dist = document.createElement("div");
                dist.classList.add("dist");
                dist.innerText = `${mosqueItem.distance}m`;
 
                const mosquename = document.createElement("h2");
                mosquename.classList.add("mosquename");
                mosquename.innerText = mosqueItem.name;
 
                const loc = document.createElement("div");
                loc.classList.add("location");
                // BUG FIX 2 + 6: input.value aur dropdown.value dono
                loc.innerText = `📍 ${input.value}, ${dropdown.value}`;
 
                const prayerLabel = document.createElement("div");
                prayerLabel.classList.add("prayer");
                prayerLabel.innerText = "Today's Prayer Timings";
 
                const timing_sub = document.createElement("div");
                timing_sub.className = "timing-sub";
                const mapWrap = document.createElement("div");
                mapWrap.classList.add("map");

                buildPrayerTimings(timing_sub);
 
                title.appendChild(icon);
                title.appendChild(dist);
                about.appendChild(title);
                about.appendChild(mosquename);
                about.appendChild(loc);
                sub_mosque.appendChild(about);
                sub_mosque.appendChild(prayerLabel);
                sub_mosque.appendChild(timing_sub);
 
                // BUG FIX 4: direction button properly append karo
                const direction = document.createElement("button");
                direction.classList.add("direction");
                direction.dataset.lat = mosqueItem.lat;
                direction.dataset.lng = mosqueItem.lng;
                direction.innerText = "🗺️ Get Direction";
 
                direction.addEventListener("click", () => {
                    const lat = parseFloat(direction.dataset.lat);
                    const lng = parseFloat(direction.dataset.lng);
                    const foot=document.querySelector(".foot")
                    console.log(foot)
                    foot.scrollIntoView({
                        behavior:"smooth"
                    })
                    showMap(lat, lng, userLat, userLng); // BUG FIX 1: outer scope variables
                });
 
                // BUG FIX 4: sub_mosque mein append karo
                mapWrap.appendChild(direction);
                sub_mosque.appendChild(mapWrap)
                mosquebox.appendChild(sub_mosque);
            });
        })
        .catch((err) => {
            console.error("Fetch error:", err);
        });
}
 
// ── HELPER: prayer timings rows banao ────────────────────────
function buildPrayerTimings(container) {
    const prayers = [
        { name: "FAJR",    time: "4:20 AM",  className: "fajr"    },
        { name: "DHUHR",   time: "12:15 PM", className: "dhuhr"   },
        { name: "ASR",     time: "4:45 PM",  className: "asr"     },
        { name: "MAGHRIB", time: "7:08 PM",  className: "maghrib" },
        { name: "ISHA",    time: "8:35 PM",  className: "isha"    },
    ];
    prayers.forEach((prayer) => {
        const div  = document.createElement("div");
        div.className = prayer.className;
        const p    = document.createElement("p");
        p.innerText = prayer.name;
        const span = document.createElement("span");
        span.innerText = prayer.time;
        div.appendChild(p);
        div.appendChild(span);
        container.appendChild(div);
    });
}
 
// ── MAP ──────────────────────────────────────────────────────
function showMap(lat, lng, userLatitude, userLongitude) {
 
    // BUG FIX 5: pehle purana map hata do agar exist kare
    const existingMap = document.getElementById("map");
    if (existingMap) existingMap.remove();
 
    const mapDiv = document.createElement("div");
    mapDiv.id = "map";
    document.querySelector(".mosquebody").appendChild(mapDiv);
 
    const map = new maplibregl.Map({
        container: "map",
        style: {
            version: 8,
            sources: {
                osm: {
                    type: "raster",
                    tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                    tileSize: 256,
                },
            },
            layers: [{ id: "osm", type: "raster", source: "osm" }],
        },
        center: [lng, lat],
        zoom: 15,
    });
 
    // Mosque marker (red)
    new maplibregl.Marker({ color: "green" }).setLngLat([lng, lat]).addTo(map);
 
    // User marker (blue) — sirf tab dikhao jab location mili ho
    if (userLatitude && userLongitude) {
        new maplibregl.Marker({ color: "blue" })
            .setLngLat([userLongitude, userLatitude])
            .addTo(map);
    }
 
    // ── Direction button ──
    const directionBtn = document.createElement("button");
    directionBtn.innerText = "📍 Start Route";
    directionBtn.classList.add("direction-btn");
 
    directionBtn.onclick = () => {
        if (!userLatitude || !userLongitude) {
            alert("Aapki location nahi mili. Please location allow karein.");
            return;
        }
        fetch(
            `https://router.project-osrm.org/route/v1/driving/${userLongitude},${userLatitude};${lng},${lat}?overview=full&geometries=geojson`
        )
            .then((res) => res.json())
            .then((data) => {
                const route = data.routes[0].geometry;
 
                if (map.getLayer("route")) map.removeLayer("route");
                if (map.getSource("route")) map.removeSource("route");
 
                map.addSource("route", {
                    type: "geojson",
                    data: { type: "Feature", properties: {}, geometry: route },
                });
                map.addLayer({
                    id: "route",
                    type: "line",
                    source: "route",
                    layout: { "line-join": "round", "line-cap": "round" },
                    paint: { "line-color": "#2563eb", "line-width": 6 },
                });
            })
            .catch((err) => console.error("Route error:", err));
    };
 
    // ── Close button ──
    const closeBtn = document.createElement("button");
    closeBtn.className = "close-btn";
    closeBtn.innerText = "✖";
    closeBtn.onclick = () => {
        map.remove();
        document.getElementById("map").remove();
    };
 
    // ── Fullscreen button ──
    const fullscreenBtn = document.createElement("button");
    fullscreenBtn.className = "fullscreen-btn";
    fullscreenBtn.innerText = "⛶";
    fullscreenBtn.onclick = () => {
        const mapEl = document.getElementById("map");
        if (!document.fullscreenElement) mapEl.requestFullscreen();
        else document.exitFullscreen();
    };
 
    // ── Google Maps button ──
    const googleBtn = document.createElement("button");
    googleBtn.className = "google-btn";
    googleBtn.innerHTML = "🗺️ Go to Google";
    googleBtn.onclick = () => {
        window.open(
            `https://www.google.com/maps/dir/${userLatitude},${userLongitude}/${lat},${lng}`,
            "_blank"
        );
    };
 
    // Sab buttons append karo
    const mapEl = document.getElementById("map");
    mapEl.appendChild(directionBtn);
    mapEl.appendChild(closeBtn);
    mapEl.appendChild(fullscreenBtn);
    mapEl.appendChild(googleBtn);
}


// error function create here
 function popup(title,info,warning){
    const popbox=document.createElement("div");
    popbox.classList.add("popbox");
  
    const poptitle=document.createElement("h2")
    poptitle.classList.add("poptitle")
    poptitle.innerText=title;


    const popinfo=document.createElement("p")
    popinfo.classList.add("popinfo")
    popinfo.innerText=info;

    const popwarn=document.createElement("span")
    popwarn.classList.add("popwarn")
    popwarn.innerText=warning;

    const popbtn=document.createElement("button")
    popbtn.classList.add("popbtn")
    popbtn.innerText="ok";
    popbtn.addEventListener("click",()=>{
        popbox.remove();
    })

popbox.appendChild(poptitle)
popbox.appendChild(popinfo)
popbox.appendChild(popwarn)
popbox.appendChild(popbtn)
document.body.appendChild(popbox);
 }
 