import redis
import json
class CacheServer:
    def __init__(self):
        self.cache = redis.StrictRedis(host='localhost', port=6379, db=0)

    def check_cache(self, key):
        if self.cache.get(key) is None:
            return None
        return json.loads(self.cache.get(key))
    
    def add_cache(self, key, value):
        if isinstance(value, str) or isinstance(value, bytes) or isinstance(value, int) or isinstance(value, float):
            self.cache.set(key, value)
        elif isinstance(value, dict):
            self.cache.set(key, json.dumps(value))
        else:
            raise ValueError("Value must be a string, bytes, int, float, or dict.")