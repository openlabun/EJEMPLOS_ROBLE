import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTicketById, updateTicket } from "../services/database";
import { MessageSquare, ArrowLeft } from "lucide-react";

function TicketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMsg, setNewMsg] = useState("");
  const [status, setStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const role = localStorage.getItem('rol') || "";

  useEffect(() => {
    getTicketById(id).then((res) => {
      const arr = res.data;
      const tk = arr.length > 0 ? arr[0] : null;
      setTicket(tk);
      setStatus(tk?.status ?? "");
      setLoading(false);
    });
  }, [id]);

  const isClosed = ticket?.status === "closed";

  const handleStatusChange = async () => {
    setUpdating(true);
    const updates = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (status === "closed") {
      updates.closed_at = new Date().toISOString();
    }
    await updateTicket(id, updates);
    setTicket((prev) => ({ ...prev, ...updates }));
    setUpdating(false);
  };

  const handleSendMsg = async (e) => {
    e.preventDefault();
    if (!newMsg.trim() || isClosed) return;
    setUpdating(true);
    const responsesArray = Array.isArray(ticket.responses) ? ticket.responses : [];
    const newResponse = {
      author: role,
      text: newMsg,
      date: new Date().toISOString(),
    };
    const updatedResponses = [...responsesArray, newResponse];
    await updateTicket(id, { responses: updatedResponses });
    setTicket((prev) => ({ ...prev, responses: updatedResponses }));
    setNewMsg("");
    setUpdating(false);
  };

  const stateLabelColor = (st) => {
    switch (st) {
      case "open":
        return "bg-green-100 text-green-700";
      case "closed":
        return "bg-red-100 text-red-700";
      case "in progress":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  const priorityLabelColor = (priority) => {
    switch (priority) {
      case "alta":
        return "bg-red-200 text-red-800";
      case "media":
        return "bg-yellow-100 text-yellow-700";
      case "baja":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  if (loading) return <div className="p-10 text-center">Cargando...</div>;
  if (!ticket) return <div>No se encontró el ticket.</div>;
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-transparent p-4 md:p-8 animate-fade-in">

      {/* CARD DEL TICKET */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 flex flex-col gap-4 border border-blue-100">
        <button
          className="mb-6 flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition px-3 py-2 rounded-xl font-medium shadow-sm border border-blue-100 w-fit cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} className="stroke-2" />
          <span>Volver</span>
        </button>
        <div className="flex items-center gap-3">
          <MessageSquare className="text-blue-600" size={32} />
          <div>
            <h2 className="text-2xl font-bold text-blue-700 mb-0 leading-6">{ticket.tittle}</h2>
            <div className="text-xs pt-2 text-gray-400">Ticket #{ticket._id}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <span className={`inline-block px-3 py-1 rounded-full font-semibold text-xs ${stateLabelColor(ticket.status)}`}>
            Estado: {ticket.status}
          </span>
          {ticket.priority && (
            <span className={`inline-block px-3 py-1 rounded-full font-semibold text-xs ${priorityLabelColor(ticket.priority)}`}>
              Prioridad: {ticket.priority}
            </span>
          )}
          {ticket.create_at && (
            <span className="inline-block px-3 py-1 rounded-full font-medium text-xs bg-gray-100 text-gray-500">
              {new Date(ticket.create_at).toLocaleString()}
            </span>
          )}
        </div>
        {/* Descripción separada, resaltada */}
        <div className="bg-blue-50 rounded-xl p-4 mt-2 border border-blue-100 text-gray-700 text-base">
          <span className="font-semibold text-blue-700">Descripción: </span>
          {ticket.description || <span className="italic text-gray-400">Sin descripción</span>}
        </div>

        {role === "admin" && (
          <div className="flex items-center gap-2 mt-1">
            <select
              className="border rounded px-2 py-1 text-sm"
              value={status}
              onChange={e => setStatus(e.target.value)}
              disabled={updating || isClosed}
            >
              <option value="open">Abierto</option>
              <option value="closed">Cerrado</option>
              <option value="in progress">En progreso</option>
            </select>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm transition disabled:opacity-50"
              onClick={handleStatusChange}
              disabled={updating || status === ticket.status || isClosed}
            >
              Cambiar estado
            </button>
          </div>
        )}
      </div>

      {/* SECCIÓN CHAT */}
      <div className="mb-6 bg-white rounded-2xl shadow-lg p-6 border border-blue-50">
        <h3 className="font-bold text-lg mb-4 text-blue-600 flex items-center gap-2">
          <MessageSquare size={20} /> Chat / Respuestas
        </h3>
        <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
          {Array.isArray(ticket.responses) && ticket.responses.length > 0 ? (
            ticket.responses.map((msg, i) => {
              // Si el autor es igual al rol actual, el mensaje va a la derecha
              const isMine = msg.author === role;
              const bubbleColor = isMine
                ? "bg-blue-50 border border-blue-200"
                : "bg-gray-100";
              const alignSelf = isMine ? "flex-end" : "flex-start";
              const labelColor = isMine ? "text-blue-600" : "text-gray-500";
              const senderLabel = msg.author === "admin" ? "Soporte" : "Usuario";

              return (
                <div
                  key={i}
                  className={`rounded-lg p-3 flex flex-col gap-1 shadow-sm max-w-[80%] ${bubbleColor}`}
                  style={{
                    alignSelf,
                    marginLeft: isMine ? "auto" : 0,
                    marginRight: isMine ? 0 : "auto",
                  }}
                >
                  <div className="flex justify-between text-xs text-gray-500">
                    <span className={labelColor}>{senderLabel}</span>
                    <span>{new Date(msg.date).toLocaleString()}</span>
                  </div>
                  <div className="mt-1 text-sm">{msg.text}</div>
                </div>
              );
            })
          ) : (
            <div className="text-gray-400">Aún no hay mensajes.</div>
          )}
        </div>
        {/* SOLO muestra el form si el ticket NO está cerrado */}
        {!isClosed && (
          <form onSubmit={handleSendMsg} className="mt-6 flex flex-col md:flex-row gap-2">
            <textarea
              value={newMsg}
              onChange={e => setNewMsg(e.target.value)}
              placeholder="Escribe una respuesta..."
              className="w-full border rounded p-2"
              rows={2}
              required
              disabled={updating}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 md:ml-2 enabled:cursor-pointer"
              disabled={updating || !newMsg.trim()}
            >
              Enviar
            </button>
          </form>
        )}
        {/* Mensaje si está cerrado */}
        {isClosed && (
          <div className="text-red-500 mt-4 font-semibold">
            Este ticket está cerrado. No se pueden agregar respuestas ni modificar el estado.
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketDetailPage;
