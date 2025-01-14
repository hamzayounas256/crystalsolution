import React, {
	useState,
	useEffect,
	useImperativeHandle,
	forwardRef,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
	Autocomplete,
	TextField,
	createFilterOptions,
	useTheme,
} from "@mui/material";
import { Clear, ArrowDropDown } from "@mui/icons-material"; // Import custom icons
import { isLoggedIn, getUserData, getOrganisationData } from "../../Auth";
import "./Dropdown.css"; // Ensure this file is updated with the new styles

const filterOptions = createFilterOptions();

const CustomDropdown = forwardRef(
	(
		{
			value,
			onChange,
			fetchUrl,
			valueKey,
			labelKey,
			placeholder,
			isClearable = false,
			styles = {},
			onKeyDown,
			width,
			postapi,
			postfisrt,
			postsecond,
			postthird,
			postfouth,
			postfifth,
			selectRef,
			className,
		},
		ref
	) => {
		const user = getUserData();
		const organisation = getOrganisationData();
		const [options, setOptions] = useState([]);
		const { getcolor, fontcolor } = useTheme();
		const [selectedOption, setSelectedOption] = useState(null);
		const [enterPressCount, setEnterPressCount] = useState(0);

		const fetchData = () => {
			const data = { code: organisation.code };
			const formData = new URLSearchParams(data).toString();

			axios
				.post(fetchUrl, formData, {
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
				})
				.then((response) => {
					const apiData = response.data;
					const formattedOptions = apiData.map((option) => ({
						value: option[valueKey],
						label: option[labelKey],
					}));

					// Sort options alphanumerically (A-Z)
					formattedOptions.sort((a, b) => a.label.localeCompare(b.label));

					setOptions(formattedOptions);

					const matchingOption = formattedOptions.find(
						(option) => option.value === value
					);
					if (matchingOption) setSelectedOption(matchingOption);
				})
				.catch((error) => console.error("Error:", error));
		};

		useEffect(
			() => fetchData(),
			[fetchUrl, valueKey, labelKey, value, user?.tusrid]
		);

		useImperativeHandle(ref, () => ({
			focus: () => selectRef?.current?.focus(),
			reset: () => {
				setSelectedOption(null);
				onChange(null);
			},
		}));

		const handleSelectChange = (event, newValue) => {
			setEnterPressCount(0);
			if (newValue) {
				if (newValue.inputValue) {
					handleSaveReference({
						label: newValue.inputValue,
						value: newValue.inputValue,
					});
				} else {
					setSelectedOption(newValue);
					onChange(newValue);
				}
			} else {
				setSelectedOption(null);
				onChange(null);
			}
		};

		const handleSaveReference = async (customOption) => {
			if (!customOption.label?.trim()) {
				alert("Please provide a valid option.");
				return;
			}

			try {
				const formData = new FormData();
				formData.append(postfisrt, "999");
				formData.append(postsecond, customOption.label);
				formData.append(postthird, "A");
				formData.append(postfouth, user.tusrid);
				formData.append(postfifth, organisation.code);

				const response = await axios.post(postapi, formData, {
					headers: { "Content-Type": "multipart/form-data" },
				});

				if (response.data.error === 200) fetchData();
				else console.error("API Error:", response.data.message);
			} catch (error) {
				console.error("Error submitting form:", error);
			}
		};

		const customStyles = {
			control: {
				backgroundColor: getcolor,
				color: fontcolor,
				height: "25px",
				width: width || "100%",
				fontSize: "11px",
				borderRadius: "0px",
				border:
					fontcolor === "black" ? "1px solid #F5F5F5" : "1px solid #F5F5F5",
				boxShadow: "none",
				transition: "all 0.3s ease",
				"&:hover": {
					border: "none",
				},
			},
			menu: {
				backgroundColor: getcolor,
				color: fontcolor,
				borderRadius: "8px",
				boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
				maxHeight: "200px",
				overflowY: "auto",
				// Scrollbar styling
				"&::-webkit-scrollbar": {
					width: "8px", // Width of the scrollbar
				},
				"&::-webkit-scrollbar-track": {
					backgroundColor: "#f1f1f1", // Color of the scrollbar track
					borderRadius: "4px", // Rounded corners for the track
				},
				"&::-webkit-scrollbar-thumb": {
					backgroundColor: "#888", // Color of the scrollbar thumb
					borderRadius: "4px", // Rounded corners for the thumb
				},
				"&::-webkit-scrollbar-thumb:hover": {
					backgroundColor: "#555", // Color of the thumb on hover
				},
			},
			option: {
				fontSize: "11px",
				backgroundColor: getcolor,
				color: fontcolor,
				padding: "8px 8px",
				"&:hover": {
					backgroundColor: getcolor,
				},
			},
			...styles,
		};

		const customFilterOptions = (options, params) => {
			const { inputValue } = params;
			const filtered = options.filter((option) =>
				option.label.toLowerCase().includes(inputValue.toLowerCase())
			);

			filtered.sort((a, b) => {
				const aStartsWith = a.label
					.toLowerCase()
					.startsWith(inputValue.toLowerCase());
				const bStartsWith = b.label
					.toLowerCase()
					.startsWith(inputValue.toLowerCase());

				if (aStartsWith && !bStartsWith) return -1;
				if (!aStartsWith && bStartsWith) return 1;
				return a.label.localeCompare(b.label);
			});

			if (
				inputValue !== "" &&
				!filtered.some((option) => option.label === inputValue)
			) {
				filtered.push({
					inputValue,
					label: `Add "${inputValue}"`,
				});
			}

			return filtered;
		};

		return (
			<Autocomplete
				className="form-control-field"
				value={selectedOption}
				onChange={handleSelectChange}
				options={options}
				filterOptions={customFilterOptions}
				getOptionLabel={(option) => option.label || ""}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder={placeholder || "Select an option"}
						inputRef={selectRef}
						autoComplete="off"
						InputProps={{
							...params.InputProps,
							style: customStyles.control,
							endAdornment: (
								<div style={{ display: "flex", alignItems: "center" }}>
									{isClearable && selectedOption && (
										<Clear
											onClick={() => handleSelectChange(null, null)}
											style={{
												cursor: "pointer",
												color: fontcolor,
												marginRight: "4px",
											}}
										/>
									)}
									<ArrowDropDown
										style={{ color: fontcolor, marginRight: "-50px" }}
									/>
								</div>
							),
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								if (enterPressCount === 0) setEnterPressCount(1);
								else if (enterPressCount === 1) {
									onKeyDown(e);
									setEnterPressCount(0);
								}
							}
						}}
						onChange={(e) => {
							const uppercaseValue = e.target.value.toUpperCase();
							e.target.value = uppercaseValue;
							params.inputProps.onChange(e);
						}}
					/>
				)}
				renderOption={(props, option, { selected }) => (
					<li
						{...props}
						style={{
							...customStyles.option,
							backgroundColor: selected
								? "black"
								: customStyles.option.backgroundColor, // Change background color for selected option
							color: selected ? "white" : customStyles.option.color, // Change text color for selected option
						}}
					>
						{option.label}
					</li>
				)}
				ListboxProps={{ style: customStyles.menu }} // Apply scrollbar styling here
			/>
		);
	}
);

