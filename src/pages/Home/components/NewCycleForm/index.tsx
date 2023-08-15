import { useContext } from 'react';

import { useFormContext } from 'react-hook-form';

import { CyclesContext } from '../../../../contexts/CyclesContext';


import { AmountOfMinutesInput, FormContainer, TaskInput } from "./styles";



export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()


  return (
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
  )
}