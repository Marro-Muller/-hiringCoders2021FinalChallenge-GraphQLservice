import type { ParamsContext, RecorderState, ServiceContext } from '@vtex/api'
import { Service } from '@vtex/api'
import { prop } from 'ramda'

import { Clients } from './clients'
import { getLeads } from './resolvers/getLeads'
import { deleteLead } from './resolvers/delete'
import { editLead } from './resolvers/editLead'
import { newLead } from './resolvers/newLead'

const MEDIUM_TIMEOUT_MS = 2 * 1000

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>
}

// Export a service that defines resolvers and clients' options
export default new Service<Clients, RecorderState, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        timeout: MEDIUM_TIMEOUT_MS,
      },
    },
  },
  graphql: {
    resolvers: {
      Lead: {
        email: prop('email'),
      },
      Mutation: {
        delete: deleteLead,
        editLead,
        newLead,
      },
      Query: {
        getLeads,
      },
    },
  },
})
