class Order
{
    constructor(public field: string, public direction: "ASC" | "DESC") { }

    toObject()
    {
        return { field: this.field, direction: this.direction };
    }
}

export default Order