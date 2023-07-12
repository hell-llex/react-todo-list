export interface ITodoItem {
  text: string;
  title: string;
  done: boolean;
  id: number;
  rating: number;
}

export interface ITodoList {
  items: ITodoItem[];
}
