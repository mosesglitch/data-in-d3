import "./App.css";
import * as d3 from "d3";
import { MouseFollower } from "./components/MouseFollower";
import { useState, useEffect } from "react";
import { message } from "./components/message";
import { csv, arc, pie, scaleBand, scaleLinear, max } from "d3";
const csvUrl =
  "https://gist.githubusercontent.com/mosesglitch/441cda6e0f474565bef0ed3104c9ef07/raw/59b37788e1586763591c0cc69a31a7cd03d85508/UN_Population_2021.csv";
const width = 960;
const height = 500;
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.Population = +d["2022"];
      return d;
    };
    d3.csv(csvUrl, row).then((data) => {
      setData(data.slice(0, 20));
    });
    console.log(data[0]);
  }, []);

  const yScale = scaleBand()
    .domain(data.map((d) => d["Country or Area"]))
    .range([0, height]);
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, width]);
  if (!data) {
    return <pre>"...loading"</pre>;
  }
  return (
    <svg width={width} heigth={height}>
      {data.map((d) => (
        <rect
          x={0}
          y={yScale(d["Country or Area"])}
          width={xScale(d.Population)}
          height={yScale.bandwidth()}
        />
      ))}
    </svg>
  );
}

export default App;
