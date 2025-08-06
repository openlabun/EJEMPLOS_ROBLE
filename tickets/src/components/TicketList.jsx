import { useNavigate } from "react-router-dom";

function TicketList({ tickets }) {
  const navigate = useNavigate();

  // Ordena por fecha descendente (más reciente primero)
  const sortedTickets = tickets
    .slice() // copia para no mutar props
    .sort((a, b) => new Date(b.create_at) - new Date(a.create_at));

  return (
    <div className="space-y-4">
      {sortedTickets.length === 0 ? (
        <p className="text-gray-500">No tienes tickets registrados.</p>
      ) : (
        <ul className="space-y-3">
          {sortedTickets.map((ticket) => (
            <li
              key={ticket._id}
              onClick={() => navigate(`/tickets/${ticket._id}`)}
              className="bg-white rounded-lg shadow p-4 flex flex-col gap-1 cursor-pointer hover:shadow-md transition border border-transparent hover:border-blue-300"
              tabIndex={0}
              onKeyDown={e => { if (e.key === "Enter") navigate(`/tickets/${ticket._id}`) }}
              title="Ver detalles del ticket"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  {ticket.tittle}
                </h2>
                <span
                  className={`px-2 py-1 text-sm rounded-full ${ticket.status === "open"
                    ? "bg-yellow-100 text-yellow-700"
                    : ticket.status === "closed"
                      ? "bg-green-100 text-green-700"
                      : ticket.status === "in progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {ticket.status}
                </span>
              </div>

              <p className="text-sm text-gray-600"><strong>Descripción:</strong> {ticket.description}</p>

              <div className="text-sm text-gray-500 flex gap-3 mt-2">
                <span>Prioridad: <strong>{ticket.priority}</strong></span>
                <span>Creado: {new Date(ticket.create_at).toLocaleString()}</span>
              </div>
              <span className="mt-2 text-blue-600 text-xs font-medium underline decoration-dotted">
                Ver detalles
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TicketList;
