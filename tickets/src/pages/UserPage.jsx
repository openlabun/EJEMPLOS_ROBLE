import { useEffect, useState } from "react";
import TicketList from "../components/TicketList";
import NewTicketForm from "../components/NewTicketForm";
import { getMyTickets } from "../services/database";
import Header from "../components/Header";

function UserPage() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await getMyTickets(userId);
      setTickets(response.data);
    } catch (error) {
      console.error("Error al obtener tickets", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleNewTicket = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Mis Tickets</h1>
        </div>

        <NewTicketForm onTicketCreated={handleNewTicket} />

        <div className="mt-6 space-y-4">
          <TicketList tickets={tickets} />
        </div>
      </main>
    </div>
  );
}

export default UserPage;
