"use client";

import { useEffect, useState } from "react";

// Tipos para la respuesta del backend
interface AvailabilityItem {
  date: string;
  available: boolean;
  availableSlots?: number;
}

interface AvailabilityResponse {
  data: AvailabilityItem[];
  meta: {
    total: number;
  };
}

export function useGetAvailabilities(
  excursionId: number | null,
  numberOfPeople: number
) {
  const [availabilities, setAvailabilities] = useState<AvailabilityItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!excursionId) return;

    const fetchAvailabilities = async () => {
      setLoading(true);
      setError(null);

      try {
        const today = new Date().toISOString().split("T")[0];
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/disponibilities?monthlyView=true&excursionId=${excursionId}&numberOfPeople=${numberOfPeople}&startDate=${today}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch availabilities");
        }

        const data: AvailabilityResponse = await response.json();

        // Filtrar solo las fechas disponibles
        const availableDates = data.data || [];
        setAvailabilities(availableDates);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching availabilities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilities();
  }, [excursionId, numberOfPeople]);

  // Función helper para obtener solo las fechas disponibles como Date objects
  const getAvailableDates = (): Date[] => {
    return availabilities
      .filter((item) => item.available)
      .map((item) => new Date(item.date));
  };

  // Función helper para verificar si una fecha específica está disponible
  const isDateAvailable = (date: Date): boolean => {
    const dateString = date.toISOString().split("T")[0];
    const availability = availabilities.find(
      (item) => item.date === dateString
    );
    return availability?.available || false;
  };

  // Función helper para obtener los slots disponibles de una fecha específica
  const getAvailableSlots = (date: Date): number => {
    const dateString = date.toISOString().split("T")[0];
    const availability = availabilities.find(
      (item) => item.date === dateString
    );
    return availability?.availableSlots || 0;
  };

  return {
    availabilities,
    loading,
    error,
    getAvailableDates,
    isDateAvailable,
    getAvailableSlots,
  };
}
