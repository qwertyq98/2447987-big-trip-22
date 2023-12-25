import { filtersGenerateInfo } from './utils/filter.js';

function generateFilter(points) {
  return Object.entries(filtersGenerateInfo).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(points).length,
    }),
  );
}

export {generateFilter};
