'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

// React table column helper
const columnHelper = createColumnHelper()

const columns = [
  
  columnHelper.accessor('fruit', {
    header: () => <div className='mx-8'>Fruit</div>,
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('qty', {
    header: () => <div className='mx-3'>Qty</div>,
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('unitPrice', {
    header: () => <div className='mx-3'>Unit($)</div>,
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor('subtotal', {
    header: () => <div className='mx-4'>Subtotal($)</div>,
    cell: info => info.renderValue(),
  }),  
]

// pricing of fruits
const fruitsData = {
  'apple': 2,
  'banana': 1.5,
  'pear': 2.3,
  'orange': 1.8
}

// list of available fruits
const fruitsList = Object.keys(fruitsData)

// function to validate input
const lineValidation = (line) => {
  // split entry line by space
  const lineSplit = line.toLowerCase().split(' ')
  // create json for item and qty
  const order = {}
  // iterate through lineSplit array to create json of item and qty
  for (let i=0; i<lineSplit.length; i++) {
    // iterate through fruitsList to check if the fruit is ordered
    for (let j=0; j<fruitsList.length; j++) {
      // if fruit in POS is the same as that in list
      if (lineSplit[i] === fruitsList[j]) {   
        // create a json entry of the fruit and its qty by removing the 'x' and converting str to int  
        order[fruitsList[j]] = parseInt(lineSplit[i+1].split('x')[1])
      }
    }      
  }
  console.log(order)

  const countValidation = {
    1: 2,
    2: 5,
    3: 8,
    4: 11
  }

  let count = 0
  let lineError = ''

  for (const [key1, value1] of Object.entries(order)) {
    if (order.hasOwnProperty(key1)) {
      count++
    }
    if (isNaN(value1)) {
      lineError = 'Input error in fruit quantity!'
    }
  }
  
  
  if (lineSplit.length !== countValidation[count]) {
    lineError = 'Input error in fruit name!'
  }
 
  return { order, lineError }
}

// function to calculate subtotal and total
const getOrderDetails = (order) => {
  const receipt = []
  let total = 0
  let i = 0
  // iterate through POS order
  for (const [key1, value1] of Object.entries(order)) {
    
    // iterate through pricelist 
    for (const [key2, value2] of Object.entries(fruitsData)) {
      if (key1 === key2) {
        // 0:fruit, 1: qty, 2: unitPrice, 3: subtotal
        const details = {}
        // get subtotal for a fruit
        details['fruit'] = key1
        details['qty'] = value1
        details['unitPrice'] = value2
        details['subtotal'] = value1 * value2
        total += value1 * value2

        receipt[i] = details
        i += 1
      }
    }
  }    
  
  return [receipt, {'total': total}]
}

export default function Home() {

  // react table 
  const [data, setData] = useState([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // ref for text input
  const lineRef = useRef()

  // useState for total cost
  const [total, setTotal] = useState(0)

  // useState for errors
  const [error, setError] = useState('')
  
  // function to handle form input
  const lineHandler = (event) => {
    event.preventDefault()
    setError('')
    const enteredLine = lineRef.current.value

    // apply validation
    const { order, lineError } = lineValidation(enteredLine)
    
    // calculate sub totals and total
    const receipt = getOrderDetails(order)
    console.log(receipt)
    setData(receipt[0])
    setTotal(receipt[1].total)
    setError(lineError)
  }

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
      <form onSubmit={lineHandler}>
        <div className='flex'>
          <label className='mx-2' htmlFor='items'>Items:</label>
          <input className='text-black' type='items' id='items' ref={lineRef}/>
        </div>
      </form>
      
      <div className="p-4">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      </div>
      <div className=''><b>Total: ${total}</b></div>
      <div>{error}</div>
    </main>
  )
}
