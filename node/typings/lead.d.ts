export interface Lead {
  id?: string
  name?: string
  email?: string
  phoneNumber?: string
  type?: string
  createdAt?: string
  updatedAt?: string
  leadAt?: string
  clientAt?: string
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

export interface AWSResponseLead {
  statusCode: number
  body: Lead
}

export interface AWSResponseLeads {
  statusCode: number
  body: Lead[]
}

export type Maybe<T> = T | void
