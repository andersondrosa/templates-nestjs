// cache.service.ts
import { Injectable, Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getOrSetCache<T>(
    key: string,
    fallback: () => Promise<T>,
    options: { ttl?: number; compress?: boolean } = {}
  ): Promise<T> {
    let cachedData = await this.cacheManager.get<string | T>(key);

    if (cachedData) return cachedData as T;

    const data = await fallback();

    // const cacheData = options.compress
    //   ? zlib.gzipSync(JSON.stringify(data)).toString("base64")
    //   : data;

    // await this.cacheManager.set(key, cacheData, { ttl: options.ttl });

    return data;
  }

  /**
   * Define manualmente o valor de um cache.
   * @param key Chave do cache
   * @param value Valor a ser armazenado
   * @param options Opções como TTL e compressão
   */
  async setCache<T>(
    key: string,
    value: T,
    options: { ttl?: number; compress?: boolean } = {}
  ): Promise<void> {
    // const cacheData = options.compress
    //   ? zlib.gzipSync(JSON.stringify(value)).toString("base64")
    //   : value;
    // await this.cacheManager.set(key, cacheData, { ttl: options.ttl });
  }

  async clearCache(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async clearAllCache(): Promise<void> {
    await this.cacheManager.reset();
  }
}
