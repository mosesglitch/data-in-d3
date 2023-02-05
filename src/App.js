import "./App.css";
import * as d3 from "d3";
import { MouseFollower } from "./components/MouseFollower";
import { useState, useEffect } from "react";
import { message } from "./components/message";

const csvUrl =
  "https://gist.githubusercontent.com/mosesglitch/6078236a3c719b590e54c1c107f52cbb/raw/cssNamedColors.csv";
function App() {
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
  if (!data) {
    return <pre>"...loading"</pre>;
  }
  return data.map((d) => (
    <div
      style={{
        backgroundColor: d["RGB hex value"],
        width: "526px",
        height: "4px",
      }}
    />
  ));
}

export default App;
