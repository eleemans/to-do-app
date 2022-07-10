export class TodoItem {
    id: number;
    title: string;
    checked: boolean;

    constructor(init?: Partial<TodoItem>) {
        Object.assign(this, init);
    }
}