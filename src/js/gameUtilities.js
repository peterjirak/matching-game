'use strict';

const getImgSrcPath = (collection, imageId) => {
    if (!imageId) {
        return null;
    }

    let collectionId = collection;
    collectionId = collectionId.trim();
    collectionId = collectionId.toLowerCase();
    collectionId = collectionId.replace(/ /g, '-');

    const src = `/src/images/match-collections/${collectionId}/${collectionId}-id-${imageId}.png`;

    return src;
}

export { getImgSrcPath };
