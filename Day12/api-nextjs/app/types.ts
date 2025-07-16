// types.ts
export type Task = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  description: string;
};

export type TaskApiResponse = {
  task: Task;
  timestamp: string;
  renderType: string;
};

export type TasksApiResponse = {
  tasks: Task[];
  timestamp: string;
  renderType: string;
};
