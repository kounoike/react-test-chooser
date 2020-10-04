import React, { useCallback, useEffect, useRef, useState } from 'react'

function useInterval(callback: (...args: any[]) => void, delay: number) {
    const savedCallback = useRef<(...args: any[]) => void>(()=>{});
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        if (savedCallback)
            savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
}

type Props = {
    bgColor: string,
    interval: number
}

function drawToCanvas(ctx: CanvasRenderingContext2D|undefined, count: number, bgColor: string): void {
    if (ctx) {
        ctx.save()
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, 400, 300)
        ctx.restore()
        ctx.save()
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, 400, 300)
        ctx.restore()
        ctx.save()
        ctx.font = '100pt Arial'
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.textBaseline = 'top'
        ctx.fillText(`${count}`, 30, 30)
        ctx.restore()
    }
}

const CountUpCanvas: React.FC<Props> = ({bgColor, interval}) => {
    const [count, setCount] = useState(0)
    const ctxRef = useRef<CanvasRenderingContext2D>()
    const canvasRef = useCallback(node => {
        if (node !== null) {
            ctxRef.current = (node as any).getContext('2d')
        }
    }, [])
    useEffect(() => drawToCanvas(ctxRef.current, count, bgColor), [ctxRef, count, bgColor])
    useInterval(() => setCount(count + 1), interval)
    return (
        <canvas ref={canvasRef} width="400" height="300"></canvas>
    )
}

export default CountUpCanvas