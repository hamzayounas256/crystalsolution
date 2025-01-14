import { Form } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Item_Maintenance.css";
import NavComponent from "../../MainComponent/Navform/navbarform";
import ButtonGroupp from "../../MainComponent/Button/ButtonGroup/ButtonGroup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isLoggedIn, getUserData, getOrganisationData } from "../../Auth";
import { useMutation } from "@tanstack/react-query";
import { useTheme } from "../../../ThemeContext";
import {
	fetchGetBranches,
	fetchGetCrystalCustomer,
	fetchGetWorkShopItemMaintenance,
	fetchNewWorkShopItemMaintenance,
} from "../../Redux/action";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import CustomDropdown from "../../MainComponent/Dropdown/Dropdown";
import TwoColumnModel from "../../MainComponent/Models/TwoColumnModel";
import IncrementDecrementButtons from "../../MainComponent/Button/IncrementDecrementButton/IncrementDecrementButton";
function Item_Maintenance() {
	const dispatch = useDispatch();
	const user = getUserData();

	const organisation = getOrganisationData();
	// const { apiLinks } = useTheme();

	const {
		// getcolor,
		// fontcolor,
		getdatafontsize,
		getfontstyle,
		getnavbarbackgroundcolor,
		getnavbarfontcolor,
		// isSidebarVisible,
		apiLinks,
	} = useTheme();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		AccountCodeform: "",
		Descriptionform: "",
		UrduFormDescription: "",
		Status: "A",
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

	const getcompanydataState = useSelector(
		(state) => state.getworkshopitemmaintenance || {}
	);
	const {
		data: getworkshopitemmaintenance = [],
		loading: getcategoryloading,
		error: getcategoryerror,
	} = getcompanydataState;

	const newcompanymaintenanceState = useSelector(
		(state) => state.newworkshopitemmaintenance || {}
	);
	const {
		data: newworkshopitemmaintenance = [],
		loading: newcategoryloading,
		error: newcategoryerror,
	} = newcompanymaintenanceState;

	const getactivecompanymaintenanceState = useSelector(
		(state) => state.getactivecompanymantenance || {}
	);
	const {
		data: getactivecompanymaintenance = [],
		loading: getactiveloading,
		error: getactiveerror,
	} = getactivecompanymaintenanceState;

	function firstmovethecode() {
		if (Code.current) {
			Code.current.focus();
			setTimeout(() => {
				Code.current.select();
			}, 1000);
		}
	}
	useEffect(() => {
		firstmovethecode();
	}, []);
	useEffect(() => {
		console.log("===============", newworkshopitemmaintenance);
		if (newworkshopitemmaintenance) {
			setFormData((prevState) => ({
				...prevState,
				AccountCodeform: newworkshopitemmaintenance,
			}));
		}
	}, [newworkshopitemmaintenance]);
	useEffect(() => {
		if (!isLoggedIn()) {
			navigate("/login");
		}
	}, [navigate]);

	const [dataa, setDataa] = useState([]);

	// Only fetch once when component mounts
	useEffect(() => {
		console.log("Code:", getworkshopitemmaintenance);
		if (getworkshopitemmaintenance?.length === 0) {
			dispatch(fetchGetWorkShopItemMaintenance(organisation.code));
			dispatch(fetchNewWorkShopItemMaintenance(organisation.code));
		}
	}, [dispatch]);

	useEffect(() => {
		setDataa(getworkshopitemmaintenance);
	}, [getworkshopitemmaintenance]);

	const Codefocus = () => {
		if (Code.current) {
			Code.current.focus();
		}
	};
	const [alertData, setAlertData] = useState(null);
	const fontFamily = "verdana";
	const Code = useRef(null);
	const Description = useRef(null);
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

	const [selectedImage1, setSelectedImage1] = useState(null);

	const handleImageChange1 = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedImage1(file);
			console.log("file", file);
			const imgElement = document.getElementById("pic1-preview");
			imgElement.src = URL.createObjectURL(file);
		}
	};

	const [geturdu, setGeturdu] = useState("");
	const [dropdownKey, setDropdownKey] = useState(0);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedType, setSelectedType] = useState(null);

	const handleResetDropdown = () => {
		setDropdownKey((prevKey) => prevKey + 1);
		setSelectedCategory(null);
		setSelectedType(null);
	};
	const handleCategoryChange = (selectedOption) => {
		setSelectedCategory(selectedOption);
	};
	const handleTypeChange = (selectedOption) => {
		setSelectedType(selectedOption);
	};
	const handleFormSubmit = (e) => {
		e.preventDefault();

		// Prepare the data object
		const data = {
			FItmCod: formData.AccountCodeform,
			FItmDsc: formData.Descriptionform,
			FItmSts: formData.Status,
			FCtgCod: selectedCategory?.value || formData.inputform4,
			FTypCod: selectedType?.value || formData.inputform5,
			FItmUom: formData.inputform6,
			FPurRat: formData.inputform7,
			FSalRat: formData.inputform8,
			FItmRem: formData.inputform9,
			code: organisation.code,
			FUsrId: user.tusrid,
		};

		// console.log(data, "dataaaa");

		const urlEncodedData = new URLSearchParams(data).toString();

		axios
			.post(`${apiLinks}/SaveWorkshopItem.php`, urlEncodedData, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
			.then((response) => {
				// console.log(response, "response");

				if (response.data.error === 200) {
					firstmovethecode();
					setTimeout(() => {
						Code.current.focus();
						dispatch(fetchGetWorkShopItemMaintenance(organisation.code));
						dispatch(fetchNewWorkShopItemMaintenance(organisation.code));
					}, 500);

					// Clear form fields
					setFormData({
						...formData,
						AccountCodeform: "",
						Descriptionform: "",
						Status: "A",
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

					toast.success(`${response.data.message}`, {
						autoClose: 3000,
					});

					handleResetDropdown();
				} else {
					handleClear();
					toast.error(`${response.data.message}`, {
						autoClose: 3000,
					});
				}
			})
			.catch((error) => {
				toast.error("An error occurred during login. Please try again.", {
					autoClose: 3000,
				});
			});
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
	const [textdata, settextdata] = useState("Item Maintenance");

	const handleCloseModal = () => {
		setSearchText("");
		// data
		setHighlightedRowIndex(0);
		settextdata("Item Maintenance");
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
			const selectedItem = getworkshopitemmaintenance.find(
				(item) => item.titmcod === value
			);

			console.log("Selected item:", selectedItem);

			if (selectedItem) {
				setFormData({
					...formData,
					AccountCodeform: selectedItem.titmcod || "",
					Descriptionform: selectedItem.titmdsc || "",
					Status: selectedItem.titmsts || "",
					inputform4: selectedItem.tctgcod || "",
					inputform5: selectedItem.ttypcod || "",
					inputform6: selectedItem.titmuom || "",
					inputform7: selectedItem.tpurrat || "",
					inputform8: selectedItem.tsalrat || "",
					inputform9: selectedItem.titmrem || "",
				});
				setSelectedCategory(selectedItem.tctgcod);
				setSelectedType(selectedItem.ttypcod);

				handlePrediction(selectedItem.titmdsc).then((result) => {
					setGeturdu(result);
				});
			} else {
				setFormData({
					...formData,
					Descriptionform: "",
					Status: "A",
					inputform4: "",
					inputform5: "",
					inputform6: "",
					inputform7: "",
					inputform8: "",
					inputform9: "",
					inputform10: "",
					inputform11: "",
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
		if (name === "inputform6") {
			setFormData({
				...formData,
				inputform6: value,
			});
		}
		if (name === "inputform7") {
			setFormData({
				...formData,
				inputform7: value,
			});
		}
		if (name === "inputform8") {
			setFormData({
				...formData,
				inputform8: value,
			});
		}
		if (name === "inputform9") {
			setFormData({
				...formData,
				inputform9: value,
			});
		}
		if (name === "AccountCodeform") {
			console.log("Searching for:", value);

			const selectedItem = getworkshopitemmaintenance.find(
				(item) => item.titmcod === value
			);

			console.log("Selected item:", selectedItem);

			if (selectedItem) {
				setFormData({
					...formData,
					AccountCodeform: selectedItem.titmcod || "",
					Descriptionform: selectedItem.titmdsc || "",
					Status: selectedItem.titmsts || "",
					inputform4: selectedItem.tctgcod || "",
					inputform5: selectedItem.ttypcod || "",
					inputform6: selectedItem.titmuom || "",
					inputform7: selectedItem.tpurrat || "",
					inputform8: selectedItem.tsalrat || "",
					inputform9: selectedItem.titmrem || "",
				});
				setSelectedCategory(selectedItem.tctgcod);
				setSelectedType(selectedItem.ttypcod);

				handlePrediction(selectedItem.titmdsc).then((result) => {
					setGeturdu(result);
				});
			} else {
				setFormData({
					...formData,
					Descriptionform: "",
					Status: "A",
					inputform4: "",
					inputform5: "",
					inputform6: "",
					inputform7: "",
					inputform8: "",
					inputform9: "",
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
			inputform4: selectedItem.tctgcod || "",
			inputform5: selectedItem.ttypcod || "",
			inputform6: selectedItem.titmuom || "",
			inputform7: selectedItem.tpurrat || "",
			inputform8: selectedItem.tsalrat || "",
			inputform9: selectedItem.titmrem || "",
		});
		setSelectedCategory(selectedItem.tctgcod);
		setSelectedType(selectedItem.ttypcod);

		handlePrediction(selectedItem.titmdsc).then((result) => {
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
		dispatch(fetchNewWorkShopItemMaintenance(organisation.code));
		setFormData({
			...formData,
			Descriptionform: "",
			Status: "A",
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

		firstmovethecode();
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
		width: isSidebarVisible ? "calc(80vw - 0%)" : "80vw",
		position: "absolute",
		top: `calc(52% - ${window.innerHeight * 0}px)`,
		left: isSidebarVisible ? "55%" : "50%",
		transform: "translate(-50%, -50%)",
		transition: isSidebarVisible
			? "left 3s ease-in-out, width 2s ease-in-out"
			: "left 3s ease-in-out, width 2s ease-in-out",
		display: "flex",
		justifyContent: "start",
		alignItems: "start",
		overflowX: "hidden",
		overflowY: "hidden",
		wordBreak: "break-word",
		textAlign: "center",
		maxWidth: "600px",
		fontSize: "15px",
		fontStyle: "normal",
		fontWeight: "400",
		lineHeight: "23px",
		fontFamily: '"Poppins", sans-serif',
		padding: "0px",
		margin: "0px",
	};

	const [nextItemId, setNextItemId] = useState("");
	useEffect(() => {
		setNextItemId(newworkshopitemmaintenance);
	}, [newworkshopitemmaintenance]);
	useEffect(() => {
		if (nextItemId) {
			handleInputChangefetchdatafunction(nextItemId);
		}
	}, [nextItemId]);

	const handleInputChangefetchdatafunction = async (newValue) => {
		const selectedItem = getworkshopitemmaintenance.find(
			(item) => item.titmcod === newValue
		);

		if (selectedItem) {
			setFormData({
				...formData,
				AccountCodeform: selectedItem.titmcod || "",
				Descriptionform: selectedItem.titmdsc || "",
				Status: selectedItem.titmsts || "",
				inputform4: selectedItem.tctgcod || "",
				inputform5: selectedItem.ttypcod || "",
				inputform6: selectedItem.titmuom || "",
				inputform7: selectedItem.tpurrat || "",
				inputform8: selectedItem.tsalrat || "",
				inputform9: selectedItem.titmrem || "",
			});
			setSelectedCategory(selectedItem.tctgcod);
			setSelectedType(selectedItem.ttypcod);

			handlePrediction(selectedItem.tcmpdsc).then((result) => {
				setGeturdu(result);
			});
		} else {
			setFormData({
				...formData,
				Descriptionform: "",
				Status: "A",
			});
		}
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
			<ToastContainer />
			<div>
				<div style={contentStyle}>
					<div
						className="col-md-12 "
						style={{
							border: `1px solid ${fontcolor}`,
							borderRadius: "9px",
						}}
					>
						<NavComponent textdata={`${textdata}`} />

						{/* <br /> */}
						<div
							onSubmit={handleFormSubmit}
							style={{
								padding: "20px 0px",
								backgroundColor: getcolor,
								color: fontcolor,
							}}
						>
							<div className="row">
								<div className="col-sm-12">
									<br />

									<div className="row">
										<div className="col-sm-3 label-field">Code:</div>
										<div
											className="col-sm-2"
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												padding: "0 10px",
											}}
										>
											<Form.Control
												type="text"
												className="form-control-field custom-input"
												placeholder="Code"
												name="AccountCodeform"
												value={formData.AccountCodeform}
												onChange={(e) => {
													const inputValue = e.target.value.toUpperCase();
													if (inputValue.length > 3) {
														toast.error(
															"Code should not exceed 3 characters.",
															{
																autoClose: 3000,
															}
														);

														return;
													}
													if (!/^\d*$/.test(inputValue)) {
														toast.error("Only numeric values are allowed.", {
															autoClose: 3000,
														});

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
												maxLength={3}
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														handleBlurRVC();
														handleEnterKeyPress(Status, e);
														const upperCaseValue = e.target.value.toUpperCase();

														if (
															getworkshopitemmaintenance &&
															getworkshopitemmaintenance.length > 0
														) {
															const selectedItem =
																getworkshopitemmaintenance.find(
																	(item) => item.titmcod === upperCaseValue
																);

															if (selectedItem) {
																toast.success("Record found!", {
																	autoClose: 3000,
																});

																handleEnterKeyPress(Status, e);
															} else {
																toast.error("Record not found!", {
																	autoClose: 3000,
																});

																handleEnterKeyPress(Status, e);
															}
														} else {
															toast.error(
																"Data rows are not available or empty",
																{
																	autoClose: 3000,
																}
															);
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
															fetchGetWorkShopItemMaintenance(organisation.code)
														);
														focusNextInput(SearchBox);
													}, 100);
												}}
												ref={Code}
											/>
											<IncrementDecrementButtons
												getnavbarbackgroundcolor={getnavbarbackgroundcolor}
												getnavbarfontcolor={getnavbarfontcolor}
												setNextItemId={setNextItemId}
												formData={formData.AccountCodeform}
												digit={3}
											/>
										</div>
										<div className="col-sm-3"></div>
										<div className="col-sm-2 label-field">Status:</div>
										<div className="col-sm-2">
											<Form.Control
												as="select"
												name="Status"
												value={formData.Status}
												onChange={handleInputChange}
												className={`form-control-field ${
													errors.Status ? "border-red" : ""
												}`}
												style={{
													height: "28px",
													padding: "0px",
													paddingLeft: "5px",
												}}
												onKeyDown={(e) => handleEnterKeyPress(Description, e)}
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

									<div className="row">
										<div className="col-sm-3 label-field">Description:</div>
										<div className="col-sm-9 d-flex align-items-center">
											<Form.Control
												type="text"
												id="Descriptionform"
												placeholder="Description"
												name="Descriptionform"
												className={`form-control-field ${
													errors.Descriptionform ? "border-red" : ""
												}`}
												value={formData.Descriptionform}
												ref={Description}
												onFocus={(e) => e.target.select()}
												onChange={(e) =>
													handleInputChange({
														target: {
															name: "Descriptionform",
															value: e.target.value.toUpperCase(),
														},
													})
												}
												onKeyDown={(e) => handleEnterKeyPress(inputform4ref, e)}
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-3 label-field">Category:</div>
										<div className="col-sm-3 d-flex align-items-center">
											<Form.Group
												controlId="status"
												style={{ display: "flex", alignItems: "center" }}
											>
												<CustomDropdown
													key={dropdownKey}
													value={selectedCategory}
													width={250}
													required
													onChange={handleCategoryChange}
													selectRef={inputform4ref}
													className={errors.inputform4}
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
														handleEnterKeyPress(inputform5ref, e)
													}
													postapi={`${apiLinks}/SaveCategory.php`}
													postfisrt="FCtgCod"
													postsecond="FCtgDsc"
													postthird="FCtgSts"
													postfouth="FUsrId"
													postfifth="code"
												/>
											</Form.Group>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-3 label-field">Type:</div>
										<div className="col-sm-3 d-flex align-items-center">
											<Form.Group
												controlId="status"
												style={{ display: "flex", alignItems: "center" }}
											>
												<CustomDropdown
													key={dropdownKey}
													value={selectedType}
													width={250}
													required
													onChange={handleTypeChange}
													selectRef={inputform5ref}
													className={errors.inputform5}
													fetchUrl={`${apiLinks}/GetActiveType.php`}
													valueKey="ttypcod"
													labelKey="ttypdsc"
													placeholder="Search or select..."
													isClearable={true}
													styles={{
														placeholder: (base) => ({
															...base,
															fontWeight: "normal",
														}),
													}}
													onKeyDown={(e) =>
														handleEnterKeyPress(inputform6ref, e)
													}
													postapi={`${apiLinks}/SaveType.php`}
													postfisrt="FTypCod"
													postsecond="FTypDsc"
													postthird="FTypSts"
													postfouth="FUsrId"
													postfifth="code"
												/>
											</Form.Group>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-3 label-field">UOM:</div>
										<div className="col-sm-2 d-flex align-items-center">
											<Form.Control
												type="text"
												id="inputform6"
												placeholder="UOM"
												name="inputform6"
												className={`form-control-field ${
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
												onKeyDown={(e) => handleEnterKeyPress(inputform7ref, e)}
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-3 label-field">Purchase:</div>
										<div className="col-sm-3 d-flex align-items-center">
											<Form.Control
												type="text"
												id="inputform7"
												placeholder="Purchase Rate"
												name="inputform7"
												className={`form-control-field ${
													errors.inputform7 ? "border-red" : ""
												}`}
												style={{
													textAlign: "right",
												}}
												value={formData.inputform7}
												ref={inputform7ref}
												onFocus={(e) => e.target.select()}
												onChange={(e) => {
													const rawValue = e.target.value.replace(/,/g, "");
													const parsedValue = rawValue
														? parseInt(rawValue, 10)
														: "";

													if (!/^\d*$/.test(rawValue)) {
														toast.error("Please enter numbers only.", {
															autoClose: 3000,
														});
													} else if (parsedValue < 0) {
														toast.error("Amount cannot be negative.", {
															autoClose: 3000,
														});
													} else if (rawValue.length > 8) {
														toast.error("Code cannot exceed 8 characters.", {
															autoClose: 3000,
														});
													} else if (
														rawValue.length > 1 &&
														rawValue.startsWith("0")
													) {
														toast.error("Leading zeros are not allowed.", {
															autoClose: 3000,
														});
													} else {
														const formattedValue = parsedValue.toString();
														handleInputChange({
															target: {
																name: "inputform7",
																value: formattedValue,
															},
														});
														setAlertData(null);
													}

													setTimeout(() => {
														setAlertData(null);
													}, 2000);
												}}
												onKeyDown={(e) => handleEnterKeyPress(inputform8ref, e)}
											/>
										</div>

										<div className="col-sm-3 label-field">Sale:</div>
										<div className="col-sm-3 d-flex align-items-center">
											<Form.Control
												type="text"
												id="inputform8"
												placeholder="Sale Rate"
												name="inputform8"
												className={`form-control-field ${
													errors.inputform8 ? "border-red" : ""
												}`}
												value={formData.inputform8}
												ref={inputform8ref}
												style={{
													textAlign: "right",
												}}
												onFocus={(e) => e.target.select()}
												onChange={(e) => {
													const rawValue = e.target.value.replace(/,/g, "");
													const parsedValue = rawValue
														? parseInt(rawValue, 10)
														: "";

													if (!/^\d*$/.test(rawValue)) {
														toast.error("Please enter numbers only.", {
															autoClose: 3000,
														});
													} else if (parsedValue < 0) {
														toast.error("Amount cannot be negative.", {
															autoClose: 3000,
														});
													} else if (rawValue.length > 8) {
														toast.error("Code cannot exceed 8 characters.", {
															autoClose: 3000,
														});
													} else if (
														rawValue.length > 1 &&
														rawValue.startsWith("0")
													) {
														toast.error("Leading zeros are not allowed.", {
															autoClose: 3000,
														});
													} else {
														const formattedValue = parsedValue.toString();
														handleInputChange({
															target: {
																name: "inputform8",
																value: formattedValue,
															},
														});
														setAlertData(null);
													}

													setTimeout(() => {
														setAlertData(null);
													}, 2000);
												}}
												onKeyDown={(e) => handleEnterKeyPress(inputform9ref, e)}
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-3 label-field">Remarks:</div>
										<div className="col-sm-9 d-flex align-items-center">
											<Form.Control
												type="textarea"
												id="inputform9"
												placeholder="Remarks"
												name="inputform9"
												className={`form-control-field ${
													errors.inputform9 ? "border-red" : ""
												}`}
												value={formData.inputform9}
												ref={inputform9ref}
												onFocus={(e) => e.target.select()}
												onChange={(e) =>
													handleInputChange({
														target: {
															name: "inputform9",
															value: e.target.value,
														},
													})
												}
												onKeyDown={(e) => handleEnterKeyPress(Submit, e)}
											/>
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
						<TwoColumnModel
							isOpen={isModalOpen}
							handleClose={handleCloseModal}
							title="Select Item"
							technicians={getworkshopitemmaintenance}
							searchRef={SearchBox}
							handleRowClick={handleRowClick}
							firstColKey="titmcod"
							secondColKey="titmdsc"
							firstColWidth="100px"
							secondColWidth="450px"
							firstColAlign="center"
							secondColAlign="left"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Item_Maintenance;