CustomDropdown.propTypes = {
	value: PropTypes.any,
	onChange: PropTypes.func.isRequired,
	fetchUrl: PropTypes.string.isRequired,
	valueKey: PropTypes.string,
	labelKey: PropTypes.string,
	placeholder: PropTypes.string,
	isClearable: PropTypes.bool,
	styles: PropTypes.object,
	onKeyDown: PropTypes.func,
	width: PropTypes.string,
	postapi: PropTypes.string,
	postfisrt: PropTypes.string,
	postsecond: PropTypes.string,
	postthird: PropTypes.string,
	postfouth: PropTypes.string,
	selectRef: PropTypes.object,
	className: PropTypes.string,
};

export default CustomDropdown;

// import React, {
//   useState,
//   useEffect,
//   useImperativeHandle,
//   forwardRef,
// } from "react";
// import PropTypes from "prop-types";
// import "./Dropdown.css";
// import axios from "axios";
// import { Autocomplete, TextField, useTheme } from "@mui/material";
// import { getUserData, getOrganisationData } from "../../Auth";

// const CustomDropdown = forwardRef(
//   (
//     {
//       value,
//       onChange,
//       fetchUrl,
//       valueKey,
//       labelKey,
//       placeholder,
//       isClearable = false,
//       styles = {},
//       onKeyDown,
//       width,
//       selectRef,
//       className,
//     },
//     ref
//   ) => {
//     const user = getUserData();
//     const organisation = getOrganisationData();
//     const [options, setOptions] = useState([]);
//     const { getcolor, fontcolor } = useTheme();
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [inputValue, setInputValue] = useState("");
//     const [highlightedIndex, setHighlightedIndex] = useState(-1);

//     function fetchData() {
//       const data = {
//         code: organisation.code,
//       };

//       const formData = new URLSearchParams(data).toString();

//       axios
//         .post(fetchUrl, formData, {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         })
//         .then((response) => {
//           const apiData = response.data;
//           const formattedOptions = apiData.map((option) => ({
//             value: option[valueKey],
//             label: option[labelKey],
//           }));

//           // Sort options in A-Z order
//           formattedOptions.sort((a, b) => a.label.localeCompare(b.label));

//           setOptions(formattedOptions);

