export default function Home() {

    
  
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className='text-xl my-5'>JENNY'S FRUITS POS</h1>
        <div className='my-5'>
          <h3 className='text-lg'>How To Use</h3>
          <div className='text-sm'>
            <div>Type fruit name, space, then quantity of fruit as xNumber</div>
            <div>Type 'and' if you have more than 1 fruit then repeat</div>
            <div>Examples:</div>
            <div><i>apple x1</i></div>
            <div><i>apple x1 and pear x2</i></div>
            <div><i>apple x1 and pear x2 and banana x3</i></div>
          </div>
        </div>
        
      </main>
    )
  }