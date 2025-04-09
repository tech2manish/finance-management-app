import React, { useState } from "react";
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {!user ? <Welcome onUserCreated={setUser} /> : <Dashboard user={user} />}
    </div>
  );
}

export default App;
