import { ChangeEventHandler, useCallback } from 'react'
import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import { useTreeStore } from '../store/treeStore'

type FileEventTarget = EventTarget & { files: FileList }

export function Controls() {
  const { addTree } = useTreeStore()

  const onFileInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
    const file = (e.target as FileEventTarget).files[0]
    if (file && file.type === 'application/json') {
      const reader = new FileReader()
      reader.onload = event => {
        try {
          const json = JSON.parse(event.target!.result as string)
          localStorage.setItem('bibtags-tree', JSON.stringify(json))
          addTree(json)
        } catch (error) {
          console.error('Error parsing JSON file:', error)
        }
      }
      reader.readAsText(file)
    } else {
      console.error('Please select a valid JSON text file')
    }
  }, [])

  return (
    <Container>
      <TextField
        type="file"
        onChange={onFileInputChange}
        variant="outlined"
        label="Upload JSON File"
        InputLabelProps={{ shrink: true }}
        inputProps={{ accept: '.json' }}
      />
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0 0 10px;
`
