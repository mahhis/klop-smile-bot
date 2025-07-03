import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'
/* eslint-disable sort-imports-es6-autofix/sort-imports-es6 */
import { ignoreOld, sequentialize } from 'grammy-middlewares'
import { run } from '@grammyjs/runner'
import handleBalance from '@/handlers/balance'
import handleLanguage from '@/handlers/language'
import handleSmile from '@/handlers/smile'
import handleSpend from '@/handlers/spend'
import sendStart from '@/handlers/start'
import bot from '@/helpers/bot'
import i18n from '@/helpers/i18n'
import startMongo from '@/helpers/startMongo'
import languageMenu from '@/menus/inline/language'
import attachUser from '@/middlewares/attachUser'
import configureI18n from '@/middlewares/configureI18n'
import restrictAccess from '@/middlewares/restrictAccess'

async function runApp() {
  console.log('Starting app...')
  // Mongo
  await startMongo()
  console.log('Mongo connected')

  bot
    // Middlewares
    .use(sequentialize())
    .use(ignoreOld())
    .use(restrictAccess)
    .use(attachUser)
    .use(i18n.middleware())
    .use(configureI18n)
    // Menus
    .use(languageMenu)
  // Commands
  bot.command('start', sendStart)
  bot.command('language', handleLanguage)
  bot.command('smile', handleSmile)
  bot.command('balance', handleBalance)
  bot.command('spend', handleSpend)

  bot.catch(console.error)
  // Start bot
  await bot.init()
  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

void runApp()
