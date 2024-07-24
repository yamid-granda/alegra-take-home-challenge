interface IAddInLocalStorageConfig {
  key: string
  value: string | number | boolean | object | undefined | null
}

export function saveInLocalStorage({
  key,
  value,
}: IAddInLocalStorageConfig) {
  const config = {
    string: () => value as string,
    number: () => String(value),
    bigint: () => String(value),
    boolean: () => String(value),
    object: () => JSON.stringify(value),
    undefined: () => '',
    null: () => '',
    symbol: () => { throw new Error('Symbol cannot be saved in localStorage') },
    function: () => { throw new Error('Function cannot be saved in localStorage') },
  }

  const stringValue: string = config[typeof value]()
  localStorage.setItem(key, stringValue)
}
