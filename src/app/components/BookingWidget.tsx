import { useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useNavigate } from "react-router";

export function BookingWidget() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleSearch = () => {
    navigate("/vehicles");
  };

  return (
    <div className="w-full max-w-4xl backdrop-blur-xl bg-white/70 rounded-2xl shadow-2xl border border-white/20 p-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-[#1E40AF] text-white' : 'bg-slate-200 text-slate-600'}`}>
            1
          </div>
          <span className="text-sm font-medium">Location</span>
        </div>
        <div className="flex-1 h-0.5 bg-slate-200 mx-4" />
        <div className="flex items-center gap-2">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-[#1E40AF] text-white' : 'bg-slate-200 text-slate-600'}`}>
            2
          </div>
          <span className="text-sm font-medium">Date & Time</span>
        </div>
        <div className="flex-1 h-0.5 bg-slate-200 mx-4" />
        <div className="flex items-center gap-2">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-[#1E40AF] text-white' : 'bg-slate-200 text-slate-600'}`}>
            3
          </div>
          <span className="text-sm font-medium">Preferences</span>
        </div>
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="pickup" className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-[#1E40AF]" />
                Pick-up Location
              </Label>
              <Input
                id="pickup"
                placeholder="Dubai International Airport"
                className="bg-white/50 backdrop-blur-sm border-slate-200"
              />
            </div>
            <div>
              <Label htmlFor="dropoff" className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-[#EF4444]" />
                Drop-off Location
              </Label>
              <Input
                id="dropoff"
                placeholder="Same as pick-up"
                className="bg-white/50 backdrop-blur-sm border-slate-200"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setStep(2)} className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
              Next: Date & Time
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="pickup-date" className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-[#1E40AF]" />
                Pick-up Date
              </Label>
              <Input
                id="pickup-date"
                type="date"
                className="bg-white/50 backdrop-blur-sm border-slate-200"
              />
            </div>
            <div>
              <Label htmlFor="pickup-time" className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-[#1E40AF]" />
                Pick-up Time
              </Label>
              <Input
                id="pickup-time"
                type="time"
                className="bg-white/50 backdrop-blur-sm border-slate-200"
              />
            </div>
            <div>
              <Label htmlFor="dropoff-date" className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-[#EF4444]" />
                Drop-off Date
              </Label>
              <Input
                id="dropoff-date"
                type="date"
                className="bg-white/50 backdrop-blur-sm border-slate-200"
              />
            </div>
            <div>
              <Label htmlFor="dropoff-time" className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-[#EF4444]" />
                Drop-off Time
              </Label>
              <Input
                id="dropoff-time"
                type="time"
                className="bg-white/50 backdrop-blur-sm border-slate-200"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={() => setStep(3)} className="bg-[#1E40AF] hover:bg-[#1E40AF]/90">
              Next: Preferences
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="font-semibold mb-2">Select Your Rate</h3>
            <p className="text-sm text-slate-600">Dynamic Inventory</p>
          </div>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="mt-6">
              <div className="text-center p-6 bg-white/50 rounded-lg">
                <div className="text-3xl font-bold text-[#1E40AF]">AED 250</div>
                <div className="text-sm text-slate-600">per day</div>
              </div>
            </TabsContent>
            <TabsContent value="weekly" className="mt-6">
              <div className="text-center p-6 bg-white/50 rounded-lg">
                <div className="text-3xl font-bold text-[#1E40AF]">AED 1,500</div>
                <div className="text-sm text-slate-600">per week (Save 14%)</div>
              </div>
            </TabsContent>
            <TabsContent value="monthly" className="mt-6">
              <div className="text-center p-6 bg-white/50 rounded-lg">
                <div className="text-3xl font-bold text-[#1E40AF]">AED 5,000</div>
                <div className="text-sm text-slate-600">per month (Save 33%)</div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button onClick={handleSearch} className="bg-[#EF4444] hover:bg-[#EF4444]/90">
              Search Vehicles
            </Button>
          </div>
        </div>
      )}

      {/* API-driven pricing note */}
      <div className="mt-6 text-center text-xs text-slate-500">
        API-driven pricing • Real-time availability
      </div>
    </div>
  );
}
