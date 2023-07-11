const LargeImageViewer = (props) => {
    const imageId = props.imageId;
    const collection = props.collection;
    const setIdOfLargeImageToView = props.setIdOfLargeImageToView;

    if (!imageId) {
        return null;
    }

    let collectionId = collection;
    collectionId = collectionId.trim();
    collectionId = collectionId.toLowerCase();
    collectionId = collectionId.replace(/ /g, '-');

    const src = `/src/images/match-collections/${collectionId}/${collectionId}-id-${imageId}.png`;

    const onClick = () => {
        setIdOfLargeImageToView(null);
    }

    return (
        <div className='large-image-viewer-container' onClick={onClick}>
            <img id='large-image' className='large-image' src={src}></img>
        </div>
    );
}

export default LargeImageViewer;
