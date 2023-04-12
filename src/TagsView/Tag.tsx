export interface TagProps {
  box: string
  node: string
}

export function Tag({ box, node }: TagProps) {
  return <li>{formatTag({ box, node })}</li>
}

export function formatTag({ box, node }: TagProps) {
  return `${box}::${node}`
}
