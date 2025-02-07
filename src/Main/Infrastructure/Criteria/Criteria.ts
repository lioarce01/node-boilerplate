import Filter, { FilterOperator } from "./Filter";
import Order from "./Order";
import Pagination from "./Pagination";

class Criteria
{
    constructor(
        public filters: Filter[] = [],
        public order?: Order,
        public pagination?: Pagination
    ) { }

    static fromQueryParams(query: any): Criteria
    {
        const filters: Filter[] = [];
        if (query.filter) {
            query.filter.forEach((f: string) =>
            {
                const [field, operator, value] = f.split(':');
                filters.push(new Filter(field, operator as FilterOperator, value));
            });
        }

        const order = query.order ? new Order(query.order.field, query.order.direction) : undefined;
        const pagination = query.limit && query.offset ? new Pagination(Number(query.limit), Number(query.offset)) : undefined;

        return new Criteria(filters, order, pagination);
    }

    toObject()
    {
        return {
            filters: this.filters.map(filter => filter.toObject()),
            order: this.order ? this.order.toObject() : undefined,
            pagination: this.pagination ? this.pagination.toObject() : undefined,
        };
    }
}

export default Criteria