const input = document.getElementById("pg-input");
const preview = document.getElementById("pg-preview");

input.addEventListener("input", () => {
	preview.className = input.value.trim();
	preview.removeAttribute("style");
	window.applyMojitoCss(preview);
});
