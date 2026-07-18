'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { 
  Leaf, Target, Users, Award, Heart, Globe, 
  TrendingUp, Zap, CheckCircle, ArrowRight 
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-oat">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest via-[#1A3626] to-[#0F2418] text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
            About ReThread
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Making fashion sustainable and sustainability fashionable. 
            Join us in creating a better future for our planet.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-forest to-forest-light rounded-2xl p-10 text-white shadow-xl">
              <Target className="w-12 h-12 text-terracotta mb-6" />
              <h2 className="font-heading text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-200 leading-relaxed mb-6">
                To revolutionize the fashion industry by making sustainable choices accessible, 
                affordable, and desirable. We believe that pre-loved fashion can be just as 
                stylish as new items while significantly reducing environmental impact.
              </p>
              <ul className="space-y-3">
                {[
                  'Reduce textile waste and carbon emissions',
                  'Promote circular economy in fashion',
                  'Empower conscious consumerism'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-terracotta to-terracotta-dark rounded-2xl p-10 text-white shadow-xl">
              <Leaf className="w-12 h-12 text-white mb-6" />
              <h2 className="font-heading text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-white/90 leading-relaxed mb-6">
                A world where sustainable fashion is the norm, not the exception. 
                Where every purchase contributes to a healthier planet and supports 
                a thriving community of conscious consumers.
              </p>
              <ul className="space-y-3">
                {[
                  '1 million items saved from landfills by 2027',
                  '100,000+ active sustainable fashion lovers',
                  'Carbon-neutral operations by 2026'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-oat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Sustainability First',
                desc: 'Every decision we make prioritizes environmental impact. We measure our success not just in sales, but in water saved and CO₂ reduced.',
                color: 'from-green-500 to-emerald-600'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Community Driven',
                desc: 'We\'re building more than a marketplace - we\'re creating a community of conscious consumers who care about the planet.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Quality Assured',
                desc: 'Pre-loved doesn\'t mean compromised. We ensure every item meets high quality standards through verification and reviews.',
                color: 'from-terracotta to-terracotta-dark'
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Innovation',
                desc: 'Leveraging AI and technology to make sustainable fashion easier, smarter, and more accessible to everyone.',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'Transparency',
                desc: 'We believe in open communication about our impact, our processes, and our continuous improvement efforts.',
                color: 'from-cyan-500 to-cyan-600'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Continuous Growth',
                desc: 'Always learning, always improving. We evolve with our community\'s needs and the latest in sustainable practices.',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
                <div className={`bg-gradient-to-br ${value.color} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {value.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-forest mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-forest to-forest-light text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Our Impact So Far
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real numbers, real impact, real change
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '25K+', label: 'Items Listed', icon: <Leaf className="w-6 h-6" /> },
              { value: '10K+', label: 'Active Users', icon: <Users className="w-6 h-6" /> },
              { value: '2.5M L', label: 'Water Saved', icon: <Heart className="w-6 h-6" /> },
              { value: '150K kg', label: 'CO₂ Reduced', icon: <Globe className="w-6 h-6" /> }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-forest mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate individuals working towards a sustainable future
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Mitchell', role: 'Founder & CEO', bio: 'Fashion industry veteran with 15 years experience' },
              { name: 'David Chen', role: 'CTO', bio: 'Tech enthusiast passionate about sustainability' },
              { name: 'Emma Rodriguez', role: 'Head of Community', bio: 'Building connections between conscious consumers' }
            ].map((member, idx) => (
              <div key={idx} className="bg-oat rounded-2xl p-8 text-center border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-terracotta to-terracotta-dark rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-heading text-xl font-bold text-forest mb-1">{member.name}</h3>
                <p className="text-terracotta font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-terracotta to-terracotta-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Be part of the sustainable fashion revolution. Start buying, selling, and making a difference today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/explore"
              className="bg-white text-terracotta hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Explore Items
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/items/add"
              className="bg-forest hover:bg-forest-light text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}