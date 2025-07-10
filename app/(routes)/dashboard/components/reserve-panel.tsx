"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { type ChartConfig } from "@/components/ui/chart";
import { useEffect, useState } from "react";
import {
  getReservesChartData,
  getReservesStats,
  type ChartData,
} from "@/api/getReserves";

const chartConfig = {
  reserves: {
    label: "Reservas",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const ReservePanel = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReserves = async () => {
      try {
        setError(null);
        const data = await getReservesChartData();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching reserves:", error);
        setError("Error al cargar los datos de reservas");
      } finally {
        setLoading(false);
      }
    };

    fetchReserves();
  }, []);

  // Calcular estadísticas
  const stats = chartData.length > 0 ? getReservesStats(chartData) : null;

  if (loading) {
    return (
      <div className="flex flex-col items-start justify-start p-4 bg-gray-100 shadow-md rounded-lg m-2">
        <h1 className="text-4xl font-bold my-10">Estadísticas</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Cargando datos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-start justify-start p-4 bg-gray-100 shadow-md rounded-lg m-2">
        {" "}
        <h1 className="text-4xl font-bold my-10">Estadísticas</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="flex flex-col items-start justify-start p-4 bg-gray-100 shadow-md rounded-lg m-2">
        <h1 className="text-4xl font-bold my-10">Estadísticas</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">
            No hay reservas disponibles
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-start p-4 bg-gray-100 shadow-md rounded-lg m-2">
      {/* Estadísticas generales */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-600">
              Total Reservas
            </h3>
            <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-600">
              Día con Más Reservas
            </h3>
            <p className="text-lg font-bold text-purple-900">
              {stats.maxDay.date}
            </p>
            <p className="text-sm text-purple-700">
              {stats.maxDay.reserves} reservas
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-orange-600">
              Días con Reservas
            </h3>
            <p className="text-2xl font-bold text-orange-900">
              {stats.daysWithReserves}
            </p>
          </div>
        </div>
      )}
      <div className="w-full h-full">
        <ChartContainer
          config={chartConfig}
          className="!aspect-auto !h-full min-h-[250px] lg:min-h-[400px] w-full"
        >
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              className="text-xs"
            />
            <YAxis tickLine={false} axisLine={false} className="text-xs" />
            <Bar
              dataKey="reserves"
              fill="var(--color-reserves)"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              labelFormatter={(label) => `Fecha: ${label}`}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default ReservePanel;
