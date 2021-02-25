import React, { useState } from 'react';
import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { BaseCSSProperties } from '@material-ui/core/styles/withStyles';

const useStyles = makeStyles((theme) => {
  root: {
    backgroundColor : theme.palette.primary.dark
  }
})

const TestView = () => {

  return(
    <div>Hello World</div>
  )
}

export default TestView