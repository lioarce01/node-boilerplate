
interface IAIService
{
    sendMessage(message: string): Promise<{ message: string }>
}

export default IAIService