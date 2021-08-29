export const leads = (
  _: any,
  __: any,
  { clients: { lead: leadsClient } }: Context
) => leadsClient.leads()
