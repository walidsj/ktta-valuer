import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import swal from "sweetalert";
import logo from "../assets/logo.png";
import { mahasiswaState } from "../stores/mahasiswa.js";

function ValuationInformation() {
  const mahasiswaRealtime = useRecoilValue(mahasiswaState);
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

  function handlePersetujuan() {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = `Persetujuan_${mahasiswaData.kode_dosnil1}_${mahasiswaData.kode_dosnil2}_${mahasiswaData.prodi}_${mahasiswaData.kelas}_${mahasiswaData.nama}_${mahasiswaData.npm}`;
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    swal("Sudah disalin.", input.value, "success");
  }

  function handleTurnitin() {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = `Turnitin_${mahasiswaData.prodi}_${mahasiswaData.kelas}_${mahasiswaData.nama}_${mahasiswaData.npm}`;
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    swal("Sudah disalin.", input.value, "success");
  }

  function handleDosnil() {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = `KTTA_${mahasiswaData.kode_dosnil1}_${mahasiswaData.kode_dosnil2}_${mahasiswaData.prodi}_${mahasiswaData.kelas}_${mahasiswaData.nama}_${mahasiswaData.npm}`;
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
                KTTA untuk Dinilai
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
                    href="https://www.instagram.com/p/CQE8BYihfwm"
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
                    <th scope="row">Prodi</th>
                    <td>{mahasiswaData.prodi}</td>
                  </tr>
                  <tr>
                    <th scope="row">Bidang KTTA</th>
                    <td>{mahasiswaData.bidang_ktta}</td>
                  </tr>
                  {mahasiswaData.judul_ktta && (
                    <tr>
                      <th scope="row">Judul KTTA</th>
                      <td>{mahasiswaData.judul_ktta}</td>
                    </tr>
                  )}
                  <tr>
                    <th scope="row">Status</th>
                    <td>{mahasiswaData.status_konfirmasi}</td>
                  </tr>
                </tbody>
              </table>
              <strong>Data Dosen Penilai</strong>
              <table className="table table-striped mb-4">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Nama Dosen</th>
                    <th>Kode</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Penilai I</th>
                    <td>{mahasiswaData.dosnil1}</td>
                    <td>{mahasiswaData.kode_dosnil1}</td>
                  </tr>
                  <tr>
                    <th scope="row">Penilai II</th>
                    <td>{mahasiswaData.dosnil2}</td>
                    <td>{mahasiswaData.kode_dosnil2}</td>
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
                        <th scope="row">Lembar Persetujuan</th>
                        <td>1 lembar</td>
                        <td>
                          <a
                            className="btn btn-primary btn-sm"
                            href="http://gg.gg/persetujuanKTTA21"
                            rel="noreferrer"
                            target="_blank"
                          >
                            <i className="fa fa-link" />
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handlePersetujuan()}
                          >
                            <i className="fa fa-copy" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Turnitin</th>
                        <td>
                          1 berkas
                          <br />
                          <span className="text-muted">Isi BAB I-IV</span>
                        </td>
                        <td>
                          <a
                            className="btn btn-primary btn-sm"
                            href="https://perpustakaan.stan.ac.id/layanan-pindai-turnitin-ktta/"
                            rel="noreferrer"
                            target="_blank"
                          >
                            <i className="fa fa-link" />
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handleTurnitin()}
                          >
                            <i className="fa fa-copy" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Dosen Penilai I</th>
                        <td>
                          1 berkas
                          <br />
                          <span className="text-muted">Keseluruhan</span>
                        </td>
                        <td>
                          <a
                            className="btn btn-primary btn-sm"
                            href={`http://${mahasiswaData.link_dosnil1}`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <i className="fa fa-link" />
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handleDosnil()}
                          >
                            <i className="fa fa-copy" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Dosen Penilai II</th>
                        <td>
                          1 berkas
                          <br />
                          <span className="text-muted">Keseluruhan</span>
                        </td>
                        <td>
                          <a
                            className="btn btn-primary btn-sm"
                            href={`http://${mahasiswaData.link_dosnil2}`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <i className="fa fa-link" />
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handleDosnil()}
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
              href="https://docs.google.com/forms/d/e/1FAIpQLSdc4UxbJJEVQHSIHKCk5iNvZflPPYnjKt1yjtFRrPODNGLF5A/viewform"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary disabled"
            >
              <i className="fa fa-check-circle me-2" />
              Konfirmasi Pengumpulan
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

export default ValuationInformation;
