import IBaseRepository from "../../../Main/Domain/Repositories/IBaseRepository";
import { User } from "../Entities/User";

interface IUserRepository extends IBaseRepository<User>
{
    //more methods to user
    getBySub(sub: string): Promise<User>
}

export default IUserRepository