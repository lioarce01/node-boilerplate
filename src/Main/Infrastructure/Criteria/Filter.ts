export type FilterOperator = 'EQUAL' | 'NOT_EQUAL' | 'GREATER_THAN' | 'LESS_THAN' | 'LIKE';

class Filter
{
    constructor(public field: string, public operator: FilterOperator, public value: any) { }

    toObject()
    {
        return { field: this.field, operator: this.operator, value: this.value };
    }
}

export default Filter