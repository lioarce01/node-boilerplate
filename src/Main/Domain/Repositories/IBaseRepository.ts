interface IBaseRepository<T>
{
    save(_element: T): Promise<T>;
    update(_idA: string, _elementId: string, _element: T): Promise<{ message: string; data: T }>;
    getOne(_id: string): Promise<T>;
    delete(_idA: string, _targetId: string): Promise<{ message: string }>;
    list(): Promise<T[]>;
}

export default IBaseRepository;
