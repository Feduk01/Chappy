import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface JwtPayload {
  id: string
  username: string
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'Access denied' })
    return
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload
    ;(req as any).user = decoded
    next()
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' })
    return
  }
}