import {
    SET_RATIO,
    SET_VALUE,
    SET_ACTIVE,
} from '../actions/actionCreators';
export interface IAction{
    type: string;
    payload?: {value : number | string | boolean | string[], from : boolean};
}
export interface IPayload{
    to : string;
    from: string;
    amount: number;
    fromBlock: 'from' | 'to';
}
interface IState {
    fromBlock : IBlock;
    toBlock: IBlock;
    error: boolean | null;
    loading: boolean;
}
interface IBlock {
    currencies: string[]
    ratio : number ;
    value: string ;
    active: string ;
    tableOpen: boolean;

}
const initialState:IState = {
    fromBlock: {
        ratio : 1,
        value: '0',
        active: 'USD',
        tableOpen: false,
        currencies : ['USD', 'EUR', 'RUB', 'GBP']
        },
    toBlock: {
        ratio : 1,
        value: '0',
        active: 'RUB',
        tableOpen: false,
        currencies : ['USD', 'EUR', 'RUB', 'GBP']
    },
    loading : false,
    error: null
}

export const SET_CURRENCIES = 'SET_CURRENCIES';
export const TOGGLE_TABLE = 'TOGGLE_TABLE';
export const currenciesReducer = (state = initialState,
                                  action: IAction): IState=>{
    switch(action.type){
        case SET_CURRENCIES:
            return action.payload?.from  ? {...state, fromBlock : {...state.fromBlock, currencies: action.payload?.value as string[]}} :
                {...state, toBlock : {...state.toBlock, currencies: action.payload?.value as string[]}};
        case TOGGLE_TABLE:
            return action.payload?.from  ? {...state, fromBlock : {...state.fromBlock, tableOpen: action.payload.value as boolean}} :
                {...state, toBlock : {...state.toBlock, tableOpen: action.payload?.value as boolean}};
        case SET_RATIO:
            return action.payload?.from  ? {...state, fromBlock : {...state.fromBlock, ratio: action.payload.value as number}} :
                {...state, toBlock : {...state.toBlock, ratio: action.payload?.value as number}};
        case SET_ACTIVE:
            return action.payload?.from  ? {...state, fromBlock : {...state.fromBlock, active: action.payload.value as string}} :
                {...state, toBlock : {...state.toBlock, active: action.payload?.value as string}};
        case SET_VALUE:
            return action.payload?.from  ? {...state, fromBlock : {...state.fromBlock, value: action.payload.value as string}} :
                {...state, toBlock : {...state.toBlock, value: action.payload?.value as string}};
        default:
            return state;
    }

}