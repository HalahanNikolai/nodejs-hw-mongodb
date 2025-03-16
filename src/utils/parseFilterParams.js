

export const parseFilterParams = (query) => {
    const { isFavourite, type } = query;
    return {
        contactType: type ? type : null,
        isFavourite: isFavourite === 'true' ? true : isFavourite === 'false' ? false : null,
    };
};


