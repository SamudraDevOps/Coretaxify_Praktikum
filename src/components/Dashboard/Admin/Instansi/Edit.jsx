import React, { useEffect, useState } from "react";
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

const EditInstansi = ({ refetch, isOpen, instansi, id, onClose }) => {
  const { toast } = useToast();
  const [cookies] = useCookies(["user"]);
  const [open, setOpenSelect] = useState(false);
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
      if (isOpen) {
        setFormData({ name: instansi });
      }
    }, [isOpen]);

  const mutation = useMutation({
    mutationFn: async ({ id }) => {
      // Get CSRF token
      const response = await axios.get(RoutesApi.csrf, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      const updateEndpoint = RoutesApi.admin.universities.update(id);
      return await axios.put(
        updateEndpoint.url,
        {
          name: formData.name,
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
    },
    onSuccess: () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Instansi berhasil diperbarui",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        refetch?.();
        onClose();
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Gagal!",
        text: error?.response?.data?.message || error.message,
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    },
  });

  const validate = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Nama instansi harus diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (validate()) {
      mutation.mutate({ id });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="kontrak-popup-overlay">
      <div className="kontrak-popup-container">
        <div className="w-full flex justify-end">
          <RxCross1
            className="text-2xl hover:cursor-pointer"
            onClick={onClose}
          />
        </div>
        <h2>Edit Data Instansi</h2>
        <form>
          <div className="kontrak-form-group">
            <label>Nama Instansi</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
        </form>

        <div className="kontrak-popup-actions">
          <button
            type="button"
            className="kontrak-save-button"
            onClick={handleSave}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Loading..." : "Simpan"}
          </button>
          <button
            type="button"
            className="kontrak-cancel-button"
            onClick={onClose}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInstansi;
