import React, { useEffect, useRef, useState } from 'react';
import './Replay.less'
import { Link, useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Marker from './Marker';
import { getSave } from '../../Utils/requests';

const Replay = () => {
  const { saveID } = useParams();
  const workspaceRef = useRef(null);
  const [step, setStep] = useState(0);
  const [replay, setReplay] = useState([])
  let playback;
  const setWorkspace = () => {
    workspaceRef.current = window.Blockly.inject('blockly-canvas',
        { toolbox: document.getElementById('toolbox') }
    );
  }

  const timeConverter = (timestamp) => {
    var dateVal = new Date(timestamp).toLocaleDateString('en-US');
    var a = new Date(timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = dateVal + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  };

  useEffect(() => {
    const getReplay = async () => {
      const save = await getSave(saveID);
      console.log(save)
      setReplay(save.data.replay)
    }
    getReplay();
  }, [])
  useEffect(() => {
    if (replay.length) {
      workspaceRef.current ? workspaceRef.current.clear() : setWorkspace();
      const xml = window.Blockly.Xml.textToDom(replay[step].xml);
      window.Blockly.Xml.domToWorkspace(xml, workspaceRef.current);
    }
  }, [replay, step]);

  const goBack = () => {
    setStep(step - 1);
  }
  // const play = () => {
  //   playback = setInterval(() => {
  //     console.log('firing');
  //     setStep(step + 1);
  //     console.log(step);
  //   }, 1000);
  // }
  const goForward = () => {
    setStep(step + 1);
  }

  return (
    <main className="container nav-padding">
      <NavBar />
      <div id="horizontal-container" className="flex flex-column">
        <div id="top-container" className="flex flex-column vertical-container">
          <div id="description-container" className="flex flex-row space-between card">
            <div className="flex flex-row">
              <Link id="link" to="/" className="flex flex-column">
                <i className="fa fa-home"/>
              </Link>
            </div>
            <div className="flex flex-row">
              <button className="replayButton" onClick={goBack} disabled={step === 0}>&#9198;</button>
              <button className="replayButton" disabled={playback}>&#9654;&#65039;</button>
              <button className="replayButton" onClick={goForward} disabled={step === (replay.length - 1)}>&#9197;</button>
            </div>
          </div>
        </div>
        <div className='flex flex-row'>
          <div id='bottom-container' className="flex flex-column vertical-container overflow-visible">
            <h1 id="section-header">Code Replay</h1>
            <div id="blockly-canvas"/>
            <div id="timeline">
              { replay.map((item, index) => <div className={step === index ? 'bold' : null} key={item.timestamp}>{timeConverter(item.timestamp)}<Marker /></div>)}
            </div>
          </div>
        </div>
        <div className='flex flex-row'>
          <section id='bottom-container' className="flex flex-column vertical-container overflow-visible">
            <h2 id="section-header">Logs</h2>
            <div>
              { replay.map((item, index) => <p className={step === index ? 'bold' : null} key={item.timestamp}>{timeConverter(item.timestamp)}</p>)}
            </div>
          </section>
        </div>
      </div>
      <xml id="toolbox" is="Blockly workspace"></xml>
    </main>
  )
};

export default Replay;