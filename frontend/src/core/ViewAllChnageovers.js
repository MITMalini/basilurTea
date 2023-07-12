import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useParams } from "react-router-dom";

export default function ViewAllChangeovers() {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;

  const { id } = useParams();

  const [changeovers, setChangeover] = useState([]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = changeovers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(changeovers.length / recordsPerPage);
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    function getChangeovers() {
      axios
        .get(`http://localhost:8080/api/user/getuser/${id}`)
        .then((res) => {
          const user = res.data.number; // Assuming the machine ID is accessible via machine.machineNumber
          // setSelectedMachine(user);
          // console.log(setSelectedMachine);
          axios
            .get("http://localhost:8080/api/changeover/getchangeovers")
            .then((res) => {
              const filteredChangeovers = res.data.filter(
                (changeovers) => changeovers.selectedMachine === user
              );
              setChangeover(filteredChangeovers.reverse());
            })
            .catch((err) => {
              alert(err.message);
            });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getChangeovers();
  }, []);

  const DateFormat = (date) => {
    var d = new Date(date);

    var date = ("0" + d.getDate()).slice(-2);
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var year = d.getFullYear();
    var newDate = date + "-" + month + "-" + year;

    return newDate;
  };

  return (
    <div className="container">
      <div className="container1">
        <div className="container21">
          <span className="text"> MACHINE CHANGEOVERS</span>
        </div>
        <div className="buttondiv1vac">
          <a href="./generatereport" className="savebuttonvac">
            GENERATE REPORT
          </a>
          <a href="./addchangeover" className="savebuttonvac">
            NEW CHANGEOVER
          </a>
          <a href="./true" className="savebuttonvac">
            GO TO HOME
          </a>
        </div>
        <div className="container3table">
          <div className="containertable">
            <div className="containersubtable">
              <table className="tablediv">
                <thead className="theaddiv">
                  <tr className="tr">
                    <th className="thdiv">DATE</th>
                    <th className="thdiv">MACHINE</th>
                    <th className="thdiv">SHIFT</th>
                    <th className="thdiv">CHANGEOVER</th>
                    <th className="thdiv">OPERATOR</th>
                    <th className="thdiv">PACKING</th>
                    <th className="thdiv">QC</th>
                    <th className="thdiv">TECHNICIAN</th>
                    <th className="thdiv">SUPERVISOR</th>
                    <th className="thdiv">START TIME</th>
                    <th className="thdiv">END TIME</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((changeovers, index) => (
                    <tr className="rows" key={index}>
                      <td scope="row" className="row">
                        {DateFormat(changeovers.date)}
                      </td>
                      <td scope="row" className="row">
                        {changeovers.selectedMachine}
                      </td>
                      <td scope="row" className="row">
                        {changeovers.selectedshift}
                      </td>
                      <td scope="row" className="row">
                        {changeovers.changeoverNumber}
                      </td>
                      <td scope="row" className="row">
                        {changeovers.selectedoperator
                          .map((operator) => operator.operator_name)
                          .join(", ")}
                      </td>
                      <td scope="row" className="row">
                        {changeovers.selectedpacking
                          .map((packing) => packing.packing_name)

                          .join(", ")}
                      </td>
                      <td scope="row" className="row">
                        {changeovers.selectedqc
                          .map((qc) => qc.qc_name)
                          .join(", ")}
                      </td>
                      <td scope="row" className="row">
                        {changeovers.selectedtechnician
                          .map((technician) => technician.technician_name)
                          .join(", ")}
                      </td>
                      <td scope="row" className="row">
                        {changeovers.selectedsupervisor
                          .map((supervisor) => supervisor.supervisor_name)
                          .join(", ")}
                      </td>
                      <td scope="row" className="row">
                        {changeovers.startedAt}
                      </td>
                      <td scope="row" className="row">
                        {changeovers.endedAt}
                      </td>
                    </tr>
                  ))}
                  {/* );
                  })} */}
                </tbody>
              </table>
            </div>
            <br />
            <div
              className="navigationdiv"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`navigation-button ${
                  currentPage === 1 ? "disabled" : ""
                }`}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    disabled={currentPage === page}
                    className={`navigation-button ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`navigation-button ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
