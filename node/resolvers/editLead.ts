import type { LeadInput } from '../typings/lead'

interface Args {
  lead: LeadInput
}

export const editLead = (
  _: any,
  { lead }: Args,
  { clients: { lead: leadsClient } }: Context
) => leadsClient.editLead(lead)
