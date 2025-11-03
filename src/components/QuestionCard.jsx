import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import { useAudio } from '../context/AudioContext'
import CountdownTimer from './CountdownTimer'

function QuestionCard({
  question,
  onSelect,
  onValidate,
  selected,
  showCorrection,
  timerKey,
  onTimerEnd,
  level,
}) {
  const { playSound, narrate, stopNarration, isNarrating } = useAudio()

  useEffect(() => {
    stopNarration()
    return () => {
      stopNarration()
    }
  }, [question?.id, stopNarration])

  useEffect(() => {
    if (showCorrection) {
      stopNarration()
    }
  }, [showCorrection, stopNarration])

  const selectedValue =
    typeof selected === 'string' ? selected : selected?.value ?? ''
  const selectedTiles = Array.isArray(selected?.tiles) ? selected.tiles : []
  const answers = useMemo(() => {
    if (!question) return []
    if (question.type === 'input' || question.type === 'tiles') {
      return []
    }
    return question.choices
  }, [question])

  if (!question) return null

  const handleClick = (choice) => {
    playSound('click')
    onSelect?.(choice)
    if (question.type !== 'input') {
      onValidate?.(choice)
    }
  }

  const isCorrect = (value) => value === question.answer

  const handleTilePick = (tile) => {
    if (showCorrection) return
    if (selectedTiles.some((entry) => entry.id === tile.id)) return
    const nextTiles = [...selectedTiles, tile]
    onSelect?.({ value: `${selectedValue}${tile.label}`, tiles: nextTiles })
  }

  const handleRemoveTile = (tileId) => {
    const nextTiles = selectedTiles.filter((entry) => entry.id !== tileId)
    const nextValue = nextTiles.map((entry) => entry.label).join('')
    onSelect?.({ value: nextValue, tiles: nextTiles })
  }

  const handleClearTiles = () => {
    onSelect?.({ value: '', tiles: [] })
  }

  const tilePool = question.tiles ?? []

  return (
    <motion.div
      className="card-surface pirate-panel flex flex-col gap-4 p-6"
      initial={{ rotate: -1, opacity: 0, y: 20 }}
      animate={{ rotate: 0, opacity: 1, y: 0 }}
      exit={{ rotate: 1, opacity: 0, y: -10 }}
      transition={{ type: 'spring', stiffness: 120, damping: 12 }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="comic-label text-sm font-semibold uppercase tracking-wide text-slate-500">
            Niveau {level.toUpperCase()}
          </p>
          <h2 className="font-display text-2xl text-ocean drop-shadow-sm md:text-3xl">
            {question.prompt}
          </h2>
        </div>
        <CountdownTimer duration={30} running={!showCorrection} keySeed={timerKey} onExpire={onTimerEnd} />
      </div>
      <button
        type="button"
        className="button-secondary w-max"
        onClick={() => {
          if (isNarrating) {
            stopNarration()
          } else {
            narrate({ src: question.audio, text: question.prompt })
          }
        }}
      >
        {isNarrating ? '⏹️ Arrêter la lecture' : '🔊 Écouter la consigne'}
      </button>
      {question.image && (
        <img
          src={question.image}
          alt="Illustration de l'énoncé"
          className="max-h-64 w-full rounded-2xl object-contain"
        />
      )}
      {question.type === 'input' ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={selectedValue}
            onChange={(event) => onSelect(event.target.value)}
            placeholder="Écris ta réponse"
            className="w-full rounded-2xl border-2 border-slate-200 bg-white p-4 text-lg font-semibold text-midnight shadow-inner focus:border-ocean focus:outline-none"
          />
          <button type="button" className="button-primary self-start" onClick={() => onValidate(selectedValue)}>
            Valider
          </button>
        </div>
      ) : question.type === 'tiles' ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {tilePool.map((tile) => {
              const used = selectedTiles.some((entry) => entry.id === tile.id)
              return (
                <button
                  key={tile.id}
                  type="button"
                  className={classNames('pirate-coin', {
                    'opacity-60': used,
                  })}
                  onClick={() => handleTilePick(tile)}
                  disabled={used}
                >
                  {tile.label.toUpperCase()}
                </button>
              )
            })}
          </div>
          <div className="pirate-build-area flex flex-wrap items-center gap-2 rounded-2xl p-3 text-lg font-semibold text-midnight shadow-inner">
            {selectedTiles.length === 0 ? (
              <span className="text-sm font-normal text-slate-500">Clique sur les lettres pour écrire le mot.</span>
            ) : (
              selectedTiles.map((tile) => (
                <button
                  key={tile.id}
                  type="button"
                  className="pirate-token"
                  onClick={() => handleRemoveTile(tile.id)}
                >
                  {tile.label.toUpperCase()}
                </button>
              ))
            )}
            {selectedTiles.length > 0 && (
              <button type="button" className="button-secondary text-sm" onClick={handleClearTiles}>
                Effacer
              </button>
            )}
          </div>
          <button type="button" className="button-primary w-max" onClick={() => onValidate(selectedValue)}>
            Valider le mot
          </button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {answers.map((choice) => {
            const isSelected = selected === choice
            const buttonClass = classNames(
              'rounded-2xl border-2 p-4 text-lg font-semibold transition shadow-sm hover:-translate-y-1',
              {
                'border-emerald-400 bg-emerald-100 text-emerald-700 shadow-lg':
                  showCorrection && isCorrect(choice),
                'border-rose-300 bg-rose-100 text-rose-600': showCorrection && isSelected && !isCorrect(choice),
                'border-ocean bg-white text-midnight shadow': isSelected && !showCorrection,
                'border-transparent bg-white/70': !isSelected,
              }
            )
            return (
              <button key={choice} type="button" onClick={() => handleClick(choice)} className={buttonClass}>
                {choice}
              </button>
            )
          })}
        </div>
      )}
      {showCorrection && (
        <div className="rounded-2xl bg-sky-50 p-4 text-midnight shadow-inner">
          <p className="font-semibold">Bonne réponse : {question.answer}</p>
          <p className="text-sm text-slate-600">{question.feedback}</p>
        </div>
      )}
    </motion.div>
  )
}

export default QuestionCard
