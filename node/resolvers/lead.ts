interface Args {
  email: string
}

export const lead = (
  _: any,
  { email }: Args,
  { clients: { lead: leadsClient } }: Context
) => leadsClient.lead(email)
