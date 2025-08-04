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