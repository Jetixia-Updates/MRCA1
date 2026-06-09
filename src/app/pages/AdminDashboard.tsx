import { useState } from "react";
import {
  Car,
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Settings,
  Receipt,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  Wrench,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";

const fleetData = [
  {
    id: 1,
    model: "Tesla Model Y",
    plate: "A-12345",
    location: "Dubai Mall",
    status: "Active",
    salikStatus: "Synced",
    fines: 0,
  },
  {
    id: 2,
    model: "BMW 7 Series",
    plate: "B-67890",
    location: "Abu Dhabi Airport",
    status: "Booked",
    salikStatus: "Synced",
    fines: 2,
  },
  {
    id: 3,
    model: "Land Rover Defender",
    plate: "C-24680",
    location: "Sharjah Office",
    status: "Maintenance",
    salikStatus: "Pending",
    fines: 0,
  },
  {
    id: 4,
    model: "Mercedes S-Class",
    plate: "D-13579",
    location: "Dubai Marina",
    status: "Active",
    salikStatus: "Synced",
    fines: 1,
  },
  {
    id: 5,
    model: "Porsche Cayenne",
    plate: "E-97531",
    location: "JBR Beach",
    status: "Booked",
    salikStatus: "Synced",
    fines: 0,
  },
  {
    id: 6,
    model: "Range Rover Sport",
    plate: "F-86420",
    location: "Dubai Airport",
    status: "Active",
    salikStatus: "Synced",
    fines: 0,
  },
];

const bookings = [
  {
    id: 1,
    customer: "Ahmed Al-Mansoori",
    vehicle: "Tesla Model Y",
    pickup: "2026-06-10",
    dropoff: "2026-06-15",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Sarah Johnson",
    vehicle: "BMW 7 Series",
    pickup: "2026-06-09",
    dropoff: "2026-06-16",
    status: "In Progress",
  },
  {
    id: 3,
    customer: "Mohammed Hassan",
    vehicle: "Porsche Cayenne",
    pickup: "2026-06-12",
    dropoff: "2026-06-20",
    status: "Pending",
  },
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Booked":
        return "bg-blue-500";
      case "Maintenance":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4" />;
      case "Booked":
        return <Clock className="h-4 w-4" />;
      case "Maintenance":
        return <Wrench className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen backdrop-blur-xl bg-slate-900/90 border-r border-slate-700/50">
          <div className="p-6">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-gradient-to-br from-[#EF4444] to-[#1E40AF] p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="block font-bold text-lg leading-tight text-white">MAXIMUM</span>
                <span className="block text-xs text-slate-400">Rent a Car</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {[
                { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
                { icon: Car, label: "Fleet", id: "fleet" },
                { icon: Calendar, label: "Bookings", id: "bookings" },
                { icon: Receipt, label: "Salik & Fines", id: "salik" },
                { icon: Users, label: "Customers", id: "customers" },
                { icon: FileText, label: "Reports", id: "reports" },
                { icon: Settings, label: "Settings", id: "settings" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-[#EF4444] to-[#1E40AF] text-white"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <header className="backdrop-blur-xl bg-slate-900/50 border-b border-slate-700/50 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">MAXIMUM FLEET MANAGER</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-white">Admin User</div>
                  <div className="text-xs text-slate-400">admin@maximum.ae</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EF4444] to-[#1E40AF] flex items-center justify-center text-white font-medium">
                  AD
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-8">
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="p-6 backdrop-blur-xl bg-slate-800/50 border-slate-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EF4444] to-[#1E40AF] flex items-center justify-center">
                        <Car className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        +12%
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">486</div>
                    <div className="text-sm text-slate-400">Total Active Fleet</div>
                  </Card>

                  <Card className="p-6 backdrop-blur-xl bg-slate-800/50 border-slate-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EF4444] to-[#1E40AF] flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        Today
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">24</div>
                    <div className="text-sm text-slate-400">Pending Bookings</div>
                  </Card>

                  <Card className="p-6 backdrop-blur-xl bg-slate-800/50 border-slate-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EF4444] to-[#1E40AF] flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        Live
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">18</div>
                    <div className="text-sm text-slate-400">Today's Check-ins</div>
                  </Card>

                  <Card className="p-6 backdrop-blur-xl bg-slate-800/50 border-slate-700/50">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EF4444] to-[#1E40AF] flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                        Alerts
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">7</div>
                    <div className="text-sm text-slate-400">Salik & Fines Alerts</div>
                  </Card>
                </div>

                {/* Fleet Map */}
                <Card className="p-6 backdrop-blur-xl bg-slate-800/50 border-slate-700/50">
                  <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#1E40AF]" />
                    Real-time Fleet Map (UAE)
                  </h2>
                  <div className="bg-slate-900/50 rounded-lg h-96 flex items-center justify-center border border-slate-700/30">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">Interactive GPS Fleet Map</p>
                      <p className="text-sm text-slate-500 mt-2">
                        Real-time vehicle positions across UAE
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6 backdrop-blur-xl bg-slate-800/50 border-slate-700/50">
                    <h2 className="font-semibold text-white mb-4">Fleet Utilization</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-slate-400">Active Rentals</span>
                          <span className="text-white font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-slate-400">Available</span>
                          <span className="text-white font-medium">18%</span>
                        </div>
                        <Progress value={18} className="h-2 bg-slate-700" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-slate-400">Maintenance</span>
                          <span className="text-white font-medium">4%</span>
                        </div>
                        <Progress value={4} className="h-2 bg-slate-700" />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 backdrop-blur-xl bg-slate-800/50 border-slate-700/50">
                    <h2 className="font-semibold text-white mb-4">Document Validation Queue</h2>
                    <div className="space-y-3">
                      {[
                        { name: "Ahmed Al-Mansoori", doc: "License", status: "Pending" },
                        { name: "Sarah Johnson", doc: "Passport", status: "Review" },
                        { name: "Mohammed Hassan", doc: "License", status: "Approved" },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg"
                        >
                          <div>
                            <div className="text-sm font-medium text-white">{item.name}</div>
                            <div className="text-xs text-slate-400">{item.doc} Verification</div>
                          </div>
                          <Badge
                            variant={item.status === "Approved" ? "default" : "outline"}
                            className={
                              item.status === "Approved"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4 bg-[#1E40AF] hover:bg-[#1E40AF]/90">
                      View All Documents
                    </Button>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "fleet" && (
              <div>
                <Card className="backdrop-blur-xl bg-slate-800/50 border-slate-700/50">
                  <div className="p-6">
                    <h2 className="font-semibold text-white mb-4">Fleet Status</h2>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-700/50 hover:bg-slate-700/20">
                          <TableHead className="text-slate-300">Car Model</TableHead>
                          <TableHead className="text-slate-300">UAE License Plate</TableHead>
                          <TableHead className="text-slate-300">Location</TableHead>
                          <TableHead className="text-slate-300">Status</TableHead>
                          <TableHead className="text-slate-300">Salik Tag</TableHead>
                          <TableHead className="text-slate-300">Fines</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fleetData.map((vehicle) => (
                          <TableRow
                            key={vehicle.id}
                            className="border-slate-700/50 hover:bg-slate-700/20"
                          >
                            <TableCell className="font-medium text-white">
                              {vehicle.model}
                            </TableCell>
                            <TableCell className="text-slate-300">{vehicle.plate}</TableCell>
                            <TableCell className="text-slate-300">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-[#1E40AF]" />
                                {vehicle.location}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${getStatusColor(vehicle.status)} text-white border-0`}
                              >
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(vehicle.status)}
                                  {vehicle.status}
                                </div>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  vehicle.salikStatus === "Synced"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                }
                              >
                                {vehicle.salikStatus}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-white">
                              {vehicle.fines > 0 ? (
                                <span className="text-red-400 font-medium">{vehicle.fines}</span>
                              ) : (
                                <span className="text-green-400">0</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "bookings" && (
              <div>
                <Card className="backdrop-blur-xl bg-slate-800/50 border-slate-700/50">
                  <div className="p-6">
                    <h2 className="font-semibold text-white mb-4">Recent Bookings</h2>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-700/50 hover:bg-slate-700/20">
                          <TableHead className="text-slate-300">Customer</TableHead>
                          <TableHead className="text-slate-300">Vehicle</TableHead>
                          <TableHead className="text-slate-300">Pick-up Date</TableHead>
                          <TableHead className="text-slate-300">Drop-off Date</TableHead>
                          <TableHead className="text-slate-300">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow
                            key={booking.id}
                            className="border-slate-700/50 hover:bg-slate-700/20"
                          >
                            <TableCell className="font-medium text-white">
                              {booking.customer}
                            </TableCell>
                            <TableCell className="text-slate-300">{booking.vehicle}</TableCell>
                            <TableCell className="text-slate-300">{booking.pickup}</TableCell>
                            <TableCell className="text-slate-300">{booking.dropoff}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  booking.status === "Confirmed"
                                    ? "bg-green-500 text-white"
                                    : booking.status === "In Progress"
                                    ? "bg-blue-500 text-white"
                                    : "bg-yellow-500 text-white"
                                }
                              >
                                {booking.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "salik" && (
              <div className="space-y-6">
                <Card className="p-6 backdrop-blur-xl bg-slate-800/50 border-slate-700/50">
                  <h2 className="font-semibold text-white mb-4">Salik & Fines Overview</h2>
                  <p className="text-slate-400 mb-4">
                    Real-time synchronization with UAE traffic authorities
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900/30 rounded-lg">
                      <div className="text-2xl font-bold text-white mb-1">AED 12,450</div>
                      <div className="text-sm text-slate-400">Total Salik This Month</div>
                    </div>
                    <div className="p-4 bg-slate-900/30 rounded-lg">
                      <div className="text-2xl font-bold text-orange-400 mb-1">7</div>
                      <div className="text-sm text-slate-400">Pending Fines</div>
                    </div>
                    <div className="p-4 bg-slate-900/30 rounded-lg">
                      <div className="text-2xl font-bold text-green-400 mb-1">98%</div>
                      <div className="text-sm text-slate-400">Tags Synced</div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
