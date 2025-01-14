import React, { useRef } from "react";
import { useTheme } from "../../../../ThemeContext";

const ButtonGroup = ({
	Submit,
	handleFocus,
	handleBlur,
	handleSave,
	handleReturn,
	handleClear,
	handleFormSubmit,
}) => {
	const Return = useRef(null);
	const Clear = useRef(null);
	const { getbuttonbackgroundcolor, getbuttonfontcolor } = useTheme();

	return (
		<div
			style={{
				borderTop: "1px solid gray",
				marginTop: "5px",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					marginBottom: "2px",
					marginTop: "5px",
				}}
			>
				<button
					style={{
						fontFamily: "Poppins, sans-serif",
						fontStyle: "normal",
						fontWeight: 400,
						fontSize: "12px",
						lineHeight: "11px",
						color: getbuttonfontcolor,
						backgroundColor: getbuttonbackgroundcolor,
						padding: "6px 7px",
						border: "none",
						cursor: "pointer",
						width: "75px",
						textAlign: "center",
						borderRadius: "5px",
						marginRight: "5px",
						textTransform: "capitalize",
					}}
					onFocus={() => handleFocus(Submit)}
					onBlur={() => handleBlur(Submit)}
					accessKey="s"
					onKeyDown={(event) => {
						if (event.altKey && event.key === "s") {
							handleFormSubmit();
							event.preventDefault();
						} else if (event.key === "ArrowRight") {
							Return.current.focus();
							event.preventDefault();
						}
					}}
					onClick={handleFormSubmit}
					ref={Submit}
				>
					Save
				</button>

				<button
					style={{
						fontFamily: "Poppins, sans-serif",
						fontStyle: "normal",
						fontWeight: 400,
						fontSize: "12px",
						lineHeight: "11px",
						color: getbuttonfontcolor,
						backgroundColor: getbuttonbackgroundcolor,
						padding: "6px 7px",
						border: "none",
						cursor: "pointer",
						width: "75px",
						textAlign: "center",
						borderRadius: "5px",
						marginRight: "5px",
						textTransform: "capitalize",
					}}
					accessKey="r"
					onKeyDown={(event) => {
						if (event.altKey && event.key === "r") {
							handleReturn();
							event.preventDefault();
						} else if (event.key === "ArrowRight") {
							Clear.current.focus();
							event.preventDefault();
						} else if (event.key === "ArrowLeft") {
							Submit.current.focus();
							event.preventDefault();
						}
					}}
					onFocus={() => handleFocus(Return)}
					onBlur={() => handleBlur(Return)}
					ref={Return}
					onClick={handleReturn}
				>
					Return
				</button>

				<button
					style={{
						fontFamily: "Poppins, sans-serif",
						fontStyle: "normal",
						fontWeight: 400,
						fontSize: "12px",
						lineHeight: "11px",
						color: getbuttonfontcolor,
						backgroundColor: getbuttonbackgroundcolor,
						padding: "6px 7px",
						border: "none",
						cursor: "pointer",
						width: "75px",
						textAlign: "center",
						borderRadius: "5px",
						marginRight: "5px",
						textTransform: "capitalize",
					}}
					accessKey="c"
					onKeyDown={(event) => {
						if (event.altKey && event.key === "c") {
							handleClear();
							event.preventDefault();
						} else if (event.key === "ArrowLeft") {
							Return.current.focus();
							event.preventDefault();
						} else if (event.key === "ArrowRight") {
							Submit.current.focus();
							event.preventDefault();
						}
					}}
					ref={Clear}
					onFocus={() => handleFocus(Clear)}
					onBlur={() => handleBlur(Clear)}
					onClick={handleClear}
				>
					New
				</button>
			</div>
		</div>
	);
};

export default ButtonGroup;
