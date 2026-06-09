import { useState } from "react";
import { Header } from "../components/Header";
import { VehicleCard } from "../components/VehicleCard";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { Filter } from "lucide-react";

const vehicles = [
  {
    id: 1,
    name: "Tesla Model Y",
    category: "Electric SUV",
    image: "https://images.unsplash.com/photo-1571987502227-9231b837d92a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUZXNsYSUyME1vZGVsJTIwWSUyMGVsZWN0cmljfGVufDF8fHx8MTc4MDk1NTA4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    dailyRate: 450,
    weeklyRate: 2800,
    monthlyRate: 9500,
    passengers: 5,
    luggage: 3,
    fuelType: "Electric",
    features: ["GPS", "Sunroof", "4x4"],
    loyaltyPoints: 450,
  },
  {
    id: 2,
    name: "BMW 7 Series",
    category: "Luxury Sedan",
    image: "https://images.unsplash.com/photo-1627936354732-ffbe552799d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCTVclMjA3JTIwU2VyaWVzJTIwbHV4dXJ5JTIwc2VkYW58ZW58MXx8fHwxNzgwOTU1MDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    dailyRate: 650,
    weeklyRate: 4000,
    monthlyRate: 14000,
    passengers: 5,
    luggage: 2,
    fuelType: "Hybrid",
    features: ["GPS", "Sunroof"],
    loyaltyPoints: 650,
  },
  {
    id: 3,
    name: "Land Rover Defender",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1730830812273-12c0a8a98092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMYW5kJTIwUm92ZXIlMjBEZWZlbmRlciUyMFNVVnxlbnwxfHx8fDE3ODA5NTUwODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    dailyRate: 550,
    weeklyRate: 3400,
    monthlyRate: 12000,
    passengers: 7,
    luggage: 4,
    fuelType: "Gas",
    features: ["GPS", "4x4"],
    loyaltyPoints: 550,
  },
  {
    id: 4,
    name: "Mercedes S-Class",
    category: "Luxury Sedan",
    image: "https://images.unsplash.com/photo-1624085568108-36410cfe4d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZXJjZWRlcyUyMFMtQ2xhc3MlMjBsdXh1cnl8ZW58MXx8fHwxNzgwOTU1MDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    dailyRate: 700,
    weeklyRate: 4300,
    monthlyRate: 15000,
    passengers: 5,
    luggage: 2,
    fuelType: "Gas",
    features: ["GPS", "Sunroof"],
    loyaltyPoints: 700,
  },
  {
    id: 5,
    name: "Porsche Cayenne",
    category: "Luxury SUV",
    image: "https://images.unsplash.com/photo-1699325974549-fd06639650aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQb3JzY2hlJTIwQ2F5ZW5uZSUyMHNwb3J0JTIwU1VWfGVufDF8fHx8MTc4MDk1NTA4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    dailyRate: 600,
    weeklyRate: 3700,
    monthlyRate: 13000,
    passengers: 5,
    luggage: 3,
    fuelType: "Hybrid",
    features: ["GPS", "Sunroof", "4x4"],
    loyaltyPoints: 600,
  },
  {
    id: 6,
    name: "Range Rover Sport",
    category: "Luxury SUV",
    image: "https://images.unsplash.com/photo-1549632891-a0bea6d0355b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSYW5nZSUyMFJvdmVyJTIwbHV4dXJ5JTIwU1VWfGVufDF8fHx8MTc4MDk1NTA4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    dailyRate: 580,
    weeklyRate: 3600,
    monthlyRate: 12500,
    passengers: 7,
    luggage: 4,
    fuelType: "Gas",
    features: ["GPS", "Sunroof", "4x4"],
    loyaltyPoints: 580,
  },
];

export function Vehicles() {
  const [priceRange, setPriceRange] = useState([200, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFuel, setSelectedFuel] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFilter = (value: string, filters: string[], setFilters: (v: string[]) => void) => {
    if (filters.includes(value)) {
      setFilters(filters.filter((f) => f !== value));
    } else {
      setFilters([...filters, value]);
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const priceMatch = vehicle.dailyRate >= priceRange[0] && vehicle.dailyRate <= priceRange[1];
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(cat => vehicle.category.includes(cat));
    const fuelMatch = selectedFuel.length === 0 || selectedFuel.includes(vehicle.fuelType);
    const featureMatch = selectedFeatures.length === 0 || selectedFeatures.every(feat => vehicle.features.includes(feat));
    
    return priceMatch && categoryMatch && fuelMatch && featureMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Available Vehicles</h1>
          <p className="text-slate-600">
            {filteredVehicles.length} premium vehicles ready for you
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 backdrop-blur-xl bg-white/80 rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-[#1E40AF]" />
                <h2 className="font-semibold">Filters</h2>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <Label className="mb-4 block">Price Range (Daily)</Label>
                <Slider
                  min={200}
                  max={1000}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>AED {priceRange[0]}</span>
                  <span>AED {priceRange[1]}</span>
                </div>
              </div>

              {/* Category Filters */}
              <div className="mb-8">
                <Label className="mb-4 block">Category</Label>
                <div className="space-y-3">
                  {["SUV", "Luxury", "Sedan", "Electric"].map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`cat-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() =>
                          toggleFilter(category, selectedCategories, setSelectedCategories)
                        }
                      />
                      <label
                        htmlFor={`cat-${category}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fuel Type */}
              <div className="mb-8">
                <Label className="mb-4 block">Fuel Type</Label>
                <div className="space-y-3">
                  {["Electric", "Hybrid", "Gas"].map((fuel) => (
                    <div key={fuel} className="flex items-center">
                      <Checkbox
                        id={`fuel-${fuel}`}
                        checked={selectedFuel.includes(fuel)}
                        onCheckedChange={() =>
                          toggleFilter(fuel, selectedFuel, setSelectedFuel)
                        }
                      />
                      <label
                        htmlFor={`fuel-${fuel}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {fuel}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <Label className="mb-4 block">Features</Label>
                <div className="space-y-3">
                  {["GPS", "Sunroof", "4x4"].map((feature) => (
                    <div key={feature} className="flex items-center">
                      <Checkbox
                        id={`feat-${feature}`}
                        checked={selectedFeatures.includes(feature)}
                        onCheckedChange={() =>
                          toggleFilter(feature, selectedFeatures, setSelectedFeatures)
                        }
                      />
                      <label
                        htmlFor={`feat-${feature}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Vehicle Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
