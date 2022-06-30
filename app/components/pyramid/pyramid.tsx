import type {IPyramidOfMaturityItemResponse} from '~/utils/pythagoras'

interface Props {
  data: Array<IPyramidOfMaturityItemResponse>
  isChallenge?: boolean
}

export const Pyramid = ({data, isChallenge = false}: Props) => {
  const getNumber = (value: IPyramidOfMaturityItemResponse) => {
    if (isChallenge) {
      return value.challengeNumber || value.peakNumber
    }

    return value.peakNumber
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="414"
      height="307"
      viewBox="0 0 414 307"
    >
      <g transform="translate(26.277 43)" fill="#fff">
        <path
          d="M 356.1099548339844 249.587646484375 L 3.890053987503052 249.587646484375 L 179.9999542236328 3.437176942825317 L 232.6513214111328 77.02841949462891 L 356.1099548339844 249.587646484375 Z"
          stroke="none"
        />
        <path
          d="M 179.9999542236328 6.8743896484375 L 7.7801513671875 247.5876312255859 L 352.2198486328125 247.5876312255859 L 231.0247039794922 78.19212341308594 L 179.9999542236328 6.8743896484375 M 179.9999542236328 -1.52587890625e-05 L 234.2778472900391 75.86468505859375 L 360 251.5876312255859 L 0 251.5876312255859 L 179.9999542236328 -1.52587890625e-05 Z"
          stroke="none"
          fill="#ffb06c"
        />
      </g>
      <g transform="translate(66.277 99.132)" fill="#fff">
        <path
          d="M 276.1073303222656 193.4558410644531 L 3.892655611038208 193.4558410644531 L 39.51771545410156 143.71923828125 L 139.9999694824219 3.434607267379761 L 276.1073303222656 193.4558410644531 Z"
          stroke="none"
        />
        <path
          d="M 139.9999694824219 6.869216918945312 L 41.14364624023438 144.8838348388672 L 7.78533935546875 191.4558410644531 L 272.2146606445312 191.4558410644531 L 139.9999694824219 6.869216918945312 M 139.9999542236328 -1.52587890625e-05 L 280 195.4558410644531 L 0 195.4558410644531 L 37.89176940917969 142.5545959472656 L 139.9999542236328 -1.52587890625e-05 Z"
          stroke="none"
          fill="#ffb06c"
        />
      </g>
      <g transform="translate(66.277 196.86)" fill="#fff">
        <path
          d="M 136.3816986083984 95.72791290283203 L 3.8971848487854 95.72791290283203 L 70.13944244384766 3.430083274841309 L 136.3816986083984 95.72791290283203 Z"
          stroke="none"
        />
        <path
          d="M 70.13944244384766 6.86016845703125 L 7.794357299804688 93.72791290283203 L 132.4845275878906 93.72791290283203 L 70.13944244384766 6.86016845703125 M 70.13944244384766 -7.62939453125e-06 L 140.2788848876953 97.72791290283203 L 0 97.72791290283203 L 70.13944244384766 -7.62939453125e-06 Z"
          stroke="none"
          fill="#ffb06c"
        />
      </g>
      <g transform="translate(206.256 196.86)" fill="#fff">
        <path
          d="M 136.1282501220703 95.72788238525391 L 3.893030405044556 95.72788238525391 L 70.01064300537109 3.43428373336792 L 136.1282501220703 95.72788238525391 Z"
          stroke="none"
        />
        <path
          d="M 70.01064300537109 6.868522644042969 L 7.786026000976562 93.72788238525391 L 132.2352600097656 93.72788238525391 L 70.01064300537109 6.868522644042969 M 70.01064300537109 7.62939453125e-06 L 140.0212860107422 97.72788238525391 L 0 97.72788238525391 L 70.01064300537109 7.62939453125e-06 Z"
          stroke="none"
          fill="#ffb06c"
        />
      </g>
      <g transform="translate(-933 -131)">
        <circle
          cx="18.5"
          cy="18.5"
          r="18.5"
          transform="translate(990 401)"
          fill="#2aa9eb"
        />
        <text transform="translate(1005 425)" fill="#fff" fontSize="15">
          <tspan x="0" y="0">
            {getNumber(data[0])}
          </tspan>
        </text>
      </g>
      <g transform="translate(-802 -131)">
        <circle
          cx="18.5"
          cy="18.5"
          r="18.5"
          transform="translate(990 401)"
          fill="#2aa9eb"
        />
        <text
          transform="translate(1005 425)"
          fill="#fff"
          fontSize="15"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            {getNumber(data[1])}
          </tspan>
        </text>
      </g>
      <g transform="translate(-670 -131)">
        <circle
          cx="18.5"
          cy="18.5"
          r="18.5"
          transform="translate(990 401)"
          fill="#2aa9eb"
        />
        <text
          transform="translate(1005 425)"
          fill="#fff"
          fontSize="15"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            {getNumber(data[2])}
          </tspan>
        </text>
      </g>
      <g transform="translate(-662 -371)">
        <g transform="translate(-139 4)">
          <circle
            cx="18.5"
            cy="18.5"
            r="18.5"
            transform="translate(990 401)"
            fill="#ed1e1e"
          />
          <text
            transform="translate(1000 425)"
            fill="#fff"
            fontSize="15"
            fontWeight="700"
          >
            <tspan x="0" y="0">
              {getNumber(data[6])}
            </tspan>
          </text>
        </g>
        <text
          transform="translate(975 386)"
          fill="#ed1e1e"
          fontSize="15"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            {data[6].peakYear}
          </tspan>
        </text>
        <text
          transform="translate(916 386)"
          fill="#ed1e1e"
          fontSize="15"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            {data[6].peakAge} tuổi
          </tspan>
        </text>
      </g>
      <g transform="translate(-810 -509)">
        <g transform="translate(7 196)">
          <circle
            cx="18.5"
            cy="18.5"
            r="18.5"
            transform="translate(990 401)"
            fill="#cc6010"
          />
          <text
            transform="translate(1005 425)"
            fill="#fff"
            fontSize="15"
            fontWeight="700"
          >
            <tspan x="0" y="0">
              {getNumber(data[5])}
            </tspan>
          </text>
        </g>
        <text
          transform="translate(912 561)"
          fill="#cc601b"
          fontSize="15"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            {data[5].peakYear}
          </tspan>
        </text>
        <text
          transform="translate(853 561)"
          fill="#cc601b"
          fontSize="15"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            {data[5].peakAge} tuổi
          </tspan>
        </text>
      </g>
      <g transform="translate(-770 -562)">
        <g transform="translate(-102 345)">
          <circle
            cx="18.5"
            cy="18.5"
            r="18.5"
            transform="translate(990 401)"
            fill="#baa920"
          />
          <text
            transform="translate(1005 425)"
            fill="#fff"
            fontSize="15"
            fontWeight="700"
          >
            <tspan x="0" y="0">
              {getNumber(data[3])}
            </tspan>
          </text>
        </g>
        <text
          transform="translate(770 719)"
          fill="#baa925"
          fontSize="15"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            {data[3].peakAge} tuổi
          </tspan>
        </text>
        <text
          transform="translate(828 719)"
          fill="#baa925"
          fontSize="15"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            {data[3].peakYear}
          </tspan>
        </text>
      </g>
      <g transform="translate(-852 -561)">
        <g transform="translate(119 346)">
          <circle
            cx="18.5"
            cy="18.5"
            r="18.5"
            transform="translate(990 401)"
            fill="#c98517"
          />
          <text
            transform="translate(1005 425)"
            fill="#fff"
            fontSize="15"
            fontWeight="700"
          >
            <tspan x="0" y="0">
              {getNumber(data[4])}
            </tspan>
          </text>
        </g>
        <text
          transform="translate(1232 720)"
          fill="#6917c9"
          fontSize="15"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            {data[4].peakYear}
          </tspan>
        </text>
        <text
          transform="translate(1170 720)"
          fill="#6917c9"
          fontSize="15"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            {data[4].peakAge} tuổi
          </tspan>
        </text>
        <g transform="translate(506 97)">
          <line x2="88" transform="translate(346.5 627.5)" fill="none" />
          <path
            d="M313.867-244.234h88.324l32.9,27.836"
            transform="translate(33.5 871.5)"
            fill="none"
            stroke="#baa925"
            strokeWidth="1"
            strokeDasharray="4"
          />
          <path
            d="M387.008,519.16h90.129l56.418,39.988"
            transform="translate(3 2.516)"
            fill="none"
            stroke="#cc601b"
            strokeWidth="1"
            strokeDasharray="4"
          />
          <path
            d="M569.313,506.3l31.293-23.937H692.48"
            fill="none"
            stroke="#ed1e1e"
            strokeWidth="1"
            strokeDasharray="4"
          />
          <path
            d="M637.18,655.1l27.734-28.977h93.152"
            fill="none"
            stroke="#6917c9"
            strokeWidth="1"
            strokeDasharray="4"
          />
        </g>
      </g>
    </svg>
  )
}
