import {Button, Card} from '~/components'

export default function CardPage() {
  return (
    <div className="grid gap-4">
      <span>Card</span>

      <Card
        heading={{
          title: 'Card',
          extra: <Button size="sm">hello</Button>,
        }}
        footer={{children: <div>Footer</div>}}
      >
        dasd
      </Card>
    </div>
  )
}
