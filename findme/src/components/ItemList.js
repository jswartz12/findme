import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import Pagination from "./Pagination";


const ItemList = function (props) {
    //This is the code to format how the list of items to be displayed
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [style1, setStyle1] = useState("fixedHeight");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = props.items.slice(indexOfFirstItem, indexOfLastItem);
    const [currentItem, setCurrentItem] = useState("", "", "", "", "", "", "", "", "", "", "", "");
    let tableHeader = [];
    if (props.active === "H") {
        tableHeader = ["", "ID", "Date Found", "Name", "Category", "Description", "Value", "Location Found", "", "Officer Badge", "", ""];
    }
    if (props.active === "C") {
        tableHeader = ["ID", "Date Claimed", "Name", "Category", "Description", "Value", "", "Claimant", "Officer Badge", "", ""];
    }
    if (props.active === "R") {
        tableHeader = ["ID", "Date Lost", "Item", "Category", "Description", "Value", "Location Lost", "Reported by", "", "", ""];
    }


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function checkNull(item) {
        if (item !== null) {
            return (<>{item}<br/></>)
        } else {
            return (<></>);
        }
    }

    function returnDOB(item) {
        if (item === null || item === '0000-00-00') {
            return null;
        } else {
            return (<>DOB: {formatDate(item)}<br/></>)
        }

    }

    function returnDL(item) {
        if (item === '' || item === null) {
            return null;
        } else {
            return (<>DL: {item}<br/></>)
        }

    }

    function returnAUID(item) {
        if (item === '' || item === null) {
            return null
        } else {
            return (<>AUID: {item}<br/></>)
        }


    }

    function formatDate(inputDate) {
        let date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
            // Months use 0 index.
            return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
        }

    }



    let counter = 0;

    function generateKey(i) {
        let key = i
        if (i == "") {
            counter++;
            return counter;
        }
        if (i.Status_FK === 'Lost') {
            key += "L"
        }
        if (i.Status_FK === 'Unclaimed') {
            key += 'F'
        }
        if (i.Status_FK === 'Claimed') {
            key += 'C'
        }

        return key;
    }

    function toggleBox(i) {
        if(props.active === "H")
        return(
        <td className="input-group-text">
            {/*<CheckBox item={i} handlechange={toggleHandler(i)} />*/}
            <input
                onChange={(e) => {
                    // add to list
                    if (e.target.checked) {
                        props.setItemInfo([
                            ...props.itemInfo,
                            i.Item_ID,
                        ]);
                    } else {
                        // remove from list
                        props.setItemInfo(
                            props.itemInfo.filter(item => item !== i.Item_ID),
                        );
                    }
                }}
                value={props.itemInfo}
                // <-- use checked prop, retrieve value by id
                type="checkbox"
            />
        </td>
        )
    }


    return (

        <div className="itemTable">
            <table className="table">
                <thead className="table-dark">
                <tr scope="row">

                    {tableHeader.map((i) => (
                        <td key={generateKey(i)}>{i}</td>

                    ))}
                </tr>
                </thead>
                <tbody>
                {props.items.map((i) => (
                    <tr key={generateKey(i.Item_ID)}>
                        {toggleBox(i)}
                        <td>{i.Item_ID}</td>
                        <td>{formatDate(i.ISH_Date)} {i.ISH_Time}</td>
                        <td className={style1}>{i.Item_Name}</td>
                        <td>{i.Category_Name}</td>
                        <td>
                            <div className={style1}>{i.Item_Desc}</div>
                        </td>
                        <td>${i.Item_Value}</td>
                        <td>
                            <div className={style1}>{i.ISH_Location}</div>
                        </td>
                        <td>
                            <div className={style1}> {i.User_Fname} {i.User_Lname}<br/>
                                {checkNull(i.User_Phone)}
                                {checkNull(i.User_Email)}
                                {returnDOB(i.User_DOB)}
                                {returnDL(i.User_DL)}
                                {returnAUID(i.User_AUID)}
                            </div>
                        </td>
                        <td>{checkNull(i.Officer_Badge)}</td>
                        <td><Button variant="secondary" size="sm" onClick={() => {
                            setCurrentItem(i);
                            setShowEdit(true);
                        }}>Edit</Button>
                        </td>

                        <td><Button className="btn btn-secondary" size="sm" background-color="Red" onClick={() => {
                            setCurrentItem(i);
                            setShowDelete(true);
                        }}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            < Pagination itemsPerPage={itemsPerPage} totalItems={props.items.length} paginate={paginate}
                         currentPage={currentPage}/>
            <EditModal onClose={() => setShowEdit(false)} itemInfo={currentItem} setShow={setShowEdit} show={showEdit}/>
            <DeleteModal onClose={() => setShowDelete(false)} itemInfo={currentItem} setShow={setShowDelete} show={showDelete}/>


        </div>


    )

}
export default ItemList;