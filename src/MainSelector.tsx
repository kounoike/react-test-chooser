import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom';

const MountToOffScreen: React.FC<{elem: HTMLElement}> = ({elem, children})  => {
    return ReactDOM.createPortal(children, elem)
}

type Props = {
    mainRef: React.RefObject<HTMLDivElement>,
    isMain: boolean
}

const MainSelector: React.FC<Props> = ({mainRef, isMain, children}) => {
    const elem = useRef(document.createElement('div'))
    const ref = useRef<any>(null)
    useEffect(() => {
        if(isMain) {
            mainRef.current?.appendChild(elem.current)
        } else {
            ref.current?.appendChild(elem.current)
        }
    }, [mainRef, isMain, elem])

    return (
        <div style={{width: "200px", height: "150px", backgroundColor: "#cccccc", position: "relative"}}>
            <div style={{position: "absolute"}}>
                Current selected item
            </div>
            <div ref={ref} style={{transform: "scale(0.5)", transformOrigin: "0 0", position: "absolute"}}>
                <MountToOffScreen elem={elem.current}>{children}</MountToOffScreen>
            </div>
        </div>
    )
}

export default MainSelector
