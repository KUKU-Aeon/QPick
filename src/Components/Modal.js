
const Modal = (props) =>
{
    const top = window.pageYOffset;

    return (<div  className={`overlay ${!props.visibility ?  ' ' : 'show'}`}>
        {props.visibility && (
            <div className={`modal`} style={{top: `${top + 150}px`}}>
                <svg height="200" viewBox="0 0 200 200" width="200" onClick={() => {props.state.toggleVisibility()}}>
                    <title />
                    <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
                </svg>
                {props.content}
            </div>
        )}
      </div>)
}

export default Modal;