//           const matchingOption = formattedOptions.find(
//             (option) => option.value === value
//           );
//           if (matchingOption) {
//             setSelectedOption(matchingOption);
//           }
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     }

//     useEffect(() => {
//       fetchData();
//     }, [fetchUrl, valueKey, labelKey, value, user?.tusrid]);

//     useImperativeHandle(ref, () => ({
//       focus: () => {
//         if (selectRef?.current) {
//           selectRef.current.focus();
//         }
//       },
//       reset: () => {
//         setSelectedOption(null);
//         onChange(null);
//       },
//     }));

//     const handleSelectChange = (event, newValue) => {
//       setSelectedOption(newValue);
//       onChange(newValue);
//     };

//     const handleInputChange = (event) => {
//       const uppercaseValue = event.target.value.toUpperCase();
//       setInputValue(uppercaseValue);
//       setHighlightedIndex(0); // Reset highlighted index when input changes
//     };

//     const handleKeyDown = (event) => {
//       if (event.key === "Enter" && highlightedIndex !== -1) {
//         const selected = filteredOptions[highlightedIndex];
//         setSelectedOption(selected);
//         onChange(selected);
//         setInputValue(selected.label);
//       } else if (event.key === "ArrowDown") {
//         event.preventDefault();
//         setHighlightedIndex((prevIndex) =>
//           prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
//         );
//       } else if (event.key === "ArrowUp") {
//         event.preventDefault();
//         setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
//       }
//     };

//     const filterOptions = (options, inputValue) => {
//       if (!inputValue) return options;

//       return options.filter((option) =>
//         option.label.toUpperCase().includes(inputValue.toUpperCase())
//       );
//     };

//     const filteredOptions = filterOptions(options, inputValue);

//     const customStyles = {
//       control: {
//         backgroundColor: getcolor,
//         color: fontcolor,
//         height: "25px",
//         marginLeft: "-10px",
//         paddingLeft: "10px",
//         alignItems: "center",
//         width: width,
//         fontSize: "11px",
//         marginBottom: "2px",
//         borderRadius: 0,
//         border:
//           fontcolor === "black" ? "1px solid #F5F5F5" : "1px solid #F5F5F5",
//         transition: "border-color 0.15s ease-in-out",
//         "&:hover": {
//           borderColor: "rgb(79, 79, 255)",
//         },
//       },
//       input: {
//         backgroundColor: getcolor,
//         color: "black",
//         height: "100%",
//         fontSize: "11px",
//         padding: "0px",
//         alignItems: "center",
//         borderRadius: "4px",
//         "&:hover": {
//           borderColor: "rgb(79, 79, 255)",
//         },
//       },
//       dropdownIndicator: {
//         padding: "5px",
//       },
//       ...styles,
//     };

//     return (
//       <Autocomplete
//         value={selectedOption}
//         onFocus={() => {
//           fetchData();
//         }}
//         onBlur={() => {
//           setOptions([]);
//         }}
//         style={{ backgroundColor: getcolor, color: fontcolor }}
//         onChange={handleSelectChange}
//         options={filteredOptions}
//         isOptionEqualToValue={(option, value) => option.value === value?.value}
//         getOptionLabel={(option) => option.label}
//         renderInput={(params) => (
//           <TextField
//             style={{ backgroundColor: getcolor, color: fontcolor }}
//             {...params}
//             inputRef={selectRef}
//             onKeyDown={handleKeyDown}
//             placeholder={placeholder}
//             value={inputValue.toUpperCase()}
//             onChange={handleInputChange}
//             InputProps={{
//               ...params.InputProps,
//               style: customStyles.control,
//               inputProps: {
//                 ...params.inputProps,
//                 style: { textTransform: "uppercase" },
//               },
//             }}
//           />
//         )}
//         ListboxProps={{
//           style: {
//             fontSize: "11px",
//             maxHeight: "160px",
//             overflowY: "auto",
//             color: fontcolor,
//           },
//         }}
//         renderOption={(props, option, { selected }) => (
//           <li
//             {...props}
//             style={{
//               backgroundColor:
//                 highlightedIndex === options.indexOf(option)
//                   ? "#f0f0f0"
//                   : "white",
//               color: "black",
//             }}
//           >
//             {option.label}
//           </li>
//         )}
//       />
//     );
//   }
// );

// CustomDropdown.propTypes = {
//   value: PropTypes.any,
//   onChange: PropTypes.func.isRequired,
//   fetchUrl: PropTypes.string.isRequired,
//   valueKey: PropTypes.string,
//   labelKey: PropTypes.string,
//   placeholder: PropTypes.string,
//   isClearable: PropTypes.bool,
//   styles: PropTypes.object,
//   onKeyDown: PropTypes.func,
//   width: PropTypes.string,
//   selectRef: PropTypes.object,
//   className: PropTypes.string,
// };

// export default CustomDropdown;
