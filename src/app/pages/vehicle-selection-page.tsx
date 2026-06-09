import { useState } from "react";
import { Header } from "../components/header";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { vehicles } from "../data/mock-data";
import { toast } from "sonner";
import {
  Car,
  Zap,
  Users,
  Settings,
  Award,
  Shield,
  MapPin,
  Fuel,
  Loader2
} from "lucide-react";
import { useLanguage } from "../contexts/language";

export function VehicleSelectionPage() {
  const { t } = useLanguage();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rateType, setRateType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleFuelType = (fuel: string) => {
    setSelectedFuelTypes(prev => 
      prev.includes(fuel) 
        ? prev.filter(f => f !== fuel)
        : [...prev, fuel]
    );
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(vehicle.category);
    const fuelMatch = selectedFuelTypes.length === 0 || selectedFuelTypes.includes(vehicle.fuel);
    const featureMatch = selectedFeatures.length === 0 || selectedFeatures.some(f => vehicle.features.includes(f));
    const priceMatch = vehicle.dailyRate >= priceRange[0] && vehicle.dailyRate <= priceRange[1];
    
    return categoryMatch && fuelMatch && featureMatch && priceMatch;
  });

  const getPrice = (vehicle: typeof vehicles[0]) => {
    switch (rateType) {
      case 'weekly': return vehicle.weeklyRate;
      case 'monthly': return vehicle.monthlyRate;
      default: return vehicle.dailyRate;
    }
  };

  const handleBookNow = (vehicle: typeof vehicles[0]) => {
    setSelectedVehicle(vehicle);
    setBookingDialogOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!customerName || !customerEmail || !customerPhone) {
      toast.error(t('Please fill in all required fields'));
      return;
    }

    setIsBooking(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsBooking(false);
    setBookingDialogOpen(false);

    toast.success(`${t('Booking confirmed for')} ${selectedVehicle?.name}!`, {
      description: `${t("You'll receive confirmation at")} ${customerEmail}`,
      duration: 5000,
    });

    // Reset form
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedFuelTypes([]);
    setSelectedFeatures([]);
    setPriceRange([0, 1000]);
    toast.info(t('Filters cleared'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-[#EF4444] to-[#1E40AF] bg-clip-text text-transparent">
            {t('Select Your Vehicle')}
          </h1>
          <p className="text-muted-foreground">
            {filteredVehicles.length} {t('premium vehicles available')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6 sticky top-24">
              <h3 className="mb-4">{t('Filters')}</h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="mb-3 flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#EF4444]" />
                  {t('Category')}
                </h4>
                <div className="space-y-2">
                  {['SUV', 'Luxury', 'Sedan', 'Electric'].map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label htmlFor={category} className="cursor-pointer">
                        {t(category)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fuel Type Filter */}
              <div className="mb-6">
                <h4 className="mb-3 flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-[#1E40AF]" />
                  {t('Fuel Type')}
                </h4>
                <div className="space-y-2">
                  {['EV', 'Hybrid', 'Gas'].map(fuel => (
                    <div key={fuel} className="flex items-center space-x-2">
                      <Checkbox
                        id={fuel}
                        checked={selectedFuelTypes.includes(fuel)}
                        onCheckedChange={() => toggleFuelType(fuel)}
                      />
                      <Label htmlFor={fuel} className="cursor-pointer">
                        {t(fuel)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Filter */}
              <div className="mb-6">
                <h4 className="mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[#EF4444]" />
                  {t('Features')}
                </h4>
                <div className="space-y-2">
                  {['Sunroof', 'GPS', '4x4'].map(feature => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={selectedFeatures.includes(feature)}
                        onCheckedChange={() => toggleFeature(feature)}
                      />
                      <Label htmlFor={feature} className="cursor-pointer">
                        {t(feature)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="mb-3">{t('Daily Price Range')}</h4>
                <Slider
                  min={0}
                  max={1000}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>AED {priceRange[0]}</span>
                  <span>AED {priceRange[1]}</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleClearFilters}
              >
                {t('Clear All Filters')}
              </Button>
            </Card>
          </aside>

          {/* Vehicle Grid */}
          <div className="lg:col-span-3">
            {/* Rate Type Toggle */}
            <div className="mb-6 flex justify-end">
              <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/70 border border-white/20 rounded-lg p-2 shadow-lg">
                <Button 
                  variant={rateType === 'daily' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setRateType('daily')}
                  className={rateType === 'daily' ? 'bg-gradient-to-r from-[#EF4444] to-[#1E40AF]' : ''}
                >
                  {t('Daily')}
                </Button>
                <Button
                  variant={rateType === 'weekly' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setRateType('weekly')}
                  className={rateType === 'weekly' ? 'bg-gradient-to-r from-[#EF4444] to-[#1E40AF]' : ''}
                >
                  {t('Weekly')}
                </Button>
                <Button
                  variant={rateType === 'monthly' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setRateType('monthly')}
                  className={rateType === 'monthly' ? 'bg-gradient-to-r from-[#EF4444] to-[#1E40AF]' : ''}
                >
                  {t('Monthly')}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVehicles.map(vehicle => (
                <Card 
                  key={vehicle.id} 
                  className="backdrop-blur-xl bg-white/90 border-white/20 overflow-hidden hover:shadow-2xl transition-all group"
                >
                  {/* Vehicle Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <Badge className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-foreground border-white/20">
                      {t(vehicle.category)}
                    </Badge>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="mb-1">{vehicle.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {vehicle.seats} {t('Seats')}
                          <span className="mx-1">•</span>
                          {t(vehicle.transmission)}
                        </div>
                      </div>
                      {vehicle.fuel === 'EV' && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                          <Zap className="w-3 h-3 mr-1" />
                          EV
                        </Badge>
                      )}
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {vehicle.features.slice(0, 3).map(feature => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {t(feature)}
                        </Badge>
                      ))}
                    </div>

                    {/* Price and Loyalty */}
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {t(rateType === 'daily' ? 'Per Day' : rateType === 'weekly' ? 'Per Week' : 'Per Month')}
                        </div>
                        <div className="text-2xl bg-gradient-to-r from-[#EF4444] to-[#1E40AF] bg-clip-text text-transparent">
                          AED {getPrice(vehicle)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-[#EF4444]">
                          <Award className="w-4 h-4" />
                          {vehicle.loyaltyPoints} {t('pts')}
                        </div>
                      </div>
                    </div>

                    {/* Inclusions */}
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Shield className="w-3 h-3 text-[#1E40AF]" />
                        {t('Insurance included • Free delivery • 24/7 support')}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-[#EF4444] to-[#1E40AF] hover:opacity-90"
                      onClick={() => handleBookNow(vehicle)}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {t('Book Now')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="text-center py-12">
                <Car className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="mb-2">{t('No vehicles found')}</h3>
                <p className="text-muted-foreground">{t('Try adjusting your filters')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="backdrop-blur-xl bg-white/95">
          <DialogHeader>
            <DialogTitle>{t('Complete Your Booking')}</DialogTitle>
            <DialogDescription>
              {selectedVehicle && (
                <>
                  {selectedVehicle.name} • AED {getPrice(selectedVehicle)} {t(rateType === 'daily' ? 'per day' : rateType === 'weekly' ? 'per week' : 'per month')}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">{t('Full Name *')}</Label>
              <Input
                id="name"
                placeholder="Ahmed Al Maktoum"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">{t('Email Address *')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="ahmed@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">{t('Phone Number *')}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+971 50 123 4567"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Shield className="w-4 h-4 text-[#1E40AF]" />
                <span>{t('Included with your booking:')}</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                <li>• {t('Comprehensive insurance coverage')}</li>
                <li>• {t('Free delivery & pickup')}</li>
                <li>• {t('24/7 roadside assistance')}</li>
                {selectedVehicle && (
                  <li>• {selectedVehicle.loyaltyPoints} {t('M-Gold loyalty points')}</li>
                )}
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setBookingDialogOpen(false)}
              disabled={isBooking}
            >
              {t('Cancel')}
            </Button>
            <Button
              className="bg-gradient-to-r from-[#EF4444] to-[#1E40AF]"
              onClick={handleConfirmBooking}
              disabled={isBooking}
            >
              {isBooking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isBooking ? t('Confirming...') : t('Confirm Booking')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
