import { HistoryContainer, HistoryList } from "./styles";

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Qual tarefa</td>
              <td>20 minutos</td>
              <td>Há 2 meses</td>
              <td>Concluído</td>
            </tr>

            <tr>
              <td>Qual tarefa 2</td>
              <td>15 minutos</td>
              <td>Há 2 meses</td>
              <td>Concluído</td>
            </tr>

            <tr>
              <td>Qual tarefa 3</td>
              <td>10 minutos</td>
              <td>Há 2 meses</td>
              <td>Concluído</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}