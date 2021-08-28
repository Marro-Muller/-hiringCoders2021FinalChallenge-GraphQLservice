import type { LeadInput } from '../typings/lead'

interface Args {
  lead: LeadInput
}

export const newLead = (
  _: any,
  { lead }: Args,
  { clients: { lead: leadsClient } }: Context
) => leadsClient.newLead(lead)
