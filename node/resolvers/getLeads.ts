interface EmailArg {
  email: string
}

export const getLeads = (
  _: any,
  { email }: EmailArg,
  { clients: { lead: leadsClient } }: Context
) => leadsClient.getLeads(email)
