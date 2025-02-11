import ICacheRepository from "@Cache/Domain/Repositories/ICacheRepository";
import { RepoToken } from "@Shared/DI/Tokens/DITokens";
import "reflect-metadata"
import { injectable, inject } from "tsyringe";


@injectable()
class CacheService
{
    constructor(
        @inject(RepoToken.CacheRepository) private cacheRepository: ICacheRepository
    )
    { }

    async invalidateKeys(pattern: string): Promise<void>
    {
        const keys = await this.getKeysByPattern(pattern);
        for (const key of keys) {
            await this.cacheRepository.del(key);
        }
    }

    private async getKeysByPattern(pattern: string): Promise<string[]>
    {
        const matchingKeys: string[] = [];
        let cursor = 0;

        do {
            const [nextCursor, keys] = await this.cacheRepository.scan(
                cursor,
                pattern,
            );
            cursor = parseInt(nextCursor, 10);
            matchingKeys.push(...keys);
        } while (cursor !== 0);

        return matchingKeys;
    }
}

export default CacheService