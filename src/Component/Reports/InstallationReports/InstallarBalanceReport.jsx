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

export default function InstallarBalanceReport() {
	const navigate = useNavigate();
	const user = getUserData();
	const organisation = getOrganisationData();

	const saleSelectRef = useRef(null);
	const input1Ref = useRef(null);

	const toRef = useRef(null);
	const fromRef = useRef(null);
	const companyRef = useRef(null);
	const categoryRef = useRef(null);
	const capacityRef = useRef(null);
	const storeRef = useRef(null);
	const typeRef = useRef(null);
	const searchRef = useRef(null);
	const selectButtonRef = useRef(null);

	const [saleType, setSaleType] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [transectionType, settransectionType] = useState("");

	const [totalQnty, setTotalQnty] = useState(0);

	const [totalAmount, setTotalAmount] = useState(0);

	// state for from DatePicker
	const [selectedfromDate, setSelectedfromDate] = useState(null);
	const [fromInputDate, setfromInputDate] = useState("");
	const [fromCalendarOpen, setfromCalendarOpen] = useState(false);
	// state for To DatePicker
	const [selectedToDate, setSelectedToDate] = useState(null);
	const [toInputDate, settoInputDate] = useState("");
	const [toCalendarOpen, settoCalendarOpen] = useState(false);

	const [selectedRadio, setSelectedRadio] = useState("custom"); // State to track selected radio button

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

	//////////////////////// CUSTOM DATE LIMITS ////////////////////////////
	const fromdatevalidate = getfromdate;
	const todatevaliadete = gettodate;

	const convertToDate = (dateString) => {
		const [day, month, year] = dateString.split("-");
		return new Date(year, month - 1, day);
	};

	const GlobalfromDate = convertToDate(fromdatevalidate);
	const GlobaltoDate = convertToDate(todatevaliadete);

	const formatDate1 = (date) => {
		return `${String(date.getDate()).padStart(2, "0")}-${String(
			date.getMonth() + 1
		).padStart(2, "0")}-${date.getFullYear()}`;
	};
	const GlobaltoDate1 = formatDate1(GlobaltoDate);
	const GlobalfromDate1 = formatDate1(GlobalfromDate);

	//////////////////////// CUSTOM DATE LIMITS ////////////////////////////

	// Toggle the ToDATE CalendarOpen state on each click
	const toggleToCalendar = () => {
		settoCalendarOpen((prevOpen) => !prevOpen);
	};
	const formatDate = (date) => {
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${day}-${month}-${year}`;
	};

	const handleToDateChange = (date) => {
		setSelectedToDate(date);
		settoInputDate(date ? formatDate(date) : "");
		settoCalendarOpen(false);
	};
	const handleToInputChange = (e) => {
		settoInputDate(e.target.value);
	};

	function fetchInstallarBalanceReport() {
		const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

		let errorType = "";

		switch (true) {
			case !toInputDate:
				errorType = "toDate";
				break;
			default:
				break;
		}

		if (!dateRegex.test(toInputDate)) {
			errorType = "toDateInvalid";
		} else {
			const formattedToInput = toInputDate.replace(
				/^(\d{2})(\d{2})(\d{4})$/,
				"$1-$2-$3"
			);
			const [toDay, toMonth, toYear] = formattedToInput.split("-").map(Number);
			const enteredToDate = new Date(toYear, toMonth - 1, toDay);

			if (GlobaltoDate && enteredToDate > GlobaltoDate) {
				errorType = "toDateAfterGlobal";
			} else if (GlobaltoDate && enteredToDate < GlobalfromDate) {
				errorType = "toDateBeforeGlobal";
			}
		}

		switch (errorType) {
			case "toDate":
				toast.error("Rep Date is required");
				return;

			case "toDateInvalid":
				toast.error("Rep Date must be in the format dd-mm-yyyy");
				return;

			case "toDateAfterGlobal":
				toast.error(`Rep Date must be before ${GlobaltoDate1}`);
				return;
			case "toDateBeforeGlobal":
				toast.error(`Rep Date must be after ${GlobalfromDate1}`);
				return;

			default:
				break;
		}

		const fromDateElement = document.getElementById("fromdatevalidation");
		const toDateElement = document.getElementById("todatevalidation");

		if (fromDateElement) {
			fromDateElement.style.border = `1px solid ${fontcolor}`;
		}
		if (toDateElement) {
			toDateElement.style.border = `1px solid ${fontcolor}`;
		}

		const apiMainUrl = apiLinks + "/InstallarBalanceReport.php";
		setIsLoading(true);
		const formMainData = new URLSearchParams({
			code: "EMART",
			FLocCod: "001",
			FYerDsc: "2024-2024",
			// FIntDat: fromInputDate,
			FRepDat: toInputDate,
			FSchTxt: "",
		}).toString();

		axios
			.post(apiMainUrl, formMainData)
			.then((response) => {
				setIsLoading(false);
				// console.log("Response:", response.data);

				setTotalAmount(response.data["Total Balance"]);

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

	useEffect(() => {
		const hasComponentMountedPreviously =
			sessionStorage.getItem("componentMounted");
		if (!hasComponentMountedPreviously || (toRef && toRef.current)) {
			if (toRef && toRef.current) {
				setTimeout(() => {
					toRef.current.focus();
					toRef.current.select();
				}, 0);
			}
			sessionStorage.setItem("componentMounted", "true");
		}
	}, []);

	useEffect(() => {
		const currentDate = new Date();
		setSelectedToDate(currentDate);
		settoInputDate(formatDate(currentDate));

		const firstDateOfCurrentMonth = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			1
		);
		setSelectedfromDate(firstDateOfCurrentMonth);
		setfromInputDate(formatDate(firstDateOfCurrentMonth));
	}, []);

	const handleTransactionTypeChange = (event) => {
		const selectedTransactionType = event.target.value;
		settransectionType(selectedTransactionType);
	};

	const exportPDFHandler = () => {
		const doc = new jsPDF({ orientation: "portrait" });
		const rows = tableData.map((item) => [
			item.Code,
			item.Description,
			item.Amount,
		]);
		rows.push(["", "Total", String(totalAmount)]);
		const headers = ["Code", "Description", "Amount"];
		const columnWidths = [20, 80, 20];
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

					if (cellIndex === 2) {
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

		const rowsPerPage = 46;

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
					`Installar Balance Report Rep Date: ${toInputDate}`,
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
		doc.save("InstallarBalanceReport.pdf");

		const pdfBlob = doc.output("blob");
		const pdfFile = new File([pdfBlob], "table_data.pdf", {
			type: "application/pdf",
		});
	};

	const handleDownloadCSV = async () => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet("Sheet1");
		const numColumns = 3;
		const titleStyle = {
			font: { bold: true, size: 12 },
			alignment: { horizontal: "center" },
		};
		const columnAlignments = ["left", "left", "right"];
		worksheet.addRow([]);
		[comapnyname, `Installar Balance Report Rep Date ${toInputDate}`].forEach(
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
		const headers = ["Code", "Description", "Amount"];
		const headerRow = worksheet.addRow(headers);
		headerRow.eachCell((cell) => {
			cell.style = { ...headerStyle, alignment: { horizontal: "center" } };
		});
		tableData.forEach((item) => {
			worksheet.addRow([item.Code, item.Description, item.Amount]);
		});
		const totalRow = worksheet.addRow(["", "Total", totalAmount]);
		totalRow.eachCell((cell) => {
			cell.font = { bold: true };
		});
		[15, 45, 15].forEach((width, index) => {
			worksheet.getColumn(index + 1).width = width;
		});
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
		saveAs(blob, "InstallarBalanceReport.xlsx");
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

	const firstColWidth = {
		width: "15%",
	};
	const secondColWidth = {
		width: "65%",
	};
	const thirdColWidth = {
		width: "20%",
	};

	useHotkeys("s", fetchInstallarBalanceReport);
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

	const contentStyle = {
		backgroundColor: getcolor,
		width: isSidebarVisible ? "calc(65vw - 0%)" : "65vw",
		position: "relative",
		top: "35%",
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
		maxWidth: "550px",
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

	const focusNextElement = (currentRef, nextRef) => {
		if (currentRef.current && nextRef.current) {
			currentRef.current.focus();
			nextRef.current.focus();
		}
	};

	const handleToDateEnter = (e) => {
		if (e.key === "Enter") {
			if (e.key !== "Enter") return;
			e.preventDefault();

			const inputDate = e.target.value;
			const formattedDate = inputDate.replace(
				/^(\d{2})(\d{2})(\d{4})$/,
				"$1-$2-$3"
			);

			// Basic format validation (dd-mm-yyyy)
			if (
				!/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/.test(formattedDate)
			) {
				toast.error("Date must be in the format dd-mm-yyyy");
				return;
			}

			const [day, month, year] = formattedDate.split("-").map(Number);
			const enteredDate = new Date(year, month - 1, day);
			const daysInMonth = new Date(year, month, 0).getDate();

			// Validate month, day, and date range
			if (month < 1 || month > 12 || day < 1 || day > daysInMonth) {
				toast.error("Invalid date. Please check the day and month.");
				return;
			}
			if (enteredDate > GlobaltoDate) {
				toast.error(`Date must be before ${GlobaltoDate1}`);
				return;
			}

			// Update input value and state
			e.target.value = formattedDate;
			settoInputDate(formattedDate); // Update the state with formatted date

			// Move focus to the next element
			focusNextElement(toRef, searchRef);
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
					<NavComponent textdata="Installar Balance Report" />

					{/* ------------1st row */}
					<div
						className="row"
						style={{ height: "20px", marginTop: "8px", marginBottom: "8px" }}
					>
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
							{/* To Date */}
							<div className="d-flex align-items-center">
								<div
									style={{
										width: "100px",
										display: "flex",
										justifyContent: "end",
									}}
								>
									<label htmlFor="toDatePicker">
										<span style={{ fontSize: "15px", fontWeight: "bold" }}>
											Rep Date:&nbsp;&nbsp;
										</span>
									</label>
								</div>
								<div
									id="todatevalidation"
									style={{
										width: "135px",
										border: `1px solid ${fontcolor}`,
										display: "flex",
										alignItems: "center",
										height: "24px",
										justifyContent: "center",
										background: getcolor,
									}}
									onFocus={(e) =>
										(e.currentTarget.style.border = "2px solid red")
									}
									onBlur={(e) =>
										(e.currentTarget.style.border = `1px solid ${fontcolor}`)
									}
								>
									<input
										ref={toRef}
										style={{
											height: "20px",
											width: "90px",
											paddingLeft: "5px",
											outline: "none",
											border: "none",
											fontSize: "12px",
											backgroundColor: getcolor,
											color: fontcolor,
											opacity: selectedRadio === "custom" ? 1 : 0.5,
											pointerEvents:
												selectedRadio === "custom" ? "auto" : "none",
										}}
										value={toInputDate}
										onChange={handleToInputChange}
										onKeyDown={handleToDateEnter}
										id="toDatePicker"
										autoComplete="off"
										placeholder="dd-mm-yyyy"
										aria-label="To Date Input"
										disabled={selectedRadio !== "custom"}
									/>
									<DatePicker
										selected={selectedToDate}
										onChange={handleToDateChange}
										dateFormat="dd-MM-yyyy"
										popperPlacement="bottom"
										showPopperArrow={false}
										open={toCalendarOpen}
										dropdownMode="select"
										customInput={
											<div>
												<BsCalendar
													onClick={
														selectedRadio === "custom"
															? toggleToCalendar
															: undefined
													}
													style={{
														cursor:
															selectedRadio === "custom"
																? "pointer"
																: "default",
														marginLeft: "18px",
														fontSize: "12px",
														color: fontcolor,
														opacity: selectedRadio === "custom" ? 1 : 0.5,
													}}
													disabled={selectedRadio !== "custom"}
												/>
											</div>
										}
										disabled={selectedRadio !== "custom"}
									/>
								</div>
							</div>

							{/* Search */}
							<div
								className="d-flex align-items-center"
								style={{ marginRight: "20px" }}
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
								width: "98%",
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
											Code
										</td>
										<td className="border-dark" style={secondColWidth}>
											Description
										</td>
										<td className="border-dark" style={thirdColWidth}>
											Amount
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
												<td colSpan="3" className="text-center">
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
														{Array.from({ length: 3 }).map((_, colIndex) => (
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
															{item.Code}
														</td>
														<td className="text-start" style={secondColWidth}>
															{item.Description}
														</td>
														<td className="text-end" style={thirdColWidth}>
															{item.Amount}
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
													{Array.from({ length: 3 }).map((_, colIndex) => (
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
							paddingRight: "2%",
						}}
					>
						<div
							style={{
								...firstColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						></div>
						<div
							style={{
								...secondColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						></div>
						<div
							style={{
								...thirdColWidth,
								background: getcolor,
								borderRight: `1px solid ${fontcolor}`,
							}}
						>
							<span className="mobileledger_total">{totalAmount}</span>
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
							onClick={fetchInstallarBalanceReport}
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
