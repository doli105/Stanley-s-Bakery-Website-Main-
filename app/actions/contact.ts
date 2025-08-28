"use server"

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const name = (formData.get("name") as string)?.trim()
    const email = (formData.get("email") as string)?.trim()
    const message = (formData.get("message") as string)?.trim()

    // Server-side validation
    if (!name || !email || !message) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      }
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      }
    }

    // Construct the WhatsApp message
    const whatsappMessage = `Hi, my name is ${name}. My email is ${email}. I'd like to say: ${message}`

    // URL encode the message
    const encodedMessage = encodeURIComponent(whatsappMessage)

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/27784914587?text=${encodedMessage}`

    // In a real application, you might want to:
    // 1. Save the inquiry to a database
    // 2. Send an email notification to the bakery
    // 3. Send an auto-reply email to the customer
    // 4. Use WhatsApp Business API to send the message automatically

    // For now, we'll just return success with the WhatsApp URL
    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
      whatsappUrl,
    }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return {
      success: false,
      message: "Sorry, there was an error processing your message. Please try again.",
    }
  }
}
