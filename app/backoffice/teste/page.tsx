'use client';


import { useEffect, useState } from "react";
import MyModal from "../components/MyModal";
import Swal from "sweetalert2";
import axios from "axios";
import config from "../../config";
export default function Page() {

    const [foodTypes,setFoodTypes] = useState([]);
    const [foodTypeId,setFoodTypeId] = useState(0);
    const [id,setId] = useState(0);
    const [name,setName] = useState("");
    const [remark,setRemark] = useState("");
    const [testes,setTestes] = useState([]);

useEffect(()=>{
    fetchDataFoodType();
    fetchData();
},[]);



const fetchData = async () => {
    try {
      const res = await axios.get(config.apiServer + "/api/teste/list");
      setTestes(res.data.results);
    } catch (e: any) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };


  const fetchDataFoodType = async () => {
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
    setFoodTypeId(parseInt(item.foodTypeId));
    setId(item.id);
    setName(item.name);
    setRemark(item.remark);
    //setMoneyAdded(item.moneyAdded);
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
                  config.apiServer + "/api/teste/remove/" + item.id
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
        foodTypeId : foodTypeId,
        name : name,
        remark : remark,
        id: id,
    }

    if (id == 0)
    {
        await axios.post(config.apiServer + "/api/teste/create",payload); 
    }
    else 
    {
        await axios.put(config.apiServer + "/api/teste/update",payload);
        setId(0);
    }

    fetchData();


    document.getElementById("modalteste_btnClose")?.click();
  };

  const clearForm = ()=>{
    setId(0);
    setName("");
    setRemark("");
  }


  return (
    <div className="card mt-3">
      <div className="card-header">รสชาติอาหาร</div>
      <div className="card-body">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modalteste"
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
            {/* <th className="text-end" style={{ width : '100px'}}>คิดเงินเพิ่ม</th> */}
            <th style={{ width : '110px'}}></th>
        </tr>
    </thead>
    <tbody>
            {testes.map((item: any) => (
              <tr key={item.id}>
                <td>{item.FoodType.name}</td>
                <td>{item.name}</td>
                <td>{item.remark}</td>
                {/* <td className="text-end">{item.moneyAdded}</td> */}
                <td className="text-center">
                  <button className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#modalteste" 
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
      <MyModal id="modalteste" title="ขนาดอาหาร/เครื่องดื่ม">
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