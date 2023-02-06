import "./App.css";
import * as d3 from "d3";
import { MouseFollower } from "./components/MouseFollower";
import { useState, useEffect } from "react";
import { message } from "./components/message";
import { csv, arc, pie } from "d3";
const csvUrl =
  "https://gist.githubusercontent.com/mosesglitch/6078236a3c719b590e54c1c107f52cbb/raw/cssNamedColors.csv";
function Spectre() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // const fetchText = async (url) => {
    //   const response = await fetch(url);
    //   return await response.text();
    // };
    d3.csv(csvUrl).then(setData);
  }, []);

  // fetchText(csvUrl).then((text) => {
  //   const data = d3.csvParse(text);
  //   let message = "";
  //   message = message + Math.round(text.length / 1024) + "Kbs\n";
  //   message = message + data.length + "rows\n";
  //   message = message + data.columns.length + "columns\n";
  //   document.getElementById("message-container").textContent = message;
  //   console.log(data.columns.length);
  // });
  // fetch(url).then((response) => {
  //   response.text().then((text) => {
  //     console.log(text);
  //   });
  // });
  const width = window.innerWidth;
  const height = window.innerHeight;
  const centerX = width / 2;
  const centerY = height / 2;
  const pieArc = arc().innerRadius(0).outerRadius(width);
  // .startAngle(Math.PI / 2)
  // .endAngle((Math.PI * 3) / 2);
  const colorPi = pie().value(1);
  if (!data) {
    return <pre>"...loading"</pre>;
  }
  return (
    <div
      style={{
        backgroundColor: "green",
        height: window.innerHeight / 2,
        width: window.innerWidth / 2,
      }}
    >
      <svg width={width} heigth={height}>
        <g transform={`translate(${733 / 1.5},${608 / 2})`}>
          {colorPi(data).map((d) => (
            <path fill={d.data["RGB hex value"]} d={pieArc(d)} />
          ))}
        </g>
      </svg>
    </div>
    // <svg width={width} heigth={height}>
    //   <g transform={`translate(${centerX},${centerY})`}>
    //     {data.map((d, i) => (
    //       <path
    //         fill={d["RGB hex value"]}
    //         d={pieArc({
    //           startAngle: (i / data.length) * 2 * Math.PI,
    //           endAngle: ((i + 1) / data.length) * 2 * Math.PI,
    //         })}
    //       />
    //     ))}
    //   </g>
    // </svg>
  );
}

export default Spectre;
