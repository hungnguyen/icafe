import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MasterAdmin from "./pages/admin/Master";
import MasterHome from "./pages/home/Master";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MasterHome />
        </Route>
        <Route path="/admin">
          <MasterAdmin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
