import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from "react-router-dom";
import './Components.css';

const byName = (name) => (competition) =>
  competition.name.toLowerCase().includes((name || '').toLowerCase());

const FilteredCompetitions = () => {
  const [competitions, setCompititions] = useState([]);
  const [freeCompetitions, setfreeCompetitions] = useState([]);
  useEffect (() => {
    axios.get(`${process.env.REACT_APP_API_URL}/competitions/`, { headers: {"X-Auth-Token" : process.env.REACT_APP_TOKEN} })
    .then(res => {
      const competitions = res.data.competitions;
      setCompititions(competitions);
      
      const freeCompetitions = competitions.filter( (competition) => competition.plan === "TIER_ONE");
      setfreeCompetitions(freeCompetitions);
    })
    .catch(error => {
        console.log(error);
    })
    }, [setCompititions]);

  const [search, setSearch] = useSearchParams();

  const handleName = (event) => {
    setSearch({ name: event.target.value });
  };

    return (
        <div>

            <div className="freeCompititions">
              {freeCompetitions.map(competition => 
              <div key={competition.id} className="freeCompitition">
                <Link className="Link compititionLink" to={{ pathname: `/competitions/${competition.id}/matches` }} >
                  {/*<img src={competition.emblemUrl} width="40" height="40" alt={competition.name}/>*/}
                  <span>{competition.name}</span>
                  <span>{competition.area.name}</span>
                </Link>
              </div>
              )}
            </div>

            <h2>All competitions</h2>

            <div className="search" align="center">
              <label>Search by name</label>
              <input type="text" value={ (search.get("name")) ? search.get("name") : "" }
                onChange={handleName} />
            </div>

            <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Competition name</th>
              </tr>
            </thead>
            <tbody>
              {competitions.filter(byName(search.get('name'))).map((competition) => (
                <tr key={competition.id}>
                  <td>{competition.area.name}</td>
                  <td> 
                      {competition.name}
                  </td>
                </tr> 
                ))}
              </tbody>
            </table>
        </div>
    );
}
export default FilteredCompetitions;