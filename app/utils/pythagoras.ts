import {compact, find, get, mergeWith, replace} from 'lodash'
import type {Moment} from 'moment'
import moment from 'moment'
import {
  attitudeNumberMean,
  birthNumberMean,
  destinyNumberMean,
  expressionNumberMean,
  maturityNumberMean,
  missingNumberMean,
  monthNumberMean,
  rulingNumberMeans,
  soulNumberMean,
  yearNumberMean,
  conclusionMean,
  threeStageMean,
  challengeMean,
  missArrowMean,
  ownArrowMean,
  repeatNumberMean,
  lonelyNumberMean,
} from '../../content'
import {removeAccent} from './removeAccent'

export enum ETypeNumber {
  RulingNumber = 'rulingNumber', // so chu dao
  NameNumber = 'nameNumber', // Số tên riêng = sứ mệnh
  DestinyNumber = 'destinyNumber', // Số sứ mệnh =số tên riêng
  LifePathNumber = 'lifePathNumber', // so duong doi
  AttitudeNumber = 'attitudeNumber', // chỉ số thái độ
  BirthNumber = 'birthNumber', // so ngay sinh
  SoulNumber = 'soulNumber', // so linh hon
  ExpressionNumber = 'expressionNumber', // chỉ số biểu đạt, nhân cách, tính cách
  MaturityNumber = 'maturityNumber', // số trưởng thành
  MissingNumber = 'missingNumber', // Chỉ số thiếu
  YearNumber = 'yearNumber', // so nam
  MonthNumber = 'monthNumber', // so thang
}

// get value numer rulling number
function getValueNumberRullingNumber(rulingNumber: string): number {
  return rulingNumber === '22/4' ? 4 : +rulingNumber
}

interface IPythagorasData {
  name: string
  date: string
}

const convertValueToArray = (data: number | string): Array<string | number> => {
  const value = typeof data === 'number' ? data.toString() : data

  return Array.from(Array(value.length).keys()).map(index => value[index])
}

const reduceNumberArray = (data: number[]): number => {
  const valueNumber = data.reduce((value: number, item: number) => value + item)

  return valueNumber
}

const reduceNumberArrayBinary = (
  data: number[],
  maxNumber?: number,
): number => {
  if (data.length === 0) return 0

  const valueNumber = reduceNumberArray(data)

  const maxValue = maxNumber || 11

  if (valueNumber > maxValue) {
    return reduceNumberArrayBinary(
      convertValueToArray(valueNumber.toString()).map(i => +i),
      maxNumber,
    )
  }

  return valueNumber
}

const characterMapNumber: any[] = [
  ['a', 'j', 's'],
  ['b', 'k', 't'],
  ['c', 'l', 'u'],
  ['d', 'm', 'v'],
  ['e', 'n', 'w'],
  ['f', 'o', 'x'],
  ['g', 'p', 'y'],
  ['h', 'q', 'z'],
  ['i', 'r'],
]

const vowelList = {
  a: 1,
  u: 3,
  e: 5,
  o: 6,
  y: 7,
  i: 9,
}

const vowelCharacterList = Object.keys(vowelList)

const isVowel = (character: string) => {
  const exist = find(vowelCharacterList, i => i === character)
  return !!exist
}

// get array vowelList, consonantsList
function getVowelListOrConsonantList(data: string): {
  vowels: number[]
  consonants: number[]
} {
  const nameWithoutAccents = removeAccent(data).toLowerCase()

  const arrName: string[] = nameWithoutAccents.split(/ /g)

  let vowels: string[] = []
  let consonants: string[] = []

  arrName.forEach(item =>
    Array.from(Array(item.length).keys()).forEach(i => {
      const word = item[i]

      if (word === 'y') {
        if (i > 0 && (isVowel(item[i - 1]) || isVowel(item[i + 1]))) {
          consonants.push(word)
        }
      } else if (!isVowel(word)) {
        consonants.push(word)
      } else {
        vowels.push(word)
      }
    }),
  )

  return {
    vowels: getNumberArrayFromCharacterList(vowels),
    consonants: getNumberArrayFromCharacterList(consonants),
  }
}

const getNumberArrayFromCharacterList = (data: string[]): number[] => {
  let arr: number[] = []

  data.forEach(character => {
    for (let i = 0; i < characterMapNumber.length; i++) {
      const exist = characterMapNumber[i].find((c: string) => c === character)

      if (exist) {
        arr.push(i + 1)
      }
    }
  })

  return arr
}

/**
 * Get rulling number: Con số chủ đạo, con số đường đời
 * @data: string => fullname
 * @return string 2-11, 22/4
 */
