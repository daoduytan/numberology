import {useFetcher, useTransition} from '@remix-run/react'
import clsx from 'clsx'
import {BaseLayout, Button, Container, Input, Section} from '~/components'

const services: Array<{img: string; title: string; text: string}> = [
  {
    img: 'https://mysta.b-cdn.net/wp-content/uploads/2022/01/crystered-968x1024.png',
    title: 'Life path number',
    text: 'You have three numbers that are derived from your birth date. We’ll explain what each number means, and how it can assist you with your career.',
  },
  {
    img: 'https://mysta.b-cdn.net/wp-content/uploads/2022/01/key-682x1024.png',
    title: 'Your core numbers',
    text: 'You have three numbers that are derived from your birth date. We’ll explain what each number means, and how it can assist you with your career.',
  },
  {
    img: 'https://mysta.b-cdn.net/wp-content/uploads/2022/01/moon-3-1024x1024.png',
    title: 'Your birth day number',
    text: 'You have three numbers that are derived from your birth date. We’ll explain what each number means, and how it can assist you with your career.',
  },
  {
    img: 'https://mysta.b-cdn.net/wp-content/uploads/2022/01/sun-dw-1024x1024.png',
    title: 'Your expression number',
    text: 'You have three numbers that are derived from your birth date. We’ll explain what each number means, and how it can assist you with your career.',
  },
  {
    img: 'https://mysta.b-cdn.net/wp-content/uploads/2022/01/eye-23-905x1024.png',
    title: 'Your name numerology',
    text: 'You have three numbers that are derived from your birth date. We’ll explain what each number means, and how it can assist you with your career.',
  },
  {
    img: 'https://mysta.b-cdn.net/wp-content/uploads/2022/01/cwed-1024x844.png',
    title: 'Annual Forecast',
    text: 'You have three numbers that are derived from your birth date. We’ll explain what each number means, and how it can assist you with your career.',
  },
]

const pricings: Array<{
  img: string
  color: string
  label: string
  price: number
  list: string[]
}> = [
  {
    img: 'https://mysta.b-cdn.net/wp-content/uploads/2022/01/star-3-4x.png',
    color: '#617C97',
    label: 'star',
    price: 30,
    list: ['Personal life advice', 'Forecast for month'],
  },
  {
    img: 'https://mysta.b-cdn.net/wp-content/uploads/2022/01/star-4x.png',
    color: '#617C97',
    label: 'sky',
    price: 50,
    list: ['Personal life advice', 'Forecast for month', 'Natal chart'],
  },
  {
    img: 'https://mysta.b-cdn.net/wp-content/uploads/2022/01/star-104x.png',
    color: '#617C97',
    label: 'space',
    price: 80,
    list: [
      'Personal life advice',
      'Forecast for month',
      'Natal chart',
      'Forecast for year',
    ],
  },
]

const classSubTitle = 'text-yellow-600 uppercase text-sm xl:text-base'
const classDescription = 'text-base xl:text-lg'
const classTitle = 'font-bold text-5xl xl:text-6xl font-serif'

