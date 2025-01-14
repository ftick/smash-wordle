import {
  HOW_TO0_TEXT as HOW_TO0_EN,
  HOW_TO1_TEXT as HOW_TO1_EN,
  HOW_TO2_TEXT as HOW_TO2_EN,
  HOW_TO3_TEXT as HOW_TO3_EN,
  HOW_TO4_TEXT as HOW_TO4_EN,
  HOW_TO5_TEXT as HOW_TO5_EN,
  HOW_TO6_TEXT as HOW_TO6_EN,
  HOW_TO7_TEXT as HOW_TO7_EN,
  HOW_TO8_TEXT as HOW_TO8_EN,
} from '../../constants/strings'
import {
  HOW_TO0_TEXT as HOW_TO0_FR,
  HOW_TO1_TEXT as HOW_TO1_FR,
  HOW_TO2_TEXT as HOW_TO2_FR,
  HOW_TO3_TEXT as HOW_TO3_FR,
  HOW_TO4_TEXT as HOW_TO4_FR,
  HOW_TO5_TEXT as HOW_TO5_FR,
  HOW_TO6_TEXT as HOW_TO6_FR,
  HOW_TO7_TEXT as HOW_TO7_FR,
  HOW_TO8_TEXT as HOW_TO8_FR,
} from '../../constants/strings-fr'
import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

var HOW_TO0 = ''
var HOW_TO1 = ''
var HOW_TO2 = ''
var HOW_TO3 = ''
var HOW_TO4 = ''
var HOW_TO5 = ''
var HOW_TO6 = ''
var HOW_TO7 = ''
var HOW_TO8 = ''
var userLang = navigator.language

if (userLang.startsWith('en')) {
  HOW_TO0 = HOW_TO0_EN
  HOW_TO1 = HOW_TO1_EN
  HOW_TO2 = HOW_TO2_EN
  HOW_TO3 = HOW_TO3_EN
  HOW_TO4 = HOW_TO4_EN
  HOW_TO5 = HOW_TO5_EN
  HOW_TO6 = HOW_TO6_EN
  HOW_TO7 = HOW_TO7_EN
  HOW_TO8 = HOW_TO8_EN
} else if (userLang.startsWith('fr')) {
  HOW_TO0 = HOW_TO0_FR
  HOW_TO1 = HOW_TO1_FR
  HOW_TO2 = HOW_TO2_FR
  HOW_TO3 = HOW_TO3_FR
  HOW_TO4 = HOW_TO4_FR
  HOW_TO5 = HOW_TO5_FR
  HOW_TO6 = HOW_TO6_FR
  HOW_TO7 = HOW_TO7_FR
  HOW_TO8 = HOW_TO8_FR
}

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  const kofiStyles: React.CSSProperties = { border: '0px', height: '36px' }

  return (
    <BaseModal title={HOW_TO0} isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">{HOW_TO1}</p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="M" status="correct" />
        <Cell value="A" />
        <Cell value="R" />
        <Cell value="I" />
        <Cell value="O" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">{HOW_TO2}</p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="D" />
        <Cell value="A" />
        <Cell value="C" status="present" />
        <Cell value="U" />
        <Cell value="S" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">{HOW_TO3}</p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="S" />
        <Cell value="H" />
        <Cell value="I" />
        <Cell value="N" status="absent" />
        <Cell value="E" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">{HOW_TO4}</p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        {HOW_TO5}
      </p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        <a
          href="https://twitter.com/Kuyachi_"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          {HOW_TO6}
        </a>
        {' - '}
        <a
          href="https://github.com/ftick/smash-wordle"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          {HOW_TO7}
        </a>
        {' - '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold"
        >
          {HOW_TO8}
        </a>
      </p>

      <p className="flex justify-center mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        <a
          href="https://ko-fi.com/V7V2AN4X2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            height="36"
            style={kofiStyles}
            src="https://cdn.ko-fi.com/cdn/kofi2.png?v=3"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </p>
    </BaseModal>
  )
}
