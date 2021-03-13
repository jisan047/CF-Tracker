import "./App.css";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MaterialTable from "material-table";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [userStatus, setUserStatus] = useState([]);
  const [filteredAccepted, setFilteredAccepted] = useState([]);
  const [filteredTried, setFilteredTried] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = (e) => {
    if (e.key !== "Enter") return;
    setIsLoading(true);
    setUserInfo([]);
    setUserStatus([]);
    const userName = e.target.value;
    const infoUrl = `https://codeforces.com/api/user.info?handles=${userName}`;
    fetch(infoUrl)
      .then((response) => response.json())
      .then((result) => setUserInfo(result.result || []))
      .then(() => {
        const statusUrl = `https://codeforces.com/api/user.status?handle=${userName}`;
        return fetch(statusUrl);
      })
      .then((response) => response.json())
      .then((result) => {
        setUserStatus(result.result || []);
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
          <FiberManualRecordIcon />
        </h5>
      );
    }
    return (
      <h5 style={{ color: "grey" }}>
        <FiberManualRecordIcon />
      </h5>
    );
  };

  const setAcceptData = (startDate, endDate) => {
    const currentMonthUnix = moment().startOf("month").unix();
    const thisMonthsStatus = userStatus.filter(
      (submission) =>
        submission.creationTimeSeconds >= currentMonthUnix &&
        submission.verdict === "OK"
    );
    const refinedData = thisMonthsStatus.map((submission) => {
      return {
        index: submission.problem.index,
        problemName: submission.problem.name,
        time: moment(submission.creationTimeSeconds * 1000).format(
          "MMM D, YYYY"
        ),
        language: submission.programmingLanguage,
        executionTime: `${submission.timeConsumedMillis} ms`,
        memory: `${(submission.memoryConsumedBytes / 1024).toFixed(0)} kb`,
        contestId: submission.problem.contestId,
      };
    });
    refinedData
      .map((item) => item.problemName)
      .filter((value, index, self) => self.indexOf(value) === index);
    setFilteredAccepted(refinedData || []);
  };

  const setTriedData = (startDate, endDate) => {
    const currentMonthUnix = moment().startOf("month").unix();
    const thisMonthsStatus = userStatus.filter(
      (submission) =>
        submission.creationTimeSeconds >= currentMonthUnix &&
        submission.verdict !== "OK"
    );
    const refinedData = [];
    const uniqueProblems = [];
    thisMonthsStatus.map((submission) => {
      if (uniqueProblems[submission.problem.name] !== 1) {
        uniqueProblems[submission.problem.name] = 1;
        refinedData.push({
          index: submission.problem.index,
          problemName: submission.problem.name,
          time: moment(submission.creationTimeSeconds * 1000).format(
            "MMM D, YYYY"
          ),
          language: submission.programmingLanguage,
          executionTime: `${submission.timeConsumedMillis} ms`,
          memory: `${(submission.memoryConsumedBytes / 1024).toFixed(0)} kb`,
          verdict: submission.verdict,
          contestId: submission.problem.contestId,
        });
      }
    });
    setFilteredTried(refinedData || []);
  };

  useEffect(() => {
    if (isLoading === false) {
      setIsLoading(true);
    }
    setAcceptData(null, null);
    setTriedData(null, null);
    setIsLoading(false);
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
        {userInfo.length > 0 && (
          <div className="basic-info">
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
          </div>
        )}
        {userInfo.length > 0 && (
          <div className="table">
            <div className="table-pane">
              <MaterialTable
                localization={{
                  header: {
                    actions: "",
                  },
                }}
                icons={tableIcons}
                isLoading={isLoading}
                columns={[
                  {
                    title: "Index",
                    field: "index",
                  },
                  {
                    title: "Problem Name",
                    field: "problemName",
                    filtering: false,
                    sorting: false,
                  },
                  {
                    title: "Submission Date",
                    field: "time",
                    filtering: false,
                  },
                  {
                    title: "Language",
                    field: "language",
                  },
                  {
                    title: "Execution Time",
                    field: "executionTime",
                    filtering: false,
                  },
                  {
                    title: "Memory",
                    field: "memory",
                    filtering: false,
                  },
                ]}
                data={filteredAccepted}
                title="Current Month's Solved Problems"
                options={{
                  paging: true,
                  search: false,
                  filtering: true,
                  loadingType: "overlay",
                  actionsColumnIndex: -1,
                }}
                style={{ width: "100%" }}
                actionscolumnt
                actions={[
                  {
                    icon: () => <ExitToAppIcon />,
                    tooltip: "Go to problem",
                    onClick: (event, rowData) =>
                      window.open(
                        `https://codeforces.com/contest/${rowData.contestId}/problem/${rowData.index}`
                      ),
                  },
                ]}
              />
            </div>
          </div>
        )}
        {userInfo.length > 0 && (
          <div className="table">
            <div className="table-pane">
              <MaterialTable
                localization={{
                  header: {
                    actions: "",
                  },
                }}
                icons={tableIcons}
                isLoading={isLoading}
                columns={[
                  {
                    title: "Index",
                    field: "index",
                  },
                  {
                    title: "Problem Name",
                    field: "problemName",
                    filtering: false,
                    sorting: false,
                  },
                  {
                    title: "Submission Date",
                    field: "time",
                    filtering: false,
                  },
                  {
                    title: "Language",
                    field: "language",
                  },
                  {
                    title: "Execution Time",
                    field: "executionTime",
                    filtering: false,
                  },
                  {
                    title: "Memory",
                    field: "memory",
                    filtering: false,
                  },
                  { title: "Verdict", field: "verdict" },
                ]}
                data={filteredTried}
                title="Current Month's Tried Problems"
                options={{
                  paging: true,
                  search: false,
                  filtering: true,
                  loadingType: "overlay",
                  actionsColumnIndex: -1,
                }}
                style={{ width: "100%" }}
                actions={[
                  {
                    icon: () => <ExitToAppIcon />,
                    tooltip: "Go to problem",
                    onClick: (event, rowData) =>
                      window.open(
                        `https://codeforces.com/contest/${rowData.contestId}/problem/${rowData.index}`
                      ),
                  },
                ]}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
