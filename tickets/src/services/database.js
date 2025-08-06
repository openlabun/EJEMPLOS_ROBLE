import API from "./api";

const VITE_PROJECT_ID = import.meta.env.VITE_PROJECT_ID

export const createTicket = (newTicket) => {
  return API.post(`/database/${VITE_PROJECT_ID}/insert`, {
    tableName: 'tickets',
    records: [newTicket],
  });
};

export const getMyTickets = (userId) => {
  return API.get(`/database/${VITE_PROJECT_ID}/read`, {
    params: {
      tableName: "tickets",
      userId: userId,
    },
  });
};

export const getAllTickets = () => {
  return API.get(`/database/${VITE_PROJECT_ID}/read`, {
    params: {
      tableName: "tickets",
    }
  });
}

export const getTicketById = (id) => {
  return API.get(`/database/${VITE_PROJECT_ID}/read`, {
    params: {
      tableName: "tickets",
      _id: id,
    },
  });
};

export const updateTicket = (idValue, updates, idColumn = '_id') => {
  return API.put(`/database/${VITE_PROJECT_ID}/update`, {
    tableName: 'tickets',
    idColumn,
    idValue,
    updates,
  });
};