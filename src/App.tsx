import React from 'react';

interface Props {
  text: string;
}


const Text = ({ text }: Props) => {
  return <h2>{text}</h2>
}

const App = () => (
  <>
    <h1>Hello React</h1>
    <Text text="This is h2 change"/>
  </>

);

export default App;