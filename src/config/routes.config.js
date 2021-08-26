import React from 'react';
const HomeView = React.lazy(() => import('src/views/home/home.view'));
const PickerView = React.lazy(() => import('src/views/picker/picker.view'));

 const options  = [
   {
     text: 'picker',
     route:'/picker',
     component: PickerView
   },
   {
    text: 'home',
    route:'/',
    component: HomeView
  }
  ]

 export default options;