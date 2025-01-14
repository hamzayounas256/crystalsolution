import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const IncrementDecrementButtons = ({
	getnavbarbackgroundcolor,
	getnavbarfontcolor,
	setNextItemId,
	formData,
	digit,
}) => {
	const buttonStyle = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: getnavbarbackgroundcolor,
		color: getnavbarfontcolor,
		border: `1px solid ${getnavbarfontcolor}`,
		height: "13px",
		width: "13px",
		fontSize: "9px",
		cursor: "pointer",
		transition: "background-color 0.3s, color 0.3s",
	};

	const containerStyle = {
		display: "flex",
		flexDirection: "column",
		marginTop: "-5%",
		marginLeft: "2%",
		gap: "1px",
	};

	const handleIncrement = () => {
		const cleanedValue = formData || "0";
		let newValue = parseInt(cleanedValue, 10) + 1;

		// Ensure the value does not exceed 999999
		if (newValue > 999999) {
			newValue = 999999;
		}

		// Pad the new value with leading zeros
		const paddedValue = newValue.toString().padStart(digit, "0");
		setNextItemId(paddedValue);
	};

	const handleDecrement = () => {
		const cleanedValue = formData || "0";
		let newValue = parseInt(cleanedValue, 10) - 1;

		// Ensure the value does not go below 1
		if (newValue < 1) {
			newValue = 1;
		}

		// Pad the new value with leading zeros
		const paddedValue = newValue.toString().padStart(digit, "0");
		setNextItemId(paddedValue);
	};

	return (
		<div style={containerStyle}>
			<div style={buttonStyle} onClick={handleIncrement}>
				<FontAwesomeIcon icon={faCaretUp} />
			</div>

			<div style={buttonStyle} onClick={handleDecrement}>
				<FontAwesomeIcon icon={faCaretDown} />
			</div>
		</div>
	);
};

export default IncrementDecrementButtons;
