import React from "react";
//import { Routes, Route } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout";
import FilteredTeams from "./components/FilteredTeams";
import FilteredCompetitions from "./components/FilteredCompetitions";
//import MatchListofCompetition from "./components/MatchListofCompetition";
//import MatchListofTeam from "./components/MatchListofTeam";
import MatchList from "./components/MatchList";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<FilteredCompetitions />} />
        <Route path="competitions" element={<FilteredCompetitions />} />
        <Route path="teams" element={<FilteredTeams />} />
        <Route path="/competitions/search" element={<FilteredCompetitions />} />

        {/*<Route path="/competitions/:id/matches" element={<MatchListofCompetition />} />
        <Route path="/teams/:id/matches" element={<MatchListofTeam />} />*/}
        <Route path="/competitions/:id/matches" element={<MatchList section="competitions" />} />
        <Route path="/teams/:id/matches" element={<MatchList section="teams" />} />

      </Route>
    </Routes>
  );
}

export default App;