export default function Index() {
  const transition = useTransition()
  const searchFetcher = useFetcher()

  return (
    <BaseLayout>
      <main>
        <section className="relative bg-slate-100">
          <div
            className="absolute top-0 left-0 right-0 bottom-0 z-0 opacity-25"
            style={{
              backgroundImage:
                'url("https://mysta.b-cdn.net/wp-content/uploads/2022/01/yellow-star-bg.png")',
              backgroundSize: 'cover',
            }}
          />
          <div className="relative z-10">
            <Container>
              <div className="grid grid-cols-2 gap-10 items-center min-h-screen">
                <div>
                  <div className="grid gap-6 xl:gap-8">
                    <span className={classSubTitle}>Consultation for free</span>
                    <h2 className="text-6xl xl:text-7xl 2xl:text-8xl font-bold font-serif">
                      Infinite power of numerology
                    </h2>
                    <p className={clsx(classDescription, 'text-slate-600')}>
                      Fusce sit amet velit eleifend, iaculis velit quis,
                      malesuada lacus. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit.
                    </p>
                    <p>
                      <Button className="py-3 px-10 text-lg">
                        Get started
                      </Button>
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="flex items-center gap-8">
                        <img
                          className="block w-20"
                          src="https://mysta.b-cdn.net/wp-content/uploads/2022/01/destiny-num.png"
                          alt="Destiny"
                        />
                        <div>
                          <h5 className="font-bold mb-1 text-xl xl:text-2xl font-serif">
                            Destiny
                          </h5>
                          <p className="text-slate-600">
                            Understand current issues in your live
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <img
                          className="block w-20"
                          src="https://mysta.b-cdn.net/wp-content/uploads/2022/01/heart-numerology.png"
                          alt="Life path"
                        />
                        <div>
                          <h5 className="font-bold mb-1 text-2xl font-serif">
                            Life path
                          </h5>
                          <p className="text-slate-600">
                            Discover your innate abilities
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center relative h-full">
                  <div className="bg-orange-200 absolute z-0 inset-y-32 inset-x-32 rounded-full"></div>

                  <div className="flex items-center">
                    <div className="w-full max-w-md bg-white px-8 py-8 xl:py-12 border border-slate-100 relative z-10">
                      <searchFetcher.Form method="post" action="/search">
                        <div className="grid gap-6 2xl:gap-10">
                          <div className="text-center">
                            <div className="font-bold text-3xl xl:text-5xl mb-2 font-serif">
                              Fusce sit amet velit
                            </div>
                            <p className="text-base xl:text-lg text-slate-600">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </p>
                          </div>
                          <Input
                            type="text"
                            name="fullname"
                            label="Full name"
                            block
                          />
                          <Input
                            type="date"
                            name="date"
                            label="Birthday"
                            block
                          />
                          <div className="text-center">
                            <Button
                              type="submit"
                              disabled={transition.submission ? true : false}
                              className="py-3 px-10"
                            >
                              {transition.submission ? 'loading' : 'Submit'}
                            </Button>
                          </div>
                        </div>
                      </searchFetcher.Form>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </section>

        <Section backgroundColor="#21212C">
          <Container>
            <div className="text-center mb-20 grid gap-4 text-white max-w-2xl mx-auto px-4">
              <span className={classSubTitle}>Our services</span>
              <h3 className={classTitle}>
                We'll explain what each number means
              </h3>
              <p className={clsx(classDescription, 'text-white/70')}>
                Vestibulum sodales magna a volutpat tempus.
              </p>
            </div>

            <div className="px-0 xl:px-28">
              <div className="grid grid-cols-3 gap-8">
                {services.map(item => {
                  return (
                    <div
                      key={item.text}
                      className="border border-slate-700 p-8 grid gap-6"
                      style={{backgroundColor: '#21212C'}}
                    >
                      <img
                        className="block h-16"
                        src={item.img}
                        alt={item.title}
                      />

                      <h5 className="text-slate-50 font-bold text-2xl font-serif">
                        {item.title}
                      </h5>
                      <p className="text-slate-400">{item.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="px-28 grid items-center grid-cols-2 gap-16">
              <div className="">
                <img
                  src="https://mysta.b-cdn.net/wp-content/uploads/2022/01/dwednum-732x1024.png"
                  alt=""
                />
              </div>
              <div className="grid gap-8">
                <span className={classSubTitle}>Other services</span>

                <h3 className={classTitle}>
                  Tarot consultations on various topics
                </h3>
                <p className={classDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  mi tellus, pulvinar vel tempus eget, finibus vitae ante. Fusce
                  sit amet velit eleifend, iaculis velit quis, malesuada lacus.
                  Vestibulum sodales magna a volutpat tempus. Mauris vestibulum
                  id urna viverra ultrices. Nullam rhoncus elit eget libero
                  varius dapibus.
                </p>
                <div>
                  <Button className="px-10 py-3">Read more</Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section backgroundColor="#21212C">
          <Container>
            <div className="grid gap-4 mx-auto max-w-2xl text-center text-white">
              <span className={classSubTitle}>Pricing</span>
              <h5 className={classTitle}>The sky speaks to you</h5>
              <p className={classDescription}>
                Anyone can be a millionaire, but to become a billionaire you
                need an astrologer.
              </p>
            </div>

            <div className="grid gap-10 grid-cols-3 max-w-6xl mx-auto mt-16">
              {pricings.map(item => {
                return (
                  <div
                    className="grid items-center gap-4 bg-white text-center p-8"
                    key={item.label}
                  >
                    <div>
                      <img
                        src={item.img}
                        alt={item.label}
                        className="inline-block h-16"
                      />
                    </div>
                    <span
                      className="uppercase inline-block text-sm"
                      style={{color: item.color}}
                    >
                      {item.label}
                    </span>
                    <div>
                      <span className="text-6xl font-bold block font-serif">
                        {item.price} $
                      </span>
                      monthly payment
                    </div>
                    <ul className="grid gap-3 text-lg">
                      {item.list.map(i => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>

                    <div>
                      <button
                        className="px-10 py-4 text-white"
                        style={{backgroundColor: item.color}}
                      >
                        Get started
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </Container>
        </Section>

        <Section>
          <div className="grid gap-6 mx-auto max-w-2xl text-center">
            <span className={classSubTitle}>Testimonials</span>
            <h5 className={classTitle}>Hear from our clients</h5>
            <p className={classDescription}>
              Fusce sit amet velit eleifend, iaculis velit quis, malesuada
              lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="grid gap-10 grid-cols-3 max-w-6xl mx-auto mt-16">
            {Array.from(Array(3).keys()).map(item => {
              return (
                <div key={item} className="bg-white p-8 text-center grid gap-4">
                  <h5 className="font-medium text-2xl font-serif">
                    Consectetur adipiscing elit
                  </h5>
                  <p className="text-lg text-slate-600">
                    “Great! Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Sed ornare in felis vel commodo.”
                  </p>
                  <div>
                    <div className="text-xl font-bold font-serif">
                      Lisa Jons
                    </div>
                    <span className="text-sm text-slate-600">Waitress</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Section>

        <Section backgroundColor="#21212C">
          <Container>
            <div className="grid gap-8 mx-auto max-w-2xl text-center text-white">
              <span className={classSubTitle}>Get in touch</span>
              <h5 className={classTitle}>
                Get your free daily number every day when you sign up!{' '}
              </h5>
              <p className={classDescription}>
                Fusce sit amet velit eleifend, iaculis velit quis, malesuada
                lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
              </p>
              <div className="mt-4">
                <Button className="px-10 py-4">Get started</Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </BaseLayout>
  )
}
