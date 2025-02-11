import ICacheRepository from '@Cache/Domain/Repositories/ICacheRepository';
import redisConfig from '@Shared/Config/redisConfig';
import { createClient, RedisClientType } from 'redis';
import { injectable } from 'tsyringe';


@injectable()
class RedisCacheRepository implements ICacheRepository
{
  private client: RedisClientType;

  constructor()
  {
    this.client = createClient({
      username: redisConfig.username,
      password: redisConfig.password,
      socket: {
        host: redisConfig.url,
        port: redisConfig.port,
      },
    });

    this.client
      .connect()
      .then(() => console.log('Redis connected'))
      .catch((err) => console.error('Redis connection error:', err));
  }

  async get(key: string): Promise<string | null>
  {
    return await this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void>
  {
    await this.client.set(key, value);
    if (ttl) {
      await this.client.expire(key, ttl);
    }
  }

  async del(key: string): Promise<void>
  {
    await this.client.del(key);
  }

  async exists(key: string): Promise<boolean>
  {
    const result = await this.client.exists(key);
    return result === 1;
  }

  /**
     * Scans Redis for keys matching a pattern.
     * @param cursor Current cursor position.
     * @param pattern Pattern to match (e.g., 'posts:*').
     * @returns A tuple with the next cursor position and the keys found.
     */
  async scan(cursor: number, pattern: string): Promise<[string, string[]]>
  {
    const result = await this.client.scan(cursor, { MATCH: pattern });
    return [result.cursor.toString(), result.keys];
  }
}

export default RedisCacheRepository;
