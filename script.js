(() => {
	// Static classes (non-numeric)
	const mojiCss = {
		// background
		"moji-bg-red":     "background-color:red",
		"moji-bg-blue":    "background-color:blue",
		"moji-bg-green":   "background-color:green",
		"moji-bg-grey":    "background-color:grey",
		"moji-bg-white":   "background-color:white",
		"moji-bg-black":   "background-color:black",
		"moji-bg-yellow":  "background-color:yellow",

		// text color
		"moji-text-red":    "color:red",
		"moji-text-blue":   "color:blue",
		"moji-text-green":  "color:green",
		"moji-text-white":  "color:white",
		"moji-text-black":  "color:black",
		"moji-text-grey":   "color:grey",
		// legacy (keep old ones working)
		"moji-red":   "color:red",
		"moji-green": "color:green",
		"moji-blue":  "color:blue",

		// display
		"moji-flex":         "display:flex",
		"moji-block":        "display:block",
		"moji-inline":       "display:inline",
		"moji-inline-block": "display:inline-block",
		"moji-hidden":       "display:none",
		"moji-grid":         "display:grid",

		// flex
		"moji-justify-center":  "justify-content:center",
		"moji-justify-start":   "justify-content:flex-start",
		"moji-justify-end":     "justify-content:flex-end",
		"moji-justify-between": "justify-content:space-between",
		"moji-justify-around":  "justify-content:space-around",
		"moji-align-center":    "align-items:center",
		"moji-align-start":     "align-items:flex-start",
		"moji-align-end":       "align-items:flex-end",
		"moji-flex-wrap":       "flex-wrap:wrap",
		"moji-flex-col":        "flex-direction:column",
		"moji-flex-row":        "flex-direction:row",

		// text
		"moji-bold":       "font-weight:bold",
		"moji-italic":     "font-style:italic",
		"moji-underline":  "text-decoration:underline",
		"moji-uppercase":  "text-transform:uppercase",
		"moji-lowercase":  "text-transform:lowercase",
		"moji-capitalize": "text-transform:capitalize",
		"moji-text-center": "text-align:center",
		"moji-text-left":   "text-align:left",
		"moji-text-right":  "text-align:right",

		// sizing
		"moji-w-full":   "width:100%",
		"moji-h-full":   "height:100%",
		"moji-w-half":   "width:50%",
		"moji-h-half":   "height:50%",

		// misc
		"moji-rounded":       "border-radius:4px",
		"moji-rounded-full":  "border-radius:9999px",
		"moji-shadow":        "box-shadow:0 2px 8px rgba(0,0,0,0.2)",
		"moji-cursor-pointer":"cursor:pointer",
		"moji-overflow-hidden":"overflow:hidden",
	};

	// Dynamic numeric class map: prefix -> css property
	// usage: moji-p-8 => padding:8px , moji-mt-12 => margin-top:12px , etc.
	const dynamicMap = {
		"moji-p":   "padding",
		"moji-m":   "margin",
		"moji-pt":  "padding-top",
		"moji-pb":  "padding-bottom",
		"moji-pl":  "padding-left",
		"moji-pr":  "padding-right",
		"moji-mt":  "margin-top",
		"moji-mb":  "margin-bottom",
		"moji-ml":  "margin-left",
		"moji-mr":  "margin-right",
		"moji-px":  ["padding-left", "padding-right"],
		"moji-py":  ["padding-top",  "padding-bottom"],
		"moji-mx":  ["margin-left",  "margin-right"],
		"moji-my":  ["margin-top",   "margin-bottom"],
		"moji-fs":  "font-size",
		"moji-fw":  "font-weight",
		"moji-br":  "border-radius",
		"moji-w":   "width",
		"moji-h":   "height",
		"moji-gap": "gap",
		"moji-z":   "z-index",
		"moji-op":  "opacity",
		"moji-lh":  "line-height",
		"moji-ls":  "letter-spacing",
		"moji-border": "border-width",
	};

	// px-less properties (no "px" unit appended)
	const noPx = new Set(["font-weight", "z-index", "opacity", "line-height"]);

	function resolveDynamic(cls) {
		// try longest prefix first so moji-pt matches before moji-p
		const prefixes = Object.keys(dynamicMap).sort((a, b) => b.length - a.length);
		for (const prefix of prefixes) {
			if (cls.startsWith(prefix + "-")) {
				const val = cls.slice(prefix.length + 1);
				if (val === "" || isNaN(Number(val))) continue;
				const prop = dynamicMap[prefix];
				const unit = Array.isArray(prop)
					? noPx.has(prop[0]) ? "" : "px"
					: noPx.has(prop) ? "" : "px";
				if (Array.isArray(prop)) {
					return prop.map(p => `${p}:${val}${unit}`).join(";");
				}
				return `${prop}:${val}${unit}`;
			}
		}
		return null;
	}

	function applyMojitoCss(ele) {
		const classList = ele.className.split(" ");
		let styleString = "";

		classList.forEach((cls) => {
			if (mojiCss[cls]) {
				styleString += mojiCss[cls] + ";";
			} else {
				const dynamic = resolveDynamic(cls);
				if (dynamic) styleString += dynamic + ";";
			}
		});

		if (styleString) ele.setAttribute("style", styleString);
	}

	window.addEventListener("DOMContentLoaded", () => {
		document.querySelectorAll('[class*="moji-"]').forEach(applyMojitoCss);
	});
})();
