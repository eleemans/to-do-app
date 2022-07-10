export class TodoItem {
    id: number;
    name: string;
    checked: boolean;

    constructor(init?: Partial<TodoItem>) {
        Object.assign(this, init);
    }
}