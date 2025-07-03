import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function handleStart(ctx: Context) {
  try {
    return await ctx.replyWithLocalization('start', sendOptions(ctx))
  } catch (error) {
    console.error('Failed to send start message:', error)
    return ctx.reply('⚠ Ошибка при отправке стартового сообщения')
  }
}
