import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'
import ProgressBar from '../components/ProgressBar'
import { getModuleQuestions, moduleMeta } from '../data/modules'
import { useSupabase } from '../context/SupabaseContext'
import { useAudio } from '../context/AudioContext'

function ModulePage() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const { currentUser, saveScore, scores } = useSupabase()
  const { playSound } = useAudio()
  const level = currentUser?.level ?? 'cp'
  const questions = useMemo(() => getModuleQuestions(moduleId, level), [moduleId, level])
  const meta = moduleMeta[moduleId]

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [showCorrection, setShowCorrection] = useState(false)
  const [score, setScore] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [fastAnswers, setFastAnswers] = useState(0)
  const [timerKey, setTimerKey] = useState(0)
  const [questionStart, setQuestionStart] = useState(Date.now())
  const [expired, setExpired] = useState(false)
  const responsesRef = useRef([])

  const resetModuleState = useCallback(() => {
    setIndex(0)
    setSelected(null)
    setShowCorrection(false)
    setScore(0)
    setTimeSpent(0)
    setStreak(0)
    setBestStreak(0)
    setFastAnswers(0)
    setTimerKey(0)
    setQuestionStart(Date.now())
    setExpired(false)
    responsesRef.current = []
  }, [])

  useEffect(() => {
    resetModuleState()
  }, [moduleId, level, resetModuleState])

  const question = questions[index]
  const progressValue = questions.length ? ((index + (showCorrection ? 1 : 0)) / questions.length) * 100 : 0

  const goToNext = useCallback(() => {
    setShowCorrection(false)
    setSelected(null)
    setIndex((prev) => Math.min(prev + 1, questions.length - 1))
    setTimerKey((key) => key + 1)
    setQuestionStart(Date.now())
    setExpired(false)
  }, [questions.length])

  const finishModule = useCallback(
    async ({ lastCorrect, lastElapsed }) => {
      const totalQuestions = questions.length || 1
      const responses = responsesRef.current
      const correctCount = responses.filter((response) => response.correct).length + (lastCorrect ? 1 : 0)
      const accuracy = Math.round((correctCount / totalQuestions) * 100)
      const averageSpeed = Math.round((timeSpent + lastElapsed) / totalQuestions)
      const rewardBadges = []
      if (bestStreak >= 3) rewardBadges.push('Badge précision')
      if (fastAnswers >= 5) rewardBadges.push('Badge vitesse')
      const previousAttempts = scores.filter((entry) => entry.module === moduleId).length
      if (previousAttempts >= 2) {
        rewardBadges.push('Badge persévérance')
      }

      await saveScore({
        module: moduleId,
        score,
        date: new Date().toISOString(),
        time_spent: timeSpent + lastElapsed,
        streak: bestStreak,
        accuracy,
        speed: averageSpeed,
        rewards: rewardBadges,
      })

      navigate(`/resultats/${moduleId}`, {
        state: {
          score,
          accuracy,
          averageSpeed,
          rewardBadges,
          totalQuestions,
        },
      })
    },
    [bestStreak, fastAnswers, moduleId, navigate, questions.length, saveScore, score, scores, timeSpent]
  )

  const registerAnswer = useCallback(
    (value) => {
      if (!question || showCorrection) return
      const now = Date.now()
      const elapsed = Math.min(30, Math.round((now - questionStart) / 1000))
      const normalizedValue = (value ?? '').toString().trim().toLowerCase()
      const normalizedAnswer = question.answer.toString().trim().toLowerCase()
      const correct = normalizedValue === normalizedAnswer
      const basePoints = correct ? 20 : 0
      const speedBonus = correct ? Math.max(0, 10 - elapsed) : 0
      const overtimePenalty = expired && correct ? -5 : 0
      const gained = Math.max(0, basePoints + speedBonus + overtimePenalty)

      setShowCorrection(true)
      setTimeSpent((prev) => prev + elapsed)
      responsesRef.current = [...responsesRef.current, { id: question.id, correct, elapsed }]

      if (correct) {
        playSound('success')
        setScore((prev) => prev + gained)
        setStreak((prev) => {
          const next = prev + 1
          setBestStreak((best) => Math.max(best, next))
          return next
        })
        if (elapsed <= 10) {
          setFastAnswers((prev) => prev + 1)
        }
      } else {
        playSound('error')
        setStreak(0)
      }

      setTimeout(() => {
        if (index + 1 >= questions.length) {
          finishModule({ lastCorrect: correct, lastElapsed: elapsed })
        } else {
          goToNext()
        }
      }, 1200)
    },
    [question, showCorrection, questionStart, expired, playSound, index, questions.length, finishModule, goToNext]
  )

  const handleTimerEnd = () => {
    setExpired(true)
  }

  if (!meta) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-slate-600">Module introuvable.</p>
      </div>
    )
  }

  if (!questions.length) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-slate-600">Aucune question disponible pour ce niveau.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <span className="badge-chip">{meta.icon} {meta.title}</span>
          <h1 className="mt-2 font-display text-3xl text-midnight">Question {index + 1} / {questions.length}</h1>
        </div>
        <div className="card-surface flex flex-col items-end gap-2 p-4">
          <p className="text-sm font-semibold text-slate-500">Score</p>
          <p className="text-3xl font-display text-ocean">{score} pts</p>
          <p className="text-xs uppercase text-slate-400">Série : {streak}</p>
        </div>
      </div>
      <ProgressBar value={progressValue} max={100} label="Progression" />
      <QuestionCard
        question={question}
        onSelect={setSelected}
        onValidate={registerAnswer}
        selected={selected}
        showCorrection={showCorrection}
        timerKey={timerKey}
        onTimerEnd={handleTimerEnd}
        level={level}
      />
      <div className="card-surface flex flex-wrap items-center justify-between gap-4 p-6 text-sm text-slate-600">
        <div>
          <p>Temps cumulé : <span className="font-semibold">{timeSpent}s</span></p>
          <p>Meilleure série : <span className="font-semibold">{bestStreak}</span></p>
        </div>
        <div className="flex gap-3">
          <button type="button" className="button-secondary" onClick={() => navigate('/carte')}>
            ⏪ Revenir à la carte
          </button>
          <button type="button" className="button-primary" onClick={resetModuleState}>
            🔁 Recommencer
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModulePage
