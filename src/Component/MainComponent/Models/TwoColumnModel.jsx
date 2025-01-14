import React, { useState, useRef, useEffect } from "react";
import { Modal, Alert } from "react-bootstrap";
import "./Models.css";
import { useTheme } from "../../../ThemeContext";
import NavComponent from "../Navform/navbarform";
import SearchInputModel from "../SearchField/SearchFieldModels";

const TwoColumnModel = ({
	isOpen,
	handleClose,
	title,
	searchRef,
	firstColKey,
	secondColKey,
	handleRowClick,
	technicians,
	firstColWidth,
	secondColWidth,
	firstColAlign,
	secondColAlign,
	totalwidthmodel,
}) => {
	const {
		apiLinks,
		getcolor,
		getrowhover,
		fontcolor,
		getnavbarfontcolor,
		getheaderfontsize,
		getdatafontsize,
		getnavbarbackgroundcolor,
	} = useTheme();
	const [searchText, setSearchText] = useState("");
	const [data, setData] = useState({ columns: [], rows: [] });
	const [enterCount, setEnterCount] = useState(0);
	const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);
	const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
	const tableRef = useRef(null);
	const firstRowRef = useRef(null);
	const [alertData, setAlertData] = useState(null);

	const fetchDataAndDisplay = async () => {
		const columns = [
			{ label: "Code", field: "tacccod", sort: "asc" },
			{ label: "Description", field: "taccdsc", sort: "asc" },
			{ label: "Status", field: "taccsts", sort: "asc" },
		];
		setData({ columns, rows: technicians });
	};

	const filteredRows =
		data.rows &&
		data.rows.filter(
			(row) =>
				(row[firstColKey] &&
					row[firstColKey].toLowerCase().includes(searchText.toLowerCase())) ||
				(row[secondColKey] &&
					row[secondColKey].toLowerCase().includes(searchText.toLowerCase()))
		);

	const handleSearchChange = (event) => {
		const uppercase = event.target.value.toUpperCase();
		setHighlightedRowIndex(0);
		setSearchText(uppercase);
	};

	const handleArrowKeyPress = (direction) => {
		if (filteredRows.length === 0) return;

		let newIndex = highlightedRowIndex;
		let upindex = highlightedRowIndex - 10;
		let bottomindex = highlightedRowIndex + 10;

		if (direction === "up") {
			const rowElement = document.getElementById(`row-${upindex}`);
			if (rowElement) {
				rowElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
			}
			newIndex = Math.max(0, highlightedRowIndex - 1);
		} else if (direction === "down") {
			const rowElement = document.getElementById(`row-${bottomindex}`);
			if (rowElement) {
				rowElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
			}
			newIndex = Math.min(filteredRows.length - 1, highlightedRowIndex + 1);
		}

		setHighlightedRowIndex(newIndex);
	};

	const resetTableStates = () => {
		setSearchText("");
		setData({ columns: [], rows: [] });
		setEnterCount(0);
		setHighlightedRowIndex(0);
	};

	const handleSort = () => {
		const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
		setSortOrder(newSortOrder);

		const sortedRows = [...filteredRows].sort((a, b) => {
			const aValue = a[secondColKey] || "";
			const bValue = b[secondColKey] || "";
			return newSortOrder === "asc"
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		});

		setData((prevData) => ({ ...prevData, rows: sortedRows }));
	};

	useEffect(() => {
		if (!isOpen) {
			resetTableStates();
		}
	}, [isOpen]);

	// Focus management
	useEffect(() => {
		if (isOpen && searchRef.current) {
			searchRef.current.focus();
		}
	}, [isOpen, searchRef]);

	// Add event listeners for arrow keys and Enter key when modal is open
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (isOpen && document.activeElement !== searchRef.current) {
				if (event.key === "ArrowUp") {
					handleArrowKeyPress("up");
				} else if (event.key === "ArrowDown") {
					handleArrowKeyPress("down");
				} else if (event.key === "Enter") {
					// Call handleRowClick when Enter is pressed on the highlighted row
					if (filteredRows && filteredRows[highlightedRowIndex]) {
						handleRowClick(
							filteredRows[highlightedRowIndex],
							highlightedRowIndex
						);
					}
				}
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, highlightedRowIndex, filteredRows, searchRef, handleRowClick]);

	// Keep focus on the search input when the modal is open
	useEffect(() => {
		const handleFocusLoss = (event) => {
			if (
				isOpen &&
				searchRef.current &&
				!searchRef.current.contains(event.target)
			) {
				searchRef.current.focus();
			}
		};

		if (isOpen) {
			document.addEventListener("click", handleFocusLoss);
		}

		return () => {
			document.removeEventListener("click", handleFocusLoss);
		};
	}, [isOpen, searchRef]);

	return (
		<div>
			{alertData && (
				<Alert
					severity={alertData.type}
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "30%",
						marginLeft: "35%",
						zIndex: 9999,
						textAlign: "center",
					}}
				>
					{alertData.message}
				</Alert>
			)}

			<Modal
				show={isOpen}
				onHide={handleClose}
				dialogClassName="my-modal-file"
				style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
			>
				<NavComponent textdata={title} />
				<Modal.Body style={{ backgroundColor: getcolor, color: fontcolor }}>
					<div className="row">
						<SearchInputModel
							searchText={searchText}
							setSearchText={setSearchText}
							handleSearchChange={handleSearchChange}
							handleArrowKeyPress={handleArrowKeyPress}
							fetchDataAndDisplay={fetchDataAndDisplay}
							enterCount={enterCount}
							setEnterCount={setEnterCount}
							filteredRows={filteredRows}
							highlightedRowIndex={highlightedRowIndex}
							handleRowClick={handleRowClick}
							fontcolor={fontcolor}
							searchRef={searchRef}
							autoFocus={isOpen}
						/>
					</div>

					<table style={{ backgroundColor: getcolor, color: fontcolor }}>
						<thead
							style={{
								backgroundColor: getnavbarbackgroundcolor,
								color: getnavbarfontcolor,
							}}
						>
							<tr>
								<th
									className="table-item-file"
									style={{
										width: firstColWidth,
									}}
								>
									Code
								</th>
								<th
									className="table-item-file"
									style={{
										width: secondColWidth,
										cursor: "pointer",
									}}
									onClick={handleSort}
								>
									Description {sortOrder === "asc" ? "▲" : "▼"}
								</th>
							</tr>
						</thead>
					</table>
					<table
						className="custom-table-file"
						style={{ backgroundColor: getcolor, color: fontcolor }}
					>
						<tbody
							ref={tableRef}
							style={{
								overflowY: "auto",
								transition: "width 0.3s ease-in-out",
							}}
						>
							{!filteredRows || filteredRows.length === 0 ? (
								<>
									{Array.from({ length: 18 }).map((_, index) => (
										<tr
											key={`blank-${index}`}
											style={{ backgroundColor: getcolor, color: fontcolor }}
										>
											{Array.from({ length: 2 }).map((_, colIndex) => (
												<td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
											))}
										</tr>
									))}
									<tr style={{ backgroundColor: getcolor, color: fontcolor }}>
										<td
											style={{
												textAlign: "center",
												width: firstColWidth,
											}}
										></td>
										<td
											style={{
												textAlign: "center",
												width: secondColWidth,
											}}
										></td>
									</tr>
								</>
							) : (
								<>
									{filteredRows.map((row, index) => (
										<tr
											style={{
												color: fontcolor,
												fontWeight:
													highlightedRowIndex === index ? "bold" : "normal",
												border:
													highlightedRowIndex === index
														? "1px solid #3368B5"
														: "1px solid #3368B5",
												backgroundColor:
													highlightedRowIndex === index
														? getrowhover
														: getcolor,
											}}
											ref={index === 0 ? firstRowRef : null}
											key={index}
											id={`row-${index}`}
											onClick={() => {
												handleRowClick(row, index);
											}}
										>
											<td
												style={{
													width: firstColWidth,
													fontWeight: "normal",
													textAlign: firstColAlign,

													fontSize: getdatafontsize,
												}}
											>
												{row[firstColKey]}
											</td>
											<td
												style={{
													width: secondColWidth,
													textAlign: secondColAlign,
													fontWeight: "normal",
													fontSize: getdatafontsize,
												}}
											>
												{row[secondColKey]}
											</td>
										</tr>
									))}
									{Array.from({
										length: Math.max(0, 19 - filteredRows.length),
									}).map((_, index) => (
										<tr
											key={`blank-${index}`}
											style={{ backgroundColor: getcolor, color: fontcolor }}
										>
											{Array.from({ length: 2 }).map((_, colIndex) => (
												<td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
											))}
										</tr>
									))}
								</>
							)}
						</tbody>
					</table>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default TwoColumnModel;
