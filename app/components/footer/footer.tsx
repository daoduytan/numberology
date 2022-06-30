import bg from '../../assets/bg-footer.png'
import {Container} from '../common'
import {Logo} from '../logo'

export const Footer = () => {
  return (
    <footer
      className="footer pb-4 bg-slate-100 bg-center bg-cover"
      style={{backgroundImage: `url(${bg})`}}
    >
      <Container>
        <div className="grid grid-cols-3 gap-8 py-16">
          <div>
            <div className="mb-4">
              <Logo />
            </div>

            <p>
              Reinventing the way of creating websites, we aim to create the
              most master-peaced WordPress theme available on the market.
            </p>
          </div>
          <div>
            <div className="uppercase font-semibold mb-4">Contact</div>
            <ul className="grid gap-4">
              <li>202 Helga Springs Rd, Crawford, TN 38554</li>
              <li>Call Us: 800.275.8777</li>
              <li>alex@company.com</li>
            </ul>
          </div>
          <div>
            <div className="uppercase font-semibold mb-4">
              Sign Up for Email Updates
            </div>
            <div className="flex mb-4">
              <input
                name="email"
                className="px-6"
                placeholder="Your email address"
              />
              <button className="py-4 px-6 bg-orange-600 text-white hover:bg-orange-500">
                Subscribe
              </button>
            </div>
            <p>Sign up with your email address to receive news and updates</p>
          </div>
        </div>

        <div className="flex justify-between border-t border-slate-200 py-4 mt-4">
          <div className="text-sm">
            Copyright ©2022 Mysta. All rights reserved.
          </div>
          <div></div>
        </div>
      </Container>
    </footer>
  )
}
