import { PARAMS } from "yazz/constants/constants";

export const initialState = {
  isShowModalShareButton: false,
};

export const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case PARAMS.SET_MODAL_SHARE_BUTTON: {
      return {
        ...state,
        isShowModalShareButton: action.value,
      };
    }
  }
};
