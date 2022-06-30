import {Pagination} from '~/components'

export default function PaginationUi() {
  return (
    <div className="grid gap-4">
      <span className="font-bold">Pagination</span>
      <div className="grid gap-4">
        <Pagination current={5} onChange={() => {}} size={20} total={100} />
        <Pagination
          label="Trang"
          showPageSize
          current={5}
          onChange={() => {}}
          size={20}
          total={100}
        />
      </div>
    </div>
  )
}
