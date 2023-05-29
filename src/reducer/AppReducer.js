import { PARAMS } from "yazz/constants/constants";

export const initialState = {
  isShowModalShareButton: false,
  isShowModalShareButtonUser: false,
  isShowModalShareButtonLink: false,
  dataModalShareButtonLink: {},
  isShowModalHistoryVisitors: false,
  isShowModalHistoryLinkClicks: false,
  dataModalHistoryLinkClicks: {},
  isLoadingPreview: false,
  isShowModalTourNavbar: false,
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
        dataModalShareButtonLink: action.data,
      };
    }
    case PARAMS.SET_MODAL_HISTORY_VISITORS: {
      return {
        ...state,
        isShowModalHistoryVisitors: action.value,
      };
    }
    case PARAMS.SET_MODAL_HISTORY_LINK_CLICKS: {
      return {
        ...state,
        isShowModalHistoryLinkClicks: action.value,
        dataModalHistoryLinkClicks: action.data,
      };
    }
    case PARAMS.SET_LOADING_PREVIEW: {
      return {
        ...state,
        isLoadingPreview: action.value,
      };
    }
    case PARAMS.SET_MODAL_TOUR_NAVBAR: {
      return {
        ...state,
        isShowModalTourNavbar: action.value,
      };
    }
  }
};
