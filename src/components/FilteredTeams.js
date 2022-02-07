import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const byName = (name) => (competition) =>
  competition.name.toLowerCase().includes((name || '').toLowerCase());

const FilteredTeams = () => {
  const [teams, setTeams] = useState([]);
  useEffect (() => {
    axios.get(`${process.env.REACT_APP_API_URL}/teams/`, { headers: {"X-Auth-Token" : process.env.REACT_APP_TOKEN} })
    .then(res => {
      const teams = res.data.teams;
      setTeams(teams);
    })
    .catch(function (error) {
      console.log(error.response);
    });
    }, [setTeams]);

  const [search, setSearch] = useSearchParams();

  const handleName = (event) => {
    setSearch({ name: event.target.value });
  };

    console.log(teams); /**/
    return (
        <div>
            <h2>Teams</h2>

            <div className="search" align="center">
              <label>Search by name</label>
              <input type="text" value={ (search.get("name")) ? search.get("name") : "" }
                onChange={handleName} />
            </div>

            <table>
            <thead>
              <tr>
                <th>Logo</th>
                <th>Team name</th>
                <th>Country</th>
                <th className="notVisible">Website</th>
              </tr>
            </thead>
            <tbody>
              {teams.filter(byName(search.get('name'))).map((team) => (
                <tr key={team.id}>
                  <td>
                    <img scr={team.crestUrl} width="20" height="15" alt="" />
                  </td>
                  <td> 
                    <Link className="Link" to={{ pathname: `/teams/${team.id}/matches` }} >{team.name}</Link>
                  </td>
                  <td>{team.area.name}</td>
                  <td className="notVisible">
                    <a className="Link" href={team.website}>{team.website}</a>
                  </td>
                </tr> 
                ))}
              </tbody>
            </table>
        </div>
    );
}
export default FilteredTeams;