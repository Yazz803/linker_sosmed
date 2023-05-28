import { PARAMS } from "yazz/constants/constants";

export const initialState = {
  isShowModalShareButton: false,
  isShowModalShareButtonUser: false,
  isShowModalShareButtonLink: false,
  isShowModalHistoryVisitors: false,
  isLoadingPreview: false,
};

export const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case PARAMS.SET_MODAL_SHARE_BUTTON: {
      return {
        ...state,
        isShowModalShareButton: action.value,
      };
    }
    case PARAMS.SET_MODAL_SHARE_BUTTON_USER: {
      return {
        ...state,
        isShowModalShareButtonUser: action.value,
      };
    }
    case PARAMS.SET_MODAL_SHARE_BUTTON_LINK: {
      return {
        ...state,
        isShowModalShareButtonLink: action.value,
      };
    }
    case PARAMS.SET_MODAL_HISTORY_VISITORS: {
      return {
        ...state,
        isShowModalHistoryVisitors: action.value,
      };
    }
    case PARAMS.SET_LOADING_PREVIEW: {
      return {
        ...state,
        isLoadingPreview: action.value,
      };
    }
  }
};
