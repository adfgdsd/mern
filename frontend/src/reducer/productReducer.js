import {
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETALSE_FAIL,
  PRODUCT_DETALSE_SUCCESS,
  PRODUCT_DETALSE_REQUEST,
  NEW_REVIRES_REQUEST,
  NEW_REVIRES_REQUEST_SUCCESS,
  NEW_REVIRES_REQUEST_FAIL,
  NEW_REVIRES_REQUEST_RESET,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  ALL_REVIEWS_REQUEST,
  ALL_REVIEWS_SUCCESS,
  ALL_REVIEWS_FAIL,
  DELETE_REVIEWS_REQUEST,
  DELETE_REVIEWS_SUCCESS,
  DELETE_REVIEWS_FAIL,
  DELETE_REVIEWS_RESET,
  CLEAR_ERROR,
} from "../constents/productConstents";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        product: [],
      };

    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productCount,
        resultParPage: action.payload.resultParPage,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Product Reducer (**ADMIN**)

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: "success : false",
      };
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// admin create new product reducer

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: "true",
        product: action.payload.product,
      };

    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };
    case NEW_PRODUCT_FAIL:
      return {
        loading: false,
        error: "error",
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const AdminproductReducer = (state = { Adminproduct: [] }, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        product: [],
      };

    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const productDetalseReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETALSE_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case PRODUCT_DETALSE_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        productsCount: action.payload.productsCount,
        resultParPage: action.payload.resultParPage,
      };

    case PRODUCT_DETALSE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Review Reducer

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIRES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_REVIRES_REQUEST_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case NEW_REVIRES_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIRES_REQUEST_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const reviewsDetalseReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case ALL_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case ALL_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        reviews:null,
        error: "some thing is rong",
      };

    case CLEAR_ERROR:
      return {
        ...state,
        reviews:null,
        error: null,
      };

    default:
      return state;
  }
};




// Review Reducer

export const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_REVIEWS_SUCCESS:
      return {
        loading: false,
        success: "product review delete",
      };

    case DELETE_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: "something is rong",
      };
    case DELETE_REVIEWS_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
