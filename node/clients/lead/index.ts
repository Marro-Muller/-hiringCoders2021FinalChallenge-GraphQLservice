import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type { LeadInput, AWSResponse } from '../../typings/lead'

export class LeadClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://ib90fko1tg.execute-api.us-east-1.amazonaws.com',
      context,
      options
    )
  }

  public getLeads = (email: string) => {
    const leads = {
      payload: {
        Item: {
          email,
        },
      },
    }

    console.info(leads)

    const items = this.http
      .get<AWSResponse>('/default/apiAcctLead')
      .then((receivedData) => {
        return receivedData
      })

    return items
  }

  public delete = (id: string) => {
    console.info(id)
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
