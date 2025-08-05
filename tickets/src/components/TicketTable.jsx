import { Pencil, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TicketTable({ tickets }) {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-auto bg-white shadow-xl animate-fade-in">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-blue-50 text-left text-sm">
            <th className="px-4 py-4">ID</th>
            <th className="px-4 py-4">Título</th>
            <th className="px-4 py-4">Estado</th>
            <th className="px-4 py-4">Prioridad</th>
            <th className="px-4 py-4">Fecha de creación</th>
            <th className="px-4 py-4">Fecha de actualización</th>
            <th className="px-4 py-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, idx) => (
            <tr
              key={ticket._id}
              className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-t hover:bg-blue-50 text-sm transition-colors`}
            >
              <td className="px-4 py-4 font-mono text-xs">{ticket._id}</td>
              <td className="px-4 py-4 font-medium">{ticket.tittle}</td>
              <td className="px-4 py-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${ticket.status === "abierto"
                    ? "bg-green-100 text-green-700"
                    : ticket.status === "cerrado"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {ticket.status}
                </span>
              </td>
              <td className="px-4 py-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${ticket.priority === "alta"
                    ? "bg-red-200 text-red-800"
                    : ticket.priority === "media"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                    }`}
                >
                  {ticket.priority}
                </span>
              </td>
              <td className="px-4 py-4">{new Date(ticket.create_at).toLocaleString()}</td>
              <td className="px-4 py-4">
                {ticket.updated_at
                  ? new Date(ticket.updated_at).toLocaleString()
                  : "-"}
              </td>
              <td className="px-4 py-4 flex items-center gap-2">
                <button
                  className="flex items-center gap-1 text-gray-700 hover:underline cursor-pointer"
                  onClick={() => navigate(`/tickets/${ticket._id}`)}
                >
                  <Eye size={16} /> Ver detalles
                </button>
                <button className="flex items-center gap-1 text-blue-600 hover:underline hover:text-blue-800 transition cursor-pointer">
                  <Pencil size={16} /> Editar
                </button>
                <button className="flex items-center gap-1 text-red-600 hover:underline hover:text-red-800 transition cursor-pointer">
                  <Trash2 size={16} /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketTable;
