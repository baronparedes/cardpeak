import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../reducers'
import { TRANSACTION_ACTIONS } from '../../constants/actions'
import * as transactionsController from '../api/transactionsController'
import { getAgentPayoutStart } from '../actions/agentPayoutActions'

export const getTransactions = createAction(TRANSACTION_ACTIONS.GET_TRANSACTION);
export const getTransactionsComplete = createAction<CardPeak.Entities.ApprovalTransaction[]>(TRANSACTION_ACTIONS.GET_TRANSACTION_COMPLETE);
export const getTransactionsError = createAction(TRANSACTION_ACTIONS.GET_TRANSACTION_ERROR);

export function deleteTransaciton(id: number,
    deleteComplete: (id: number) => void,
    deleteError: (error: string) => void) {
    return (dispatch: (e: any) => void) => {
        transactionsController.deleteTransaciton(id,
            (data: number) => {
                deleteComplete(data);
                dispatch(getAgentPayoutStart());
            },
            (e: string) => {
                deleteError(e);
            });
    }
}

export function getTransactionsByClientStart(client: string,
    successCallback: (data: CardPeak.Entities.ApprovalTransaction[]) => void,
    errorCallback?: (e: string) => void) {

    return (dispatch: (e: any) => void) => {
        dispatch(getTransactions());
        transactionsController.getTransactionsByClient(client, (data: CardPeak.Entities.ApprovalTransaction[]) => {
            dispatch(getTransactionsComplete(data));
            successCallback(data);
        }, (error: string) => {
            dispatch(getTransactionsError());
            if (errorCallback) {
                errorCallback(error);
            }
        });
    }
}

export function getTransactionsByBatchStart(batchId: number,
    successCallback: (data: CardPeak.Entities.ApprovalTransaction[]) => void,
    errorCallback?: (e: string) => void) {

    return (dispatch: (e: any) => void) => {
        dispatch(getTransactions());
        transactionsController.getTransactionsByBatch(batchId, (data: CardPeak.Entities.ApprovalTransaction[]) => {
            dispatch(getTransactionsComplete(data));
            successCallback(data);
        }, (error: string) => {
            dispatch(getTransactionsError());
            if (errorCallback) {
                errorCallback(error);
            }
        });
    }
}