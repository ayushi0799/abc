import { useParams } from 'react-router-dom'
import "./Invoice.css"
import data from '../../Data.json'

function Invoice() {
  const params = useParams();
  const x = (params.id)-1;
  console.log( params.id);
  console.log(x);
  return (
    <div>
      <h3>PO/SOW</h3>
      <form>
        <h4>PO Information</h4>
        <hr />
        <label htmlFor="clientname" className="topfields">Client Name</label>
        <label htmlFor="projectname" className="topfields">Project Name</label>
        <br />
        <input value={params.id} type="text" name="clientname" className="topfields clientname" />
        <input type="text" name="projectname" className="topfields projectname" />
        <div className="tablecontainer">
          <div className="tableleftcontainer">


            <label htmlFor="clientsponsor" className="clientsponsor">Client Sponsor</label>
            <label htmlFor="clientfinancecontroller" className="clientfinancecontroller
clientfinancecontroller">Client Finance Controller</label>
            <br />
            <input type="text" name="clientsponsor" className="clientsponsor" />
            <input type="text" name="clientfinancecontroller" className="clientfinancecontroller
clientfinancecontroller"/>
            <br />

            <label htmlFor="poamount" className="poamount">PO Amount</label>
            <label htmlFor="ponumber" className="ponumber">PO Number</label>
            <br />

            <input type="text" name="poamount" className="poamount" />
            <input type="text" name="ponumber" className="ponumber" />

            <h3>Invoice Status</h3>



          </div>
          <div className="tablerightcontainer">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Res.Name</th>
                  <th>%Allocation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    1
                  </td>
                  <td>
                    Harry P.
                  </td>
                  <td>
                    100
                  </td>
                </tr>
                <tr>
                  <td>
                    2
                  </td>
                  <td>
                    Josh Calf
                  </td>
                  <td>
                    100
                  </td>
                </tr>
                <tr>
                  <td>
                    3
                  </td>
                  <td>
                    Sumit Jha
                  </td>
                  <td>
                    50
                  </td>
                </tr>
                <tr>
                  <td>
                    4
                  </td>
                  <td>
                    Zayn M
                  </td>
                  <td>
                    100
                  </td>
                </tr>
                <tr>
                  <td>
                    5
                  </td>
                  <td>
                    Liam P
                  </td>
                  <td>
                    100
                  </td>
                </tr>
              </tbody>
            </table>


          </div>
        </div>
        <hr />
        <div className="raised">
          <label htmlFor="invoiceraised">Invoice raised</label>
          <br />
          <select name="" className="invoiceraised">
            <option value="php">PHP</option>
            <option value="java">Java</option>
            <option value="golang">Golang</option>
            <option value="python">Python</option>
          </select>
          <br />
          <label htmlFor="invoiceamount">Invoice amount received</label>
          <br />
          <select name="invoiceraised" className="invoiceamount">
            <option value="php">PHP</option>
            <option value="java">Java</option>
            <option value="golang">Golang</option>
            <option value="python">Python</option>
          </select>
          <span>USD</span>

        </div>
        <p>Invoice raised</p>
        <div className="raised">
          <label htmlFor="invoiceraised">VB Bank Account</label>
          <br />
          <select name="" className="invoiceraised">
            <option value="php">PHP</option>
            <option value="java">Java</option>
            <option value="golang">Golang</option>
            <option value="python">Python</option>
          </select>
          <br />
          <label htmlFor="invoiceamount">Amount Received on</label>
          <br />
          <input type="date" />
          

        </div>
      </form>

    </div>
  )
}

export default Invoice