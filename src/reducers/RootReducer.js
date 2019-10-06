import { ActionConstant, NO_OF_ROW } from '../utils/Constants';

const initialState = {
  baseRow: [],
  baseColumn: [],

  totalChecked: 0
};

function initBoard(state) {

  let {baseRow, baseColumn} = {...state};

  for (let i = 0; i < NO_OF_ROW; i++) {
    baseColumn = baseColumn.concat(i);
    baseRow = baseRow.concat(i);
  }

  return {
    ...state,
    baseRow,
    baseColumn
  };
}

export default function rootReducer(state = initialState, action){

  switch (action.type) {
    case ActionConstant.INIT_BOARD:
      return initBoard(state);

     case ActionConstant.INC_TOTAL_CHECKED:
       return {
         ...state,
         totalChecked: state.totalChecked + 1
       };

     default :
       return state;
   }
}
