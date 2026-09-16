import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";

const stations = [
  {
    name: "Maitri Station",
    location: "Queen Maud Land",
    status: "Operational",
    fuel: "42 days",
    weather: "-18°C",
    alert: "No active alerts",
  },
  {
    name: "Bharati Station",
    location: "Larsemann Hills",
    status: "Attention",
    fuel: "18 days",
    weather: "-24°C",
    alert: "Fuel level warning",
  },
  {
    name: "Dakshin Gangotri",
    location: "Coastal region",
    status: "Offline",
    fuel: "Unknown",
    weather: "No data",
    alert: "Last sync 3 hours ago",
  },
];

function Dashboard() {
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
          <strong>3</strong>
          <small>Across Antarctic operations</small>
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
          <span>Last synchronization</span>
          <strong>12 min</strong>
          <small>Most recent station update</small>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LIVE OVERVIEW</p>
            <h2>Research stations</h2>
          </div>

          <button className="secondary-button" type="button">
            Refresh data
          </button>
        </div>

        <div className="station-grid">
          {stations.map((station) => (
            <article className="station-card" key={station.name}>
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