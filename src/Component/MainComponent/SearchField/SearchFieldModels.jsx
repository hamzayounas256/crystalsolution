import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useTheme } from "../../../ThemeContext";

const SearchInputModel = ({
	searchText,
	setSearchText,
	handleSearchChange,
	handleArrowKeyPress,
	fetchDataAndDisplay,
	enterCount,
	setEnterCount,
	filteredRows,
	highlightedRowIndex,
	handleRowClick,
	fontcolor,
	searchRef,
}) => {
	const { getdatafontsize, getheaderfontsize } = useTheme();
	const [alertData, setAlertData] = useState(null);

	useEffect(() => {
		if (searchRef.current) {
			searchRef.current.focus();
		}
	}, [searchRef]);

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

			<div
				className="col-3"
				style={{ marginLeft: "10px", position: "relative" }}
			>
				<svg
					style={{
						position: "absolute",
						top: "50%",
						transform: "translateY(-50%)",
						color: "#aaa",
						pointerEvents: "none",
						width: "16px",
						height: "16px",
					}}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="11" cy="11" r="8" />
					<line x1="21" y1="21" x2="16.65" y2="16.65" />
				</svg>
				<input
					type="text"
					className="form-control-field search"
					name="searchText"
					ref={searchRef}
					placeholder="Search..."
					value={searchText}
					onChange={handleSearchChange}
					style={{
						border: `1px solid ${fontcolor}`,
						paddingLeft: "30px",
						fontSize: getdatafontsize,
					}}
					autoComplete="off"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							if (enterCount === 0) {
								fetchDataAndDisplay();
								setEnterCount(1);
							} else if (enterCount === 1) {
								if (filteredRows.length > 0) {
									const selectedRowData = filteredRows[highlightedRowIndex];
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
			</div>
		</div>
	);
};

export default SearchInputModel;
