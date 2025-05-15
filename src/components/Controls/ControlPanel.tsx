// src/components/Controls/ControlPanel.tsx
import React from "react";
import { Draggable } from "../../utils/draggable";
import { AlgorithmType } from "../../types";

interface ControlPanelProps {
  onPlay: () => void;
  onTogglePlay: (isPlaying: boolean) => void;
  startPosition: string | null;
  endPosition: string | null;
  algorithm: AlgorithmType;
  setAlgorithm: (algo: AlgorithmType) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onTogglePlay,
  startPosition,
  endPosition ,
  algorithm,
  setAlgorithm,
}) => {

  const [play, setPlay] = React.useState(false);
  
  return (
    <div className="flex pl-2.5 gap-4 mb-4 justify-batween items-center w-full">
      <div className="w-1/2 space-x-8 flex-row flex items-center h-fit">
      <div className=" text-white py-2 text-4xl">Pathfinding Visualizer</div>
     <div className="dropdown">
  <div
    tabIndex={play ? -1 : 0}
    role="button"
    className={`btn px-4 py-2 flex justify-center ${play ? 'pointer-events-none opacity-50' : ''}`}
  >
    {algorithm}
  </div>

  {!play && (
    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
      <li><a onClick={() => setAlgorithm("DIJKSTRA")}>Dijkstra</a></li>
      <li><a onClick={() => setAlgorithm("A_STAR")}>Astar</a></li>
    </ul>
  )}
</div>

</div>
<div className="w-1/2 justify-end flex gap-4 items-center">

{startPosition == null && (
  <div> 
    <Draggable id="bot">
      <img
        width="50"
        height="50"
        src="https://img.icons8.com/color/50/bot.png"
        alt="bot"
      />
    </Draggable>
  </div>
)}

{endPosition == null && (
<div>
<Draggable id="point">
<img
          width="64"
          height="64"
          src="https://img.icons8.com/nolan/64/point-objects.png"
          alt="point-objects"
        />
        </Draggable>
</div>
)}

<button
  className={`py-2 rounded hover:cursor-pointer ${
    (startPosition == null || endPosition == null) ? 'opacity-50 pointer-events-none' : ''
  }`}
  onClick={() => {
    const newPlayState = !play;
    setPlay(newPlayState); // Trigger the algorithm
    onTogglePlay(newPlayState);
  }}
  disabled={startPosition == null || endPosition == null}
>
  {!play && 
    <img width="100" height="100" src="https://img.icons8.com/clouds/100/play.png" alt="play"/>
  }
  {play && 
    <img width="100" height="100" src="https://img.icons8.com/clouds/100/repeat.png" alt="repeat"/>
  }
</button>

</div>
</div>
  );
};
export default ControlPanel;
