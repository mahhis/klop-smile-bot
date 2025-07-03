import formatBalance from '@/helpers/formatBalance'
import sendOptions from '@/helpers/sendOptions'
import Context from '@/models/Context'

export default async function handleBalance(ctx: Context) {
  await ctx.reply(
    `💰 Your current KlopSmile balance: ${formatBalance(ctx.dbuser.balance)}`,
    sendOptions(ctx)
  )
} 