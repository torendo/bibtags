import styled from '@emotion/styled'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TreeView } from './TreeView'
import { BoxesView } from './BoxesView'
import { TagsView } from './TagsView'
import { Controls } from './Controls'

export function App() {
  return (
    <Container>
      <DndProvider backend={HTML5Backend}>
        <TreeView />
        <BoxesView />
        <TagsView />
      </DndProvider>
      <Controls />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px 200px;
  height: 100%;
`
