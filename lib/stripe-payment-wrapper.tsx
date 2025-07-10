/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, CheckCircle, AlertCircle } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentFormProps {
  excursionId: string;
  quantityPeople: number;
  bookingDate: string;
  clientName: string;
  phone?: string;
  onPaymentSuccess: (reservationData: any) => void;
  onCancel: () => void;
}

const PaymentForm = ({
  excursionId,
  quantityPeople,
  bookingDate,
  clientName,
  phone,
  onPaymentSuccess,
  onCancel,
}: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [excursionDetails, setExcursionDetails] = useState<any>(null);

  useEffect(() => {
    // Crear el Payment Intent cuando se monta el componente
    const createPaymentIntent = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reserves/create-payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              excursionId,
              quantityPeople,
              bookingDate,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || "Error al crear el pago");
        }

        setClientSecret(data.data.clientSecret);
        setPaymentIntentId(data.data.paymentIntentId);
        setExcursionDetails(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error creating payment");
      }
    };

    createPaymentIntent();
  }, [excursionId, quantityPeople, bookingDate]);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const card = elements.getElement(CardElement);

    if (!card) {
      setError("Card element not found");
      setProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: clientName,
            phone: phone,
          },
        },
      }
    );

    if (error) {
      setError(error.message || "Payment failed");
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      // Crear la reserva después del pago exitoso
      try {
        const reserveResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reserves`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                excursion: excursionId,
                bookingDate,
                quantityPeople,
                clientName,
                phone,
                paymentIntentId: paymentIntent.id,
              },
            }),
          }
        );

        const reserveData = await reserveResponse.json();

        if (!reserveResponse.ok) {
          throw new Error(
            reserveData.error?.message || "Error al crear la reserva"
          );
        }

        onPaymentSuccess(reserveData.data);
      } catch (reserveError) {
        setError(
          "Pago exitoso pero error al crear la reserva: " +
            (reserveError instanceof Error
              ? reserveError.message
              : "Unknown error")
        );
      }
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: "#424770",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
        iconColor: "#9e2146",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <div className="text-center">
        <CreditCard className="h-12 w-12 text-teal-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900">
          Complete Your Payment
        </h3>
      </div>

      {excursionDetails && (
        <div className="p-4 bg-gray-50 rounded-lg space-y-2">
          <h4 className="font-semibold text-lg">
            {excursionDetails.excursion.title}
          </h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Date:</strong> {bookingDate}
            </p>
            <p>
              <strong>People:</strong> {quantityPeople}
            </p>
            <p>
              <strong>Price per person:</strong> €
              {excursionDetails.excursion.price}
            </p>
            <p className="text-lg font-bold text-gray-900">
              <strong>Total: €{excursionDetails.amount}</strong>
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Information
          </label>
          <div className="p-3 border border-gray-300 rounded-md focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
            <CardElement options={cardStyle} />
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {succeeded && (
          <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-md">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <p className="text-sm text-green-700">
              Payment successful! Creating your reservation...
            </p>
          </div>
        )}

        <div className="flex space-x-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1"
            disabled={processing || succeeded}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!stripe || processing || succeeded || !clientSecret}
            className="flex-1 bg-teal-600 hover:bg-teal-700"
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay €${excursionDetails?.amount || "0"}`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const StripePaymentWrapper = (props: PaymentFormProps) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
};

export default StripePaymentWrapper;
