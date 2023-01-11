import { useEffect, useState } from "react";
import { MultiDirectedGraph } from "graphology";
import { Attributes } from "graphology-types";

import { useLoadGraph, useSigma, useRegisterEvents, useSetSettings } from "@react-sigma/core";
// import { useLayoutCircular } from "@react-sigma/layout-circular";
// import { useLayoutCirclepack } from "@react-sigma/layout-circlepack";
import circular from "graphology-layout/circular";
import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";


import "@react-sigma/core/lib/react-sigma.min.css";

import { useSeedRandom } from "./useSeedRandom";

export const DiffusionNetworkChart = (props: any) => {
    const sigma = useSigma();
    const { randomColor } = useSeedRandom();
    // const { positions, assign } = useLayoutCircular();
    // const { positions, assign } = useLayoutCirclepack();
    const registerEvents = useRegisterEvents();
    const loadGraph = useLoadGraph();
    const setSettings = useSetSettings();
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    useEffect(() => {

      const graph = new MultiDirectedGraph();

      Object.keys(props.data).forEach((key, index) => {
        const fromUsername = props.data[index].from_user_name;
        const toUsername = props.data[index].to_user_screen_name;
        const createdDate = props.data[index].created_date;
        const text = props.data[index].text;
        const tweetUrl = props.data[index].tweet_url;
        const referenceId = props.data[index].tweet_id;
        const referenceType = props.data[index].tweet_type;
        let isExist = false;


        if(fromUsername !== undefined && fromUsername !== ""){
          if(!graph.hasNode(fromUsername)){
            graph.addNode(fromUsername, {color: randomColor(), x: Math.random() * 2, y: Math.random() * 2, label: fromUsername, size: 2});
          }

          if(toUsername !== undefined && toUsername !== ""){
            if(!graph.hasNode(toUsername)){
              graph.addNode(toUsername, {color: randomColor(), x: Math.random() * 2, y: Math.random() * 2, label: toUsername, size: 2});
            }
          }
          
        }

        graph.mapEdges((key, value) => {
          if(key === fromUsername+"->"+toUsername){
            isExist = true;
          }
        })

        // console.log(fromUsername);
        // console.log(toUsername);




        if(fromUsername !== ""){
          if(!isExist){
            graph.addDirectedEdgeWithKey(fromUsername+'->'+toUsername, fromUsername, toUsername, {createdDate: createdDate, text: text, tweetUrl: tweetUrl, 
              referenceId: referenceId, referenceType: referenceType, size: 1});
          }
        }
      });

      loadGraph(graph);
      circular.assign(graph);

      registerEvents({
        enterNode: (event) => setHoveredNode(event.node),
        leaveNode: () => setHoveredNode(null),
      });
      
    }, [circular, loadGraph, registerEvents, randomColor, props.data]);

    useEffect(() => {

      setSettings({
        nodeReducer: (node, data) => {
          const graph = sigma.getGraph();
          const newData: Attributes = { ...data, highlighted: data.highlighted || false };
  
          if (hoveredNode) {
            if (node === hoveredNode || graph.neighbors(hoveredNode).includes(node)) {
              newData.highlighted = true;
            } else {
              newData.color = "#E2E2E2";
              newData.highlighted = false;
            }
          }
          return newData;
        },
        edgeReducer: (edge, data) => {
          const graph = sigma.getGraph();
          const newData = { ...data, hidden: false };
  
          if (hoveredNode && !graph.extremities(edge).includes(hoveredNode)) {
            newData.hidden = true;
          }
          return newData;
        },
      });
    }, [hoveredNode, setSettings, sigma]);

    return null;
};