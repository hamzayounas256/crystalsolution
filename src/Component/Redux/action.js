import {
	fetchDataMenu,
	fetchDataGetUser,
	fetchDataNewWorkShopItemMaintenance,
	fetchDataGetActiveWorkShopItemMaintenance,
	fetchDataGetWorkShopItemMaintenance,
} from "./api";

export const FETCH_MENU_REQUEST = "FETCH_MENU_REQUEST";
export const FETCH_MENU_SUCCESS = "FETCH_MENU_SUCCESS";
export const FETCH_MENU_FAILURE = "FETCH_MENU_FAILURE";

export const fetchMenu = (userId, code) => async (dispatch) => {
	dispatch({ type: FETCH_MENU_REQUEST });
	try {
		const data = await fetchDataMenu(userId, code);

		dispatch({ type: FETCH_MENU_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: FETCH_MENU_FAILURE, payload: error.message });
	}
};

export const FETCH_GETUSER_REQUEST = "FETCH_GETUSER_REQUEST";
export const FETCH_GETUSER_SUCCESS = "FETCH_GETUSER_SUCCESS";
export const FETCH_GETUSER_FAILURE = "FETCH_GETUSER_FAILURE";

export const fetchGetUser = (userId, code) => async (dispatch) => {
	dispatch({ type: FETCH_GETUSER_REQUEST });
	try {
		const data = await fetchDataGetUser(userId, code);

		dispatch({ type: FETCH_GETUSER_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: FETCH_GETUSER_FAILURE, payload: error.message });
	}
};

export const FETCH_GETWORKSHOPITEMMAINTENANCE_REQUEST =
	"FETCH_GETWORKSHOPITEMMAINTENANCE_REQUEST";
export const FETCH_GETWORKSHOPITEMMAINTENANCE_SUCCESS =
	"FETCH_GETWORKSHOPITEMMAINTENANCE_SUCCESS";
export const FETCH_GETWORKSHOPITEMMAINTENANCE_FAILURE =
	"FETCH_GETWORKSHOPITEMMAINTENANCE_FAILURE";

export const fetchGetWorkShopItemMaintenance = (code) => async (dispatch) => {
	dispatch({ type: FETCH_GETWORKSHOPITEMMAINTENANCE_REQUEST });
	try {
		const data = await fetchDataGetWorkShopItemMaintenance(code);
		dispatch({ type: FETCH_GETWORKSHOPITEMMAINTENANCE_SUCCESS, payload: data });
	} catch (error) {
		// console.error("Error fetching data:", error.message);
		dispatch({
			type: FETCH_GETWORKSHOPITEMMAINTENANCE_FAILURE,
			payload: error.message,
		});
	}
};

export const FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_REQUEST =
	"FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_REQUEST";
export const FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_SUCCESS =
	"FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_SUCCESS";
export const FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_FAILURE =
	"FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_FAILURE";

export const fetchGetActiveWorkShopItemMaintenance =
	(code) => async (dispatch) => {
		dispatch({ type: FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_REQUEST });
		try {
			const data = await fetchDataGetActiveWorkShopItemMaintenance(code);
			dispatch({
				type: FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			// console.error("Error fetching data:", error.message);
			dispatch({
				type: FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_FAILURE,
				payload: error.message,
			});
		}
	};

export const FETCH_NEWWORKSHOPITEMMAINTENANCE_REQUEST =
	"FETCH_NEWWORKSHOPITEMMAINTENANCE_REQUEST";
export const FETCH_NEWWORKSHOPITEMMAINTENANCE_SUCCESS =
	"FETCH_NEWWORKSHOPITEMMAINTENANCE_SUCCESS";
export const FETCH_NEWWORKSHOPITEMMAINTENANCE_FAILURE =
	"FETCH_NEWWORKSHOPITEMMAINTENANCE_FAILURE";

export const fetchNewWorkShopItemMaintenance = (code) => async (dispatch) => {
	dispatch({ type: FETCH_NEWWORKSHOPITEMMAINTENANCE_REQUEST });
	try {
		const data = await fetchDataNewWorkShopItemMaintenance(code);
		dispatch({ type: FETCH_NEWWORKSHOPITEMMAINTENANCE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: FETCH_NEWWORKSHOPITEMMAINTENANCE_FAILURE,
			payload: error.message,
		});
	}
};