export const getRulingNumber = (value: string): string => {
  const arrayNumber: number[] = convertValueToArray(value).map(i => +i)

  const valueReduceOne = reduceNumberArray(arrayNumber)
  if (valueReduceOne === 22) return '22/4'

  return reduceNumberArrayBinary(arrayNumber).toString()
}

/**
 * get soul number: con số linh hồn ( TODO: tinh lai)
 * @params data: fullname
 * @return value 1-9
 */

export const getSoulNumber = (data: string) => {
  const nameWithoutAccents = removeAccent(data).toLowerCase()

  const arrName: string[] = nameWithoutAccents.split(/ /g)

  const vowels: string[] = []

  arrName.forEach(item =>
    Array.from(Array(item.length).keys()).forEach(i => {
      const word = item[i]

      if (word === 'y') {
        if (i > 0 && !isVowel(item[i - 1]) && !isVowel(item[i + 1])) {
          vowels.push(word)
        }
      } else if (isVowel(word)) {
        vowels.push(word)
      }
    }),
  )

  const vowelNumberList = getNumberArrayFromCharacterList(vowels)

  return reduceNumberArrayBinary(vowelNumberList, 9).toString()
}

/**
 * get expressionNumber: con số biểu đạt ( TODO: tinh lai )
 * @params data: fullname
 * @return value 1-9
 */

const getExpressionNumber = (data: string): string | number => {
  const nameWithoutAccents = removeAccent(data).toLowerCase()

  const arrName: string[] = nameWithoutAccents.split(/ /g)

  const consonants: string[] = []

  arrName.forEach(item =>
    Array.from(Array(item.length).keys()).forEach(i => {
      const word = item[i]

      if (word === 'y') {
        if (i > 0 && (isVowel(item[i - 1]) || isVowel(item[i + 1]))) {
          consonants.push(word)
        }
      } else if (!isVowel(word)) {
        consonants.push(word)
      }
    }),
  )

  const consonantsNumberList = getNumberArrayFromCharacterList(consonants)

  const numberValue = reduceNumberArray(consonantsNumberList)

  // if (numberValue === 22) {
  //   return '22/4'
  // }

  if (numberValue > 9) {
    return reduceNumberArrayBinary(
      convertValueToArray(numberValue.toString()).map(i => +i),
    )
  }

  return numberValue
}

/**
 * Get name number: con số tên riêng, sứ mệnh
 * @params: name: string => fullname
 * @return: string 1 => 9
 */

export const getNameNumber = (name: string): number | string => {
  const nameWithoutAccents = removeAccent(name).toLowerCase()

  const arrName: string[] = nameWithoutAccents.split(/ /g)

  const vowels: string[] = []
  const consonants: string[] = []

  arrName.forEach(item =>
    Array.from(Array(item.length).keys()).forEach(i => {
      const word = item[i]

      if (word === 'y') {
        if (i > 0 && (isVowel(item[i - 1]) || isVowel(item[i + 1]))) {
          consonants.push(word)
        }
      } else if (!isVowel(word)) {
        consonants.push(word)
      } else {
        vowels.push(word)
      }
    }),
  )

  const vowelNumberList = getNumberArrayFromCharacterList(vowels)
  const consonantNumberList = getNumberArrayFromCharacterList(consonants)

  return reduceNumberArrayBinary(
    [
      reduceNumberArrayBinary(vowelNumberList, 9),
      reduceNumberArrayBinary(consonantNumberList, 9),
    ],
    9,
  ).toString()
}

/**
 * get attitude number: số thái độ
 * @param data:string => birthday get DDMM
 * @return 1 => 9
 */
const getAttitudeNumber = (data: string) => {
  return reduceNumberArrayBinary(
    convertValueToArray(data).map(i => +i),
    9,
  )
}

/**
 * get birth number: chỉ số ngày sinh
 * @param data: string => birthday get format 'DD'
 * @return value 1 => 11
 */
function getBirthNumber(data: string) {
  // if (data === '22') {
  //   return '22/4'
  // }

  return reduceNumberArrayBinary(convertValueToArray(data).map(i => +i))
}

/**
 * Maturity number: chỉ số trưởng thành
 * @param rulingNumber: number, nameNumber: number
 * @return value string 1 => 9
 */
function getMaturityNumber(rulingNumber: number, nameNumber: number): string {
  return reduceNumberArrayBinary([rulingNumber, nameNumber], 9).toString()
}

/**
 * Missing number: chỉ số thiếu
 * @param fullname: string, birthday: string
 * @return number | string | undefined
 */
