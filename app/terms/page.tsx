"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsAndConditions() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slideUp")
          }
        })
      },
      { threshold: 0.1 },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="pt-2 pb-6">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-stanley-pink via-stanley-orange to-stanley-yellow bg-clip-text text-transparent mb-4 font-serif">
              Terms & Conditions
            </h1>
            <p className="text-stanley-pink font-medium">
              Please read these terms carefully before placing your order with Stanley's Bakery
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl pb-8">
        <div className="space-y-8">
          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Order Lead Time</h2>
            <p className="text-stanley-pink">
              Orders require at least 48 hours' notice. This may change based on how busy we are.
            </p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Delivery Information</h2>
            <p className="text-stanley-pink mb-2">
              Deliveries are made between 8am–6pm. If you're not home, the driver will wait 10 minutes before returning
              the order to our store in Cosmo City. No redeliveries. Delivery fees are non-refundable.
            </p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Delivery Radius & Cost</h2>
            <p className="text-stanley-pink">
              Delivery is available within a 50km radius, with a tiered fee based on distance. While your delivery date
              is guaranteed, we can't promise an exact time.
            </p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Collections</h2>
            <p className="text-stanley-pink">
              Collection orders are ready by 9am. Please collect within 24 hours or your order will be discarded without
              a refund.
            </p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Cancellations & Refunds</h2>
            <p className="text-stanley-pink">
              Cancel more than 48 hours in advance for a full refund minus a 10% admin fee. No refunds for cancellations
              under 24 hours. Refunds take up to 3 business days.
            </p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">After Delivery/Collection</h2>
            <p className="text-stanley-pink">
              We are not liable for any damage once the cake leaves our store. Cakes must be transported flat, kept
              cool, and handled with care.
            </p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Post-Damage Fixes</h2>
            <p className="text-stanley-pink">
              If we agree to repair a damaged cake, labour & ingredient costs will apply.
            </p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Collection Refusal</h2>
            <p className="text-stanley-pink">
              We may withhold orders if your transport method is unsafe, until you arrange an alternative.
            </p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Allergens</h2>
            <p className="text-stanley-pink">
              Products may contain milk, wheat, nuts, edible flowers, etc. We take no responsibility for allergic
              reactions.
            </p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Storage</h2>
            <p className="text-stanley-pink">
              Store cakes in a cool, dry place. Best within 3 days. Leftovers in sealed containers. Do not refrigerate;
              freezing is fine for up to 2 weeks.
            </p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Product Variation</h2>
            <p className="text-stanley-pink">Actual products may slightly differ from online images.</p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Complaints</h2>
            <p className="text-stanley-pink">
              Report within 48 hours. For full refunds, return the item to us in its original state within 24 hours. No
              collections for complaints.
            </p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Privacy</h2>
            <p className="text-stanley-pink">
              We follow POPIA to keep your info safe and confidential. Only essential data is collected for service
              purposes.
            </p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Marketing Communication</h2>
            <p className="text-stanley-pink">You may opt out of our promotional emails at any time.</p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Cookies</h2>
            <p className="text-stanley-pink">
              We use cookies to improve your online experience. These don't store personal info but help us enhance site
              performance and marketing.
            </p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Consent</h2>
            <p className="text-stanley-pink">
              By using our website, you agree to our use of cookies and personal information as stated.
            </p>
          </section>

          <section ref={addToRefs} className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-xl font-bold text-stanley-pink mb-4">Refund Fee</h2>
            <p className="text-stanley-pink">
              All refunds carry a 10% admin fee, unless caused by a mistake or quality issue on our part.
            </p>
          </section>
        </div>

        <div
          ref={addToRefs}
          className="mt-12 p-6 bg-pink-50 rounded-lg border border-stanley-pink opacity-0 translate-y-8 transition-all duration-700"
        >
          <p className="text-stanley-pink text-center">
            <strong>Last Updated:</strong> January 2024
          </p>
          <p className="text-stanley-pink text-center mt-2">
            For questions about these terms, please contact us at orders@stanleysbakery.co.za
          </p>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/27784914587?text=Hi! I'm interested in ordering a cake from Stanley's Bakery"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </a>
      </div>

      <div className="bg-gradient-to-r from-pink-100 to-yellow-100 py-12 mt-8">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-stanley-pink mb-4 font-serif">
            Ready to Place Your Order?
          </h2>
          <p className="text-stanley-pink mb-6 max-w-2xl mx-auto">
            Now that you understand our terms, browse our delicious cake menu and place your order with confidence.
          </p>
          <Link href="/cakes">
            <Button className="bg-stanley-yellow hover:bg-yellow-400 text-stanley-brown font-bold py-3 px-8 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-stanley-pink hover:border-pink-400">
              Order Now
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .animate-slideUp {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  )
}
