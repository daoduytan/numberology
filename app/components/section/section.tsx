import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  hasBg?: boolean
  backgroundImage?: boolean
  backgroundColor?: string
}

export const Section = ({
  children,
  hasBg = true,
  backgroundColor,
  backgroundImage,
}: Props) => {
  const classWrap = clsx('bg-slate-100', 'py-24', 'relative')

  return (
    <section className={classWrap} style={{backgroundColor}}>
      {hasBg && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 z-0 opacity-10 bg-cover"
          style={{
            backgroundImage:
              'url("https://mysta.b-cdn.net/wp-content/uploads/2022/01/yellow-star-bg.png")',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </section>
  )
}

const classSubTitle = 'text-yellow-600 uppercase text-sm xl:text-base'
const classDescription = 'text-base xl:text-lg'
const classTitle = 'font-bold text-5xl xl:text-6xl font-serif'

interface HeadingProps {
  children: React.ReactNode | string
}

export const SectionHeadingTitle = ({children}: HeadingProps) => (
  <h3 className={classTitle}>{children}</h3>
)

export const SectionHeadingSubTitle = ({children}: HeadingProps) => (
  <span className={classSubTitle}>{children}</span>
)

export const SectionHeadingDescription = ({children}: HeadingProps) => (
  <p className={classDescription}>{children}</p>
)
