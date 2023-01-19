import { WORDS_BASE } from './bycategory/words_base'
import { WORDS_DISCORD } from './bycategory/words_discord'
import { WORDS_TOURNEY } from './bycategory/words_tourney'
import { WORDS_EU } from './bycategory/words_eu'
import { WORDS_OCE } from './bycategory/words_oce'
import { WORDS_ASIA } from './bycategory/words_asia'

var arr = [
  'kraken', // mods
  'yatta',
  'twiglief',
  'hime',
  'rosa',
  'linean',
  'rimuru',
  'start',
  'nocatoca',
  'noca',
  'toca',
  'ether',
  'iak',
  'chris',
  'bokehbot',
  'sstrikerr',
  'repertoir',
  'rkrigney',
  'lutzburg',
  'eric',

  'karmak', // comms
  'beomulf',

  'mnnmouse', // OScord
  'ecastle2',
  'pigzilla',
  'hinki',
  'garfield',
  'markee',
  'nines',
  'fringer',
  'juggiegud',
  'flame',
  'iheartpie',
  'z3sleeper',
  'kazmasky',
  'bounding',
  'gunner',
  'gunner62',
  'timsolo',
  'goku',
  'pixid',
  'happens',
  'hayden',
  'tofu1',
  'litaf',
  'nafan',
  'nafanuwu',

  'kolaishu', // eu
  'nero',
  'kekle9',
  'haashi',
  'nyan',
  'kiddo',
  'trabje',
  'trider',
  'isnack',
  'nitrun',
  'oneka',
  'arkasha',
  'trusty',
  'symphonus',
  'giovanni',
  'tazemany',
  'nycrofear',
  'hikari',
  'vekia',
  'saxoseal',
  'vlaja',
  'daan',
  'mrtorg',
  'torg',
  'vyzixen',
  'teayen',
  'surgetale',
  'deez',
  'fozey',
  'umizoomi',
  'sokks',
  'layfire',
  'trounzey',
  'stimoro',
  'taiganes',
  'zyoszett',
  'jimray3',
  'alicia',
  'midl',
  'vipr3',
  'red',
  'dudi',
  'gonzo',
  'quivscor',
  'nastou',
  'rapunzel',
  'matyous',
  'matyoustv',
  'tempax',
  'vardek',
  'trick69',
  'aimmel',
  'hath',
  'vane',
  'akaryuwu',
  'yonko34',
  'devexia',

  'f4ntasy', // na comp
  'kero',
  'backfired',
  'jmpr',
  'shireee',
  'wizander',
  'bentup',
  'curiacity',
  'blender',
  'yazo',
  'trademark',
  'xeno',
  'ethan',
  'cloh',
  'anime',
  'boba',
  'mosi',
  'muffin',
  'mitski',
  'pandaIII',
  'swaghaver',
  'userwet',
  'umc',
  'appa',

  'beba', // na discord

  'wisdom', // tourneys
  'koalas',
  'surprise',
  'swiss',
  'stout',
  'boona',

  'voltaic', // skins
  'aurora',
  'xko',
  'arcbeam',
  'arcbeams',
]
arr.push(...WORDS_BASE)
arr.push(...WORDS_DISCORD)
arr.push(...WORDS_TOURNEY)
arr.push(...WORDS_EU)
arr.push(...WORDS_OCE)
arr.push(...WORDS_ASIA)

export const VALID_OMEGA = arr
