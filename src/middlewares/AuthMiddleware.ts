import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
const { authSecret } = require('../.secret')

interface TokenPayload {
  id: string
  iat: number
  exp: number
}

export default function AuthMiddleware (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json('Não autenticado!')
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(token, authSecret)

    const { id } = data as TokenPayload

    req.userId = id

    return next()
  } catch {
    return res.status(401).json('Não foi possível realizar a autenticação!')
  }
}
