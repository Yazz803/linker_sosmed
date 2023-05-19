import { PARAMS } from "yazz/constants/constants";

export const initialState = {
  isShowModalShareButton: false,
  isShowModalShareButtonUser: false,
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
  }
};
