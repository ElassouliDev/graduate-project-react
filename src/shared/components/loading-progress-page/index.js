import React from 'react';
import { CircularProgress } from '@material-ui/core';


export default function LoadingProgressPage(props) {

    return          <div className='fixed top-0 left-0  w-full  h-full pt-20 text-center flex justify-center items-center bg-gray-400 z-50 '>
    <CircularProgress />
                     </div> ;
}