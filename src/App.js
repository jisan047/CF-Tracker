import "./App.css";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Avatar from '@material-ui/core/Avatar';

function App() {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    console.log(userInfo.length > 0 ? userInfo[0].lastOnlineTimeSeconds > userInfo[0].registrationTimeSeconds: "null");
  }, [userInfo]);

  const fetchData = (e) => {
    const userName = e.target.value;
    const infoUrl = `https://codeforces.com/api/user.info?handles=${userName}`;
    fetch(infoUrl)
      .then((response) => response.json())
      .then((result) => setUserInfo(result.result || []));
  };

  return (
    <div className="App">
      <main>
        <header>
          <h1>CF Tracker</h1>
        </header>
        <div className="search">
          <TextField
            className="search-field"
            label="Username"
            variant="outlined"
            onChange={fetchData}
          />
        </div>
        <div className="basic-info">
          {userInfo.length > 0? (
            <>
              <div className="basic-info-pane">
                <h3>Basic Information</h3>
                <Avatar className="avatar" alt={`${userInfo[0].firstName} ${userInfo[0].lastName}`} src={userInfo[0].avatar}></Avatar>
                <h5>{`Name: ${userInfo[0].firstName || ""} ${userInfo[0].lastName || ""}`}</h5>
                <h5>{`City: ${userInfo[0].city || ""}`}</h5>
                <h5>{`Country: ${userInfo[0].country || ""}`}</h5>
              </div>
              <div className="basic-info-pane"></div>
              <div className="basic-info-pane"></div>
            </>
          ) : (
            <></>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
