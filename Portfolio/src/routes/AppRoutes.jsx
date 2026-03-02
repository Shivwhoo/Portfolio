import {BrowserRouter, Routes, Route, createBrowserRouter} from 'react-router-dom'
import Home from '../pages/Home'
import Projects from '../pages/Project'
import Contact from '../pages/Contact'
import MainLayout from '../layouts/MainLayout'

// export default function AppRoutes(){
//     return(
//         <BrowserRouter>
        
//             <Routes>
//                 <Route element={<MainLayout />}>
//                     <Route path='/' element={<Home />}></Route>
//                     <Route path='/projects' element={<Projects />}></Route>
//                     <Route path='/contact' element={<Contact />}></Route>
//                     <Route path='*' element={<NotFound />}></Route>
//                 </Route>
//             </Routes>

//         </BrowserRouter>
//     )
// }

const router=createBrowserRouter([

    {
        path:'/',
        element:<MainLayout />,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/projects',
                element:<Projects />
            },
            {
                path:'/contact',
                element:<Contact />
            },

        ]
    }
])

export default router;