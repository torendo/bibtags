import create from 'zustand'
import { TagProps } from '../TagsView'

interface TagsStore {
  tags: TagProps[]
  addTag: (newTag: TagProps) => void
  clear: () => void
}

export const useTagsStore = create<TagsStore>(set => ({
  tags: [],
  addTag: (newTag: TagProps) =>
    set(state => {
      if (state.tags.some(tag => tag.box === newTag.box && tag.node === newTag.node)) {
        return state
      }
      return { ...state, tags: state.tags.concat([newTag]) }
    }),
  clear: () => set(state => ({ ...state, tags: [] })),
}))
