import { Request, Response } from 'express'
import { getStatusText, METHOD_NOT_ALLOWED, NOT_FOUND, UNAUTHORIZED,  } from 'http-status-codes'

export function methodNotAllowed (req: Request, res: Response): Response {
  return res.status(METHOD_NOT_ALLOWED).send({message: getStatusText(METHOD_NOT_ALLOWED)})
}

export function notFound (req: Request, res: Response): Response {
  return res.status(NOT_FOUND).send({message: getStatusText(NOT_FOUND)})
}

export function notAuthorized (req: Request, res: Response): Response {
  return res.status(UNAUTHORIZED).send({message: getStatusText(UNAUTHORIZED)})
}