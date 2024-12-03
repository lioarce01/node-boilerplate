import { NextFunction, Request, Response } from "express";
import { GetAllUsers } from "../../../Application/UseCases/User/GetAllUsers";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserController {
  constructor(@inject(GetAllUsers) private getAllUsersUseCase: GetAllUsers) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { offset, limit } = req.query;

      const parsedOffset =
        typeof offset === "string" && offset.trim() !== ""
          ? Number(offset)
          : undefined;
      const parsedLimit =
        typeof limit === "string" && limit.trim() !== ""
          ? Number(limit)
          : undefined;

      const users = await this.getAllUsersUseCase.execute(
        parsedOffset,
        parsedLimit,
      );

      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }
}
