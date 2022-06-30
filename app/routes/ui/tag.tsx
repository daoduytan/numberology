import {Tag} from '~/components'

export default function TagPage() {
  return (
    <div className="grid gap-4">
      <span className="text-lg font-medium">Tag</span>
      <div className="flex gap-4">
        <Tag label="Small" size="sm"></Tag>
        <Tag label="Medium" close></Tag>
        <Tag label="Large" size="lg"></Tag>
      </div>
      <div className="flex gap-4">
        <Tag label="Default"></Tag>
        <Tag label="Close" close></Tag>
      </div>
      <div className="flex gap-4">
        <Tag label="Default"></Tag>
        <Tag label="Primary" color="primary"></Tag>
        <Tag label="Primary" color="primary" close></Tag>

        <Tag label="Success" color="success"></Tag>
        <Tag label="Success" color="success" close></Tag>

        <Tag label="Warning" color="warning"></Tag>
        <Tag label="Warning" color="warning" close></Tag>

        <Tag label="Danger" color="danger"></Tag>
        <Tag label="danger" color="danger" close></Tag>
      </div>
    </div>
  )
}
