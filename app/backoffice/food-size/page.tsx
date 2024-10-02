'use client';


import { useEffect, useState } from "react";
import MyModal from "../components/MyModal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";
export default function Page() {

    const [id,setId] = useState(0);
    const [name,setName] = useState("");
    const [remark,setRemark] = useState("");
    const [foodTypeId,setFoodTypeId] = useState(0);
    const [moneyAdded,setMoneyAdded] = useState(0);
    const [foodTypes,setFoodTypes] = useState([]);
    const [foodSizes,setFoodSizes] = useState([]);

useEffect(()=>{
    fetchData();
    fetchDataFoodSize();
},[]);



const fetchData = async () => {
    try {
      const rows = await axios.get(config.apiServer + "/api/foodSize/list");
      setFoodSizes(rows.data.results);
    } catch (e: any) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };


  const fetchDataFoodSize = async () => {
    try {
        const rows = await axios.get(config.apiServer + "/api/foodType/list");
        setFoodTypes(rows.data.results);
        setFoodTypeId(rows.data.results[0].id);
      } catch (e: any) {
        Swal.fire({
          title: "error",
          text: e.message,
          icon: "error",
        });
      }
  };

  const edit = (item:any)=> {
    // alert(item.foodTypeId);
    setFoodTypeId(parseInt(item.foodTypeId));
    setId(item.id);
    setName(item.name);
    setRemark(item.remark);
    setMoneyAdded(item.moneyAdded);
  };

  const remove = async (item:any)=> {
    try {
              const button = await Swal.fire({
                title: "ยืนยันการลบ",
                text: "คุณต้องการลบใช่หรือไม่",
                icon: "question",
                showCancelButton: true,
                showConfirmButton: true,
              });
              if (button.isConfirmed) {
                await axios.delete(
                  config.apiServer + "/api/foodSize/remove/" + item.id
                );
             
                fetchData();
              }
            } catch (e: any) {
              Swal.fire({
                title: "error",
                text: e.message,
                icon: "error",
              });
            }
  };

  const save = async ()=> {
    const payload = {
        name : name,
        remark : remark,
        id: id,
        foodTypeId : foodTypeId,
        moneyAdded : moneyAdded,
    }

    if (id == 0)
    {
        await axios.post(config.apiServer + "/api/foodsize/create",payload); 
    }
    else 
    {
        await axios.put(config.apiServer + "/api/foodsize/update",payload);
    }

    fetchData();


    document.getElementById("modalFoodSize_btnClose")?.click();
  };

  const clearForm = ()=>{
    setId(0);
    setName("");
    setRemark("");
    setMoneyAdded(0);
  }

//   const handleRemove = async (item: any) => {
//     try {
//       const button = await Swal.fire({
//         title: "ยืนยันการลบ",
//         text: "คุณต้องการลบใช่หรือไม่",
//         icon: "question",
//         showCancelButton: true,
//         showConfirmButton: true,
//       });
//       if (button.isConfirmed) {
//         await axios.delete(
//           config.apiServer + "/api/foodType/remove/" + item.id
//         );
     
//         fetchData();
//       }
//     } catch (e: any) {
//       Swal.fire({
//         title: "error",
//         text: e.message,
//         icon: "error",
//       });
//     }
//   };

//   const edit = async (item: any) => {
//     setId(item.id);
//     setName(item.name);
//     setRemark(item.remark);
//   };


//   const handleSave = async () => {
//     try {
//       const payload = {
//         name: name,
//         remark: remark,
//         id: id,
//       };
//       if (id == 0) {
//         await axios.post(config.apiServer + "/api/foodType/create", payload);
//       } else {
//         await axios.put(config.apiServer + "/api/foodType/update", payload);
//         setId(0);
//       }
//       fetchData();
//       document.getElementById("modalFoodType_btnClose")?.click();
//     } catch (e: any) {
//       Swal.fire({
//         title: "error",
//         text: e.message,
//         icon: "error",
//       });
//     }
//   };

  


  

  return (
    <div className="card mt-3">
      <div className="card-header">ประเภทอาหาร/เครื่องดื่ม</div>
      <div className="card-body">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalFoodSize"
          onClick={clearForm}
        >
          <i className="fa fa-plus me-2"></i>เพิ่มรายการ
        </button>


<table className="mt-3 table table-bordered table-striped">
    <thead>
        <tr>
            <th style={{ width : '150px'}}> ประเภทอาหาร</th>
            <th style={{ width : '100px'}}> ชื่อ</th>
            <th>หมายเหตุ</th>
            <th className="text-end" style={{ width : '100px'}}>คิดเงินเพิ่ม</th>
            <th style={{ width : '100px'}}></th>
        </tr>
    </thead>
    <tbody>
            {foodSizes.map((item: any) => (
              <tr key={item.id}>
                <td>{item.FoodType.name}</td>
                <td>{item.name}</td>
                <td>{item.remark}</td>
                <td className="text-end">{item.moneyAdded}</td>
                <td className="text-center">
                  <button className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#modalFoodSize" 
                      onClick={(e)=> edit(item)}
                  >
                    <i className=" fa fa-edit"></i>
                  </button>
                  <button className="btn btn-danger" onClick={(e) => remove(item)}>
                    <i className=" fa fa-times"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
</table>

      </div>
      <MyModal id="modalFoodSize" title="ขนาดอาหาร/เครื่องดื่ม">
        <div>ประเภทอาหาร</div>
        <select className="form-control"
        value={foodTypeId}
        onChange={(e)=> setFoodTypeId(parseInt(e.target.value))}>
            {foodTypes.map((item: any)=>(
                <option value={item.id} key={item.id}>
                    {item.name}
                </option>
            ))}
        </select>

        <div className="mt-3">ชื่อ</div>
        <input className="form-control" value={name} onChange={e=> setName(e.target.value)} />


        <div className="mt-3">คิดเงินเพิ่ม (บาท)</div>
        <input className="form-control" value={moneyAdded} onChange={e=> setMoneyAdded(parseInt(e.target.value))} />

        <div className="mt-3">หมายเหตุ</div>
        <input className="form-control" value={remark} onChange={e=> setRemark(e.target.value)} />
        <div className="mt-3">
          <button className="btn btn-primary" onClick={save}>
            <i className="fa fa-check me-2"></i>บันทึก
          </button>
        </div>
      </MyModal>
    </div>
  );
}