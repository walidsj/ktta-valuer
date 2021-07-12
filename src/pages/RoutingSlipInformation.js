import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import swal from "sweetalert";
import logo from "../assets/logo.png";
import { mahasiswaRoutingSlipState } from "../stores/mahasiswaRoutingSlip";

function RoutingSlipInformation() {
  const mahasiswaRealtime = useRecoilValue(mahasiswaRoutingSlipState);
  const [mahasiswaData, setMahasiswaData] = useState();

  const [inputs, setInputs] = useState({});
  const [alertShow, setAlertShow] = useState(true);

  function handleSearch(e) {
    e.preventDefault();
    let npmInput = inputs.npm;
    const { data } = mahasiswaRealtime;
    if (npmInput) {
      const mahasiswa = data.filter(
        (mahasiswaData) => mahasiswaData.npm === npmInput
      );

      if (mahasiswa[0]) {
        setMahasiswaData(mahasiswa[0]);
      } else {
        setMahasiswaData(null);
      }
    }
  }

  function handlePernyataanLulus() {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = `Lulus_${mahasiswaData.prodi}_${mahasiswaData.kelas}_${mahasiswaData.no}_${mahasiswaData.nama}_${mahasiswaData.npm}`;
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    swal("Sudah disalin.", input.value, "success");
  }

  function handleRoutingSlip() {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = `RS_${mahasiswaData.prodi}_${mahasiswaData.kelas}_${mahasiswaData.no}_${mahasiswaData.nama}_${mahasiswaData.npm}`;
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    swal("Sudah disalin.", input.value, "success");
  }

  return (
    <div className="background-sircuit min-vh-100">
      <div className="container py-5">
        <div className="col-12 col-md-6 mx-auto px-3">
          <div className="text-center">
            <div className="mb-4">
              <Link to="/">
                <img
                  src={logo}
                  className="pb-3"
                  style={{ width: "64px", maxWidth: "25vw" }}
                  alt=""
                />
              </Link>
              <h2 className="mb-0 fw-bold">
                Info Pengumpulan
                <br />
                Routing Slip & Pernyataan Lulus
              </h2>
            </div>
            <div className="mb-4 mx-auto col-12 col-md-10 col-lg-8">
              <form onSubmit={handleSearch}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan NPM"
                    name="npm"
                    onChange={(e) => {
                      setInputs({
                        ...inputs,
                        [e.target.name]: e.target.value,
                      });
                      setMahasiswaData();
                    }}
                  />
                  <button className="btn btn-warning" type="submit">
                    <i className="fa fa-search me-2" />
                    Cari
                  </button>
                </div>
              </form>
            </div>
            {alertShow && (
              <div
                className="alert alert-primary alert-dismissible fade show text-left"
                role="alert"
              >
                <i className="fa fa-exclamation-triangle me-2" />
                Ada Pertanyaan?{" "}
                <strong>
                  <a
                    className="text-light"
                    href="https://www.instagram.com/p/CRNrewlhXn-/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Klik Di sini
                  </a>
                </strong>
                <button
                  onClick={() => setAlertShow(!alertShow)}
                  type="button"
                  class="btn-close"
                ></button>
              </div>
            )}
          </div>
          {mahasiswaData && (
            <div className="mb-4">
              <strong>Data Mahasiswa</strong>
              <table className="table table-striped mb-4">
                <tbody>
                  <tr>
                    <th scope="row">Nama</th>
                    <td>{mahasiswaData.nama}</td>
                  </tr>
                  <tr>
                    <th scope="row">NPM</th>
                    <td>{mahasiswaData.npm}</td>
                  </tr>
                  <tr>
                    <th scope="row">Kelas</th>
                    <td>{mahasiswaData.kelas}</td>
                  </tr>
                  <tr>
                    <th scope="row">No.</th>
                    <td>{mahasiswaData.no}</td>
                  </tr>
                  <tr>
                    <th scope="row">Bidang KTTA</th>
                    <td>{mahasiswaData.bidang_ktta}</td>
                  </tr>
                  <tr>
                    <th scope="row">Judul Awal KTTA</th>
                    <td>{mahasiswaData.judul_ktta_awal}</td>
                  </tr>
                  {mahasiswaData.judul_ktta_akhir && (
                    <tr>
                      <th scope="row">Judul Akhir KTTA</th>
                      <td>{mahasiswaData.judul_ktta_akhir}</td>
                    </tr>
                  )}
                  <tr>
                    <th scope="row">Status</th>
                    <td>{mahasiswaData.status_konfirmasi}</td>
                  </tr>
                </tbody>
              </table>
              {!mahasiswaData.judul_ktta && (
                <div>
                  <strong>Format Pengumpulan</strong>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Jenis</th>
                        <th>Qty (PDF)</th>
                        <th>Link</th>
                        <th>Nama</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Pernyataan Lulus</th>
                        <td>1 lembar</td>
                        <td
                          rowSpan="2"
                          style={{ textAlign: "center", paddingTop: "25px" }}
                        >
                          <a
                            className="btn btn-primary btn-sm"
                            href="http://gg.gg/persetujuandosnil"
                            rel="noreferrer"
                            target="_blank"
                          >
                            <i className="fa fa-link" />
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handlePernyataanLulus()}
                          >
                            <i className="fa fa-copy" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Routing Slip</th>
                        <td>1 berkas</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handleRoutingSlip()}
                          >
                            <i className="fa fa-copy" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          <div className="text-center mb-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdH_eOyHR3r5XIAxP2Ubh50YOOgSmN0x64bMalmUxvFCdkyBg/viewform"
              target="_blank"
              rel="noreferrer"
              className="btn btn-warning"
            >
              <i className="fa fa-check-circle me-2" />
              Konfirmasi Pengumpulan RS & PL
            </a>
          </div>
          <div className="pt-3 text-center">
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
    </div>
  );
}

export default RoutingSlipInformation;
