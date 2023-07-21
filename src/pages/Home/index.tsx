import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'

import { FormContainer, HomeContainer, CountDownContainer, Separator, StartCountDownButton,
  TaskInput, AmountOfMinutesInput } from "./styles";


  const newCycleFormValidationSchema = z.object({
    task: z.string().min(1, 'Informe a tarefa'),
    minutesAmount: z.number().min(5, 'O ciclo deve ser no minimo 5 min')
    .max(60, 'O cilo precisa ser no máximo 60 min'),
  })

  type NewCyleFormData = z.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch } = useForm<NewCyleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })


  const task = watch('task')
  const isSubmitButtonDisable = !task

  const handleCreateNewCycle = (data: any) => {
    console.log(data)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto"
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
            step={5}
            min={5}
            max={60}
            placeholder="00"
            {...register('minutesAmount', {valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled={isSubmitButtonDisable} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}