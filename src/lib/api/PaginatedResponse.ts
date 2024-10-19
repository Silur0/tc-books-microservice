export class PaginatedResponse<T> {
    page: number;
    count: number;
    total: number;
    items: T[];

    constructor({
        page,
        count,
        total,
        items,
    }: {
        page: number;
        count: number;
        total: number;
        items: T[];
    }) {
        this.page = page;
        this.count = count;
        this.total = total;
        this.items = items;
    }
}
