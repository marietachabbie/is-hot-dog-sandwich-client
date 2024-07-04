import React, { useState, useEffect } from "react";
import AnswersTable from "../../Components/AnswersTable/AnswersTable.js";
import "./styles.css";

export default function Answers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/replies");
      const answers = await response.json();
      setData(answers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="Answers">
      <div className="answers-header">
        <h1>Last 100 answers</h1>
      </div>
      <AnswersTable data={data} />
    </div>
  );
}