function getMissingNumber(
  birthday: string, // DDMMYYYY
  fullname: string,
): number[] {
  // rullingNumber
  const rulingNumber = reduceNumberArray(
    convertValueToArray(birthday).map(i => +i),
  )

  const rulingNumberBinary = reduceNumberArrayBinary(
    convertValueToArray(rulingNumber).map(i => +i),
  )

  const {vowels, consonants} = getVowelListOrConsonantList(fullname)

  // get soul number
  const soul = reduceNumberArray(vowels)
  const soulBinary = reduceNumberArrayBinary(
    convertValueToArray(soul).map(i => +i),
    9,
  )

  //  get expression number
  const expression = reduceNumberArray(consonants)
  const expressionBinary = reduceNumberArrayBinary(
    consonants.map(i => +i),
    9,
  )

  // get destiny number
  const destiny = soul + expression
  const destinyBinary = reduceNumberArrayBinary(
    [soulBinary, expressionBinary],
    9,
  )

  // get birth day number
  const date = birthday[0] + birthday[1]
  const birthdayBinary = reduceNumberArrayBinary([+birthday[0], +birthday[1]])

  // attitude number
  const attitude = reduceNumberArray(
    convertValueToArray(birthday)
      .filter((_item, index) => index <= 3)
      .map(i => +i),
  )
  const attitudeBinary = reduceNumberArrayBinary(
    convertValueToArray(attitude).map(i => +i),
    9,
  )

  // maturity number
  const maturity = destiny + rulingNumber
  const maturityBinary = reduceNumberArrayBinary(
    [destinyBinary, rulingNumberBinary],
    9,
  )

  let arr: number[] = []

  const arrNumerList: number[] = [
    rulingNumber,
    rulingNumberBinary,
    soul,
    soulBinary,
    expression,
    expressionBinary,
    destiny,
    destinyBinary,
    +date,
    birthdayBinary,
    attitude,
    attitudeBinary,
    maturity,
    maturityBinary,
  ]

  for (let i in arrNumerList) {
    const num = arrNumerList[i]

    if (num < 10) {
      arr.push(num)
    } else {
      const str = num.toString()
      Array.from(Array(str.length).keys()).forEach(key => {
        arr.push(+str[key])
      })
    }
  }

  const arrayNumber: number[] = Array.from(Array(9).keys()).map(i => i + 1)

  let missArrNumber = arrayNumber.filter(i => {
    return !arr.find(item => +item !== i)
  })

  return missArrNumber
}

/**
 * get life path number
 * @param data(birthday): string, rulingNumber: string
 * @return string
 */
const getLifePathNumber = (data: string, rulingNumber: string) => {
  if (rulingNumber === '22/4') return '22/4'
  return `${reduceNumberArray(
    convertValueToArray(data).map(i => +i),
  )}/${rulingNumber}`
}

/**
 * get year number : Số năm hiện tại
 * @param data: MMDD of birthday, YYYY of year now
 * @return value 1 => 9
 */
const getYearNumber = (data: string): number => {
  const valueNumber = reduceNumberArray(convertValueToArray(data).map(i => +i))

  if (valueNumber > 9) {
    return getYearNumber(valueNumber.toString())
  }

  return valueNumber
}

/**
 * get month number : Số tháng hiện tại
 * @param yearNumber: number, rulingNumber: number
 * @return value 1 => 9
 */
const getMonthNumber = (yearNumber: number, rulingNumber: number): number => {
  const valueNumber = reduceNumberArray(
    convertValueToArray(yearNumber + rulingNumber).map(i => +i),
  )

  if (valueNumber > 9) {
    return getYearNumber(valueNumber.toString())
  }

  return valueNumber
}

/*
 * getPyramidOfMaturity
 * @data: birthday: string, rulingNumber: string
 */
interface IPyramidOfMaturityData {
  birthday: string
  rulingNumber: string
}

export interface IPyramidOfMaturityItemResponse {
  peakId: number
  peakNumber: number
  peakAge?: number
  peakYear?: number
  challengeNumber?: number
}

