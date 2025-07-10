interface ReserveData {
  id: number;
  documentId: string;
  createdAt: string;
}

interface ReserveResponse {
  data: ReserveData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ChartData {
  date: string;
  reserves: number;
}

export const getReserves = async (): Promise<ReserveData[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reserves?fields[0]=createdAt`
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: ReserveResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching reserves:", error);
    throw error;
  }
};

/**
 * Procesa los datos de reservas y los agrupa por fecha
 */
export const processReservesForChart = (
  reserves: ReserveData[]
): ChartData[] => {
  const reservesByDate: { [key: string]: number } = {};

  reserves.forEach((reserve) => {
    // Extraer solo la fecha (sin la hora)
    const date = new Date(reserve.createdAt).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    if (reservesByDate[date]) {
      reservesByDate[date]++;
    } else {
      reservesByDate[date] = 1;
    }
  });

  // Convertir a array y ordenar por fecha
  return Object.entries(reservesByDate)
    .map(([date, count]) => ({
      date,
      reserves: count,
    }))
    .sort((a, b) => {
      // Convertir fecha DD/MM/YYYY a formato comparable
      const dateA = new Date(a.date.split("/").reverse().join("-")).getTime();
      const dateB = new Date(b.date.split("/").reverse().join("-")).getTime();
      return dateA - dateB;
    });
};

/**
 * Función combinada que obtiene y procesa los datos en una sola llamada
 */
export const getReservesChartData = async (): Promise<ChartData[]> => {
  try {
    const reserves = await getReserves();
    return processReservesForChart(reserves);
  } catch (error) {
    console.error("Error getting reserves chart data:", error);
    throw error;
  }
};

/**
 * Obtiene estadísticas adicionales de las reservas
 */
export const getReservesStats = (chartData: ChartData[]) => {
  const totalReserves = chartData.reduce((sum, item) => sum + item.reserves, 0);
  const averagePerDay = totalReserves / chartData.length;
  const maxDay = chartData.reduce((prev, current) =>
    prev.reserves > current.reserves ? prev : current
  );
  const minDay = chartData.reduce((prev, current) =>
    prev.reserves < current.reserves ? prev : current
  );

  return {
    total: totalReserves,
    averagePerDay: Math.round(averagePerDay * 100) / 100,
    maxDay,
    minDay,
    daysWithReserves: chartData.length,
  };
};
