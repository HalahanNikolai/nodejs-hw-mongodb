function parseSortBy(value) {
    if (typeof value === 'undefined') {
        return '_id';
    }
    const keys = [
        '_id',
        'name',
        'phoneNumber',
        'email',
        'isFavourite',
        'contactType',
        'createdAt',
        'year',
        'gender',
    ];
    if (keys.includes(value) === false) {
        return '_id';
    }
    return value;
}

function parseSortOrder(value) {
    if (typeof value === 'undefined') {
        return 'asc';
    }
    const keys = ['asc', 'desc'];
    if (keys.includes(value) === false) {
        return 'asc';
    }
    return value;
}

export function parseSortParams(query) {
    const { sortBy, sortOrder } = query;

    const parsedSortBy = parseSortBy(sortBy);
    const parsedSortOrder = parseSortOrder(sortOrder);
    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder
    };
}
