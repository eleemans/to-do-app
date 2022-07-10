export class TodoItem {
    id: string;
    name: string;
    checked: boolean;

    constructor(init?: Partial<TodoItem>) {
        Object.assign(this, init);
    }
}