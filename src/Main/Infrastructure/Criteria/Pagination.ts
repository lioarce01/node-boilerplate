class Pagination
{
    constructor(public limit: number, public offset: number) { }

    toObject()
    {
        return { limit: this.limit, offset: this.offset };
    }
}

export default Pagination