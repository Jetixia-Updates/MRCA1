import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { MapPin, Calendar as CalendarIcon, Clock, Search } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/language";

export function BookingWidget() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/vehicles");
  };

  return (
    <Card className="backdrop-blur-xl bg-white/90 border-white/20 shadow-2xl p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#EF4444]' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-gradient-to-r from-[#EF4444] to-[#1E40AF] text-white' : 'bg-muted'}`}>
            1
          </div>
          <span className="hidden sm:inline">{t('Location')}</span>
        </div>
        <div className="flex-1 h-0.5 bg-muted">
          <div className={`h-full bg-gradient-to-r from-[#EF4444] to-[#1E40AF] transition-all ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
        </div>
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#1E40AF]' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-gradient-to-r from-[#EF4444] to-[#1E40AF] text-white' : 'bg-muted'}`}>
            2
          </div>
          <span className="hidden sm:inline">{t('Date & Time')}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-muted-foreground">{t('Dynamic Inventory')}</p>
        <p className="text-xs text-muted-foreground">{t('API-driven pricing')}</p>
      </div>

      <div className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="location" className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#EF4444]" />
                {t('Pick-up Location')}
              </Label>
              <Input
                id="location"
                placeholder={t('Dubai Marina, Downtown Dubai, Airport...')}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white/50 backdrop-blur-sm"
              />
            </div>

            <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center border border-slate-300/50">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-[#EF4444]" />
                <p className="text-sm">{t('Interactive Map View')}</p>
                <p className="text-xs">{t('UAE Locations')}</p>
              </div>
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full bg-gradient-to-r from-[#EF4444] to-[#1E40AF] hover:opacity-90"
              disabled={!location}
            >
              {t('Continue to Date Selection')}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <CalendarIcon className="w-4 h-4 text-[#EF4444]" />
                  {t('Pick-up Date')}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left bg-white/50 backdrop-blur-sm">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {pickupDate ? format(pickupDate, "PPP") : t('Select date')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 backdrop-blur-xl bg-white/95" align="start">
                    <Calendar mode="single" selected={pickupDate} onSelect={setPickupDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <CalendarIcon className="w-4 h-4 text-[#1E40AF]" />
                  {t('Return Date')}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left bg-white/50 backdrop-blur-sm">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP") : t('Select date')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 backdrop-blur-xl bg-white/95" align="start">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      disabled={(date) => pickupDate ? date < pickupDate : false}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-[#EF4444]" />
                  {t('Pick-up Time')}
                </Label>
                <Input type="time" defaultValue="10:00" className="bg-white/50 backdrop-blur-sm" />
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-[#1E40AF]" />
                  {t('Return Time')}
                </Label>
                <Input type="time" defaultValue="10:00" className="bg-white/50 backdrop-blur-sm" />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                {t('Back')}
              </Button>
              <Button
                onClick={handleSearch}
                className="flex-1 bg-gradient-to-r from-[#EF4444] to-[#1E40AF] hover:opacity-90"
                disabled={!pickupDate || !returnDate}
              >
                <Search className="w-4 h-4 mr-2" />
                {t('Search Vehicles')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
