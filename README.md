# **UTIS Frontend Dashboard Documentation**

## **Project Overview**

The UTIS frontend is a **React/Next.js dashboard** built to visualize traffic, weather, and incident data in real time. It interacts directly with the FastAPI backend via REST API calls and provides a clean, responsive, and interactive user experience for monitoring London traffic conditions.

---

## **Technologies Used**

* **React / Next.js** – Component-based UI, SSR & routing support
* **Redux Toolkit** – Global state management for selected city and user preferences
* **React Query** – Data fetching, caching, auto-refresh, and loading/error handling
* **Recharts** – Interactive charts and time-series visualizations
* **Mapbox GL JS** – Geospatial mapping for traffic congestion and incident locations
* **Tailwind CSS** – Responsive and modern styling
* **HEROUi / Custom Cards** – Standardized UI components for displaying metrics
* **Axios** – HTTP requests to the backend API

---

## **Architecture & Component Structure**

```bash
frontend/
├─ components/
│  ├─ Cards.tsx                 # Weather, Traffic, Incident summary cards
│  ├─ MapBox.tsx                # Interactive map showing traffic and incidents
│  ├─ TrafficHeatMap.tsx        # Heatmap of congestion
│  ├─ TimeSeriesChart.tsx       # Time-series visualization
│  ├─ IncidentTable.tsx         # Tabular view of incidents
│  ├─ TopBar.tsx                # Header/navigation
│  └─ ThemeSwitcher.tsx         # Light/Dark mode switcher
├─ pages/
│  ├─ index.tsx                 # Main dashboard page
│  └─ api/                      # API routes (if needed for SSR)
├─ store/
│  └─ index.ts                  # Redux store setup
├─ lib/
│  ├─ traffic_api.ts
│  ├─ weather_api.ts
│  └─ incidents_api.ts
├─ styles/
│  └─ globals.css
├─ Dockerfile
├─ package.json
└─ tsconfig.json
```

---

## **Key Features**

### **1. Dashboard Cards**

* **WeatherCard** – Displays current weather for the selected city.
* **TrafficCard** – Shows aggregated traffic metrics: average congestion, delay.
* **TrafficCardOriginToDestination** – Specific route information.
* **IncidentCard** – Summary of incidents in London.
* **Cards component** – Combines all cards, handles loading and error states gracefully.

### **2. Interactive Map**

* Shows real-time **traffic congestion** and **incident locations** using Mapbox.
* Supports multiple routes and updates every 60–100 seconds.

### **3. Visualizations**

* **TrafficHeatMap** – Color-coded congestion heatmap for routes.
* **TimeSeriesChart** – Trends in traffic or weather over time.
* **Dynamic loading states** – Skeletons displayed while fetching data.
* **Error handling** – Shows red error blocks when API requests fail.

### **4. Redux State Management**

* Stores **default city** globally.
* Allows all components to read/write the selected city for weather and traffic queries.

### **5. React Query Integration**

* Caching, auto-refresh, stale data management.
* Queries include `getWeatherByCity`, `getTrafficCurrent`, `getTrafficSummary`, `getIncidentsSummary`, `getWeatherTrafficCorrelation`, `getWeatherTrend`.
* Handles loading and error states centrally for consistent UI experience.

### **6. Responsive UI**

* Fully responsive design for desktop, tablet, and mobile.
* Cards stack on smaller screens.
* Map and visualizations resize automatically.

### **7. Theme Support**

* Light and dark modes using `ThemeSwitcher`.
* Dark mode applies to all cards, map overlays, and charts.

---

## **Frontend Deployment**

### **Docker Setup**

**Dockerfile for frontend:**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["yarn", "build"]
```

**docker-compose.yml** (frontend + backend + database):

```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_BASE_URL: "http://localhost:8000"
    depends_on:
      - backend
```

### **Running Locally**

```bash
docker-compose up --build
```

* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Backend:** [http://localhost:8000](http://localhost:8000)

## **UI/UX Highlights**

* Professional, clean design
* Loading skeletons and error cards
* Grid layout for multiple cards
* Heatmaps and charts for intuitive visualization
* Mobile-first responsiveness

---

## **Next Steps / Improvements**

* Add **historical charts** for weather and traffic.
* Integrate **push notifications** for incidents or high congestion.
* Add **city search autocomplete** with API suggestions.
* Improve **accessibility**, including ARIA attributes and keyboard navigation.
