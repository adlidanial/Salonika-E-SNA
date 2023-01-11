import React, { useEffect } from "react";
import { MultiDirectedGraph } from "graphology";
import { SigmaContainer } from "@react-sigma/core";
import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import "@react-sigma/core/lib/react-sigma.min.css";
import { DiffusionNetworkChart } from "./DiffusionNetworkChart";
import GraphEvent from "./GraphEvent";

export const DiffusionLayoutFA2 = (props: any) => {
    const Fa2: React.FC = () => {
        const { start, kill } = useWorkerLayoutForceAtlas2({ settings: { slowDown: 10 } });
        useEffect(() => {

            // start FA2
            start();
            return () => {
              // Kill FA2 on unmount
              kill();
            };
          }, [start, kill]);
        return null;
    };
  
    return (
        <SigmaContainer 
        graph={MultiDirectedGraph} 
        style={{ height: "500px"}}
        settings={{ renderEdgeLabels: true, defaultEdgeType: "arrow" }}
        >
            <DiffusionNetworkChart data={props.data}/>
            <GraphEvent />
            <Fa2 />
        </SigmaContainer>
    );
};

export default DiffusionLayoutFA2;
