import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import './Components.css';
import MatchTable from "./MatchTable";

const MatchList = (section) => {
    const [matches, setMatches] = useState([]);
    const [name, setName] = useState([]);
    const params = useParams();
    useEffect (() => {

      let { id } = params;
    
      axios.get(`${process.env.REACT_APP_API_URL}/${section.section}/${id}/matches/`, { headers: {"X-Auth-Token" : process.env.REACT_APP_TOKEN} })
      .then(res => {
        const matches = res.data.matches;
        setMatches(matches);
      })
      .catch(function (error) {
        console.log(error.response);
      });

      axios.get(`${process.env.REACT_APP_API_URL}/${section.section}/${id}/`, { headers: {"X-Auth-Token" : process.env.REACT_APP_TOKEN} })
      .then(res => {
        const name = res.data.name;
        setName({ name });
      });

    }, [setMatches]);
    
    console.log(matches);
    console.log(name);
    return (
      <div>
        <MatchTable matches={matches} name={name} />
      </div>
    )
}
export default MatchList;
