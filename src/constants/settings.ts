import { solution } from '../lib/words'

export const MAX_WORD_LENGTH = solution.length
export const MAX_CHALLENGES = Math.abs(MAX_WORD_LENGTH - 5) + 8
export const ALERT_TIME_MS = 2000
export const REVEAL_TIME_MS = 350
export const GAME_LOST_INFO_DELAY = (MAX_WORD_LENGTH + 1) * REVEAL_TIME_MS
export const WELCOME_INFO_MODAL_MS = 350
export const DEBUG_ENABLED = true
export const DISCOURAGE_INAPP_BROWSERS = true
export const ENABLE_MIGRATE_STATS = true
export const BLOWFISH_KEY = 'jIEXqS7f%bYm#JiutG9Eu@2$mnjTpu'
export const BLOWFISH_IV = 'sSd9EI@o'
