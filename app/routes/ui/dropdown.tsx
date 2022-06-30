import {Button, DropDown} from '~/components'

export default function Dropdownpage() {
  return (
    <DropDown label={<Button>DropDown</Button>}>
      <span>DropDown content</span>
    </DropDown>
  )
}
