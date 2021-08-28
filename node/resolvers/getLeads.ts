export const getLeads = (
  _: any,
  __: any,
  { clients: { lead: leadsClient } }: Context
) => leadsClient.getLeads()
