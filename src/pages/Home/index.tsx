import { Play } from "phosphor-react";

import { FormContainer, HomeContainer, CountDownContainer, Separator, StartCountDownButton, TaskInput, AmountOfMinutesInput } from "./styles";


export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            placeholder="Dê um nome para seu projeto"
          />

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

        <StartCountDownButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}