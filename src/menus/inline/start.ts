import { InlineKeyboard } from 'grammy'
import Context from '@/models/Context'
import i18n from '@/helpers/i18n'

export function createStartMenu(ctx: Context) {
  const menu = new InlineKeyboard()

  menu
    // .text(
    //   i18n.t(ctx.dbuser.language, 'pronunciation_btn'),
    //   'improve_pronunciation'
    // )
    // .text(i18n.t(ctx.dbuser.language, 'grammar_btn'), 'improve_grammar')
    // .row()
    // .text(i18n.t(ctx.dbuser.language, 'vocabulary_btn'), 'improve_vocabulary')

    // .text(i18n.t(ctx.dbuser.language, 'fluency_btn'), 'improve_fluency')
    // .row()
    .text(i18n.t(ctx.dbuser.language, 'lets_improve_btn'), 'lets_improve')

  return menu
}

export function createTesttMenu(ctx: Context) {
  const menu = new InlineKeyboard()

  menu.text(
    i18n.t(ctx.dbuser.language, 'pronunciation_btn'),
    'improve_pronunciation'
  )

  return menu
}
