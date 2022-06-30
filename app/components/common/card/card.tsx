import type {CSSProperties, ReactElement, ReactNode} from 'react'

interface Props {
  children: ReactNode
  heading?: CardHeadingProps
  footer?: CardFooterProps
  bodyStyle?: CSSProperties
}

export const Card = ({children, heading, footer, bodyStyle = {}}: Props) => {
  return (
    <div className="bg-white border rounded border-slate-300">
      {heading && <CardHeading title={heading.title} extra={heading.extra} />}
      <div className="px-5 py-2" style={bodyStyle}>
        {children}
      </div>
      {footer && <CardFooter>{footer.children}</CardFooter>}
    </div>
  )
}

interface CardHeadingProps {
  title?: string
  extra?: ReactElement
}

const CardHeading = ({title, extra}: CardHeadingProps) => {
  return (
    <div className="border-b h-14 border-slate-300 flex items-center justify-between px-4 py-2.5">
      <div>{title && <div className="text-lg font-medium">{title}</div>}</div>
      <div>{extra}</div>
    </div>
  )
}

interface CardFooterProps {
  children?: ReactElement
}

const CardFooter = ({children}: CardFooterProps) => {
  return <div className="px-4 h-14 border-t border-slate-300">{children}</div>
}
