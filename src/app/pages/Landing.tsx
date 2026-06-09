import { Header } from "../components/Header";
import { BookingWidget } from "../components/BookingWidget";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Award, Shield, Clock, Star } from "lucide-react";
import { Card } from "../components/ui/card";

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1637189315455-3e7e629a05b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGx1eHVyeSUyMFNVViUyMGRlc2VydHxlbnwxfHx8fDE3ODA5NTUwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury white SUV"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-slate-900/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-2xl mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Premium Car.<br />
              Maximum Experience.
            </h1>
            <p className="text-xl text-slate-200">
              Discover luxury car rentals in the UAE with unmatched service and competitive rates.
            </p>
          </div>

          {/* Booking Widget */}
          <BookingWidget />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 backdrop-blur-sm bg-white/80 border-slate-200/50 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EF4444] to-[#1E40AF] flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">M-Gold Rewards</h3>
            <p className="text-sm text-slate-600">
              Earn points on every rental and unlock exclusive benefits.
            </p>
          </Card>

          <Card className="p-6 backdrop-blur-sm bg-white/80 border-slate-200/50 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EF4444] to-[#1E40AF] flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Full Insurance</h3>
            <p className="text-sm text-slate-600">
              Comprehensive coverage included with every rental.
            </p>
          </Card>

          <Card className="p-6 backdrop-blur-sm bg-white/80 border-slate-200/50 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EF4444] to-[#1E40AF] flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">24/7 Support</h3>
            <p className="text-sm text-slate-600">
              Round-the-clock assistance for your peace of mind.
            </p>
          </Card>

          <Card className="p-6 backdrop-blur-sm bg-white/80 border-slate-200/50 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EF4444] to-[#1E40AF] flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Premium Fleet</h3>
            <p className="text-sm text-slate-600">
              Latest models from top luxury brands.
            </p>
          </Card>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Maximum?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Experience the difference with our premium car rental service in the UAE
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-[#1E40AF] mb-2">500+</div>
              <div className="text-lg font-semibold mb-2">Premium Vehicles</div>
              <p className="text-slate-600">
                From luxury sedans to spacious SUVs, find your perfect ride.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-[#1E40AF] mb-2">50K+</div>
              <div className="text-lg font-semibold mb-2">Happy Customers</div>
              <p className="text-slate-600">
                Join thousands of satisfied customers who trust Maximum.
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/70 rounded-2xl p-8 border border-white/20">
              <div className="text-5xl font-bold text-[#1E40AF] mb-2">15+</div>
              <div className="text-lg font-semibold mb-2">UAE Locations</div>
              <p className="text-slate-600">
                Convenient pick-up and drop-off across the Emirates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
