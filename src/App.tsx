import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { DiffusionLayoutFA2 } from './components/DiffusionLayoutFA2';


function App() {

  const [keyword, setKeyword] = useState('');
  const [json, setJson] = useState('');
  const [showing, setShowing] = useState(false);

  // const handleSubmit = (e:any) => {
  //   if (keyword.length === 0){
  //     alert("Keyword has left blank!");
  //   }
	// else{
	// 	const url = "http://salonika-e-sna.test/index.php"
	// 	// const url = `http://salonika-sna.test/${keyword}`
	// 	// const url = "http://salonika-e-sna-twitter-v1.test/index.php"


	// 	let fData = new FormData();
	// 	fData.append('keyword', keyword);
	// 	fData.append('btnVal', e.target.value)

	// 	axios.post(url, fData)
	// 	.then(response => {
  //     setShowing(true);
  //     console.log(response.data)
  //     // setJson(JSON.stringify(response.data));
  //     setJson(response.data);
  //   })
	// 	.catch(error => alert(error));
	// }
  // };

  const handleSubmit = (e:any) => {
    if (keyword.length === 0){
      alert("Keyword has left blank!");
    }
	else{
		// const url = "http://salonika-e-sna.test/index.php"
		const url = `http://salonika-sna.test/api/searches/${keyword}`
		// const url = "http://salonika-e-sna-twitter-v1.test/index.php"
    console.log(url);

    // let fData = new FormData();
		// fData.append('keyword', keyword);
    

		axios.get(url)
		.then(response => {
      setShowing(true);
      console.log(response.data)
      // setJson(JSON.stringify(response.data));
      setJson(response.data);
    })
		.catch(error => alert(error));
	}
  };

  return (
    <div className="App">
      <section id="search-banner">
        <div className="container">
            <div className="search">
                <h2>Salonika E-SNA</h2>
                <p>Retrieve information from Twitter and visualize</p>
                <form >
                    <input type="text" name="keyword" placeholder="Enter Keyword" required onChange={(e) => setKeyword(e.target.value)} />
                    <button type="button" className="btn-recent" name="btnrecent" value="recent" onClick={handleSubmit}>Recent</button>
                    <button type="button" className="btn-full-archive d-none" name="btnfull-archive" value="full-archive" onClick={handleSubmit}>Full-archive</button>
                </form>
            </div>
        </div>
      </section>
      <section id="boxes" className={showing ? "" : "d-none"}>
          <div className="container">
              <h2>Diffusion Network</h2>
              <div id="diffusion-network-chart">
				        <DiffusionLayoutFA2 data={json}/>
              </div>
          </div>
      </section>
      <section className='d-none'>
          <div className="container">
              <h2>Timeline</h2>
              <div id="timeline-chart">

              </div>
          </div>
      </section>
    </div>
  );
}

export default App;
