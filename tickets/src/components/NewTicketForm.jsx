import { useState } from "react";
import { createTicket } from "../services/database";

function NewTicketForm({ onTicketCreated }) {
  const [tittle, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("media");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");

      const newTicket = {
        userId,
        tittle,
        description,
        priority,
        status: "in progress",
        create_at: new Date().toLocaleString(),
      };

      const response = await createTicket(newTicket);
      const inserted = response.data?.inserted?.[0];

      if (inserted) {
        onTicketCreated(inserted);
        setTittle("");
        setDescription("");
        setPriority("media");
        setShowForm(false);
      } else {
        setError("No se pudo crear el ticket.");
      }
    } catch (err) {
      setError("Error al crear el ticket.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          {showForm ? "Cancelar" : "+ Crear Ticket"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 space-y-4"
        >
          {error && <div className="text-red-500">{error}</div>}

          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={tittle}
              onChange={(e) => setTittle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prioridad</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Ticket"}
          </button>
        </form>
      )}
    </div>
  );
}

export default NewTicketForm;
