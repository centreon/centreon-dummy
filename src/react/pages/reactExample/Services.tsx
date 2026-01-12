import React from 'react';

import {
  ListingModel,
  useFetchQuery,
  Listing,
  ColumnType,
  Column,
  buildListingEndpoint,
} from '@centreon/ui';
import { useAtom, atom } from 'jotai';

const columns: Column[] = [
  {
    getFormattedString: ({ host }): string => host.display_name,
    id: 'host',
    label: 'Host',
    type: ColumnType.string
  },
  {
    getFormattedString: ({ display_name }): string => display_name,
    id: 'name',
    label: 'Name',
    type: ColumnType.string
  }
]

const atoms = {
  page: atom(1),
  limit: atom(10)
}

export default function HostListing() {
  const [page, setPage] = useAtom(atoms.page)
  const [limit, setLimit] = useAtom(atoms.limit)

  const { data, isLoading, } = useFetchQuery<
    ListingModel<{ name: string; id: string }>
  >({
    getEndpoint: () => buildListingEndpoint({
      baseEndpoint: '/centreon/api/latest/monitoring/services',
      parameters: { limit, page }
    }),
    getQueryKey: () => [
      page,
      limit
    ],
    isPaginated: true,
  });

  return (
    <div style={{ marginTop: "20px"}}>
      <div>

        <div>
          Centreon Design System source code: <a style={{color: "blue"}} target="_blank" href="https://github.com/centreon/centreon/tree/develop/centreon/packages/ui"> Here</a>
        </div>

        <div>
          View Centreon Design System components: <a style={{color: "blue"}} target="_blank" href="https://65539c26347a2b106b5c65a9-coghqoiyuq.chromatic.com">Here </a>
        </div>

        <div>
          Check the latest @centreon/ui npm versions: <a style={{color: "blue"}} target="_blank" href="https://www.npmjs.com/package/@centreon/ui?activeTab=versions">Here </a>
        </div>

      </div>

      <div style={{height: "40vh"}}>
        <Listing
          actions={<h1 style={{fontWeight: "bold"}}> Example of the listing component </h1>}
          columns={columns}
          rows={data?.result}
          totalRows={data?.meta.total}
          loading={isLoading}
          currentPage={page}
          limit={limit}
          paginated={true}
          onPaginate={(page) => {
            // Avoid reset of value to incompatible level
            if (page <= 0) {
              page = 1;
            }
            setPage(page);
          }}
          onLimitChange={(limit) => {
            // Avoid reset of value to incompatible level
            if (limit <= 0) {
              limit = 1;
            }
            setLimit(limit);
          }}
        />
      </div>
    </div>)
};
