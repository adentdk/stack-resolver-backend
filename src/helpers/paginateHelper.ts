export interface Pagination {
  page: number
  pageSize: number
  numberOfPages: number
  numberOfRows: number
}

export function getOffset (page: number, perPage: number) {
  return (page - 1) * perPage
}