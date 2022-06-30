import {Button, Container} from '~/components'

export default function ButtonUi() {
  return (
    <Container>
      {/* /// */}
      <div className="grid gap-6 py-3">
        {/* /// */}
        <div className="grid gap-4">
          <span className="font-bold">Button size</span>

          <div className="flex gap-4">
            <span>
              <Button size="sm">Button sm</Button>
            </span>
            <span>
              <Button>Button md</Button>
            </span>
            <span>
              <Button size="lg">Button lg</Button>
            </span>
          </div>
        </div>
        {/* /// */}
        <div className="grid gap-4">
          <span className="font-bold">Button circle</span>

          <div className="flex gap-4">
            <span>
              <Button>Button</Button>
            </span>
            <span>
              <Button rounded>Button circle</Button>
            </span>
          </div>
        </div>
        {/* /// */}
        <div className="grid gap-4">
          <span className="font-bold">Button type</span>
          <div className="flex gap-4">
            <span>
              <Button>Button normal</Button>
            </span>
            <span>
              <Button variant="dashed">Button normal</Button>
            </span>
            <span>
              <Button variant="text">Button text</Button>
            </span>
          </div>
        </div>
        {/* /// */}
        <div className="grid gap-4">
          <span className="font-bold">Button color</span>
          <div className="flex gap-4">
            <span>
              <Button color="primary" variant="contained">
                Primary
              </Button>
            </span>
            <span>
              <Button color="primary">Primary</Button>
            </span>
            <span>
              <Button color="primary" variant="dashed">
                Primary dashed
              </Button>
            </span>
            <span>
              <Button color="primary" variant="text">
                Primary text
              </Button>
            </span>
          </div>
          {/* /// */}
          <div className="flex gap-4">
            <span>
              <Button color="danger" variant="contained">
                Danger
              </Button>
            </span>

            <span>
              <Button color="danger">Danger</Button>
            </span>
            <span>
              <Button color="danger" variant="dashed">
                Danger dashed
              </Button>
            </span>
            <span>
              <Button color="danger" variant="text">
                Danger text
              </Button>
            </span>
          </div>

          {/* /// */}
          <div className="grid gap-4">
            <span className="font-bold">Button disabled</span>
            <div className="flex gap-4">
              <span>
                <Button color="danger" variant="contained" disabled>
                  Danger
                </Button>
              </span>

              <span>
                <Button color="danger" disabled>
                  Danger
                </Button>
              </span>
              <span>
                <Button color="danger" variant="dashed" disabled>
                  Danger dashed
                </Button>
              </span>
              <span>
                <Button disabled variant="text">
                  Danger text
                </Button>
              </span>
            </div>
          </div>

          {/* /// */}
          <div className="grid gap-4">
            <span className="font-bold">Button loading</span>
            <div className="flex gap-4">
              <span>
                <Button loading color="primary" variant="contained">
                  Btn loading primary
                </Button>
                <Button loading color="danger" variant="contained">
                  Btn loading danger
                </Button>
              </span>
            </div>
          </div>
          {/* /// */}
        </div>
      </div>
    </Container>
  )
}
