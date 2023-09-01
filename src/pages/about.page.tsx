import Layout from "@/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"

const AboutPage: BlitzPage = () => {
  return (
    <Layout title="About">
      <div>About</div>
    </Layout>
  )
}

AboutPage.authenticate = true

export default AboutPage
