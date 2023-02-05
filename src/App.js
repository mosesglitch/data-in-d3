import "./App.css";
import * as d3 from "d3";
import { MouseFollower } from "./components/MouseFollower";
function App() {
  const csvUrl =
    "https://gist.githubusercontent.com/mosesglitch/6078236a3c719b590e54c1c107f52cbb/raw/cssNamedColors.csv";
  const fetchText = async (url) => {
    const response = await fetch(url);
    return await response.text();
  };
  d3.csv(csvUrl).then((data) => {
    let message = "";
    message = message + Math.round(d3.csvFormat(data).length / 1024) + "Kbs\n";
    message = message + data.length + "rows\n";
    message = message + data.columns.length + "columns\n";
    document.getElementById("message-container").textContent = message;
  });

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
  return (
    <div className="App">
      {/* <MouseFollower /> */}
      <pre id="message-container"></pre>
    </div>
  );
}

export default App;
