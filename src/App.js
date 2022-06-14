import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // default Structure of the user

  // const person = {
  //   "id": 2,
  //   "email": "janet.weaver@reqres.in",
  //   "first_name": "Janet",
  //   "last_name": "Weaver",
  //   "avatar": "https://reqres.in/img/faces/2-image.jpg"
  // }

  const [person, setperson] = useState({});

  const [loadingState, setloadingState] = useState(0);

  const [data, setdata] = useState([])

  useEffect(() => {
    axios.get("https://reqres.in/api/users/").then((response) => {
      setdata(response.data.data);
    });
  }, [])

  const presentUserData = (id) => {
    setloadingState(1);
    axios.get(`https://reqres.in/api/users/${id}`).then((response) => {
      setTimeout(() => {
        setperson(response.data.data);
        setloadingState(2);
      }, 1000);
    });
  }

  return (
    <div className="App">
      <div className='person-card'>
        <div className="container">
          {loadingState === 1 ? <div className="wrapper2">
            <ReactLoading type={"balls"} color={"blue"} height={'20%'} width={'20%'} />
          </div> : loadingState === 0 ? <div className="wrapper2">
            <div className='text-only'>
              Please Select ID
            </div>
          </div> : <div className="wrapper">
            <img src="https://digitshack.com/codepen/mentor4/bg-pattern-card.svg" alt="" />
            <div className="content">
              <img src={person.avatar} alt="" />
              <h2>{person.first_name + " " + person.last_name}, <span>{person.id}</span></h2>
              <p>{person.email}</p>
            </div>
          </div>
          }
        </div>
      </div>
      <div className='user-List'>
        {data.map((item, index) => {
          return <ul onClick={() => presentUserData(item.id)} key={item.id}>
            {item.id}
          </ul>
        })}
      </div>
    </div>
  );
}

export default App;
