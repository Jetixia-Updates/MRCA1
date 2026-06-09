import { useState } from "react";
import { Logo } from "../components/logo";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../components/ui/alert-dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { fleetVehicles, bookings } from "../data/mock-data";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Car,
  Calendar,
  DollarSign,
  Users,
  FileText,
  Settings,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  Home,
  Loader2,
  Search,
  Download,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router";
import { useLanguage } from "../contexts/language";

export function AdminDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [syncDialogOpen, setSyncDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [documentReviewOpen, setDocumentReviewOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const stats = {
    totalFleet: fleetVehicles.length,
    activeFleet: fleetVehicles.filter(v => v.status === 'Active').length,
    pendingBookings: bookings.filter(b => b.status === 'Pending').length,
    todayCheckins: 3,
    salikAlerts: fleetVehicles.filter(v => v.salikStatus !== 'Synced').length,
    totalFines: fleetVehicles.reduce((acc, v) => acc + v.fines, 0),
  };

  const handleViewVehicle = (vehicle: any) => {
    setSelectedItem(vehicle);
    setVehicleDialogOpen(true);
  };

  const handleManageBooking = (booking: any) => {
    setSelectedItem(booking);
    setBookingDialogOpen(true);
  };

  const handleApproveBooking = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setBookingDialogOpen(false);
    toast.success(t('Booking approved successfully'));
  };

  const handleRejectBooking = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setBookingDialogOpen(false);
    toast.error(t('Booking rejected'));
  };

  const handleSyncSalik = async (vehicle?: any) => {
    if (vehicle) {
      setSelectedItem(vehicle);
      setSyncDialogOpen(true);
    }
  };

  const handleConfirmSync = async () => {
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSyncing(false);
    setSyncDialogOpen(false);
    toast.success(t('Salik data synced successfully'), {
      description: t('Latest toll charges have been updated'),
    });
  };

  const handleReviewDocument = (doc: any) => {
    setSelectedDocument(doc);
    setDocumentReviewOpen(true);
  };

  const handleApproveDocument = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setDocumentReviewOpen(false);
    toast.success(t('Document approved'));
  };

  const handleRejectDocument = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setDocumentReviewOpen(false);
    toast.error(t('Document rejected'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 backdrop-blur-xl bg-white/90 border-r border-white/20 shadow-xl z-50">
        <div className="p-6 border-b border-white/20">
          <Logo />
        </div>
        
        <nav className="p-4">
          <div className="space-y-1">
            <Button
              variant={activeTab === "dashboard" ? "secondary" : "ghost"}
              className={`w-full justify-start ${activeTab === "dashboard" ? 'bg-gradient-to-r from-[#EF4444]/10 to-[#1E40AF]/10' : ''}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <LayoutDashboard className="w-4 h-4 mr-3" />
              {t('Dashboard')}
            </Button>

            <Button
              variant={activeTab === "fleet" ? "secondary" : "ghost"}
              className={`w-full justify-start ${activeTab === "fleet" ? 'bg-gradient-to-r from-[#EF4444]/10 to-[#1E40AF]/10' : ''}`}
              onClick={() => setActiveTab("fleet")}
            >
              <Car className="w-4 h-4 mr-3" />
              {t('Fleet')}
            </Button>

            <Button
              variant={activeTab === "bookings" ? "secondary" : "ghost"}
              className={`w-full justify-start ${activeTab === "bookings" ? 'bg-gradient-to-r from-[#EF4444]/10 to-[#1E40AF]/10' : ''}`}
              onClick={() => setActiveTab("bookings")}
            >
              <Calendar className="w-4 h-4 mr-3" />
              {t('Bookings')}
            </Button>

            <Button
              variant={activeTab === "salik" ? "secondary" : "ghost"}
              className={`w-full justify-start ${activeTab === "salik" ? 'bg-gradient-to-r from-[#EF4444]/10 to-[#1E40AF]/10' : ''}`}
              onClick={() => setActiveTab("salik")}
            >
              <DollarSign className="w-4 h-4 mr-3" />
              {t('Salik & Fines')}
            </Button>

            <Button
              variant={activeTab === "customers" ? "secondary" : "ghost"}
              className={`w-full justify-start ${activeTab === "customers" ? 'bg-gradient-to-r from-[#EF4444]/10 to-[#1E40AF]/10' : ''}`}
              onClick={() => setActiveTab("customers")}
            >
              <Users className="w-4 h-4 mr-3" />
              {t('Customers')}
            </Button>

            <Button
              variant={activeTab === "reports" ? "secondary" : "ghost"}
              className={`w-full justify-start ${activeTab === "reports" ? 'bg-gradient-to-r from-[#EF4444]/10 to-[#1E40AF]/10' : ''}`}
              onClick={() => setActiveTab("reports")}
            >
              <FileText className="w-4 h-4 mr-3" />
              {t('Reports')}
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <Settings className="w-4 h-4 mr-3" />
              {t('Settings')}
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                {t('Back to Site')}
              </Link>
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-[#EF4444] to-[#1E40AF] bg-clip-text text-transparent">
            {t('MAXIMUM FLEET MANAGER')}
          </h1>
        </div>

        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t('Total Active Fleet')}</span>
                  <Car className="w-5 h-5 text-[#EF4444]" />
                </div>
                <div className="text-3xl">{stats.activeFleet}</div>
                <p className="text-xs text-muted-foreground mt-1">{t('of')} {stats.totalFleet} {t('total')}</p>
              </Card>

              <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t('Pending Bookings')}</span>
                  <Calendar className="w-5 h-5 text-[#1E40AF]" />
                </div>
                <div className="text-3xl">{stats.pendingBookings}</div>
                <p className="text-xs text-muted-foreground mt-1">{t('awaiting approval')}</p>
              </Card>

              <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t("Today's Check-ins")}</span>
                  <Clock className="w-5 h-5 text-[#EF4444]" />
                </div>
                <div className="text-3xl">{stats.todayCheckins}</div>
                <p className="text-xs text-muted-foreground mt-1">{t('vehicles scheduled')}</p>
              </Card>

              <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t('Salik & Fines Alerts')}</span>
                  <AlertCircle className="w-5 h-5 text-[#1E40AF]" />
                </div>
                <div className="text-3xl text-[#EF4444]">{stats.salikAlerts}</div>
                <p className="text-xs text-muted-foreground mt-1">{t('Real-time syncing')}</p>
              </Card>
            </div>

            {/* Fleet Map */}
            <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
              <h3 className="mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#EF4444]" />
                {t('Fleet GPS Tracking - UAE')}
              </h3>
              <div className="h-96 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center border border-slate-300/50 relative overflow-hidden">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#EF4444] rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#1E40AF] rounded-full animate-pulse"></div>
                  <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-[#EF4444] rounded-full animate-pulse"></div>
                  <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-[#1E40AF] rounded-full animate-pulse"></div>
                </div>
                
                <div className="text-center text-muted-foreground z-10">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-[#EF4444]" />
                  <p className="mb-1">{t('Interactive GPS Map')}</p>
                  <p className="text-sm">{t('Real-time fleet tracking across Dubai, Abu Dhabi, Sharjah')}</p>
                  <div className="mt-4 flex items-center gap-4 justify-center text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {t('Active')}
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {t('Booked')}
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      {t('Maintenance')}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
                <h3 className="mb-4">{t('Recent Bookings')}</h3>
                <div className="space-y-3">
                  {bookings.slice(0, 4).map(booking => (
                    <div key={booking.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg">
                      <div>
                        <p className="font-medium">{booking.customerName}</p>
                        <p className="text-sm text-muted-foreground">{booking.vehicle}</p>
                      </div>
                      <Badge variant={
                        booking.status === 'Active' ? 'default' :
                        booking.status === 'Pending' ? 'secondary' :
                        'outline'
                      }>
                        {t(booking.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
                <h3 className="mb-4">{t('Document Validation Queue')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg">
                    <div>
                      <p className="font-medium">Ahmed Al Maktoum</p>
                      <p className="text-sm text-muted-foreground">{t('License & Emirates ID')}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReviewDocument({ name: 'Ahmed Al Maktoum', type: 'License & Emirates ID' })}
                      >
                        {t('Review')}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">{t('International License')}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReviewDocument({ name: 'Sarah Johnson', type: 'International License' })}
                      >
                        {t('Review')}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "fleet" && (
          <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
            <h3 className="mb-4">{t('Fleet Management')}</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('Model')}</TableHead>
                  <TableHead>{t('License Plate')}</TableHead>
                  <TableHead>{t('Location')}</TableHead>
                  <TableHead>{t('Status')}</TableHead>
                  <TableHead>{t('Salik')}</TableHead>
                  <TableHead>{t('Fines')}</TableHead>
                  <TableHead>{t('Actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fleetVehicles.map(vehicle => (
                  <TableRow key={vehicle.id}>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell className="font-mono text-sm">{vehicle.licensePlate}</TableCell>
                    <TableCell>{vehicle.location}</TableCell>
                    <TableCell>
                      <Badge variant={
                        vehicle.status === 'Active' ? 'default' :
                        vehicle.status === 'Booked' ? 'secondary' :
                        'outline'
                      }>
                        {t(vehicle.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {vehicle.salikStatus === 'Synced' ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{t('Synced')}</span>
                          </>
                        ) : vehicle.salikStatus === 'Pending' ? (
                          <>
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span className="text-sm">{t('Pending')}</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm">{t('Error')}</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {vehicle.fines > 0 ? (
                        <span className="text-[#EF4444]">AED {vehicle.fines}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewVehicle(vehicle)}
                      >
                        {t('View')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {activeTab === "bookings" && (
          <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
            <h3 className="mb-4">{t('Booking Management')}</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('ID')}</TableHead>
                  <TableHead>{t('Customer')}</TableHead>
                  <TableHead>{t('Vehicle')}</TableHead>
                  <TableHead>{t('Pick-up')}</TableHead>
                  <TableHead>{t('Return')}</TableHead>
                  <TableHead>{t('Amount')}</TableHead>
                  <TableHead>{t('Status')}</TableHead>
                  <TableHead>{t('Actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map(booking => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-mono text-sm">{booking.id}</TableCell>
                    <TableCell>{booking.customerName}</TableCell>
                    <TableCell>{booking.vehicle}</TableCell>
                    <TableCell>{booking.pickupDate}</TableCell>
                    <TableCell>{booking.returnDate}</TableCell>
                    <TableCell>AED {booking.totalAmount}</TableCell>
                    <TableCell>
                      <Badge variant={
                        booking.status === 'Active' ? 'default' :
                        booking.status === 'Pending' ? 'secondary' :
                        'outline'
                      }>
                        {t(booking.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleManageBooking(booking)}
                      >
                        {t('Manage')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        {activeTab === "salik" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t('Total Fines')}</span>
                  <DollarSign className="w-5 h-5 text-[#EF4444]" />
                </div>
                <div className="text-3xl">AED {stats.totalFines}</div>
              </Card>

              <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t('Pending Syncs')}</span>
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-3xl">{fleetVehicles.filter(v => v.salikStatus === 'Pending').length}</div>
              </Card>

              <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t('Sync Errors')}</span>
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <div className="text-3xl">{fleetVehicles.filter(v => v.salikStatus === 'Error').length}</div>
              </Card>
            </div>

            <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
              <h3 className="mb-4">{t('Salik & Fines Overview')}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t('Real-time syncing from RTA Account')}</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('Vehicle')}</TableHead>
                    <TableHead>{t('License Plate')}</TableHead>
                    <TableHead>{t('Salik Status')}</TableHead>
                    <TableHead>{t('Outstanding Fines')}</TableHead>
                    <TableHead>{t('Last Sync')}</TableHead>
                    <TableHead>{t('Actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fleetVehicles.filter(v => v.fines > 0 || v.salikStatus !== 'Synced').map(vehicle => (
                    <TableRow key={vehicle.id}>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell className="font-mono text-sm">{vehicle.licensePlate}</TableCell>
                      <TableCell>
                        <Badge variant={
                          vehicle.salikStatus === 'Synced' ? 'default' :
                          vehicle.salikStatus === 'Pending' ? 'secondary' :
                          'destructive'
                        }>
                          {t(vehicle.salikStatus)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {vehicle.fines > 0 ? (
                          <span className="text-[#EF4444]">AED {vehicle.fines}</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{t('2 hours ago')}</TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSyncSalik(vehicle)}
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          {t('Sync Now')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

        {activeTab === "customers" && (
          <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
            <h3 className="mb-4">{t('Customer Management')}</h3>
            <p className="text-muted-foreground">{t('Customer database and management tools will be displayed here.')}</p>
          </Card>
        )}

        {activeTab === "reports" && (
          <Card className="backdrop-blur-xl bg-white/90 border-white/20 p-6">
            <h3 className="mb-4">{t('Reports & Analytics')}</h3>
            <p className="text-muted-foreground">{t('Revenue reports, booking analytics, and performance metrics will be displayed here.')}</p>
          </Card>
        )}
      </main>

      {/* Vehicle Details Dialog */}
      <Dialog open={vehicleDialogOpen} onOpenChange={setVehicleDialogOpen}>
        <DialogContent className="backdrop-blur-xl bg-white/95 max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('Vehicle Details')}</DialogTitle>
            <DialogDescription>
              {selectedItem?.model} • {selectedItem?.licensePlate}
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">{t('Model')}</Label>
                  <p className="font-medium">{selectedItem.model}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">{t('License Plate')}</Label>
                  <p className="font-medium font-mono">{selectedItem.licensePlate}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">{t('Location')}</Label>
                  <p className="font-medium">{selectedItem.location}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">{t('Status')}</Label>
                  <Badge variant={selectedItem.status === 'Active' ? 'default' : 'secondary'}>
                    {t(selectedItem.status)}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">{t('Salik Status')}</Label>
                  <Badge variant={selectedItem.salikStatus === 'Synced' ? 'default' : 'destructive'}>
                    {t(selectedItem.salikStatus)}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">{t('Outstanding Fines')}</Label>
                  <p className={selectedItem.fines > 0 ? 'font-medium text-[#EF4444]' : 'font-medium'}>
                    {selectedItem.fines > 0 ? `AED ${selectedItem.fines}` : t('None')}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-4">
                <h4 className="font-medium mb-2">{t('Quick Actions')}</h4>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    {t('View on Map')}
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    {t('View History')}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setVehicleDialogOpen(false)}>
              {t('Close')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Management Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="backdrop-blur-xl bg-white/95 max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('Manage Booking')}</DialogTitle>
            <DialogDescription>
              {t('Booking ID:')} {selectedItem?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">{t('Customer Name')}</Label>
                  <p className="font-medium">{selectedItem.customerName}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">{t('Vehicle')}</Label>
                  <p className="font-medium">{selectedItem.vehicle}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">{t('Pick-up Date')}</Label>
                  <p className="font-medium">{selectedItem.pickupDate}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">{t('Return Date')}</Label>
                  <p className="font-medium">{selectedItem.returnDate}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">{t('Total Amount')}</Label>
                  <p className="font-medium text-[#1E40AF]">AED {selectedItem.totalAmount}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">{t('Status')}</Label>
                  <Badge variant={selectedItem.status === 'Active' ? 'default' : 'secondary'}>
                    {t(selectedItem.status)}
                  </Badge>
                </div>
              </div>

              {selectedItem.status === 'Pending' && (
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    {t('This booking is awaiting approval. Review the details and approve or reject.')}
                  </p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setBookingDialogOpen(false)}
              disabled={isLoading}
            >
              {t('Close')}
            </Button>
            {selectedItem?.status === 'Pending' && (
              <>
                <Button
                  variant="destructive"
                  onClick={handleRejectBooking}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {t('Reject')}
                </Button>
                <Button
                  className="bg-gradient-to-r from-[#EF4444] to-[#1E40AF]"
                  onClick={handleApproveBooking}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {t('Approve')}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Salik Sync Confirmation Dialog */}
      <AlertDialog open={syncDialogOpen} onOpenChange={setSyncDialogOpen}>
        <AlertDialogContent className="backdrop-blur-xl bg-white/95">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('Sync Salik Data')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('This will fetch the latest toll charges and fines from RTA Account for')}{' '}
              {selectedItem?.model} ({selectedItem?.licensePlate}).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSyncing}>{t('Cancel')}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-gradient-to-r from-[#EF4444] to-[#1E40AF]"
              onClick={(e) => {
                e.preventDefault();
                handleConfirmSync();
              }}
              disabled={isSyncing}
            >
              {isSyncing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isSyncing ? t('Syncing...') : t('Sync Now')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Document Review Dialog */}
      <Dialog open={documentReviewOpen} onOpenChange={setDocumentReviewOpen}>
        <DialogContent className="backdrop-blur-xl bg-white/95 max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t('Document Review')}</DialogTitle>
            <DialogDescription>
              {selectedDocument?.name} • {selectedDocument?.type}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg h-96 flex items-center justify-center border border-slate-300">
              <div className="text-center text-muted-foreground">
                <FileText className="w-16 h-16 mx-auto mb-4" />
                <p>{t('Document Preview')}</p>
                <p className="text-sm">{t(selectedDocument?.type ?? '')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">{t('Document Type')}</Label>
                <p className="font-medium">{t(selectedDocument?.type ?? '')}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">{t('Customer Name')}</Label>
                <p className="font-medium">{selectedDocument?.name}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDocumentReviewOpen(false)}
              disabled={isLoading}
            >
              {t('Close')}
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectDocument}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {t('Reject')}
            </Button>
            <Button
              className="bg-gradient-to-r from-[#EF4444] to-[#1E40AF]"
              onClick={handleApproveDocument}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {t('Approve')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
