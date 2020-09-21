import { Response, Request } from 'express'
import { OK } from 'http-status-codes'
import { createAuth, getAuthByEmail } from '../helpers/authHelpers'
import { createUser } from '../helpers/userHelpers'

type RegisterRequest = Request<
  {},
  { message: string },
  {
    name: string
    email: string
    password: string
  }
>

export class Controller {
  public constructor () {
    this.index = this.index.bind(this)
    this.register = this.register.bind(this)
  }

  public index (req: Request, res: Response): Response {
      return res
      .status(OK)
      .send({message: 'auth / index'})
  }

  public async register (req: RegisterRequest, res: Response): Promise<Response> {
    const {name, email, password} = req.body
    try {
      const oldAuth = await getAuthByEmail(email)
      if (oldAuth) {
        throw {data: oldAuth, message: 'account already exist'}
      }

      const newUser = await createUser({display_name: name, full_name: name}) as number
      const newAuth = await createAuth({email, password, user_id: newUser})

      return res
      .status(OK)
      .send({message: 'auth / register', data: newAuth})
    } catch (error) {
      return res
      .status(OK)
      .send({error})
    }
  }
}