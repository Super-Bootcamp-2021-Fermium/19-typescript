import { SERVICE_BASEURL } from './config';

export const initialState = {
  loading: false,
  error: null,
  summary: {
    total_task: 0,
    task_done: 0,
    task_cancelled: 0,
    total_worker: 0,
  },
};

export function loading(state) {
  state.loading = true;
  state.error = null;
}

export function error(state, action) {
  state.loading = false;
  state.error = action.payload;
}

export function summaryLoaded(state, action) {
  state.summary = action.payload;
  state.loading = false;
  state.error = null;
  return state;
}

