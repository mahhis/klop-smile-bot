import formatBalance from '@/helpers/formatBalance'
import bot from '@/helpers/bot'
import env from '@/helpers/env'
import sendOptions from '@/helpers/sendOptions'
import Context from '@/models/Context'
import { findOrCreateUser } from '@/models/User'

export default async function handleClopSend(ctx: Context) {
  const ownerId = Number(env.OWNER_ID)
  if (ctx.from?.id !== ownerId) {
    return ctx.reply(
      'Only CLOP (owner) can use this command.',
      sendOptions(ctx)
    )
  }

  // Expect command in reply to a user's message or with username/id arg
  if (!ctx.match) {
    return ctx.reply(
      'Usage: reply to user with /send <amount>',
      sendOptions(ctx)
    )
  }

  const amount = parseInt((ctx.match as string).trim(), 10)
  if (isNaN(amount) || amount <= 0) {
    return ctx.reply('Please specify a positive number.', sendOptions(ctx))
  }

  const reply = ctx.msg?.reply_to_message
  if (!reply || !reply.from) {
    return ctx.reply(
      'Please reply to the user you want to send smiles to.',
      sendOptions(ctx)
    )
  }

  const receiverId = reply.from.id

  const receiver = await findOrCreateUser(receiverId)
  receiver.balance += amount
  await receiver.save()

  await ctx.reply(
    `✅ Sent ${amount} 🪲 smiles to ${reply.from.first_name}`,
    sendOptions(ctx)
  )

  try {
    await bot.api.sendMessage(
      receiverId,
      `🎁 CLOP has gifted you ${amount} 🪲 smiles!\nYour new balance: ${formatBalance(receiver.balance)}`
    )
  } catch (err) {
    console.error('Failed to notify receiver', err)
  }
} 