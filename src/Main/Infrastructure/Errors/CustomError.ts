export class CustomError extends Error
{
    constructor(
        public code: number,
        public status: string,
        public message: string
    )
    {
        super(message)
    }
}