/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

// Tipos para la disponibilidad
interface AvailabilityResponse {
  available: boolean;
  availableSpots: number;
  totalCapacity: number;
  message: string;
}

// Tipos para el Payment Intent
interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  excursion: {
    id: number;
    title: string;
    price: number;
  };
}

// Tipos para la reserva
interface CreateReserveData {
  clientName: string;
  quantityPeople: number;
  bookingDate: string; // formato YYYY-MM-DD
  excursion: string; // DocumentId de la excursión
  phone?: string;
  paymentIntentId?: string; // Nuevo campo para Stripe
}

interface ReserveResponse {
  id: number;
  documentId: string;
  clientName: string;
  quantityPeople: number;
  phone: string | null;
  reserveSlug: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  bookingDate: string;
  statusReserve: string | null;
  totalAmount: number; // Nuevo campo
  paymentIntentId: string; // Nuevo campo
  paymentStatus: string; // Nuevo campo
  excursion: {
    id: number;
    documentId: string;
    title: string;
    description: any[];
    price: number;
    slug: string;
    level: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    shortDescription: string;
    quantityPeople: number;
  };
  disponibility: any;
}

export function useCreateReserve() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [creatingPaymentIntent, setCreatingPaymentIntent] = useState(false);

  // Función para verificar disponibilidad
  const checkAvailability = async (
    excursionId: string,
    bookingDate: string,
    quantityPeople: number
  ): Promise<AvailabilityResponse | null> => {
    setCheckingAvailability(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/availability/check-availability/${excursionId}/${bookingDate}/${quantityPeople}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Failed to check availability"
        );
      }

      const result = await response.json();
      return result.data || result;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while checking availability";
      setError(errorMessage);
      console.error("Error checking availability:", err);
      return null;
    } finally {
      setCheckingAvailability(false);
    }
  };

  // Nueva función para crear Payment Intent
  const createPaymentIntent = async (
    excursionId: string,
    quantityPeople: number,
    bookingDate: string
  ): Promise<PaymentIntentResponse | null> => {
    setCreatingPaymentIntent(true);
    setError(null);

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Failed to create payment intent"
        );
      }

      const result = await response.json();
      return result.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while creating payment intent";
      setError(errorMessage);
      console.error("Error creating payment intent:", err);
      return null;
    } finally {
      setCreatingPaymentIntent(false);
    }
  };

  const createReserve = async (
    reserveData: CreateReserveData
  ): Promise<ReserveResponse | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        data: {
          clientName: reserveData.clientName,
          quantityPeople: reserveData.quantityPeople,
          bookingDate: reserveData.bookingDate,
          excursion: reserveData.excursion, // DocumentId
          phone: reserveData.phone || null,
          paymentIntentId: reserveData.paymentIntentId, // Nuevo campo
        },
      };

      console.log("Sending payload:", JSON.stringify(payload, null, 2));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reserves`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(
          errorData.error?.message || "Failed to create reservation"
        );
      }

      const result = await response.json();
      console.log("Success response:", result);
      setSuccess(true);
      return result.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while creating the reservation";
      setError(errorMessage);
      console.error("Error creating reservation:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
    setCheckingAvailability(false);
    setCreatingPaymentIntent(false);
  };

  return {
    createReserve,
    checkAvailability,
    createPaymentIntent, // Nueva función
    loading,
    error,
    success,
    checkingAvailability,
    creatingPaymentIntent, // Nuevo estado
    resetState,
  };
}
