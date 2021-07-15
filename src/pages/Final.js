import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import Tabletop from "tabletop";
import "../App.css";
import logo from "../assets/logo.png";
import { mahasiswaFinalState } from "../stores/mahasiswaFinal";
import TimerCountdownFinal from "../components/TimerCountdownFinal";

function Final() {
  const [data, setData] = useRecoilState(mahasiswaFinalState);
  const [indicatorShow, setIndicatorShow] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      Tabletop.init({
        key: "https://docs.google.com/spreadsheets/d/1W9e2lxhj11u81KRIGBDuUJo7fReMHTAlXbnDyXEg9eA/pubhtml",
        simpleSheet: true,
      })
        .then((res) => {
          setData(res);
          setIndicatorShow((indicatorShow) => !indicatorShow);
        })
        .catch((err) => console.warn(err));
    }, 10000);
    return () => clearInterval(interval);
  }, [setData, data]);

  const percentage = ((data.sudah / data.total) * 100).toFixed(2);

  const [selectedClass, setSelectedClass] = useState("all");

  return (
    <div className="background-sircuit d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <div className="container px-3">
        <div className="row">
          <div className="col-12 text-center col-md-8">
            <div className="mb-3 mt-4">
              <img
                src={logo}
                className="pb-3"
                style={{ width: "100px", maxWidth: "25vw" }}
                alt=""
              />
              <h2 className="fw-bold">
                <div className="badge bg-warning">Live Count</div>
              </h2>
              <h4>Pengumpulan Akhir KTTA 😇</h4>
              <TimerCountdownFinal />
              <small>Batas: 19-23 Juli 2021 (17.00 WIB)</small>
            </div>
            <div className="mb-3">
              <h1 className="d-inline-flex fw-bold">
                <div className="text-primary">
                  {data.sudah}
                  <i className="fa mx-2 fa-check-circle" />
                </div>
                <div className="text-warning">
                  {data.total - data.sudah}
                  <i className="fa mx-2 fa-times-circle" />
                </div>
              </h1>
              <h4>{percentage}%</h4>
            </div>
            <div className="pt-2 pb-2 pb-md-1 mb-5 mb-md-1">
              <Link
                to="/pengumpulan-rslpl/informasi"
                className="btn btn-warning m-1"
              >
                <i className="fa fa-paste me-2 m-2" />
                Pengumpulan Akhir
              </Link>
              <br />
              <Link
                to="/pengumpulan-penilaian"
                className="btn btn-outline btn-sm btn-secondary m-1"
              >
                <i className="fa fa-info me-2" />
                Pengumpulan Penilaian
                <i className="fa fa-check-circle ms-2" />
              </Link>
              <br />
              <Link
                to="/pengumpulan-rslpl"
                className="btn btn-outline btn-sm btn-secondary m-1"
              >
                <i className="fa fa-info me-2" />
                Pengumpulan RS & PL
                <i className="fa fa-check-circle ms-2" />
              </Link>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="mb-3 mt-5 text-center">
              <h4>
                <strong>Tracking Kelas 👀</strong>
              </h4>
            </div>
            <div className="mb-3">
              <div className="form-group">
                <select
                  className="form-control"
                  onChange={(e) => setSelectedClass(e.target.value)}
                  value={selectedClass}
                >
                  <option value="all">Semua Kelas</option>
                  <option value="6-01">6-01</option>
                  <option value="6-02">6-02</option>
                  <option value="6-03">6-03</option>
                  <option value="6-04">6-04</option>
                  <option value="6-05">6-05</option>
                  <option value="6-06">6-06</option>
                  <option value="6-07">6-07</option>
                  <option value="6-08">6-08</option>
                  <option value="6-09">6-09</option>
                </select>
              </div>
              <>
                {data && (
                  <div className="form-group">
                    <>
                      {selectedClass === "all" && (
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th>Kelas</th>
                              <th>Sudah</th>
                              <th>Belum</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <strong>6-01</strong>
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-01" &&
                                      val.status_konfirmasi ===
                                        "Sudah Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-01" &&
                                      val.status_konfirmasi ===
                                        "Belum Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                <strong>
                                  {
                                    data.data.filter((val) => {
                                      if (val.kelas === "6-01") {
                                        return true;
                                      } else {
                                        return false;
                                      }
                                    }).length
                                  }
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>6-02</strong>
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-02" &&
                                      val.status_konfirmasi ===
                                        "Sudah Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-02" &&
                                      val.status_konfirmasi ===
                                        "Belum Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                <strong>
                                  {
                                    data.data.filter((val) => {
                                      if (val.kelas === "6-02") {
                                        return true;
                                      } else {
                                        return false;
                                      }
                                    }).length
                                  }
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>6-03</strong>
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-03" &&
                                      val.status_konfirmasi ===
                                        "Sudah Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-03" &&
                                      val.status_konfirmasi ===
                                        "Belum Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                <strong>
                                  {
                                    data.data.filter((val) => {
                                      if (val.kelas === "6-03") {
                                        return true;
                                      } else {
                                        return false;
                                      }
                                    }).length
                                  }
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>6-04</strong>
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-04" &&
                                      val.status_konfirmasi ===
                                        "Sudah Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-04" &&
                                      val.status_konfirmasi ===
                                        "Belum Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                <strong>
                                  {
                                    data.data.filter((val) => {
                                      if (val.kelas === "6-04") {
                                        return true;
                                      } else {
                                        return false;
                                      }
                                    }).length
                                  }
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>6-05</strong>
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-05" &&
                                      val.status_konfirmasi ===
                                        "Sudah Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-05" &&
                                      val.status_konfirmasi ===
                                        "Belum Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                <strong>
                                  {
                                    data.data.filter((val) => {
                                      if (val.kelas === "6-05") {
                                        return true;
                                      } else {
                                        return false;
                                      }
                                    }).length
                                  }
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>6-06</strong>
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-06" &&
                                      val.status_konfirmasi ===
                                        "Sudah Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-06" &&
                                      val.status_konfirmasi ===
                                        "Belum Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                <strong>
                                  {
                                    data.data.filter((val) => {
                                      if (val.kelas === "6-06") {
                                        return true;
                                      } else {
                                        return false;
                                      }
                                    }).length
                                  }
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>6-07</strong>
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-07" &&
                                      val.status_konfirmasi ===
                                        "Sudah Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-07" &&
                                      val.status_konfirmasi ===
                                        "Belum Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                <strong>
                                  {
                                    data.data.filter((val) => {
                                      if (val.kelas === "6-07") {
                                        return true;
                                      } else {
                                        return false;
                                      }
                                    }).length
                                  }
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>6-08</strong>
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-08" &&
                                      val.status_konfirmasi ===
                                        "Sudah Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-08" &&
                                      val.status_konfirmasi ===
                                        "Belum Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                <strong>
                                  {
                                    data.data.filter((val) => {
                                      if (val.kelas === "6-08") {
                                        return true;
                                      } else {
                                        return false;
                                      }
                                    }).length
                                  }
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>6-09</strong>
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-09" &&
                                      val.status_konfirmasi ===
                                        "Sudah Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                {
                                  data.data.filter((val) => {
                                    if (
                                      val.kelas === "6-09" &&
                                      val.status_konfirmasi ===
                                        "Belum Konfirmasi"
                                    ) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  }).length
                                }
                              </td>
                              <td>
                                <strong>
                                  {
                                    data.data.filter((val) => {
                                      if (val.kelas === "6-09") {
                                        return true;
                                      } else {
                                        return false;
                                      }
                                    }).length
                                  }
                                </strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                    </>
                    <>
                      {selectedClass !== "all" && (
                        <small>
                          <div
                            className="d-block"
                            style={{
                              height: "65vh",
                              overflowY: "auto",
                            }}
                          >
                            <table className="table table-striped">
                              <thead
                                style={{
                                  position: "sticky",
                                  top: "0",
                                  zIndex: 1,
                                }}
                              >
                                <tr>
                                  <th
                                    style={{
                                      position: "sticky",
                                      top: "0",
                                      zIndex: 1,
                                      background: "#FFF",
                                    }}
                                  >
                                    No.
                                  </th>
                                  <th
                                    style={{
                                      position: "sticky",
                                      top: "0",
                                      zIndex: 1,
                                      background: "#FFF",
                                    }}
                                  >
                                    Nama
                                  </th>
                                  <th
                                    style={{
                                      position: "sticky",
                                      top: "0",
                                      zIndex: 1,
                                      background: "#FFF",
                                    }}
                                  >
                                    Status
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.data
                                  .filter((val) => {
                                    if (val.kelas === selectedClass) {
                                      return true;
                                    } else {
                                      return false;
                                    }
                                  })
                                  .map((mahasiswa) => (
                                    <tr key={mahasiswa.no}>
                                      <td>{mahasiswa.no}</td>
                                      <td>{mahasiswa.nama}</td>
                                      <td>
                                        {mahasiswa.status_konfirmasi ==
                                        "Belum Konfirmasi" ? (
                                          <span className="badge bg-danger">
                                            {mahasiswa.status_konfirmasi}
                                          </span>
                                        ) : (
                                          <span className="badge bg-success">
                                            {mahasiswa.status_konfirmasi}
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </small>
                      )}
                    </>
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
        <div className="pt-3 text-center mb-3">
          <small className="text-muted">
            <i
              className={`${
                indicatorShow ? "fadeIn" : "fadeOut"
              } fa fa-circle text-primary me-1`}
              style={{ fontSize: "9px" }}
            />
            realtime (update/10s)
          </small>
          <br />
          <small className="text-muted">
            © 2021
            <a
              href="https://www.instagram.com/ranger.valuer/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-instagram ms-2 me-1" />
              Ranger Valuer
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Final;
