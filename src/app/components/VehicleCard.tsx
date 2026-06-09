import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Users, Luggage, Fuel, Zap, Navigation, Sun } from "lucide-react";

interface VehicleCardProps {
  name: string;
  category: string;
  image: string;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  passengers: number;
  luggage: number;
  fuelType: string;
  features: string[];
  loyaltyPoints: number;
}

export function VehicleCard({
  name,
  category,
  image,
  dailyRate,
  weeklyRate,
  monthlyRate,
  passengers,
  luggage,
  fuelType,
  features,
  loyaltyPoints,
}: VehicleCardProps) {
  return (
    <div className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-shadow">
      {/* Vehicle Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-4 left-4 bg-[#1E40AF] text-white">
          {category}
        </Badge>
        {fuelType === "Electric" && (
          <Badge className="absolute top-4 right-4 bg-green-500 text-white flex items-center gap-1">
            <Zap className="h-3 w-3" />
            EV
          </Badge>
        )}
      </div>

      {/* Vehicle Details */}
      <div className="p-6">
        <h3 className="font-bold text-xl mb-4">{name}</h3>

        {/* Specifications */}
        <div className="grid grid-cols-3 gap-3 mb-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[#1E40AF]" />
            <span>{passengers}</span>
          </div>
          <div className="flex items-center gap-2">
            <Luggage className="h-4 w-4 text-[#1E40AF]" />
            <span>{luggage}</span>
          </div>
          <div className="flex items-center gap-2">
            {fuelType === "Electric" ? (
              <Zap className="h-4 w-4 text-green-500" />
            ) : (
              <Fuel className="h-4 w-4 text-[#1E40AF]" />
            )}
            <span className="text-xs">{fuelType}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {features.includes("GPS") && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Navigation className="h-3 w-3" />
              GPS
            </Badge>
          )}
          {features.includes("Sunroof") && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Sun className="h-3 w-3" />
              Sunroof
            </Badge>
          )}
          {features.includes("4x4") && (
            <Badge variant="outline" className="text-xs">
              4x4
            </Badge>
          )}
        </div>

        {/* Pricing */}
        <Tabs defaultValue="daily" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily" className="text-xs">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="mt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1E40AF]">AED {dailyRate}</div>
              <div className="text-xs text-slate-600">per day</div>
            </div>
          </TabsContent>
          <TabsContent value="weekly" className="mt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1E40AF]">AED {weeklyRate}</div>
              <div className="text-xs text-slate-600">per week</div>
            </div>
          </TabsContent>
          <TabsContent value="monthly" className="mt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1E40AF]">AED {monthlyRate}</div>
              <div className="text-xs text-slate-600">per month</div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Loyalty Points */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-[#EF4444]/10 to-[#1E40AF]/10 rounded-lg">
          <span className="text-sm">Earn Points:</span>
          <span className="font-semibold text-[#1E40AF]">+{loyaltyPoints} M-Gold</span>
        </div>

        {/* Book Button */}
        <Button className="w-full bg-[#EF4444] hover:bg-[#EF4444]/90">
          Book Now
        </Button>

        {/* Inclusions */}
        <div className="mt-4 text-xs text-slate-600 text-center">
          Includes: Full Insurance • Roadside Assist • Free Cancellation
        </div>
      </div>
    </div>
  );
}
