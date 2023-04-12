import { useLayoutEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import Tree from 'react-d3-tree'
import { Node } from './Node'
import { useTreeStore } from '../store/treeStore'

const NODE_SIZE = 100

export function TreeView() {
  const { tree } = useTreeStore()

  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const cntRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const dimensions = cntRef.current?.getBoundingClientRect()
    if (dimensions) {
      setTranslate({
        x: NODE_SIZE / 2,
        y: dimensions.height / 2,
      })
    }
  }, [])

  return (
    <Container ref={cntRef}>
      <Tree
        data={tree ?? undefined}
        translate={translate}
        orientation="horizontal"
        collapsible={false}
        zoomable={false}
        shouldCollapseNeighborNodes={false}
        draggable
        hasInteractiveNodes
        separation={{ siblings: 1, nonSiblings: 1 }}
        renderCustomNodeElement={props => <Node name={props.nodeDatum.name} size={NODE_SIZE} />}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  line-height: 0;
  box-shadow: inset 0 0 12px #00000033;
`
