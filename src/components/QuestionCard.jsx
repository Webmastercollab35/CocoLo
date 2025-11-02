import { useMemo } from 'react'
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
  const { playSound } = useAudio()

  const answers = useMemo(() => {
    if (!question) return []
    if (question.type === 'input') {
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

  return (
    <div className="card-surface flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Niveau {level.toUpperCase()}</p>
          <h2 className="font-display text-2xl text-ocean">{question.prompt}</h2>
        </div>
        <CountdownTimer duration={30} running={!showCorrection} keySeed={timerKey} onExpire={onTimerEnd} />
      </div>
      {question.audio && (
        <button
          type="button"
          className="button-secondary w-max"
          onClick={() => {
            const audio = new Audio(question.audio)
            audio.play()
          }}
        >
          🔊 Écouter la consigne
        </button>
      )}
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
            value={selected ?? ''}
            onChange={(event) => onSelect(event.target.value)}
            placeholder="Écris ta réponse"
            className="w-full rounded-2xl border-2 border-slate-200 bg-white p-4 text-lg font-semibold text-midnight shadow-inner focus:border-ocean focus:outline-none"
          />
          <button type="button" className="button-primary self-start" onClick={() => onValidate(selected)}>
            Valider
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
    </div>
  )
}

export default QuestionCard
