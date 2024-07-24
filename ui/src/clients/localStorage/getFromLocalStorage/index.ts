interface IGetFromLocalStorageConfig {
  key: string
}

export function getFromLocalStorage<T = string>({ key }: IGetFromLocalStorageConfig): T | null {
  const value = localStorage.getItem(key)

  if (value === null)
    return null

  try {
    return JSON.parse(value) as T
  }

  catch {
    return value as T
  }
}
