interface Args {
  id: string
}

export const deleteLead = (
  _: any,
  { id }: Args,
  { clients: { lead: leadsClient } }: Context
) => leadsClient.delete(id)
