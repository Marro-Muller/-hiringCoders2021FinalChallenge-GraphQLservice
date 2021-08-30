import type { ParamsContext, RecorderState, ServiceContext } from '@vtex/api'
import { Service } from '@vtex/api'

import { Clients } from './clients'
import { lead } from './resolvers/lead'
import { leads } from './resolvers/leads'
import { deleteLead } from './resolvers/deleteLead'
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
      events: {
        exponentialTimeoutCoefficient: 2,
        exponentialBackoffCoefficient: 2,
        initialBackoffDelay: 50,
        retries: 1,
        timeout: 3000,
        concurrency: 10,
      },
    },
  },

  graphql: {
    resolvers: {
      Mutation: {
        deleteLead,
        editLead,
        newLead,
      },
      Query: {
        lead,
        leads,
      },
    },
  },
})
