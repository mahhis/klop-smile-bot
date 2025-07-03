import bot from '@/helpers/bot'
import env from '@/helpers/env'
import sendOptions from '@/helpers/sendOptions'
import Context from '@/models/Context'
import { findOrCreateUser } from '@/models/User'
import formatBalance from '@/helpers/formatBalance'

export default async function handleSmile(ctx: Context) {
  if (!ctx.match) {
    return ctx.reply('Usage: /smile &lt;amount&gt;', sendOptions(ctx))
  }
  const amount = parseInt((ctx.match as string).trim(), 10)
  if (isNaN(amount) || amount <= 0) {
    return ctx.reply(
      'Please specify a positive number. Example: /smile 5',
      sendOptions(ctx)
    )
  }

  // Check sender balance
  if (ctx.dbuser.balance < amount) {
    return ctx.reply(
      `Not enough balance. Your current balance: ${formatBalance(
        ctx.dbuser.balance
      )}`,
      sendOptions(ctx)
    )
  }

  const receiverId = Number(env.OWNER_ID)
  if (ctx.from?.id === receiverId) {
    return ctx.reply('You cannot send smiles to yourself 😉', sendOptions(ctx))
  }

  // Increase receiver balance
  const receiver = await findOrCreateUser(receiverId)
  receiver.balance += amount
  await receiver.save()

  // Decrease sender balance
  ctx.dbuser.balance -= amount
  await ctx.dbuser.save()

  await ctx.reply(
    `✅ Sent ${amount} 🪲 smiles to the receiver! Your new balance: ${formatBalance(
      ctx.dbuser.balance
    )}`,
    sendOptions(ctx)
  )

  try {
    await bot.api.sendMessage(
      receiverId,
      `💌 You have received ${amount} 🪲 smiles!\nYour new balance: ${formatBalance(
        receiver.balance
      )}`
    )
  } catch (err) {
    console.error('Failed to notify receiver', err)
  }
} 