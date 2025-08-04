function TicketTable({ tickets }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-left text-sm text-gray-700">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Título</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Prioridad</th>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="border-t hover:bg-gray-50 text-sm">
              <td className="px-4 py-2">{ticket._id}</td>
              <td className="px-4 py-2">{ticket.tittle}</td>
              <td className="px-4 py-2 capitalize">{ticket.status}</td>
              <td className="px-4 py-2 capitalize">{ticket.priority}</td>
              <td className="px-4 py-2">{new Date(ticket.create_at).toLocaleDateString()}</td>
              <td className="px-4 py-2 space-x-2">
                <button className="text-blue-600 hover:underline">Editar</button>
                <button className="text-red-600 hover:underline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketTable;
