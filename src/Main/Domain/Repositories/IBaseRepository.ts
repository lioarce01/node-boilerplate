interface IBaseRepository<T>
{
    save(element: T): Promise<T>
    update(id: string, elementId: string, element: T): Promise<{ message: string, data: T }>
    getOne(id: string): Promise<T>
    delete(id: string): Promise<{ message: string }>
    list(): Promise<T[]>
}

export default IBaseRepository