import { Request } from 'express'

export interface RequestWithAuth extends Request {
  user_id?: number
}