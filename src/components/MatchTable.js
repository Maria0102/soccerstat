import React from 'react';
import './Components.css';

const MatchTable = (matches) => {
    const name2= matches.name;

    const formateDate = (date) => {
        const d = new Date(date);

        var dateString = ("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth()+1)).slice(-2) + "." +
                d.getFullYear();        
        // 06.11.2022
        return dateString;
    }

    const formateTime = (date) => {
      const d = new Date(date);
      var timeString = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);        
      //09:30
      return timeString;
    }

    return (
      <div>
      <table>
      <caption>Список матчей {name2.name}</caption>
      <thead>
        <tr>
          <th>Date</th>
          <th colSpan="2">Teams</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        { matches.matches.map(match =>
        <tr key={match.id}>
          <td>
            {formateDate(match.utcDate)}&nbsp;&nbsp;<br className="br"></br>
            {formateTime(match.utcDate)}&nbsp;&nbsp;<br className="br"></br>
            {match.status}
          </td>
          <td>
            <span>
                <img scr={match.homeTeam.crestUrl} width="20" height="15" alt="" />
                <span>{match.homeTeam.name}</span>
            </span>
          </td>
          <td>
            <span>
                <img scr={match.awayTeam.crestUrl} width="20" height="15" alt="" />
                <span>{match.awayTeam.name}</span>
            </span>
          </td>
          <td>
              {
                match.score.winner ?
                <span>{match.score.fullTime["homeTeam"]}:{match.score.fullTime["awayTeam"]}</span> : "-"
              }             
          </td>
        </tr>
        )}
      </tbody>
      </table>
      </div>
    )
  }
export default MatchTable;
