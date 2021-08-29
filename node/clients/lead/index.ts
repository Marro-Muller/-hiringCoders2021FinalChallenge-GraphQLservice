import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type {
  LeadInput,
  AWSResponse,
  AWSResponseLead,
  AWSResponseLeads,
} from '../../typings/lead'

export class LeadClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://ib90fko1tg.execute-api.us-east-1.amazonaws.com',
      context,
      options
    )
  }

  public lead = (email: string) => {
    const items = this.http
      .get<AWSResponseLeads>(`/default/apiAcctLead/${email}`)
      .then((receivedData) => {
        return receivedData
      })

    return items
  }

  public leads = () => {
    const items = this.http
      .get<AWSResponseLead>(`/default/apiAcctLead/*`)
      .then((receivedData) => {
        return receivedData
      })

    return items
  }

  public delete = (email: string) => {
    const res = this.delete(`/default/apiAcctLead/${email}`)

    console.info(res)
  }

  public editLead = (lead: LeadInput) => {
    const editLead = {
      payload: {
        Item: {
          name: lead?.name,
          phoneNumber: lead?.phoneNumber,
          email: lead?.email,
        },
      },
    }

    const res = this.http
      .put<AWSResponse>('/default/apiAcctLead', editLead)
      .then((receivedData) => {
        return receivedData
      })

    return res
  }

  public newLead = (lead: LeadInput) => {
    const newLead = {
      payload: {
        Item: {
          name: lead.name,
          phoneNumber: lead.phoneNumber,
          email: lead.email,
          type: lead.type,
        },
      },
    }

    const res = this.http
      .post<AWSResponse>('/default/apiAcctLead', newLead)
      .then((receivedData) => {
        console.info(res)
        console.info(receivedData)

        return receivedData
      })

    return res
  }
}
