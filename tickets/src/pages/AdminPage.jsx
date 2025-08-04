import { useEffect, useState } from "react";
import Header from "../components/Header";
import TicketTable from "../components/TicketTable";
import { getAllTickets } from "../services/database";

function AdminPage() {
  const [tickets, setTickets] = useState([]);

  const fetchAllTickets = async () => {
    try {
      const response = await getAllTickets();
      setTickets(response.data);
    } catch (error) {
      console.error("Error al obtener tickets (admin)", error);
    }
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Panel de Administrador</h1>
          {/* Futuro botón para crear manualmente */}
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
            + Nuevo Ticket
          </button>
        </div>
        <TicketTable tickets={tickets} />
      </main>
    </div>
  );
}

export default AdminPage;
