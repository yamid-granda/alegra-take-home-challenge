interface IDeleteFromLocalStorageConfig {
  key: string
}

export function deleteFromLocalStorage({ key }: IDeleteFromLocalStorageConfig): void {
  localStorage.removeItem(key)
}