const getPyramidOfMaturity = ({
  birthday,
  rulingNumber,
}: IPyramidOfMaturityData): Array<IPyramidOfMaturityItemResponse> => {
  const valueRulingNumber = rulingNumber === '22/4' ? 4 : +rulingNumber
  // data in birthday

  const momentBirthday = moment(birthday, 'DD/MM/YYYY')
  const day = momentBirthday.format('DD')
  const month = momentBirthday.format('MM')
  const year = momentBirthday.format('YYYY')

  const number1 = reduceNumberArrayBinary(
    convertValueToArray(month).map(i => +i),
    9,
  )
  const number2 = reduceNumberArrayBinary(
    convertValueToArray(day).map(i => +i),
    9,
  )
  const number3 = reduceNumberArrayBinary(
    convertValueToArray(year).map(i => +i),
    9,
  )

  const number4 = reduceNumberArrayBinary([number1, number2], 9)
  const peakAge4 = 36 - valueRulingNumber
  const peakYear4 = +year + 36 - valueRulingNumber
  const challengeNumber4 = Math.abs(number1 - number2)

  const number5 = reduceNumberArrayBinary([number2, number3], 9)
  const peakAge5 = peakAge4 + 9
  const peakYear5 = peakYear4 + 9
  const challengeNumber5 = Math.abs(number2 - number3)

  const number6 = reduceNumberArrayBinary([number4, number5], 11)
  const peakAge6 = peakAge5 + 9
  const peakYear6 = peakYear5 + 9
  const challengeNumber6 = Math.abs(challengeNumber4 - challengeNumber5)

  const number7 = reduceNumberArrayBinary([number1, number3], 11)
  const peakAge7 = peakAge6 + 9
  const peakYear7 = peakYear6 + 9
  const challengeNumber7 = Math.abs(number1 - number3)

  return [
    {
      peakId: 0,
      peakNumber: number1,
    },
    {
      peakId: 1,
      peakNumber: number2,
    },
    {
      peakNumber: number3,
      peakId: 2,
    },
    {
      peakId: 3,
      peakNumber: number4,
      peakAge: peakAge4,
      peakYear: peakYear4,
      challengeNumber: challengeNumber4,
    },
    {
      peakId: 4,
      peakNumber: number5,
      peakAge: peakAge5,
      peakYear: peakYear5,
      challengeNumber: challengeNumber5,
    },
    {
      peakId: 5,
      peakNumber: number6,
      peakAge: peakAge6,
      peakYear: peakYear6,
      challengeNumber: challengeNumber6,
    },
    {
      peakId: 6,
      peakNumber: number7,
      peakAge: peakAge7,
      peakYear: peakYear7,
      challengeNumber: challengeNumber7,
    },
  ]
}

// general array chart
const generalArrayChart = (data: Array<number>): Array<Array<number>> => {
  let arr: Array<Array<number>> = Array.from(Array(9).keys()).map(() => [])

  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item !== 0) {
      arr[item - 1].push(item)
    }
  }

  return arr
}

// get chart birthday
const getChartBirthday = (date: Moment) => {
  const arrayNumber = convertValueToArray(date.format('DDMMYYYY')).map(i => +i)

  return generalArrayChart(arrayNumber)
}

// get chart name
const getChartName = (data: string) => {
  const nameWithoutAccents = replace(removeAccent(data).toLowerCase(), / /g, '')

  const arrayNumber = getNumberArrayFromCharacterList(
    Array.from(Array(nameWithoutAccents.length).keys()).map(
      i => nameWithoutAccents[i],
    ),
  )

  return generalArrayChart(arrayNumber)
}

// get individual year roadmap
const getIndividualYearRoadmap = (yearNumber: number): Array<any> => {
  const yearCurrent = +moment().format('YYYY')

  const array1 = Array.from(Array(yearNumber).keys()).map(i => {
    const year = yearCurrent - (yearNumber - i)
    const active = year === yearCurrent
    return {
      num: i,
      year,
      active,
    }
  })

  const array2 = Array.from(Array(9 - yearNumber + 1).keys())
    .map(i => yearNumber + i)
    .map((n, index) => {
      const year = yearCurrent + index
      const active = year === yearCurrent
      return {
        num: n,
        year,
        active,
      }
    })

  return [...array1, ...array2]
}

/**
 * get three stages
 * @param (rulingNumber: string,  birthday: string)
 * @return Array<IThreeStageItem>
 */
export interface IThreeStageItem {
  label: string
  value: string
  stage: string
  number: number
}

const getThreeStages = (
  rulingNumber: string,
  birthday: string,
): Array<IThreeStageItem> => {
  const valueRulingNumber = getValueNumberRullingNumber(rulingNumber)
  const end1 = 36 - valueRulingNumber

  const start2 = end1 + 1
  const end2 = start2 + 9 * 3

  const getNumber = (stage: '1' | '2' | '3'): number => {
    const formatDate = stage === '1' ? 'MM' : stage === '2' ? 'DD' : 'YYYY'
    const valueDate = moment(birthday, 'DD/MM/YYYY').format(formatDate)

    return reduceNumberArrayBinary(convertValueToArray(valueDate).map(i => +i))
  }

  return [
    {
      label: 'tuổi trẻ',
      value: `1-${end1} tuổi`,
      stage: '1',
      number: getNumber('1'),
    },
    {
      label: 'trưởng thành',
      value: `${start2}-${end2} tuổi`,
      stage: '2',
      number: getNumber('2'),
    },
    {
      label: 'viên mãn',
      value: `> ${end2 + 1} tuổi`,
      stage: '3',
      number: getNumber('3'),
    },
  ]
}

export interface INumber {
  type: ETypeNumber
  color: string
  value: string | number | Array<string | number>
  title: string
}

export type TContentMean = Array<string | Array<string>>

