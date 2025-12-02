// src/components/PraktikumPage/Badan/SPT/shared/RegionSelector.jsx
import React, { useState, useEffect } from "react";
import Select from "react-select";

const BASE_URL = "https://www.emsifa.com/api-wilayah-indonesia/api";

function cn(...cls) {
  return cls.filter(Boolean).join(" ");
}

const RegionSelector = ({ value = {}, onChange, disabled = false }) => {
  const [loading, setLoading] = useState({
    provinces: false,
    regencies: false,
    districts: false,
    villages: false,
  });

  const [options, setOptions] = useState({
    provinces: [],
    regencies: [],
    districts: [],
    villages: [],
  });

  const [selected, setSelected] = useState({
    province: null,
    regency: null,
    district: null,
    village: null,
  });

  // Fetch Provinces saat komponen mount
  useEffect(() => {
    fetchProvinces();
  }, []);

  // Fetch Regencies ketika province berubah
  useEffect(() => {
    if (selected.province) {
      fetchRegencies(selected.province.id);
    } else {
      setOptions((prev) => ({ ...prev, regencies: [], districts: [], villages: [] }));
      setSelected((prev) => ({ ...prev, regency: null, district: null, village: null }));
    }
  }, [selected.province]);

  // Fetch Districts ketika regency berubah
  useEffect(() => {
    if (selected.regency) {
      fetchDistricts(selected.regency.id);
    } else {
      setOptions((prev) => ({ ...prev, districts: [], villages: [] }));
      setSelected((prev) => ({ ...prev, district: null, village: null }));
    }
  }, [selected.regency]);

  // Fetch Villages ketika district berubah
  useEffect(() => {
    if (selected.district) {
      fetchVillages(selected.district.id);
    } else {
      setOptions((prev) => ({ ...prev, villages: [] }));
      setSelected((prev) => ({ ...prev, village: null }));
    }
  }, [selected.district]);

  // Notify parent ketika ada perubahan
  useEffect(() => {
    if (onChange) {
      onChange({
        province: selected.province,
        regency: selected.regency,
        district: selected.district,
        village: selected.village,
      });
    }
  }, [selected]);

  // Fetch functions
  const fetchProvinces = async () => {
    setLoading((prev) => ({ ...prev, provinces: true }));
    try {
      const response = await fetch(`${BASE_URL}/provinces.json`);
      const data = await response.json();

      const formattedOptions = data.map((province) => ({
        value: province.id,
        label: province.name,
        id: province.id,
        name: province.name,
      }));

      setOptions((prev) => ({ ...prev, provinces: formattedOptions }));
    } catch (error) {
      console.error("Error fetching provinces:", error);
    } finally {
      setLoading((prev) => ({ ...prev, provinces: false }));
    }
  };

  const fetchRegencies = async (provinceId) => {
    setLoading((prev) => ({ ...prev, regencies: true }));
    try {
      const response = await fetch(`${BASE_URL}/regencies/${provinceId}.json`);
      const data = await response.json();

      const formattedOptions = data.map((regency) => ({
        value: regency.id,
        label: regency.name,
        id: regency.id,
        name: regency.name,
      }));

      setOptions((prev) => ({ ...prev, regencies: formattedOptions }));
    } catch (error) {
      console.error("Error fetching regencies:", error);
    } finally {
      setLoading((prev) => ({ ...prev, regencies: false }));
    }
  };

  const fetchDistricts = async (regencyId) => {
    setLoading((prev) => ({ ...prev, districts: true }));
    try {
      const response = await fetch(`${BASE_URL}/districts/${regencyId}.json`);
      const data = await response.json();

      const formattedOptions = data.map((district) => ({
        value: district.id,
        label: district.name,
        id: district.id,
        name: district.name,
      }));

      setOptions((prev) => ({ ...prev, districts: formattedOptions }));
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setLoading((prev) => ({ ...prev, districts: false }));
    }
  };

  const fetchVillages = async (districtId) => {
    setLoading((prev) => ({ ...prev, villages: true }));
    try {
      const response = await fetch(`${BASE_URL}/villages/${districtId}.json`);
      const data = await response.json();

      const formattedOptions = data.map((village) => ({
        value: village.id,
        label: village.name,
        id: village.id,
        name: village.name,
      }));

      setOptions((prev) => ({ ...prev, villages: formattedOptions }));
    } catch (error) {
      console.error("Error fetching villages:", error);
    } finally {
      setLoading((prev) => ({ ...prev, villages: false }));
    }
  };

  const baseInputClass =
    "flex-1 p-2 border rounded-md text-sm transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300";

  return (
    <div className="space-y-3">
      {/* Provinsi - Horizontal Layout */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Provinsi <span className="text-red-500">*</span>
        </label>
        <div className="flex-1">
          <Select
            options={options.provinces}
            value={selected.province}
            onChange={(selectedOption) => {
              setSelected({
                province: selectedOption,
                regency: null,
                district: null,
                village: null,
              });
            }}
            isLoading={loading.provinces}
            isDisabled={disabled || loading.provinces}
            placeholder="Pilih Provinsi..."
            isClearable
            classNames={{
              control: () => cn(baseInputClass, "p-1"),
              input: () => "text-sm",
              placeholder: () => "text-gray-400 text-sm",
              singleValue: () => "text-sm text-gray-700",
              menu: () => "text-sm",
            }}
          />
        </div>
      </div>

      {/* Kota/Kabupaten - Horizontal Layout */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Kota/Kabupaten <span className="text-red-500">*</span>
        </label>
        <div className="flex-1">
          <Select
            options={options.regencies}
            value={selected.regency}
            onChange={(selectedOption) => {
              setSelected((prev) => ({
                ...prev,
                regency: selectedOption,
                district: null,
                village: null,
              }));
            }}
            isLoading={loading.regencies}
            isDisabled={disabled || !selected.province || loading.regencies}
            placeholder={
              !selected.province ? "Pilih provinsi terlebih dahulu..." : "Pilih Kota/Kabupaten..."
            }
            isClearable
            classNames={{
              control: () => cn(baseInputClass, "p-1"),
              input: () => "text-sm",
              placeholder: () => "text-gray-400 text-sm",
              singleValue: () => "text-sm text-gray-700",
              menu: () => "text-sm",
            }}
          />
        </div>
      </div>

      {/* Kecamatan - Horizontal Layout */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Kecamatan <span className="text-red-500">*</span>
        </label>
        <div className="flex-1">
          <Select
            options={options.districts}
            value={selected.district}
            onChange={(selectedOption) => {
              setSelected((prev) => ({
                ...prev,
                district: selectedOption,
                village: null,
              }));
            }}
            isLoading={loading.districts}
            isDisabled={disabled || !selected.regency || loading.districts}
            placeholder={
              !selected.regency ? "Pilih kota/kabupaten terlebih dahulu..." : "Pilih Kecamatan..."
            }
            isClearable
            classNames={{
              control: () => cn(baseInputClass, "p-1"),
              input: () => "text-sm",
              placeholder: () => "text-gray-400 text-sm",
              singleValue: () => "text-sm text-gray-700",
              menu: () => "text-sm",
            }}
          />
        </div>
      </div>

      {/* Kelurahan/Desa - Horizontal Layout */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 w-48 flex-shrink-0">
          Kelurahan/Desa <span className="text-red-500">*</span>
        </label>
        <div className="flex-1">
          <Select
            options={options.villages}
            value={selected.village}
            onChange={(selectedOption) => {
              setSelected((prev) => ({
                ...prev,
                village: selectedOption,
              }));
            }}
            isLoading={loading.villages}
            isDisabled={disabled || !selected.district || loading.villages}
            placeholder={
              !selected.district ? "Pilih kecamatan terlebih dahulu..." : "Pilih Kelurahan/Desa..."
            }
            isClearable
            classNames={{
              control: () => cn(baseInputClass, "p-1"),
              input: () => "text-sm",
              placeholder: () => "text-gray-400 text-sm",
              singleValue: () => "text-sm text-gray-700",
              menu: () => "text-sm",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegionSelector;
