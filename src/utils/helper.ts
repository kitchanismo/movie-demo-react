export function toElipse(str: string, end = 16) {
    const x = str.substring(0, end)
    const hasElipse = str.length > end ? '...' : ''
    return `${x} ${hasElipse}`
  }
  