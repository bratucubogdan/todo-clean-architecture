export interface TodoProps {
  title: string;
  completed: boolean;
  ownerId: string | undefined;
}

export class TodoEntity {
  constructor(public props: TodoProps, public id?: string) {}
}
