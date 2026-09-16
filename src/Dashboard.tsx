import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { fetchStations, type Station } from "./stationService";
import "./App.css";

const demoStations: Station[] = [
  {
    id: "demo-maitri",
    name: "Maitri Station",
    location: "Queen Maud Land",
    status: "Operational",
    fuel: "42 days",
    weather: "-18°C",
    alert: "No active alerts",
  },
  {
    id: "demo-bharati",
    name: "Bharati Station",
    location: "Larsemann Hills",
    status: "Attention",
    fuel: "18 days",
    weather: "-24°C",
    alert: "Fuel level warning",
  },
  {
    id: "demo-dakshin",
    name: "Dakshin Gangotri",
    location: "Coastal region",
    status: "Offline",
    fuel: "Unknown",
    weather: "No data",
    alert: "Last sync 3 hours ago",
  },
];

function Dashboard() {
  const [stations, setStations] = useState<Station[]>(demoStations);
  const [dataSource, setDataSource] = useState("Demo data");
  const [isLoadingStations, setIsLoadingStations] = useState(true);

  async function loadStations() {
    setIsLoadingStations(true);

    try {
      const firestoreStations = await fetchStations();

      if (firestoreStations.length > 0) {
        setStations(firestoreStations);
        setDataSource("Live Firestore data");
      } else {
        setStations(demoStations);
        setDataSource("Demo data — no stations saved yet");
      }
    } catch (error) {
      console.error("Could not load station data:", error);
      setStations(demoStations);
      setDataSource("Demo data — Firestore unavailable");
    } finally {
      setIsLoadingStations(false);
    }
  }

  useEffect(() => {
    void loadStations();
  }, []);

  async function handleSignOut() {
    await signOut(auth);
  }

  return (
    <main className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">INDIAN ANTARCTIC OPERATIONS</p>

          <h1>Station Command Dashboard</h1>

          <p className="subtitle">
            Monitor station safety, resources, weather, and alerts.
          </p>

          <small style={{ color: "#718695" }}>
            {isLoadingStations ? "Loading station data..." : dataSource}
          </small>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div className="connection-status">
            <span className="status-dot" />
            System online
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            style={{
              border: "1px solid #b9cbd5",
              borderRadius: "8px",
              padding: "9px 13px",
              background: "#ffffff",
              color: "#31546a",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <section className="summary-grid">
        <div className="summary-card">
          <span>Active stations</span>
          <strong>{stations.length}</strong>
          <small>Stations currently configured</small>
        </div>

        <div className="summary-card">
          <span>Open alerts</span>
          <strong className="warning-number">1</strong>
          <small>Requires attention</small>
        </div>

        <div className="summary-card">
          <span>Lowest fuel reserve</span>
          <strong className="warning-number">18 days</strong>
          <small>Bharati Station</small>
        </div>

        <div className="summary-card">
          <span>Data source</span>
          <strong>{dataSource.startsWith("Live") ? "Live" : "Demo"}</strong>
          <small>Current dashboard source</small>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LIVE OVERVIEW</p>
            <h2>Research stations</h2>
          </div>

          <button
            className="secondary-button"
            type="button"
            onClick={loadStations}
            disabled={isLoadingStations}
          >
            {isLoadingStations ? "Refreshing..." : "Refresh data"}
          </button>
        </div>

        <div className="station-grid">
          {stations.map((station) => (
            <article className="station-card" key={station.id}>
              <div className="station-card-header">
                <div>
                  <h3>{station.name}</h3>
                  <p>{station.location}</p>
                </div>

                <span
                  className={`station-status ${station.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {station.status}
                </span>
              </div>

              <div className="station-details">
                <div>
                  <span>Fuel reserve</span>
                  <strong>{station.fuel}</strong>
                </div>

                <div>
                  <span>Temperature</span>
                  <strong>{station.weather}</strong>
                </div>
              </div>

              <div className="station-alert">
                <span>●</span>
                {station.alert}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section alert-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">REQUIRES ATTENTION</p>
            <h2>Recent alerts</h2>
          </div>
        </div>

        <div className="alert-row">
          <div className="alert-icon">!</div>

          <div>
            <strong>Fuel reserve approaching threshold</strong>
            <p>
              Bharati Station has approximately 18 days of fuel remaining.
            </p>
          </div>

          <span className="priority">P2</span>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;