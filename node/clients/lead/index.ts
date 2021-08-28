import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type {
  Lead,
  LeadInput,
  LeadAWSList,
  AWSResponse,
  Maybe,
} from '../../typings/lead'

export class LeadClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      'https://ib90fko1tg.execute-api.us-east-1.amazonaws.com',
      context,
      options
    )
  }

  public getLeads = () => {
    const items = this.http
      .post<LeadAWSList>('/default/apiAcctLead', {
        operation: 'list',
        tableName: 'desafiovtexlead',
        payload: {},
      })
      .then((receivedData) => {
        return receivedData.Items
      })

    return items
  }

  public delete = (id: string) => {
    console.info(id)
  }

  public editLead = (id: string, lead: LeadInput): Maybe<Lead> => {
    console.info(`${id}, ${lead}`)
  }

  public newLead = async (lead: LeadInput) => {
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
