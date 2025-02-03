interface IBaseRepository<T>
{
    save(element: T): Promise<T>
    update(idA: string, elementId: string, element: T): Promise<{ message: string, data: T }>
    getOne(id: string): Promise<T>
    delete(idA: string, targetId: string): Promise<{ message: string }>
    list(): Promise<T[]>
}

export default IBaseRepository