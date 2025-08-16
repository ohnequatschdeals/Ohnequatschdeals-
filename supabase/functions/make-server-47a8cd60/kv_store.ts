// supabase/functions/make-server-47a8cd60/kv_store.ts
type KVValue = unknown;

const store = new Map<string, KVValue>();

export async function set(key: string, value: KVValue) {
  store.set(key, value);
}

export async function get<T = any>(key: string): Promise<T | null> {
  return (store.get(key) as T) ?? null;
}

export async function getByPrefix<T = any>(prefix: string): Promise<{ key: string; value: T }[]> {
  const out: { key: string; value: T }[] = [];
  for (const [k, v] of store.entries()) {
    if (k.startsWith(prefix)) out.push({ key: k, value: v as T });
  }
  return out;
}