export interface IRulingNumberMean {
  title: string
  lifePurpose: TContentMean
  conditionalDevelopment: TContentMean
  advantages: TContentMean
  defect: TContentMean
  suggestedDevelopment: TContentMean
  careerSuggestions: TContentMean
  conclusion: TContentMean
}

export interface ISoulNumberMean {
  title: string
  description: TContentMean
  positive: TContentMean
  negative: TContentMean
  advice: TContentMean
}

export interface IExpressionNumberMean {
  title: string
  description: TContentMean
  positive: TContentMean
  negative: TContentMean
  advice: TContentMean
}

export interface IDestinyNumberMean {
  title: string
  mission: TContentMean
  positive: TContentMean
  negative: TContentMean
  advice: TContentMean
}

export interface IAttitudeNumberMean {
  title: string
  content: TContentMean
}

export interface IBirthNumberMean {
  title: string
  content: TContentMean
}

export interface IYearNumberMean {
  title: string
  content: TContentMean
}

export interface IMonthNumberMean {
  title: string
  content: TContentMean
}

export interface IMissingNumberMean
  extends Array<{
    title: string
    content: TContentMean
  }> {}

export interface IManturityNumberMean {
  title: string
  content: TContentMean
}

export interface IConclusionMean {
  title: string
  content: Array<{
    title: string
    content: TContentMean
  }>
}

export interface IThreeStageMean {
  stage1: TContentMean
  stage2: TContentMean
  stage3: TContentMean
}

export interface IChallengeMean
  extends Array<{title: string; peak: string; content: TContentMean}> {}

export interface IFourPeaksOfLife
  extends Array<{title: string; peak: string; content: TContentMean}> {}

export interface IOwnArrowOrMissArrow {
  key: string
  title: string
  content: TContentMean
}

export interface IRepeatNumberMean {
  title: string
  content: TContentMean
}

export interface ILonelyNumberMean {
  title: string
  content: TContentMean
}

export interface ISummaryMean {
  ownArrow: Array<IOwnArrowOrMissArrow>
  missArrow: Array<IOwnArrowOrMissArrow>
  repeatNumber: Array<IRepeatNumberMean>
  lonelyNumber: Array<ILonelyNumberMean>
}

export interface IPythagorasMean {
  rulingNumber: IRulingNumberMean
  soulNumber: ISoulNumberMean
  expressionNumber: IExpressionNumberMean
  destinyNumber: IDestinyNumberMean
  attitudeNumber: IAttitudeNumberMean
  birthNumber: IBirthNumberMean
  yearNumber: IYearNumberMean
  monthNumber: IMonthNumberMean
  missingNumber: IMissingNumberMean
  maturityNumber: IManturityNumberMean
  conclusion: IConclusionMean

  summary: ISummaryMean
  threeStage: IThreeStageMean
  challenge: IChallengeMean
  fourPeaksOfLife: IFourPeaksOfLife
}

export interface IPythagorasResponse {
  numbers: Array<INumber>
  pyramidsOfMaturity: Array<IPyramidOfMaturityItemResponse>
  chartBirthday: Array<Array<number>>
  chartName: Array<Array<number>>
  individualYearRoadmap: Array<any>
  threeStages: Array<IThreeStageItem>
  means: IPythagorasMean
}

/**
 * Get mean rulingNumber
 */

function getRulingNumberMean(rulingNumber: string) {
  return get(rulingNumberMeans, rulingNumber)
}

/**
 * Get soul number means
 */
function getSoulNumberMean(soulNumber: string) {
  return get(soulNumberMean, soulNumber)
}

/**
 * get expressionNumber mean
 */
function getExpressionNumberMean(expressionNumber: string) {
  return get(
    expressionNumberMean,
    expressionNumber == '22/4' ? 4 : expressionNumber,
  )
}

/**
 * get destinyNumber mean
 */
function getDestinyNumberMean(destinyNumber: string) {
  return get(destinyNumberMean, destinyNumber)
}

/**
 * get attitudeNumber mean
 */
function getAttitudeNumberMean(attitudeNumber: string) {
  return get(attitudeNumberMean, attitudeNumber)
}

/**
 * get birthNumber mean
 */

function getBirthNumberMean(birthNumber: string) {
  return get(birthNumberMean, birthNumber === '22/4' ? '4' : birthNumber)
}

/**
 * get year number mean
 */
function getYearNumberMean(yearNumber: string) {
  return get(yearNumberMean, yearNumber)
}

/**
 * get month number mean
 */
function getMonthNumberMean(monthNumber: string) {
  return get(monthNumberMean, monthNumber)
}

/**
 * get missing number mean
 */
function getMissingNumberMean(
  missingNumber: Array<number>,
): IMissingNumberMean {
  return missingNumber.map(i => missingNumberMean[i.toString()])
}

/**
 * get maturity number mean
 * @param maturityNumber: string
 */
