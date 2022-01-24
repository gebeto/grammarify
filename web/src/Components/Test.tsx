import React from 'react';
import Popover from '@mui/material/Popover';



const useAnimatedValue = (_value: number, _animationDuration: number) => {
  const [value, setValue] = React.useState(_value);

  React.useEffect(() => {
    if (value === _value) {
      return;
    }

    const animationDuration = _animationDuration;
    const startValue = value;
    const endValue = _value;

    let startTime = 0;
    let currentValue = startValue;

    function animateNextFrame(currentTime: number) {
        if (!startTime) {
          startTime = currentTime;
        }
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < animationDuration) {
          currentValue = Math.floor((elapsedTime / animationDuration) * (endValue - startValue));
          setValue(startValue + currentValue);
          window.requestAnimationFrame(animateNextFrame);
        } else {
          setValue(endValue);
        }
    }

    window.requestAnimationFrame(animateNextFrame);
  }, [_value]);

  return value;
}


export const Test: React.FC = () => {
  const [ref1, setRef1] = React.useState<HTMLDivElement>();
  const [ref2, setRef2] = React.useState<HTMLDivElement>();

  const [index, setIndex] = React.useState(1);

  const ref = [150, 480][index % 2];
  
  const top = useAnimatedValue(ref, 400);
  const position = { top: top, left: 100 };

  return (
    <div>
      <div style={{ position: 'fixed', left: 100, top: 400, background: 'green' }} ref={setRef1}>Hello world 1</div>
      <div style={{ position: 'fixed', left: 400, top: 100, background: 'blue' }} ref={setRef2}>Hello world 2</div>

      <div style={{
        ...position,
        top: top,
        position: 'fixed',
        width: 10,
        height: 10,
        transform: `translate(-5px, -5px)`,
        borderRadius: 5,
        backgroundColor: 'red',
        // transitionDuration: '1s',
      }}></div>

      <Popover
        open
        // anchorEl={ref}
        anchorPosition={position}
        anchorReference="anchorPosition"
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        Hello world popover
        <button onClick={() => setIndex(index + 1)}>Next</button>
      </Popover>
    </div>
  );
}