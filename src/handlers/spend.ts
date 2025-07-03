import env from '@/helpers/env'
import formatBalance from '@/helpers/formatBalance'
import sendOptions from '@/helpers/sendOptions'
import Context from '@/models/Context'

export default async function handleSpend(ctx: Context) {
  if (ctx.from?.id !== Number(env.OWNER_ID)) {
    return ctx.reply('Only the owner can spend smiles.', sendOptions(ctx))
  }

  if (!ctx.match) {
    return ctx.reply('Usage: /spend <amount>', sendOptions(ctx))
  }
  const amount = parseInt((ctx.match as string).trim(), 10)
  if (isNaN(amount) || amount <= 0) {
    return ctx.reply('Please specify a positive number.', sendOptions(ctx))
  }

  if (ctx.dbuser.balance < amount) {
    return ctx.reply(
      `Not enough balance. Your balance: ${formatBalance(ctx.dbuser.balance)}`,
      sendOptions(ctx)
    )
  }

  ctx.dbuser.balance -= amount
  await ctx.dbuser.save()

  await ctx.reply(
    `💸 You have spent ${amount} smiles. New balance: ${formatBalance(
      ctx.dbuser.balance
    )}`,
    sendOptions(ctx)
  )
} 