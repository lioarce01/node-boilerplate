import Criteria from "@Main/Infrastructure/Criteria/Criteria";

interface IBaseRepository<T>
{
    save(_element: T): Promise<T>;
    update(_idA: string, _element: T): Promise<T>;
    getOne(_id: string): Promise<T>;
    delete(_idA: string, _targetId: string): Promise<{ message: string }>;
    list(criteria: Criteria): Promise<T[]>;
}

export default IBaseRepository;
