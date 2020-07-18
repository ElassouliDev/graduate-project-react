import React from "react";

const CRUDY = (WrappedCompoenent, key) => (props) => {
   let Stores = {
      studentStore: {
         students: [],
         newToAdd: {
            name: "",
            age: 0
         },
         config: {
            name: "text",
            age: "number",
         },
         actions: {
            Add: (payload) => {
               this.students.push(payload)
            },
            Remove: (id) => {
               this.students.filter((item) => {
                  return item.id !== id
               })
            },
            Get: (payload) => {
               return this.students
            },
            Update: (payload) => {
               this.students.push(payload)
            }
         }, model: {
            name: "",
            age: 0,
         },
      },
   }
   const getAddFields = (config) => {
      return (
         <form>
            {Object.keys(Stores[key].config).map((item) => {
               return <input name={item} type={config[item]} onChange={(event) => {
                  Stores[key].newToAdd[event.name] = +event.target.value;
               }}>
               </input>
            })}
         </form>
      )
   }
   return (<div>
      <h1>{key}</h1>

      <h2>Add {key}</h2>
      {/* {getAddFields()} */}
      <WrappedCompoenent list={Stores[key]}></WrappedCompoenent>
   </div>
   )
}
export const DisplayList = (list) => {
   return <ul>
      {
         list.map((item) => {
            return Object.keys(item).toString()
         })
      }
   </ul>
}
export default CRUDY;
