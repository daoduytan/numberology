import type {ReactNode} from 'react'
import {Button} from '../common'

interface Props {
  data: Array<{year: number; active: boolean; num: number}>
}

const ACTIVE_COLOR = '#dc2626'

const TextYear = ({
  year,
  active,
  transform,
}: {
  year: number
  active: boolean
  transform: string
}) => {
  const fill = active ? ACTIVE_COLOR : '#000'
  return (
    <text transform={transform} fill={fill} fontSize="16" fontWeight="700">
      <tspan x="0" y="0">
        {year}
      </tspan>
    </text>
  )
}

const Dot = ({transform, active}: {transform: string; active: boolean}) => {
  const valueActive = active ? '8' : '8'
  const fill = active ? ACTIVE_COLOR : '#07b9e3'

  return (
    <circle
      cx={valueActive}
      cy={valueActive}
      r={valueActive}
      transform={transform}
      fill={fill}
    />
  )
}

const Number = ({
  transform,
  active,
  children,
}: {
  transform: string
  active: boolean
  children: ReactNode
}) => (
  <text
    transform={transform}
    fill={active ? ACTIVE_COLOR : '#07b9e3'}
    fontSize="24"
    fontWeight="700"
  >
    <tspan x="0" y="0">
      {children}
    </tspan>
  </text>
)

export const IndividualYearRoadmap = ({data}: Props) => {
  return (
    <div className="grid gap-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="666.996"
        height="355"
        viewBox="0 0 666.996 355"
      >
        <g transform="translate(-138.843 -65)">
          <path
            d="M141.133,238.676s20.9-47.7,67.117-49.531S318.043,334.7,385.633,331.164s96.859-91.363,148.23-92.488,54.9,114.387,112.379,112.441c49.141-.336,93.095-154.861,110.391-210.832,17.789-49.887,48.461-40.309,48.461-40.309"
            fill="none"
            stroke="#f44949"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          />

          <path
            d="M0,0H664"
            transform="translate(141 419.5)"
            fill="none"
            stroke="#1c0505"
            strokeWidth="1"
          />

          {/* 0 */}
          <TextYear
            transform="translate(149 409)"
            year={data[0].year}
            active={data[0].active}
          />
          <Dot transform="translate(160 195)" active={data[0].active} />
          <Number transform="translate(161 181)" active={data[0].active}>
            9
          </Number>
          {/* 1 */}
          <TextYear
            transform="translate(203 409)"
            year={data[1].year}
            active={data[1].active}
          />
          <Dot transform="translate(216 186)" active={data[1].active} />
          <Number transform="translate(223 172)" active={data[1].active}>
            1
          </Number>
          {/* 2 */}
          <TextYear
            transform="translate(250 409)"
            year={data[2].year}
            active={data[2].active}
          />
          <Dot transform="translate(263 230)" active={data[2].active} />
          <Number transform="translate(271 216)" active={data[2].active}>
            2
          </Number>
          {/* 3 */}
          <TextYear
            transform="translate(304 409)"
            year={data[3].year}
            active={data[3].active}
          />
          <Dot transform="translate(317 290)" active={data[3].active} />
          <Number transform="translate(322 273)" active={data[3].active}>
            3
          </Number>
          {/* 4 */}
          <TextYear
            transform="translate(369 409)"
            year={data[4].year}
            active={data[4].active}
          />
          <Number transform="translate(382 306)" active={data[4].active}>
            4
          </Number>
          <Dot transform="translate(381 324)" active={data[4].active} />
          {/* 5 */}
          <TextYear
            transform="translate(444 409)"
            year={data[5].year}
            active={data[5].active}
          />
          <Number transform="translate(460 256)" active={data[5].active}>
            5
          </Number>
          <Dot transform="translate(456 279)" active={data[5].active} />
          {/* 6 */}
          <TextYear
            transform="translate(515 409)"
            year={data[6].year}
            active={data[6].active}
          />
          <Number transform="translate(528 216)" active={data[6].active}>
            6
          </Number>
          <Dot transform="translate(526 231)" active={data[6].active} />

          {/* 7 */}
          <TextYear
            transform="translate(623 409)"
            year={data[7].year}
            active={data[7].active}
          />
          <Number transform="translate(639 327)" active={data[7].active}>
            7
          </Number>
          <Dot transform="translate(635 342)" active={data[7].active} />
          {/* 8 */}
          <TextYear
            transform="translate(694 409)"
            year={data[8].year}
            active={data[8].active}
          />
          <Number transform="translate(701 239)" active={data[8].active}>
            8
          </Number>
          <Dot transform="translate(707 256)" active={data[8].active} />

          {/* 9 */}
          <TextYear
            transform="translate(759 409)"
            year={data[9].year}
            active={data[9].active}
          />
          <Number transform="translate(766 88)" active={data[9].active}>
            9
          </Number>
          <Dot transform="translate(772 99)" active={data[9].active} />
        </g>
      </svg>

      <div className="text-center">
        <a href="#yearNumber">
          <Button size="lg" color="primary" variant="contained">
            Biểu đồ vận trình năm cá nhân
          </Button>
        </a>
      </div>
    </div>
  )
}
