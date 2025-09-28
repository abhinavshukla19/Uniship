import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

function Help() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)

  const faqs = [
    {
      id: 1,
      question: "How do I create a new shipment?",
      answer: "To create a new shipment, click on 'Create Shipment' in the navigation menu or dashboard. Fill in the sender and recipient details, package information, and select your preferred service type. Review your information and submit the shipment."
    },
    {
      id: 2,
      question: "How can I track my package?",
      answer: "You can track your package by going to the 'Track Package' page and entering your tracking number. You'll see real-time updates on your package's location and delivery status."
    },
    {
      id: 3,
      question: "What are the different service types available?",
      answer: "We offer Standard Delivery (3-5 business days), Express Delivery (1-2 business days), Overnight Delivery (next business day), and Same Day Delivery (within the same day for local deliveries)."
    },
    {
      id: 4,
      question: "How do I update my profile information?",
      answer: "Go to your Profile page from the navigation menu. You can update your personal information, address, and contact details. Make sure to save your changes before leaving the page."
    },
    {
      id: 5,
      question: "What should I do if my package is delayed?",
      answer: "If your package is delayed, you can contact our customer support team. We'll investigate the delay and provide you with updated delivery information. Most delays are due to weather conditions or high package volumes."
    },
    {
      id: 6,
      question: "How do I cancel a shipment?",
      answer: "You can cancel a shipment if it hasn't been picked up yet. Go to your shipment details and look for the cancel option. Note that cancellation fees may apply depending on the service type and timing."
    }
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      contact: "+1 (555) 123-4567",
      hours: "24/7 Available"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      contact: "support@uniship.com",
      hours: "Response within 24 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Available on website",
      hours: "Mon-Fri 9AM-6PM EST"
    }
  ]

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Help & Support</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
        </motion.div>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for help topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
      </motion.div>

      {/* Contact Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {contactMethods.map((method, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <method.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
              <p className="text-muted-foreground mb-3">{method.description}</p>
              <p className="font-medium text-foreground mb-1">{method.contact}</p>
              <p className="text-sm text-muted-foreground">{method.hours}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-6 w-6" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Find quick answers to the most common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No FAQs found matching your search.</p>
                </div>
              ) : (
                filteredFaqs.map((faq) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border border-border rounded-lg"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium text-foreground">{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 pb-4"
                      >
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Shipping Guidelines</CardTitle>
            <CardDescription>
              Learn about our packaging requirements and shipping policies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Package weight limits and dimensions</li>
              <li>• Prohibited items list</li>
              <li>• Insurance options</li>
              <li>• International shipping requirements</li>
            </ul>
            <Button variant="outline" className="mt-4">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Guidelines
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
            <CardDescription>
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Update personal information</li>
              <li>• Manage payment methods</li>
              <li>• Set delivery preferences</li>
              <li>• View shipping history</li>
            </ul>
            <Button variant="outline" className="mt-4">
              <ExternalLink className="h-4 w-4 mr-2" />
              Manage Account
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Help
