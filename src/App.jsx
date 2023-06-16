import React, { useState, useEffect } from "react";
import "./App.css";
import Gönnerator from "./Wheel";

function Counter({ name, count, allTimeCount, onNumberChange, editable }) {
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleNumberChange = () => {
    if (editable) {
      const input = prompt(`Enter a number for ${name}`);
      const number = parseInt(input);
      if (!isNaN(number)) {
        onNumberChange(number);
      }
    }
  };

  const handleNameChange = () => {
    if (editable) {
      setEditMode(true);
    }
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();
    setEditMode(false);
    onNameChange(newName);
  };

  const onNameChange = (newName) => {
    setNewName(newName);
    // Hier kannst du die entsprechende Logik zum Speichern des neuen Namens implementieren
  };

  const counterColor = count < 0 ? "red" : count > 0 ? "lime" : "transparent";
  const counterStyle = {
    backgroundColor: counterColor,
    borderRadius: "30px",
  };

  return (
    <div className="counter" style={counterStyle}>
      <div className="counter-header">
        <p className="counter-name" onClick={handleNameChange}>
          {newName}
        </p>
        {editable && !editMode && <div className="counter-edit"></div>}
      </div>
      <div className="counter-count-wrapper" onClick={handleNumberChange}>
        <p className="counter-count">{count}</p>
        <p className="counter-alltime">All time: {allTimeCount}</p>
      </div>
      {editMode && (
        <form onSubmit={handleNameSubmit} className="counter-edit-form">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
}
function App() {
  const counterNames = ["Filip", "Mike", "Mert", "Mahir"];

  const [counters1, setCounters1] = useState([0, 0, 0, 0]);
  const [counters2, setCounters2] = useState([0, 0, 0, 0]);
  const [allTimeCounters1, setAllTimeCounters1] = useState([0, 0, 0, 0]);
  const [allTimeCounters2, setAllTimeCounters2] = useState([0, 0, 0, 0]);
  const [history, setHistory] = useState([]);
  const [historyVisible, setHistoryVisible] = useState(true);
  const [showScreen2, setShowScreen2] = useState(false);
  const [headerText, setHeaderText] = useState("Karten");

  useEffect(() => {
    // Daten aus dem localStorage laden
    const storedCounters1 = localStorage.getItem("counters1");
    const storedCounters2 = localStorage.getItem("counters2");
    const storedAllTimeCounters1 = localStorage.getItem("allTimeCounters1");
    const storedAllTimeCounters2 = localStorage.getItem("allTimeCounters2");
    const storedHistory = localStorage.getItem("history");

    if (storedCounters1) {
      setCounters1(JSON.parse(storedCounters1));
    }
    if (storedCounters2) {
      setCounters2(JSON.parse(storedCounters2));
    }
    if (storedAllTimeCounters1) {
      setAllTimeCounters1(JSON.parse(storedAllTimeCounters1));
    }
    if (storedAllTimeCounters2) {
      setAllTimeCounters2(JSON.parse(storedAllTimeCounters2));
    }
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    // Daten in localStorage speichern
    localStorage.setItem("counters1", JSON.stringify(counters1));
    localStorage.setItem("counters2", JSON.stringify(counters2));
    localStorage.setItem("allTimeCounters1", JSON.stringify(allTimeCounters1));
    localStorage.setItem("allTimeCounters2", JSON.stringify(allTimeCounters2));
    localStorage.setItem("history", JSON.stringify(history));
  }, [counters1, counters2, allTimeCounters1, allTimeCounters2, history]);

  const updateCounter = (index, number, screen) => {
    if (screen === 1) {
      const updatedCounters = [...counters1];
      const updatedAllTimeCounters = [...allTimeCounters1];
      updatedCounters[index] += number;
      updatedAllTimeCounters[index] += number;
      setCounters1(updatedCounters);
      setAllTimeCounters1(updatedAllTimeCounters);
    } else if (screen === 2) {
      const updatedCounters = [...counters2];
      const updatedAllTimeCounters = [...allTimeCounters2];
      updatedCounters[index] += number;
      updatedAllTimeCounters[index] += number;
      setCounters2(updatedCounters);
      setAllTimeCounters2(updatedAllTimeCounters);
    }

    const change = `${counterNames[index]}: ${number}`;
    setHistory([...history, change]);
  };

  const resetCounters = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the counters?"
    );
    if (confirmed) {
      if (showScreen2) {
        const updatedCounters2 = [0, 0, 0, 0];
        const updatedAllTimeCounters2 = [...allTimeCounters2];
        setCounters2(updatedCounters2);
        setAllTimeCounters2(updatedAllTimeCounters2);
      } else {
        const updatedCounters1 = [0, 0, 0, 0];
        const updatedAllTimeCounters1 = [...allTimeCounters1];
        setCounters1(updatedCounters1);
        setAllTimeCounters1(updatedAllTimeCounters1);
      }
      setHistory([]);
    }
  };

  const toggleHistoryVisibility = () => {
    setHistoryVisible(!historyVisible);
  };

  const toggleScreen = () => {
    setShowScreen2(!showScreen2);
    if (showScreen2) {
      setHeaderText("Karten");
    } else {
      setHeaderText("Monopoly");
    }
  };

  const handleCounterNameChange = (index, newName) => {
    const updatedCounterNames = [...counterNames];
    updatedCounterNames[index] = newName;
    setCounterNames(updatedCounterNames);
  };

  return (
    <div className="app">
      <h1 className="header" onClick={toggleScreen}>
        {headerText}
        {showScreen2 ? " 🎲" : " 🃏"}
      </h1>
      <div className="row">
        <div className="column">
          <Counter
            name={counterNames[0]}
            count={showScreen2 ? counters2[0] : counters1[0]}
            allTimeCount={
              showScreen2 ? allTimeCounters2[0] : allTimeCounters1[0]
            }
            onNumberChange={(number) =>
              updateCounter(0, number, showScreen2 ? 2 : 1)
            }
            onNameChange={(newName) => handleCounterNameChange(0, newName)}
            editable={true}
          />
        </div>
        <div className="column">
          <Counter
            name={counterNames[1]}
            count={showScreen2 ? counters2[1] : counters1[1]}
            allTimeCount={
              showScreen2 ? allTimeCounters2[1] : allTimeCounters1[1]
            }
            onNumberChange={(number) =>
              updateCounter(1, number, showScreen2 ? 2 : 1)
            }
            onNameChange={(newName) => handleCounterNameChange(1, newName)}
            editable={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Counter
            name={counterNames[2]}
            count={showScreen2 ? counters2[2] : counters1[2]}
            allTimeCount={
              showScreen2 ? allTimeCounters2[2] : allTimeCounters1[2]
            }
            onNumberChange={(number) =>
              updateCounter(2, number, showScreen2 ? 2 : 1)
            }
            onNameChange={(newName) => handleCounterNameChange(2, newName)}
            editable={true}
          />
        </div>
        <div className="column">
          <Counter
            name={counterNames[3]}
            count={showScreen2 ? counters2[3] : counters1[3]}
            allTimeCount={
              showScreen2 ? allTimeCounters2[3] : allTimeCounters1[3]
            }
            onNumberChange={(number) =>
              updateCounter(3, number, showScreen2 ? 2 : 1)
            }
            onNameChange={(newName) => handleCounterNameChange(3, newName)}
            editable={true}
          />
        </div>
      </div>
      <div className="reset-button">
        <button onClick={resetCounters} className="reset-button">
          Reset Counters
        </button>
      </div>
      <div className="gönn">
        <Gönnerator />
      </div>
      <div className="history-toggle" onClick={toggleHistoryVisibility}>
        <p className="history-title">History</p>
      </div>
      {historyVisible && (
        <div className="history-list">
          <ul className="history-items">
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
