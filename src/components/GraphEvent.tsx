import React, { useEffect, useState } from "react";
import "../css/Modal.css";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useRegisterEvents, useSigma } from "@react-sigma/core";

const GraphEvent: React.FC = () => {
    const sigma = useSigma();
    const graph = sigma.getGraph();
    const registerEvents = useRegisterEvents();

    const [openModal, setOpenModal] = useState(false);
    const [retweetedByEdges, setRetweetedByEdges] = useState([{from: "", to: "", url: ""}]);
    const [hasRetweetedEdges, setHasRetweetedEdges] = useState([{from: "", to: "", url: ""}]);
    const [replyByEdges, setReplyByEdges] = useState([{from: "", to: "", url: ""}]);
    const [hasReplyEdges, setHasReplyEdges] = useState([{from: "", to: "", url: ""}]);
    const [quotedByEdges, setQuotedByEdges] = useState([{from: "", to: "", url: ""}]);
    const [hasQuotedEdges, setHasQuotedEdges] = useState([{from: "", to: "", url: ""}]);
    const [currentNode, setCurrentNode] = useState("");

    useEffect(() => {
      registerEvents({
        clickNode: (event) => {
            setRetweetedByEdges([]);
            setHasRetweetedEdges([]);
            setOpenModal(true);
          
            if (!graph.getNodeAttribute(event.node, "hidden")) {
              setCurrentNode(event.node);
              
              for(let i = 0; i < graph.neighbors(event.node).length; i++){

                if(graph.hasEdge(event.node, graph.neighbors(event.node)[i])){
                  // console.log(event.node+ " was retweeted by " + graph.neighbors(event.node)[i])
                  graph.mapEdges((key, value) => {
                    if(key === event.node+"->"+graph.neighbors(event.node)[i]){
                      // console.log(value.referenceType);
                      if(value.referenceType === "retweet"){
                        setRetweetedByEdges(RetweetedByEdges => [...RetweetedByEdges, {
                          from: event.node,
                          to: graph.neighbors(event.node)[i],
                          url: value.tweetUrl,
                        }])
                      }
                      else if(value.referenceType === "reply"){
                        setReplyByEdges(replyByEdges => [...replyByEdges, {
                          from: event.node,
                          to: graph.neighbors(event.node)[i],
                          url: value.tweetUrl,
                        }])
                      }
                      else if(value.referenceType === "quoted"){
                        setQuotedByEdges(quotedByEdges => [...quotedByEdges, {
                          from: event.node,
                          to: graph.neighbors(event.node)[i],
                          url: value.tweetUrl,
                        }])
                      }
                    }
                  })
                }
                else{
                  // console.log(event.node + " has retweeted " + graph.neighbors(event.node)[i])
                  graph.mapEdges((key, value) => {
                    if(key === graph.neighbors(event.node)[i]+"->"+event.node){
                      // console.log(value.referenceType);
                      if(value.referenceType === "retweet"){
                        setHasRetweetedEdges(HasRetweetedEdges => [...HasRetweetedEdges, {
                          from: graph.neighbors(event.node)[i],
                          to: event.node,
                          url: value.tweetUrl,
                        }])  
                      }
                      else if(value.referenceType === "reply"){
                        setHasReplyEdges(hasReplyEdges => [...hasReplyEdges, {
                          from: graph.neighbors(event.node)[i],
                          to: event.node,
                          url: value.tweetUrl,
                        }])
                      }
                      else if(value.referenceType === "quoted"){
                        setHasQuotedEdges(hasQuotedEdges => [...hasQuotedEdges, {
                          from: graph.neighbors(event.node)[i],
                          to: event.node,
                          url: value.tweetUrl,
                        }])
                      }               
                    }
                  })
                }
              }
            }
        },
      });

    }, [registerEvents]);

    if(!openModal) return null;
    
    return(
      <div className='overlay'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='modalContainer'
      >
        <div className='modalRight'>
          <h1 className="modalTitle">Account Name: @{currentNode}</h1>
          <p className='closeBtn' onClick={()=>setOpenModal(false)}>
            X
          </p>
          <div className="main-content">
            <div className='content' id="retweeted-by">
              <h2>Was Retweeted By:</h2>
              {retweetedByEdges.map((element) => {
                return (
                  <>
                    <p>Account Name: @{element.to} <a href={element.url} className="btnPrimary" target="_blank" rel="opentweet">Open tweet</a></p>
                  </>
                );
              })}
            </div>
            <div className="content" id="has-retweeted">
              <h2>Has Retweeted:</h2>
              {hasRetweetedEdges.map((element) => {
                return (
                  <>
                    <p>Account Name: @{element.from} <a href={element.url} className="btnPrimary" target="_blank" rel="opentweet">Open tweet</a></p>
                  </>
                );
              })}
            </div>
            <div className="content" id="replied-by">
              <h2>Was Replied By:</h2>
              {replyByEdges.map((element) => {
                return (
                  <>
                    <p>Account Name: @{element.to} <a href={element.url} className="btnPrimary" target="_blank" rel="opentweet">Open tweet</a></p>
                  </>
                );
              })}
            </div>
            <div className="content" id="has-replied">
              <h2>Has Replied:</h2>
              {hasReplyEdges.map((element) => {
                return (
                  <>
                    <p>Account Name: @{element.from} <a href={element.url} className="btnPrimary" target="_blank" rel="opentweet">Open tweet</a></p>
                  </>
                );
              })}
            </div>
            <div className="content" id="quoted-by">
              <h2>Was Quoted By:</h2>
              {quotedByEdges.map((element) => {
                return (
                  <>
                    <p>Account Name: @{element.to} <a href={element.url} className="btnPrimary" target="_blank" rel="opentweet">Open tweet</a></p>
                  </>
                );
              })}
            </div>
            <div className="content" id="has-replied">
              <h2>Has Quoted:</h2>
              {hasQuotedEdges.map((element) => {
                return (
                  <>
                    <p>Account Name: @{element.from} <a href={element.url} className="btnPrimary" target="_blank" rel="opentweet">Open tweet</a></p>
                  </>
                );
              })}
            </div>
          </div>
          <div className='btnContainer' onClick={()=>setOpenModal(false)}>
            <button className='btnPrimary'>
              <span className='bold'>Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default GraphEvent;