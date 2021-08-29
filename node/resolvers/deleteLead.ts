interface Args {
  email: string
}

export const deleteLead = (
  _: any,
  { email }: Args,
  { clients: { lead: leadsClient } }: Context
) => leadsClient.deleteLead(email)
