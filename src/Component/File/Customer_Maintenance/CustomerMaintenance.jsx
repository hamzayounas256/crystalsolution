import { Form } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./CustomerMaintenance.css";
import NavComponent from "../../MainComponent/Navform/navbarform";
import ButtonGroupp from "../../MainComponent/Button/ButtonGroup/ButtonGroup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isLoggedIn, getUserData, getOrganisationData } from "../../Auth";
import CustomerModal from "./CustomerMaintenanceModal";
import { useMutation } from "@tanstack/react-query";
import { useTheme } from "../../../ThemeContext";
import { fetchGetWorkShopItemMaintenance } from "../../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import CustomDropdown from "../../MainComponent/Dropdown/Dropdown";
function formatToThreeDigits(number) {
	// Convert the number to a string and pad with leading zeros if necessary
	return number.toString().padStart(3, "0");
}
function removeParentDirectories(path) {
	if (typeof path === "string") {
		return path.replace("../../", "");
	}
	console.error("Invalid path:", path);
	return "";
}

function CustomerMaintenance() {
	const dispatch = useDispatch();

	const user = getUserData();
	const organisation = getOrganisationData();
	const { apiLinks } = useTheme();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		AccountCodeform: "",
		MannualCode: "",
		MannualRef: "",
		Status: "A",
		Descriptionform: "",
		UrduFormDescription: "",
		inputform4: "",
		inputform5: "",
		inputform6: "",
		inputform7: "",
		inputform8: "",
		inputform9: "",
		inputform10: "",
		inputform11: "",
		inputform12: "",
		inputform13: "",
		inputform14: "",
		inputform15: "",
		inputform16: "",
		inputform17: "",
		inputform18: "",
		inputform19: "",
		inputform20: "",
		inputform21: "",
		inputform22: "",
		inputform23: "",
		inputform24: "",

		inputform25: "",
		inputform26: "",
		inputform27: "",
		inputform28: "",
		inputform29: "",
		inputform30: "",
		inputform31: "",
		inputform32: "",
	});
	// const {
	// 	data: getitemmaintenance,
	// 	loading: getitemloading,
	// 	error: getitemerror,
	// } = useSelector((state) => state.getitemmaintenance);
	const getitemmaintenance = [];
	useEffect(() => {
		console.log("Code:", getitemmaintenance);
		if (getitemmaintenance?.length === 0) {
			dispatch(fetchGetWorkShopItemMaintenance(organisation.code));
		}
	}, [dispatch]);
	// useEffect(() => {
	//   console.log("===============", newtypemaintenance);
	//   if (newtypemaintenance) {
	//     setFormData((prevState) => ({
	//       ...prevState,
	//       AccountCodeform: newtypemaintenance,
	//     }));
	//   }
	// }, [newtypemaintenance]);
	useEffect(() => {
		if (!isLoggedIn()) {
			navigate("/login");
		}
	}, [navigate]);

	const [dataa, setDataa] = useState([]);

	// Only fetch once when component mounts

	useEffect(() => {
		setDataa(getitemmaintenance);
	}, [getitemmaintenance]);

	const Codefocus = () => {
		if (Code.current) {
			Code.current.focus();
		}
	};
	const [alertData, setAlertData] = useState(null);
	const fontFamily = "verdana";
	const Code = useRef(null);
	const Description = useRef(null);
	const MannualCode = useRef(null);
	const MannualRef = useRef(null);

	const Status = useRef(null);
	const inputform4ref = useRef(null);
	const inputform5ref = useRef(null);
	const inputform6ref = useRef(null);
	const inputform7ref = useRef(null);
	const inputform8ref = useRef(null);
	const inputform9ref = useRef(null);
	const inputform10ref = useRef(null);
	const inputform11ref = useRef(null);
	const inputform12ref = useRef(null);
	const inputform13ref = useRef(null);
	const inputform14ref = useRef(null);
	const inputform15ref = useRef(null);
	const inputform16ref = useRef(null);
	const inputform17ref = useRef(null);
	const inputform18ref = useRef(null);
	const inputform19ref = useRef(null);
	const inputform20ref = useRef(null);
	const inputform21ref = useRef(null);
	const inputform22ref = useRef(null);
	const inputform23ref = useRef(null);
	const inputform24ref = useRef(null);
	const inputform25ref = useRef(null);
	const inputform26ref = useRef(null);
	const inputform27ref = useRef(null);
	const inputform28ref = useRef(null);
	const inputform29ref = useRef(null);
	const inputform30ref = useRef(null);
	const inputform31ref = useRef(null);
	const inputform32ref = useRef(null);
	const Submit = useRef(null);
	const Clear = useRef(null);
	const Return = useRef(null);
	const SearchBox = useRef(null);
	//////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////

	const focusNextInput = (ref) => {
		if (ref.current) {
			ref.current.focus();
		}
	};

	const [errors, setErrors] = useState({});

	const [geturdu, setGeturdu] = useState("");
	const [selectedCompany, setSelectedCompany] = useState(null);
	const handleCompanyChange = (selectedOption) => {
		setSelectedCompany(selectedOption);
		console.log("Selected technician:", selectedOption);
	};
	const [selectedCategory, setSelectedCategory] = useState(null);
	const handleCategoryChange = (selectedOption) => {
		setSelectedCategory(selectedOption);
		console.log("Selected technician:", selectedOption);
	};

	const [selectedCapacity, setSelectedCapacity] = useState(null);
	const handleCapacityChange = (selectedOption) => {
		setSelectedCapacity(selectedOption);
		console.log("Selected technician:", selectedOption);
	};
	const [selectedType, setSelectedType] = useState(null);
	const handleTypeChange = (selectedOption) => {
		setSelectedType(selectedOption);
		console.log("Selected technician:", selectedOption);
	};

	const [dropdownKey, setDropdownKey] = useState(0);

	const handleResetDropdown = () => {
		setDropdownKey((prevKey) => prevKey + 1);
		setSelectedCompany(null);
		setSelectedCategory(null);
		setSelectedCapacity(null);
		setSelectedType(null);
	};
	const [selectedImage1, setSelectedImage1] = useState(null);

	const handleImageChange1 = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedImage1(file);
			const imgElement = document.getElementById("pic1-preview");
			imgElement.src = URL.createObjectURL(file);
		}
	};
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		dispatch(fetchGetWorkShopItemMaintenance(organisation.code));
		// dispatch(fetchNewTypeMaintenance(organisation.code));
		// Basic validation
		const checks = [
			{
				value: formData?.AccountCodeform,
				message: "Please fill your Code",
			},
			{
				value: formData?.Descriptionform,
				message: "Please fill your Description",
			},
		];

		for (const check of checks) {
			if (!check.value) {
				setAlertData({
					type: "error",
					message: check.message,
				});
				setTimeout(() => {
					setAlertData(null);
				}, 3000);
				return;
			}
		}
		const data = {
			AccountCodeform: formData.AccountCodeform,
			Descriptionform: formData.Descriptionform,
		};
		console.log("Form Data:", data);
		// Prepare form data for submission
		const formDataa = new FormData();
		formDataa.append("FItmCod", formData.AccountCodeform);
		formDataa.append("FItmDsc", formData.Descriptionform);
		formDataa.append("FItmSts", formData.Status);
		formDataa.append("FCmpCod", formData.inputform4 || selectedCompany?.value);
		formDataa.append("FCtgCod", formData.inputform5 || selectedCategory?.value);
		formDataa.append("FCapCpd", formData.inputform6 || selectedCapacity?.value);
		formDataa.append("FTypCod", formData.inputform7 || selectedType?.value);
		formDataa.append("FPurRat", formData.inputform8);
		formDataa.append("FManRat", formData.inputform10);
		formDataa.append("FRtlRat", formData.inputform11);
		formDataa.append("FSalRat", formData.inputform12);
		formDataa.append("FFixRat", formData.inputform13);
		formDataa.append("FHlfRat", 0);
		formDataa.append("FLckRat", 0);
		formDataa.append("FGrpRat", 0);
		formDataa.append("FActRat", 0);
		formDataa.append("FWrnDsc", "");
		formDataa.append("FPctCod", "");
		formDataa.append("FTaxRat", 0);

		formDataa.append("code", organisation.code);
		formDataa.append("FUsrId", user.tusrid);

		console.log("Submitting Form Data:", formDataa);

		try {
			const response = await axios.post(`${apiLinks}/SaveType.php`, formDataa, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log("API Response:", response);

			if (response.data.error === 200) {
				setTimeout(() => {
					Code.current.focus();
					dispatch(fetchGetWorkShopItemMaintenance(organisation.code));
					// dispatch(fetchNewTypeMaintenance(organisation.code));
				}, 500);

				// Clear form fields
				setFormData({
					...formData,
					AccountCodeform: "",
					Descriptionform: "",
					Status: "",
					inputform4: "",
					inputform5: "",
					inputform6: "",
					inputform7: "",
					inputform8: "",
					inputform9: "",
					inputform10: "",
					inputform11: "",
					inputform12: "",
				});
				handleResetDropdown();

				setAlertData({
					type: "success",
					message: `${response.data.message}`,
				});
				setTimeout(() => {
					setAlertData(null);
				}, 1000);
			} else {
				setAlertData({
					type: "error",
					message: `${response.data.message}`,
				});
				setTimeout(() => {
					setAlertData(null);
				}, 2000);
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			setAlertData({
				type: "error",
				message: "Form submission failed. Please try again.",
			});
			setTimeout(() => {
				setAlertData(null);
			}, 2000);
		} finally {
			console.log("Form submission process completed.");
		}
	};

	// Function to handle Enter key press
	const handleEnterKeyPress = (ref, e) => {
		if (e.key === "Enter") {
			e.preventDefault(); // Prevent form submission on Enter key press
			if (ref && ref.current) {
				ref.current.focus();
			}
		}
	};
	const [isModalOpen, setModalOpen] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [textdata, settextdata] = useState("Customer Maintenance");

	const handleCloseModal = () => {
		setSearchText("");
		// data
		setHighlightedRowIndex(0);
		settextdata("Customer Maintenance");
		dispatch(fetchGetWorkShopItemMaintenance(organisation.code));

		setModalOpen(false);
	};

	const handleDoubleClick = (e) => {
		dispatch(fetchGetWorkShopItemMaintenance(organisation.code));
		focusNextInput(Code);
		console.log("====== handle double click=======");
		setModalOpen(true);
	};

	const handleBlurRVC = (e) => {
		const value = String(formData.AccountCodeform).padStart(3, "0");
		console.log("dataa item:", dataa);

		setFormData({
			...formData,
			AccountCodeform: value,
		});
		console.log("value", value);
		setTimeout(() => {
			const selectedItem = dataa.find((item) => item.ttypcod === value);

			console.log("Selected item:", selectedItem);

			if (selectedItem) {
				setFormData({
					...formData,
					AccountCodeform: selectedItem.titmcod || "",
					Descriptionform: selectedItem.titmdsc || "",
					Status: selectedItem.titmsts || "",
					inputform4: selectedItem.tcmpcod || "",
					inputform5: selectedItem.tctgcod || "",
					inputform6: selectedItem.tcapcod || "",
					inputform7: selectedItem.ttypcod || "",
					inputform8: selectedItem.tpurrat || "",
					inputform9: selectedItem.tmanrat || "",
					inputform10: selectedItem.trtlrat || "",
					inputform11: selectedItem.tsalrat || "",
					inputform12: selectedItem.tfixrat || "",
					// inputform13: selectedItem.tcmpsts || "",
				});
				setSelectedCompany(selectedItem.tcmpcod);
				setSelectedCategory(selectedItem.tctgcod);
				setSelectedCapacity(selectedItem.tcapcod);
				setSelectedType(selectedItem.ttypcod);

				handlePrediction(selectedItem.titmdsc).then((result) => {
					setGeturdu(result);
				});
			} else {
				setFormData({
					...formData,
					Descriptionform: "",
					Status: "",
					inputform4: "",
					inputform5: "",
					inputform6: "",
					inputform7: "",
					inputform8: "",
					inputform9: "",
					inputform10: "",
					inputform11: "",
					inputform12: "",
					inputform13: "",
					inputform14: "",
				});
				handleResetDropdown();
			}
		}, 500);
	};
	const handleInputChangefetchdata = async (e) => {
		console.log("show the value is:", e.target.value);
		let inputValue = e.target.value;
		setFormData({
			...formData,
			AccountCodeform: e.target.value,
		});
	};

	const handlePrediction = async (name) => {
		const url = "https://rehman1603-english-to-urdu.hf.space/run/predict";
		const payload = {
			data: [name],
		};

		try {
			const response = await axios.post(url, payload, {
				headers: { "Content-Type": "application/json" },
			});

			console.log(response, "response");

			if (response.status === 200) {
				const result = response.data.data[0];

				console.log(result, "result");
				return result; // Return the result for use in the calling function
			} else {
				console.error("Failed to fetch prediction");
				return null; // Return null or some default value if the request failed
			}
		} catch (error) {
			console.error("Error during prediction:", error);
			return null; // Return null or some default value in case of an error
		}
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const formattedValue = value;
		const formattednormalvalue = value;
		if (name === "Descriptionform") {
			setFormData({
				...formData,
				Descriptionform: formattednormalvalue,
			});
			handlePrediction(formattedValue).then((result) => {
				setGeturdu(result);
				console.log("resulttttttttttt");
			});
		}
		if (name === "inputform8") {
			const lowercaseValue = value.toLowerCase();
			setFormData({
				...formData,
				inputform8: lowercaseValue,
			});
		}

		if (name === "inputform11") {
			const lowercaseValue = value.toLowerCase();
			setFormData({
				...formData,
				inputform11: lowercaseValue,
			});
		} else if (name === "inputform6") {
			const formattedValue = value.replace(/\D/g, "");
			if (formattedValue.length === 10) {
				if (!formattedValue.startsWith("03")) {
					setFormData({
						...formData,
						inputform6: "",
					});
				} else {
					setFormData({
						...formData,
						inputform6: formattedValue,
					});
				}
			} else {
				setFormData({
					...formData,
					inputform6: formattedValue,
				});
			}
		} else if (name === "inputform7") {
			// Remove spaces and ensure lowercase for email
			const formattedValue = value.replace(/\s/g, "").toLowerCase();
			setFormData({
				...formData,
				inputform7: formattedValue,
			});
		} else {
			setFormData({
				...formData,
				[name]: formattedValue,
			});
		}
		if (name === "UrduFormDescription") {
			console.log("Searching for:", formattedValue);
			setGeturdu(formattedValue);
		}
		if (name === "AccountCodeform") {
			console.log("Searching for:", value);

			const selectedItem = getitemmaintenance.find(
				(item) => item.titmcod === value
			);

			console.log("Selected item:", selectedItem);

			if (selectedItem) {
				setFormData({
					...formData,
					AccountCodeform: selectedItem.titmcod || "",
					Descriptionform: selectedItem.titmdsc || "",
					Status: selectedItem.titmsts || "",
					inputform4: selectedItem.tcmpcod || "",
					inputform5: selectedItem.tctgcod || "",
					inputform6: selectedItem.tcapcod || "",
					inputform7: selectedItem.ttypcod || "",
					inputform8: selectedItem.tpurrat || "",
					inputform9: selectedItem.tmanrat || "",
					inputform10: selectedItem.trtlrat || "",
					inputform11: selectedItem.tsalrat || "",
					inputform12: selectedItem.tfixrat || "",
				});
				setSelectedCompany(selectedItem.tcmpcod);
				setSelectedCategory(selectedItem.tctgcod);
				setSelectedCapacity(selectedItem.tcapcod);
				setSelectedType(selectedItem.ttypcod);
				handlePrediction(selectedItem.titmdsc).then((result) => {
					setGeturdu(result);
				});
			} else {
				setFormData({
					...formData,
					Descriptionform: "",
					Status: "",
					inputform4: "",
					inputform5: "",
					inputform6: "",
					inputform7: "",
					inputform8: "",
					inputform9: "",
					inputform10: "",
					inputform11: "",
					inputform12: "",
					inputform13: "",
					inputform14: "",
				});
				handleResetDropdown();
			}
		}
	};

	const resetData = () => {
		setSearchText("");
	};
	const [highlightedRowIndex, setHighlightedRowIndex] = useState(0);
	const handleRowClick = (selectedItem, rowIndex) => {
		console.log("handleRowClickAccount", selectedItem);
		setModalOpen(false);
		setFormData({
			...formData,
			AccountCodeform: selectedItem.titmcod || "",
			Descriptionform: selectedItem.titmdsc || "",
			Status: selectedItem.titmsts || "",
			inputform4: selectedItem.tcmpcod || "",
			inputform5: selectedItem.tctgcod || "",
			inputform6: selectedItem.tcapcod || "",
			inputform7: selectedItem.ttypcod || "",
			inputform8: selectedItem.tpurrat || "",
			inputform9: selectedItem.tmanrat || "",
			inputform10: selectedItem.trtlrat || "",
			inputform11: selectedItem.tsalrat || "",
			inputform12: selectedItem.tfixrat || "",
		});
		setSelectedCompany(selectedItem.tcmpcod);
		setSelectedCategory(selectedItem.tctgcod);
		setSelectedCapacity(selectedItem.tcapcod);
		setSelectedType(selectedItem.ttypcod);
		handlePrediction(selectedItem.ttypdsc).then((result) => {
			setGeturdu(result);
		});

		resetData();
	};

	const handleFocus = (codeparam) => {
		if (codeparam.current) {
			codeparam.current.style.backgroundColor = "orange";
		}
	};

	const handleSave = () => {
		handleFormSubmit();
	};

	const handleClear = () => {
		// dispatch(fetchNewTypeMaintenance(organisation.code));
		setFormData({
			...formData,
			Descriptionform: "",
			Status: "",
			inputform4: "",
			inputform5: "",
			inputform6: "",
			inputform7: "",
			inputform8: "",
			inputform9: "",
			inputform10: "",
			inputform11: "",
			inputform12: "",
			inputform13: "",
			inputform14: "",
		});

		handleResetDropdown();
		if (Code.current) {
			Code.current.focus();
		}
	};

	const handleReturn = () => {
		navigate("/MainPage");
	};

	const handleBlur = (codeparam) => {
		if (codeparam.current) {
			codeparam.current.style.backgroundColor = "#3368B5";
		}
	};
	const {
		isSidebarVisible,
		toggleSidebar,
		getcolor,
		fontcolor,
		toggleChangeColor,
	} = useTheme();
	const headercolor = "#3368B5";
	const contentStyle = {
		backgroundColor: getcolor,
		height: "100vh",
		width: isSidebarVisible ? "calc(100vw - 5%)" : "100vw",
		position: "relative",
		top: "50%",
		left: isSidebarVisible ? "50%" : "57%",
		transform: "translate(-50%, -50%)",
		transition: isSidebarVisible
			? "left 3s ease-in-out, width 2s ease-in-out"
			: "left 3s ease-in-out, width 2s ease-in-out",
		display: "flex",
		justifyContent: "center",
		alignItems: "start",
		overflowX: "hidden",
		overflowY: "hidden",
		textAlign: "center",
		maxWidth: "900px",
		fontSize: "15px",
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: "23px",
		fontFamily: '"Poppins", sans-serif',
	};
	useEffect(() => {
		document.documentElement.style.setProperty("--background-color", getcolor);
	}, [getcolor]);
	useEffect(() => {
		document.documentElement.style.setProperty("--font-color", fontcolor);
	}, [fontcolor]);
	useEffect(() => {
		document.documentElement.style.setProperty(
			"--headercolor-color",
			headercolor
		);
	}, [headercolor]);
	return (
		<>
			<div
				style={{
					backgroundColor: getcolor,
					height: "100vh",
					width: "80vw",
					overflowX: "hidden",
					overflowY: "hidden",
				}}
			>
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
				<div style={contentStyle}>
					<div
						className="col-md-12 "
						style={{
							width: "100%",
							border: `1px solid ${fontcolor}`,
							borderRadius: "9px",
						}}
					>
						<NavComponent textdata={`${textdata}`} />
						<div
							className="customermaintenacnescreen-scroll"
							style={{
								backgroundColor: "white",
								borderBottom: `1px solid ${fontcolor}`,
								overflowY: "auto",
								overflowX: "hidden",
								maxHeight: "65vh",
								width: "100%",
							}}
							// className="custom-scroll-customermaintenacnescreen"
							// style={{
							//   overflowY: "auto",
							//   overflowX: "hidden",
							//   maxHeight: "65vh",
							//   "&::-webkit-scrollbar": {
							//     width: "0.5em",
							//   },
							//   "&::-webkit-scrollbar-track": {
							//     backgroundColor: "black",
							//   },
							//   "&::-webkit-scrollbar-thumb": {
							//     backgroundColor: "orange",
							//   },
							// }}
						>
							<div
								onSubmit={handleFormSubmit}
								style={{
									padding: "20px 0px",
									backgroundColor: getcolor,
									color: fontcolor,
								}}
							>
								<div className="row">
									<br />
									<div className="row">
										<div className="col-sm-9">
											<div className="row">
												<div className="col-sm-3 label-customer">
													Customer Code:
												</div>
												<div className="col-sm-2">
													<Form.Control
														type="text"
														className="form-control-customer custom-input"
														placeholder="Code"
														name="AccountCodeform"
														value={formData.AccountCodeform}
														onChange={(e) => {
															const inputValue = e.target.value.toUpperCase();
															if (inputValue.length > 20) {
																setAlertData({
																	type: "error",
																	message:
																		"Code should not exceed 20 characters.",
																});
																setTimeout(() => {
																	setAlertData(null);
																}, 3000);
																return;
															}

															handleInputChangefetchdata({
																target: {
																	value: inputValue,
																},
															});
														}}
														style={{
															fontSize: "15px",
															padding: "10px",
															textAlign: "left",
															borderRadius: "8px",
														}}
														onKeyDown={(e) => {
															if (e.key === "Enter") {
																handleBlurRVC();
																handleEnterKeyPress(MannualCode, e);
																const upperCaseValue =
																	e.target.value.toUpperCase();

																if (
																	getitemmaintenance &&
																	getitemmaintenance.length > 0
																) {
																	const selectedItem = getitemmaintenance.find(
																		(item) => item.titmcod === upperCaseValue
																	);

																	if (selectedItem) {
																		setAlertData({
																			type: "success",
																			message: "Record found!",
																		});
																		setTimeout(() => {
																			setAlertData(null);
																		}, 3000);
																		console.log("selectedItem:", selectedItem);
																		handleEnterKeyPress(MannualCode, e);
																	} else {
																		setAlertData({
																			type: "error",
																			message: "Record not found!",
																		});
																		setTimeout(() => {
																			setAlertData(null);
																		}, 3000);
																		handleEnterKeyPress(MannualCode, e);
																	}
																} else {
																	setAlertData({
																		type: "error",
																		message:
																			"Data rows are not available or empty",
																	});
																	setTimeout(() => {
																		setAlertData(null);
																	}, 3000);
																}
															}
														}}
														onFocus={(e) => {
															e.target.select();
														}}
														onDoubleClick={(e) => {
															handleDoubleClick(e);
															setTimeout(() => {
																dispatch(
																	fetchGetWorkShopItemMaintenance(
																		organisation.code
																	)
																);
																focusNextInput(SearchBox);
															}, 100);
														}}
														ref={Code}
													/>
												</div>
												<div className="col-sm-3 label-item">Manual Code:</div>
												<div className="col-sm-4 d-flex align-items-center">
													<Form.Control
														type="text"
														id="MannualCode"
														placeholder="MOldCod"
														name="MannualCode"
														className={`form-control-customer ${
															errors.MannualCode ? "border-red" : ""
														}`}
														value={formData.MannualCode}
														ref={MannualCode}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "MannualCode",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(MannualRef, e)
														}
														style={{ flex: "50%", marginRight: "12px" }}
													/>
													<Form.Control
														type="text"
														id="MannualRef"
														placeholder="MOldCod"
														name="MannualRef"
														className={`form-control-customer ${
															errors.MannualRef ? "border-red" : ""
														}`}
														value={formData.MannualRef}
														ref={MannualRef}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "MannualRef",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) => handleEnterKeyPress(Status, e)}
														style={{
															fontSize: "16px",
															textAlign: "left",
															marginRight: "10px",
															flex: "50%",
														}}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-item">Name:</div>
												<div className="col-sm-9 d-flex align-items-center">
													<Form.Control
														type="text"
														id="Descriptionform"
														placeholder="Name"
														name="Descriptionform"
														className={`form-control-customer ${
															errors.Descriptionform ? "border-red" : ""
														}`}
														value={formData.Descriptionform}
														ref={Description}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "Descriptionform",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform4ref, e)
														}
														style={{ flex: "60%", marginRight: "12px" }}
													/>
													<Form.Control
														type="text"
														id="UrduFormDescription"
														placeholder="اردو میں"
														name="UrduFormDescription"
														className={`form-control-customer ${
															errors.Descriptionform ? "border-red" : ""
														}`}
														style={{
															fontSize: "16px",
															fontWeight: "bold",
															textAlign: "right",
															marginRight: "10px",
															fontFamily: "Noto Nastaliq Urdu",
															flex: "40%",
														}}
														value={geturdu}
														onFocus={(e) => e.target.select()}
														onChange={handleInputChange}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-item">Father Name:</div>
												<div className="col-sm-9 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform4"
														placeholder="Father Name"
														name="inputform4"
														className={`form-control-customer ${
															errors.inputform4 ? "border-red" : ""
														}`}
														value={formData.inputform4}
														ref={inputform4ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "inputform4",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform5ref, e)
														}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-item">Address:</div>
												<div className="col-sm-9 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform5"
														placeholder="Address"
														name="inputform5"
														className={`form-control-customer ${
															errors.inputform5 ? "border-red" : ""
														}`}
														value={formData.inputform5}
														ref={inputform5ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "inputform5",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform6ref, e)
														}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-item"></div>
												<div className="col-sm-9 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform6"
														placeholder="Address"
														name="inputform6"
														className={`form-control-customer ${
															errors.inputform6 ? "border-red" : ""
														}`}
														value={formData.inputform6}
														ref={inputform6ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "inputform6",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform7ref, e)
														}
													/>
												</div>
											</div>

											<div className="row">
												<div className="col-sm-3 label-customer">Phone:</div>
												<div className="col-sm-4">
													<Form.Control
														type="text"
														id="inputform7"
														placeholder="Phone"
														name="inputform7"
														className={`form-control-customer ${
															errors.inputform7 ? "border-red" : ""
														}`}
														style={{ textAlign: "left" }}
														value={formData.inputform7}
														maxLength={25}
														ref={inputform7ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) => {
															const value = e.target.value;

															if (/^\d*$/.test(value)) {
																if (
																	value.length >= 2 &&
																	value.slice(0, 2) !== "0"
																) {
																	setAlertData({
																		type: "error",
																		message: "Phone number must start with 0",
																	});
																	setTimeout(() => {
																		setAlertData(null);
																	}, 3000);

																	// inputform11ref.current.focus();
																} else {
																	handleInputChange(e);
																}
															} else {
																setAlertData({
																	type: "error",
																	message:
																		"Only numbers are allowed in the phone number",
																});
																setTimeout(() => {
																	setAlertData(null);
																}, 3000);
															}
														}}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform8ref, e)
														}
													/>
												</div>
												<div className="col-sm-2 label-customer">Mobile:</div>
												<div className="col-sm-3">
													<Form.Control
														type="text"
														id="inputform8"
														placeholder="Mobile No"
														name="inputform8"
														className={`form-control-customer ${
															errors.inputform8 ? "border-red" : ""
														}`}
														style={{ textAlign: "left" }}
														value={formData.inputform8}
														maxLength={11}
														ref={inputform8ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) => {
															const value = e.target.value;

															if (/^\d*$/.test(value)) {
																if (
																	value.length >= 2 &&
																	value.slice(0, 2) !== "03"
																) {
																	setAlertData({
																		type: "error",
																		message: "Mobile number must start with 03",
																	});
																	setTimeout(() => {
																		setAlertData(null);
																	}, 3000);

																	// inputform11ref.current.focus();
																} else {
																	handleInputChange(e);
																}
															} else {
																setAlertData({
																	type: "error",
																	message:
																		"Only numbers are allowed in the mobile number",
																});
																setTimeout(() => {
																	setAlertData(null);
																}, 3000);
															}
														}}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform9ref, e)
														}
													/>
												</div>
											</div>

											<div className="row">
												<div className="col-sm-3 label-customer">CNIC:</div>
												<div className="col-sm-4">
													<Form.Control
														type="text"
														id="inputform9"
														placeholder="(e.g., 35201-9773413-3)"
														name="inputform9"
														className={`form-control-customer ${
															errors.inputform9 ? "border-red" : ""
														}`}
														style={{ textAlign: "left" }}
														value={formData.inputform9}
														maxLength={15}
														ref={inputform9ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) => {
															let value = e.target.value.replace(/\D/g, "");
															if (value.length > 5)
																value = `${value.slice(0, 5)}-${value.slice(
																	5
																)}`;
															if (value.length > 13)
																value = `${value.slice(0, 13)}-${value.slice(
																	13,
																	14
																)}`;

															e.target.value = value;
															handleInputChange(e);

															const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
															if (!cnicRegex.test(value)) {
																setAlertData({
																	type: "error",
																	message:
																		"CNIC must follow the format 35201-9773413-3.",
																});
																setTimeout(() => {
																	setAlertData(null);
																}, 3000);
															} else {
																setAlertData(null);
															}
														}}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform10ref, e)
														}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-item">Area:</div>
												<div className="col-sm-3 d-flex align-items-center">
													<Form.Group
														controlId="status"
														style={{ display: "flex", alignItems: "center" }}
													>
														<CustomDropdown
															key={dropdownKey}
															value={selectedCompany}
															width={208}
															required
															onChange={handleCompanyChange}
															selectRef={inputform10ref}
															className={errors.inputform10}
															fetchUrl={`${apiLinks}/GetActiveCompany.php`}
															valueKey="tcmpcod"
															labelKey="tcmpdsc"
															placeholder="Search or select..."
															isClearable={true}
															styles={{
																placeholder: (base) => ({
																	...base,
																	fontWeight: "normal",
																}),
															}}
															onKeyDown={(e) =>
																handleEnterKeyPress(inputform11ref, e)
															}
															postapi={`${apiLinks}/SaveCompany.php`}
															postfisrt="FCmpCod"
															postsecond="FCmpDsc"
															postthird="FCmpSts"
															postfouth="FUsrId"
															postfifth="code"
														/>
													</Form.Group>
												</div>
												<div className="col-sm-3 label-item">Type:</div>
												<div className="col-sm-3 d-flex align-items-center">
													<Form.Group
														controlId="status"
														style={{ display: "flex", alignItems: "center" }}
													>
														<CustomDropdown
															key={dropdownKey}
															value={selectedCategory}
															width={150}
															required
															onChange={handleCategoryChange}
															selectRef={inputform11ref}
															className={errors.inputform11}
															fetchUrl={`${apiLinks}/GetActiveCatg.php`}
															valueKey="tctgcod"
															labelKey="tctgdsc"
															placeholder="Search or select..."
															isClearable={true}
															styles={{
																placeholder: (base) => ({
																	...base,
																	fontWeight: "normal",
																}),
															}}
															onKeyDown={(e) =>
																handleEnterKeyPress(inputform12ref, e)
															}
															postapi={`${apiLinks}/SaveCatg.php`}
															postfisrt="FCtgCod"
															postsecond="FCtgDsc"
															postthird="FCtgSts"
															postfouth="FUsrId"
															postfifth="code"
														/>
													</Form.Group>
												</div>
											</div>
										</div>
										<div className="col-sm-3">
											<div className="row">
												<div className="col-sm-5 label-customer">Status:</div>
												<div className="col-sm-7">
													<Form.Control
														as="select"
														name="Status"
														value={formData.Status}
														onChange={handleInputChange}
														className={`form-control-customer ${
															errors.Status ? "border-red" : ""
														}`}
														style={{
															height: "28px",
															padding: "0px",
															paddingLeft: "5px",
														}}
														onKeyDown={(e) =>
															handleEnterKeyPress(Description, e)
														}
														ref={Status}
													>
														<option
															style={{
																backgroundColor: getcolor,
																color: fontcolor,
															}}
															value="A"
														>
															Active
														</option>
														<option
															style={{
																backgroundColor: getcolor,
																color: fontcolor,
															}}
															value="N"
														>
															Not Active
														</option>
													</Form.Control>
												</div>
											</div>
											<div className="row ">
												<label style={{ display: "block" }}>
													<div
														style={{
															width: "100%",
															height: "95px",
															border: "2px dashed #ababab",
															marginLeft: "-4%",
															borderRadius: "0px",
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
															backgroundColor: getcolor,
															boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
															transition: "background-color 0.3s ease",
															// cursor: "pointer",
															overflow: "hidden",
														}}
														onMouseEnter={(e) =>
															(e.currentTarget.style.backgroundColor =
																fontcolor)
														}
														onMouseLeave={(e) =>
															(e.currentTarget.style.backgroundColor = getcolor)
														}
													>
														<img
															id="pic1-preview"
															src=""
															alt="Upload"
															style={{
																width: "100px",
																height: "90px",
																display: "block",
															}}
														/>
													</div>
												</label>
											</div>
											<div className="row">
												<input
													type="file"
													id="pic1"
													style={{ display: "none" }}
													onChange={handleImageChange1}
												/>
												<label
													htmlFor="pic1"
													style={{
														border: "1px solid #FFFFFF",
														width: "90%",
														marginLeft: "2px",
														height: "25px",
														marginTop: "2px",
														color: "black",
														backgroundColor: "#3368B5",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														cursor: "pointer",
													}}
													ref={inputform6ref}
													onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
												>
													<i
														className="fas fa-upload"
														style={{ marginRight: "5px" }}
													></i>
													Image
												</label>
											</div>
											<div className="row" style={{ marginTop: "8vh" }}>
												<div className="col-sm-5 label-item">Group:</div>
												<div className="col-sm-7 ">
													<Form.Group
														controlId="status"
														style={{ display: "flex", alignItems: "center" }}
													>
														<CustomDropdown
															key={dropdownKey}
															value={selectedCategory}
															width={110}
															required
															onChange={handleCategoryChange}
															selectRef={inputform12ref}
															className={errors.inputform12}
															fetchUrl={`${apiLinks}/GetActiveCatg.php`}
															valueKey="tctgcod"
															labelKey="tctgdsc"
															placeholder="Search or select..."
															isClearable={true}
															styles={{
																placeholder: (base) => ({
																	...base,
																	fontWeight: "normal",
																}),
															}}
															onKeyDown={(e) =>
																handleEnterKeyPress(inputform13ref, e)
															}
															postapi={`${apiLinks}/SaveCatg.php`}
															postfisrt="FCtgCod"
															postsecond="FCtgDsc"
															postthird="FCtgSts"
															postfouth="FUsrId"
															postfifth="code"
														/>
													</Form.Group>
												</div>
											</div>
										</div>
									</div>
									<hr
										style={{
											border: `1px solid white`,
											marginTop: "1px",
											marginBottom: "4px",
										}}
									/>
									<div className="row">
										<div className="col-sm-9">
											<div className="row">
												<div className="col-sm-3 label-item">Profession:</div>
												<div className="col-sm-3 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform13"
														placeholder="Profession"
														name="inputform13"
														className={`form-control-customer ${
															errors.inputform13 ? "border-red" : ""
														}`}
														value={formData.inputform13}
														ref={inputform13ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "inputform13",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform14ref, e)
														}
														// style={{ flex: "60%", marginRight: "12px" }}
													/>
												</div>
												<div className="col-sm-3 label-item">Phone:</div>
												<div className="col-sm-3 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform14"
														placeholder="Phone No"
														name="inputform14"
														className={`form-control-customer ${
															errors.inputform14 ? "border-red" : ""
														}`}
														style={{ textAlign: "left" }}
														value={formData.inputform14}
														maxLength={11}
														ref={inputform14ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) => {
															const value = e.target.value;

															if (/^\d*$/.test(value)) {
																if (
																	value.length >= 2 &&
																	value.slice(0, 2) !== "03"
																) {
																	setAlertData({
																		type: "error",
																		message: "Mobile number must start with 03",
																	});
																	setTimeout(() => {
																		setAlertData(null);
																	}, 3000);

																	// inputform11ref.current.focus();
																} else {
																	handleInputChange(e);
																}
															} else {
																setAlertData({
																	type: "error",
																	message:
																		"Only numbers are allowed in the mobile number",
																});
																setTimeout(() => {
																	setAlertData(null);
																}, 3000);
															}
														}}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform15ref, e)
														}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-item">Address:</div>
												<div className="col-sm-9 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform16"
														placeholder="Address"
														name="inputform16"
														className={`form-control-customer ${
															errors.inputform16 ? "border-red" : ""
														}`}
														value={formData.inputform16}
														ref={inputform16ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "inputform16",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform17ref, e)
														}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-item"></div>
												<div className="col-sm-9 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform17"
														placeholder="Address"
														name="inputform17"
														className={`form-control-customer ${
															errors.inputform17 ? "border-red" : ""
														}`}
														value={formData.inputform17}
														ref={inputform17ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "inputform17",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform18ref, e)
														}
													/>
												</div>
											</div>
										</div>
										<div className="col-sm-3">
											<div className="row">
												<div className="col-sm-5 label-item">Income:</div>
												<div className="col-sm-7 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform15"
														placeholder="Purchase Rate"
														name="inputform15"
														className={`form-control-customer ${
															errors.inputform15 ? "border-red" : ""
														}`}
														value={formData.inputform15 || "0.00"}
														style={{ textAlign: "right" }}
														ref={inputform15ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) => {
															const rawValue = e.target.value.replace(/,/g, "");
															const parsedValue = parseInt(rawValue, 10);

															if (!/^\d*$/.test(rawValue)) {
																setAlertData({
																	type: "error",
																	message: "Please enter numbers only.",
																});
															} else if (parsedValue < 0) {
																setAlertData({
																	type: "error",
																	message: "Amount cannot be negative.",
																});
															} else if (parsedValue > 10000000) {
																setAlertData({
																	type: "error",
																	message: "Amount cannot exceed 10,000,000.",
																});
															} else if (
																rawValue.length > 1 &&
																rawValue.startsWith("0")
															) {
																setAlertData({
																	type: "error",
																	message: "Leading zeros are not allowed.",
																});
															} else {
																const formattedValue =
																	parsedValue > 0
																		? parsedValue.toLocaleString("en-US")
																		: "0.00";
																handleInputChange({
																	target: {
																		name: "inputform15",
																		value: formattedValue,
																	},
																});
																setAlertData(null);
															}
															setTimeout(() => {
																setAlertData(null);
															}, 2000);
														}}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform16ref, e)
														}
													/>
												</div>
											</div>
										</div>
									</div>
									<hr
										style={{
											border: `1px solid white`,
											marginTop: "1px",
											marginBottom: "4px",
										}}
									/>
									<div className="row">
										<div className="col-sm-9">
											<div className="row">
												<div className="col-sm-3 label-item">Collector:</div>
												<div className="col-sm-3 d-flex align-items-center">
													<Form.Group
														controlId="status"
														style={{ display: "flex", alignItems: "center" }}
													>
														<CustomDropdown
															key={dropdownKey}
															value={selectedCompany}
															width={208}
															required
															onChange={handleCompanyChange}
															selectRef={inputform18ref}
															className={errors.inputform18}
															fetchUrl={`${apiLinks}/GetActiveCompany.php`}
															valueKey="tcmpcod"
															labelKey="tcmpdsc"
															placeholder="Search or select..."
															isClearable={true}
															styles={{
																placeholder: (base) => ({
																	...base,
																	fontWeight: "normal",
																}),
															}}
															onKeyDown={(e) =>
																handleEnterKeyPress(inputform19ref, e)
															}
															postapi={`${apiLinks}/SaveCompany.php`}
															postfisrt="FCmpCod"
															postsecond="FCmpDsc"
															postthird="FCmpSts"
															postfouth="FUsrId"
															postfifth="code"
														/>
													</Form.Group>
												</div>
												<div className="col-sm-3 label-item">Mode:</div>
												<div className="col-sm-3 d-flex align-items-center">
													<Form.Group
														controlId="status"
														style={{ display: "flex", alignItems: "center" }}
													>
														<CustomDropdown
															key={dropdownKey}
															value={selectedCategory}
															width={150}
															required
															onChange={handleCategoryChange}
															selectRef={inputform19ref}
															className={errors.inputform19}
															fetchUrl={`${apiLinks}/GetActiveCatg.php`}
															valueKey="tctgcod"
															labelKey="tctgdsc"
															placeholder="Search or select..."
															isClearable={true}
															styles={{
																placeholder: (base) => ({
																	...base,
																	fontWeight: "normal",
																}),
															}}
															onKeyDown={(e) =>
																handleEnterKeyPress(inputform20ref, e)
															}
															postapi={`${apiLinks}/SaveCatg.php`}
															postfisrt="FCtgCod"
															postsecond="FCtgDsc"
															postthird="FCtgSts"
															postfouth="FUsrId"
															postfifth="code"
														/>
													</Form.Group>
												</div>
											</div>
										</div>
										<div className="col-sm-3"></div>
									</div>
									<hr
										style={{
											border: `1px solid white`,
											marginTop: "1px",
											marginBottom: "4px",
										}}
									/>
									<div className="row">
										<div className="col-sm-9">
											<div className="row">
												<div className="col-sm-3 label-item">
													Guaranter Name:
												</div>
												<div className="col-sm-9 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform20"
														placeholder="Guaranter Name"
														name="inputform20"
														className={`form-control-customer ${
															errors.inputform20 ? "border-red" : ""
														}`}
														value={formData.inputform20}
														ref={inputform20ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "inputform20",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform21ref, e)
														}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-item">Father Name:</div>
												<div className="col-sm-9 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform21"
														placeholder="Father Name"
														name="inputform21"
														className={`form-control-customer ${
															errors.inputform21 ? "border-red" : ""
														}`}
														value={formData.inputform21}
														ref={inputform21ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "inputform21",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform22ref, e)
														}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-item">Address:</div>
												<div className="col-sm-9 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform22"
														placeholder="Address"
														name="inputform22"
														className={`form-control-customer ${
															errors.inputform22 ? "border-red" : ""
														}`}
														value={formData.inputform22}
														ref={inputform22ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "inputform22",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform23ref, e)
														}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-item"></div>
												<div className="col-sm-9 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform23"
														placeholder="Address"
														name="inputform23"
														className={`form-control-customer ${
															errors.inputform23 ? "border-red" : ""
														}`}
														value={formData.inputform23}
														ref={inputform23ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "inputform23",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform24ref, e)
														}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-customer">CNIC:</div>
												<div className="col-sm-4">
													<Form.Control
														type="text"
														id="inputform24"
														placeholder="(e.g., 35201-9773413-3)"
														name="inputform24"
														className={`form-control-customer ${
															errors.inputform24 ? "border-red" : ""
														}`}
														style={{ textAlign: "left" }}
														value={formData.inputform24}
														maxLength={15}
														ref={inputform24ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) => {
															let value = e.target.value.replace(/\D/g, "");

															if (value.length > 5)
																value = `${value.slice(0, 5)}-${value.slice(
																	5
																)}`;
															if (value.length > 13)
																value = `${value.slice(0, 13)}-${value.slice(
																	13,
																	14
																)}`;
															e.target.value = value;
															handleInputChange(e);

															const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
															if (!cnicRegex.test(value)) {
																setAlertData({
																	type: "error",
																	message:
																		"CNIC must follow the format 35201-9773413-3.",
																});
																setTimeout(() => {
																	setAlertData(null);
																}, 3000);
															} else {
																setAlertData(null);
															}
														}}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform25ref, e)
														}
													/>
												</div>
												<div className="col-sm-2 label-customer">Mobile:</div>
												<div className="col-sm-3">
													<Form.Control
														type="text"
														id="inputform25"
														placeholder="Mobile No"
														name="inputform25"
														className={`form-control-customer ${
															errors.inputform25 ? "border-red" : ""
														}`}
														style={{ textAlign: "left" }}
														value={formData.inputform25}
														maxLength={11}
														ref={inputform25ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) => {
															const value = e.target.value;

															if (/^\d*$/.test(value)) {
																if (
																	value.length >= 2 &&
																	value.slice(0, 2) !== "03"
																) {
																	setAlertData({
																		type: "error",
																		message: "Mobile number must start with 03",
																	});
																	setTimeout(() => {
																		setAlertData(null);
																	}, 3000);

																	// inputform11ref.current.focus();
																} else {
																	handleInputChange(e);
																}
															} else {
																setAlertData({
																	type: "error",
																	message:
																		"Only numbers are allowed in the mobile number",
																});
																setTimeout(() => {
																	setAlertData(null);
																}, 3000);
															}
														}}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform26ref, e)
														}
													/>
												</div>
											</div>
										</div>
										<div className="col-sm-3"></div>
									</div>

									<hr
										style={{
											border: `1px solid white`,
											marginTop: "1px",
											marginBottom: "4px",
										}}
									/>
									<div className="row">
										<div className="col-sm-9">
											<div className="row">
												<div className="col-sm-3 label-item">Witness Name:</div>
												<div className="col-sm-9 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform26"
														placeholder="Witness Name"
														name="inputform26"
														className={`form-control-customer ${
															errors.inputform26 ? "border-red" : ""
														}`}
														value={formData.inputform26}
														ref={inputform26ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "inputform26",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform27ref, e)
														}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-item">Father Name:</div>
												<div className="col-sm-9 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform27"
														placeholder="Father Name"
														name="inputform27"
														className={`form-control-customer ${
															errors.inputform27 ? "border-red" : ""
														}`}
														value={formData.inputform27}
														ref={inputform27ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "inputform27",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform28ref, e)
														}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-item">Address:</div>
												<div className="col-sm-9 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform28"
														placeholder="Address"
														name="inputform28"
														className={`form-control-customer ${
															errors.inputform28 ? "border-red" : ""
														}`}
														value={formData.inputform28}
														ref={inputform28ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "inputform28",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform29ref, e)
														}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-item"></div>
												<div className="col-sm-9 d-flex align-items-center">
													<Form.Control
														type="text"
														id="inputform29"
														placeholder="Address"
														name="inputform29"
														className={`form-control-customer ${
															errors.inputform29 ? "border-red" : ""
														}`}
														value={formData.inputform29}
														ref={inputform29ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) =>
															handleInputChange({
																target: {
																	name: "inputform29",
																	value: e.target.value,
																},
															})
														}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform30ref, e)
														}
													/>
												</div>
											</div>
											<div className="row">
												<div className="col-sm-3 label-customer">CNIC:</div>
												<div className="col-sm-4">
													<Form.Control
														type="text"
														id="inputform30"
														placeholder="(e.g., 35201-9773413-3)"
														name="inputform30"
														className={`form-control-customer ${
															errors.inputform30 ? "border-red" : ""
														}`}
														style={{ textAlign: "left" }}
														value={formData.inputform30}
														maxLength={15}
														ref={inputform30ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) => {
															let value = e.target.value.replace(/\D/g, "");

															if (value.length > 5)
																value = `${value.slice(0, 5)}-${value.slice(
																	5
																)}`;
															if (value.length > 13)
																value = `${value.slice(0, 13)}-${value.slice(
																	13,
																	14
																)}`;
															e.target.value = value;
															handleInputChange(e);

															const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
															if (!cnicRegex.test(value)) {
																setAlertData({
																	type: "error",
																	message:
																		"CNIC must follow the format 35201-9773413-3.",
																});
																setTimeout(() => {
																	setAlertData(null);
																}, 3000);
															} else {
																setAlertData(null);
															}
														}}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform31ref, e)
														}
													/>
												</div>
												<div className="col-sm-2 label-customer">Mobile:</div>
												<div className="col-sm-3">
													<Form.Control
														type="text"
														id="inputform31"
														placeholder="Mobile No"
														name="inputform31"
														className={`form-control-customer ${
															errors.inputform31 ? "border-red" : ""
														}`}
														style={{ textAlign: "left" }}
														value={formData.inputform31}
														maxLength={11}
														ref={inputform31ref}
														onFocus={(e) => e.target.select()}
														onChange={(e) => {
															const value = e.target.value;

															if (/^\d*$/.test(value)) {
																if (
																	value.length >= 2 &&
																	value.slice(0, 2) !== "03"
																) {
																	setAlertData({
																		type: "error",
																		message: "Mobile number must start with 03",
																	});
																	setTimeout(() => {
																		setAlertData(null);
																	}, 3000);

																	// inputform11ref.current.focus();
																} else {
																	handleInputChange(e);
																}
															} else {
																setAlertData({
																	type: "error",
																	message:
																		"Only numbers are allowed in the mobile number",
																});
																setTimeout(() => {
																	setAlertData(null);
																}, 3000);
															}
														}}
														onKeyDown={(e) =>
															handleEnterKeyPress(inputform32ref, e)
														}
													/>
												</div>
											</div>
										</div>
										<div className="col-sm-3"></div>
									</div>
									<hr
										style={{
											border: `1px solid white`,
											marginTop: "1px",
											marginBottom: "4px",
										}}
									/>
									<div className="row">
										<div className="col-sm-9">
											<div className="row">
												<div className="col-sm-3 label-item">Verified By:</div>
												<div className="col-sm-3 d-flex align-items-center">
													<Form.Group
														controlId="status"
														style={{ display: "flex", alignItems: "center" }}
													>
														<CustomDropdown
															key={dropdownKey}
															value={selectedCompany}
															width={208}
															required
															onChange={handleCompanyChange}
															selectRef={inputform32ref}
															className={errors.inputform32}
															fetchUrl={`${apiLinks}/GetActiveCompany.php`}
															valueKey="tcmpcod"
															labelKey="tcmpdsc"
															placeholder="Search or select..."
															isClearable={true}
															styles={{
																placeholder: (base) => ({
																	...base,
																	fontWeight: "normal",
																}),
															}}
															onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
															postapi={`${apiLinks}/SaveCompany.php`}
															postfisrt="FCmpCod"
															postsecond="FCmpDsc"
															postthird="FCmpSts"
															postfouth="FUsrId"
															postfifth="code"
														/>
													</Form.Group>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<ButtonGroupp
							Submit={Submit}
							handleFocus={handleFocus}
							handleBlur={handleBlur}
							handleSave={handleSave}
							handleReturn={handleReturn}
							handleClear={handleClear}
							handleFormSubmit={handleFormSubmit}
						/>
						<CustomerModal
							isOpen={isModalOpen}
							handleClose={handleCloseModal}
							title="Select Item"
							technicians={getitemmaintenance}
							searchRef={SearchBox}
							handleRowClick={handleRowClick}
							firstColKey="titmcod"
							secondColKey="titmdsc"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default CustomerMaintenance;
