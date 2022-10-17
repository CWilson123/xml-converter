import FileUpload from "./components/FileUpload";
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import StringToJSON from "./components/StringToJSON";

function App() {
	const [file, setFile] = useState("");
	const [finalJSON, setFinalJSON] = useState({});

	return (
		<>
			<div class="container">
				<FileUpload file={file} setFile={setFile} />
				<StringToJSON
					file={file}
					setFinalJSON={setFinalJSON}
				></StringToJSON>
			</div>
		</>
	);
}

export default App;
