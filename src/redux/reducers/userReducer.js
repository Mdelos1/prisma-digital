import { userTypes } from "../types/userTypes";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case userTypes.USER_SIGNPHONE:
      return {
        ...action.payload,
      };
    case userTypes.USER_AUTHENTICATION:
      return {
        ...state,
        authentication: true,
      };
    case userTypes.USER_REGISTER:
      return {
        ...state,
        ...action.payload,
      };

    case userTypes.USER_LOGIN:
      return {
        ...state,
        ...action.payload,
      };
      case userTypes.USER_LOGOUT:
        return{
            
        }

    default:
      return state;
  }
};
