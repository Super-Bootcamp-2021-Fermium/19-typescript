import { SERVICE_BASEURL } from './config'

export interface Task {
  loading: boolean;
  id?: number;
  job?: string;
  done?: boolean;
  assignee?: any;
  attachment?: any;
  error: any;
  workers: [];
  tasks: [];
}

interface ActionObject {
  type: string;
}

interface ActionObjectAdd extends ActionObject {
  payload: Task;
}

interface ActionObjectError extends ActionObject {
  payload: any;
}

interface ActionObjectDone extends ActionObject {
  payload: number;
}

type ActionObjectLoadTask = {
  payload: Task[]
};

type ActionObjectCanceled = ActionObjectDone;
type ActionObjectTaskLoaded = ActionObjectError;
type ActionObjectWorkerLoaded = ActionObjectError;

// setup state
export const initialState: Task[] = [
  {
    loading: false,
    error: null,
    workers: [],
    tasks: [],
  }
];

export function loading(state: Task) {
  state.loading = true;
  state.error = null;
}

export function error(state: Task, action: ActionObjectError) {
  state.loading = false;
  state.error = action?.payload;
}

export function clearError(state: Task) {
  state.error = null;
}

export function added(state: Task, action: ActionObjectAdd) {
  const task = action?.payload;
  state.tasks.push({
    id: task.id,
    job: task.job,
    assignee: task.assignee.name,
    attachment: `${SERVICE_BASEURL}/attachment/${task.attachment}`,
    done: false,
  });
  state.loading = false;
  state.error = null;
  return state;
}

export function done(state: Task, action: ActionObjectDone) {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks[idx].done = true;
  state.loading = false;
  state.error = null;
  return state;
}

export function canceled(state: Task, action: ActionObjectCanceled) {
  const idx = state.tasks.findIndex((t) => t.id === action.payload);
  state.tasks.splice(idx, 1);
  state.loading = false;
  state.error = null;
  return state;
}

export function tasksLoaded(state: Task, action: ActionObjectTaskLoaded) {
  state.tasks = action.payload
    .filter((t) => !t.cancelled)
    .map((task) => ({
      id: task.id,
      job: task.job,
      assignee: task.assignee.name,
      attachment: `${SERVICE_BASEURL}/attachment/${task.attachment}`,
      done: task.done,
    }));
  state.loading = false;
  state.error = null;
  return state;
}

export function workersLoaded(state: Task, action: ActionObjectWorkerLoaded) {
  state.workers = action.payload.map((worker) => ({
    id: worker.id,
    name: worker.name,
  }));
  state.loading = false;
  state.error = null;
  return state;
}
