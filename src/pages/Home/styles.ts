import { styled } from "styled-components";


export const HomeContainer = styled.main`
height: 100%;

flex: 1;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
}
`


export const FormContainer = styled.div`
width: 39rem;

color: ${props => props.theme["gray-100"]};
font-size: 1.125rem;
font-weight: bold;

display: flex;
align-items: center;
justify-content: center;
flex-wrap: wrap;
gap: 0.5rem;
`

const BaseInput = styled.input`
height: 2.5rem;

background: transparent;

color: ${props => props.theme["gray-100"]};
font-size: 1.125rem;
font-weight: bold;

border: 0;
border-bottom: 2px solid ${props => props.theme["gray-500"]};

padding: 0 0.5rem;


&:focus{
box-shadow: none;
border-color: ${props => props.theme["green-500"]};
}


&::placeholder {
  color: ${props => props.theme["gray-500"]};
}
`

export const TaskInput = styled(BaseInput)`
flex: 1;
`

export const AmountOfMinutesInput = styled(BaseInput)`
width: 4rem;
`


export const CountDownContainer = styled.div`
font-family: 'Roboto-Mono', monospace;
font-size: 10rem;
line-height: 8rem;

color: ${porps => porps.theme["gray-100"]};

display: flex;
gap: 1rem;

span {
  background: ${props => props.theme["gray-700"]};

  padding: 2rem 1rem;
  border-radius: 8px;
}
`


export const Separator = styled.div`
width: 4rem;

color: ${porps => porps.theme["green-500"]};

display: flex;
justify-content: center;

overflow: hidden;

padding: 2rem 0;
`


export const StartCountDownButton = styled.button`
width: 100%;

background: ${props => props.theme["green-700"]};

color: ${props => props.theme["gray-100"]};
font-weight: bold;

cursor: pointer;

border: 0;
border-radius: 8px;

display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;

padding: 1rem;


&:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

&:not(:disabled):hover {
  background: ${props => props.theme["green-500"]};
}
`