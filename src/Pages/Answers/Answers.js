import { useState, useEffect } from "react";
import { Table } from "antd";
import "./AnswersStyles.css";

const columns = [
  {
    title: "Is a hot dog a sandwich? Why?",
    dataIndex: "content"
  }
];

export default function Answers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className="answers-header">
        <label>
          <b>Here is what people have to say:</b>
        </label>
      </div>
      <Table columns={columns} dataSource={data ?? []} onChange={onChange} />
    </div>
  );
}
