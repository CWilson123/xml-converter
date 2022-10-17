import "./fileUpload.css";

export default function FileUpload(props) {
	async function handleUpload(event) {
		const [file] = document.querySelector("input[type=file]").files;
		const reader = new FileReader();

		reader.addEventListener(
			"load",
			() => {
				props.setFile(reader.result);
			},
			false
		);

		if (file) {
			reader.readAsText(file);
		}
	}

	return (
		<div id="upload-box" class="uploadBox">
			<label for="file-upload" class="custom-file-upload">
				Press here to upload
			</label>
			<input
				class="hidden"
				type="file"
				id="file-upload"
				onChange={handleUpload}
			/>
		</div>
	);
}
