export type Todo = { id: string; props: { title: string; completed: boolean; ownerId: string } } | { _id?: string; id?: string; title: string; completed: boolean; ownerId: string };
