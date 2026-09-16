import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export type Station = {
  id: string;
  name: string;
  location: string;
  status: string;
  fuel: string;
  weather: string;
  alert: string;
};

export async function fetchStations(): Promise<Station[]> {
  const stationSnapshot = await getDocs(collection(db, "stations"));

  return stationSnapshot.docs.map((stationDocument) => {
    const data = stationDocument.data();

    const fuel =
      typeof data.fuelDays === "number"
        ? `${data.fuelDays} days`
        : "Unknown";

    const weather =
      typeof data.temperature === "number"
        ? `${data.temperature}°C`
        : "No data";

    return {
      id: stationDocument.id,
      name: typeof data.name === "string" ? data.name : "Unknown station",
      location: typeof data.location === "string" ? data.location : "Unknown",
      status: typeof data.status === "string" ? data.status : "Unknown",
      fuel,
      weather,
      alert:
        typeof data.alert === "string" ? data.alert : "No active alerts",
    };
  });
}