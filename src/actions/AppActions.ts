import { IAction } from './IAction';
import * as ActionType from './ActionTypes';
import 'react-toastify/dist/ReactToastify.css';

export const setLastUpdateTime = (lastUpdateTime: Time): IAction => ({
  type: ActionType.SetLastRenderTime,
  payload: {
    time: lastUpdateTime
  }
});
