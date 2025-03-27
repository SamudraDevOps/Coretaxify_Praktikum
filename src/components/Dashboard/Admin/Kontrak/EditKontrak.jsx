import React, { useEffect, useState } from "react";
import "./tambahKontrak.css";
import { IoReload } from "react-icons/io5";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RoutesApi } from "@/Routes";
import { CookiesProvider, useCookies } from "react-cookie";
import { IoClose } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useToast } from "@/hooks/use-toast";
import { getOneContract } from "@/hooks/dashboard";
import { ClipLoader } from "react-spinners";
import { getCookieToken } from "@/service";

import Swal from "sweetalert2";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const EditKontrak = ({
  isOpen,
  onClose,
  onSave,
  UniData,
  taskData,
  setOpen,
  id,
  setEdit,
  refetch,
}) => {
  const { toast } = useToast();
  const { isLoading, isError, data, error } = getOneContract(
    RoutesApi.contractAdmin + `/${id}`,
    getCookieToken()
  );

  const [formData, setFormData] = useState({
    jenisKontrak: "",
    instansi: "",
    mahasiswa: "",
    periodeAwal: "",
    periodeAkhir: "",
    spt: "",
    bupot: "",
    faktur: "",
    kodePembelian: "",
    is_buy_task: 0,
    opsiTambahan: [],
    status: "",
  });
  useEffect(() => {
    console.log(data);
    if (data != null) {
      const universityId = data.data.university.id.toString();
      setFormData({
        jenisKontrak: data.data.contract_type,
        instansi: data.data.university.id,
        mahasiswa: data.data.qty_student,
        periodeAwal: data.data.start_period,
        periodeAkhir: data.data.end_period,
        spt: data.data.spt,
        bupot: data.data.bupot,
        faktur: data.data.faktur,
        kodePembelian: data.data.contract_code,
        is_buy_task: data.data.is_buy_task,
        opsiTambahan: data.data.tasks,
        status: data.data.status,
      });
      const university = UniData.find(
        (uni) => uni.id.toString() === universityId
      );
      if (university) {
        setValue(university.name);
      }
    }
  }, [data, UniData]);
  // console.log("makan");
  // console.log(formData);

  const [cookies, setCookie] = useCookies(["user"]);
  const [open, setOpenSelect] = useState(false);
  const [value, setValue] = useState("");

  const [lastNumbers, setLastNumbers] = useState({
    Lisensi: 0,
    Unit: 0,
    BNSP: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // onSave(formData);
    // setFormData({
    //   jenisKontrak: "",
    //   instansi: "",
    //   mahasiswa: "",
    //   periodeAwal: "",
    //   periodeAkhir: "",
    //   spt: "",
    //   bupot: "",
    //   faktur: "",
    //   kodePembelian: "",
    //   status: "",
    // });
    console.log("form before format");
    console.log(formData);
    mutation.mutate();
    // onClose();
  };
  const mutation = useMutation({
    mutationFn: async () => {
      console.log("button clicked");
      // const { response } = await axios.post(RoutesApi.login, {
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        // withCredentials: true,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      console.log(response.data.token);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      console.log(cookies.token);
      const data = await axios.put(
        RoutesApi.contractAdmin + `/${id}`,
        {
          university_id: parseInt(formData.instansi),
          contract_type: formData.jenisKontrak,
          qty_student: parseInt(formData.mahasiswa),
          start_period: formData.periodeAwal,
          end_period: formData.periodeAkhir,
          spt: parseInt(formData.spt),
          bupot: parseInt(formData.bupot),
          faktur: parseInt(formData.faktur),
          contract_code: formData.kodePembelian,
          is_buy_task: Number(formData.is_buy_task),
          status: formData.status,
          // tasks: formData.opsiTambahan.map((task) => task.id),
          tasks: formData.opsiTambahan.map((task) =>
            typeof task === "object" && task.id ? task.id : parseInt(task)
          ),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log("form");
      console.log(formData);
      console.log(formData.opsiTambahan.map((task) => task.id));
      console.log("data");
      console.log(data);
      Swal.fire({
        title: "Kontrak berhasil diubah",
        // text: "Silakan verifikasi email Anda terlebih dahulu.",
        icon: "success",
        confirmButtonText: "Lanjutkan",
      }).then(() => {
        setFormData({
          jenisKontrak: "",
          instansi: "",
          mahasiswa: "",
          periodeAwal: "",
          periodeAkhir: "",
          spt: "",
          bupot: "",
          faktur: "",
          kodePembelian: "",
          is_buy_task: 0,
          opsiTambahan: [],
          status: "",
        });
        setEdit(-1);
        onClose();
        refetch();
      });
      // window.location.href = "/" + role;
      // alert("Login successful!");
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log("form");
      console.log(formData);
      console.log(formData.opsiTambahan.map((task) => task.id));
      console.log("error");
      // console.log
      console.log(error);
    },
  });

  const handleTambahOpsi = () => {
    setFormData({ ...formData, opsiTambahan: [...formData.opsiTambahan, ""] });
  };

  const handleChangeOpsi = (index, value) => {
    const newOpsi = [...formData.opsiTambahan];
    newOpsi[index] = value;
    setFormData({ ...formData, opsiTambahan: newOpsi });
  };

  const handleHapusOpsi = (index) => {
    const newOpsi = formData.opsiTambahan.filter((_, i) => i !== index);
    setFormData({ ...formData, opsiTambahan: newOpsi });
  };

  const generateKodePembelian = () => {
    const jenis = formData.jenisKontrak;
    if (!jenis) {
      alert("Silakan pilih Jenis Kontrak terlebih dahulu.");
      return;
    }

    let prefix = "";
    switch (jenis) {
      case "Lisensi":
        prefix = "L";
        break;
      case "Unit":
        prefix = "U";
        break;
      case "BNSP":
        prefix = "BNSP";
        break;
      default:
        return;
    }

    const nextNumber = lastNumbers[jenis] + 1;
    const formattedNumber = String(nextNumber).padStart(4, "0");
    setLastNumbers({ ...lastNumbers, [jenis]: nextNumber });
    setFormData({ ...formData, kodePembelian: `${prefix}-${formattedNumber}` });
  };

  if (!isOpen) return null;
  if (isLoading) {
    return (
      <div className="kontrak-popup-overlay">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }
  // console.log("this");
  // console.log(data);

  return (
    <div className="kontrak-popup-overlay">
      <div className="kontrak-popup-container">
        <div className="w-full flex justify-end">
          <RxCross1
            className="text-2xl hover:cursor-pointer"
            onClick={onClose}
          />
        </div>
        <h2>Edit Data Kontrak</h2>
        <form>
          <div className="kontrak-form-group">
            <label>Jenis Kontrak</label>
            <select
              name="jenisKontrak"
              value={formData.jenisKontrak}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Jenis Kontrak</option>
              <option value="LICENSE">Lisensi</option>
              <option value="UNIT">Unit</option>
              <option value="BNSP">BNSP</option>
            </select>
          </div>
          {/* <div className="kontrak-form-group">
            <label>Instansi</label>
            <select
              name="instansi"
              value={formData.instansi}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Instansi</option>
              {UniData.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div> */}
          <div className="kontrak-form-group">
            <Popover open={open} onOpenChange={setOpenSelect}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value ||
                    (formData.instansi
                      ? UniData.find(
                          (uni) => uni.id.toString() === formData.instansi
                        )?.name
                      : "Pilih Instansi...")}
                  {/* {value || formData.instansi
                    ? UniData.find(
                        (uni) => uni.id.toString() === formData.instansi
                      )?.name || "Pilih Instansi..."
                    : "Pilih Instansi..."} */}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              {/* {createPortal( */}
              <PopoverContent className="w-[450px] p-0 z-[9999]" sideOffset={5}>
                <Command>
                  <CommandInput
                    value={value}
                    onValueChange={setValue}
                    placeholder="Pilih Instansi..."
                  />
                  <CommandList>
                    <CommandEmpty>Instansi tidak ditemukan.</CommandEmpty>
                    <CommandGroup>
                      {UniData.map((uni) => (
                        <CommandItem
                          key={uni.id}
                          value={uni.name}
                          onSelect={(currentValue) => {
                            // alert(currentValue);
                            setFormData({
                              ...formData,
                              instansi: uni.id.toString(),
                            });
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpenSelect(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.instansi === uni.id.toString()
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {uni.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
              {/* , */}
              {/* document.body
               )} */}
            </Popover>
          </div>
          <div className="kontrak-form-group">
            <label>Soal</label>
            <RadioGroup
              name="is_buy_task"
              value={formData.is_buy_task.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, is_buy_task: Number(value) })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="option-one" />
                <Label htmlFor="option-one">Ya</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="option-two" />
                <Label htmlFor="option-two">Tidak</Label>
              </div>
            </RadioGroup>
            {formData.is_buy_task === 1 && (
              <div className="kontrak-form-group mt-4">
                <label>Pilih Opsi</label>
                {formData.opsiTambahan.map((opsi, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <select
                      className="border p-2 rounded"
                      value={opsi.id}
                      onChange={(e) => handleChangeOpsi(index, e.target.value)}
                    >
                      <option value="">Pilih Opsi</option>
                      {taskData.data.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      onClick={() => handleHapusOpsi(index)}
                    >
                      <IoClose />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-purple-900 text-white p-2 mt-2 rounded hover:bg-purple-950"
                  onClick={handleTambahOpsi}
                >
                  + Tambah Soal
                </button>
              </div>
            )}
          </div>

          <div className="kontrak-form-group">
            <label>Jumlah Mahasiswa</label>
            <input
              type="number"
              name="mahasiswa"
              value={formData.mahasiswa}
              onChange={handleChange}
              required
            />
          </div>
          <div className="kontrak-form-group">
            <label>Periode Awal</label>
            <input
              type="date"
              name="periodeAwal"
              value={formData.periodeAwal}
              onChange={handleChange}
              required
            />
          </div>
          <div className="kontrak-form-group">
            <label>Periode Akhir</label>
            <input
              type="date"
              name="periodeAkhir"
              value={formData.periodeAkhir}
              onChange={handleChange}
              required
            />
          </div>
          <div className="kontrak-form-group">
            <label>SPT</label>
            <input
              type="number"
              name="spt"
              value={formData.spt}
              onChange={handleChange}
              required
            />
          </div>
          <div className="kontrak-form-group">
            <label>Bupot</label>
            <input
              type="number"
              name="bupot"
              value={formData.bupot}
              onChange={handleChange}
              required
            />
          </div>
          <div className="kontrak-form-group">
            <label>Faktur</label>
            <input
              type="number"
              name="faktur"
              value={formData.faktur}
              onChange={handleChange}
              required
            />
          </div>

          {/* Kode Pembelian dengan Auto Generate */}
          {/* <div className="kontrak-form-group">
            <label>Kode Pembelian</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                name="kodePembelian"
                value={formData.kodePembelian}
                onChange={handleChange}
                required
                readOnly
              />
              <button
                type="button"
                className="auto-generate-button"
                onClick={generateKodePembelian}
              >
                <IoReload />
              </button>
            </div>
          </div> */}

          <div className="kontrak-form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Expired</option>
            </select>
          </div>
        </form>

        <div className="kontrak-popup-actions">
          <button className="kontrak-save-button" onClick={handleSave}>
            {mutation.status == "pending" ? <p>Loading...</p> : <>Simpan</>}
          </button>
          <button className="kontrak-cancel-button" onClick={onClose}>
            Batal
          </button>
        </div>
        <div className="text-xs  mt-2 text-red-700">
          {/* {mutation.isError && mutation.error.response.data.message} */}
        </div>
      </div>
    </div>
  );
};

export default EditKontrak;
