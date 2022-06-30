import clsx from 'clsx'
import type {IThreeStageItem} from '~/utils/pythagoras'
import {Button} from '../common'

interface Props {
  data: Array<IThreeStageItem>
}

export const ThreeStage = ({data}: Props) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-3 text-center pt-32 pb-16">
        {data.map((item, index) => {
          const renderBefore = () => {
            const clsBorder = () => {
              if (item.stage === '1') {
                return 'border-t-blue-300 border-r-blue-300'
              }
              if (item.stage === '2') {
                return 'border-t-blue-500 border-r-blue-500'
              }
              return 'border-t-blue-700 border-r-blue-700'
            }
            return (
              <span
                className={clsx(
                  'block w-10 h-10',
                  clsBorder(),
                  'border-l-transparent',
                  'border-b-transparent',
                )}
                style={{
                  borderWidth: '1.25rem',
                }}
              />
            )
          }

          const renderAfter = () => {
            if (item.stage !== '3') return null
            return (
              <span
                style={{borderWidth: '96px'}}
                className="absolute left-full w-40 -top-4 -bottom-4 border border-t-transparent border-r-transparent border-b-transparent border-l-blue-800"
              ></span>
            )
          }

          const classBg = () => {
            if (item.stage === '1') {
              return 'bg-blue-400'
            }
            if (item.stage === '2') {
              return 'bg-blue-600'
            }

            return 'bg-blue-800'
          }

          return (
            <div
              key={item.stage}
              className="text-white relative"
              style={{
                transform: `translateY(${-40 * index}px) translateX(${
                  -40 * index
                }px)`,
              }}
            >
              <div
                className={clsx(
                  classBg(),
                  'px-8 py-4 h-40 relative flex items-center justify-center',
                )}
              >
                <div className="grid gap-2">
                  {renderAfter()}
                  <div className="uppercase px-7">
                    Giai đoạn <br />
                    {item.label}
                  </div>
                  <a
                    className="cursor-pointer font-serif text-2xl"
                    href={`#stage${item.stage}`}
                  >
                    {item.number}
                  </a>
                  <span className="font-bold">{item.value}</span>
                </div>
              </div>
              {renderBefore()}
            </div>
          )
        })}
      </div>
      <div className="text-center">
        <a href="#threeStage">
          <Button size="lg" color="primary" variant="contained">
            3 gia đoạn cuộc đời
          </Button>
        </a>
      </div>
    </div>
  )
}
