import React, { useState, useRef } from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";

import "./App.css";
import StickyHeadTable from "./components/data-table";
// import Elm from "./components/node-element";

function App() {
  const styles = {
    border: "1px solid #777",
    padding: 10,
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "150px",
  };

  const showInputs = (val) => {
    console.log(val);
  };

  const showOutputs = (val) => {
    console.log(val);
  };

  const [elements, setElements] = useState([
    {
      id: "0x0000",
      type: "default", // input node
      preval: "",
      node: true,
      sourcePosition: "right",
      targetPosition: "left",
      data: {
        label: (
          <div>
            <button onClick={() => showInputs("0x0000")}>1</button>0x0000
            <button onClick={() => showOutputs("0x0000")}>2</button>
          </div>
        ),
      },
      position: { x: 100, y: 50 },
      style: styles,
    },
  ]);

  const inputRef = useRef();
  const outputRef = useRef();
  const valueref = useRef();
  const [tableData, setTableData] = useState([]);
  const [tid, setTid] = useState(1);
  const [arrowid, setArrowid] = useState("a");
  const [xpos, setXpos] = useState(400);
  const [ypos, setYpos] = useState(150);
  const [addressMap, setAddressMap] = useState([
    { add: "0x0000", y_v: 50, x_v: 100 },
  ]);
  const [addlist, setAddlist] = useState(["0x0000"]);

  function check(val, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        return true;
      }
    }
    return false;
  }

  const updateChart = () => {
    // update xpos, ypos if value is new, else keep pos as the default pos in index
    //loopback effect, might be too convoluted
    //or
    //make list of address and cesp y level, unique address on each y level, with id != address as that creates loopback
    var inputval = inputRef.current.value;
    var outputval = outputRef.current.value;
    var valueval = valueref.current.value;

    console.log(tableData)

    if (check(outputval, addlist)) {
      console.log("in list");
      console.log(outputval, addlist);
      setElements((els) =>
        els.concat({
          id: arrowid,
          source: inputval,
          target: outputval,
          node: false,
          animated: true,
          label: valueval,
          labelBgStyle: { fill: "#fff", color: "#ffffff", fillOpacity: 0.7 },
          arrowHeadType: "arrowclosed",
        })
      );

      setTableData((data) =>
        data.concat({
          id: tid,
          code: tid,
          from: inputval,
          to: outputval,
          amt: valueval,
        })
      );

      setTid(tid + 1);

      setArrowid(arrowid + "a");
    } else {
      setElements((els) =>
        els.concat(
          {
            id: outputval,
            preval: inputval,
            node: true,
            // you can also pass a React component as a label
            data: { label: outputval },
            sourcePosition: "right",
            targetPosition: "left",
            position: { x: xpos, y: ypos },
          },
          {
            id: arrowid,
            source: inputval,
            node: false,
            target: outputval,
            animated: true,
            label: valueval,
            labelBgStyle: {
              fill: "#333",
              color: "#ffffff",
              fillOpacity: 0.8,
              fontWeight: 800,
            },
            arrowHeadType: "arrowclosed",
          }
        )
      );

      setTableData((data) =>
        data.concat({
          id: tid,
          cide: tid, 
          from: inputval,
          to: outputval,
          amt: valueval,
        })
      );

      setTid(tid + 1);

      setAddressMap(
        (els) => els.concat({ add: outputval, y_v: ypos, x_v: xpos }),
        console.log(addressMap)
      );

      setArrowid(arrowid + "a");
      setXpos(xpos + 300);
      setYpos(ypos + 100);
      setAddlist([...addlist, outputval]);
    }
  };

  const flow = [
    <ReactFlow
      elements={elements}
      elementsSelectable={false}
      nodesConnectable={false}
      nodesDraggable={true}
    >
      <Background color="#aaa" gap={15} />
      <Controls />
    </ReactFlow>,
  ];

  const table = [<StickyHeadTable els={tableData}></StickyHeadTable>];

  const [dtype, setDtype] = useState(true);

  const updateType = () => {
    dtype ? setDtype(false) : setDtype(true);
  };

  return (
    <div className="screen">
      from <input ref={inputRef} />
      to <input ref={outputRef} />
      value <input ref={valueref} />
      <button onClick={updateChart}>Submit</button>
      <button onClick={updateType}>change view</button>
      <div className="control-area">Display Text</div>
      <div className="flow-container">
        <div className="main-display">
          {/* <ReactFlow
            elements={elements}
            elementsSelectable={false}
            nodesConnectable={false}
            nodesDraggable={true}
          >
            <Background color="#aaa" gap={15} />
            <Controls />
          </ReactFlow> */}
          {dtype ? table : flow}
        </div>
      </div>
    </div>
  );
}

export default App;
