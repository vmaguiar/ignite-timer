import { useContext, useEffect } from "react";

import { differenceInSeconds } from "date-fns";

import { CyclesContext } from "../..";


import { CountDownContainer, Separator } from "./styles";


export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, PassSecondsToSet } = useContext(CyclesContext)


  const activeCycleTotalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  // Make the timer down every 1 second
  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsPassedCalculated = differenceInSeconds(new Date(), activeCycle.startDate)

        if (secondsPassedCalculated >= activeCycleTotalSeconds) {
          markCurrentCycleAsFinished()

          PassSecondsToSet(activeCycleTotalSeconds)
          clearInterval(interval)
          // setActiveCycleId(null)
        }
        else {
          PassSecondsToSet(secondsPassedCalculated)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleTotalSeconds, activeCycleId, markCurrentCycleAsFinished, PassSecondsToSet])


  const activeCycleCurrentSeconds = activeCycle ? activeCycleTotalSeconds - amountSecondsPassed : 0
  const minutesToDisplay = Math.floor(activeCycleCurrentSeconds / 60)
  const secondsToDisplay = activeCycleCurrentSeconds % 60

  const minutes = String(minutesToDisplay).padStart(2, '0')
  const seconds = String(secondsToDisplay).padStart(2, '0')


  // Change title when cycle is active
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
    else {
      document.title = 'Ignite Timer'
    }
  }, [activeCycle, minutes, seconds])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}