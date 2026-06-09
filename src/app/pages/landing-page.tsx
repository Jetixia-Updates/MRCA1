import { useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/header";
import { BookingWidget } from "../components/booking-widget";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Shield, Star, Clock, Award } from "lucide-react";
import { useLanguage } from "../contexts/language";

export function LandingPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [pricingPeriod, setPricingPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1920&q=80"
            alt="Luxury white SUV"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-slate-100/60 to-white/80 backdrop-blur-sm"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-[#EF4444]/10 to-[#1E40AF]/10 border-[#EF4444]/20 text-foreground">
              {t("UAE's Premier Car Rental Service")}
            </Badge>
            <h1 className="text-5xl md:text-7xl mb-4 bg-gradient-to-r from-[#EF4444] to-[#1E40AF] bg-clip-text text-transparent">
              {t('Premium Car.')}
            </h1>
            <h2 className="text-4xl md:text-6xl mb-6">
              {t('Maximum Experience.')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('Drive the finest vehicles across Dubai, Abu Dhabi, and beyond. Luxury, comfort, and reliability in every journey.')}
            </p>
          </div>

          <BookingWidget />

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/70 border border-white/20 rounded-lg p-2 shadow-lg">
              <Button
                variant={pricingPeriod === 'daily' ? 'default' : 'ghost'}
                size="sm"
                className={pricingPeriod === 'daily' ? 'bg-gradient-to-r from-[#EF4444] to-[#1E40AF]' : ''}
                onClick={() => setPricingPeriod('daily')}
              >
                {t('Daily')}
              </Button>
              <Button
                variant={pricingPeriod === 'weekly' ? 'default' : 'ghost'}
                size="sm"
                className={pricingPeriod === 'weekly' ? 'bg-gradient-to-r from-[#EF4444] to-[#1E40AF]' : ''}
                onClick={() => setPricingPeriod('weekly')}
              >
                {t('Weekly')}
              </Button>
              <Button
                variant={pricingPeriod === 'monthly' ? 'default' : 'ghost'}
                size="sm"
                className={pricingPeriod === 'monthly' ? 'bg-gradient-to-r from-[#EF4444] to-[#1E40AF]' : ''}
                onClick={() => setPricingPeriod('monthly')}
              >
                {t('Monthly')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">{t('Why Choose Maximum?')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="backdrop-blur-xl bg-white/80 border-white/20 p-6 hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#EF4444]/10 to-[#1E40AF]/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#EF4444]" />
              </div>
              <h3 className="mb-2">{t('Full Insurance')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('Comprehensive coverage included with every rental. Drive with complete peace of mind.')}
              </p>
            </Card>

            <Card className="backdrop-blur-xl bg-white/80 border-white/20 p-6 hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#EF4444]/10 to-[#1E40AF]/10 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-[#1E40AF]" />
              </div>
              <h3 className="mb-2">{t('Premium Fleet')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('Latest models from Tesla, BMW, Mercedes, and more. Experience luxury on every drive.')}
              </p>
            </Card>

            <Card className="backdrop-blur-xl bg-white/80 border-white/20 p-6 hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#EF4444]/10 to-[#1E40AF]/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-[#EF4444]" />
              </div>
              <h3 className="mb-2">{t('24/7 Support')}</h3>
              <p className="text-sm text-muted-foreground">
                {t("Round-the-clock assistance whenever you need it. We're always here for you.")}
              </p>
            </Card>

            <Card className="backdrop-blur-xl bg-white/80 border-white/20 p-6 hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#EF4444]/10 to-[#1E40AF]/10 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[#1E40AF]" />
              </div>
              <h3 className="mb-2">{t('Loyalty Rewards')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('Earn M-Gold points with every rental. Unlock exclusive benefits and discounts.')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#EF4444]/5 to-[#1E40AF]/5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="mb-4">{t('Ready to Hit the Road?')}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('Book your perfect vehicle now and experience the Maximum difference.')}
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#EF4444] to-[#1E40AF] hover:opacity-90"
            onClick={() => navigate('/vehicles')}
          >
            {t('Browse Our Fleet')}
          </Button>
        </div>
      </section>
    </div>
  );
}
