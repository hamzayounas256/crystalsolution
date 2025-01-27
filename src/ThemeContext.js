import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

// Custom hook to use the theme context
export function useTheme() {
	return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const today = new Date();

	// Format the date to yyyy-mm-dd for the input field
	const defaultFromDate = `${year}-${month.toString().padStart(2, "0")}-${day
		.toString()
		.padStart(2, "0")}`;

	const formattedTime = today.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: true,
	});

	const [getnowdate, setnowdate] = useState(defaultFromDate);
	const [getnowtime, setnowtime] = useState(formattedTime);
	const [getheaderfontsize, setheaderfontsize] = useState("14px");
	const [getdatafontsize, setdatafontsize] = useState("12px");
	const [getsidebarfontsize, setsidebarfontsize] = useState("12px");

	const [getfontstyle, setfontstyle] = useState("Verdana");
	const [getrowhover, setrowhover] = useState("#6290d2");

	// States for colors and sidebar
	const [isSidebarVisible, setSidebarVisible] = useState(false);
	const [getcolor, setcolor] = useState("white");
	const [fontcolor, setfontcolor] = useState("black");
	const [getfromdate, setFromDate] = useState("");
	const [gettodate, setToDate] = useState("");
	const [getLocationNumber, setLocationNumber] = useState("");
	const [getyeardescription, setYearDescription] = useState("");

	// States for other theme values
	const [getbuttonbackgroundcolor, setbuttonbackgroundcolor] =
		useState("#186DB7");
	// #186DB7
	const [getbuttonfontcolor, setbuttonfontcolor] =
		useState("rgb(230, 233, 236)");
	const [getnavbarbackgroundcolor, setnavbarbackgrouncolor] =
		useState("#3368b5");
	const [getnavbarfontcolor, setnavbarfontcolor] = useState("#fff");

	const [primaryColor, setPrimaryColor] = useState("#1f2670");
	const [secondaryColor, setSecondaryColor] = useState("white");
	const [navbarHeight, setNavbarHeight] = useState(30);
	const [pathHeight, setPathbarHeight] = useState(30);
	const [apiLinks, setApiLinks] = useState(
		"https://crystalsolutions.com.pk/api"
	);

	// Sidebar toggle function
	const toggleSidebar = (visible) => {
		setSidebarVisible(visible);
	};

	// Toggle sidebar colors (existing functionality)
	const toggleChangeColor = () => {
		setcolor((prev) => (prev === "white" ? "#021A33" : "white"));
		setfontcolor((prev) => (prev === "black" ? "white" : "black"));
	};

	// Provide both states and set functions to allow updates from other components
	const theme = {
		isSidebarVisible,
		toggleSidebar,
		getcolor,
		fontcolor,
		setcolor,
		setfontcolor,
		setnowtime,
		setnowdate,
		setFromDate,
		setToDate,
		setLocationNumber,
		setYearDescription,
		toggleChangeColor,
		getfromdate,
		gettodate,
		getLocationNumber,
		getyeardescription,
		getnowdate,
		getnowtime,
		getbuttonfontcolor,
		getbuttonbackgroundcolor,
		getnavbarbackgroundcolor,
		getnavbarfontcolor,
		primaryColor,
		secondaryColor,
		navbarHeight,
		pathHeight,
		apiLinks,
		getfontstyle,
		getdatafontsize,
		getsidebarfontsize,
		getheaderfontsize,
		getrowhover,
	};

	return (
		<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
	);
}
