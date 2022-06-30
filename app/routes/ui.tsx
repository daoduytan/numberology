import {Outlet} from '@remix-run/react'
import {Container} from '~/components'

export default function Ui() {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}
