import { Base } from "../../../Main/Domain/Entities/Base";

export class User extends Base
{
    private _name: string;
    private _sub: string;
    private _email: string;
    private _picture: string;

    constructor(
        id: string,
        sub: string,
        name: string,
        email: string,
        picture: string,
        createdAt: Date,
        updatedAt: Date,
    )
    {
        super(id, createdAt, updatedAt);
        this._name = name;
        this._sub = sub;
        this._email = email;
        this._picture = picture;
    }

    get name(): string
    {
        return this._name;
    }

    get sub(): string
    {
        return this._sub;
    }

    get email(): string
    {
        return this._email;
    }

    get picture(): string
    {
        return this._picture;
    }
}