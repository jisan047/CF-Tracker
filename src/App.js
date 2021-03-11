import "./App.css";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MaterialTable from "material-table";

function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [userStatus, setUserStatus] = useState([]);
  const [filteredAccepted, setFilteredAccepted] = useState([]);

  const fetchData = (e) => {
    if (e.key !== "Enter") return;
    const userName = e.target.value;
    const infoUrl = `https://codeforces.com/api/user.info?handles=${userName}`;
    fetch(infoUrl)
      .then((response) => response.json())
      .then((result) => setUserInfo(result.result || []))
      .then(() => {
        if (userInfo.length > 0) {
          const statusUrl = `https://codeforces.com/api/user.status?handle=${userName}`;
          return fetch(statusUrl);
        }
        return Promise.resolve();
      })
      .then((response) =>
        response !== undefined ? response.json() : Promise.resolve()
      )
      .then((result) => {
        if (result !== undefined) setUserStatus(result.result || []);
      });
  };

  const getCamelCase = (text) => {
    text += "";
    if (text) {
      const camelCasedWords = text
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.substr(1, word.length));
      return camelCasedWords.join(" ");
    }
    return "";
  };

  const getRank = (rank, isMax) => {
    switch (rank) {
      case "newbie":
        return (
          <h5>
            {isMax ? "Max Rank" : "Rank"}:{" "}
            <span style={{ color: "#FF88FF" }}>{getCamelCase(rank)}</span>
          </h5>
        );
      case "pupil":
        return (
          <h5>
            {isMax ? "Max Rank" : "Rank"}:{" "}
            <span style={{ color: "#FF88FF" }}>{getCamelCase(rank)}</span>
          </h5>
        );
      case "specialist":
        return (
          <h5>
            {isMax ? "Max Rank" : "Rank"}:{" "}
            <span style={{ color: "#FF88FF" }}>{getCamelCase(rank)}</span>
          </h5>
        );
      case "expert":
        return (
          <h5>
            {isMax ? "Max Rank" : "Rank"}:{" "}
            <span style={{ color: "blue" }}>{getCamelCase(rank)}</span>
          </h5>
        );
      case "candidate master":
        return (
          <h5>
            {isMax ? "Max Rank" : "Rank"}:{" "}
            <span style={{ color: "#FF88FF" }}>{getCamelCase(rank)}</span>
          </h5>
        );
      case "master":
        return (
          <h5>
            {isMax ? "Max Rank" : "Rank"}:{" "}
            <span style={{ color: "#FFCC88" }}>{getCamelCase(rank)}</span>
          </h5>
        );
      case "international master":
        return (
          <h5>
            {isMax ? "Max Rank" : "Rank"}:{" "}
            <span style={{ color: "#FFBB55" }}>{getCamelCase(rank)}</span>
          </h5>
        );
      case "grandmaster":
        return (
          <h5>
            {isMax ? "Max Rank" : "Rank"}:{" "}
            <span style={{ color: "#FF7777" }}>{getCamelCase(rank)}</span>
          </h5>
        );
      case "international grandmaster":
        return (
          <h5>
            {isMax ? "Max Rank" : "Rank"}:{" "}
            <span style={{ color: "#FF3333" }}>{getCamelCase(rank)}</span>
          </h5>
        );
      case "legendary grandmaster":
        return (
          <h5>
            {isMax ? "Max Rank" : "Rank"}:{" "}
            <span style={{ color: "#AA0000" }}>{getCamelCase(rank)}</span>
          </h5>
        );
    }
  };

  const getContribution = () => {
    if (userInfo[0].contribution > 0) {
      return (
        <h5>
          Contribution:{" "}
          <span style={{ color: "green" }}>
            {getCamelCase(userInfo[0].contribution)}
          </span>
        </h5>
      );
    } else if (userInfo[0].contribution < 0) {
      return (
        <h5>
          Contribution:{" "}
          <span style={{ color: "grey" }}>
            {getCamelCase(userInfo[0].contribution)}
          </span>
        </h5>
      );
    } else {
      return (
        <h5>
          Contribution:{" "}
          <span style={{ color: "black" }}>
            {getCamelCase(userInfo[0].contribution)}
          </span>
        </h5>
      );
    }
  };

  const getTimeDifference = (lastOnlineUnix) => {
    const dateNowUnix = moment().unix();
    const diff = dateNowUnix - lastOnlineUnix;
    if (diff >= 31536000) {
      return `${(diff / 31536000).toFixed(0)} years ago`;
    } else if (diff >= 86400) {
      return `${(diff / 86400).toFixed(0)} days ago`;
    } else if (diff >= 3600) {
      return `${(diff / 3600).toFixed(0)} hours ago`;
    } else if (diff >= 60) {
      return `${(diff / 60).toFixed(0)} minutes ago`;
    }
    return `${diff} seconds ago`;
  };

  const getOnlineStamp = (lastOnlineUnix) => {
    const dateNowUnix = moment().unix();
    const diff = dateNowUnix - lastOnlineUnix;
    if (diff <= 300) {
      return (
        <h5 style={{ color: "green" }}>
          <FiberManualRecordIcon /> Online
        </h5>
      );
    }
    return (
      <h5 style={{ color: "grey" }}>
        <FiberManualRecordIcon />
      </h5>
    );
  };

  useEffect(() => {
    const currentMonthUnix = moment().startOf("month").unix();
    const thisMonthsStatus = userStatus.filter(
      (submission) =>
        submission.creationTimeSeconds > currentMonthUnix &&
        submission.verdict === "OK"
    );
    console.log(thisMonthsStatus);
    const refinedData = thisMonthsStatus.map((submission) => {
      return {
        problemName: submission.problem.name,
        time: moment(submission.creationTimeSeconds).format("L"),
        language: submission.programmingLanguage,
        executionTime: submission.timeConsumedMillis,
        memory: submission.memoryConsumedBytes,
      };
    });
    setFilteredAccepted(refinedData);
  }, [userStatus]);

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
            onKeyDown={fetchData}
          />
        </div>
        <div className="basic-info">
          {userInfo.length > 0 ? (
            <>
              <div className="basic-info-pane">
                <h3>Basic Information</h3>
                <Divider />
                <Avatar
                  className="avatar"
                  alt={`${userInfo[0].firstName} ${userInfo[0].lastName}`}
                  src={userInfo[0].avatar}
                ></Avatar>
                <h5>{`Name: ${userInfo[0].firstName || ""} ${
                  userInfo[0].lastName || ""
                }`}</h5>
                {getRank(userInfo[0].rank, false)}
                <h5>{`Rating: ${userInfo[0].rating}`}</h5>
                <h5>{`Max Rating: ${userInfo[0].maxRating}`}</h5>
                {getContribution()}
                {getRank(userInfo[0].maxRank, true)}
              </div>
              <div className="basic-info-pane">
                <h3>Community Information</h3>
                <Divider />
                <h5>{`Organization: ${userInfo[0].organization || ""}`}</h5>
                <h5>{`City: ${userInfo[0].city || ""}`}</h5>
                <h5>{`Country: ${userInfo[0].country || ""}`}</h5>
                <h5>{`Email: ${userInfo[0].email || "N/A"}`}</h5>
                <h5>{`Friends: ${userInfo[0].friendOfCount || "N/A"}`}</h5>
                <h5>{`Last Online: ${getTimeDifference(
                  userInfo[0].lastOnlineTimeSeconds
                )}`}</h5>
                <h5>{`Registration: ${getTimeDifference(
                  userInfo[0].registrationTimeSeconds
                )}`}</h5>
                {getOnlineStamp(userInfo[0].lastOnlineTimeSeconds)}
              </div>
              <br></br>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="table">
          <MaterialTable
            columns={[
              {
                title: "Problem Name",
                field: "problemName",
              },
              {
                title: "Submission Date",
                field: "time",
              },
              {
                title: "Language",
                field: "language",
              },
              {
                title: "Execution Time",
                field: "executionTime",
              },
              {
                title: "Memory",
                field: "memory",
              },
            ]}
            data={filteredAccepted}
            title="Current months solved problems"
            options={{ paging: false, search: false }}
            style={{width: '100%'}}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
