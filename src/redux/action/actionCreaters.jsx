import * as ActionTypes from './actionTypes.jsx';

const getDefaultType = value => ({ type: ActionTypes.DEFAULT_TYPE, payload: { value } });

export const defaultAction = () => dispatch => {
    dispatch(getDefaultType('react + webpack template'));
}