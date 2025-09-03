import Hero from "./components/Hero"
import WhyChooseUs from "./components/WhyChooseUs"
import NewsletterSignup from "./components/NewsletterSignup"
import WhatsAppChatWidget from "./components/WhatsAppChatWidget"

export default function Home() {
  return (
    <div>
      <Hero />
      <WhyChooseUs />
      <NewsletterSignup />

      <WhatsAppChatWidget />
    </div>
  )
}
