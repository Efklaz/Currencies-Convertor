export const SET_RATIO = "SET_RATIO";
export const SET_ACTIVE = 'SET_ACTIVE';
export const SET_VALUE = 'SET_VALUE';
export function setRation(payload: { value : number, from : boolean}){
    return {type: SET_RATIO, payload : payload }
}
export function setToValue(payload: { value : string, from : boolean}){
    return {type: SET_VALUE, payload : payload }
}
export function setActive(payload: { value : string, from : boolean}){
    return {type: SET_ACTIVE, payload: payload}
}