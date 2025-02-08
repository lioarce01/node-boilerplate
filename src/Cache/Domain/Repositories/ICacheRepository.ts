interface ICacheRepository
{
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttl?: number): Promise<void>;
    del(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    scan(cursor: number, pattern: string): Promise<[string, string[]]>;
}

export default ICacheRepository;
