import React, { useState, useRef, useEffect } from "react";
import { Modal, Row, Col, Form, Alert } from "react-bootstrap";
// import { Virtuoso } from "react-virtuoso"; // Import Virtuoso
import "./CustomerMaintenance.css";
import { useTheme } from "../../../ThemeContext";
import NavComponent from "../../MainComponent/Navform/navbarform";

const CustomerModal = ({
	isOpen,
	handleClose,
	title,
	searchRef,
	firstColKey,
	secondColKey,
	handleRowClick,
	technicians,
}) => {
	const { apiLinks, getcolor, fontcolor } = useTheme();
	const [searchText, setSearchText] = useState("");
	const [data, setData] = useState({ columns: [], rows: [] });
	const [enterCount, setEnterCount] = useState(0);
	const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);
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

	useEffect(() => {
		if (!isOpen) {
			resetTableStates();
		}
	}, [isOpen]);

	const firstColWidth = "12vw";
	const secondColWidth = "30vw";

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
				dialogClassName="my-modal-itemmaintenance"
				style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
			>
				<NavComponent textdata={title} />
				<Modal.Body style={{ backgroundColor: getcolor, color: fontcolor }}>
					<Row>
						<Col xs={12} sm={4} md={4} lg={4} xl={{ span: 4 }}>
							<Form.Control
								type="text"
								className="form-control-employee search"
								style={{
									height: "25px",
									boxShadow: "none",
									margin: "0.5%",
									borderRadius: "0px",
									backgroundColor: "white",
								}}
								name="searchText"
								ref={searchRef}
								placeholder="Search..."
								value={searchText}
								onChange={handleSearchChange}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										if (enterCount === 0) {
											fetchDataAndDisplay();
											setEnterCount(1);
										} else if (enterCount === 1) {
											if (filteredRows.length > 0) {
												const selectedRowData =
													filteredRows[highlightedRowIndex];
												handleRowClick(selectedRowData, highlightedRowIndex);
												setEnterCount(0);
											} else {
												setAlertData({
													show: true,
													message: "No matching data found.",
													type: "warning",
												});
												setTimeout(() => {
													setAlertData(null);
												}, 3000);
											}
										}
									} else if (e.key === "ArrowUp") {
										handleArrowKeyPress("up");
									} else if (e.key === "ArrowDown") {
										handleArrowKeyPress("down");
									} else {
										setEnterCount(0);
									}
								}}
							/>
						</Col>
					</Row>
					<table
						className="custom-table-typemaintenance"
						style={{ backgroundColor: getcolor, color: fontcolor }}
					>
						<thead style={{ backgroundColor: "#3368B5" }}>
							<tr>
								<th
									className="sticky-header-typemaintenance"
									style={{
										width: firstColWidth,
										fontWeight: "bold",
										textAlign: "center",
										borderRight: "1px solid black",
									}}
								>
									Code
								</th>
								<th
									className="sticky-header-typemaintenance"
									style={{
										width: secondColWidth,
										textAlign: "center",
										fontWeight: "bold",
										borderRight: "1px solid black",
									}}
								>
									Description
								</th>
							</tr>
						</thead>
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
													highlightedRowIndex === index ? "#739ad1" : getcolor,
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
													textAlign: "left",
													width: firstColWidth,
													fontWeight: "normal",
												}}
											>
												{row[firstColKey]}
											</td>
											<td
												style={{
													width: secondColWidth,
													textAlign: "left",
													fontWeight: "normal",
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
						<tfoot>
							<tr>
								<td
									className="sticky-header-typemaintenance"
									style={{
										width: firstColWidth,
										fontWeight: "bold",
										textAlign: "center",
										borderRight: "1px solid black",
									}}
								>
									{technicians.length}
								</td>
								<td
									className="sticky-header-typemaintenance"
									style={{
										width: secondColWidth,
										textAlign: "center",
										fontWeight: "bold",
										borderRight: "1px solid black",
									}}
								></td>
							</tr>
						</tfoot>
					</table>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default CustomerModal;
