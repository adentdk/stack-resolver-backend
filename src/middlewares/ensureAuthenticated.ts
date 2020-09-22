import { NextFunction, Response } from 'express'
import { UNAUTHORIZED } from 'http-status-codes'
import { decodeToken } from '../helpers/authHelpers'
import { RequestWithAuth } from '../types/request'

const ensureAuthenticated = (req: RequestWithAuth, res: Response, next: NextFunction) => {
  const autorizationHeader = req.headers.authorization
  try {
    if (!autorizationHeader) {
      throw {
        message: 'no header'
      }
    }

    const authorization = autorizationHeader.split(' ')

    const token = authorization[1]

    const data = decodeToken(token)

    req.user_id = data.sub

    return next()

  } catch (error) {
    return res.status(UNAUTHORIZED).send({message: UNAUTHORIZED})
  }
}

export default ensureAuthenticated
