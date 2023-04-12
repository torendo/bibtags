import styled from '@emotion/styled'
import { css, TextField } from '@mui/material'
import { useCallback, useRef } from 'react'
import { useDrop } from 'react-dnd'
import { NodeTypes } from '../TreeView'
import type { TagProps } from '../TagsView'

export interface BoxProps {
  name: string
  description: string
  onAdd: (tag: TagProps) => void
}

export function Box({ name, description, onAdd }: BoxProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const addTag = useCallback(
    (node: string) => {
      onAdd({ box: name, node })
    },
    [name, onAdd]
  )

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: NodeTypes.LEAF,
      drop: (item: { name: string }) => addTag(item.name),
      collect: monitor => ({
        isOver: monitor.isOver(),
      }),
    }),
    []
  )

  return (
    <Container ref={drop} isOver={isOver}>
      <Name>{name}</Name>
      <Description>{description}</Description>
      <form
        onSubmit={e => {
          e.preventDefault()
          const value = inputRef?.current?.value
          if (value) {
            addTag(value)
            inputRef.current.value = ''
          }
        }}
      >
        <TextField inputRef={inputRef} size="small" placeholder="custom tag" variant="standard" />
      </form>
    </Container>
  )
}

const Container = styled.div<{ isOver: boolean }>`
  padding: 10px 12px;
  background: antiquewhite;
  ${props =>
    props.isOver &&
    css`
      background: burlywood;
    `}
  transition: background ease 100ms;
`

const Name = styled.div`
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 5px;
`

const Description = styled.div`
  font-size: 0.9em;
  color: grey;
  margin-bottom: 12px;
`
