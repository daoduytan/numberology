import {metalStressNumberMean, conclusionMean} from 'content'
import {get} from 'lodash'
import moment from 'moment'
import {
  getRulingNumber,
  getSoulNumber,
  IConclusionMean,
  TContentMean,
} from './pythagoras'

interface IMemberData {
  id: string
  fullname: string
  birthday: string
}
export interface IMetalStress {
  mainMember: IMemberData
  memberList: Array<IMemberData>
}

function getRulingNumberBinary(date: string): string {
  const rulingNumber = getRulingNumber(date)

  console.log({rulingNumber})

  if (rulingNumber === '11') return '2'
  if (rulingNumber === '10') return '1'

  return rulingNumber
}

function getNumberMember(data: IMemberData): {
  name: string
  rulingNumber: string
  soulNumber: string
} {
  const birthday = moment(data.birthday, 'YYYY-MM-DD').format('DDMMYYYY')

  const rulingNumber = getRulingNumberBinary(birthday)

  const soulNumber = getSoulNumber(data.fullname)

  return {
    name: data.fullname,
    rulingNumber,
    soulNumber,
  }
}

export interface IMetalStressData {
  metalStressNumberList: Array<{
    conclusionMean: IConclusionMean
    name: string
    metalStress: number
    metalStressMean: {
      title: string
      content: TContentMean
    }
    isFit: boolean
  }>
}

const arrNumber1 = ['1', '5', '7']
const arrNumber2 = ['2', '4', '8']
const arrNumber3 = ['3', '6', '9']

const numberFitData = {
  '1': arrNumber1,
  '2': arrNumber2,
  '3': arrNumber3,
  '4': arrNumber2,
  '5': arrNumber1,
  '6': arrNumber3,
  '7': arrNumber1,
  '8': arrNumber2,
  '9': arrNumber3,
}

export function metalStress({
  mainMember,
  memberList,
}: IMetalStress): IMetalStressData {
  const numbersMainMember = getNumberMember(mainMember)

  const numberMemberList = memberList.map(member => getNumberMember(member))

  const mainMemberArrNumberRulling = get(
    numberFitData,
    numbersMainMember.rulingNumber,
  )

  const metalStressNumberList = numberMemberList.map(i => {
    const metalStress = Math.abs(+i.soulNumber - +numbersMainMember.soulNumber)

    const memberArrNumberRulling = get(numberFitData, i.rulingNumber)

    return {
      name: i.name,
      metalStress,
      metalStressMean: get(metalStressNumberMean, metalStress.toString()),
      conclusionMean: get(conclusionMean, i.rulingNumber),

      isFit: mainMemberArrNumberRulling === memberArrNumberRulling,
    }
  })

  return {metalStressNumberList}
}
