import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Missing from "./Missing";
import Footer from "./Footer";
import About from "./About";
import { BrowserRouter as Router, Route, Routes, HashRouter} from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from 'date-fns';

function App() {

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Magic of Alaipayuthey",
      datetime: "April 14, 2020 11:17:36 AM",
      body: "Released on 14 April 2000, Alaipayuthey is one of those optimistic, cheerful moments of cinematic nostalgia that are played back in fondness. The magic of 'Snehithane' lies in the delicate touches that accompany Sadhana Sargam’s beautiful voice, in addition to the evocative sarod that adds depth and pathos to the song. In contrast, 'Pachai Nirame' is a highly lyrical, flowing, refreshing composition that bursts with happiness. It is difficult for someone uneducated in music to try to express in words what can only be experienced. Regardless, it is a song that can be listened to again and again over 20 years."
    },
    {
      id: 2,
      title: "Vizhi Moodi",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "This is a 2009 Indian Tamil-language song by Harris Jayraj from the movie Ayan"
    },
    
    {
      id: 4,
      title: "Pookkale Satru Oyivendungal",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Pookkalae Sattru Oyivedungal  is a romantic Tamil song from the 2015 Tamil film, Composed by A. R. Rahman, the song is sung by Shreya Ghoshal and Haricharan, with lyrics penned by Madhan Karky"
    },
    {
      id: 3,
      title: "Jiya Jale",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  //const history = useHistory();

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults);
  }, [posts, search])

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    //history.push('/');
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    //history.push('/');
  }


  
  return (
    <HashRouter basename="/"> 
    <div className="App">
      <Router>
        <Header title="Music Blog"/>
        <Nav search={search} setSearch={setSearch} />      
        <Routes>
          <Route exact path="/" element={ <Home posts={searchResults} />}/>
          <Route exact path="/post" element={<NewPost handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}/>} />
          <Route exact path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
          <Route path="/about" Component={About} />
          <Route path="*" Component={Missing} />
        </Routes>
        <Footer />
      </Router>
    </div>
    </HashRouter>
  );
}

export default App;
