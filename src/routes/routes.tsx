import { Route, Routes as Switch } from "react-router-dom";

import { Dashboard } from "../pages/dashboard";
import { Convert } from "../pages/conversion";
import { Symbols } from "../pages/symbols";
import { CurrentConversion } from "../pages/current-conversion";

function Routes() {
  return (
    <Switch>
      <Route path="" element={<Dashboard />} />
      <Route path="convert" element={<Convert />} />
      <Route path="symbols" element={<Symbols />} />
      <Route path="current-conversion" element={<CurrentConversion />} />
    </Switch>
  );
}

export default Routes;
