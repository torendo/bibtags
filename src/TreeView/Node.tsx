import styled from '@emotion/styled'
import { useDrag } from 'react-dnd'
import { NodeTypes } from './NodeTypes'

interface NodeProps {
  name: string
  size: number
}

export function Node({ name, size }: NodeProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: NodeTypes.LEAF,
    item: { name },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }))
  return (
    <foreignObject width={size} height={size} x={-size / 2} y={-size / 2}>
      <Container>
        <Content ref={drag} isDragging={isDragging}>
          {name}
        </Content>
      </Container>
    </foreignObject>
  )
}

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: transparent;
`

const Content = styled.div<{ isDragging: boolean }>`
  max-height: 100%;
  width: min-content;
  box-sizing: border-box;
  padding: 6px 8px;
  border: 1px solid black;
  border-radius: 10px;
  background: ${props => (props.isDragging ? 'cornflowerblue' : 'aliceblue')};
  font-size: 14px;
  text-align: center;
  word-wrap: break-word;
  line-height: 1.2em;
  overflow: hidden;
`
