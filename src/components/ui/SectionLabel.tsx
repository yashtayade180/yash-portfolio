interface Props {
  text: string
  centered?: boolean
}

export default function SectionLabel({ text, centered = false }: Props) {
  if (centered) {
    return (
      <div className="flex items-center justify-center mb-6">
        <span className="font-mono text-xs text-primary tracking-widest uppercase">
          &gt; {text}
        </span>
      </div>
    )
  }
  return (
    <div className="flex items-center mb-6">
      <span className="font-mono text-xs text-primary tracking-widest uppercase whitespace-nowrap">
        &gt; {text}
      </span>
      <div className="flex-1 border-t border-outline/40 ml-4" />
    </div>
  )
}
