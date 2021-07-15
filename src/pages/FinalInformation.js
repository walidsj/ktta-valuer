import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import swal from "sweetalert";
import logo from "../assets/logo.png";
import { mahasiswaFinalState } from "../stores/mahasiswaFinal";

function FinalInformation() {
  const mahasiswaRealtime = useRecoilValue(mahasiswaFinalState);
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

  function handleCover() {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = `01. Cover_${mahasiswaData.nama}_${mahasiswaData.npm}`;
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    swal("Sudah disalin.", input.value, "success");
  }

  function handlePernyataanKeaslian() {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = `02. Pernyataan Keaslian_${mahasiswaData.nama}_${mahasiswaData.npm}`;
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    swal("Sudah disalin.", input.value, "success");
  }

  function handleKelengkapanKTTA() {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = `03. Kelengkapan KTTA_${mahasiswaData.nama}_${mahasiswaData.npm}`;
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    swal("Sudah disalin.", input.value, "success");
  }

  function handleAbstrak() {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = `04. Abstrak_${mahasiswaData.nama}_${mahasiswaData.npm}`;
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    swal("Sudah disalin.", input.value, "success");
  }

  function handleIsiKTTA() {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = `05. Isi KTTA_${mahasiswaData.nama}_${mahasiswaData.npm}`;
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    swal("Sudah disalin.", input.value, "success");
  }

  const [lokasi, setLokasi] = useState("");

  function handleFileZIP() {
    const lokasiPenelitian = lokasi;
    if (!lokasiPenelitian)
      return swal("Lokasi/Objek Penelitian kosong", "Isi dulu ya...", "error");

    let input = document.createElement("input");
    document.body.appendChild(input);
    input.value = `${mahasiswaData.nama}_${mahasiswaData.npm}_${mahasiswaData.kelas}_DIII PBBPenilai_2021_${lokasi}`;
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
              <h2 className="mb-0 fw-bold">Info Pengumpulan Akhir KTTA</h2>
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
                    <th scope="row">Judul KTTA</th>
                    <td>{mahasiswaData.judul_ktta}</td>
                  </tr>
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Penilai I</th>
                    <td>{mahasiswaData.dosnil1}</td>
                  </tr>
                  <tr>
                    <th scope="row">Penilai II</th>
                    <td>{mahasiswaData.dosnil2}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <strong>Format Pengumpulan</strong>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Jenis</th>
                      <th>Isi</th>
                      <th>Qty</th>
                      <th>Nama</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <th>Cover</th>
                      <td>halaman judul (cover)</td>
                      <td>1 lembar PDF</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleCover()}
                        >
                          <i className="fa fa-copy" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <th>Pernyataan Keaslian</th>
                      <td>
                        <ul>
                          <li>pernyataan keaslian;</li>
                          <li>lembar persetujuan;</li>
                          <li>
                            pernyataan lulus dari tim penilai yang telah
                            ditandatangani.
                          </li>
                        </ul>
                      </td>
                      <td>1 berkas PDF</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handlePernyataanKeaslian()}
                        >
                          <i className="fa fa-copy" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <th>Kelengkapan KTTA</th>
                      <td>
                        <ul>
                          <li>kata pengantar;</li>
                          <li>daftar isi;</li>
                          <li>daftar gambar;</li>
                          <li>daftar tabel;</li>
                          <li>daftar grafik;</li>
                          <li>daftar lampiran;</li>
                          <li>
                            dan sejenisnya. (daftar-daftar menyesuaikan
                            masing-masing KTTA)
                          </li>
                        </ul>
                      </td>
                      <td>1 berkas PDF</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleKelengkapanKTTA()}
                        >
                          <i className="fa fa-copy" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <th>Abstrak</th>
                      <td>
                        abstrak{" "}
                        <a
                          className="badge bg-primary"
                          href="http://gg.gg/abstrakKTTA"
                          rel="noreferrer"
                          target="_blank"
                        >
                          contoh
                        </a>
                      </td>
                      <td>1 lembar PDF</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleAbstrak()}
                        >
                          <i className="fa fa-copy" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <th>Isi KTTA</th>
                      <td>
                        <ul>
                          <li>
                            seluruh isi KTTA (Bab I, Bab II, Bab III, Bab IV);
                          </li>
                          <li>daftar pustaka;</li>
                          <li>lampiran.</li>
                        </ul>
                      </td>
                      <td>1 berkas PDF</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleIsiKTTA()}
                        >
                          <i className="fa fa-copy" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <strong>Link Pengumpulan Akhir</strong>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Jenis</th>
                      <th>Isi</th>
                      <th>Qty</th>
                      <th>Nama</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>File Kompilasi</th>
                      <td>
                        <input
                          className="form-control"
                          placeholder="Lokasi/Obyek Penelitian"
                          onChange={(e) => setLokasi(e.target.value)}
                        />
                        <ul>
                          <li>cover;</li>
                          <li>pernyataan keaslian, dkk;</li>
                          <li>kelengkapan KTTA;</li>
                          <li>abstrak;</li>
                          <li>isi KTTA;</li>
                        </ul>
                      </td>
                      <td>1 berkas ZIP</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleFileZIP()}
                        >
                          <i className="fa fa-copy" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="2">Link Pengumpulan Akhir 😇</th>
                      <td colSpan="2" style={{ textAlign: "right" }}>
                        <a
                          className="btn btn-primary btn-sm"
                          href="https://perpustakaan.stan.ac.id/uploadktta/"
                          rel="noreferrer"
                          target="_blank"
                        >
                          Kumpulin
                          <br />
                          di Sini
                          <br />
                          <i className="fa fa-link m-2" />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="text-center mb-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScE_VuprHYepRmYhv1UiTGEUEK0IwVCaNL1ZJYSomjxtPQtiw/viewform"
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

export default FinalInformation;
