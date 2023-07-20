import { styled } from "styled-components";

export const HistoryContainer = styled.main`
display: flex;
flex-direction: column;

flex: 1;

padding: 3.5rem;


h1 {
  font-size: 1.5rem;
  color: ${props => props.theme["gray-100"]};
}
`


export const HistoryList = styled.div`
flex: 1;
overflow: auto;

margin-top: 2rem;


table {
  width: 100%;
  min-width: 600px;

  border-collapse: collapse;

  th {
    background-color: ${props => props.theme["gray-600"]};

    color: ${props => props.theme["gray-100"]};
    text-align: left;
    line-height: 1.6;
    font-size: 0.875rem;

    padding: 1rem;


    &:first-child {
      border-top-left-radius: 8px;
      
      padding-left: 1.5rem;
    }

    &:last-child {
      border-top-right-radius: 8px;

      padding-right: 1.5rem;
    }
  }


  td {
    background-color: ${props => props.theme["gray-700"]};

    font-size: 0.875rem;
    line-height: 1.6;

    border-top: 4px solid ${props => props.theme["gray-800"]};
    padding: 1rem;


    &:first-child {
      width: 50%;
      
      border-top-left-radius: 8px;
      
      padding-left: 1.5rem;
    }

    &:last-child {
      border-top-right-radius: 8px;

      padding-right: 1.5rem;
    }
  }
}
`