import { combineReducers, Reducer } from 'redux';
import dashboard from './dashboardReducer';

export interface RootState {
    dashboard: CardPeak.Models.DashboardModel;
}

export default combineReducers<RootState>({
    dashboard
});