function getMaturityNumberMean(maturityNumber: string) {
  return get(maturityNumberMean, maturityNumber)
}

/**
 * get conclusion mean
 */
function getConclusionMean(rulingNumber: string) {
  const getValue = () => {
    if (rulingNumber === '22/4') return '4'
    if (rulingNumber === '11') return '2'
    if (rulingNumber === '10') return '1'
    return rulingNumber
  }

  return get(conclusionMean, getValue())
}

/**
 * get three stage mean
 */

function getThreeStagesMean({
  stage1,
  stage2,
  stage3,
}: {
  stage1: number
  stage2: number
  stage3: number
}) {
  return {
    stage1: get(threeStageMean, ['1', stage1.toString()]),
    stage2: get(threeStageMean, ['2', stage2.toString()]),
    stage3: get(threeStageMean, ['3', stage3.toString()]),
  }
}

/**
 * get challenge number mean
 */
const labelPeak: {[k: string]: string} = {
  peak1: 'Đỉnh 1',
  peak2: 'Đỉnh 2',
  peak3: 'Đỉnh 3',
  peak4: 'Đỉnh 4',
}

function getChallengeMean(data: {
  peak1: number
  peak2: number
  peak3: number
  peak4: number
}) {
  return Object.keys(data).map(key => {
    return {
      ...get(challengeMean, get(data, key).toString()),
      peak: labelPeak[key],
    }
  })
}

/**
 * get summary number mean
 * @param (data: {chartBirthday, chartName})
 */

const isEmptyArray = (arr: Array<any>) => arr.length === 0

