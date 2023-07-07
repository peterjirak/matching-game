import chevronUp from './images/application-controls/chevron-up.svg';

const DropdownSingleItemSelector = (props) => {
     return (
        <div className='single-drop-down-control-container'>
            <div className='single-drop-down-first-row'>
                <button className='single-drop-down-button-open-close'>
                    <img src={chevronUp} className='single-drop-down-button-open-close-img'/>
                </button>
                <div className='single-drop-down-title-segment'>
                    <p>8 x 8</p>
                </div>
            </div>
            <div className='single-drop-down-body-container'>
                <div className='single-drop-down-row-container'>
                    <div className='single-drop-down-left-spacer'>

                    </div>
                    <div className='single-drop-down-row-segment'>
                        <div className='single-drop-down-row-indicator'>
                        </div>
                        <p>4 x 4</p>
                        <div className='single-drop-down-row-spacer'>
                        </div>
                    </div>
                </div>

                <div className='single-drop-down-row-container'>
                    <div className='single-drop-down-left-spacer'>

                    </div>
                    <div className='single-drop-down-row-segment'>
                        <div className='single-drop-down-row-indicator'>
                        </div>
                        <p>6 x 6</p>
                        <div className='single-drop-down-row-spacer'>
                        </div>
                    </div>
                </div>

                <div className='single-drop-down-row-container'>
                    <div className='single-drop-down-left-spacer'>

                    </div>
                    <div className='single-drop-down-row-segment'>
                        <div className='single-drop-down-row-indicator'>
                            <div className='single-drop-down-row-indicator-selected'>
                            </div>
                        </div>
                        <p>8 x 8</p>
                        <div className='single-drop-down-row-spacer'>
                        </div>
                    </div>
                </div>

                <div className='single-drop-down-row-container'>
                    <div className='single-drop-down-left-spacer'>

                    </div>
                    <div className='single-drop-down-row-segment'>
                        <div className='single-drop-down-row-indicator'>
                        </div>
                        <p>10 x 10</p>
                        <div className='single-drop-down-row-spacer'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     )
}

export default DropdownSingleItemSelector;
