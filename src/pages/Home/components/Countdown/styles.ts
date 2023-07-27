import { styled } from "styled-components";


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