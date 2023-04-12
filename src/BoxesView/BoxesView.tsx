import styled from '@emotion/styled'
import { boxes } from './defaults'
import { Box } from './Box'
import { useTagsStore } from '../store'

export function BoxesView() {
  const { addTag } = useTagsStore()
  return (
    <Container>
      {boxes.map(box => (
        <Box key={box.id} onAdd={addTag} {...box} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 10px;
  background: #f8f8f8;

  & > * {
    margin-bottom: 10px;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`
