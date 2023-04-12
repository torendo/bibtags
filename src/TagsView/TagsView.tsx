import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { useCallback } from 'react'
import { useTagsStore } from '../store'
import { formatTag, Tag } from './Tag'

export function TagsView() {
  const { tags, clear } = useTagsStore()

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(tags.reduce((str, tag) => `${str}${formatTag(tag)}\n`, ''))
      console.log('Content copied to clipboard')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }, [tags])

  return (
    <Container>
      <List>
        {tags.map(tag => (
          <Tag key={`${tag.box}-${tag.node}`} {...tag} />
        ))}
      </List>
      <Drawer>
        <Button variant="outlined" onClick={onCopy}>
          Copy
        </Button>
        <Button onClick={clear}>Clear</Button>
      </Drawer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 10px;
  background: #f8f8f8;
`

const List = styled.ul`
  flex: auto;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow-y: auto;

  & > * {
    margin-bottom: 10px;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`

const Drawer = styled.div`
  flex: none;
  display: flex;
  justify-content: space-evenly;
`
