import React from "react";
import NavComponent from "../../MainComponent/Navform/navbarform";

export default function CustomerMaintenance() {
	return (
		<div className="mx-auto">
			<div className="w-full mt-0 border h-24">
				{/* <p
					style={{
						backgroundColor: "#3368b5",
						marginTop: "0",
					}}
					className="top-0 text-light"
				>
					Good Morning Darling
				</p> */}
				<NavComponent textdata="Customer Maintenance" />
				<div className="d-flex justify-content-center">
					<input type="text" />
					<input type="text" />
					<input type="text" />
				</div>
			</div>
		</div>
	);
}
