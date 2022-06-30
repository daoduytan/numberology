import {mergeWith} from 'lodash'
import type {IPythagorasResponse} from '~/utils/pythagoras'
import {ChartDate} from '../chart-date'
import {Button, Card} from '../common'
import {IndividualYearRoadmap} from '../individual-year-roadmap'
import {Pyramid} from '../pyramid'
import {ThreeStage} from '../three-stage/three-stage'
import {AttitudeNumberMean} from './attitude-number-mean'
import {BirthNumberMean} from './birth-number-mean'
import {CardNumberMean} from './card-number-mean'
import {ChallengeMean} from './challenge-mean'
import {Conclusion} from './conclustion-mean'
import {DestinyNumberMean} from './destiny-number-mean'
import {ExpressionNumberMean} from './expression-number-mean'
import {FourPeaksOfLifeMean} from './four-peaks-of-life-mean'
import {ManturityNumberMean} from './manturity-number-mean'
import {MissingNumberMean} from './missing-number-mean'
import {MonthNumberMean} from './month-number-mean'
import {NumberList} from './number-list'
import {RulingNumberMean} from './rulling-number-mean'
import {SoulNumberMean} from './soul-number-mean'
import {SumaryMean} from './summary-mean'
import {ThreeStageMean} from './three-stage-mean'
import {YearNumberMean} from './year-number-mean'

interface Props {
  name: string
  date: string
  pythagoras: IPythagorasResponse
}

export const Numberology = ({name, date, pythagoras}: Props) => {
  const _chartName = [...pythagoras.chartName]
  const _chartBirthday = [...pythagoras.chartBirthday]
  const summaryNumber = mergeWith(_chartName, _chartBirthday, (obj, value) => {
    return [...obj, ...value]
  })

  return (
    <div className="grid gap-6">
      <div className="text-center grid gap-10 pt-10">
        <div className="uppercase text-yellow-600">Result search</div>
        <h3 className="font-bold text-6xl font-serif">{name}</h3>
        <div className="">
          <span className="inline-block mr-2 text-yellow-600">sinh ngày</span>
          <span className="font-bold text-4xl font-serif">{date}</span>
        </div>
      </div>

      <Card>
        <NumberList numberList={pythagoras.numbers} />
      </Card>

      <Card>
        <div className="grid grid-cols-3 gap-8 py-6">
          <div className="flex items-center justify-center">
            <div>
              <ChartDate data={pythagoras.chartBirthday} />
              <span className="block px-4 py-3 text-blue-600 text-center">
                Biểu đồ ngày sinh
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div>
              <ChartDate data={pythagoras.chartName} />
              <span className="block px-4 py-3 text-blue-600 text-center">
                Biểu đồ họ tên
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="grid gap-2">
              <ChartDate data={summaryNumber} />
              <div className="text-center">
                <a href="#summary">
                  <Button color="primary" variant="contained" size="lg">
                    Biểu đồ tổng hộp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="py-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center">
              <div className="text-center grid gap-4">
                <Pyramid data={pythagoras.pyramidsOfMaturity} />
                <div>
                  <a href="#fourPeaksOfLife">
                    <Button size="lg" color="primary" variant="contained">
                      4 đỉnh cao cuộc đời
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center grid gap-4">
                <Pyramid data={pythagoras.pyramidsOfMaturity} isChallenge />
                <div>
                  <a href="#challenge">
                    <Button size="lg" color="primary" variant="contained">
                      Biểu đồ thử thách
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="py-6 flex items-center justify-center">
          <IndividualYearRoadmap data={pythagoras.individualYearRoadmap} />
        </div>
      </Card>

      <Card>
        <div className=" py-6 flex items-center justify-center">
          <ThreeStage data={pythagoras.threeStages} />
        </div>
      </Card>

      <Card bodyStyle={{padding: 30}}>
        <div className="grid gap-6">
          <CardNumberMean no="1" id="rulingNumber">
            <RulingNumberMean content={pythagoras.means.rulingNumber} />
          </CardNumberMean>

          <hr />
          <CardNumberMean no="2" id="soulNumber">
            <SoulNumberMean content={pythagoras.means.soulNumber} />
          </CardNumberMean>

          <hr />
          <CardNumberMean no="3" id="expressionNumber">
            <ExpressionNumberMean content={pythagoras.means.expressionNumber} />
          </CardNumberMean>

          <hr />
          <CardNumberMean no="4" id="attitudeNumber">
            <AttitudeNumberMean content={pythagoras.means.attitudeNumber} />
          </CardNumberMean>

          <hr />
          <CardNumberMean no="5" id="destinyNumber">
            <DestinyNumberMean content={pythagoras.means.destinyNumber} />
          </CardNumberMean>

          <hr />
          <CardNumberMean no="6" id="birthNumber">
            <BirthNumberMean content={pythagoras.means.birthNumber} />
          </CardNumberMean>

          <hr />
          <CardNumberMean no="7" id="maturiryNumber">
            <ManturityNumberMean content={pythagoras.means.maturityNumber} />
          </CardNumberMean>

          <hr />
          <CardNumberMean no="8" id="missingNumber">
            <MissingNumberMean content={pythagoras.means.missingNumber} />
          </CardNumberMean>

          <hr />
          <CardNumberMean no="9" id="yearNumber">
            <YearNumberMean content={pythagoras.means.yearNumber} />
          </CardNumberMean>

          <hr />
          <CardNumberMean no="10" id="monthNumber">
            <MonthNumberMean content={pythagoras.means.monthNumber} />
          </CardNumberMean>

          <hr />
          <Conclusion content={pythagoras.means.conclusion} />
        </div>
      </Card>

      <Card bodyStyle={{padding: 30}}>
        <ThreeStageMean content={pythagoras.means.threeStage} />
      </Card>

      <Card bodyStyle={{padding: 30}}>
        <SumaryMean content={pythagoras.means.summary} />
      </Card>

      <Card bodyStyle={{padding: 30}}>
        <FourPeaksOfLifeMean content={pythagoras.means.fourPeaksOfLife} />
      </Card>

      <Card bodyStyle={{padding: 30}}>
        <ChallengeMean content={pythagoras.means.challenge} />
      </Card>
    </div>
  )
}
