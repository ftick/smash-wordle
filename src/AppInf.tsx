import {
  InformationCircleIcon,
  ChartBarIcon,
  CogIcon,
  CalendarIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModalUnlimited } from './components/modals/StatsModalUnlimited'
import { SettingsModalInf } from './components/modals/SettingsModal'
import {
  GAME_TITLE,
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGE,
  HARD_MODE_ALERT_MESSAGE,
} from './constants/strings'
import {
  MAX_WORD_LENGTH,
  MAX_CHALLENGES,
  ALERT_TIME_MS,
  REVEAL_TIME_MS,
  GAME_LOST_INFO_DELAY,
  WELCOME_INFO_MODAL_MS,
} from './constants/settings'
import {
  isWordInWordList,
  isWinningWord,
  solution,
  findFirstUnusedReveal,
  getURLBase,
  // LENGTH_OVERRIDE,
} from './lib/words'
import {
  addStatsForCompletedUnlimitedGame,
  loadUnlimitedStats,
} from './lib/stats'
import {
  setStoredIsHighContrastMode,
  getStoredIsHighContrastMode,
  loadUnlimitedGameStateFromLocalStorage,
  saveUnlimitedGameStateToLocalStorage,
  getStoredIs64Enabled,
  getStoredIsMeleeEnabled,
  getStoredIsBrawlEnabled,
  getStoredIsFlashEnabled,
  getStoredIsPMEnabled,
  getStoredIsSmash4Enabled,
  getStoredIsUltEnabled,
  setStoredIs64Enabled,
  setStoredIsBrawlEnabled,
  setStoredIsFlashEnabled,
  setStoredIsMeleeEnabled,
  setStoredIsPMEnabled,
  setStoredIsSmash4Enabled,
  setStoredIsUltEnabled,
} from './lib/localStorage'

import './AppInf.css'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'

