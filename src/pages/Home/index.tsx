import { HandPalm, Play } from "phosphor-react";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'
import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";

import {
  FormContainer, HomeContainer, CountDownContainer, Separator, StartCountDownButton,
  TaskInput, AmountOfMinutesInput, StopCountDownButton
} from "./styles";


const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmount: z.number().min(1, 'O ciclo deve ser no minimo 5 min')
    .max(60, 'O cilo precisa ser no máximo 60 min'),
})

type NewCyleFormData = z.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date,
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCyleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })


  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const activeCycleTotalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const activeCycleCurrentSeconds = activeCycle ? activeCycleTotalSeconds - amountSecondsPassed : 0



  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsPassedCalculated = differenceInSeconds(new Date(), activeCycle.startDate)

        if (secondsPassedCalculated >= activeCycleTotalSeconds) {
          setCycles(oldCycles => (
            oldCycles.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              }
              else {
                return cycle
              }
            })))

          setAmountSecondsPassed(activeCycleTotalSeconds)
          clearInterval(interval)
          // setActiveCycleId(null)
        }
        else {
          setAmountSecondsPassed(secondsPassedCalculated)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleTotalSeconds, activeCycleId])


  const handleCreateNewCycle = (data: NewCyleFormData) => {
    const id = String(new Date().getTime())

    const newCyle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles((oldCycles) => [...oldCycles, newCyle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  const handleInterruptCycle = () => {
    setCycles(oldCycles => (
      oldCycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        }
        else {
          return cycle
        }
      })
    ))
    setActiveCycleId(null)
  }



  const minutesToDisplay = Math.floor(activeCycleCurrentSeconds / 60)
  const secondsToDisplay = activeCycleCurrentSeconds % 60

  const minutes = String(minutesToDisplay).padStart(2, '0')
  const seconds = String(secondsToDisplay).padStart(2, '0')

  const task = watch('task')
  const isSubmitButtonDisable = !task


  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
    else {
      document.title = 'Ignite Timer'
    }
  }, [activeCycle, minutes, seconds])


  return (
    <HomeContainer>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit(handleCreateNewCycle)(event)
        }}
      >
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto"
            disabled={!!activeCycle}
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Banana" />
          </datalist>

          <label htmlFor="">durante</label>
          <AmountOfMinutesInput
            id="AmountOfMinutes"
            type="number"
            min={1}
            max={60}
            placeholder="00"
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitButtonDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}