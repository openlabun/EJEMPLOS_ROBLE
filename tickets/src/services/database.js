import API from "./api";

export const createTicket = (newTicket) => {
  return API.post('/database/tickets_d89e3cf948/insert', {
    tableName: 'tickets',
    records: [newTicket],
  });
};

export const getMyTickets = (userId) => {
  return API.get("/database/tickets_d89e3cf948/read", {
    params: {
      tableName: "tickets",
      userId: userId,
    },
  });
};

export const getAllTickets = () => {
  return API.get("/database/tickets_d89e3cf948/read", {
    params: {
      tableName: "tickets",
    }
  });
}

export const getTicketById = (id) => {
  return API.get("/database/tickets_d89e3cf948/read", {
    params: {
      tableName: "tickets",
      _id: id,
    },
  });
};

export const updateTicket = (idValue, updates, idColumn = '_id') => {
  return API.put('/database/tickets_d89e3cf948/update', {
    tableName: 'tickets',
    idColumn,
    idValue,
    updates,
  });
};