import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import HomePage from './Pages/Home';
import NotePage from './Pages/Note';
import PageNotFound from './Pages/PageNotFound'

const router = createBrowserRouter([{
  path : "/",
  element : <HomePage/>
},
{
  path : "/Home",
  element : <HomePage/>
},
{
  path : "/Note",
  element : <NotePage/>
},{
  path : "*",
  element : <PageNotFound/>
}])


function App() {

  return (
    <>
      {/* <HomePage/> */}
      {/* <NotePage/> */}
      <RouterProvider router={router}/>
    </>
  )
}

export default App
