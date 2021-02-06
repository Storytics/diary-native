export interface State {
  bold?: boolean;
  underline?: boolean;
  italic?: boolean;
  insertUnorderedList?: boolean;
  insertOrderedList?: boolean;
  justifyLeft?: boolean;
  justifyCenter?: boolean;
  justifyFull?: boolean;
  justifyRight?: boolean;
}

export interface Props extends State {
  onToolPress: (event: string, customJS?: boolean) => void;
}

export const initialState = {
  bold: false,
  underline: false,
  italic: false,
  insertUnorderedList: false,
  insertOrderedList: false,
  justifyLeft: false,
  justifyCenter: false,
  justifyFull: false,
  justifyRight: false,
};

export type SetBoldAction = {
  type: "bold";
  payload: {
    active: boolean;
  };
};

export type SetUnderlineAction = {
  type: "underline";
  payload: {
    active: boolean;
  };
};

export type SetItalicAction = {
  type: "italic";
  payload: {
    active: boolean;
  };
};

export type SetInsertUnorderedListAction = {
  type: "insertUnorderedList";
  payload: {
    active: boolean;
  };
};

export type SetInsertOrderedListAction = {
  type: "insertOrderedList";
  payload: {
    active: boolean;
  };
};

export type SetJustifyLeftAction = {
  type: "justifyLeft";
  payload: {
    active: boolean;
  };
};

export type SetJustifyCenterAction = {
  type: "justifyCenter";
  payload: {
    active: boolean;
  };
};

export type SetJustifyFullAction = {
  type: "justifyFull";
  payload: {
    active: boolean;
  };
};

export type SetJustifyRightAction = {
  type: "justifyRight";
  payload: {
    active: boolean;
  };
};

export type ReducerActions =
  | SetBoldAction
  | SetUnderlineAction
  | SetItalicAction
  | SetInsertUnorderedListAction
  | SetInsertOrderedListAction
  | SetJustifyLeftAction
  | SetJustifyCenterAction
  | SetJustifyFullAction
  | SetJustifyRightAction;

export const reducer = (state: State, action: ReducerActions): State => {
  switch (action.type) {
    case "bold":
      return { ...state, bold: action.payload.active };
    case "underline":
      return { ...state, underline: action.payload.active };
    case "italic":
      return { ...state, italic: action.payload.active };
    case "insertUnorderedList":
      return { ...state, insertUnorderedList: action.payload.active };
    case "insertOrderedList":
      return { ...state, insertOrderedList: action.payload.active };
    case "justifyLeft":
      return {
        ...state,
        justifyLeft: action.payload.active,
        justifyCenter: false,
        justifyRight: false,
        justifyFull: false,
      };
    case "justifyCenter":
      return {
        ...state,
        justifyCenter: action.payload.active,
        justifyLeft: false,
        justifyRight: false,
        justifyFull: false,
      };
    case "justifyFull":
      return {
        ...state,
        justifyFull: action.payload.active,
        justifyCenter: false,
        justifyLeft: false,
        justifyRight: false,
      };
    case "justifyRight":
      return {
        ...state,
        justifyRight: action.payload.active,
        justifyCenter: false,
        justifyLeft: false,
        justifyFull: false,
      };
    default:
      return state;
  }
};
