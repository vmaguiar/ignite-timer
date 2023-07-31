import { useContext } from "react";

import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'

import { CyclesContext } from "../../contexts/CyclesContext";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";


import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";



const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmount: z.number().min(1, 'O ciclo deve ser no minimo 5 min')
    .max(60, 'O cilo precisa ser no máximo 60 min'),
})
type NewCyleFormData = z.infer<typeof newCycleFormValidationSchema>


export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCyleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })
  const { handleSubmit, watch, /*reset*/ } = newCycleForm


  const task = watch('task')
  const isSubmitButtonDisable = !task


  return (
    <HomeContainer>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          void handleSubmit(createNewCycle)(event)
        }}
      >
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountDownButton onClick={interruptCurrentCycle} type="button">
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