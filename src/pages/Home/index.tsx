import { createContext, useState } from "react";

import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";


import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";



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

interface CyclesContextType {
  activeCycle: Cycle | undefined,
  activeCycleId: string | null,
  amountSecondsPassed: number,
  markCurrentCycleAsFinished: () => void,
  PassSecondsToSet: (seconds: number) => void
}
export const CyclesContext = createContext({} as CyclesContextType)


export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<NewCyleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })
  const { handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)


  function PassSecondsToSet(totalSeconds: number) {
    setAmountSecondsPassed(totalSeconds)
  }


  function markCurrentCycleAsFinished() {
    setCycles(oldCycles => (
      oldCycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        }
        else {
          return cycle
        }
      })))
  }


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


  const task = watch('task')
  const isSubmitButtonDisable = !task



  return (
    <HomeContainer>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit(handleCreateNewCycle)(event)
        }}
      >
        <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, PassSecondsToSet }}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

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