function getSummaryMean({
  chartName,
  chartBirthday,
}: {
  chartName: Array<Array<number>>
  chartBirthday: Array<Array<number>>
}) {
  const summaryNumber = mergeWith(
    [...chartName],
    [...chartBirthday],
    (obj, value) => [...obj, ...value],
  )

  let ownArrowMeanContent: Array<{
    title: string
    content: TContentMean
  }> = []

  let missArrowMeanContent: Array<{
    title: string
    content: TContentMean
  }> = []

  // 1-2-3 => [6-3-0]
  if (
    !isEmptyArray(summaryNumber[6]) &&
    !isEmptyArray(summaryNumber[3]) &&
    !isEmptyArray(summaryNumber[0])
  ) {
    ownArrowMeanContent.push(get(ownArrowMean, '1-2-3'))
  } else {
    missArrowMeanContent.push(get(missArrowMean, '1-2-3'))
  }

  // 4-5-6 => [7-4-1]
  if (
    !isEmptyArray(summaryNumber[7]) &&
    !isEmptyArray(summaryNumber[4]) &&
    !isEmptyArray(summaryNumber[1])
  ) {
    ownArrowMeanContent.push(get(ownArrowMean, '4-5-6'))
  } else {
    missArrowMeanContent.push(get(missArrowMean, '4-5-6'))
  }

  // 7-8-9 => [8-5-2]
  if (
    !isEmptyArray(summaryNumber[8]) &&
    !isEmptyArray(summaryNumber[5]) &&
    !isEmptyArray(summaryNumber[2])
  ) {
    ownArrowMeanContent.push(get(ownArrowMean, '7-8-9'))
  } else {
    missArrowMeanContent.push(get(missArrowMean, '7-8-9'))
  }

  // 1-4-7 => [6-7-8]
  if (
    !isEmptyArray(summaryNumber[6]) &&
    !isEmptyArray(summaryNumber[7]) &&
    !isEmptyArray(summaryNumber[8])
  ) {
    ownArrowMeanContent.push(get(ownArrowMean, '1-4-7'))
  } else {
    missArrowMeanContent.push(get(missArrowMean, '1-4-7'))
  }

  // 2-5-8 => [3-4-5]
  if (
    !isEmptyArray(summaryNumber[3]) &&
    !isEmptyArray(summaryNumber[4]) &&
    !isEmptyArray(summaryNumber[5])
  ) {
    ownArrowMeanContent.push(get(ownArrowMean, '2-5-8'))
  } else {
    missArrowMeanContent.push(get(missArrowMean, '2-5-8'))
  }

  // 3-6-9 => [0-1-2]
  if (
    !isEmptyArray(summaryNumber[0]) &&
    !isEmptyArray(summaryNumber[1]) &&
    !isEmptyArray(summaryNumber[2])
  ) {
    ownArrowMeanContent.push(get(ownArrowMean, '3-6-9'))
  } else {
    missArrowMeanContent.push(get(ownArrowMean, '3-6-9'))
  }

  // 1-5-9 => [6-4-2]
  if (
    !isEmptyArray(summaryNumber[6]) &&
    !isEmptyArray(summaryNumber[4]) &&
    !isEmptyArray(summaryNumber[2])
  ) {
    ownArrowMeanContent.push(get(ownArrowMean, '1-5-9'))
  } else {
    missArrowMeanContent.push(get(missArrowMean, '1-5-9'))
  }

  // 3-5-7 => [0-4-8]
  if (
    !isEmptyArray(summaryNumber[0]) &&
    !isEmptyArray(summaryNumber[4]) &&
    !isEmptyArray(summaryNumber[8])
  ) {
    ownArrowMeanContent.push(get(ownArrowMean, '3-5-7'))
  } else {
    missArrowMeanContent.push(get(missArrowMean, '3-5-7'))
  }

  // repeat number mean and lonely number mean
  let repeatNumberMeanContent: Array<{title: string; content: TContentMean}> =
    []
  let lonelyNumberMeanContent: Array<{title: string; content: TContentMean}> =
    []
  // 1
  const numberLengthOne = summaryNumber[0].length

  if (numberLengthOne === 1) {
    lonelyNumberMeanContent.push(get(lonelyNumberMean, '1'))
  }

  repeatNumberMeanContent.push(
    get(repeatNumberMean, [
      '1',
      numberLengthOne >= 5 ? '5' : numberLengthOne.toString(),
    ]),
  )

  // 2
  const numberLengthTwo = summaryNumber[1].length

  repeatNumberMeanContent.push(
    get(repeatNumberMean, [
      '2',
      numberLengthTwo >= 5 ? '5' : numberLengthTwo.toString(),
    ]),
  )

  // 3
  const numberLengthThree = summaryNumber[2].length

  if (numberLengthThree === 1) {
    lonelyNumberMeanContent.push(get(lonelyNumberMean, '3'))
  }
  repeatNumberMeanContent.push(
    get(repeatNumberMean, [
      '3',
      numberLengthThree >= 4 ? '4' : numberLengthThree.toString(),
    ]),
  )

  // 4
  const numberLengthFour = summaryNumber[3].length

  repeatNumberMeanContent.push(
    get(repeatNumberMean, [
      '4',
      numberLengthFour >= 3 ? '3' : numberLengthFour.toString(),
    ]),
  )

  // 5
  const numberLengthFive = summaryNumber[4].length

  if (numberLengthFive === 1) {
    lonelyNumberMeanContent.push(get(lonelyNumberMean, '5'))
  }

  repeatNumberMeanContent.push(
    get(repeatNumberMean, [
      '5',
      numberLengthFive >= 4 ? '4' : numberLengthFive.toString(),
    ]),
  )

  // 6
  const numberLengthSix = summaryNumber[5].length

  repeatNumberMeanContent.push(
    get(repeatNumberMean, [
      '6',
      numberLengthSix >= 4 ? '4' : numberLengthSix.toString(),
    ]),
  )

  //7
  const numberLengthSeven = summaryNumber[6].length

  if (numberLengthSeven === 1) {
    lonelyNumberMeanContent.push(get(lonelyNumberMean, '7'))
  }

  repeatNumberMeanContent.push(
    get(repeatNumberMean, [
      '7',
      numberLengthSix >= 4 ? '4' : numberLengthSeven.toString(),
    ]),
  )
  // 8
  const numberLengthEight = summaryNumber[7].length

  repeatNumberMeanContent.push(
    get(repeatNumberMean, [
      '8',
      numberLengthEight >= 4 ? '4' : numberLengthEight.toString(),
    ]),
  )

  // 9
  const numberLengthNine = summaryNumber[8].length
  if (numberLengthNine === 1) {
    lonelyNumberMeanContent.push(get(lonelyNumberMean, '9'))
  }

  repeatNumberMeanContent.push(
    get(repeatNumberMean, [
      '9',
      numberLengthNine >= 5 ? '5' : numberLengthNine.toString(),
    ]),
  )

  return {
    missArrow: compact(missArrowMeanContent),
    ownArrow: compact(ownArrowMeanContent),
    repeatNumber: repeatNumberMeanContent,
    lonelyNumber: lonelyNumberMeanContent,
  }
}

