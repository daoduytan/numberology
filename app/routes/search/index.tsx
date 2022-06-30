import {BaseLayout, Container, FormSearch, Section} from '~/components'

export default function Search() {
  return (
    <main>
      <Section backgroundColor="#fff">
        <Container>
          <div className="mx-auto max-w-lg py-40">
            <h3 className="text-3xl text-center mb-8">
              Xem Thần Số Học Online
            </h3>
            <div className="bg-white py-10 px-16 border border-slate-200">
              <FormSearch />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
