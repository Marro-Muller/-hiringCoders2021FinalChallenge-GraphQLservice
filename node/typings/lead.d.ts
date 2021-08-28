export interface Lead {
  id: string
  name: string
  email: string
  phoneNumber: string
  type: string
  leadAt: string
}

export interface LeadInput {
  name: Lead['name']
  email: Lead['email']
  phoneNumber: Lead['phone']
  type: Lead['type']
}

export interface LeadAWSList {
  Items: Lead[]
  Count: number
  ScannedCount: number
}

export interface AWSResponse {
  statusCode: number
  body: string
}

export type Maybe<T> = T | void
