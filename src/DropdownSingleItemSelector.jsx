import chevronUp from './images/application-controls/chevron-up.svg';
import chevronDown from './images/application-controls/chevron-down.svg';

const DropdownSingleItemSelector = (props) => {
    let itemsStr = props.items;
    const selected = props.selected;
    const setSelected = props.setSelected;
    const isOpen = props.isOpen;
    const setToOpen = props.setToOpen;

    itemsStr = itemsStr.trim();
    itemsStr = itemsStr.replace(/^\s*"\s*/, '');
    itemsStr = itemsStr.replace(/\s*"\s*$/, '');
    const items = itemsStr.split(/\s*"\s*,\s*"\s*/);
    let selectorElements = null;

    const toggleMenuBody = () => {
        setToOpen(isOpen ? false : true)
    }

    if (isOpen) {
        selectorElements = [];
        for (const item of items) {
            const indicatorElement = item === selected ?
                                    <div className='single-drop-down-row-indicator'>
                                        <div className='single-drop-down-row-indicator-selected'>
                                        </div>
                                    </div>
                                    :
                                    <button className='single-drop-down-row-indicator' type='button'>
                                    </button>
            const selectorElement =
                <div className='single-drop-down-row-container'
                     onClick={item !== selected ?
                              () => { setSelected(item) } :
                              () => {}
                             }
                >
                    <div className='single-drop-down-left-spacer'>
                    </div>
                    <div className='single-drop-down-row-segment'>
                        {indicatorElement}
                        <p>{item}</p>
                        <div className='single-drop-down-row-spacer'>
                        </div>
                    </div>
                </div>
            selectorElements.push(selectorElement);
        }

        selectorElements =
            <div className='single-drop-down-body-container'>
                {selectorElements}
            </div>
    }

    return (
        <div className='single-drop-down-control-container'>
            <div className='single-drop-down-first-row' onClick={toggleMenuBody}>
                <button className='single-drop-down-button-open-close' type='button'>
                    <img src={isOpen ? chevronUp : chevronDown} className='single-drop-down-button-open-close-img'/>
                </button>
                <div className='single-drop-down-title-segment'>
                    <p>{selected}</p>
                </div>
            </div>
            {selectorElements}
        </div>
    )
}

export default DropdownSingleItemSelector;
