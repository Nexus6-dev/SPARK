import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsCheckingLogin(false);
    });

    return unsubscribe;
  }, []);

  if (isCheckingLogin) {
    return <p>Checking your login...</p>;
  }

  return user ? <Dashboard /> : <Login />;
}

export default App;