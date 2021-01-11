import { Status } from './status';

export interface APIResponse<T> {
  status: Status;
  message?: string;
  items?: T;
  sum?: number;
}
