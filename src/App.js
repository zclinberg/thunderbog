import logo from './logo.svg';

import Form from './Form';

function App() {
  return (
    <div className="flex flex-col flexgrow bg-slate-800 min-h-screen  min-w-screen">
      <div className="flex flex-row justify-center p-5">
        <Form/>
      </div>
    </div>
  );
}

export default App;
