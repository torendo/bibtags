import create from 'zustand'
import { orgChart } from '../TreeView/mock'

interface TreeNode {
  name: string
  children?: TreeNode[]
}

interface TreeStore {
  tree: TreeNode | null
  addTree: (newTree: TreeNode | null) => void
  clear: () => void
}

export const useTreeStore = create<TreeStore>(set => ({
  tree: (() => {
    let treeData = orgChart
    const data = localStorage.getItem('bibtags-tree')
    if (data) {
      treeData = JSON.parse(data)
    }
    return treeData
  })(),
  addTree: (newTree: TreeNode | null) => set(state => ({ ...state, tree: newTree })),
  clear: () => set(state => ({ ...state, tree: null })),
}))
