"use client";
import { useGetShortExcursion } from "@/api/getShortExcursion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExcursionType } from "@/types/excursion";
import { ResponseType } from "@/types/response";
import { Circle, Edit, Eye, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const ExcursionPanel = () => {
  const { loading, result }: ResponseType = useGetShortExcursion();
  const router = useRouter();

  console.log("Loading:", loading);
  console.log("Excursion data:", result);

  // Mostrar loading solo si realmente está cargando Y no hay datos
  if (loading && !result) {
    return (
      <div className="flex items-center justify-center p-4">
        <p>Cargando excursiones...</p>
      </div>
    );
  }

  const totalExcursions = result ? result.length : 0;
  const activeExcursions = result
    ? result.filter((excursion: ExcursionType) => excursion.isActive).length
    : 0;
  const inactiveExcursions = result
    ? result.filter((excursion: ExcursionType) => !excursion.isActive).length
    : 0;

  return (
    <div className="flex flex-col items-start justify-start p-4 bg-gray-100 shadow-md rounded-lg m-2">
      <div className="mb-4 text-gray-800 grid grid-cols-3 gap-x-4">
        <div className="flex flex-col items-center mb-4 p-4 bg-blue-300 rounded-xl">
          <span className="text-3xl font-semibold text-blue-900">
            {totalExcursions}
          </span>
          <p className="text-sm text-center text-blue-900">Total excursions</p>
        </div>
        <div className="flex flex-col items-center mb-4 p-4 bg-green-300 rounded-xl">
          <span className="text-3xl font-semibold text-green-900">
            {activeExcursions}
          </span>
          <p className="text-sm text-center text-green-900">
            Active excursions
          </p>
        </div>
        <div className="flex flex-col items-center mb-4 p-4 bg-red-300 rounded-xl">
          <span className="text-3xl font-semibold text-red-900">
            {inactiveExcursions}
          </span>
          <p className="text-sm text-center text-red-900">
            Inactive excursions
          </p>
        </div>
      </div>

      {/* table */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Reserves</TableHead>
            <TableHead className="text-right">URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!loading && result && result.length > 0 ? (
            result
              .slice() // para no mutar el array original
              .sort((a: ExcursionType, b: ExcursionType) => {
                // Función para obtener el número de reservas
                const getReserveCount = (excursion: ExcursionType) =>
                  excursion.reserve && excursion.reserve.length > 0
                    ? excursion.reserve.length
                    : 0;

                // Primer criterio: activos primero
                if (a.isActive !== b.isActive) {
                  return a.isActive ? -1 : 1;
                }

                // Segundo criterio: si ambos son activos, ordenar por reservas (mayor a menor)
                if (a.isActive && b.isActive) {
                  return getReserveCount(b) - getReserveCount(a);
                }

                // Si ambos son inactivos, mantener orden original
                return 0;
              })
              .map((excursion: ExcursionType) => (
                <TableRow key={excursion.id}>
                  <TableCell className="font-medium text-gray-600">
                    {excursion.isActive ? (
                      <Circle
                        className="text-green-600 bg-green-600 rounded-4xl"
                        size={15}
                      />
                    ) : (
                      <Circle
                        className="text-red-600 bg-red-600 rounded-4xl"
                        size={15}
                      />
                    )}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {excursion.title}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {excursion.reserve && excursion.reserve.length > 0
                      ? excursion.reserve.length
                      : 0}
                  </TableCell>
                  <TableCell className="text-right">
                    <a
                      href={`/excursion/${excursion.slug}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded inline-flex items-center mr-2"
                    >
                      <Eye size={15} />
                    </a>
                    <a
                      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/content-manager/collection-types/api::excursion.excursion/${excursion.documentId}`}
                      className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-1 px-2 rounded inline-flex items-center"
                    >
                      <Edit size={15} />
                    </a>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No excursions available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Button
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-1"
        onClick={() =>
          router.push(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/content-manager/collection-types/api::excursion.excursion/create`
          )
        }
      >
        <Plus /> Create a new excursion
      </Button>
    </div>
  );
};

export default ExcursionPanel;
