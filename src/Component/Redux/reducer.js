import { combineReducers } from "redux";
import {
	FETCH_MENU_REQUEST,
	FETCH_MENU_SUCCESS,
	FETCH_MENU_FAILURE,
	FETCH_GETUSER_REQUEST,
	FETCH_GETUSER_SUCCESS,
	FETCH_GETUSER_FAILURE,
	FETCH_NEWWORKSHOPITEMMAINTENANCE_FAILURE,
	FETCH_NEWWORKSHOPITEMMAINTENANCE_SUCCESS,
	FETCH_NEWWORKSHOPITEMMAINTENANCE_REQUEST,
	FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_FAILURE,
	FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_REQUEST,
	FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_SUCCESS,
	FETCH_GETWORKSHOPITEMMAINTENANCE_FAILURE,
	FETCH_GETWORKSHOPITEMMAINTENANCE_SUCCESS,
	FETCH_GETWORKSHOPITEMMAINTENANCE_REQUEST,
} from "./action";

const menuReducer = (
	state = { loading: false, data: [], error: null },
	{ type, payload }
) => {
	switch (type) {
		case FETCH_MENU_REQUEST:
			return { ...state, loading: true, error: null };
		case FETCH_MENU_SUCCESS:
			return {
				...state,
				loading: false,
				data: Array.isArray(payload) ? payload : [],
				error: null,
			};
		case FETCH_MENU_FAILURE:
			return { ...state, loading: false, error: payload };
		default:
			return state;
	}
};

const GetUser = (
	state = { loading: false, data: [], error: null },
	{ type, payload }
) => {
	switch (type) {
		case FETCH_GETUSER_REQUEST:
			return { ...state, loading: true, error: null };
		case FETCH_GETUSER_SUCCESS:
			return {
				...state,
				loading: false,
				data: Array.isArray(payload) ? payload : [],
				error: null,
			};
		case FETCH_GETUSER_FAILURE:
			return { ...state, loading: false, error: payload };
		default:
			return state;
	}
};

const GetWorkShopItemMaintenance = (
	state = { loading: false, data: [], error: null },
	{ type, payload }
) => {
	switch (type) {
		case FETCH_GETWORKSHOPITEMMAINTENANCE_REQUEST:
			return { ...state, loading: true, error: null };
		case FETCH_GETWORKSHOPITEMMAINTENANCE_SUCCESS:
			return {
				...state,
				loading: false,
				data: Array.isArray(payload) ? payload : [],
				error: null,
			};
		case FETCH_GETWORKSHOPITEMMAINTENANCE_FAILURE:
			return { ...state, loading: false, error: payload };
		default:
			return state;
	}
};

const GetActiveWorkShopItemMaintenance = (
	state = { loading: false, data: [], error: null },
	{ type, payload }
) => {
	switch (type) {
		case FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_REQUEST:
			return { ...state, loading: true, error: null };
		case FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_SUCCESS:
			return {
				...state,
				loading: false,
				data: Array.isArray(payload) ? payload : [],
				error: null,
			};
		case FETCH_GETACTIVEWORKSHOPITEMMAINTENANCE_FAILURE:
			return { ...state, loading: false, error: payload };
		default:
			return state;
	}
};

const NewWorkShopItemMaintenance = (
	state = { loading: false, data: [], error: null },
	{ type, payload }
) => {
	switch (type) {
		case FETCH_NEWWORKSHOPITEMMAINTENANCE_REQUEST:
			return { ...state, loading: true, error: null };
		case FETCH_NEWWORKSHOPITEMMAINTENANCE_SUCCESS:
			return {
				...state,
				loading: false,
				data: Array.isArray(payload) ? payload : [],
				error: null,
			};
		case FETCH_NEWWORKSHOPITEMMAINTENANCE_FAILURE:
			return { ...state, loading: false, error: payload };
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	item: menuReducer,
	getuser: GetUser,
	getworkshopitemmaintenance: GetWorkShopItemMaintenance,
	getactiveworkshopitemmaintenance: GetActiveWorkShopItemMaintenance,
	newworkshopitemmaintenance: NewWorkShopItemMaintenance,
});

export default rootReducer;
