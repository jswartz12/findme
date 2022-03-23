import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useFetch from "../useFetch";
const ItemList = function(props){
    //This is the code to format how the list of items to be displayed
    let locations = ["N/A","Alumni Hall","Bookstore","Business Office","Campus Public Safety","Business Office","Centennial Hall",
        "Parking Garage","Dunham Hall","Institute for Collaboration","Business Office",
        "The Community Foundation of the Fox River Valley Center for Cultural Enrichment and Perry Theatre",
        "Copy Center","Dunham Hall","Davis Hall","Dining Hall","Dunham Hall","Eckhart Hall","Fitness Center","Founders Annex",
        "Founders House","Hill Welcome Center and Ethel Tapper Recital Hall","Human Resources","Institute for Collaboration",
        "Crimi Auditorium","Jenks Hall","John C. Dunham STEM Partnership School","Kimberly and James Hill Center for Student Success",
        "Labyrinth","Mail Center","Memorial Hall","Michael J. Birck Collaboration Center for Innovation",
        "Office of Admission and Financial Aid","Phillips Library","Quad","Roger and Marilyn Parolini Music Center",
        "Schingoethe Center","Spartan Spot","Spartan Statue/Bedrosian Plaza","Spartan Terrace","Stephens Hall",
        "Thornton Gymnasium","Tru Blu Coffee","University Banquet Hall","University Communications","Vago Field","Parking Garage",
        "Wackerlin Center for Faith and Action","Watkins Hall","Wellness Center","Wilkinson Hall"];
    let tableHeader = [];
    if(props.active == "H"){
        tableHeader = ["","Name","Category","Description","Value","Date","Location","Officer Badge Number"];
    }if(props.active == "C"){
        tableHeader =["","another item"];
    }if(props.active == "R"){

    }

    return(
<>                <table className="table">
                    <thead className="table-dark">
                    <tr scope="row">
                        {tableHeader.map((i) => (
                            <td key={i}>{i}</td>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                                    <div className="input-group-text">
                                        <input className="form-check-input mt-0" type="checkbox" value=""
                                               aria-label="Checkbox for following text input"></input>
                                    </div>
                        </td>
                        <td>Name</td>
                        <td>Electronic</td>
                        {/**/}
                        <td>This is a test description because we have no idea how long they are going to be. so i will continue to add words here</td>
                        <td>$1000.00</td>
                        <td>3/14/2022</td>
                        <td>Dunham Hall</td>
                    </tr>
                    {props.items.map((i) => (
                        <tr>
                            <td><div className="input-group-text">
                                <input className="form-check-input mt-0" type="checkbox" value=""
                                       aria-label="Checkbox for following text input"></input>
                            </div></td>
                            <td>{i.itemName}</td>
                            <td>{i.itemCategory}</td>
                            <td>{i.itemDescription}</td>
                            <td>{i.itemValue}</td>
                            <td>{i.date}</td>
                            <td>{i.location}</td>
                            <td>{i.officerBadge}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
    </>
    )
}
export default ItemList;