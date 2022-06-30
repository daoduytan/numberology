import type { MemberCustomer } from '@prisma/client'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { get } from 'lodash'
import type { IDataFitChart } from '~/components'
import { Button, Card, FitChart, Select } from '~/components'
import { DashboardContent } from '~/components/layout/dashboard-content'
import { ContentRenderMean } from '~/components/numberology/content-render-mean'
import { getErrorField } from '~/utils/getErrorField'
import { getDataMeanGroup } from '~/utils/group.server'
import { getMemberGroup } from '~/utils/member.server'
import type { IMetalStressData } from '~/utils/metal-stress.server'
import { validateFields, validateRequired } from '~/utils/validator'

export const loader: LoaderFunction = async ({params}) => {
  try {
    const members = await getMemberGroup(params.groupId)
    return members
  } catch (error) {
    return []
  }
}

export const action: ActionFunction = async ({request, params}) => {
  const form = await request.formData()

  const memberId = form.get('memberId')

  if (typeof memberId !== 'string') {
    return {
      formError: 'Form not submmitted correctly',
    }
  }

  const errorFields = {
    memberId: {
      required: validateRequired({
        value: memberId,
        message: 'Chọn nhân viên trung tâm',
      }),
    },
  }

  const isErrorField = validateFields(errorFields)

  if (isErrorField) {
    return json({errorFields})
  }

  const data = await getDataMeanGroup({
    memberId,
    groupId: params.groupId,
  })

  return json(data)
}

type TDataLoader = Array<MemberCustomer>

type TDataAction = IMetalStressData

export default function GroupChart() {
  const data = useLoaderData<TDataLoader>()
  const dataAction = useActionData<TDataAction>()

  const errorFields = get(dataAction, 'errorFields')

  const errors = errorFields && getErrorField(errorFields)

  const errorMemberId = get(errors, 'memberId')

  const renderContent = () => {
    if (!dataAction || errorMemberId) {
      return (
        <div className="text-center py-10">
          Vui lòng chọn 1 thành viên để thực hiện phân tích
        </div>
      )
    }

    const dataChart: IDataFitChart = {
      labels: dataAction.metalStressNumberList.map(i => i.name),
      datasets: [
        {
          label: 'hello',
          data: Array.from(
            Array(dataAction.metalStressNumberList.length).keys(),
          ).map(() => 100 / dataAction.metalStressNumberList.length),
          borderColor: dataAction.metalStressNumberList.map(i => {
            if (i.isFit) {
              return 'green'
            }

            return '#ddd'
          }),
          backgroundColor: dataAction.metalStressNumberList.map(i => {
            if (i.isFit) {
              return 'green'
            }
            return '#ddd'
          }),
          borderWidth: 2,
        },
      ],
    }

    return (
      <div className="px-6">
        <div className="border rounded mb-10">
          <div className="max-w-lg mx-auto py-10">
            <FitChart data={dataChart} />
          </div>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-6">
            <div className="text-2xl font-semibold">Phân tích mối quan hệ</div>

            {dataAction.metalStressNumberList.map((member, index) => (
              <div key={member.name} className="grid gap-2">
                <div className="flex gap-2">
                  <div className="font-bold text-lg">
                    {index + 1}. {member.name}
                  </div>
                  {member.isFit && (
                    <span className="inline-block px-6 py-1 rounded text-white bg-green-600">
                      Hợp
                    </span>
                  )}
                </div>
                <div>- Chỉ số căng thẳng tâm hồn: {member.metalStress}</div>
                <div>
                  <ContentRenderMean content={member.metalStressMean.content} />
                </div>
              </div>
            ))}
          </div>

          <hr />

          <div className="grid gap-6">
            <div className="text-2xl font-semibold">Cá nhân</div>
            {dataAction?.metalStressNumberList.map((member, index) => (
              <div key={member.name} className="grid gap-4">
                <div className="font-bold text-xl">
                  {index + 1}. {member.name}
                </div>

                <div className="grid gap-3">
                  {member.conclusionMean.content.map(i => {
                    return (
                      <div className="grid gap-2" key={i.title}>
                        <div className="font-semibold">- {i.title}</div>
                        <ContentRenderMean content={i.content} />
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return (
    <DashboardContent headingTitle="Phân tích nhóm">
      <div className="grid gap-6 max-w-4xl mx-auto">
        <Card bodyStyle={{padding: 0}}>
          <Form
            method="post"
            className="flex items-center justify-center py-4 gap-2"
          >
            <label>Chọn thành viên</label>
            <Select label="Chọn thành viên trung tâm" name="memberId">
              {data.map(i => (
                <option key={i.id} value={i.id}>
                  {i.fullname}
                </option>
              ))}
            </Select>
            <Button color="primary" variant="contained" type="submit">
              Kết quả
            </Button>
          </Form>

          <div className="pb-8">{renderContent()}</div>
        </Card>
      </div>
    </DashboardContent>
  )
}
