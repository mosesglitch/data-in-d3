import "./App.css";
import * as d3 from "d3";
import { MouseFollower } from "./components/MouseFollower";
import { useState, useEffect } from "react";
import { message } from "./components/message";
import { csv, arc, pie, scaleBand, scaleLinear, max } from "d3";
import { BarchartSample } from "./components/BarchartSample";
const csvUrl =
  "https://gist.githubusercontent.com/mosesglitch/441cda6e0f474565bef0ed3104c9ef07/raw/59b37788e1586763591c0cc69a31a7cd03d85508/UN_Population_2021.csv";
const dataset1 = [33, 57, 84, 21, 60];
const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.Population = +d["2021"];
      return d;
    };

    d3.csv(csvUrl, row).then((data) => {
      setData(data).slice(10, 20);
    });
    // console.log(data[0]);
  }, []);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const yScale = scaleBand()
    .domain(data.map((d) => d["Country or Area"]))
    .range([0, innerHeight]);
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, innerWidth]);

  if (!data) {
    return <pre>"...loading"</pre>;
  }
  return (
    <div style={{ backgroundColor: "green" }}>
      <svg width={width} heigth={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {xScale.ticks((tickValue) => {
            <line
              x1={xScale(tickValue)}
              y1={0}
              x2={xScale(tickValue)}
              y2={innerHeight}
              stroke=""
            />;
          })}
          {data.map((d) => (
            <rect
              x={0}
              y={yScale(d["Country or Area"])}
              width={xScale(d.Population)}
              height={yScale.bandwidth()}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export default App;
