import React, { useState, useEffect, useRef } from "react";
import { Container, Spinner, Nav } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../ThemeContext";
import { getUserData, getOrganisationData } from "../../Auth";
import NavComponent from "../../MainComponent/Navform/navbarform";
import SingleButton from "../../MainComponent/Button/SingleButton/SingleButton";
import Select from "react-select";
import { components } from "react-select";
import { BsCalendar } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import "react-calendar/dist/Calendar.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetUser } from "../../Redux/action";
import { useHotkeys } from "react-hotkeys-hook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MarginOutlined } from "@mui/icons-material";

export default function ItemMonthlyPurchaseComparison() {
	const navigate = useNavigate();
	const user = getUserData();
	const organisation = getOrganisationData();

	const storeRef = useRef(null);
	const typeRef = useRef(null);
	const searchRef = useRef(null);
	const selectButtonRef = useRef(null);

	const [searchQuery, setSearchQuery] = useState("");
	const [transectionType, settransectionType] = useState("");

	const [storeList, setStoreList] = useState([]);
	const [storeType, setStoreType] = useState("");

	const [jan, setJan] = useState(0);
	const [feb, setFeb] = useState(0);
	const [mar, setMar] = useState(0);
	const [apr, setApr] = useState(0);
	const [may, setMay] = useState(0);
	const [jun, setJun] = useState(0);
	const [jul, setJul] = useState(0);
	const [aug, setAug] = useState(0);
	const [sep, setSep] = useState(0);
	const [oct, setOct] = useState(0);
	const [nov, setNov] = useState(0);
	const [dec, setDec] = useState(0);

	const [total, setTotal] = useState(0);

	const {
		isSidebarVisible,
		toggleSidebar,
		getcolor,
		fontcolor,
		toggleChangeColor,
		apiLinks,
		getLocationNumber,
		getyeardescription,
		getfromdate,
		gettodate,
	} = useTheme();

	useEffect(() => {
		document.documentElement.style.setProperty("--background-color", getcolor);
	}, [getcolor]);

	const comapnyname = organisation.description;

	function fetchItemMonthlyPurchaseComparison() {
		const apiMainUrl = apiLinks + "/ItemMonthlyPurchaseComparison.php";
		setIsLoading(true);
		const formMainData = new URLSearchParams({
			code: "NASIRTRD",
			FLocCod: "001",
			FRepTyp: transectionType,
			FStrCod: storeType,
			FSchTxt: "",
		}).toString();

		axios
			.post(apiMainUrl, formMainData)
			.then((response) => {
				setIsLoading(false);
				// console.log("Response:", response.data);

				setJan(response.data["Total Jan"]);
				setFeb(response.data["Total Feb"]);
				setMar(response.data["Total Mar"]);
				setApr(response.data["Total Apr"]);
				setMay(response.data["Total May"]);
				setJun(response.data["Total Jun"]);
				setJul(response.data["Total Jul"]);
				setAug(response.data["Total Aug"]);
				setSep(response.data["Total Sep"]);
				setOct(response.data["Total Oct"]);
				setNov(response.data["Total Nov"]);
				setDec(response.data["Total Dec"]);
				setTotal(response.data["Total"]);

				if (response.data && Array.isArray(response.data.Detail)) {
					setTableData(response.data.Detail);
				} else {
					console.warn(
						"Response data structure is not as expected:",
						response.data
					);
					setTableData([]);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
				setIsLoading(false);
			});
	}

	// useEffect(() => {
	// 	const hasComponentMountedPreviously =
	// 		sessionStorage.getItem("componentMounted");
	// 	if (!hasComponentMountedPreviously || (storeRef && storeRef.current)) {
	// 		if (storeRef && storeRef.current) {
	// 			setTimeout(() => {
	// 				storeRef.current.focus();
	// 				storeRef.current.select();
	// 			}, 0);
	// 		}
	// 		sessionStorage.setItem("componentMounted", "true");
	// 	}
	// }, []);

	useEffect(() => {
		//----------------- store dropdown
		const apiStoreUrl = apiLinks + "/GetCompany.php";
		const formStoreData = new URLSearchParams({
			code: organisation.code,
		}).toString();
		axios
			.post(apiStoreUrl, formStoreData)
			.then((response) => {
				setStoreList(response.data);
				// console.log("STORE"+response.data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	// Store List array
	const optionStore = storeList.map((item) => ({
		value: item.tcmpcod,
		label: `${item.tcmpcod}-${item.tcmpdsc.trim()}`,
	}));

	const DropdownOption = (props) => {
		return (
			<components.Option {...props}>
				<div
					style={{
						fontSize: "12px",
						paddingBottom: "5px",
						lineHeight: "3px",
						color: "black",
						textAlign: "start",
					}}
				>
					{props.data.label}
				</div>
			</components.Option>
		);
	};

	// ------------ store style customization
	const customStylesStore = () => ({
		control: (base, state) => ({
			...base,
			height: "24px",
			minHeight: "unset",
			width: "275px",
			fontSize: "12px",
			backgroundColor: getcolor,
			color: fontcolor,
			borderRadius: 0,
			// border: hasError ? "2px solid red" : `1px solid ${fontcolor}`,
			transition: "border-color 0.15s ease-in-out",
			"&:hover": {
				borderColor: state.isFocused ? base.borderColor : "black",
			},
			padding: "0 8px",
			display: "flex",
			// alignItems: "center",
			justifyContent: "space-between",
		}),
		dropdownIndicator: (base) => ({
			...base,
			padding: 0,
			fontSize: "18px",
			display: "flex",
			textAlign: "center !important",
		}),
	});

	const exportPDFHandler = async () => {
		const doc = new jsPDF({ orientation: "landscape" });
		const rows = tableData.map((item) => [
			item.Category,
			item["Jan"],
			item["Feb"],
			item["Mar"],
			item["Apr"],
			item["May"],
			item["Jun"],
			item["Jul"],
			item["Aug"],
			item["Sep"],
			item["Oct"],
			item["Nov"],
			item["Dec"],
			item["Total"],
		]);
		rows.push([
			"Total",
			String(jan),
			String(feb),
			String(mar),
			String(apr),
			String(may),
			String(jun),
			String(jul),
			String(aug),
			String(sep),
			String(oct),
			String(nov),
			String(dec),
			String(total),
		]);
		const headers = [
			"Category",
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
			"Tot",
		];
		const columnWidths = [
			80, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
		];
		const totalWidth = columnWidths.reduce((acc, width) => acc + width, 0);
		const pageHeight = doc.internal.pageSize.height;
		const paddingTop = 15;
		doc.setFont("verdana");
		doc.setFontSize(10);

		const addTableHeaders = (startX, startY) => {
			doc.setFont("bold");
			doc.setFontSize(10);
			headers.forEach((header, index) => {
				const cellWidth = columnWidths[index];
				const cellHeight = 6;
				const cellX = startX + cellWidth / 2;
				const cellY = startY + cellHeight / 2 + 1.5;
				doc.setFillColor(200, 200, 200);
				doc.rect(startX, startY, cellWidth, cellHeight, "F");
				doc.setLineWidth(0.2);
				doc.rect(startX, startY, cellWidth, cellHeight);
				doc.setTextColor(0);
				doc.text(header, cellX, cellY, { align: "center" });
				startX += columnWidths[index];
			});
			doc.setFont("verdana");
			doc.setFontSize(10);
		};

		const addTableRows = (startX, startY, startIndex, endIndex) => {
			const rowHeight = 5;
			const fontSize = 8;
			const boldFont = "verdana";
			const normalFont = "verdana";
			const tableWidth = getTotalTableWidth();
			doc.setFontSize(fontSize);

			for (let i = startIndex; i < endIndex; i++) {
				const row = rows[i];
				const isOddRow = i % 2 !== 0;
				const isRedRow = row[0] && parseInt(row[0]) > 100;
				let textColor = [0, 0, 0];
				let fontName = normalFont;

				// if (isRedRow) {
				// 	textColor = [255, 0, 0];
				// 	fontName = boldFont;
				// }

				doc.setDrawColor(0);
				doc.rect(
					startX,
					startY + (i - startIndex + 2) * rowHeight,
					tableWidth,
					rowHeight
				);

				row.forEach((cell, cellIndex) => {
					const cellY = startY + (i - startIndex + 2) * rowHeight + 3;
					const cellX = startX + 2;
					doc.setTextColor(textColor[0], textColor[1], textColor[2]);
					doc.setFont(fontName, "normal");
					const cellValue = String(cell);

					if (
						cellIndex === 1 ||
						cellIndex === 2 ||
						cellIndex === 3 ||
						cellIndex === 4 ||
						cellIndex === 5 ||
						cellIndex === 6 ||
						cellIndex === 7 ||
						cellIndex === 8 ||
						cellIndex === 9 ||
						cellIndex === 10 ||
						cellIndex === 11 ||
						cellIndex === 12 ||
						cellIndex === 13
					) {
						const rightAlignX = startX + columnWidths[cellIndex] - 2;
						doc.text(cellValue, rightAlignX, cellY, {
							align: "right",
							baseline: "middle",
						});
					} else {
						doc.text(cellValue, cellX, cellY, { baseline: "middle" });
					}

					if (cellIndex < row.length - 1) {
						doc.rect(
							startX,
							startY + (i - startIndex + 2) * rowHeight,
							columnWidths[cellIndex],
							rowHeight
						);
						startX += columnWidths[cellIndex];
					}
				});

				doc.rect(
					startX,
					startY + (i - startIndex + 2) * rowHeight,
					columnWidths[row.length - 1],
					rowHeight
				);
				startX = (doc.internal.pageSize.width - tableWidth) / 2;
			}

			const lineWidth = tableWidth;
			const lineX = (doc.internal.pageSize.width - tableWidth) / 2;
			const lineY = pageHeight - 15;
			doc.setLineWidth(0.3);
			doc.line(lineX, lineY, lineX + lineWidth, lineY);
			const headingFontSize = 12;
			const headingX = lineX + 2;
			const headingY = lineY + 5;
			doc.setFontSize(headingFontSize);
			doc.setTextColor(0);
			doc.text(`Crystal Solution \t ${date} \t ${time}`, headingX, headingY);
		};

		const getTotalTableWidth = () => {
			let totalWidth = 0;
			columnWidths.forEach((width) => (totalWidth += width));
			return totalWidth;
		};

		const addNewPage = (startY) => {
			doc.addPage();
			return paddingTop;
		};

		const rowsPerPage = 29;

		const handlePagination = () => {
			const addTitle = (
				title,
				date,
				time,
				pageNumber,
				startY,
				titleFontSize = 16,
				dateTimeFontSize = 8,
				pageNumberFontSize = 8
			) => {
				doc.setFontSize(titleFontSize);
				doc.text(title, doc.internal.pageSize.width / 2, startY, {
					align: "center",
				});
				const rightX = doc.internal.pageSize.width - 10;
				if (date) {
					doc.setFontSize(dateTimeFontSize);
					if (time) {
						doc.text(date + " " + time, rightX, startY, { align: "right" });
					} else {
						doc.text(date, rightX - 10, startY, { align: "right" });
					}
				}
				doc.setFontSize(pageNumberFontSize);
				doc.text(
					`Page ${pageNumber}`,
					rightX - 10,
					doc.internal.pageSize.height - 10,
					{ align: "right" }
				);
			};

			let currentPageIndex = 0;
			let startY = paddingTop;
			let pageNumber = 1;

			while (currentPageIndex * rowsPerPage < rows.length) {
				addTitle(comapnyname, "", "", pageNumber, startY, 20, 10);
				startY += 7;
				addTitle(
					`Item Monthly Purchase Comparison`,
					"",
					"",
					pageNumber,
					startY,
					14
				);
				startY += 13;

				const labelsX = (doc.internal.pageSize.width - totalWidth) / 2;
				const labelsY = startY + 2;
				doc.setFontSize(14);
				doc.setFont("verdana", "bold");
				doc.setFont("verdana", "normal");
				startY += 0;

				addTableHeaders((doc.internal.pageSize.width - totalWidth) / 2, 39);
				const startIndex = currentPageIndex * rowsPerPage;
				const endIndex = Math.min(startIndex + rowsPerPage, rows.length);
				startY = addTableRows(
					(doc.internal.pageSize.width - totalWidth) / 2,
					startY,
					startIndex,
					endIndex
				);
				if (endIndex < rows.length) {
					startY = addNewPage(startY);
					pageNumber++;
				}
				currentPageIndex++;
			}
		};

		const getCurrentDate = () => {
			const today = new Date();
			const dd = String(today.getDate()).padStart(2, "0");
			const mm = String(today.getMonth() + 1).padStart(2, "0");
			const yyyy = today.getFullYear();
			return dd + "/" + mm + "/" + yyyy;
		};

		const getCurrentTime = () => {
			const today = new Date();
			const hh = String(today.getHours()).padStart(2, "0");
			const mm = String(today.getMinutes()).padStart(2, "0");
			const ss = String(today.getSeconds()).padStart(2, "0");
			return hh + ":" + mm + ":" + ss;
		};

		const date = getCurrentDate();
		const time = getCurrentTime();

		handlePagination();
		doc.save("ItemMonthlyPurchaseComparison.pdf");

		const pdfBlob = doc.output("blob");
		const pdfFile = new File([pdfBlob], "table_data.pdf", {
			type: "application/pdf",
		});
	};

	const handleDownloadCSV = async () => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet("Sheet1");
		const numColumns = 14;
		const titleStyle = {
			font: { bold: true, size: 12 },
			alignment: { horizontal: "center" },
		};
		const columnAlignments = [
			"left",
			"right",
			"right",
			"right",
			"right",
			"right",
			"right",
			"right",
			"right",
			"right",
			"right",
			"right",
			"right",
			"right",
		];
		worksheet.addRow([]);
		[comapnyname, `Item Monthly Purchase Comparison`].forEach(
			(title, index) => {
				worksheet.addRow([title]).eachCell((cell) => (cell.style = titleStyle));
				worksheet.mergeCells(
					`A${index + 2}:${String.fromCharCode(64 + numColumns)}${index + 2}`
				);
			}
		);
		worksheet.addRow([]);
		const headerStyle = {
			font: { bold: true },
			alignment: { horizontal: "center" },
			fill: {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "FFC6D9F7" },
			},
			border: {
				top: { style: "thin" },
				left: { style: "thin" },
				bottom: { style: "thin" },
				right: { style: "thin" },
			},
		};
		const headers = [
			"Category",
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
			"Tot",
		];
		const headerRow = worksheet.addRow(headers);
		headerRow.eachCell((cell) => {
			cell.style = { ...headerStyle, alignment: { horizontal: "center" } };
		});
		tableData.forEach((item) => {
			worksheet.addRow([
				item.Category,
				item["Jan"],
				item["Feb"],
				item["Mar"],
				item["Apr"],
				item["May"],
				item["Jun"],
				item["Jul"],
				item["Aug"],
				item["Sep"],
				item["Oct"],
				item["Nov"],
				item["Dec"],
				item["Total"],
			]);
		});
		const totalRow = worksheet.addRow([
			"Total",
			String(jan),
			String(feb),
			String(mar),
			String(apr),
			String(may),
			String(jun),
			String(jul),
			String(aug),
			String(sep),
			String(oct),
			String(nov),
			String(dec),
			String(total),
		]);
		totalRow.eachCell((cell) => {
			cell.font = { bold: true };
		});
		[45, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10].forEach(
			(width, index) => {
				worksheet.getColumn(index + 1).width = width;
			}
		);
		worksheet.eachRow((row, rowNumber) => {
			if (rowNumber > 5) {
				row.eachCell((cell, colNumber) => {
					if (rowNumber === 5) {
						cell.alignment = { horizontal: "center" };
					} else {
						cell.alignment = { horizontal: columnAlignments[colNumber - 1] };
					}
					cell.border = {
						top: { style: "thin" },
						left: { style: "thin" },
						bottom: { style: "thin" },
						right: { style: "thin" },
					};
				});
			}
		});
		const buffer = await workbook.xlsx.writeBuffer();
		const blob = new Blob([buffer], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});
		saveAs(blob, "ItemMonthlyPurchaseComparison.xlsx");
	};

	const dispatch = useDispatch();

	const tableTopColor = "#3368B5";
	const tableHeadColor = "#3368b5";
	const secondaryColor = "white";
	const btnColor = "#3368B5";
	const textColor = "white";

	const [tableData, setTableData] = useState([]);
	const [selectedSearch, setSelectedSearch] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { data, loading, error } = useSelector((state) => state.getuser);

	const handleSearch = (e) => {
		setSelectedSearch(e.target.value);
	};

	let totalEntries = 0;

	const getFilteredTableData = () => {
		let filteredData = tableData;
		if (selectedSearch.trim() !== "") {
			const query = selectedSearch.trim().toLowerCase();
			filteredData = filteredData.filter(
				(data) => data.tusrnam && data.tusrnam.toLowerCase().includes(query)
			);
		}
		return filteredData;
	};

	const handleTransactionTypeChange = (event) => {
		const selectedTransactionType = event.target.value;
		settransectionType(selectedTransactionType);
	};

	const firstColWidth = {
		width: "20%",
	};
	const secondColWidth = {
		width: "6%",
	};
	const thirdColWidth = {
		width: "6%",
	};
	const forthColWidth = {
		width: "6%",
	};
	const fifthColWidth = {
		width: "6%",
	};
	const sixthColWidth = {
		width: "6%",
	};
	const seventhColWidth = {
		width: "6%",
	};
	const eighthColWidth = {
		width: "6%",
	};
	const ninthColWidth = {
		width: "6%",
	};
	const tenthColWidth = {
		width: "6%",
	};
	const eleventhColWidth = {
		width: "6%",
	};
	const twelwethColWidth = {
		width: "6%",
	};
	const thirteenthColWidth = {
		width: "6%",
	};
	const forteenthColWidth = {
		width: "8%",
	};

	useHotkeys("s", fetchItemMonthlyPurchaseComparison);
	useHotkeys("alt+p", exportPDFHandler);
	useHotkeys("alt+e", handleDownloadCSV);
	useHotkeys("esc", () => navigate("/MainPage"));

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	// const contentStyle = {
	// 	backgroundColor: getcolor,
	// 	width: isSidebarVisible ? "calc(65vw - 0%)" : "65vw",
	// 	position: "relative",
	// 	top: "35%",
	// 	left: isSidebarVisible ? "50%" : "50%",
	// 	transform: "translate(-50%, -50%)",
	// 	transition: isSidebarVisible
	// 		? "left 3s ease-in-out, width 2s ease-in-out"
	// 		: "left 3s ease-in-out, width 2s ease-in-out",
	// 	display: "flex",
	// 	justifyContent: "center",
	// 	alignItems: "start",
	// 	overflowX: "hidden",
	// 	overflowY: "hidden",
	// 	wordBreak: "break-word",
	// 	textAlign: "center",
	// 	maxWidth: "1400px",
	// 	fontSize: "15px",
	// 	fontStyle: "normal",
	// 	fontWeight: "400",
	// 	lineHeight: "23px",
	// 	fontFamily: '"Poppins", sans-serif',
	// };

	const contentStyle = {
		backgroundColor: getcolor,
		height: "100vh",
		width: isSidebarVisible ? "calc(100vw - 5%)" : "100vw",
		position: "relative",
		top: "50%",
		left: isSidebarVisible ? "50%" : "50%",
		transform: "translate(-50%, -50%)",
		transition: isSidebarVisible
			? "left 3s ease-in-out, width 2s ease-in-out"
			: "left 3s ease-in-out, width 2s ease-in-out",
		display: "flex",
		justifyContent: "center",
		alignItems: "start",
		overflowX: "hidden",
		overflowY: "hidden",
		wordBreak: "break-word",
		textAlign: "center",
		maxWidth: "1200px",
		fontSize: "15px",
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: "23px",
		fontFamily: '"Poppins", sans-serif',
	};

	const [isFilterApplied, setIsFilterApplied] = useState(false);
	useEffect(() => {
		if (isFilterApplied || tableData.length > 0) {
			setSelectedIndex(0);
			rowRefs.current[0]?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		} else {
			setSelectedIndex(-1);
		}
	}, [tableData, isFilterApplied]);

	let totalEnteries = 0;
	const [selectedRowId, setSelectedRowId] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const rowRefs = useRef([]);
	const handleRowClick = (index) => {
		setSelectedIndex(index);
	};

	useEffect(() => {
		if (selectedRowId !== null) {
			const newIndex = tableData.findIndex(
				(item) => item.tcmpcod === selectedRowId
			);
			setSelectedIndex(newIndex);
		}
	}, [tableData, selectedRowId]);

	const handleKeyDown = (e) => {
		if (selectedIndex === -1 || e.target.id === "searchInput") return;
		if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
			scrollToSelectedRow();
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedIndex((prevIndex) =>
				Math.min(prevIndex + 1, tableData.length - 1)
			);
			scrollToSelectedRow();
		}
	};

	const scrollToSelectedRow = () => {
		if (selectedIndex !== -1 && rowRefs.current[selectedIndex]) {
			rowRefs.current[selectedIndex].scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [selectedIndex]);

	useEffect(() => {
		if (selectedIndex !== -1 && rowRefs.current[selectedIndex]) {
			rowRefs.current[selectedIndex].scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}, [selectedIndex]);

	const [menuStoreIsOpen, setMenuStoreIsOpen] = useState(false);

	const focusNextElement = (currentRef, nextRef) => {
		if (currentRef.current && nextRef.current) {
			currentRef.current.focus();
			nextRef.current.focus();
		}
	};
	const handleTypeEnter = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			focusNextElement(typeRef, searchRef);
		}
	};

	const handleStoreEnter = (e) => {
		if (e.key === "Enter" && !menuStoreIsOpen) {
			e.preventDefault();
			focusNextElement(storeRef, typeRef);
		}
	};

	const handleSearchEnter = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			focusNextElement(searchRef, selectButtonRef);
		}
	};

	return (
		<>
			<ToastContainer />
			<div style={contentStyle}>
				<div
					style={{
						backgroundColor: getcolor,
						color: fontcolor,
						width: "100%",
						border: `1px solid ${fontcolor}`,
						borderRadius: "9px",
					}}
				>
					<NavComponent textdata="Item Monthly Purchase Comparison" />

					{/* ------------1st row */}
					<div className="row" style={{ height: "20px", margin: "8px" }}>
						<div
							style={{
								width: "100%",
								display: "flex",
								alignItems: "center",
								margin: "0px",
								padding: "0px",
								justifyContent: "space-between",
							}}
						>
							{/* Company Select */}
							<div
								className="d-flex align-items-center"
								// style={{ marginRight: "20px" }}
							>
								<div
									style={{
										// width: "120px",
										display: "flex",
										justifyContent: "end",
									}}
								>
									<label htmlFor="fromDatePicker">
										<span style={{ fontSize: "15px", fontWeight: "bold" }}>
											Company:&nbsp;&nbsp;
										</span>
										<br />
									</label>
								</div>
								<div>
									<Select
										className="List-select-class "
										ref={storeRef}
										options={optionStore}
										onKeyDown={handleStoreEnter}
										id="selectedsale"
										onChange={(selectedOption) => {
											if (selectedOption && selectedOption.value) {
												setStoreType(selectedOption.value);
											} else {
												setStoreType(""); // Clear the saleType state when selectedOption is null (i.e., when the selection is cleared)
											}
										}}
										components={{ Option: DropdownOption }}
										// styles={customStylesStore}
										styles={customStylesStore()}
										isClearable
										placeholder="Search or select..."
										menuIsOpen={menuStoreIsOpen}
										onMenuOpen={() => setMenuStoreIsOpen(true)}
										onMenuClose={() => setMenuStoreIsOpen(false)}
									/>
								</div>
							</div>

							{/* Type */}
							<div
								className="d-flex align-items-center"
								// style={{ marginRight: "20px" }}
							>
								<div
									style={{
										// width: "60px",
										display: "flex",
										justifyContent: "end",
									}}
								>
									<label htmlFor="transactionType">
										<span style={{ fontSize: "15px", fontWeight: "bold" }}>
											Type:&nbsp;&nbsp;
										</span>
									</label>
								</div>
								<select
									ref={typeRef}
									onKeyDown={handleTypeEnter}
									id="submitButton"
									name="type"
									onFocus={(e) =>
										(e.currentTarget.style.border = "4px solid red")
									}
									onBlur={(e) =>
										(e.currentTarget.style.border = `1px solid ${fontcolor}`)
									}
									value={transectionType}
									onChange={handleTransactionTypeChange}
									style={{
										width: "150px",
										height: "24px",
										// marginLeft: "15px",
										backgroundColor: getcolor,
										border: `1px solid ${fontcolor}`,
										fontSize: "12px",
										color: fontcolor,
									}}
								>
									<option value="">All</option>
									<option value="Q">Quantity</option>
									<option value="A">Amount</option>
								</select>
							</div>

							{/* Search */}
							<div
								className="d-flex align-items-center"
								// style={{ marginRight: "20px" }}
							>
								<div>
									<label for="searchInput">
										<span style={{ fontSize: "15px", fontWeight: "bold" }}>
											Search:&nbsp;&nbsp;
										</span>
									</label>
								</div>
								<div>
									<input
										ref={searchRef}
										onKeyDown={handleSearchEnter}
										type="text"
										id="searchsubmit"
										placeholder="Item description"
										value={searchQuery}
										style={{
											width: "135px",
											height: "24px",
											fontSize: "12px",
											color: fontcolor,
											backgroundColor: getcolor,
											border: `1px solid ${fontcolor}`,
											outline: "none",
											paddingLeft: "10px",
										}}
										onFocus={(e) =>
											(e.currentTarget.style.border = "2px solid red")
										}
										onBlur={(e) =>
											(e.currentTarget.style.border = `1px solid ${fontcolor}`)
										}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
								</div>
							</div>
						</div>
					</div>

					<div>
						{/* Table Head */}
						<div
							style={{
								overflowY: "auto",
								width: "99%",
							}}
						>
							<table
								className="myTable"
								id="table"
								style={{
									fontSize: "12px",
									width: "100%",
									position: "relative",
								}}
							>
								<thead
									style={{
										fontWeight: "bold",
										height: "24px",
										position: "sticky",
										top: 0,
										boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
										backgroundColor: tableHeadColor,
									}}
								>
									<tr
										style={{
											backgroundColor: tableHeadColor,
											color: "white",
										}}
									>
										<td className="border-dark" style={firstColWidth}>
											Category
										</td>
										<td className="border-dark" style={secondColWidth}>
											Jan
										</td>
										<td className="border-dark" style={thirdColWidth}>
											Feb
										</td>
										<td className="border-dark" style={forthColWidth}>
											Mar
										</td>
										<td className="border-dark" style={fifthColWidth}>
											Apr
										</td>
										<td className="border-dark" style={sixthColWidth}>
											May
										</td>
										<td className="border-dark" style={seventhColWidth}>
											Jun
										</td>
										<td className="border-dark" style={eighthColWidth}>
											Jul
										</td>
										<td className="border-dark" style={ninthColWidth}>
											Aug
										</td>
										<td className="border-dark" style={tenthColWidth}>
											Sep
										</td>
										<td className="border-dark" style={eleventhColWidth}>
											Oct
										</td>
										<td className="border-dark" style={twelwethColWidth}>
											Nov
										</td>
										<td className="border-dark" style={thirteenthColWidth}>
											Dec
										</td>
										<td className="border-dark" style={forteenthColWidth}>
											Tot
										</td>
									</tr>
								</thead>
							</table>
						</div>
						{/* Table Body */}
						<div
							className="table-scroll"
							style={{
								backgroundColor: textColor,
								borderBottom: `1px solid ${fontcolor}`,
								overflowY: "auto",
								maxHeight: "45vh",
								width: "100%",
								wordBreak: "break-word",
							}}
						>
							<table
								className="myTable"
								id="tableBody"
								style={{
									fontSize: "12px",
									width: "100%",
									position: "relative",
								}}
							>
								<tbody id="tablebody">
									{isLoading ? (
										<>
											<tr
												style={{
													backgroundColor: getcolor,
												}}
											>
												<td colSpan="14" className="text-center">
													<Spinner animation="border" variant="primary" />
												</td>
											</tr>
											{Array.from({ length: Math.max(0, 30 - 5) }).map(
												(_, rowIndex) => (
													<tr
														key={`blank-${rowIndex}`}
														style={{
															backgroundColor: getcolor,
															color: fontcolor,
														}}
													>
														{Array.from({ length: 14 }).map((_, colIndex) => (
															<td key={`blank-${rowIndex}-${colIndex}`}>
																&nbsp;
															</td>
														))}
													</tr>
												)
											)}
											<tr>
												<td style={firstColWidth}></td>
												<td style={secondColWidth}></td>
												<td style={thirdColWidth}></td>
												<td style={forthColWidth}></td>
												<td style={fifthColWidth}></td>
												<td style={sixthColWidth}></td>
												<td style={seventhColWidth}></td>
												<td style={eighthColWidth}></td>
												<td style={ninthColWidth}></td>
												<td style={tenthColWidth}></td>
												<td style={eleventhColWidth}></td>
												<td style={twelwethColWidth}></td>
												<td style={thirteenthColWidth}></td>
												<td style={forteenthColWidth}></td>
											</tr>
										</>
									) : (
										<>
											{tableData.map((item, i) => {
												totalEnteries += 1;
												return (
													<tr
														key={`${i}-${selectedIndex}`}
														ref={(el) => (rowRefs.current[i] = el)}
														onClick={() => handleRowClick(i)}
														className={
															selectedIndex === i ? "selected-background" : ""
														}
														style={{
															backgroundColor: getcolor,
															color: fontcolor,
														}}
													>
														<td className="text-start" style={firstColWidth}>
															{item.Category}
														</td>
														<td className="text-end" style={secondColWidth}>
															{item["Jan"]}
														</td>
														<td className="text-end" style={thirdColWidth}>
															{item["Feb"]}
														</td>
														<td className="text-end" style={forthColWidth}>
															{item["Mar"]}
														</td>
														<td className="text-end" style={fifthColWidth}>
															{item["Apr"]}
														</td>
														<td className="text-end" style={sixthColWidth}>
															{item["May"]}
														</td>
														<td className="text-end" style={seventhColWidth}>
															{item["Jun"]}
														</td>
														<td className="text-end" style={eighthColWidth}>
															{item["Jul"]}
														</td>
														<td className="text-end" style={ninthColWidth}>
															{item["Aug"]}
														</td>
														<td className="text-end" style={tenthColWidth}>
															{item["Sep"]}
														</td>
														<td className="text-end" style={eleventhColWidth}>
															{item["Oct"]}
														</td>
														<td className="text-end" style={twelwethColWidth}>
															{item["Nov"]}
														</td>
														<td className="text-end" style={thirteenthColWidth}>
															{item["Dec"]}
														</td>
														<td className="text-end" style={forteenthColWidth}>
															{item["Total"]}
														</td>
													</tr>
												);
											})}
											{Array.from({
												length: Math.max(0, 27 - tableData.length),
											}).map((_, rowIndex) => (
												<tr
													key={`blank-${rowIndex}`}
													style={{
														backgroundColor: getcolor,
														color: fontcolor,
													}}
												>
													{Array.from({ length: 14 }).map((_, colIndex) => (
														<td key={`blank-${rowIndex}-${colIndex}`}>
															&nbsp;
														</td>
													))}
												</tr>
											))}
											<tr>
												<td style={firstColWidth}></td>
												<td style={secondColWidth}></td>
												<td style={thirdColWidth}></td>
												<td style={forthColWidth}></td>
												<td style={fifthColWidth}></td>
												<td style={sixthColWidth}></td>
												<td style={seventhColWidth}></td>
												<td style={eighthColWidth}></td>
												<td style={ninthColWidth}></td>
												<td style={tenthColWidth}></td>
												<td style={eleventhColWidth}></td>
												<td style={twelwethColWidth}></td>
												<td style={thirteenthColWidth}></td>
												<td style={forteenthColWidth}></td>
											</tr>
										</>
									)}
								</tbody>
							</table>
						</div>
					</div>
					{/* Table Footer */}
					<div
						style={{
							borderBottom: `1px solid ${fontcolor}`,
							borderTop: `1px solid ${fontcolor}`,
							height: "24px",
							display: "flex",
							paddingRight: "1%",
						}}
					>
						<div
							style={{
								...firstColWidth,
								background: getcolor,
								marginLeft: "2px",
								borderRight: `1px solid ${fontcolor}`,
							}}
						></div>
						<div
							style={{
								...secondColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						>
							<span className="mobileledger_total">{jan}</span>
						</div>
						<div
							style={{
								...thirdColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						>
							<span className="mobileledger_total">{feb}</span>
						</div>
						<div
							style={{
								...forthColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						>
							<span className="mobileledger_total">{mar}</span>
						</div>
						<div
							style={{
								...fifthColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						>
							<span className="mobileledger_total">{apr}</span>
						</div>
						<div
							style={{
								...sixthColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						>
							<span className="mobileledger_total">{may}</span>
						</div>
						<div
							style={{
								...seventhColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						>
							<span className="mobileledger_total">{jun}</span>
						</div>
						<div
							style={{
								...eighthColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						>
							<span className="mobileledger_total">{jul}</span>
						</div>
						<div
							style={{
								...ninthColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						>
							<span className="mobileledger_total">{aug}</span>
						</div>
						<div
							style={{
								...tenthColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						>
							<span className="mobileledger_total">{sep}</span>
						</div>
						<div
							style={{
								...eleventhColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						>
							<span className="mobileledger_total">{oct}</span>
						</div>
						<div
							style={{
								...twelwethColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						>
							<span className="mobileledger_total">{nov}</span>
						</div>
						<div
							style={{
								...thirteenthColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						>
							<span className="mobileledger_total">{dec}</span>
						</div>
						<div
							style={{
								...forteenthColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						>
							<span className="mobileledger_total">{total}</span>
						</div>
					</div>
					{/* Action Buttons */}
					<div
						style={{
							margin: "5px",
							marginBottom: "2px",
						}}
					>
						<SingleButton
							to="/MainPage"
							text="Return"
							style={{ backgroundColor: "#186DB7", width: "120px" }}
							onFocus={(e) => (e.currentTarget.style.border = "2px solid red")}
							onBlur={(e) =>
								(e.currentTarget.style.border = `1px solid ${fontcolor}`)
							}
						/>
						<SingleButton
							text="PDF"
							onClick={exportPDFHandler}
							style={{ backgroundColor: "#186DB7", width: "120px" }}
							onFocus={(e) => (e.currentTarget.style.border = "2px solid red")}
							onBlur={(e) =>
								(e.currentTarget.style.border = `1px solid ${fontcolor}`)
							}
						/>
						<SingleButton
							text="Excel"
							onClick={handleDownloadCSV}
							style={{ backgroundColor: "#186DB7", width: "120px" }}
							onFocus={(e) => (e.currentTarget.style.border = "2px solid red")}
							onBlur={(e) =>
								(e.currentTarget.style.border = `1px solid ${fontcolor}`)
							}
						/>
						<SingleButton
							id="searchsubmit"
							text="Select"
							ref={selectButtonRef}
							onClick={fetchItemMonthlyPurchaseComparison}
							style={{ backgroundColor: "#186DB7", width: "120px" }}
							onFocus={(e) => (e.currentTarget.style.border = "2px solid red")}
							onBlur={(e) =>
								(e.currentTarget.style.border = `1px solid ${fontcolor}`)
							}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
