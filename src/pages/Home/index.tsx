import { Play } from "phosphor-react";
import { useState } from "react";

import { FormContainer, HomeContainer, CountDownContainer, Separator, StartCountDownButton, TaskInput, AmountOfMinutesInput } from "./styles";


export function Home() {
  const [task, setTask] = useState('')

  const handleSubmit = () => {
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Dê um nome para seu projeto"
            onChange={(e) => setTask(e.target.value)}
            value={task}
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

        <StartCountDownButton disabled={!task} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}