function AppInf() {
  // debug(DAY_INDEX, LENGTH_OVERRIDE)

  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )
  const [isRevealing, setIsRevealing] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadUnlimitedGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    if (loaded) {
      const gameWasWon = loaded.guesses.includes(solution)
      if (gameWasWon) {
        setIsGameWon(true)
      }
      if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
        })
      }
      return loaded.guesses
    }
    return []
  })

  const [stats, setStats] = useState(() => loadUnlimitedStats())

  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem('gameMode')
      ? localStorage.getItem('gameMode') === 'hard'
      : false
  )

  const [is64Enabled, setIs64Enabled] = useState(getStoredIs64Enabled())
  const [isMeleeEnabled, setIsMeleeEnabled] = useState(
    getStoredIsMeleeEnabled()
  )
  const [isBrawlEnabled, setIsBrawlEnabled] = useState(
    getStoredIsBrawlEnabled()
  )
  const [isPMEnabled, setIsPMEnabled] = useState(getStoredIsPMEnabled())
  const [isSm4shEnabled, setIsSmash4Enabled] = useState(
    getStoredIsSmash4Enabled()
  )
  const [isUltEnabled, setIsUltEnabled] = useState(getStoredIsUltEnabled())
  const [isFlashEnabled, setIsFlashEnabled] = useState(
    getStoredIsFlashEnabled()
  )

  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    if (!loadUnlimitedGameStateFromLocalStorage()) {
      setTimeout(() => {
        setIsSettingsModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHardMode = (isHard: boolean) => {
    if (guesses.length === 0 || localStorage.getItem('gameMode') === 'hard') {
      setIsHardMode(isHard)
      localStorage.setItem('gameMode', isHard ? 'hard' : 'normal')
    } else {
      showErrorAlert(HARD_MODE_ALERT_MESSAGE)
    }
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  const handle64Enabled = (is64Enabled: boolean) => {
    setIs64Enabled(is64Enabled)
    setStoredIs64Enabled(is64Enabled)
  }

  const handleMeleeEnabled = (isMeleeEnabled: boolean) => {
    setIsMeleeEnabled(isMeleeEnabled)
    setStoredIsMeleeEnabled(isMeleeEnabled)
  }

  const handleBrawlEnabled = (isBrawlEnabled: boolean) => {
    setIsBrawlEnabled(isBrawlEnabled)
    setStoredIsBrawlEnabled(isBrawlEnabled)
  }

  const handlePMEnabled = (isPMEnabled: boolean) => {
    setIsPMEnabled(isPMEnabled)
    setStoredIsPMEnabled(isPMEnabled)
  }

  const handleSm4shEnabled = (isSm4shEnabled: boolean) => {
    setIsSmash4Enabled(isSm4shEnabled)
    setStoredIsSmash4Enabled(isSm4shEnabled)
  }

  const handleUltEnabled = (isUltEnabled: boolean) => {
    setIsUltEnabled(isUltEnabled)
    setStoredIsUltEnabled(isUltEnabled)
  }

  const handleFlashEnabled = (isFlashEnabled: boolean) => {
    setIsFlashEnabled(isFlashEnabled)
    setStoredIsFlashEnabled(isFlashEnabled)
  }

  useEffect(() => {
    saveUnlimitedGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      const delayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH // LENGTH_OVERRIDE

      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      })
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, GAME_LOST_INFO_DELAY)
    }
  }, [isGameWon, isGameLost, showSuccessAlert])

  const onChar = (value: string) => {
    if (
      currentGuess.length < MAX_WORD_LENGTH && // LENGTH_OVERRIDE &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === MAX_WORD_LENGTH)) {
      // LENGTH_OVERRIDE)) {
      showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE)
      setCurrentRowClass('jiggle')
      return setTimeout(() => {
        setCurrentRowClass('')
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess, true)) {
      showErrorAlert(WORD_NOT_FOUND_MESSAGE)
      setCurrentRowClass('jiggle')
      return setTimeout(() => {
        setCurrentRowClass('')
      }, ALERT_TIME_MS)
    }

    // enforce hard mode - all guesses must contain all previously revealed letters
    if (isHardMode) {
      const firstMissingReveal = findFirstUnusedReveal(currentGuess, guesses)
      if (firstMissingReveal) {
        showErrorAlert(firstMissingReveal)
        setCurrentRowClass('jiggle')
        return setTimeout(() => {
          setCurrentRowClass('')
        }, ALERT_TIME_MS)
      }
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * MAX_WORD_LENGTH) // LENGTH_OVERRIDE)

    const winningWord = isWinningWord(currentGuess)

    if (
      currentGuess.length === MAX_WORD_LENGTH && // LENGTH_OVERRIDE &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(
          addStatsForCompletedUnlimitedGame(stats, guesses.length, solution)
        )
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        setStats(
          addStatsForCompletedUnlimitedGame(stats, guesses.length + 1, solution)
        )
        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
          delayMs: REVEAL_TIME_MS * MAX_WORD_LENGTH + 1, //LENGTH_OVERRIDE + 1,
        })
      }
    }
  }

  return (
    <div className="flex flex-col pt-2 pb-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-4 mt-4">
        <h1 className="text-xl ml-2.5 grow font-bold dark:text-white">
          {GAME_TITLE} ∞{/* {GAME_TITLE} Infinite */}
          {/* {GAME_TITLE} {getDayIndex()}-{LENGTH_OVERRIDE} */}
        </h1>
        <CalendarIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => {
            window.open(getURLBase(), '_self')
          }}
        />
        <InformationCircleIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
        <CogIcon
          className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
          onClick={() => setIsSettingsModalOpen(true)}
        />
      </div>
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        isRevealing={isRevealing}
        currentRowClassName={currentRowClass}
      />
      <div className="h-48"></div>
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        isRevealing={isRevealing}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModalUnlimited
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShare={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
        isHardMode={isHardMode}
      />
      <SettingsModalInf
        isOpen={isSettingsModalOpen}
        handleClose={() => setIsSettingsModalOpen(false)}
        isHardMode={isHardMode}
        handleHardMode={handleHardMode}
        isDarkMode={isDarkMode}
        handleDarkMode={handleDarkMode}
        isHighContrastMode={isHighContrastMode}
        handleHighContrastMode={handleHighContrastMode}
        is64Enabled={is64Enabled}
        handle64Enabled={handle64Enabled}
        isMeleeEnabled={isMeleeEnabled}
        handleMeleeEnabled={handleMeleeEnabled}
        isBrawlEnabled={isBrawlEnabled}
        handleBrawlEnabled={handleBrawlEnabled}
        isPMEnabled={isPMEnabled}
        handlePMEnabled={handlePMEnabled}
        isUltEnabled={isUltEnabled}
        handleUltEnabled={handleUltEnabled}
        isSm4shEnabled={isSm4shEnabled}
        handleSm4shEnabled={handleSm4shEnabled}
        isFlashEnabled={isFlashEnabled}
        handleFlashEnabled={handleFlashEnabled}
      />

      <AlertContainer />
    </div>
  )
}

export default AppInf
