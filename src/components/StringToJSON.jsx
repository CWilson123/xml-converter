import "./stringToJSON.css";
import { saveAs } from "file-saver";

export default function FileUpload(props) {
	function handleClick() {
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(props.file, "text/xml");
		const names = xmlDoc.getElementsByTagName("moduEntity");
		parseXmlArray(names);
	}
	function parseXmlArray(names) {
		let finalJSON = [];
		for (let i = 0; i < names.length; i++) {
			finalJSON.push(parseXmlToJson(names[i]));
			// const ob = parseXmlToJson(names[i]);
		}
		props.setFinalJSON(finalJSON);
		var json = JSON.stringify(finalJSON);
		json = [json];
		var blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });
		saveAs(blob1, "geoJSON.json");
	}

	function parseXmlToJson(xml) {
		let x = xml.children;
		let geo = {};
		let properties = {};
		let coordinates = [0, 0];
		let geometry = {};

		for (var i = 0; i < x.length; i++) {
			if (x[i].tagName === "name") {
				properties.name = x[i].innerHTML;
			} else if (x[i].tagName === "latitude") {
				coordinates[0] = Number(x[i].innerHTML);
			} else if (x[i].tagName === "longitude") {
				coordinates[1] = Number(x[i].innerHTML);
			} else {
				properties[x[i].tagName] = x[i].innerHTML;
			}
		}
		geo.type = "feature";
		geometry.type = "point";
		geometry.coordinates = coordinates;
		geo.geometry = geometry;
		geo.properties = properties;

		return geo;
	}

	return (
		<div class="downloadBox">
			{props.file && (
				<button
					class="button"
					onClick={() => {
						handleClick();
					}}
				>
					Download Converted JSON
				</button>
			)}
		</div>
	);
}
