export interface Pagination {
  page: number
  pageSize: number
  totalPage: number
  totalItem: number
}

export function getOffset (page: number, perPage: number) {
  return (page - 1) * perPage
}