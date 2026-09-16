import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export type Alert = {
  id: string;
  stationId: string;
  title: string;
  description: string;
  severity: string;
  status: string;
};

export async function fetchActiveAlerts(): Promise<Alert[]> {
  const alertsQuery = query(
    collection(db, "alerts"),
    where("status", "==", "open"),
  );

  const alertSnapshot = await getDocs(alertsQuery);

  return alertSnapshot.docs.map((alertDocument) => {
    const data = alertDocument.data();

    return {
      id: alertDocument.id,
      stationId: data.stationId ?? "",
      title: data.title ?? "Untitled alert",
      description: data.description ?? "",
      severity: data.severity ?? "P3",
      status: data.status ?? "open",
    };
  });
}