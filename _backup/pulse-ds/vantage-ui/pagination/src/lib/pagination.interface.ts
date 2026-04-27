import { VcPagination } from './pagination.component';

/**
 * Custom change event.
 * @see {@link VcPagination.onChange}
 * @group Events
 */
export type VcPaginationChangeEvent = {
  /**
   * New page number.
   */
  newPage: number;

  /**
   * Page size
   */
  pageSize?: number;

  /**
   * Browser event.
   */
  originalEvent?: Event;
};
