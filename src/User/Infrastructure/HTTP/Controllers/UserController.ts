import { FastifyRequest, FastifyReply } from "fastify";
import { inject, injectable } from "tsyringe"
import ListUsersUseCase from "../../../Application/UseCases/List";
import GetOneUserUseCase from "../../../Application/UseCases/GetOne";
import GetBySubUseCase from "../../../Application/UseCases/GetBySub";
import UpdateUserUseCase from "../../../Application/UseCases/Update";
import DeleteUserUseCase from "../../../Application/UseCases/Delete";
import { UsecaseToken } from "../../../../Shared/DI/Tokens/DITokens";
import { User } from "../../../Domain/Entities/User";
import { ApiResponse } from "../../../../Main/Infrastructure/Utils/APIResponse";


@injectable()
class UserController
{
    constructor(
        @inject(UsecaseToken.User.ListUsers) private listUsersUseCase: ListUsersUseCase,
        @inject(UsecaseToken.User.GetOneUser) private getOneUseCase: GetOneUserUseCase,
        @inject(UsecaseToken.User.GetOneBySub) private getBySubUseCase: GetBySubUseCase,
        @inject(UsecaseToken.User.UpdateUser) private updateUserUseCase: UpdateUserUseCase,
        @inject(UsecaseToken.User.DeleteUser) private deleteUserUseCase: DeleteUserUseCase
    ) { }

    async listUsers(req: FastifyRequest, res: FastifyReply)
    {
        try {
            const users = await this.listUsersUseCase.execute()
            const response: ApiResponse<User[]> = {
                code: 200,
                status: "SUCCESS",
                data: users
            };

            res.status(200).send(response)

        } catch (e) {
            console.error("Error en listUsers:", e)
            const errResponse: ApiResponse<null> = {
                code: 500,
                status: "ERROR",
                error: "Internal Server Error"
            }
            res.status(500).send(errResponse)
        }
    }
}

export default UserController