export function pythagoras({date, name}: IPythagorasData): IPythagorasResponse {
  const dateMoment = moment(date, 'DD/MM/YYYY')

  const rulingNumber = getRulingNumber(dateMoment.format('DDMMYYYY'))

  const nameNumber = getNameNumber(name)

  const lifePathNumber = getLifePathNumber(
    dateMoment.format('DDMMYYYY'),
    rulingNumber,
  )

  const destinyNumber = nameNumber

  const attitudeNumber = getAttitudeNumber(dateMoment.format('DDMM'))

  const birthNumber = getBirthNumber(dateMoment.format('DD'))

  const soulNumber = getSoulNumber(name)

  const expressionNumber = getExpressionNumber(name)

  const yearNumber = getYearNumber(
    `${dateMoment.format('DDMM')}${moment().format('YYYY')}`,
  )

  const monthNumber = getMonthNumber(yearNumber, +moment().format('MM'))

  const maturityNumber = getMaturityNumber(+rulingNumber, +nameNumber)

  const missingNumber = getMissingNumber(dateMoment.format('DDMMYYYY'), name)

  const numbers = [
    {
      title: 'Số chủ đạo',
      color: 'bg-emerald-500',
      value: rulingNumber,
      type: ETypeNumber.RulingNumber,
    },
    {
      title: 'Số linh hồn',
      color: 'bg-yellow-600',
      value: soulNumber,
      type: ETypeNumber.SoulNumber,
    },
    {
      title: 'Số biểu đạt',
      color: 'bg-blue-600',
      value: expressionNumber,
      type: ETypeNumber.ExpressionNumber,
    },
    {
      title: 'Số tên riêng',
      color: 'bg-green-500',
      value: nameNumber,
      type: ETypeNumber.NameNumber,
    },
    {
      title: 'Số thái độ',
      color: 'bg-red-600',
      value: attitudeNumber,
      type: ETypeNumber.AttitudeNumber,
    },
    {
      title: 'Số sứ mệnh',
      color: 'bg-violet-600',
      value: destinyNumber,
      type: ETypeNumber.DestinyNumber,
    },
    {
      title: 'Số ngày sinh',
      color: 'bg-lime-600',
      value: birthNumber,
      type: ETypeNumber.BirthNumber,
    },

    {
      title: 'Số trưởng thành',
      color: 'bg-blue-600',
      value: maturityNumber,
      type: ETypeNumber.MaturityNumber,
    },
    {
      title: 'Chỉ số thiếu',
      color: 'bg-blue-600',
      value: missingNumber,
      type: ETypeNumber.MissingNumber,
    },
    {
      title: `Số năm ${moment().format('YYYY')}`,
      color: 'bg-pink-600',
      value: yearNumber,
      type: ETypeNumber.YearNumber,
    },
    {
      title: `Tháng ${moment().format('MM/YYYY')}`,
      color: 'bg-orange-600',
      value: monthNumber,
      type: ETypeNumber.MonthNumber,
    },

    {
      title: 'Số đường đời',
      color: 'bg-sky-600',
      value: lifePathNumber,
      type: ETypeNumber.LifePathNumber,
    },
  ]

  // Pyramids of Maturity
  const pyramidsOfMaturity = getPyramidOfMaturity({
    birthday: date,
    rulingNumber,
  })

  // get chart birthday
  const chartBirthday = getChartBirthday(dateMoment)

  // get chart name
  const chartName = getChartName(name)

  // get individual year roadmap
  const individualYearRoadmap = getIndividualYearRoadmap(yearNumber)

  // Three stages
  const threeStages = getThreeStages(rulingNumber, date)

  return {
    numbers,
    pyramidsOfMaturity,
    chartBirthday,
    chartName,
    individualYearRoadmap,
    threeStages,
    means: {
      rulingNumber: getRulingNumberMean(rulingNumber),
      soulNumber: getSoulNumberMean(soulNumber.toString()),
      expressionNumber: getExpressionNumberMean(expressionNumber.toString()),
      destinyNumber: getDestinyNumberMean(destinyNumber.toString()),
      attitudeNumber: getAttitudeNumberMean(attitudeNumber.toString()),
      birthNumber: getBirthNumberMean(birthNumber.toString()),
      yearNumber: getYearNumberMean(yearNumber.toString()),
      monthNumber: getMonthNumberMean(monthNumber.toString()),
      missingNumber: getMissingNumberMean(missingNumber),
      maturityNumber: getMaturityNumberMean(maturityNumber),
      conclusion: getConclusionMean(rulingNumber),

      threeStage: getThreeStagesMean({
        stage1: threeStages[0].number,
        stage2: threeStages[1].number,
        stage3: threeStages[2].number,
      }),

      challenge: getChallengeMean({
        peak1: pyramidsOfMaturity[3].challengeNumber as number,
        peak2: pyramidsOfMaturity[4].challengeNumber as number,
        peak3: pyramidsOfMaturity[5].challengeNumber as number,
        peak4: pyramidsOfMaturity[6].challengeNumber as number,
      }),

      fourPeaksOfLife: getChallengeMean({
        peak1: pyramidsOfMaturity[3].peakNumber as number,
        peak2: pyramidsOfMaturity[4].peakNumber as number,
        peak3: pyramidsOfMaturity[5].peakNumber as number,
        peak4: pyramidsOfMaturity[6].peakNumber as number,
      }),
      summary: getSummaryMean({
        chartName,
        chartBirthday,
      }),
    },
  }
}
