module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./build/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "rgba(59, 130, 246)",
				primaryLight: "rgba(59, 130, 246, .45)",
				dark: "rgb(41 41 41)",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
