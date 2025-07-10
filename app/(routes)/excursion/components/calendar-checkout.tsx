/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateReserve } from "@/api/createReserve";
import StripePaymentWrapper from "@/lib/stripe-payment-wrapper";
import {
  Users,
  CalendarIcon,
  User,
  Phone,
  CheckCircle,
  AlertCircle,
  Info,
  Loader2,
  CreditCard,
  ArrowLeft,
} from "lucide-react";

interface CalendarCheckoutProps {
  excursionDocumentId: string;
  maxPeople?: number;
}

const CalendarCheckout = ({
  excursionDocumentId,
  maxPeople = 10,
}: CalendarCheckoutProps) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
  const [numberOfPeople, setNumberOfPeople] = React.useState<number>(2);
  const [clientName, setClientName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [currentStep, setCurrentStep] = React.useState<
    "calendar" | "form" | "payment" | "success"
  >("calendar");
  const [availabilityInfo, setAvailabilityInfo] = React.useState<{
    available: boolean;
    availableSpots: number;
    totalCapacity: number;
    message: string;
  } | null>(null);
  const [finalReservation, setFinalReservation] = React.useState<any>(null);

  const { checkAvailability, checkingAvailability, error, resetState } =
    useCreateReserve();

  // Función para convertir fecha a string local (YYYY-MM-DD)
  const formatDateToLocal = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Función para verificar disponibilidad
  const handleCheckAvailability = async () => {
    if (!selectedDate) return;

    const dateString = formatDateToLocal(selectedDate);
    const availability = await checkAvailability(
      excursionDocumentId,
      dateString,
      numberOfPeople
    );

    if (availability) {
      setAvailabilityInfo(availability);
      if (availability.available) {
        setCurrentStep("form");
      }
    }
  };

  // Función para proceder al pago
  const handleProceedToPayment = () => {
    if (!selectedDate || !clientName.trim()) {
      return;
    }
    setCurrentStep("payment");
  };

  // Función para manejar pago exitoso
  const handlePaymentSuccess = (reservationData: any) => {
    setFinalReservation(reservationData);
    setCurrentStep("success");

    // Reset form after 5 seconds
    setTimeout(() => {
      handleReset();
    }, 5000);
  };

  // Función para cancelar pago
  const handleCancelPayment = () => {
    setCurrentStep("form");
  };

  // Función para resetear todo
  const handleReset = () => {
    setClientName("");
    setPhone("");
    setSelectedDate(undefined);
    setCurrentStep("calendar");
    setAvailabilityInfo(null);
    setFinalReservation(null);
    resetState();
  };

  // Resetear cuando cambia la fecha o número de personas
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setCurrentStep("calendar");
    setAvailabilityInfo(null);
    resetState();
  };

  const handlePeopleChange = (value: string) => {
    setNumberOfPeople(Number.parseInt(value));
    setCurrentStep("calendar");
    setAvailabilityInfo(null);
    resetState();
  };

  const isFormValid = selectedDate && clientName.trim().length > 0;

  // Render según el paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case "calendar":
        return (
          <>
            {selectedDate && (
              <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CalendarIcon className="h-5 w-5 text-teal-600" />
                  <span className="font-medium text-teal-800">
                    Selected Date
                  </span>
                </div>
                <p className="text-teal-700">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-teal-600 mt-1">
                  {numberOfPeople} {numberOfPeople === 1 ? "person" : "people"}
                </p>
              </div>
            )}

            {availabilityInfo && (
              <div
                className={`p-4 rounded-lg ${
                  availabilityInfo.available
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Info
                    className={`h-5 w-5 ${
                      availabilityInfo.available
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      availabilityInfo.available
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    Availability Status
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    availabilityInfo.available
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {availabilityInfo.message}
                </p>
                {availabilityInfo.available && (
                  <p className="text-sm text-green-600 mt-1">
                    Available spots: {availabilityInfo.availableSpots} /{" "}
                    {availabilityInfo.totalCapacity}
                  </p>
                )}
              </div>
            )}

            <Button
              onClick={handleCheckAvailability}
              disabled={!selectedDate || checkingAvailability}
              className="w-full mt-4 bg-teal-600 hover:bg-teal-700"
              size="lg"
            >
              {checkingAvailability ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking Availability...
                </>
              ) : !selectedDate ? (
                "Select a Date"
              ) : (
                "Check Availability"
              )}
            </Button>
          </>
        );

      case "form":
        return (
          <div className="space-y-4 mt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Button
                onClick={() => setCurrentStep("calendar")}
                variant="ghost"
                size="sm"
                className="p-1"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold text-gray-900">
                Enter Your Details
              </h3>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="clientName"
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Full Name *</span>
              </Label>
              <Input
                id="clientName"
                type="text"
                placeholder="Enter your full name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Phone Number (Optional)</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Button
              onClick={handleProceedToPayment}
              disabled={!isFormValid}
              className="w-full bg-teal-600 hover:bg-teal-700"
              size="lg"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Proceed to Payment
            </Button>
          </div>
        );

      case "payment":
        return (
          <div className="mt-6">
            <StripePaymentWrapper
              excursionId={excursionDocumentId}
              quantityPeople={numberOfPeople}
              bookingDate={formatDateToLocal(selectedDate!)}
              clientName={clientName}
              phone={phone}
              onPaymentSuccess={handlePaymentSuccess}
              onCancel={handleCancelPayment}
            />
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center space-y-4 py-8">
            <CheckCircle className="h-20 w-20 text-green-500" />
            <h3 className="text-2xl font-bold text-green-700">
              Reservation Confirmed!
            </h3>
            <div className="text-center space-y-2">
              <p className="text-gray-600">
                Your reservation has been created successfully.
              </p>
              {finalReservation && (
                <div className="p-4 bg-green-50 rounded-lg text-sm">
                  <p>
                    <strong>Reservation ID:</strong> {finalReservation.id}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> €
                    {finalReservation.totalAmount}
                  </p>
                  <p>
                    <strong>Status:</strong> {finalReservation.statusReserve}
                  </p>
                </div>
              )}
            </div>
            <Button
              onClick={handleReset}
              className="mt-4 bg-teal-600 hover:bg-teal-700"
            >
              Make Another Reservation
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Reserve Your Adventure
          </h2>
          <p className="text-gray-600">
            {currentStep === "calendar" &&
              "Select your preferred date and number of people"}
            {currentStep === "form" && "Enter your contact information"}
            {currentStep === "payment" && "Complete your payment"}
            {currentStep === "success" && "Booking confirmed!"}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div
            className={`grid ${
              currentStep === "payment" ? "grid-cols-1" : "md:grid-cols-2"
            } gap-8`}
          >
            {/* Selector de personas y contenido dinámico */}
            <div className="space-y-4">
              {(currentStep === "calendar" || currentStep === "form") && (
                <>
                  <div className="flex items-center space-x-2 mb-4">
                    <Users className="h-5 w-5 text-teal-600" />
                    <label className="text-sm font-medium text-gray-700">
                      Number of People
                    </label>
                  </div>

                  <Select
                    value={numberOfPeople.toString()}
                    onValueChange={handlePeopleChange}
                    disabled={currentStep !== "calendar"}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select number of people" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: maxPeople }, (_, i) => i + 1).map(
                        (num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Person" : "People"}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </>
              )}

              {renderStepContent()}
            </div>

            {/* Calendar - solo mostrar en pasos calendar y form */}
            {(currentStep === "calendar" || currentStep === "form") && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <CalendarIcon className="h-5 w-5 text-teal-600" />
                  <label className="text-sm font-medium text-gray-700">
                    Available Dates
                  </label>
                </div>

                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateChange}
                  className="rounded-lg border"
                  classNames={{
                    day_selected: "bg-teal-600 text-white hover:bg-teal-600",
                    day_today: "bg-teal-100 text-teal-900",
                  }}
                  disabled={(date) => date < new Date()}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarCheckout;
