'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { 
  Mail, MapPin, Phone, MessageCircle, Send, 
  CheckCircle, AlertCircle, Loader2, Clock 
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-oat">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest via-[#1A3626] to-[#0F2418] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="font-heading text-2xl font-bold text-forest mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-terracotta to-terracotta-dark p-3 rounded-lg flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-forest mb-1">Email</h3>
                      <p className="text-gray-600">support@rethread.com</p>
                      <p className="text-gray-600">hello@rethread.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-forest to-forest-light p-3 rounded-lg flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-forest mb-1">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Mon-Fri 9am-6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-forest mb-1">Location</h3>
                      <p className="text-gray-600">123 Sustainable Street</p>
                      <p className="text-gray-600">Dhaka, Bangladesh</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-lg flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-forest mb-1">Response Time</h3>
                      <p className="text-gray-600">Within 24 hours</p>
                      <p className="text-sm text-gray-500">Business days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-terracotta to-terracotta-dark rounded-2xl shadow-lg p-8 text-white">
                <h3 className="font-heading text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li><a href="/faq" className="hover:text-white/80 transition">FAQ</a></li>
                  <li><a href="/help" className="hover:text-white/80 transition">Help Center</a></li>
                  <li><a href="/privacy" className="hover:text-white/80 transition">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-white/80 transition">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
                <h2 className="font-heading text-3xl font-bold text-forest mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  We're here to help! Fill out the form below and we'll get back to you soon.
                </p>

                {success && (
                  <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Message sent successfully!</p>
                      <p className="text-sm">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-terracotta to-terracotta-dark hover:from-terracotta-dark hover:to-terracotta text-white py-4 rounded-lg font-bold text-lg transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
            {/* Interactive Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-oat to-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-8">
              <MapPin className="w-16 h-16 text-terracotta mx-auto mb-4" />
              <h2 className="font-heading text-3xl font-bold text-forest mb-4">
                Visit Our Office
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're located in the heart of Mohakhali, Dhaka. Come say hello and learn more about our mission to make fashion sustainable.
              </p>
            </div>

            {/* Interactive Map Container */}
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233659.6356363828!2d90.2791!3d23.7808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c804a8f0b5f1%3A0x6e0e0e0e0e0e0e0e!2sMohakhali%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ReThread Office Location - Mohakhali, Dhaka"
                className="w-full"
              ></iframe>
            </div>

            {/* Location Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
                <MapPin className="w-8 h-8 text-terracotta mx-auto mb-3" />
                <h3 className="font-semibold text-forest mb-2">Address</h3>
                <p className="text-gray-600 text-sm">
                  House #12, Road #5<br />
                  Mohakhali DOHS<br />
                  Dhaka 1206, Bangladesh
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
                <Clock className="w-8 h-8 text-terracotta mx-auto mb-3" />
                <h3 className="font-semibold text-forest mb-2">Office Hours</h3>
                <p className="text-gray-600 text-sm">
                  Sunday - Thursday<br />
                  9:00 AM - 6:00 PM<br />
                  (Closed on Friday & Saturday)
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
                <Phone className="w-8 h-8 text-terracotta mx-auto mb-3" />
                <h3 className="font-semibold text-forest mb-2">Contact</h3>
                <p className="text-gray-600 text-sm">
                  +880 1XXX-XXXXXX<br />
                  support@rethread.com<br />
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            {/* Directions Button */}
            <div className="text-center mt-8">
              <a
                href="https://www.google.com/maps/dir//Mohakhali,+Dhaka/@23.7808,90.2791,15z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-terracotta to-terracotta-dark hover:from-terracotta-dark hover:to-terracotta text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl"
              >
                <MapPin className="w-5 h-5" />
                Get Directions on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}