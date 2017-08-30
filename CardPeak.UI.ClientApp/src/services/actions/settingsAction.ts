import { createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk'
import { SETTINGS_ACTIONS } from '../../constants/actions'
import { RootState } from '../reducers'
import * as ratesController from '../api/ratesController'