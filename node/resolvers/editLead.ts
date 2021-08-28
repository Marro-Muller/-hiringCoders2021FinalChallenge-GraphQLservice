import type { LeadInput } from '../typings/lead'

interface EditLeadArg {
  id: string
  lead: LeadInput
}

export const editLead = (
  _: any,
  { id, lead }: EditLeadArg,
  { clients: { lead: leadsClient } }: Context
) => leadsClient.editLead(id, lead)
