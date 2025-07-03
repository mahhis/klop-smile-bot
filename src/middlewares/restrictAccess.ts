import { NextFunction } from 'grammy'
import env from '@/helpers/env'
import sendOptions from '@/helpers/sendOptions'
import Context from '@/models/Context'

export default function restrictAccess(ctx: Context, next: NextFunction) {
  // Allow only specified users
  if (!ctx.from) {
    return next()
  }
  const allowedIds = [Number(env.OWNER_ID), Number(env.USER_ID)]
  if (!allowedIds.includes(ctx.from.id)) {
    return ctx.reply(
      'Извините, вы не альфа юзер. Чтобы стать им, подайте заявку.',
      sendOptions(ctx)
    )
  }
  return next()
} 