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



export const BaseCountDownButton = styled.button`
width: 100%;

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
  background: ${props => props.theme["green-700"]};
}
`



export const StopCountDownButton = styled(BaseCountDownButton)`
background: ${props => props.theme["red-500"]};



&:not(:disabled):hover {
  background: ${props => props.theme["red-700"]};
}
`



export const StartCountDownButton = styled(BaseCountDownButton)`
background: ${props => props.theme["green-700"]};


&:not(:disabled):hover {
  background: ${props => props.theme["green-500"]};
}
`