import IBaseRepository from "../../../Main/Domain/Repositories/IBaseRepository";
import { User } from "../Entities/User";

interface IUserRepository extends IBaseRepository<User>
{
    //more methods to user
    getBySub(sub: string): Promise<User>
    update(authId: string, targetId: string, data: User): Promise<{ message: string, data: User }>
}

export default IUserRepository